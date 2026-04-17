const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const docsControllers = require('../controllers/docsControllers');
const { authMiddleware } = require('../middleware/authMiddleware');
const Documentation = require('../models/docsModel');

const router = express.Router();

// Multer setup for file uploads (keep as-is)
const upload = multer({ dest: "uploads/" });

// Gemini setup - Using confirmed available models
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PRIMARY_MODEL = "gemini-2.0-flash";
const FALLBACK_MODEL = "gemini-2.5-flash";

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const targetLanguage = req.body.language || "English";
  const includeAudit = req.body.includeAudit === "true";
  let fileContent = "";

  try {
    // Rate limit check: 2 docs per 24 hours for non-admin users
    if (!req.user.isAdmin) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const docsGenerated = await Documentation.countDocuments({
        userId: req.user._id,
        createdAt: { $gte: twentyFourHoursAgo }
      });

      if (docsGenerated >= 2) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded. You can only generate 2 documentations per 24 hours. Admin users have unlimited access."
        });
      }
    }

    // Read file content
    fileContent = fs.readFileSync(filePath, "utf-8").slice(0, 10000);

    // Build the dynamic prompt (Standard Professional Version)
    let prompt = `Act as an expert developer and technical mentor. Generate high-quality, professional, and clear documentation in ${targetLanguage} for the following code file:

FILENAME: ${fileName}
CODE CONTENT:
\`\`\`
${fileContent}
\`\`\`

YOUR TASK:
- **STRICT RULE**: Do NOT include any conversational filler, introductory remarks, or "As a senior architect" statements at the beginning. 
- **START IMMEDIATELY** with a clear, professional title and the documentation body.
- **TONE**: Use a professional, humanized developer-to-developer tone. Do not just list features; explain the *reasoning*, *intent*, and *thought process* behind the code.
- **NO EMOJIS**: Keep headers standard (1., 2., 3.) for a professional report look.

1. TECHNICAL OVERVIEW: Provide a clear, insightful summary of the file's architectural role and the specific problems it solves.
2. DETAILED BREAKDOWN: Exhaustively explain the logic blocks, focusing on the developer's intent and how data flows through the system.
3. USAGE & BEST PRACTICES: Provide practical code examples and human-centric advice for implementing this code in real-world scenarios.`;

    // Add Architecture Diagram instruction (Strict Success Mode)
    prompt += `\n4. ARCHITECTURE DIAGRAM: Provide a clear Mermaid.js flowchart visualizing the code logic.
    - **OPTIONAL REQUIREMENT**: If the code is too simple, lacks structural flow, or you cannot draw a meaningful architectural diagram, DO NOT include this section or its heading at all. Just completely omit it without any excuses or error text.
    - **STRICT SYNTAX**: Use only simple alphanumeric characters (A-Z, 0-9) and spaces in node labels.
    - **NO SYMBOLS**: Never use parentheses (), brackets [], or any code-related symbols inside diagram text.
    - **ID RULES**: Use short, simple IDs like A, B, C for nodes.
    - **OUTPUT**: Provide only the \`\`\`mermaid block for this section.`;

    // Add Audit instruction if requested
    if (includeAudit) {
      prompt += `\n5. SECURITY & PERFORMANCE AUDIT: 
      - Identify technical security risks and their real-world implications.
      - Pinpoint performance bottlenecks and provide specific, professional optimization advice.`;
    }

    prompt += `\n\nRESPONSE FORMAT: Use professional Markdown. Ensure all technical terms are correct for the context. Respond ONLY in ${targetLanguage}.`;

    // Multi-tier Fallback System (Verified Production Tiers)
    const MODELS = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.0-flash", "gemini-flash-latest"];
    let docText = "";
    let usedModel = "";
    let lastError = null;

    for (const modelName of MODELS) {
      try {
        console.log(`🤖 [${fileName}] Attempting documentation with: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        docText = response.text();
        usedModel = modelName;
        console.log(`✅ [${fileName}] Success with model: ${modelName}`);
        break; // Exit loop on success
      } catch (err) {
        lastError = err?.message || err;
        console.error(`❌ [${fileName}] Model ${modelName} failed:`, lastError);
        continue; // Try next model
      }
    }

    if (!docText) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(500).json({
        success: false,
        message: `AI Engine Exhausted. All models failed. Last Error: ${lastError}`,
      });
    }

    // Save to database
    const doc = new Documentation({
      userId: req.user._id,
      filename: fileName,
      content: docText,
      originalContent: fileContent,
      wordCount: docText.split(/\s+/).length,
      codeLines: fileContent.split('\n').length
    });
    await doc.save();

    // Always cleanup
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    
    return res.json({
      success: true,
      modelUsed: usedModel,
      data: doc,
    });
  } catch (error) {
    // Always cleanup
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error(`❌ [${fileName}] Unexpected error:`, error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to process file: " + (error?.message || error),
    });
  }
});

// Add endpoint to fetch all docs
router.get('/my-docs', authMiddleware, docsControllers.getAllDocs);

// Add endpoint to delete a doc securely
router.delete('/:id', authMiddleware, docsControllers.deleteDoc);

// Add export endpoint for markdown
router.get('/export/:id/markdown', docsControllers.exportDoc);

// Public route to get documentation by ID
router.get('/:id', docsControllers.getDocById);

module.exports = router;
