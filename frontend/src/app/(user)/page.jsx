"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineCube, HiOutlineShieldCheck, HiOutlineArrowRight, HiOutlineCommandLine, HiOutlineCloudArrowUp, HiOutlineUserGroup, HiOutlineShare } from "react-icons/hi2";
import Link from "next/link";
import ProductTourModal from "@/components/ProductTourModal";

const features = [
  { 
    icon: <HiOutlineSparkles className="text-accent-primary text-2xl" />, 
    title: "AI-Driven Precision",
    desc: "Our models don't just read code; they understand context, intent, and architecture." 
  },
  { 
    icon: <HiOutlineCube className="text-accent-primary text-2xl" />, 
    title: "Modular Structure",
    desc: "Automatically organizes docs into logical modules, classes, and functions." 
  },
  { 
    icon: <HiOutlineCommandLine className="text-accent-primary text-2xl" />, 
    title: "CLI Integration",
    desc: "Sync your documentation directly from your development environment." 
  },
  { 
    icon: <HiOutlineCloudArrowUp className="text-accent-primary text-2xl" />, 
    title: "Live Deployment",
    desc: "Deploy your docs to a hosted URL with a single command or commit." 
  },
  { 
    icon: <HiOutlineUserGroup className="text-accent-primary text-2xl" />, 
    title: "Team Sync",
    desc: "Collaborative editing and version control built especially for developers." 
  },
  { 
    icon: <HiOutlineShieldCheck className="text-accent-primary text-2xl" />, 
    title: "Enterprise Security",
    desc: "Your code never leaves your secure environment. Local-first analysis options." 
  },
];

const howItWorks = [
  { icon: <HiOutlineCommandLine />, title: "Connect Repo", desc: "Link your GitHub or local directory." },
  { icon: <HiOutlineSparkles />, title: "AI Analysis", desc: "Gemini AI parses your code structure." },
  { icon: <HiOutlineShare />, title: "Export & Sync", desc: "Generate Markdown, PDF, or HTML docs." },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTour, setShowTour] = useState(false);

  return (
    <div className="bg-[#060910] min-h-screen text-gray-200 selection:bg-accent-primary/20 bg-mesh pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-accent-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-orange/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex h-9" aria-hidden="true" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Your Code, <span className="text-gradient-orange">Documented</span> <br />
            by Intelligence.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Stop wasting hours on manual documentation. Let QuillStack AI analyze your codebase and generate professional, synchronized docs in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-white font-bold shadow-2xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              Start Building Free <HiOutlineArrowRight />
            </Link>
            <button
              onClick={() => setShowTour(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass border-white/10 font-bold hover:bg-white/5 transition-all"
            >
              Watch Product Tour
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Built for Modern Developers</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to maintain high-quality documentation without the overhead.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass border-white/5 hover:border-accent-primary/20 hover:bg-accent-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-primary/10 transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proof/Illustration Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="glass rounded-[40px] p-8 md:p-16 border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-primary/10 blur-[100px] pointer-events-none" />
          
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Docs that stay in sync with every commit.</h2>
            <div className="space-y-6">
              {[
                "Automatic type detection & mapping",
                "Project-wide architectual summaries",
                "Internal cross-referencing",
                "Export as Markdown, PDF, or interactive Web"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <HiOutlineShieldCheck className="text-accent-primary text-xl" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all">
              Try Interactive Demo
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="glass-dark rounded-2xl p-4 border-white/10 shadow-2xl relative">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <code className="text-xs md:text-sm text-accent-orange block space-y-1">
                <p className="opacity-50">// QuillStack AI - AutoDoc</p>
                <p className="text-white">analyze_project(<span className="text-accent-secondary">"./src"</span>) {'{'}</p>
                <p className="ml-4">context = parse_AST();</p>
                <p className="ml-4 text-accent-secondary">generate_markdown(context);</p>
                <p className="ml-4 text-green-400">deploy_to_hosted_url();</p>
                <p>{'}'}</p>
              </code>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-6 -right-6 p-4 glass rounded-2xl border-accent-orange/30 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <HiOutlineSparkles className="text-accent-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Documentation Ready</p>
                    <p className="text-[10px] text-gray-400">142 files analyzed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8 bg-mesh-warm rounded-[40px] border border-white/5 shadow-inner">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ready to reclaim <span className="text-gradient-orange">your time?</span></h2>
        <p className="text-gray-400 text-lg">Join 2,000+ developers documenting the future with QuillStack AI.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-white font-bold shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all">
            Get Started For Free
          </Link>
          <form 
            onSubmit={e => { e.preventDefault(); setSubscribed(true); }}
            className="w-full sm:w-auto flex items-center gap-2 p-1 glass rounded-2xl border-white/5"
          >
            <input 
              type="email" 
              placeholder="Stay updated" 
              className="bg-transparent px-4 py-2 text-sm outline-none w-full sm:w-48"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="px-4 py-2 rounded-xl bg-accent-orange/10 hover:bg-accent-orange/20 text-accent-orange text-sm font-bold transition-all">
              {subscribed ? "Done!" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {showTour && <ProductTourModal onClose={() => setShowTour(false)} />}
    </div>
  );
}

