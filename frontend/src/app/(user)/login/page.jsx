"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { useAuthForm } from "../../../../hooks/useAuthForm.js";
import { getLoginErrors } from "../../../../utils/validators.js";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export default function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#060910] bg-mesh relative overflow-hidden">
      <motion.div
        className="relative z-10 w-full max-w-lg glass-dark p-10 rounded-[40px] border-white/5 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome <span className="text-gradient">Back.</span>
          </h1>
          <p className="text-sm text-gray-400">Sign in to your account</p>
        </div>

        {errors.form && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs text-center font-bold"
          >
            {errors.form}
          </motion.div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600"
              placeholder="id@quillstack.ai"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <HiOutlineEyeSlash className="text-xl" /> : <HiOutlineEye className="text-xl" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest px-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-white transition-colors">
              <input type="checkbox" className="accent-accent-primary" />
              <span>Remember Me</span>
            </label>
            <Link href="/forgot-password" size="sm" className="text-accent-primary hover:underline">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-2xl bg-accent-primary text-white font-bold shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="text-accent-primary hover:underline">
              Sign Up
            </Link>
          </p>
          <Link href="/admin-login" className="block text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:text-gray-400 transition-colors">
            Admin Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

