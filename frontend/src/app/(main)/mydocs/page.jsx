"use client";

import React from "react";
import { motion } from "framer-motion";
import DocsList from "../../../components/DocsList";

export default function MyDocsPage() {
  return (
    <div className="flex-1 w-full bg-[#0B0F1C] relative overflow-hidden">
      {/* Background Gradients matching general app theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-700/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF]">Documents</span>
          </h1>
          <p className="text-base text-gray-400 max-w-2xl">
            Access, view, and share the high-quality documentation generated directly from your codebase using the power of AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          <DocsList />
        </motion.div>
      </div>
    </div>
  );
}