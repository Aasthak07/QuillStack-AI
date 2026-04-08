"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#060910] bg-mesh relative overflow-hidden">
      <motion.div
        className="relative z-10 w-full max-w-lg glass-dark p-10 rounded-[40px] border-white/5 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Create <span className="text-gradient">Account.</span>
          </h1>
          <p className="text-sm text-gray-400">Join the QuillStack AI community</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.name}</p>}
          </div>

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
            {errors.email && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.email}</p>}
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
            <div className="grid grid-cols-2 gap-2 mt-2 px-1">
              {passwordRules.map((rule, idx) => (
                <div key={rule.label} className={`text-[9px] flex items-center gap-1.5 font-bold uppercase tracking-tighter ${values.password ? (passwordChecks[idx] ? "text-accent-primary" : "text-gray-700") : "text-gray-800"}`}>
                  <div className={`w-1 h-1 rounded-full ${values.password ? (passwordChecks[idx] ? "bg-accent-primary" : "bg-gray-700") : "bg-gray-800"}`} />
                  {rule.label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                tabIndex="-1"
              >
                {showConfirmPassword ? <HiOutlineEyeSlash className="text-xl" /> : <HiOutlineEye className="text-xl" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-2xl bg-accent-primary text-white font-bold shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary rounded-2xl text-[10px] font-bold text-center uppercase tracking-widest"
            >
              Account Created Successfully. Redirecting...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

