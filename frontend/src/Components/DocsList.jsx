"use client";

import React, { useState, useEffect } from "react";
import DocumentRow from "./DocumentRow";
import { HiOutlineDocumentText, HiOutlineArrowPath } from "react-icons/hi2";

export default function DocsList() {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/docs/my-docs", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        
        if (!response.ok) throw new Error("Failed to fetch documents");
        
        const data = await response.json();
        setDocs(data);
      } catch (err) {
        setError("Failed to fetch documents. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocs();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Syncing Library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[40vh]">
        <div className="glass p-8 rounded-[32px] border-red-500/20 text-center max-w-md space-y-6">
          <p className="text-red-400 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all font-bold text-sm"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-primary/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 glass rounded-[40px] flex items-center justify-center border-white/5 shadow-2xl">
            <HiOutlineDocumentText className="text-4xl text-accent-primary/50" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Empty Repository</h3>
          <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
            Your collection is currently empty. Start architecting your first document with our AI engine.
          </p>
        </div>
        <a 
          href="/generate-docs" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent-primary text-white font-bold rounded-2xl shadow-2xl shadow-accent-primary/20 hover:scale-[1.05] transition-all"
        >
          Architect New Doc
        </a>
      </div>
    );
  }

  const handleRemoveDoc = (id) => {
    setDocs(docs.filter(doc => doc._id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-6xl mx-auto">
      {docs.map((doc) => (
        <DocumentRow key={doc._id} doc={doc} onDelete={handleRemoveDoc} />
      ))}
    </div>
  );
}

