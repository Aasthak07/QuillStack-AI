"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";

export default function OutputContainer({ doc }) {
  return (
    <div className="flex-1 w-full bg-[#060910] min-h-[500px] relative overflow-hidden flex flex-col">
      <AnimatePresence mode="popLayout">
        {doc ? (
          <motion.div
            key="documentation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 overflow-y-auto px-8 py-10 text-gray-200 w-full"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                .markdown-content h1 { color: #F8FAFC !important; font-size: 2.25rem !important; font-weight: 800 !important; margin-bottom: 2rem !important; letter-spacing: -0.025em; border-left: 4px solid var(--accent-primary); padding-left: 1rem; }
                .markdown-content h2 { color: #F1F5F9 !important; font-size: 1.5rem !important; font-weight: 700 !important; margin-top: 2.5rem !important; margin-bottom: 1rem !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; }
                .markdown-content h3 { color: #E2E8F0 !important; font-size: 1.25rem !important; font-weight: 600 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important; }
                .markdown-content p { color: #94A3B8 !important; line-height: 1.8 !important; margin-bottom: 1.25rem !important; font-size: 1rem !important; }
                .markdown-content ul, .markdown-content ol { margin-bottom: 1.25rem !important; padding-left: 1.25rem !important; color: #94A3B8 !important; }
                .markdown-content li { margin-bottom: 0.5rem !important; }
                .markdown-content code { background-color: rgba(255,255,255,0.05) !important; color: var(--accent-primary) !important; padding: 0.2rem 0.4rem !important; border-radius: 0.5rem !important; font-size: 0.9em !important; font-family: 'JetBrains Mono', monospace !important; }
                .markdown-content pre { background-color: rgba(0,0,0,0.3) !important; border: 1px solid rgba(255,255,255,0.05) !important; border-radius: 1rem !important; padding: 1.5rem !important; margin: 1.5rem 0 !important; overflow-x: auto !important; }
                .markdown-content pre code { background-color: transparent !important; color: #E2E8F0 !important; padding: 0 !important; font-size: 0.85em !important; }
                .markdown-content blockquote { border-left: 4px solid rgba(255,255,255,0.1) !important; padding: 1rem 1.5rem !important; margin: 1.5rem 0 !important; color: #64748B !important; font-style: italic !important; background-color: rgba(255,255,255,0.02) !important; border-radius: 0 1rem 1rem 0; }
                .markdown-content table { width: 100% !important; border-collapse: collapse !important; margin: 1.5rem 0 !important; border-radius: 0.75rem !important; overflow: hidden; background-color: rgba(255,255,255,0.02) !important; }
                .markdown-content th, .markdown-content td { padding: 1rem !important; text-align: left !important; border: 1px solid rgba(255,255,255,0.05) !important; }
                .markdown-content th { background-color: rgba(255,255,255,0.05) !important; color: #F8FAFC !important; font-weight: 700 !important; }
              `
            }} />
            <div className="markdown-content">
              <ReactMarkdown>{doc.content || doc}</ReactMarkdown>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-primary/20 blur-[60px] rounded-full" />
              <div className="relative w-20 h-20 glass rounded-3xl flex items-center justify-center text-accent-primary border-white/10 shadow-2xl">
                <HiOutlineDocumentMagnifyingGlass className="text-4xl" />
              </div>
            </div>
            <div className="space-y-2 max-w-xs scale-95 opacity-80">
              <h3 className="text-xl font-bold text-white">Analysis Pending</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connect your repository or upload a file to begin the AI-powered documentation process.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

