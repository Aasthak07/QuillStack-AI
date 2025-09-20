"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import { getSignupErrors } from "@/utils/validators";

const passwordRules = [
  { label: "Minimum 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /[0-9]/.test(v) },
  { label: "One special character", test: (v) => /[@!#%&*^$]/.test(v) },
];


export default function SignUpPage() {
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { signup } = useAuth();
  
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useAuthForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    getSignupErrors
  );
  
  const passwordChecks = passwordRules.map((rule) => rule.test(values.password || ""));

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
  
  const onSubmit = async (formData) => {
    setSuccess(false);
    setShake(false);
    
    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        setSuccess(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setShake(true);
        setErrors({ form: result.error || 'Signup failed. Please try again.' });
        setTimeout(() => setShake(false), 600);
      }
    } catch (error) {
      setShake(true);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
      console.error('Signup error:', error);
      setTimeout(() => setShake(false), 600);
    }
  };
  
  // Wrap handleSubmit to work with our form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword
    };
    
    // Manually validate the form
    const formErrors = getSignupErrors(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    
    // If no errors, proceed with submission
    onSubmit(formData);
  };
  const handleMouseLeave = () => {
    setCardPos({ x: 0, y: 0 });
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          shake
            ? { x: [0, -16, 16, -12, 12, -6, 6, 0], opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={
          shake
            ? { x: { type: "tween", duration: 0.6 }, opacity: { duration: 0.3 }, y: { duration: 0.3 } }
            : { type: "spring", stiffness: 400, damping: 20 }
        }
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
      >
        <h1 className="text-2xl font-bold text-[#EAEAEA] mb-2 text-center">Sign Up</h1>
        <p className="text-xs text-gray-400 mb-6 text-center">
          Create your account to get started
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                errors.name ? "border-[#FF5F5F]" : "border-gray-600"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="text-xs text-[#FF5F5F] mt-1">{errors.name}</div>}
          </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                      errors.email ? "border-[#FF5F5F]" : "border-gray-600"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="text-xs text-[#FF5F5F] mt-1 animate-pulse">{errors.email}</div>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                      errors.password ? "border-[#FF5F5F]" : "border-gray-600"
                    }`}
                    placeholder="Create a password"
                  />
                  {errors.password && <div className="text-xs text-[#FF5F5F] mt-1">{errors.password}</div>}
                  <div className="mt-2 space-y-1">
                    {passwordRules.map((rule, idx) => (
                      <div key={rule.label} className={`text-xs flex items-center gap-2 ${values.password ? (passwordChecks[idx] ? "text-[#00FFB2]" : "text-[#FF5F5F]") : "text-gray-400"}`}>
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: values.password ? (passwordChecks[idx] ? "#00FFB2" : "#FF5F5F") : "#888" }}></span>
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${
                      errors.confirmPassword ? "border-[#FF5F5F]" : "border-gray-600"
                    }`}
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && (
                    <div className="text-xs text-[#FF5F5F] mt-1 bg-[#2a0e1c] px-3 py-2 rounded shadow-lg border border-[#FF5F5F]/40">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                {errors.form && (
                  <div className="text-xs text-[#FF5F5F] bg-[#2a0e1c] px-3 py-2 rounded shadow-lg border border-[#FF5F5F]/40">
                    {errors.form}
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 16px #A259FF" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8A4FFF] to-[#A259FF] hover:from-[#A259FF] hover:to-[#8A4FFF] text-white py-3 rounded-lg font-semibold transition-all duration-200 mt-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </motion.button>
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      className="mb-4 px-4 py-2 bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] rounded-md text-xs text-center font-semibold shadow"
                    >
                      Signed up successfully! Redirecting to login...
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
        <p className="mt-6 text-xs text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
