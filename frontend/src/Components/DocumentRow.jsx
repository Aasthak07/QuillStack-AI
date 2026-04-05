"use client";

import React, { useState } from "react";
import { HiOutlineEye, HiOutlineDocumentArrowDown, HiOutlineClipboardDocumentList, HiOutlineShare, HiOutlineTrash, HiOutlineCalendar, HiOutlineDocumentText } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function DocumentRow({ doc, onDelete }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this document forever?")) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/docs/${doc._id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Archived document removed");
      if (onDelete) onDelete(doc._id);
    } catch (err) {
      toast.error("Cloud sync failed");
      setIsDeleting(false);
    }
  };

  const title = doc.filename || "Untitled Architect";
  const language = doc.language || "Plaintext";
  
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const date = formatDate(doc.generatedAt);
  const previewText = doc.content ? doc.content.substring(0, 120) + "..." : "Initial draft pending...";
  
  const handleView = () => window.open(`/doc/${doc._id}`, '_blank');

  const handleCopy = () => {
    if (!doc.content) return;
    navigator.clipboard.writeText(doc.content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Copy failed"));
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/doc/${doc._id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `QuillStack AI - ${title}`, url: shareUrl });
        return;
      } catch (err) {}
    }
    navigator.clipboard.writeText(shareUrl)
      .then(() => toast.success("Share link ready"))
      .catch(() => toast.error("Link sync failed"));
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.createElement('div');
      element.innerHTML = `<div style="font-family: sans-serif; padding: 40px; color: #111;">${doc.content.replace(/\n/g, '<br>')}</div>`;
      
      const opt = {
        margin: 10,
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(opt).save();
      toast.success("PDF Blueprint exported");
    } catch (err) {
      toast.error("Export failed");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="group glass p-6 rounded-[32px] border-white/5 hover:border-accent-primary/20 hover:bg-white/5 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
        <HiOutlineDocumentText className="text-2xl" />
      </div>

      <div className="flex-1 min-w-0 space-y-1 cursor-pointer" onClick={handleView}>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white group-hover:text-accent-primary transition-colors truncate">
            {title}
          </h3>
          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            {language}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-1">
          {previewText}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <HiOutlineCalendar />
          {date}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
        <button onClick={handleView} className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-accent-primary/10 text-gray-400 hover:text-accent-primary transition-all border border-white/5">
          <HiOutlineEye className="text-xl mx-auto" />
        </button>
        <button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-accent-primary/10 text-gray-400 hover:text-accent-primary transition-all border border-white/5 disabled:opacity-30">
          <HiOutlineDocumentArrowDown className="text-xl mx-auto" />
        </button>
        <button onClick={handleCopy} className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-accent-primary/10 text-gray-400 hover:text-accent-primary transition-all border border-white/5">
          <HiOutlineClipboardDocumentList className="text-xl mx-auto" />
        </button>
        <button onClick={handleShare} className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-accent-primary/10 text-gray-400 hover:text-accent-primary transition-all border border-white/5">
          <HiOutlineShare className="text-xl mx-auto" />
        </button>
        <button onClick={handleDelete} disabled={isDeleting} className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all border border-white/5 disabled:opacity-30">
          <HiOutlineTrash className="text-xl mx-auto" />
        </button>
      </div>
    </div>
  );
}

