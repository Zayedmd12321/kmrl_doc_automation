// index.js
require('dotenv').config(); // Loads environment variables from .env file

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const imaps = require("imap-simple");
const http = require('http');
const { Server } = require("socket.io");
const { GoogleGenAI } = require("@google/genai");
const crypto = require('crypto'); // Added for generating unique IDs

// --- SECURE: Using environment variable for API Key ---
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const app = express();
const server = http.createServer(app);

// --- PRODUCTION-READY: Set CORS from environment variable ---
const allowedOrigin = process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"]
  }
});

// Store connected clients
let activeSocket = null;
io.on('connection', (socket) => {
  console.log('✅ A user connected');
  activeSocket = socket;
  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
    activeSocket = null;
  });
});

app.use(cors({ origin: allowedOrigin }));
app.use(fileUpload());
app.use(express.json());

// Make sure attachments folder exists
const attachmentsDir = path.join(__dirname, "attachments");
if (!fs.existsSync(attachmentsDir)) {
  fs.mkdirSync(attachmentsDir, { recursive: true });
}

let latestSummaries = [];

/* ---------------- TEXT EXTRACTION ---------------- */
async function extractTextFromFile(filePath, buffer) {
  try {
    let text = "";
    if (filePath.endsWith(".pdf")) {
      const data = await pdfParse(buffer || fs.readFileSync(filePath));
      text = data.text.trim();
      if (!text) {
        const { data: { text: ocrText } } = await Tesseract.recognize(
          filePath,
          "eng+mal"
        );
        text = ocrText;
      }
    } else {
      const { data: { text: ocrText } } = await Tesseract.recognize(
        filePath,
        "eng+mal"
      );
      text = ocrText;
    }
    return text;
  } catch (err) {
    console.error("❌ Error extracting text:", err);
    return "";
  }
}

