"use client";

import React from "react";
import { HiOutlineArrowDownTray, HiOutlineClipboardDocumentList, HiOutlineShare, HiOutlineDocumentArrowDown } from "react-icons/hi2";

export default function ActionButtons({
  doc,
  isGeneratingPdf,
  onExportMarkdown,
  onDownloadPdf,
  onCopy,
  onShare,
}) {
  const isDisabled = !doc;

  const Button = ({ onClick, disabled, icon, label, primary = false, tooltip }) => (
    <div className="relative group flex-1">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed ${
          primary 
            ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20 hover:scale-[1.02]" 
            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"
        }`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </button>
      {disabled && tooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-[10px] text-white font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          {tooltip}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      <Button 
        onClick={onExportMarkdown}
        disabled={isDisabled}
        icon={<HiOutlineArrowDownTray className="text-lg" />}
        label="Markdown"
        tooltip="Generate docs first"
      />
      <Button 
        onClick={onDownloadPdf}
        disabled={isDisabled || isGeneratingPdf}
        icon={<HiOutlineDocumentArrowDown className="text-lg" />}
        label={isGeneratingPdf ? "..." : "Export PDF"}
        primary
        tooltip="Generate docs first"
      />
      <Button 
        onClick={onCopy}
        disabled={isDisabled}
        icon={<HiOutlineClipboardDocumentList className="text-lg" />}
        label="Copy"
        tooltip="Generate docs first"
      />
      <Button 
        onClick={onShare}
        disabled={isDisabled}
        icon={<HiOutlineShare className="text-lg" />}
        label="Share"
        tooltip="Generate docs first"
      />
    </div>
  );
}

