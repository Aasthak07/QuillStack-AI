import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineCommandLine, HiOutlineCpuChip, HiOutlineDocumentText, HiOutlineGlobeAlt } from "react-icons/hi2";

const icons = [
  { Icon: HiOutlineSparkles, size: 40, top: "10%", left: "5%", delay: 0 },
  { Icon: HiOutlineCodeBracket, size: 60, top: "15%", left: "85%", delay: 2 },
  { Icon: HiOutlineCommandLine, size: 30, top: "45%", left: "10%", delay: 4 },
  { Icon: HiOutlineCpuChip, size: 50, top: "70%", left: "80%", delay: 1 },
  { Icon: HiOutlineDocumentText, size: 40, top: "85%", left: "15%", delay: 3 },
  { Icon: HiOutlineGlobeAlt, size: 35, top: "30%", left: "50%", delay: 5 },
  { Icon: HiOutlineSparkles, size: 25, top: "60%", left: "40%", delay: 2.5 },
  { Icon: HiOutlineCodeBracket, size: 45, top: "20%", left: "30%", delay: 1.5 },
];

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            color: i % 2 === 0 ? "var(--accent-orange)" : "var(--accent-primary)",
            filter: "blur(0.5px)"
          }}
        >
          <item.Icon style={{ width: item.size, height: item.size }} />
        </motion.div>
      ))}
      
      {/* Subtle Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-orange/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-primary/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}
