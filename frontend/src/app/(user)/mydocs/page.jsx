"use client";

import { motion } from "framer-motion";
import DocsList from "@/components/DocsList";
import { HiOutlineCube } from "react-icons/hi2";

export default function MyDocsPage() {
  return (
    <div className="min-h-screen bg-[#060910] text-[#F8FAFC] selection:bg-accent-primary/20 pt-32 pb-20 px-6 bg-mesh">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold text-accent-primary uppercase tracking-widest"
          >
            <HiOutlineCube />
            <span>Document Library</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            My <span className="text-gradient">Collections.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Manage and share all documentation generated through the QuillStack AI engine.
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