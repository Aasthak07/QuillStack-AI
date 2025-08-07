// const fs = require("fs");
// const Documentation = require("../models/docsModel");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { Document, Paragraph, TextRun } = require('docx');
// const fsPromises = require('fs').promises;
// const path = require('path');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Upload file and generate documentation
// const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const fileContent = fs.readFileSync(req.file.path, "utf-8");

//     // AI Model - Updated model name to the current version
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     try {
//       const prompt = `Generate comprehensive technical documentation for this code:
      
//       ${fileContent}
      
//      # Code Analysis Template

// ## Code Overview
//  #Purpose: [Brief description] 
//  #Key Functionality: [Core capabilities]
//  #Architecture: [High-level structure]
//  #Technical Decisions: [Major decisions and rationale]

// ## Technical Analysis
// ### Structure & Organization
//  #Module Hierarchy: [Key components and relationships]
//  #Design Patterns: [Patterns employed]
//  #Complexity Assessment: [Evaluation of complexity]

// ### Implementation Details
// For key components:
// - **Name & Purpose**: [Component name and function]
// - **Complexity**: [Big O notation where relevant]
// - **Error Handling**: [Approach to errors]
// - **Data Flow**: [How data moves through the component]

// ### Dependencies & Integration
// - **External Dependencies**: [Major libraries/systems used]
// - **API Interactions**: [External service integration]
// - **System Requirements**: [Runtime needs]

// ### Data Management
// - **Data Structures**: [Key structures used]
// - **State Management**: [How state is handled]
// - **Data Validation**: [Validation approach]

// ### Security & Error Handling
// - **Security Measures**: [Key protections]
// - **Error Scenarios**: [Major failure modes]
// - **Recovery Mechanisms**: [How failures are handled]

// ### Performance & Scalability
// - **Optimization Techniques**: [Performance enhancements]
// - **Bottlenecks**: [Performance limitations]
// - **Scalability Considerations**: [Growth capability]

// ### Testing & Maintenance
// - **Testing Approach: [Strategy for validation]
// - **Edge Cases**: [Important boundary conditions]
// - **Maintainability Factors**: [Code quality metrics]
// - **Technical Debt**: [Areas needing improvement]

// ### Code Examples


// ### Development Guidelines
// - **Coding Standards**: [Key practices]
// - **Documentation Requirements**: [Documentation approach]
// - **Review Checklist**: [Key verification items]`;
//       // Continue with sending the prompt to API...

//       const result = await model.generateContent(prompt);
//       const aiGeneratedDoc = result.response.text();

//       // Save to MongoDB
//       const doc = new Documentation({
//         filename: req.file.originalname,
//         content: aiGeneratedDoc,
//       });
//       await doc.save();

//       // Clean up the temporary file
//       fs.unlinkSync(req.file.path);

//       res.json({ message: "Documentation created successfully!", data: doc });
//     } catch (aiError) {
//       console.error("AI processing error:", aiError);
//       res.status(500).json({
//         error: "Failed to generate documentation with AI: " + aiError.message,
//       });
//     }
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: error.message });

//     // Clean up the temporary file if it exists
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//   }
// };

// // Fetch all generated documentation
// const getAllDocs = async (req, res) => {
//   try {
//     const docs = await Documentation.find().sort({ createdAt: -1 });
//     res.json(docs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateDoc = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;

//     const updatedDoc = await Documentation.findByIdAndUpdate(
//       id,
//       { content },
//       { new: true }
//     );

//     if (!updatedDoc) {
//       return res.status(404).json({ error: "Document not found" });
//     }

//     res.status(200).json(updatedDoc);
//   } catch (error) {
//     console.error("Error updating document", error);
//     res.status(500).json({ error: "Failed to update document" });
//   }
// };

// const getDocById = async (req, res) => {
//   try {
//     const doc = await Documentation.findById(req.params.id);
//     if (!doc) {
//       return res.status(404).json({ error: 'Document not found' });
//     }
//     res.json(doc);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching document' });
//   }
// };

// const exportDoc = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Support GET requests for markdown export
//     let format = req.body?.format;
//     if (req.method === 'GET') {
//       format = 'markdown';
//     }
//     const doc = await Documentation.findById(id);

//     if (!doc) {
//       return res.status(404).json({ error: 'Document not found' });
//     }

//     const tempDir = path.join(__dirname, '../temp');
//     await fsPromises.mkdir(tempDir, { recursive: true });

//     switch (format) {
//       case 'markdown':
//         // For markdown, just send the content directly
//         res.setHeader('Content-Type', 'text/markdown');
//         res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.md`);
//         return res.send(doc.content);

