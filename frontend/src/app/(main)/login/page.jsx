"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import { getLoginErrors } from "@/utils/validators";

export default function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { login } = useAuth();
  
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useAuthForm(
    {
      email: "",
      password: "",
      rememberMe: false
    },
    getLoginErrors
  );
  
  const onSubmit = async (formData) => {
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        // Redirect to home page after successful login
        router.push("/");
      } else {
        setErrors({ form: result.error || 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    }
  };
  
  // Wrap handleSubmit to work with our form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe
    };
    
    // Manually validate the form
    const formErrors = getLoginErrors(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // If no errors, proceed with submission
    onSubmit(formData);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C] relative">
      {/* Faint fuchsia/purple radial glow */}
      <style jsx>{`
        @keyframes flow-diagonal {
          0% {
            transform: translate(-20%, -20%) rotate(-25deg);
            opacity: 0.25;
          }
          50% {
            transform: translate(20%, -40%) rotate(-25deg);
            opacity: 0.4;
          }
          100% {
            transform: translate(-20%, -20%) rotate(-25deg);
            opacity: 0.25;
          }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-0 top-1/4 w-[60vw] h-[40vw] max-w-2xl max-h-[30vh] rounded-full bg-fuchsia-700 opacity-30 blur-3xl rotate-[-25deg]"
          style={{
            animation: "flow-diagonal 6s ease-in-out infinite",
          }}
        ></div>
      </div>
      {/* Your card and content here */}
      <motion.div
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-white/10"
        style={{
          rotateX: cardPos.x,
          rotateY: cardPos.y,
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered
            ? "0 0 40px 8px rgba(234, 0, 255, 0.25), 0 2px 32px 0 rgba(138, 79, 255, 0.25)"
            : "0 2px 32px 0 rgba(138, 79, 255, 0.10)",
          transition: "box-shadow 0.3s, scale 0.3s",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Branding/Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome back</h1>
        <p className="text-xs text-gray-400 mb-6 text-center">Please enter your details to sign in</p>

        {errors.form && (
          <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-xs text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <div className="text-xs text-red-400 mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="text-xs text-red-400 mt-1">{errors.password}</div>
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-400 items-center">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                className="accent-purple-500" 
              />
              Remember for 30 days
            </label>
            <Link href="/forgot-password" className="text-purple-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            className="w-full border border-gray-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 text-white"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-400">
          {`Don't have an account? `}
          <Link href="/sign-up" className="text-purple-400 hover:underline font-medium">
            Sign up
          </Link>
        </p>
        
        <div className="mt-4 text-center">
          <Link 
            href="/admin-login" 
            className="text-xs text-gray-400 hover:text-purple-400 transition-colors"
          >
            Are you an admin? Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

