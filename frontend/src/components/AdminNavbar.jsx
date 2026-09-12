"use client";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear admin token and user data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    // Redirect to admin login
    router.push('/admin-login');
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#0B0F1C] border-b border-white/10 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between z-30"
    >
      {/* Hamburger always visible */}
      <button
        className="text-white text-2xl mr-2"
        onClick={() => setIsSidebarOpen((open) => !open)}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <FaBars />
      </button>
      {/* App Title */}
      <div className="flex items-center gap-2 text-2xl font-bold tracking-tight select-none">
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] bg-clip-text text-transparent">
          QuillStackAI
        </span>
        <span className="text-[#6366F1]">Admin</span>
      </div>
      {/* User Avatar */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition"
          aria-label="Admin Profile"
        >
          <FaUserCircle className="text-2xl md:text-3xl text-[#6366F1]" />
          <span className="hidden md:inline text-base font-medium">Admin</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition"
          aria-label="Logout"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="hidden md:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </motion.header>
  );
}