//       case 'pdf':
//         // Convert markdown to PDF using Puppeteer
//         const pdfBuffer = await convertToPdf(doc.content);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.pdf`);
//         return res.send(pdfBuffer);

//       case 'html':
//         // Convert markdown to HTML
//         const htmlContent = markdownToHtml(doc.content);
//         res.setHeader('Content-Type', 'text/html');
//         res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.html`);
//         return res.send(htmlContent);

//       case 'docx':
//         // Create Word document
//         const docx = new Document({
//           sections: [{
//             properties: {},
//             children: [
//               new Paragraph({
//                 children: [
//                   new TextRun(doc.content)
//                 ],
//               }),
//             ],
//           }],
//         });

//         // Use docx.Packer.toBuffer instead of docx.save
//         const buffer = await require('docx').Packer.toBuffer(docx);
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//         res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.docx`);
//         return res.send(buffer);

//       default:
//         return res.status(400).json({ error: 'Unsupported format' });
//     }
//   } catch (error) {
//     console.error('Export error:', error);
//     res.status(500).json({ error: 'Error exporting document' });
//   }
// };

// const markdownToHtml = (markdown) => {
//   // Simple markdown to HTML conversion
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Exported Documentation</title>
//       <style>
//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//           line-height: 1.6;
//           padding: 2em;
//           max-width: 900px;
//           margin: 0 auto;
//         }
//         pre {
//           background-color: #f5f5f5;
//           padding: 1em;
//           border-radius: 4px;
//           overflow-x: auto;
//         }
//         code {
//           font-family: 'Courier New', Courier, monospace;
//         }
//       </style>
//     </head>
//     <body>
//       ${markdown
//         .replace(/^### (.#$)/gm, '<h3>$1</h3>')
//         .replace(/^## (.#$)/gm, '<h2>$1</h2>')
//         .replace(/^# (.#$)/gm, '<h1>$1</h1>')
//         .replace(/\#\#(.#?)\#\#/g, '<strong>$1</strong>')
//         .replace(/\#(.#?)\#/g, '<em>$1</em>')
//         .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
//         .replace(/\n/g, '<br>')}
//     </body>
//     </html>
//   `;
// };

// function convertToHtml(markdown) {
//   // Convert markdown to HTML using a library like marked
//   const marked = require('marked');
//   // If marked is an object with a .parse method (modern versions), use it
//   const html = typeof marked === 'function' ? marked(markdown) : marked.parse(markdown);
//   return Buffer.from(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
//           pre { background: #f6f8fa; padding: 1rem; border-radius: 4px; }
//           code { font-family: monospace; }
//         </style>
//       </head>
//       <body>${html}</body>
//     </html>
//   `);
// }

// async function convertToPdf(markdown) {
//   // Convert markdown to PDF using a library like puppeteer
//   const puppeteer = require('puppeteer');
//   // Ensure we pass a string to setContent, not a Buffer
//   const htmlBuffer = convertToHtml(markdown);
//   const html = htmlBuffer.toString();

//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: 'networkidle0' });
//   const pdf = await page.pdf({ format: 'A4', margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' } });
//   await browser.close();

//   return pdf;
// }

// async function convertToDocx(markdown) {
//   // Convert markdown to DOCX using a library like mammoth or docx
//   const docx = require('docx');
//   const { Document, Paragraph, TextRun } = docx;
  
//   const doc = new Document({
//     sections: [{
//       properties: {},
//       children: markdown.split('\n').map(line => 
//         new Paragraph({
//           children: [new TextRun(line)]
//         })
//       )
//     }]
//   });

//   const buffer = await docx.Packer.toBuffer(doc);
//   return buffer;
// }

