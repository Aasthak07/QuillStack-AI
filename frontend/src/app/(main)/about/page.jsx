"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaCheckCircle, FaFileAlt, FaCogs, FaRocket, FaRobot, FaLink, FaFileExport, FaBrain, FaGlobe, FaUserGraduate, FaEnvelope, FaTools, FaHandshake, FaStar, FaDiscord, FaBookOpen } from "react-icons/fa";

const features = [
  { icon: <FaRobot className="text-[#6366F1] text-4xl md:text-5xl" />, label: "AI-generated full documentation" },
  { icon: <FaLink className="text-[#6366F1] text-4xl md:text-5xl" />, label: "GitHub repo sync (planned)" },
  { icon: <FaFileExport className="text-[#6366F1] text-4xl md:text-5xl" />, label: "Export as .md, .pdf, .html" },
  { icon: <FaBrain className="text-[#6366F1] text-4xl md:text-5xl" />, label: "Learns project structure" },
  { icon: <FaGlobe className="text-[#6366F1] text-4xl md:text-5xl" />, label: "Powered by Gemini AI" },
];

const standApart = [
  "Project-level docs, not just snippets",
  "Uses Gemini AI for rich, dynamic generation",
  "GitHub integration (planned real-time sync)",
  "Multiple export options + live editor",
  "Versioning & collaboration (coming soon)",
  "Custom-built using MERN stack (no templates)",
];

const contactLinks = [
  { icon: <FaEnvelope className="text-[#6366F1] text-2xl" />, label: "feedback@quillstackai.com", href: "mailto:feedback@quillstackai.com" },
  { icon: <FaTools className="text-[#6366F1] text-2xl" />, label: "GitHub Repo", href: "https://github.com/your-repo" },
  { icon: <FaHandshake className="text-[#6366F1] text-2xl" />, label: "hello@quillstackai.com", href: "mailto:hello@quillstackai.com" },
  { icon: <FaStar className="text-yellow-400 text-2xl" />, label: "Star us on GitHub", href: "https://github.com/your-repo" },
  { icon: <FaDiscord className="text-indigo-400 text-2xl" />, label: "Join our Discord (coming soon)", href: "#" },
];

