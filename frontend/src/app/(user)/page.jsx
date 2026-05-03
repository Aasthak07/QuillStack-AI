"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineCube, HiOutlineShieldCheck, HiOutlineArrowRight, HiOutlineCommandLine, HiOutlineCloudArrowUp, HiOutlineUserGroup, HiOutlineShare } from "react-icons/hi2";
import Link from "next/link";
import ProductTourModal from "../../components/ProductTourModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import LiveDemoSection from "../../components/LiveDemoSection.jsx";


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
  const { user } = useAuth();

  const ctaHref = user ? "/generate-docs" : "/signup";
  const ctaLabel = user ? "Go to Generate Docs" : "Start Documenting";

  return (
    <div className="bg-[#060910] min-h-screen text-gray-200 selection:bg-accent-primary/20 bg-mesh pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-accent-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-orange/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-sm font-medium text-accent-orange"
          >
            <HiOutlineSparkles className="animate-pulse" />
            <span>AI-Powered Code Documentation</span>
          </motion.div>
          
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
            <Link href={ctaHref} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-white font-bold shadow-2xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              {ctaLabel} <HiOutlineArrowRight />
            </Link>
            <button
              onClick={() => setShowTour(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold hover:bg-indigo-600/30 hover:border-indigo-400/60 hover:text-white transition-all"
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

      {/* Live Animated Demo Section */}
      <LiveDemoSection />

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8 bg-mesh-warm rounded-[40px] border border-white/5 shadow-inner">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ready to reclaim <span className="text-gradient-orange">your time?</span></h2>
        <p className="text-gray-400 text-lg">Join 2,000+ developers documenting the future with QuillStack AI.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={ctaHref} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-white font-bold shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all">
            {user ? "Go to Generate Docs" : "Get Started For Free"}
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

