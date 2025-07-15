"use client";
import { motion } from "framer-motion";
import { FaHome, FaUsers, FaFileAlt, FaScroll, FaCogs, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <FaHome /> },
  { name: "Manage Users", href: "/admin/users", icon: <FaUsers /> },
  { name: "Docs", href: "/admin/docs", icon: <FaFileAlt /> },
  { name: "Logs", href: "/admin/logs", icon: <FaScroll /> },
  { name: "Settings", href: "/admin/settings", icon: <FaCogs /> },
  { name: "Logout", href: "/admin/logout", icon: <FaSignOutAlt />, isLogout: true },
];

export default function AdminSidebar({ isOpen, setIsSidebarOpen, style }) {
  const pathname = usePathname();
  const sidebarWidth = 240;
  if (!isOpen) return null;

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
      window.location.href = "/admin-login";
    }
  };

  return (
    <motion.aside
      initial={{ x: -sidebarWidth }}
      animate={{ x: 0 }}
      exit={{ x: -sidebarWidth }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed left-0 h-screen w-[240px] bg-[#0B0F1C] text-white shadow-xl z-40 flex flex-col border-r border-white/10"
      style={style}
    >
      {/* Nav Links */}
      <nav className="flex-1 px-2 space-y-1">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin/dashboard" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={link.isLogout ? handleLogout : undefined}
              className={`flex items-center gap-3 p-3 rounded-md transition font-medium ${isActive
                ? "border-l-4 border-[#6366F1] bg-white/10 text-white font-bold"
                : "hover:bg-white/10 text-gray-300"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 text-xs text-gray-500 mt-auto">
        © {new Date().getFullYear()} QuillStackAI Admin
      </div>
    </motion.aside>
  );
}