const zigzagSections = [
  {
    key: "mission",
    icon: <FaRocket className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "Our Mission",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-1 text-lg">
          <li>Great code deserves great documentation — without grunt work</li>
          <li>AI automation + intuitive workflows</li>
        </ul>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2"><FaFileAlt className="text-[#6366F1]" />Generate accurate docs from code</div>
          <div className="flex items-center gap-2"><FaCogs className="text-[#6366F1]" />Maintain consistency across teams</div>
          <div className="flex items-center gap-2"><FaRocket className="text-[#6366F1]" />Help developers focus on building</div>
        </div>
      </>
    ),
  },
  {
    key: "who",
    icon: <FaBookOpen className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "Who We Are",
    content: (
      <>
        <blockquote className="border-l-4 border-[#6366F1] pl-4 italic text-gray-300 mb-3">
          “QuillStackAI is an AI-powered documentation assistant designed to simplify how developers generate, manage, and export project documentation — all with a single click.”
        </blockquote>
        <ul className="list-disc ml-6 space-y-1">
          <li>Final-year B.Tech project</li>
          <li>Built using <span className="font-bold text-[#6366F1]">MERN + Gemini AI</span></li>
          <li>Developer-first approach, real-world pain → solved with tech</li>
        </ul>
      </>
    ),
  },
  {
    key: "features",
    icon: <FaBrain className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "Key Features",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <motion.div key={f.label} whileHover={{ scale: 1.04, backgroundColor: 'rgba(99,102,241,0.08)' }} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-[#6366F1]/20 shadow-lg transition">
            {f.icon}
            <span className="text-base font-medium">{f.label}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    key: "creator",
    icon: <FaUserGraduate className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "About the Creator",
    content: (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <FaUserGraduate className="text-[#6366F1] text-3xl" />
          <div>
            <div className="font-semibold text-lg">Aastha Kumari</div>
            <div className="text-gray-400 text-sm">Final-year IT student</div>
            <div className="text-gray-400 text-sm">Passionate about AI, automation & dev experience</div>
          </div>
        </div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <motion.a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#6366F1' }} className="text-gray-400 hover:text-[#6366F1] transition">
            <FaGithub size={28} />
          </motion.a>
          <motion.a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#6366F1' }} className="text-gray-400 hover:text-[#6366F1] transition">
            <FaLinkedin size={28} />
          </motion.a>
        </div>
      </div>
    ),
  },
  {
    key: "standapart",
    icon: <FaCheckCircle className="text-green-400 text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "How QuillStackAI Stands Apart",
    content: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {standApart.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03, backgroundColor: 'rgba(99,102,241,0.08)' }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-[#6366F1]/20 shadow-lg">
              <FaCheckCircle className="text-green-400" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
        {/* Comparison table removed as requested */}
      </>
    ),
  },
  {
    key: "workflow",
    icon: <FaCogs className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "How It Works",
    content: (
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-[#6366F1]/20 overflow-x-auto shadow-lg">
        <pre className="text-xs md:text-sm text-gray-300 bg-transparent p-0 m-0"><code>{`
          graph TD
            A[Import Code] --> B(Gemini AI Analysis)
            B --> C[Generate Draft]
            C --> D{Edit?}
            D -->|Yes| E[Live Editor]
            D -->|No| F[Export]
        `}</code></pre>
      </div>
    ),
  },
  {
    key: "vision",
    icon: <FaRocket className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "Our Vision",
    content: (
      <blockquote className="border-l-4 border-[#6366F1] pl-4 italic text-gray-300">
        “To evolve QuillStackAI into a go-to AI platform for fast, clean, exportable, and collaborative documentation that scales with teams and solo devs alike.”
      </blockquote>
    ),
  },
  {
    key: "contact",
    icon: <FaEnvelope className="text-[#6366F1] text-5xl md:text-6xl drop-shadow-lg" />,
    heading: "Contact & Collaboration",
    content: (
      <div className="flex flex-wrap gap-4">
        {contactLinks.map((c) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, color: '#6366F1' }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-[#6366F1]/20 text-gray-300 hover:text-[#6366F1] transition shadow-lg"
          >
            {c.icon}
            <span>{c.label}</span>
          </motion.a>
        ))}
      </div>
    ),
  },
];

// Add custom shine animation style
const shineStyle = `
@keyframes shine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export default function AboutUsPage() {
  return (
    <>
      <style>{shineStyle}</style>
      <div className="min-h-screen bg-[#0B0F1C] bg-gradient-to-br from-[#0B0F1C] via-[#181028] to-[#6366F1]/10 text-gray-200 font-sans">
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-32">
          {zigzagSections.map((section, idx) => (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} mt-12 md:mt-24`}
            >
              <div className="w-full">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 flex items-center gap-3 tracking-tight">
                  <span
                    className="bg-gradient-to-r from-[#3B82F6] via-[#a78bfa] to-[#6366F1] bg-[length:200%_100%] bg-clip-text text-transparent animate-shine"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #3B82F6, #a78bfa, #6366F1, #3B82F6)',
                      animation: 'shine 2.5s linear infinite',
                    }}
                  >
                    {section.heading}
                  </span>
                </h2>
                <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-[#6366F1]/20 shadow-2xl p-7 md:p-10 text-lg md:text-xl leading-relaxed w-full">
                  {section.content}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
        {/* Footer */}
        <footer className="border-t border-[#6366F1]/20 py-8 text-center text-gray-400 text-base mt-24">
          <div className="mb-2">© 2024 <span className="text-[#6366F1] font-bold">QuillStackAI</span> • Built with <span className="text-[#6366F1]">💜</span> by Aastha Kumari</div>
          <div>Powered by students. Inspired by developers. Driven by AI.</div>
        </footer>
      </div>
    </>
  );
}
