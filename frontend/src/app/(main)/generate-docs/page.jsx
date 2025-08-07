"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/FileUpload";
import ReactMarkdown from "react-markdown";

export default function GenerateDocsPage() {
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (!token) return <div>Unauthorized</div>;

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/docs/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to generate doc");
      setDoc(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExportMarkdown = () => {
    if (!doc?._id) return;
    window.open(`http://localhost:5000/api/docs/export/${doc._id}/markdown`, '_blank');
  };

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
        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-2xl px-8 py-8 shadow-2xl border border-fuchsia-700/20"
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
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            required
            className="px-4 py-2 rounded-lg border border-fuchsia-700 bg-[#181C2A] text-white placeholder:text-fuchsia-400 focus:ring-2 focus:ring-fuchsia-700 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-lg font-semibold shadow transition"
          >
            Upload & Generate
          </button>
        </form>
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
        <AnimatePresence>
          {doc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-white bg-[#181C2A] border border-[#6366F1]/30 rounded-xl p-6 shadow max-h-96 overflow-y-auto relative prose prose-invert prose-fuchsia dark:prose-invert dark:prose-fuchsia"
            >
              <ReactMarkdown>{doc.content || doc}</ReactMarkdown>
              {doc._id && (
                <button
                  className="mt-6 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-lg font-semibold shadow transition"
                  onClick={handleExportMarkdown}
                >
                  Export as Markdown
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
