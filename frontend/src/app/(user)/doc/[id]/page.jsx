"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function SharedDocPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/docs/${id}`);
        if (!res.ok) throw new Error("Document not found or access denied");
        const data = await res.json();
        setDoc(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchDoc();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0B0F1C] relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
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
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute left-0 top-1/4 w-[60vw] h-[40vw] max-w-2xl max-h-[30vh] rounded-full bg-fuchsia-700 opacity-30 blur-3xl rotate-[-25deg]"
          style={{
            animation: "flow-diagonal 6s ease-in-out infinite",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow">
              QuillStack <span className="text-[#8A4FFF]">AI</span>
            </h1>
            <p className="text-lg text-fuchsia-200">
              Shared Documentation Reference
            </p>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center p-12 bg-white/5 backdrop-blur-md rounded-2xl border border-fuchsia-700/20 shadow-2xl"
              >
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-10 w-10 text-fuchsia-400 mb-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <p className="text-fuchsia-300 font-medium">Loading documentation...</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/20 text-center"
              >
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Error</h3>
                <p className="text-red-200 opacity-80">{error}</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-fuchsia-700/20"
              >
                {doc?.filename && (
                  <div className="mb-8 pb-4 border-b border-fuchsia-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">File: <span className="text-fuchsia-400">{doc.filename}</span></h2>
                      <p className="text-sm text-gray-400 mt-1">Generated: {new Date(doc.generatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .markdown-content h1 {
                      color: #8A4FFF !important;
                      font-size: 2rem !important;
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
                      margin-top: 2rem !important;
                      line-height: 1.3 !important;
                      border-bottom: 1px solid rgba(162, 89, 255, 0.2) !important;
                      padding-bottom: 0.5rem !important;
                    }
                    .markdown-content h3 {
                      color: #B366FF !important;
                      font-size: 1.25rem !important;
                      font-weight: 600 !important;
                      margin-bottom: 1rem !important;
                      margin-top: 1.5rem !important;
                      line-height: 1.4 !important;
                    }
                    .markdown-content p {
                      color: #E5E7EB !important;
                      line-height: 1.7 !important;
                      margin-bottom: 1.25rem !important;
                      font-size: 1rem !important;
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
                      font-family: 'Fira Code', monospace !important;
                      font-size: 0.9em !important;
                    }
                    .markdown-content pre {
                      background-color: #111827 !important;
                      border: 1px solid #374151 !important;
                      border-radius: 0.5rem !important;
                      padding: 1.25rem !important;
                      margin: 1.5rem 0 !important;
                      overflow-x: auto !important;
                    }
                    .markdown-content pre code {
                      background-color: transparent !important;
                      color: #10B981 !important;
                      padding: 0 !important;
                      border-radius: 0 !important;
                      font-size: 0.9em !important;
                    }
                    .markdown-content blockquote {
                      border-left: 4px solid #8A4FFF !important;
                      padding-left: 1.25rem !important;
                      margin: 1.5rem 0 !important;
                      color: #D1D5DB !important;
                      font-style: italic !important;
                      background: rgba(138, 79, 255, 0.05) !important;
                      padding: 1rem !important;
                      border-radius: 0 0.5rem 0.5rem 0 !important;
                    }
                    .markdown-content table {
                      width: 100% !important;
                      border-collapse: collapse !important;
                      margin: 1.5rem 0 !important;
                    }
                    .markdown-content th, .markdown-content td {
                      border: 1px solid #374151 !important;
                      padding: 0.75rem 1rem !important;
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
                  `
                }} />
                
                <div className="markdown-content text-white">
                  <ReactMarkdown>{doc?.content}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