/* ---------------- SUMMARIZATION ---------------- */
async function summarizeText(text) {
  let departments = ["General"];
  let insights = {};
  let summaries = {};

  try {
    // Step 1: Department classification
    const classifyResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `
You are an assistant for Kochi Metro Rail Limited (KMRL).
Given this document, identify which department(s) it is most relevant to.
Departments to choose from: Engineering, HR, Finance, Procurement, Safety, Legal, Operations, Other.

⚠️ Important: Return ONLY valid JSON, no explanations, no markdown fences.

Format:
{
  "departments": ["Engineering", "HR"],
  "reasoning": "short explanation"
}

Document:
${text}
`
    });

    try {
      let raw = classifyResponse.text.trim();
      raw = raw.replace(/```json/i, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(raw);
      departments = parsed.departments || ["General"];
    } catch (err) {
      console.error("Classification parse error:", err, "Raw:", classifyResponse.text);
      departments = ["General"];
    }

    // Step 2: Structured insights (MODIFIED PROMPT)
    const insightsPrompt = `
Analyze the document and extract the following information.
Return ONLY valid JSON.

Format:
{
  "generalSummary": "A concise, one-paragraph summary of the entire document.",
  "actionItems": ["List of clear, actionable tasks mentioned."],
  "keyDates": [
    { "date": "YYYY-MM-DD", "event": "A short description of the event or deadline." }
  ],
  "urgency": "Rate the urgency as Low, Medium, or High, with a one-sentence reason."
}

Document:
${text}
`;
    try {
      const insightsResponse = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: insightsPrompt
      });
      let raw = insightsResponse.text.trim();
      raw = raw.replace(/```json/i, "").replace(/```/g, "").trim();
      insights = JSON.parse(raw);
    } catch (err) {
      console.error("Insights parse error:", err, "Raw:", insightsResponse.text);
      insights = {
        generalSummary: "Could not generate summary.",
        actionItems: [],
        keyDates: [],
        urgency: "N/A"
      };
    }

    // Step 3: Department-specific summaries
    for (const dept of departments) {
      const deptResponse = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `
Summarize this document for the perspective of the ${dept} department.
Only highlight points that are relevant for ${dept}.
Keep it clear, concise, and actionable.

Document:
${text}
`
      });
      summaries[dept] = deptResponse.text.trim();
    }
  } catch (err) {
    console.error("Gemini API error:", err);
  }

  return { departments, insights, summaries };
}

/* ---------------- ROUTES ---------------- */
app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send("No file uploaded");

  const file = req.files.file;
  const filePath = path.join(__dirname, file.name);
  fs.writeFileSync(filePath, file.data);

  try {
    const text = await extractTextFromFile(filePath, file.data);
    fs.unlinkSync(filePath);
    
    const result = await summarizeText(text);

    // MODIFIED: Assemble the final JSON object in the desired structure
    const finalResponse = {
      _id: crypto.randomUUID(),
      fileName: file.name,
      fileType: file.mimetype,
      fileSize: file.size,
      storageKey: `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${file.name}`,
      status: "completed",
      analysis: {
        generalSummary: result.insights.generalSummary,
        urgency: result.insights.urgency,
        actionItems: result.insights.actionItems,
        keyDates: result.insights.keyDates,
        departments: result.departments,
        summaries: result.summaries
      },
      fullText: text, // Optionally include the full text
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    res.json(finalResponse);
    console.log("📊 Auto Summary Result:", JSON.stringify(finalResponse, null, 2));

  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).send("Error processing file");
  }
});

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send("No text provided");
  // Note: This route still returns the raw AI result, not the fully structured object.
  // It could be updated similarly to the /upload route if needed.
  const result = await summarizeText(text);
  res.json(result);
});

app.get("/summaries", (req, res) => {
  res.json(latestSummaries);
});

/* ---------------- GMAIL LISTENER ---------------- */
let isProcessing = false;

async function startMailListener() {
    // --- SECURE: Using environment variables for credentials ---
  const config = {
    imap: {
      user: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASSWORD,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      authTimeout: 3000,
      tlsOptions: { rejectUnauthorized: false }
    }
  };

  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");
    console.log("✅ Gmail listener started...");

    setInterval(async () => {
      if (isProcessing) {
        console.log("⏳ Skipping loop: still processing...");
        return;
      }
      isProcessing = true;

      try {
        const searchCriteria = ["UNSEEN"];
        const fetchOptions = { bodies: [""], struct: true };
        const messages = await connection.search(searchCriteria, fetchOptions);

        for (const msg of messages) {
          const parts = imaps.getParts(msg.attributes.struct);
          for (const part of parts) {
            if (part.disposition && part.disposition.type.toUpperCase() === "ATTACHMENT") {
              const filename = part.disposition.params.filename;
              console.log(`📩 Processing new attachment: ${filename}`);

              if (activeSocket) {
                activeSocket.emit("processing:start", { filename });
              }

              const attachment = await connection.getPartData(msg, part);
              const filePath = path.join(attachmentsDir, filename);
              fs.writeFileSync(filePath, attachment);

              const text = await extractTextFromFile(filePath);
              console.log("⚡ Generating summary...");
              const result = await summarizeText(text);

              // MODIFIED: Assemble the final JSON object for socket emission
              const finalResponse = {
                _id: crypto.randomUUID(),
                fileName: filename,
                fileType: part.type + '/' + part.subtype,
                fileSize: part.size,
                storageKey: `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${filename}`,
                status: "completed",
                analysis: {
                  generalSummary: result.insights.generalSummary,
                  urgency: result.insights.urgency,
                  actionItems: result.insights.actionItems,
                  keyDates: result.insights.keyDates,
                  departments: result.departments,
                  summaries: result.summaries
                },
                fullText: text,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };

              if (activeSocket) {
                activeSocket.emit("processing:complete", finalResponse);
              }

              latestSummaries.push({ subject: msg.parts[0].body.subject, result: finalResponse });
              console.log("📊 Auto Summary Result:", JSON.stringify(finalResponse, null, 2));

              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
          }
          await connection.addFlags(msg.attributes.uid, ["\\Seen"]);
        }
      } catch (err) {
        console.error("❌ Mail loop error:", err);
      } finally {
        isProcessing = false;
      }
    }, 30000);
  } catch (err) {
    console.error("❌ Gmail listener error:", err);
  }
}

startMailListener();

/* ---------------- SERVER ---------------- */
// --- PRODUCTION-READY: Use dynamic port ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);