"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { FaCheckCircle, FaCode, FaSyncAlt, FaUsers, FaCloudUploadAlt, FaMagic, FaEdit, FaShareAlt, FaGithub, FaDiscord, FaLinkedin, FaUserTie, FaUserCog, FaUserEdit, FaUserShield } from "react-icons/fa";

const features = [
  { icon: <FaCheckCircle className="text-[#8A4FFF] text-2xl" />, label: "Zero Manual Work" },
  { icon: <FaMagic className="text-[#8A4FFF] text-2xl" />, label: "Smart & Adaptive" },
  { icon: <FaSyncAlt className="text-[#8A4FFF] text-2xl" />, label: "Real-Time Sync" },
  { icon: <FaCloudUploadAlt className="text-[#8A4FFF] text-2xl" />, label: "Export Anywhere" },
  { icon: <FaUsers className="text-[#8A4FFF] text-2xl" />, label: "Built for Teams" },
];

const howItWorks = [
  { icon: <FaCode className="text-[#8A4FFF] text-2xl" />, title: "Connect Your Code" },
  { icon: <FaMagic className="text-[#8A4FFF] text-2xl" />, title: "AI Works Its Magic" },
  { icon: <FaEdit className="text-[#8A4FFF] text-2xl" />, title: "Refine with Ease" },
  { icon: <FaShareAlt className="text-[#8A4FFF] text-2xl" />, title: "Publish & Share" },
];

const featureTable = [
  ["Code-aware docs", "Role-based access", "Custom templates"],
  ["Multi-language", "Comments/annotations", "Version history"],
  ["CI/CD integration", "Dashboards", "Automation API"],
];

const audience = [
  { icon: <FaUserCog className="text-[#8A4FFF] text-2xl" />, label: "Developers", desc: "Instant, accurate docs for every commit." },
  { icon: <FaUserTie className="text-[#8A4FFF] text-2xl" />, label: "PMs", desc: "Project docs always up to date." },
  { icon: <FaUserShield className="text-[#8A4FFF] text-2xl" />, label: "DevOps", desc: "Docs that sync with your pipelines." },
  { icon: <FaUserEdit className="text-[#8A4FFF] text-2xl" />, label: "Technical Writers", desc: "Focus on clarity, not copy-paste." },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="bg-[#0B0F1C] min-h-screen text-[#EAEAEA] font-sans">
      <div className="mt-0">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >

            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              The Smarter Way to <span className="text-[#8A4FFF]">Generate Documentation</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 max-w-xl">
              Let AI analyze your code and auto-generate flawless docs—so you can focus on building.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="bg-[#8A4FFF] hover:bg-[#A259FF] text-white font-semibold px-5 py-2.5 rounded-lg shadow transition text-sm">
                Try QuillStackAI Free
              </button>
              <button className="bg-white/10 border border-[#8A4FFF] text-[#8A4FFF] hover:bg-[#8A4FFF] hover:text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm">
                Watch Demo
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="flex-1 flex justify-center items-center"
          >
            {/* Placeholder for AI/code illustration */}
            <div className="w-[260px] h-[160px] sm:w-[320px] sm:h-[200px] bg-gradient-to-br from-[#8A4FFF]/40 to-[#EA00FF]/20 rounded-3xl flex items-center justify-center shadow-2xl border border-[#8A4FFF]/20">
              <span className="text-3xl text-[#8A4FFF] font-black opacity-60">[AI Illustration]</span>
            </div>
          </motion.div>
        </section>

        {/* Why QuillStackAI */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-6 text-center"
          >
            Why QuillStackAI?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-center gap-3 bg-[#181C2A] rounded-xl p-4 shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {f.icon}
                <span className="text-base font-semibold">{f.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center bg-[#181C2A] rounded-xl p-5 w-full md:w-48 shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {step.icon}
                <span className="mt-3 text-base font-semibold">{step.title}</span>
                <span className="mt-1 text-gray-400 text-xs">Step {i + 1}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            What Our Users Say
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              className="flex-1 bg-[#181C2A] rounded-xl p-5 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-base mb-3">“QuillStackAI reduced our doc overhead by 90%...”</p>
              <span className="text-xs text-gray-400">— Priya R., CTO</span>
            </motion.div>
            <motion.div
              className="flex-1 bg-[#181C2A] rounded-xl p-5 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-base mb-3">“Docs that stay in sync with our sprint cycles...”</p>
              <span className="text-xs text-gray-400">— Diego M., Lead Dev</span>
            </motion.div>
          </div>
        </section>

        {/* Feature Table */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Feature Comparison
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#181C2A] rounded-xl overflow-hidden shadow text-left text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-base text-[#8A4FFF]">AI Core</th>
                  <th className="px-4 py-3 text-base text-[#8A4FFF]">Collaboration</th>
                  <th className="px-4 py-3 text-base text-[#8A4FFF]">Flexibility</th>
                </tr>
              </thead>
              <tbody>
                {featureTable.map((row, i) => (
                  <tr key={i} className="border-t border-[#222]">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-200">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-3xl mx-auto px-4 py-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold mb-4"
          >
            Start Writing Better Docs Today
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#8A4FFF] hover:bg-[#A259FF] text-white font-semibold px-6 py-3 rounded-lg shadow transition text-base">
              Get Started — Free Forever
            </button>
            <button className="bg-white/10 border border-[#8A4FFF] text-[#8A4FFF] hover:bg-[#8A4FFF] hover:text-white font-semibold px-6 py-3 rounded-lg transition text-base">
              Talk to Sales
            </button>
          </div>
        </section>

        {/* Email Newsletter */}
        <section className="max-w-2xl mx-auto px-4 py-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg font-bold mb-2"
          >
            Stay in the Loop
          </motion.h2>
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            onSubmit={e => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="px-3 py-2 rounded-lg bg-[#181C2A] border border-[#8A4FFF] text-white focus:outline-none focus:ring-2 focus:ring-[#8A4FFF] w-full sm:w-auto text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={subscribed}
            />
            <button
              type="submit"
              className="bg-[#8A4FFF] hover:bg-[#A259FF] text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm"
              disabled={subscribed}
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-1">Get AI documentation tips, updates, and case studies.</p>
        </section>

        {/* Audience Section */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Who Is QuillStackAI For?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {audience.map((a, i) => (
              <motion.div
                key={a.label}
                className="flex flex-col items-center bg-[#181C2A] rounded-xl p-5 shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {a.icon}
                <span className="mt-3 text-base font-semibold">{a.label}</span>
                <span className="mt-1 text-gray-400 text-xs text-center">{a.desc}</span>
              </motion.div>
            ))}
          </div>
        </section>
        

        <Footer />
      </div>
    </div>
  );
}
