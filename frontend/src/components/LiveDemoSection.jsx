"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineDocumentArrowUp,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineCube,
} from "react-icons/hi2";

const DEMO_TABS = [
  { id: "docs", label: "API Docs", icon: <HiOutlineDocumentText /> },
  { id: "security", label: "Security", icon: <HiOutlineShieldCheck /> },
  { id: "arch", label: "Architecture", icon: <HiOutlineCube /> },
];

const DEMO_OUTPUTS = {
  docs: [
    { type: "comment", text: "## API Reference — userRouter.js" },
    { type: "blank", text: "" },
    { type: "route", text: "POST /user/add" },
    { type: "desc", text: "  Registers a new user account." },
    { type: "param", text: "  Body: { name, email, password }" },
    { type: "return", text: "  Returns: { token: JWT }" },
    { type: "blank", text: "" },
    { type: "route", text: "POST /user/authenticate" },
    { type: "desc", text: "  Authenticates user credentials." },
    { type: "param", text: "  Body: { email, password }" },
    { type: "return", text: "  Returns: { token: JWT }" },
  ],
  security: [
    { type: "comment", text: "## Security Audit Report" },
    { type: "blank", text: "" },
    { type: "critical", text: "🔴 CRITICAL: Hardcoded API Base URL" },
    { type: "desc", text: "  13 instances of localhost:5000 detected." },
    { type: "blank", text: "" },
    { type: "warning", text: "🟡 WARNING: No input sanitization on /upload" },
    { type: "desc", text: "  File type validation missing." },
    { type: "blank", text: "" },
    { type: "pass", text: "✅ PASSED: JWT Token Verification" },
    { type: "pass", text: "✅ PASSED: bcrypt Password Hashing" },
    { type: "pass", text: "✅ PASSED: Rate Limiting Active" },
  ],
  arch: [
    { type: "comment", text: "## Architecture Diagram" },
    { type: "blank", text: "" },
    { type: "desc", text: "  graph TD" },
    { type: "node", text: "    A[Next.js Frontend] --> B[Express API]" },
    { type: "node", text: "    B --> C[Auth Router]" },
    { type: "node", text: "    B --> D[Doc Router]" },
    { type: "node", text: "    B --> E[Admin Router]" },
    { type: "node", text: "    C & D & E --> F[(MongoDB)]" },
    { type: "node", text: "    D --> G[Gemini AI]" },
    { type: "blank", text: "" },
    { type: "pass", text: "✅ Diagram rendered successfully" },
  ],
};

const STEPS = [
  { id: "upload", label: "Upload File", icon: <HiOutlineDocumentArrowUp /> },
  { id: "analyze", label: "AI Analysis", icon: <HiOutlineSparkles /> },
  { id: "ready", label: "Docs Ready", icon: <HiOutlineCheckCircle /> },
];

const typeColors = {
  comment: "text-accent-orange font-bold",
  route: "text-blue-400 font-semibold",
  desc: "text-gray-300",
  param: "text-yellow-400",
  return: "text-green-400",
  critical: "text-red-400 font-bold",
  warning: "text-yellow-400 font-semibold",
  pass: "text-green-400",
  node: "text-purple-300",
  blank: "",
};

export default function LiveDemoSection() {
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState("docs");
  const [visibleLines, setVisibleLines] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const lineTimerRef = useRef(null);
  const stepTimerRef = useRef(null);

  const lines = DEMO_OUTPUTS[activeTab];

  const startDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStep(0);
    setVisibleLines(0);

    // Step 0 → upload (instant)
    stepTimerRef.current = setTimeout(() => {
      setStep(1); // analyzing
      setTimeout(() => {
        setStep(2); // ready — start typing
        let lineIdx = 0;
        const tick = () => {
          lineIdx++;
          setVisibleLines(lineIdx);
          if (lineIdx < lines.length) {
            lineTimerRef.current = setTimeout(tick, 100);
          } else {
            setIsRunning(false);
          }
        };
        lineTimerRef.current = setTimeout(tick, 100);
      }, 1200);
    }, 800);
  };

  // Re-run when tab changes
  useEffect(() => {
    clearTimeout(lineTimerRef.current);
    clearTimeout(stepTimerRef.current);
    setStep(0);
    setVisibleLines(0);
    setIsRunning(false);
  }, [activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl md:text-5xl font-bold">
          Watch it <span className="text-gradient-orange">work live.</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Click Run Demo to see QuillStack AI analyze a file and generate documentation in real time.
        </p>
      </div>

      <div className="glass rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
          {/* Step Indicators */}
          <div className="flex items-center gap-6">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                  step > i ? "bg-accent-orange text-white" :
                  step === i ? "bg-accent-orange/20 text-accent-orange ring-1 ring-accent-orange" :
                  "bg-white/5 text-gray-600"
                }`}>
                  {s.icon}
                </div>
                <span className={`text-xs font-bold hidden sm:block transition-colors ${step >= i ? "text-white" : "text-gray-600"}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-px transition-all duration-700 ${step > i ? "bg-accent-orange" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Run Button */}
          <motion.button
            onClick={startDemo}
            disabled={isRunning}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-xl bg-accent-orange/90 hover:bg-accent-orange text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <HiOutlineSparkles className={isRunning ? "animate-spin" : ""} />
            {isRunning ? "Analyzing..." : "▶ Run Demo"}
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[360px]">
          {/* Left Panel — Input */}
          <div className="border-r border-white/5 p-6 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Input File</p>

            {/* File Card */}
            <motion.div
              animate={step >= 1 ? { borderColor: "rgba(251,146,60,0.4)", backgroundColor: "rgba(251,146,60,0.05)" } : {}}
              className="rounded-2xl border border-white/10 p-4 flex items-center gap-4 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                <HiOutlineDocumentArrowUp className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">userRouter.js</p>
                <p className="text-xs text-gray-500">JavaScript · 3.4 KB</p>
              </div>
              {step >= 1 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 text-accent-orange"
                >
                  {step === 1 ? "Analyzing..." : "✓ Done"}
                </motion.span>
              )}
            </motion.div>

            {/* Output Type Tabs */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Output Type</p>
              <div className="flex gap-2 flex-wrap">
                {DEMO_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? "bg-accent-orange/10 text-accent-orange border border-accent-orange/30"
                        : "bg-white/5 text-gray-400 border border-white/5 hover:text-white"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {step === 0 && !isRunning && (
              <p className="text-xs text-gray-600 pt-4">Press <span className="text-accent-orange font-bold">▶ Run Demo</span> to start the simulation.</p>
            )}
          </div>

          {/* Right Panel — Output */}
          <div className="p-6 font-mono text-xs overflow-auto max-h-[360px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 font-sans">Generated Output</p>

            <AnimatePresence mode="wait">
              {step < 2 ? (
                <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-gray-600">
                  {step === 1 && <HiOutlineSparkles className="animate-spin text-accent-orange" />}
                  <span>{step === 0 ? "Waiting to start..." : "AI is analyzing your code..."}</span>
                </motion.div>
              ) : (
                <motion.div key="output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0.5">
                  {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`leading-6 whitespace-pre ${typeColors[line.type] || "text-gray-400"}`}
                    >
                      {line.text || "\u00A0"}
                    </motion.p>
                  ))}
                  {visibleLines < lines.length && isRunning && (
                    <span className="inline-block w-1.5 h-4 bg-accent-orange animate-pulse ml-1" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
