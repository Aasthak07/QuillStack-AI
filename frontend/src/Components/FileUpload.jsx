"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCloudArrowUp, HiOutlineDocumentText, HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineLockClosed, HiOutlineRocketLaunch } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";

const ALLOWED_TYPES = ["js", "jsx", "ts", "tsx", "py", "java", "html", "css"];

function getFileExt(filename) {
  return filename.split('.').pop().toLowerCase();
}

export default function FileUpload({ onUploadSuccess, onRequestLogin, includeAudit = false }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const validateFile = (file) => {
    if (!file) return false;
    const ext = getFileExt(file.name).trim();
    if (!ALLOWED_TYPES.includes(ext)) {
      setError(`Unsupported file type. Allowed: ${ALLOWED_TYPES.map(e => '.' + e).join(", ")}`);
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      const token = localStorage.getItem("token") || localStorage.getItem("userToken");
      if (!token) {
        if (onRequestLogin) onRequestLogin();
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    if (!token) {
      if (onRequestLogin) onRequestLogin();
      return;
    }
    
    setIsUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("includeAudit", includeAudit.toString());
    try {
      const res = await fetch("http://localhost:5000/api/docs/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (res.status === 401) {
        if (onRequestLogin) onRequestLogin();
        return;
      }
      
      const data = await res.json();
      if (data.success && data.data) {
        toast.success("Documentation generated!");
        if (onUploadSuccess) onUploadSuccess(data.data);
        setSelectedFile(null);
      } else {
        throw new Error(data.message || "No docs generated");
      }
    } catch (error) {
      setError(error.message || "Network Error");
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Toaster position="bottom-right" toastOptions={{
        className: 'glass-dark border border-white/5 text-white rounded-2xl',
        style: { background: 'rgba(11, 15, 28, 0.8)', backdropFilter: 'blur(12px)' }
      }} />


      <motion.div
        className={`relative group cursor-pointer rounded-3xl border-2 border-dashed transition-all p-10 text-center ${
          isDragActive ? "border-accent-primary bg-accent-primary/5 scale-[1.02]" : "border-white/10 hover:border-white/20 hover:bg-white/5"
        }`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragActive(false); const file = e.dataTransfer.files[0]; if (validateFile(file)) setSelectedFile(file); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.map(e => '.' + e).join(",")}
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <HiOutlineCloudArrowUp className="text-3xl text-accent-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-bold text-white">Select Code File</p>
            <p className="text-xs text-gray-500">Drag & drop or browse from computer</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 opacity-50">
            {ALLOWED_TYPES.slice(0, 4).map(t => <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase font-bold">{t}</span>)}
            <span className="text-[10px] font-bold">...</span>
          </div>
        </div>

        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 glass rounded-2xl border-accent-primary/20 flex items-center gap-3 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
              <HiOutlineDocumentText className="text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
            >
              <HiOutlineXMark className="text-xl" />
            </button>
          </motion.div>
        )}
      </motion.div>

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="w-full py-4 rounded-2xl bg-accent-primary text-white font-bold shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Architecting Docs...</span>
          </div>
        ) : (
          <>Generate Documentation <HiOutlineRocketLaunch className="text-xl" /></>
        )}
      </button>
    </div>
  );
}

