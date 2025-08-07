// Example: src/pages/mydocs.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MyDocs() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return setError("Unauthorized");
    fetch("/api/docs/mydocs", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.error || "No documents found");
        setDocs(data.data);
      })
      .catch(err => setError(err.message));
  }, [token]);

  return (
    <div>
      <h2>My Documents</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!error && docs.length === 0 && <div>No documents found</div>}
      {docs.map(doc => (
        <div key={doc._id} style={{ marginBottom: 24, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
          <h4>{doc.filename}</h4>
          <ReactMarkdown>{doc.docContent}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}