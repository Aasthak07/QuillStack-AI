"use client";

import React, { useState, useEffect } from "react";
import DocumentRow from "./DocumentRow";
import { FaFileAlt, FaSpinner } from "react-icons/fa";

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
        
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        
        const data = await response.json();
        setDocs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch documents. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocs();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
        <FaSpinner className="animate-spin text-fuchsia-500 text-4xl mb-4" />
        <p className="text-gray-400 font-medium">Loading your generated documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center max-w-md">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-sm bg-red-500/20 hover:bg-red-500/40 text-red-300 px-4 py-2 rounded-lg transition-colors mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[50vh] text-center">
        <div className="w-24 h-24 bg-fuchsia-700/10 rounded-full flex items-center justify-center mb-6 border border-fuchsia-700/30">
          <FaFileAlt className="text-fuchsia-500/50 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No documents generated yet</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          You haven't generated any AI documentation yet. Head over to the generator to create your first document!
        </p>
        <a 
          href="/generate-docs" 
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all"
        >
          Generate Documentation
        </a>
      </div>
    );
  }

  const handleRemoveDoc = (id) => {
    setDocs(docs.filter(doc => doc._id !== id));
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-5xl mx-auto">
      {docs.map((doc) => (
        <DocumentRow key={doc._id} doc={doc} onDelete={handleRemoveDoc} />
      ))}
    </div>
  );
}
