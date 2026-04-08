"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
  suppressErrorRendering: true,
  flowchart: { 
    useMaxWidth: true, 
    htmlLabels: true,
    curve: 'basis' 
  },
  sequence: { 
    useMaxWidth: true,
    showSequenceNumbers: true
  },
  themeVariables: {
    primaryColor: '#8A4FFF',
    primaryTextColor: '#fff',
    primaryBorderColor: '#8A4FFF',
    lineColor: '#6366f1',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a'
  }
});

export default function MermaidRenderer({ chart }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart || !containerRef.current) return;
      
      try {
        // Universal "Nuclear" Sanitizer: Ensures Mermaid diagrams NEVER fail due to quotes/tags
        let processedChart = chart.split('\n').map(line => {
          let cleanedLine = line.trim();

          // 1. Strip trailing semicolons (AI often adds them thinking it's JS)
          cleanedLine = cleanedLine.replace(/;+$/, '');

          // 2. Handle Subgraphs
          const subgraphMatch = cleanedLine.match(/^subgraph\s+(.+)$/i);
          if (subgraphMatch) {
            const [_, title] = subgraphMatch;
            const cleanTitle = title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
            return `subgraph "${cleanTitle}"`;
          }

          // 3. Deep-Clean every bracketed segment: ID[Label], ID{Label}, ID(Label), ID>Label]
          // This captures both standalone nodes and those inside relationships (e.g., A --> B{Label})
          cleanedLine = cleanedLine.replace(/([\[\(\{>]+)([^\]\}\)]+)([\]\}\)]+)/g, (match, open, label, close) => {
            const cleanLabel = label.replace(/[^a-zA-Z0-9 ]/g, '').trim();
            return `${open}"${cleanLabel}"${close}`;
          });

          // 4. Force quote relationship labels: A -- Label --> B
          cleanedLine = cleanedLine.replace(/(--|==|~~)\s*"?([^"\[\(\)> \-]+)"?\s*(--|==|~~|>>|>)/g, (match, start, label, end) => {
            const cleanLabel = label.replace(/[^a-zA-Z0-9 ]/g, '').trim();
            return `${start} "${cleanLabel}" ${end}`;
          });

          return cleanedLine;
        }).join('\n');

        // Global fallback cleanup
        processedChart = processedChart
          .replace(/<([^>]+)>/g, '$1') 
          .replace(/\\n/g, ' '); 

        // Check if syntax is valid before rendering
        await mermaid.parse(processedChart);

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, processedChart);
        
        if (svg.includes("Syntax error") || svg.includes("mermaid-error")) {
          throw new Error("Mermaid syntax error detected in SVG");
        }

        setSvg(svg);
        setError(false);
      } catch (err) {
        console.error("Mermaid check failed:", err);
        setError(true);
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="w-full mb-10 p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-start gap-4 shadow-sm select-none whitespace-normal">
        <div className="shrink-0 w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mt-0.5">
          <HiOutlineExclamationTriangle className="text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-amber-200/90 tracking-wide mb-1.5">Architecture Mapping Note</p>
          <p className="text-xs text-amber-200/60 leading-relaxed max-w-prose">
            This file's logic structure is exceptionally complex. To maintain documentation accuracy, a simplified visual mapping was skipped. Please refer to the <b>Technical Breakdown</b> below for the complete logic flow.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="mermaid-wrapper w-full overflow-x-auto flex justify-center bg-[#0d1117]/40 p-10 rounded-3xl border border-white/5 mb-10 hover:bg-[#0d1117]/60 transition-all duration-300"
      style={{ 
        shapeRendering: 'geometricPrecision', 
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased'
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
