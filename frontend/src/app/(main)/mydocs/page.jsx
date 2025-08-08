// // Example: src/pages/mydocs.jsx
// "use client";
// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";

// export default function MyDocs() {
//   const [docs, setDocs] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return setError("Unauthorized");
//     fetch("/api/docs/mydocs", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (!data.success) throw new Error(data.error || "No documents found");
//         setDocs(data.data);
//       })
//       .catch(err => setError(err.message));
//   }, [token]);

//   return (
//     <div>
//       <h2>My Documents</h2>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {!error && docs.length === 0 && <div>No documents found</div>}
//       {docs.map(doc => (
//         <div key={doc._id} style={{ marginBottom: 24, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
//           <h4>{doc.filename}</h4>
//           <ReactMarkdown>{doc.docContent}</ReactMarkdown>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiDownload, FiShare2, FiFileText, FiFile, FiArrowLeft } from "react-icons/fi";

export default function MyDocs() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchDocs = async () => {
      if (!token) {
        setError("Please log in to view your documents");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/docs/mydocs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) throw new Error("Failed to fetch documents");
        
        const data = await response.json();
        setDocs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocs();
  }, [token]);

  const handleExport = async (docId, format) => {
    try {
      window.open(`http://localhost:5000/api/docs/export/${docId}/${format}`, '_blank');
    } catch (err) {
      setError("Failed to export document");
    }
  };

  const handleShare = async (doc) => {
    try {
      const shareData = {
        title: doc.filename,
        text: 'Check out this document I created with QuillStack AI',
        url: `${window.location.origin}/document/${doc._id}`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-4xl mb-4">📄</div>
          <p>Loading your documents...</p>
        </div>
      </div>
    );
  }

  if (selectedDoc) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedDoc(null)}
            className="flex items-center text-gray-400 hover:text-white mb-6"
          >
            <FiArrowLeft className="mr-2" /> Back to documents
          </button>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedDoc.filename}</h1>
                <p className="text-gray-400 text-sm">
                  Created on {new Date(selectedDoc.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport(selectedDoc._id, 'pdf')}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                  title="Download as PDF"
                >
                  <FiFile className="inline mr-1" /> PDF
                </button>
                <button
                  onClick={() => handleExport(selectedDoc._id, 'docx')}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                  title="Download as DOCX"
                >
                  <FiFileText className="inline mr-1" /> DOCX
                </button>
                <button
                  onClick={() => handleShare(selectedDoc)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                  title="Share"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{selectedDoc.docContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Documents
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!error && docs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-medium mb-2">No documents found</h3>
            <p className="text-gray-400">Your generated documents will appear here</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <div 
              key={doc._id} 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white truncate">{doc.filename}</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="h-20 overflow-hidden mb-4 text-gray-300 text-sm">
                  {doc.docContent?.substring(0, 150)}...
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View Full Document
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleShare(doc)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                      title="Share"
                    >
                      <FiShare2 size={18} />
                    </button>
                    <div className="relative group">
                      <button
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                        title="Download"
                      >
                        <FiDownload size={18} />
                      </button>
                      <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                        <button
                          onClick={() => handleExport(doc._id, 'pdf')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                        >
                          <FiFile className="mr-2" /> PDF
                        </button>
                        <button
                          onClick={() => handleExport(doc._id, 'docx')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                        >
                          <FiFileText className="mr-2" /> DOCX
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}