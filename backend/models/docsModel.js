const mongoose = require("mongoose");

const DocumentationSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  content: { type: String, required: true },
  originalContent: { type: String }, // Store original code for reference/regeneration
  language: { type: String }, // Detected programming language
  generatedAt: { type: Date, default: Date.now },
  version: { type: String, default: '1.0' },
  wordCount: { type: Number },
  codeLines: { type: Number },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true }); // createdAt and updatedAt

module.exports = mongoose.model("Documentation", DocumentationSchema);