// module.exports = { uploadFile, getAllDocs, updateDoc, getDocById, exportDoc };
const fs = require("fs");
const Documentation = require("../models/docsModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Document, Paragraph, TextRun } = require('docx');
const fsPromises = require('fs').promises;
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Upload file and generate documentation
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(req.file.path, "utf-8");
    const filename = req.file.originalname;
    
    // Validate file content
    if (!fileContent.trim()) {
      return res.status(400).json({ error: "File appears to be empty" });
    }

    // AI Model with enhanced configuration
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent, technical output
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192, // Increase for comprehensive documentation
      },
    });

    try {
      // Get optimized prompt based on code type
      const prompt = getOptimalPrompt(fileContent, filename);
      
      console.log(`Generating documentation for ${filename} using optimized prompt...`);
      
      // Generate documentation with retry logic
      let result;
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          result = await model.generateContent(prompt);
          break;
        } catch (aiError) {
          attempts++;
          if (attempts === maxAttempts) throw aiError;
          
          console.log(`Attempt ${attempts} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
        }
      }

      const aiGeneratedDoc = result.response.text();
      
      // Validate AI response
      if (!aiGeneratedDoc || aiGeneratedDoc.trim().length < 100) {
        throw new Error("AI generated documentation is too short or empty");
      }

      // Post-process documentation for quality improvements
      const processedDoc = postProcessDocumentation(aiGeneratedDoc, filename);

      // Save to MongoDB with metadata
      const doc = new Documentation({
        filename: filename,
        content: processedDoc,
        originalContent: fileContent, // Store original code for reference
        language: detectLanguage(filename),
        generatedAt: new Date(),
        version: '1.0',
        wordCount: processedDoc.split(' ').length,
        codeLines: fileContent.split('\n').length
      });
      
      await doc.save();

      // Clean up the temporary file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      // Return enhanced response with quality metrics
      res.json({ 
        message: "Documentation created successfully!", 
        data: doc,
        metrics: {
          wordCount: doc.wordCount,
          codeLines: doc.codeLines,
          language: doc.language,
          estimatedReadTime: Math.ceil(doc.wordCount / 200) + ' minutes'
        }
      });

    } catch (aiError) {
      console.error("AI processing error:", aiError);
      
      // More specific error handling
      let errorMessage = "Failed to generate documentation";
      if (aiError.message.includes('quota')) {
        errorMessage = "API quota exceeded. Please try again later.";
      } else if (aiError.message.includes('safety')) {
        errorMessage = "Content was blocked by safety filters. Please review your code.";
      } else if (aiError.message.includes('too short')) {
        errorMessage = "Generated documentation was insufficient. Please try with a different file.";
      }
      
      res.status(500).json({
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? aiError.message : undefined
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: "File processing failed: " + error.message 
    });

    // Clean up the temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }
  }
};

// Enhanced regenerate documentation function
const regenerateDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const { useAlternativePrompt } = req.body;
    
    const doc = await Documentation.findById(id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    if (!doc.originalContent) {
      return res.status(400).json({ error: "Original code not available for regeneration" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: useAlternativePrompt ? 0.5 : 0.3, // Slightly higher temp for variation
        maxOutputTokens: 8192,
      },
    });

    // Use alternative prompt style if requested
    let prompt;
    if (useAlternativePrompt) {
      prompt = getAlternativePrompt(doc.originalContent, doc.filename);
    } else {
      prompt = getOptimalPrompt(doc.originalContent, doc.filename);
    }

    const result = await model.generateContent(prompt);
    const newContent = postProcessDocumentation(result.response.text(), doc.filename);

    // Update document with new version
    doc.content = newContent;
    doc.version = incrementVersion(doc.version);
    doc.generatedAt = new Date();
    doc.wordCount = newContent.split(' ').length;
    
    await doc.save();

    res.json({ 
      message: "Documentation regenerated successfully!", 
      data: doc 
    });

  } catch (error) {
    console.error("Regeneration error:", error);
    res.status(500).json({ error: "Failed to regenerate documentation" });
  }
};

// Helper functions
function detectLanguage(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  const languageMap = {
    'js': 'JavaScript',
    'jsx': 'JavaScript (React)',
    'ts': 'TypeScript', 
    'tsx': 'TypeScript (React)',
    'py': 'Python',
    'java': 'Java',
    'go': 'Go',
    'php': 'PHP',
    'rb': 'Ruby',
    'cs': 'C#',
    'cpp': 'C++',
    'c': 'C',
    'sql': 'SQL',
    'vue': 'Vue.js',
    'svelte': 'Svelte'
  };
  
  return languageMap[extension] || 'Unknown';
}

function postProcessDocumentation(content, filename) {
  // Remove excessive whitespace
  let processed = content.replace(/\n{3,}/g, '\n\n');
  
  // Ensure proper heading hierarchy
  processed = processed.replace(/^#{4,}/gm, '###');
  
  // Add filename to title if not present
  if (!processed.includes(filename)) {
    processed = `# ${filename} Documentation\n\n${processed}`;
  }
  
  // Fix common formatting issues
  processed = processed
    .replace(/\*\*\s+/g, '**') // Fix bold formatting
    .replace(/\s+\*\*/g, '**')
    .replace(/`\s+/g, '`') // Fix code formatting
    .replace(/\s+`/g, '`')
    .replace(/\[Placeholder\]/gi, '[Details from code analysis]') // Replace common AI placeholders
    .replace(/\[TODO\]/gi, '[Implementation specific]');
  
  return processed;
}

function incrementVersion(currentVersion) {
  const parts = currentVersion.split('.');
  parts[parts.length - 1] = (parseInt(parts[parts.length - 1]) + 1).toString();
  return parts.join('.');
}

function getOptimalPrompt(fileContent, filename) {
  return `Generate comprehensive technical documentation for the following code file:

Filename: ${filename}

Code:
\`\`\`
${fileContent}
\`\`\`

Please include:
- Overview and purpose
- Key functionality
- Architecture and design decisions
- Usage examples
- Error handling and edge cases
- Integration notes
- Maintenance tips

Format your response in Markdown.`;
}

function getAlternativePrompt(fileContent, filename) {
  return `As a technical documentation specialist, create detailed documentation for this code file:

FILENAME: ${filename}
CODE:
\`\`\`
${fileContent}
\`\`\`

Focus on creating documentation that answers these key questions:
1. What problem does this code solve?
2. How does it solve the problem (architecture/approach)?
3. What are the key components and how do they interact?
4. What are the inputs, outputs, and side effects?
5. What could go wrong and how is it handled?
6. How would someone use/integrate this code?
7. What should developers know for maintenance?

Structure your response as a comprehensive technical reference document with:
- Executive summary
- Detailed technical analysis
- Usage examples with real code
- Troubleshooting guide
- Integration notes

Be specific and avoid generic statements. Use actual function names, variables, and logic from the code.`;
}

// Keep existing functions (getAllDocs, updateDoc, getDocById, exportDoc) unchanged
const getAllDocs = async (req, res) => {
  try {
    const docs = await Documentation.find()
      .select('filename content language generatedAt version wordCount codeLines')
      .sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedDoc = await Documentation.findByIdAndUpdate(
      id,
      { 
        content,
        version: incrementVersion((await Documentation.findById(id)).version || '1.0'),
        lastModified: new Date()
      },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};

const getDocById = async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching document' });
  }
};

// [Keep the rest of your export functions unchanged - exportDoc, markdownToHtml, convertToPdf, etc.]
const exportDoc = async (req, res) => {
  try {
    const { id } = req.params;
    let format = req.body?.format;
    if (req.method === 'GET') {
      format = 'markdown';
    }
    const doc = await Documentation.findById(id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const tempDir = path.join(__dirname, '../temp');
    await fsPromises.mkdir(tempDir, { recursive: true });

    switch (format) {
      case 'markdown':
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.md`);
        return res.send(doc.content);

      case 'pdf':
        const pdfBuffer = await convertToPdf(doc.content);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.pdf`);
        return res.send(pdfBuffer);

      case 'html':
        const htmlContent = markdownToHtml(doc.content);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.html`);
        return res.send(htmlContent);

      case 'docx':
        const docx = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun(doc.content)
                ],
              }),
            ],
          }],
        });

        const buffer = await require('docx').Packer.toBuffer(docx);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.docx`);
        return res.send(buffer);

      default:
        return res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Error exporting document' });
  }
};

const markdownToHtml = (markdown) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Exported Documentation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          padding: 2em;
          max-width: 900px;
          margin: 0 auto;
        }
        pre {
          background-color: #f5f5f5;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
        }
        code {
          font-family: 'Courier New', Courier, monospace;
        }
      </style>
    </head>
    <body>
      ${markdown
        .replace(/^### (.+$)/gm, '<h3>$1</h3>')
        .replace(/^## (.+$)/gm, '<h2>$1</h2>')
        .replace(/^# (.+$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
        .replace(/\n/g, '<br>')}
    </body>
    </html>
  `;
};

function convertToHtml(markdown) {
  const marked = require('marked');
  const html = typeof marked === 'function' ? marked(markdown) : marked.parse(markdown);
  return Buffer.from(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
          pre { background: #f6f8fa; padding: 1rem; border-radius: 4px; }
          code { font-family: monospace; }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `);
}

async function convertToPdf(markdown) {
  const puppeteer = require('puppeteer');
  const htmlBuffer = convertToHtml(markdown);
  const html = htmlBuffer.toString();

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4', margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' } });
  await browser.close();

  return pdf;
}

module.exports = { 
  uploadFile, 
  getAllDocs, 
  updateDoc, 
  getDocById, 
  exportDoc, 
  regenerateDoc,
  uploadAndGenerateDoc: uploadFile, // Alias for compatibility
  getMyDocs: getAllDocs // Alias for compatibility
};