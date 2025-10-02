// index.js
require('dotenv').config();

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
const crypto = require('crypto');

// --- SECURE: Using environment variable for API Key ---
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const app = express();
const server = http.createServer(app);

// --- PRODUCTION-READY: Set CORS from environment variable ---
const allowedOrigin = process.env.FRONTEND_URL || "*";

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"]
  }
});

// Store connected clients (for debug / counts)
io.on('connection', (socket) => {
  console.log(`✅ A user connected with ID: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

app.use(cors({ origin: allowedOrigin }));
app.use(fileUpload());
app.use(express.json());

// Ensure attachments folder exists
const attachmentsDir = path.join(__dirname, "attachments");
if (!fs.existsSync(attachmentsDir)) {
  fs.mkdirSync(attachmentsDir, { recursive: true });
}

let latestSummaries = [];
let isProcessing = false;

/* ---------------- TEXT EXTRACTION ---------------- */
async function extractTextFromFile(filePath, buffer) {
  try {
    let text = "";

    // If PDF: attempt text extraction first, then OCR fallback
    if (filePath && filePath.toLowerCase().endsWith(".pdf")) {
      const dataBuffer = buffer || fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = (data && data.text) ? data.text.trim() : "";

      // If no text content, fallback to OCR using tesseract
      if (!text || text.length < 10) {
        // Use buffer with tesseract when available (faster and safer)
        const ocrSource = buffer || fs.readFileSync(filePath);
        const { data: { text: ocrText } } = await Tesseract.recognize(ocrSource, 'eng+mal');
        text = (ocrText || "").trim();
      }
    } else {
      // Non-pdf: use OCR directly (Tesseract accepts buffer or path)
      const ocrSource = buffer || filePath;
      const { data: { text: ocrText } } = await Tesseract.recognize(ocrSource, 'eng+mal');
      text = (ocrText || "").trim();
    }

    return text;
  } catch (err) {
    console.error("❌ Error extracting text:", err);
    return "";
  }
}

/* ---------------- SUMMARIZATION (UNIFIED + PER-DEPT) ---------------- */
async function summarizeText(text) {
  let dept_summaries = {};
  const unifiedPrompt = `
You are an assistant for Kochi Metro Rail Limited (KMRL).
Your task is to analyze the following document and return ONLY valid JSON.
Make sure the JSON is strictly parseable.

Rules:
- Departments to choose from: Engineering, HR, Finance, Procurement, Safety, Legal, Operations, Other.
- Identify which department(s) are relevant and include them in the "departments" key.
- Always return ALL keys ("departments", "insights") exactly as in the JSON structure.
- If some sections are not relevant, return them as empty arrays, empty objects, or short empty strings.
- Do not include markdown, explanations, or formatting outside the JSON.

JSON Format:
{
  "departments": [Relevant departments], 
  "insights": {
    "generalSummary": "A detailed one-paragraph summary of the entire document.",
    "actionItems": ["List of actionable tasks clearly extracted from the document."],
    "keyDates": [
      { "date": "YYYY-MM-DD", "event": "Short description of the deadline or milestone." }
    ],
    "urgency": "Low | Medium | High, with a short reason."
  }
}

Document:
${text}
`;

  try {
    // Step 1: Unified insights (defensive call)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: unifiedPrompt
    });

    // Defensive extraction of text from various possible response shapes
    let raw = "";
    if (!response) raw = "";
    else if (typeof response === "string") raw = response;
    else if (response.text) raw = response.text;
    else if (response.output && Array.isArray(response.output) && response.output[0]?.content) raw = response.output[0].content;
    else raw = JSON.stringify(response);

    raw = raw.trim().replace(/```json/i, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // If parsing fails, attempt to extract JSON-looking substring
      const match = raw.match(/\{[\s\S]*\}$/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse JSON from AI response");
      }
    }

    const departments = Array.isArray(parsed.departments) ? parsed.departments : (parsed.departments ? [parsed.departments] : ["Other"]);

    // Step 2: Per-department detailed summaries (run in parallel)
    const deptPromises = departments.map(async (dept) => {
      const deptPrompt = `
You are an assistant for Kochi Metro Rail Limited (KMRL).
Write a detailed report of this document from the perspective of the ${dept} department.

Format with sections:
- Key Issues & Investigations
- Required Actions
- Dependencies on Other Departments
- Project & Process Updates
- Notes & Observations

Include all relevant details, even small ones like unusual wear, minor downtime, or pending requests.
Use bullet points and bold keywords for clarity.

Document:
${text}
`;
      try {
        const deptResponse = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: deptPrompt
        });

        let deptText = "";
        if (!deptResponse) deptText = "Could not generate summary.";
        else if (typeof deptResponse === "string") deptText = deptResponse;
        else if (deptResponse.text) deptText = deptResponse.text;
        else if (deptResponse.output && Array.isArray(deptResponse.output) && deptResponse.output[0]?.content) deptText = deptResponse.output[0].content;
        else deptText = JSON.stringify(deptResponse);

        return [dept, deptText.trim().replace(/```/g, "")];
      } catch (err) {
        console.error(`❌ Error summarizing ${dept}:`, err);
        return [dept, "Could not generate summary."];
      }
    });

    const deptResults = await Promise.all(deptPromises);
    deptResults.forEach(([dept, summary]) => {
      dept_summaries[dept] = summary;
    });

    // Step 3: Return merged object
    return {
      departments,
      insights: parsed.insights || {
        generalSummary: "Could not generate summary.",
        actionItems: [],
        keyDates: [],
        urgency: "N/A"
      },
      summaries: dept_summaries
    };
  } catch (err) {
    console.error("❌ Summarization error:", err);
    return {
      departments: ["Other"],
      insights: {
        generalSummary: "Could not generate summary.",
        actionItems: [],
        keyDates: [],
        urgency: "N/A"
      },
      summaries: {}
    };
  }
}

/* ---------------- ROUTES ---------------- */
app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send("No file uploaded");

  const file = req.files.file;

  // sanitize filename and save into attachmentsDir to avoid writing into project root
  const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const timestamp = Date.now();
  const storedName = `${timestamp}_${safeName}`;
  const filePath = path.join(attachmentsDir, storedName);

  try {
    fs.writeFileSync(filePath, file.data);

    const text = await extractTextFromFile(filePath, file.data);

    // remove file after extraction
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    const result = await summarizeText(text);

    const finalResponse = {
      _id: crypto.randomUUID(),
      fileName: file.name,
      fileType: file.mimetype,
      fileSize: file.size,
      storageKey: `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${storedName}`,
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

    // broadcast if clients are connected
    if (io && io.sockets && io.sockets.sockets.size > 0) {
      io.emit("processing:complete", finalResponse);
    }

    res.json(finalResponse);
    console.log("📊 Auto Summary Result:", JSON.stringify(finalResponse, null, 2));
  } catch (err) {
    // cleanup on error
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error("❌ /upload error:", err);
    res.status(500).send("Error processing file");
  }
});

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send("No text provided");
  try {
    const result = await summarizeText(text);
    res.json(result);
  } catch (err) {
    console.error("❌ /summarize error:", err);
    res.status(500).send("Error summarizing text");
  }
});

app.get("/summaries", (req, res) => {
  res.json(latestSummaries);
});

/* ---------------- GMAIL LISTENER ---------------- */
async function startMailListener() {
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

        if (!messages || messages.length === 0) {
          isProcessing = false;
          return;
        }

        for (const msg of messages) {
          const parts = imaps.getParts(msg.attributes.struct);
          for (const part of parts) {
            if (part.disposition && part.disposition.type && part.disposition.type.toUpperCase() === "ATTACHMENT") {
              const rawFilename = part.disposition.params && part.disposition.params.filename ? part.disposition.params.filename : `attachment_${Date.now()}`;
              const filenameSafe = path.basename(rawFilename).replace(/[^a-zA-Z0-9.\-_]/g, "_");
              const storedName = `${Date.now()}_${filenameSafe}`;
              console.log(`📩 Processing new attachment: ${filenameSafe}`);

              // notify clients processing started
              if (io && io.sockets && io.sockets.sockets.size > 0) {
                io.emit("processing:start", { filename: filenameSafe });
              }

              const attachment = await connection.getPartData(msg, part);
              const filePath = path.join(attachmentsDir, storedName);
              fs.writeFileSync(filePath, attachment);

              const text = await extractTextFromFile(filePath, attachment);
              console.log("⚡ Generating summary...");
              const result = await summarizeText(text);

              const finalResponse = {
                _id: crypto.randomUUID(),
                fileName: filenameSafe,
                fileType: (part.type && part.subtype) ? `${part.type}/${part.subtype}` : "application/octet-stream",
                fileSize: part.size || Buffer.byteLength(attachment || ""),
                storageKey: `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${storedName}`,
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

              // broadcast completion
              if (io && io.sockets && io.sockets.sockets.size > 0) {
                io.emit("processing:complete", finalResponse);
              }

              // store minimal metadata for UI
              latestSummaries.push({ subject: (msg.parts && msg.parts[0] && msg.parts[0].body && msg.parts[0].body.subject) ? msg.parts[0].body.subject : "No Subject", result: finalResponse });
              console.log("📊 Auto Summary Result:", JSON.stringify(finalResponse, null, 2));

              // cleanup
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
          }
          // mark message as seen
          try {
            await connection.addFlags(msg.attributes.uid, ["\\Seen"]);
          } catch (flagErr) {
            console.warn("⚠️ Failed to add \\Seen flag for message:", flagErr);
          }
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

// Only start the listener if credentials are present
if (process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
  startMailListener();
} else {
  console.warn("⚠️ Gmail listener not started: GMAIL_USER or GMAIL_PASSWORD not set in environment.");
}

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
