"use client";
import { useState } from "react";
import AdminSidebar from "../../../Components/AdminSidebar";
import AdminNavbar from "../../../Components/AdminNavbar";
import { motion } from "framer-motion";
import { FaUsers, FaFileAlt, FaCogs, FaHourglassHalf } from "react-icons/fa";

function DashboardCard({ label, value, icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-gradient-to-br ${color} border border-white/10 rounded-xl p-6 shadow-md text-white flex items-center space-x-4`}
    >
      <div>{icon}</div>
      <div>
        <div className="text-lg font-semibold mb-1">{label}</div>
        <div className="text-2xl font-bold tracking-wide">{value}</div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboardPage(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = 240;
  const navbarHeight = 64; // px, adjust if your AdminNavbar height changes
  const metrics = [
    {
      label: "Total Users",
      value: props.totalUsers ?? "1,245",
      icon: <FaUsers className="text-3xl text-[#3B82F6]" />, color: "from-[#3B82F6]/80 to-[#6366F1]/80",
    },
    {
      label: "Docs Generated",
      value: props.docsGenerated ?? "3,875",
      icon: <FaFileAlt className="text-3xl text-[#6366F1]" />, color: "from-[#6366F1]/80 to-[#3B82F6]/80",
    },
    {
      label: "Active Sessions",
      value: props.activeSessions ?? "89",
      icon: <FaCogs className="text-3xl text-[#3B82F6]" />, color: "from-[#3B82F6]/80 to-[#6366F1]/80",
    },
    {
      label: "Pending Approvals",
      value: props.pendingApprovals ?? "12",
      icon: <FaHourglassHalf className="text-3xl text-[#6366F1]" />, color: "from-[#6366F1]/80 to-[#3B82F6]/80",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#181C2A] via-[#232946] to-[#0B0F1C]">
      <AdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 relative">
        <AdminSidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} style={{ top: navbarHeight, height: `calc(100vh - ${navbarHeight}px)` }} />
        <main
          className="flex-1 transition-all duration-300 px-6 pt-20"
          style={{ marginLeft: isSidebarOpen ? sidebarWidth : 0 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold md:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#A259FF] mb-8 drop-shadow-md tracking-tight font-sans"
          >
            Admin Dashboard
          </motion.h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                whileHover={{ scale: 1.045 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-2xl bg-gradient-to-br from-[#232946]/80 to-[#181C2A]/80 border border-white/10 shadow-xl hover:shadow-2xl p-7 flex items-center gap-4 cursor-pointer group transition-all duration-300"
              >
                <div className={`text-4xl ${metric.icon.props.className} group-hover:scale-110 transition-transform duration-300`}>{metric.icon}</div>
                <div>
                  <div className="text-lg font-semibold text-white/80 mb-1 tracking-wide group-hover:text-white transition-colors duration-300">{metric.label}</div>
                  <div className="text-3xl font-extrabold tracking-tight text-white drop-shadow group-hover:text-[#6366F1] transition-colors duration-300">{metric.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
