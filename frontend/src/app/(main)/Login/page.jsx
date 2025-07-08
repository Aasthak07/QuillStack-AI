"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion, useMotionValue, useSpring } from 'framer-motion';
// import { useAuth } from '@/components/AuthContext'; // Uncomment if you have AuthContext

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  // const { login } = useAuth(); // Uncomment if you have AuthContext

  // 3D tilt logic
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
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

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/user/login', {
          email: values.username,
          password: values.password,
        });
        setIsLoading(false);
        // login(response.data.token); // Uncomment if you have AuthContext
        router.push('/');
      } catch (err) {
        setIsLoading(false);
        setError(
          err.response?.data?.message || 'Login failed. Please check your credentials.'
        );
      }
    },
  });

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
            animation: 'flow-diagonal 6s ease-in-out infinite',
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
            ? '0 0 40px 8px rgba(234, 0, 255, 0.25), 0 2px 32px 0 rgba(138, 79, 255, 0.25)'
            : '0 2px 32px 0 rgba(138, 79, 255, 0.10)',
          transition: 'box-shadow 0.3s, scale 0.3s',
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

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email address</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter your email"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-400 items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" />
              Remember for 30 days
            </label>
            <Link href="#" className="text-purple-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold transition-all duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <button
            type="button"
            className="w-full border border-gray-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 text-white
            " />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/Sign-up" className="text-purple-400 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
