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
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#060910] bg-mesh relative overflow-hidden">
      <motion.div
        className="relative z-10 w-full max-w-lg glass-dark p-10 rounded-[40px] border-white/5 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Reset <span className="text-gradient">Key.</span>
          </h1>
          <p className="text-sm text-gray-400">Recover your developer account</p>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mb-6 p-4 rounded-2xl text-xs text-center font-bold border ${isError ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'}`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600"
              placeholder="id@quillstack.ai"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-2xl bg-accent-primary text-white font-bold shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Requesting..." : "Send Reset link"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-accent-primary hover:underline">
            Back to Access Session
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
