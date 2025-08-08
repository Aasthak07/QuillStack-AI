"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaUpload, FaFileAlt, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ALLOWED_TYPES = [
  "js", "jsx", "ts", "tsx", "py", "java", "html", "css"
];

function getFileExt(filename) {
  return filename.split('.').pop().toLowerCase();
}

export default function FileUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const validateFile = (file) => {
    if (!file) return false;
    const ext = getFileExt(file.name).trim();
    if (!ALLOWED_TYPES.includes(ext)) {
      setError(
        `Unsupported file type. Allowed: ${ALLOWED_TYPES.map(e => '.' + e).join(", ")}`
      );
      toast.error(
        `Unsupported file type. Allowed: ${ALLOWED_TYPES.map(e => '.' + e).join(", ")}`
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    if (!token) {
      setError("Please login first to generate documentation");
      toast.error("Please login first to generate documentation");
      return;
    }
    
    setIsUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await fetch("http://localhost:5000/api/docs/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data) {
        toast.success("✅ Docs Generated Successfully!");
        if (onUploadSuccess) {
          onUploadSuccess(data.data);
        }
        setSelectedFile(null);
      } else {
        throw new Error(data.message || "No docs generated");
      }
    } catch (error) {
      setError(error.message || "Upload failed: Network Error");
      toast.error("Upload failed: " + (error.message || "Network Error"));
    } finally {
      setIsUploading(false);
    }
  };

  const filePreview = selectedFile && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-3 bg-[#181C2A] text-amber-200 border border-[#6366F1]/30 rounded-lg px-4 py-2 mt-3 shadow"
    >
      <FaFileAlt className="text-[#8A4FFF] text-lg" />
      <span className="text-sm text-white truncate max-w-[120px]">{selectedFile.name}</span>
      <span className="text-xs text-gray-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
      <FaCheckCircle className="text-green-400 ml-2" />
      <button
        onClick={handleRemoveFile}
        className="ml-2 text-gray-400 hover:text-red-400 transition"
        aria-label="Remove file"
      >
        <FaTimes />
      </button>
    </motion.div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: "#181C2A",
          color: "#EAEAEA",
          borderRadius: "0.75rem",
          boxShadow: "0 2px 16px 0 #8A4FFF33",
        },
        success: { style: { background: "#232946", color: "#A259FF" } },
        error: { style: { background: "#232946", color: "#FF6B6B" } },
      }} />
      <motion.div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl px-6 py-10 bg-gradient-to-br from-[#181C2A] to-[#232946] shadow-xl transition-all duration-300 cursor-pointer select-none relative ${
          isDragActive ? "border-[#A259FF] bg-[#232946] scale-105 shadow-2xl" : "border-[#6366F1]/40"
        }`}
        tabIndex={0}
        onClick={() => inputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.03, boxShadow: "0 0 32px 0 #8A4FFF55" }}
        whileTap={{ scale: 0.98 }}
        animate={isDragActive ? { scale: 1.04, boxShadow: "0 0 40px 8px #A259FF55" } : {}}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.map(e => '.' + e).join(",")}
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <FaUpload className="text-4xl text-[#8A4FFF] mb-2" />
        <p className="text-white text-base font-semibold mb-1">Drag & drop your code file here</p>
        <p className="text-xs text-gray-400 mb-2">or click to select (.js, .jsx, .ts, .tsx, .py, .java, .html, .css)</p>
        <AnimatePresence>{filePreview}</AnimatePresence>
        {!selectedFile && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs text-gray-500"
          >
            Max file size: 5MB
          </motion.span>
        )}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-xs text-center"
          >
            <FaTimesCircle className="inline mr-1" /> {error}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className={`w-full mt-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8A4FFF] to-[#6366F1] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#A259FF]/40`}
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        whileHover={!isUploading ? { scale: 1.04 } : {}}
        whileTap={!isUploading ? { scale: 0.98 } : {}}
        type="button"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="#A259FF" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Processing…</span>
          </>
        ) : (
          <>
            <FaUpload /> Upload & Generate Docs
          </>
        )}
      </motion.button>
    </div>
  );
}
