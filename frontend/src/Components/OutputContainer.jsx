"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function OutputContainer({ doc }) {
  return (
    <div className="flex-1 w-full bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-fuchsia-700/20 overflow-hidden flex flex-col relative min-h-[500px]">
      <AnimatePresence mode="popLayout">
        {doc ? (
          <motion.div
            key="documentation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex flex-col w-full h-full absolute inset-0 bg-[#0F131F]/60"
          >
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-white w-full scrollbar-thin scrollbar-thumb-fuchsia-700/50 scrollbar-track-transparent">
              <style dangerouslySetInnerHTML={{
                __html: `
                  .markdown-content h1 { color: #8A4FFF !important; font-size: 2rem !important; font-weight: 800 !important; margin-bottom: 1.5rem !important; margin-top: 1rem !important; line-height: 1.2 !important; letter-spacing: -0.025em; }
                  .markdown-content h2 { color: #A259FF !important; font-size: 1.5rem !important; font-weight: 700 !important; margin-bottom: 1.25rem !important; margin-top: 1.75rem !important; line-height: 1.3 !important; border-bottom: 1px solid rgba(138, 79, 255, 0.2); padding-bottom: 0.5rem; }
                  .markdown-content h3 { color: #B366FF !important; font-size: 1.25rem !important; font-weight: 600 !important; margin-bottom: 1rem !important; margin-top: 1.5rem !important; line-height: 1.4 !important; }
                  .markdown-content p { color: #E5E7EB !important; line-height: 1.75 !important; margin-bottom: 1.25rem !important; font-size: 1rem !important; }
                  .markdown-content ul, .markdown-content ol { margin-bottom: 1.25rem !important; margin-top: 0.5rem !important; padding-left: 1.5rem !important; }
                  .markdown-content li { color: #E5E7EB !important; line-height: 1.6 !important; margin-bottom: 0.5rem !important; }
                  .markdown-content code { background-color: rgba(31, 41, 55, 0.8) !important; color: #34D399 !important; padding: 0.25rem 0.5rem !important; border-radius: 0.375rem !important; font-family: 'Fira Code', monospace !important; font-size: 0.9em !important; }
                  .markdown-content pre { background-color: #111827 !important; border: 1px solid #374151 !important; border-radius: 0.75rem !important; padding: 1.25rem !important; margin: 1.5rem 0 !important; overflow-x: auto !important; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2); }
                  .markdown-content pre code { background-color: transparent !important; color: #34D399 !important; padding: 0 !important; border-radius: 0 !important; font-size: 0.9em !important; }
                  .markdown-content blockquote { border-left: 4px solid #8A4FFF !important; padding-left: 1.25rem !important; margin: 1.5rem 0 !important; color: #9CA3AF !important; font-style: italic !important; background: linear-gradient(90deg, rgba(138, 79, 255, 0.1) 0%, rgba(138, 79, 255, 0) 100%); padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; }
                  .markdown-content table { width: 100% !important; border-collapse: separate !important; border-spacing: 0; margin: 1.5rem 0 !important; border: 1px solid #374151; border-radius: 0.5rem; overflow: hidden; }
                  .markdown-content th, .markdown-content td { border-bottom: 1px solid #374151 !important; border-right: 1px solid #374151 !important; padding: 0.875rem 1rem !important; text-align: left !important; }
                  .markdown-content tr:last-child td { border-bottom: none !important; }
                  .markdown-content th:last-child, .markdown-content td:last-child { border-right: none !important; }
                  .markdown-content th { background-color: rgba(31, 41, 55, 0.9) !important; color: #A259FF !important; font-weight: 600 !important; }
                `
              }} />
              <div className="markdown-content">
                <ReactMarkdown>{doc.content || doc}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex items-center justify-center p-6 w-full h-full absolute inset-0 bg-gradient-to-b from-transparent to-black/20"
          >
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-fuchsia-700/20 blur-xl rounded-full"></div>
                <div className="relative w-20 h-20 bg-[#181C2A] rounded-full flex items-center justify-center border border-fuchsia-500/30 shadow-[0_0_25px_rgba(162,89,255,0.25)]">
                  <svg className="w-10 h-10 text-fuchsia-400 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white tracking-tight drop-shadow-sm">No Output Available Yet</h3>
              <p className="text-sm md:text-base text-fuchsia-200/60 max-w-[280px] mx-auto leading-relaxed">
                Upload a code file on the left side, and our AI will automatically structure and generate comprehensive documentation here.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
