const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const fs = require("fs");

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: "AIzaSyAJSWLHCVmLVam_3EsV-1MgfxEbpaOai_A" });


const app = express();
app.use(cors());
app.use(fileUpload());

app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No file uploaded");
  }

  const file = req.files.file;
  const dataBuffer = file.data;

  try {
    let text = "";
    if (file.name.endsWith(".pdf")) {
      const data = await pdfParse(dataBuffer);
      text = data.text.trim();

      if (!text) {
        const tempPath = `./${file.name}`;
        fs.writeFileSync(tempPath, dataBuffer);
        const { data: { text: ocrText } } = await Tesseract.recognize(tempPath, "eng+mal");
        text = ocrText;
        fs.unlinkSync(tempPath);
      }
    } else {
      const tempPath = `./${file.name}`;
      fs.writeFileSync(tempPath, dataBuffer);
      const { data: { text: ocrText } } = await Tesseract.recognize(tempPath, "eng+mal");
      text = ocrText;
      fs.unlinkSync(tempPath);
    }

    res.json({ filename: file.name, text });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error extracting text");
  }
});

app.use(express.json()); // Needed for JSON body parsing

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).send("No text provided");

    // Step 1: Ask Gemini to classify relevant departments
    const classifyResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `
You are an assistant for Kochi Metro Rail Limited (KMRL).
Given this document, identify which department(s) it is most relevant to.
Departments to choose from: Engineering, HR, Finance, Procurement, Safety, Legal, Other.

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

    let departments;
    try {
      let raw = classifyResponse.text.trim();
      raw = raw.replace(/```json/i, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(raw);
      departments = parsed.departments || ["General"];
    } catch (err) {
      console.error("Classification parse error:", err, "Raw:", classifyResponse.text);
      departments = ["General"];
    }

    // --- NEW: Step 2: Extract Structured Insights ---
    const insightsPrompt = `
Analyze the document and extract the following information.
Return ONLY valid JSON.

Format:
{
  "general_summary": "A concise, one-paragraph summary of the entire document.",
  "action_items": ["List of clear, actionable tasks mentioned."],
  "key_dates": ["List of any dates or deadlines found."],
  "urgency": "Rate the urgency as Low, Medium, or High, with a one-sentence reason."
}

Document:
${text}
`;
    const insightsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: insightsPrompt
    });

    let insights = {};
    try {
        let raw = insightsResponse.text.trim();
        raw = raw.replace(/```json/i, "").replace(/```/g, "").trim();
        insights = JSON.parse(raw);
    } catch (err) {
        console.error("Insights parse error:", err, "Raw:", insightsResponse.text);
        insights = { general_summary: "Could not generate summary.", action_items: [], key_dates: [], urgency: "N/A" };
    }


    // Step 3: Tailor summaries for each detected department
    let summaries = {};
    for (const dept of departments) {
      const deptResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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

    // --- UPDATED FINAL RESPONSE ---
    res.json({
      departments,
      summaries,
      insights // Insights are now included
    });
    
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).send("Error summarizing text");
  }
});


app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
