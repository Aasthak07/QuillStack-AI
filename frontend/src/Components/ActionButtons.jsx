"use client";
import React from "react";
import { FaFilePdf, FaCopy, FaShareAlt, FaMarkdown } from "react-icons/fa";

export default function ActionButtons({
  doc,
  isGeneratingPdf,
  onExportMarkdown,
  onDownloadPdf,
  onCopy,
  onShare,
}) {
  const isDisabled = !doc;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-[#111625] p-3 rounded-2xl border border-fuchsia-700/20 shadow-lg w-full mb-6 relative z-20">
      <div className="relative group flex-1 min-w-[120px]">
        <button
          className="w-full px-4 py-2.5 bg-white/5 hover:bg-fuchsia-700/80 text-white rounded-xl font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          onClick={onExportMarkdown}
          disabled={isDisabled}
        >
          <FaMarkdown className="text-lg text-fuchsia-400 group-hover:text-white transition-colors" /> Markdown
        </button>
        {isDisabled && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-fuchsia-700/30 text-xs text-white font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Generate content to enable
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-fuchsia-700/30 rotate-45"></div>
          </div>
        )}
      </div>

      <div className="relative group flex-1 min-w-[120px]">
        <button
          className="w-full px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-[#6366F1] hover:opacity-90 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(162,89,255,0.4)] hover:shadow-[0_0_20px_rgba(162,89,255,0.6)] transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
          onClick={onDownloadPdf}
          disabled={isDisabled || isGeneratingPdf}
        >
          <FaFilePdf className="text-lg text-white" /> 
          {isGeneratingPdf ? "Generating..." : "Download PDF"}
        </button>
        {isDisabled && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-fuchsia-700/30 text-xs text-white font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Generate content to enable
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-fuchsia-700/30 rotate-45"></div>
          </div>
        )}
      </div>

      <div className="relative group flex-1 min-w-[120px]">
        <button
          className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-white rounded-xl font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:bg-white/5"
          onClick={onCopy}
          disabled={isDisabled}
        >
          <FaCopy className="text-lg text-gray-300 group-hover:text-white transition-colors" /> Copy
        </button>
        {isDisabled && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-fuchsia-700/30 text-xs text-white font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Generate content to enable
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-fuchsia-700/30 rotate-45"></div>
          </div>
        )}
      </div>

      <div className="relative group flex-1 min-w-[120px]">
        <button
          className="w-full px-4 py-2.5 bg-white/5 hover:bg-[#6366F1]/80 border border-transparent hover:border-[#6366F1]/30 text-white rounded-xl font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:bg-white/5"
          onClick={onShare}
          disabled={isDisabled}
        >
          <FaShareAlt className="text-lg text-blue-300 group-hover:text-white transition-colors" /> Share
        </button>
        {isDisabled && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-fuchsia-700/30 text-xs text-white font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Generate content to enable
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-fuchsia-700/30 rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
}
