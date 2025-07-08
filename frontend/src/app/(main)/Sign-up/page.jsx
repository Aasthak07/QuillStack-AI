"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const passwordRules = [
  { label: "Minimum 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /[0-9]/.test(v) },
  { label: "One special character", test: (v) => /[@!#%&*^$]/.test(v) },
];

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    setCardPos({ x: rotateX, y: rotateY });
  };
  const handleMouseLeave = () => {
    setCardPos({ x: 0, y: 0 });
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = passwordRules.map((rule) => rule.test(form.password));
  const allPasswordValid = passwordChecks.every(Boolean);
  const confirmPasswordValid =
    form.confirmPassword && form.password === form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !validateEmail(form.email) ||
      !allPasswordValid ||
      !confirmPasswordValid
    ) {
      setShake(true);
      setError("Please fix the errors above.");
      setTimeout(() => setShake(false), 600);
      return;
    }
    setSuccess(true);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setTouched({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={shake ? { x: [0, -16, 16, -12, 12, -6, 6, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        className="relative w-full max-w-xl bg-gradient-to-br from-[#181C2A] to-[#1B113A] rounded-2xl px-8 py-8 shadow-2xl border border-white/10"
        style={{
          boxShadow: isHovered
            ? '0 0 40px 8px rgba(234, 0, 255, 0.25), 0 2px 32px 0 rgba(138, 79, 255, 0.25)'
            : '0 4px 32px 0 #8A4FFF33',
          rotateX: cardPos.x,
          rotateY: cardPos.y,
          scale: isHovered ? 1.04 : 1,
          transition: 'box-shadow 0.3s, scale 0.3s',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <h1 className="text-2xl font-bold text-[#EAEAEA] mb-2 text-center">Sign Up</h1>
        <p className="text-xs text-gray-400 mb-6 text-center">
          Create your account to get started
        </p>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="mb-4 px-4 py-2 bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] rounded-md text-xs text-center font-semibold shadow"
            >
              Signed up successfully!
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 px-4 py-2 bg-[#FF5F5F]/10 border border-[#FF5F5F]/20 text-[#FF5F5F] rounded-md text-xs text-center"
          >
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 border-gray-600"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 border-gray-600"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                touched.email && !validateEmail(form.email)
                  ? "border-[#FF5F5F]"
                  : "border-gray-600"
              }`}
              placeholder="Enter your email"
            />
            {touched.email && !validateEmail(form.email) && (
              <div className="text-xs text-[#FF5F5F] mt-1 animate-pulse">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                touched.password && !allPasswordValid
                  ? "border-[#FF5F5F]"
                  : "border-gray-600"
              }`}
              placeholder="Create a password"
            />
            {/* Password rules UI removed, logic retained */}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                touched.confirmPassword && !confirmPasswordValid
                  ? "border-[#FF5F5F]"
                  : "border-gray-600"
              }`}
              placeholder="Re-enter your password"
            />
            <AnimatePresence>
              {touched.confirmPassword && !confirmPasswordValid && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs text-[#FF5F5F] mt-1 bg-[#2a0e1c] px-3 py-2 rounded shadow-lg border border-[#FF5F5F]/40"
                  role="alert"
                >
                  <span className="font-semibold">Alert:</span> Passwords do not match.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 16px #A259FF" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#8A4FFF] to-[#A259FF] hover:from-[#A259FF] hover:to-[#8A4FFF] text-white py-3 rounded-lg font-semibold transition-all duration-200 mt-2 shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-6 text-xs text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/Login" className="text-purple-400 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
