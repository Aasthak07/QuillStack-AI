'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('If an account exists with this email, you will receive a password reset link.');
      setIsError(false);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('An error occurred. Please try again later.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C] relative">
      {/* Faint fuchsia/purple radial glow */}
      <style jsx>{`
        @keyframes flow-diagonal {
          0% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
          50% { transform: translate(20%, -40%) rotate(-25deg); opacity: 0.4; }
          100% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
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

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-8 shadow-2xl border border-white/10"
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
        onMouseLeave={() => {
          setCardPos({ x: 0, y: 0 });
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-400">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-3 rounded-md text-sm ${isError ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm text-purple-400 hover:underline font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
