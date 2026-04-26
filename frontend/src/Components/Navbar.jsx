"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../context/AuthContext.jsx";

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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-7xl glass rounded-2xl px-6 h-16 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-orange to-accent-primary flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
            Q
          </div>
          <span className="text-xl font-bold tracking-tight text-white select-none">
            QuillStack<span className="text-accent-orange">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm lg:text-base ${
                isActive(link.href)
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-0 bg-accent-primary/10 border border-accent-primary/20 rounded-xl -z-10"
                />
              )}
            </Link>
          ))}
          
          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          {/* Auth Buttons */}
          {isAuthenticated() ? (
            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-6 h-6 bg-accent-primary rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-200">{user?.name || user?.email || 'User'}</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-xl hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-[300px] h-full glass-dark z-[70] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-2xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/5 transition"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-accent-primary/10 text-accent-primary"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                {isAuthenticated() ? (
                  <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="w-full px-4 py-4 rounded-xl bg-red-400/10 text-red-400 font-bold"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full px-4 py-4 rounded-xl text-center text-gray-400 font-medium hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full px-4 py-4 rounded-xl bg-accent-primary text-white font-bold text-center shadow-xl shadow-accent-primary/20"
                      onClick={() => setMobileOpen(false)}
                    >
                      Get Started
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