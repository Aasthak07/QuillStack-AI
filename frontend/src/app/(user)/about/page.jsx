"use client";

import { motion } from "framer-motion";
import { HiOutlineRocketLaunch, HiOutlineLightBulb, HiOutlineStar, HiOutlineUserCircle, HiOutlineGlobeAlt, HiOutlineCodeBracketSquare, HiOutlineArrowRight } from "react-icons/hi2";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#060910] text-[#F8FAFC] selection:bg-accent-primary/20 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-sm font-bold text-accent-orange uppercase tracking-widest"
          >
            <HiOutlineLightBulb />
            <span>The Vision</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Elevating the <span className="text-gradient-orange">Standard of Code</span> documentation.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            QuillStack AI was born out of a simple frustration: developers spend too much time writing docs and not enough time writing code. We're here to change that.
          </motion.p>
        </header>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Why we built QuillStack</h2>
            <div className="space-y-6 text-gray-400">
              <p>
                As developers, we know that great projects often fail not because of bad code, but because of poor communication. Documentation is the bridge between a codebase and its contributors.
              </p>
              <p>
                QuillStack leverages the power of Gemini AI to bridge this gap automatically. It doesn't just "summarize"—it understands the underlying logic, detects edge cases, and provides context that humans often miss.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="glass px-6 py-4 rounded-2xl border-white/5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">90%</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Time Saved</span>
              </div>
              <div className="glass px-6 py-4 rounded-2xl border-white/5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">2.4k+</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Repos Synced</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/20 blur-[100px] -z-10" />
            <div className="glass rounded-3xl p-8 border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <HiOutlineRocketLaunch className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold">Our Mission</h3>
                  <p className="text-sm text-gray-400">To make "documentation debt" a thing of the past.</p>
                </div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <HiOutlineGlobeAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold">Global Scale</h3>
                  <p className="text-sm text-gray-400">Supporting teams across 40+ countries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Creator Section */}
        <section className="glass rounded-[40px] p-8 md:p-16 border-white/5 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden bg-mesh-warm">
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-accent-orange/5 blur-[80px] pointer-events-none" />
          
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-accent-orange to-accent-primary flex items-center justify-center text-white text-5xl font-black shadow-2xl">
            AK
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Aastha Kumari</h2>
            <p className="text-accent-orange font-semibold uppercase tracking-widest text-xs">Founder & Lead Architect</p>
            <p className="text-gray-400 max-w-xl">
              "QuillStack was my final-year project at B.Tech IT, born from the need for cleaner, more maintainable code documentation in collaborative student projects."
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <a href="#" className="p-3 glass rounded-xl border-white/10 hover:text-accent-primary transition-all">
                <HiOutlineCodeBracketSquare className="text-xl" />
              </a>
              <a href="#" className="p-3 glass rounded-xl border-white/10 hover:text-accent-primary transition-all">
                <HiOutlineGlobeAlt className="text-xl" />
              </a>
            </div>
          </div>
        </section>

        {/* Tech Section */}
        <section className="text-center space-y-12">
          <h2 className="text-3xl font-bold">Cutting-edge Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Next.js 15", "Google Gemini AI", "MongoDB", "Node.js"].map((tech) => (
              <div key={tech} className="p-6 glass rounded-2xl border-white/5 hover:border-accent-primary/30 transition-all group">
                <span className="text-gray-400 group-hover:text-white transition-colors font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-8 bg-gradient-to-b from-transparent to-accent-primary/5 p-12 rounded-[40px]">
          <HiOutlineStar className="text-accent-secondary text-4xl mx-auto animate-spin-slow" />
          <h2 className="text-3xl md:text-4xl font-bold">Join the documentation revolution.</h2>
          <div className="flex justify-center">
            <Link href="/signup" className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              Get Started for Free <HiOutlineArrowRight />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

