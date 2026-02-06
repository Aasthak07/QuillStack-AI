const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const docsControllers = require('../controllers/docsControllers');
const { authMiddleware } = require('../middleware/authMiddleware');

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
  let fileContent = "";

  try {
    // Read and trim file content for quota
    fileContent = fs.readFileSync(filePath, "utf-8").slice(0, 10000);

    // Prepare prompt for Gemini
    const prompt = `Generate well-structured documentation for the following code. Explain functions, logic flow, and usage in a clear, concise way.\n\n${fileContent}`;

    // Try primary model
    try {
      const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const docText = response.text();
      console.log(`✅ [${fileName}] Documentation generated with PRIMARY model: ${PRIMARY_MODEL}`);
      // Always cleanup
      fs.unlinkSync(filePath);
      return res.json({
        success: true,
        modelUsed: PRIMARY_MODEL,
        data: docText,
      });
    } catch (primaryErr) {
      console.error(`❌ [${fileName}] Primary model (${PRIMARY_MODEL}) failed:`, primaryErr?.message || primaryErr);
      // Try fallback model
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
        const result = await fallbackModel.generateContent(prompt);
        const response = await result.response;
        const docText = response.text();
        console.log(`✅ [${fileName}] Documentation generated with FALLBACK model: ${FALLBACK_MODEL}`);
        // Always cleanup
        fs.unlinkSync(filePath);
        return res.json({
          success: true,
          modelUsed: FALLBACK_MODEL,
          data: docText,
        });
      } catch (fallbackErr) {
        console.error(`❌ [${fileName}] Fallback model (${FALLBACK_MODEL}) also failed:`, fallbackErr?.message || fallbackErr);
        // Always cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(500).json({
          success: false,
          message: `Failed to generate documentation. Primary: ${primaryErr?.message || primaryErr}. Fallback: ${fallbackErr?.message || fallbackErr}`,
        });
      }
    }
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

// Add export endpoint for markdown
router.get('/export/:id/markdown', docsControllers.exportDoc);

module.exports = router;
