"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Generate Docs", href: "/generate-docs" },
  { name: "My Docs", href: "/mydocs" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  // Optional extras:
  // { name: "Pricing", href: "/pricing" },
  // { name: "How it Works", href: "/how-it-works" },
  // { name: "Resources", href: "/resources" },
  // { name: "Tech Stack", href: "/tech" },
  // { name: "Try Demo", href: "/demo" },
];

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => pathname === href;

  return (
    <nav
      className="w-full text-[#EAEAEA] shadow-lg z-50 relative"
      style={{
        background:
          "linear-gradient(90deg, #8A4FFF 0%, #EA00FF 50%, #0B0F1C 100%)",
        backgroundSize: "200% 200%",
        animation: "navbar-gradient-flow 8s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes navbar-gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className="absolute inset-0 bg-[#0B0F1C]/80 z-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 z-10">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white select-none"
        >
          QuillStack <span className="text-[#8A4FFF]">AI</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.08 }}
              className="relative"
            >
              <Link
                href={link.href}
                className={`px-3 py-2 rounded transition-colors duration-150 font-medium text-sm lg:text-base ${
                  isActive(link.href)
                    ? "text-[#8A4FFF] underline underline-offset-4"
                    : "hover:text-[#8A4FFF] focus:text-[#8A4FFF]"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#8A4FFF] rounded"
                  />
                )}
              </Link>
            </motion.div>
          ))}
          {/* Auth Buttons */}
          {isAuthenticated() ? (
            <div className="ml-4 flex items-center gap-3">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-[#8A4FFF] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium">
                  {user?.name || user?.email || "User"}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="ml-4 px-4 py-2 rounded bg-[#8A4FFF] text-white font-semibold hover:bg-[#A259FF] transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="ml-2 px-4 py-2 rounded border border-[#8A4FFF] text-[#8A4FFF] font-semibold hover:bg-[#8A4FFF] hover:text-white transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded hover:bg-[#181C2A] focus:outline-none"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#EAEAEA"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-[#181C2A] shadow-2xl z-50 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded hover:bg-[#222] focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#EAEAEA"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.div key={link.name} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={link.href}
                      className={`block px-2 py-2 rounded text-lg font-medium transition-colors duration-150 ${
                        isActive(link.href)
                          ? "text-[#8A4FFF] underline underline-offset-4"
                          : "hover:text-[#8A4FFF] focus:text-[#8A4FFF]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {isAuthenticated() ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 rounded bg-[#8A4FFF] text-white font-semibold hover:bg-[#A259FF] transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full px-4 py-2 rounded bg-[#8A4FFF] text-white font-semibold hover:bg-[#A259FF] transition text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full px-4 py-2 rounded border border-[#8A4FFF] text-[#8A4FFF] font-semibold hover:bg-[#8A4FFF] hover:text-white transition text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
