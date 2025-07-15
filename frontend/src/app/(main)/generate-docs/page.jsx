"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/FileUpload";

export default function GenerateDocsPage() {
  const [generatedDocs, setGeneratedDocs] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C] relative overflow-hidden">
      {/* Animated fuchsia radial background */}
      <style jsx>{`
        @keyframes flow-diagonal {
          0% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
          50% { transform: translate(20%, -40%) rotate(-25deg); opacity: 0.4; }
          100% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-0 top-1/4 w-[60vw] h-[40vw] max-w-2xl max-h-[30vh] rounded-full bg-fuchsia-700 opacity-30 blur-3xl rotate-[-25deg]"
          style={{
            animation: "flow-diagonal 6s ease-in-out infinite",
          }}
        ></div>
      </div>
      <motion.div
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-md rounded-2xl px-8 py-8 shadow-2xl border border-fuchsia-700/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Generate Documentation
        </motion.h1>
        <motion.p
          className="text-base text-fuchsia-200 mb-8 text-center max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Upload your code file to let <span className="text-fuchsia-400 font-semibold">QuillStackAI</span> generate documentation automatically
        </motion.p>
        <FileUpload onUploadSuccess={setGeneratedDocs} />

        {/* Generated Docs Display */}
        <AnimatePresence>
          {generatedDocs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-[#181C2A] border border-[#6366F1]/30 rounded-xl p-6 shadow max-h-96 overflow-y-auto relative"
            >
              <pre className="whitespace-pre-wrap text-white text-sm font-mono">{generatedDocs}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
