"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/FileUpload";
import ReactMarkdown from "react-markdown";

export default function GenerateDocsPage() {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState("");

  const handleExportMarkdown = () => {
    if (!doc?._id) return;
    window.open(`http://localhost:5000/api/docs/export/${doc._id}/markdown`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C] relative overflow-hidden">
      {/* Animated fuchsia radial background */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flow-diagonal {
            0% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
            50% { transform: translate(20%, -40%) rotate(-25deg); opacity: 0.4; }
            100% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
          }
        `
      }} />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-0 top-1/4 w-[60vw] h-[40vw] max-w-2xl max-h-[30vh] rounded-full bg-fuchsia-700 opacity-30 blur-3xl rotate-[-25deg]"
          style={{
            animation: "flow-diagonal 6s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Two Panel Layout */}
      <div className="relative z-10 flex h-screen pt-16">
        {/* Left Panel - Upload & Generate (40%) */}
        <motion.div
          className="w-2/5 p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-md mx-auto w-full">
            <motion.h1
              className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Generate Documentation
            </motion.h1>
            <motion.p
              className="text-base text-fuchsia-200 mb-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Upload your code file to let <span className="text-fuchsia-400 font-semibold">QuillStackAI</span> generate documentation automatically
            </motion.p>
            <FileUpload onUploadSuccess={setDoc} />
            {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
          </div>
        </motion.div>

        {/* Right Panel - Generated Documentation (60%) */}
        <motion.div
          className="w-3/5 p-8 border-l border-fuchsia-700/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="h-full flex flex-col">
            <motion.h2
              className="text-2xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Generated Documentation
            </motion.h2>
            
            <AnimatePresence mode="wait">
              {doc ? (
                <motion.div
                  key="documentation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-fuchsia-700/20 overflow-hidden flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto text-white max-w-none">
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        .markdown-content h1 {
                          color: #8A4FFF !important;
                          font-size: 1.875rem !important;
                          font-weight: 700 !important;
                          margin-bottom: 1.5rem !important;
                          margin-top: 2rem !important;
                          line-height: 1.2 !important;
                        }
                        .markdown-content h2 {
                          color: #A259FF !important;
                          font-size: 1.5rem !important;
                          font-weight: 600 !important;
                          margin-bottom: 1.25rem !important;
                          margin-top: 1.75rem !important;
                          line-height: 1.3 !important;
                        }
                        .markdown-content h3 {
                          color: #B366FF !important;
                          font-size: 1.25rem !important;
                          font-weight: 600 !important;
                          margin-bottom: 1rem !important;
                          margin-top: 1.5rem !important;
                          line-height: 1.4 !important;
                        }
                        .markdown-content h4, .markdown-content h5, .markdown-content h6 {
                          color: #C473FF !important;
                          font-weight: 600 !important;
                          margin-bottom: 0.75rem !important;
                          margin-top: 1.25rem !important;
                          line-height: 1.4 !important;
                        }
                        .markdown-content p {
                          color: #E5E7EB !important;
                          line-height: 1.7 !important;
                          margin-bottom: 1.25rem !important;
                          font-size: 0.95rem !important;
                        }
                        .markdown-content ul, .markdown-content ol {
                          margin-bottom: 1.25rem !important;
                          margin-top: 0.5rem !important;
                          padding-left: 1.5rem !important;
                        }
                        .markdown-content li {
                          color: #E5E7EB !important;
                          line-height: 1.6 !important;
                          margin-bottom: 0.5rem !important;
                        }
                        .markdown-content code {
                          background-color: #1F2937 !important;
                          color: #10B981 !important;
                          padding: 0.25rem 0.5rem !important;
                          border-radius: 0.375rem !important;
                          font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace !important;
                          font-size: 0.875rem !important;
                          font-weight: 500 !important;
                        }
                        .markdown-content pre {
                          background-color: #111827 !important;
                          border: 1px solid #374151 !important;
                          border-radius: 0.5rem !important;
                          padding: 1rem !important;
                          margin: 1.5rem 0 !important;
                          overflow-x: auto !important;
                        }
                        .markdown-content pre code {
                          background-color: transparent !important;
                          color: #10B981 !important;
                          padding: 0 !important;
                          border-radius: 0 !important;
                          font-size: 0.875rem !important;
                          line-height: 1.5 !important;
                        }
                        .markdown-content blockquote {
                          border-left: 4px solid #8A4FFF !important;
                          padding-left: 1rem !important;
                          margin: 1.5rem 0 !important;
                          color: #D1D5DB !important;
                          font-style: italic !important;
                        }
                        .markdown-content table {
                          width: 100% !important;
                          border-collapse: collapse !important;
                          margin: 1.5rem 0 !important;
                        }
                        .markdown-content th, .markdown-content td {
                          border: 1px solid #374151 !important;
                          padding: 0.75rem !important;
                          text-align: left !important;
                        }
                        .markdown-content th {
                          background-color: #1F2937 !important;
                          color: #A259FF !important;
                          font-weight: 600 !important;
                        }
                        .markdown-content td {
                          color: #E5E7EB !important;
                        }
                        .markdown-content a {
                          color: #8A4FFF !important;
                          text-decoration: underline !important;
                        }
                        .markdown-content a:hover {
                          color: #A259FF !important;
                        }
                      `
                    }} />
                    <div className="markdown-content">
                      <ReactMarkdown>{doc.content || doc}</ReactMarkdown>
                    </div>
                  </div>
                  {doc._id && (
                    <div className="mt-6 pt-4 border-t border-fuchsia-700/20">
                      <button
                        className="w-full px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-lg font-semibold shadow transition"
                        onClick={handleExportMarkdown}
                      >
                        Export as Markdown
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-fuchsia-700/20 flex items-center justify-center"
                >
                  <div className="text-center text-fuchsia-300">
                    <div className="w-16 h-16 bg-fuchsia-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-fuchsia-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">No documentation generated yet</p>
                    <p className="text-sm opacity-70">Upload a code file to generate documentation</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
