"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineChatBubbleLeftRight, HiOutlineArrowRight } from 'react-icons/hi2';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060910] text-gray-200 pt-32 pb-20 px-6 bg-mesh">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Info Column */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-sm font-bold text-accent-primary uppercase tracking-widest"
            >
              <HiOutlineChatBubbleLeftRight />
              <span>Contact Us</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Let's talk about <span className="text-gradient">your project.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Have a question about QuillStack? Want to suggest a feature? Or just want to say hi? We're all ears.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl glass border-white/5 flex items-center justify-center text-accent-primary shrink-0">
                <HiOutlineEnvelope className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-white">Email us</h3>
                <p className="text-sm text-gray-400 mb-2">For support and inquiries</p>
                <a href="mailto:hello@quillstackai.com" className="text-accent-primary hover:underline font-medium">hello@quillstackai.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl glass border-white/5 flex items-center justify-center text-accent-primary shrink-0">
                <HiOutlineMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-white">Our Location</h3>
                <p className="text-sm text-gray-400 mb-2">Remote-first team</p>
                <p className="text-accent-primary font-medium">Based in India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8 md:p-10 rounded-[40px] border-white/5 shadow-2xl relative"
        >
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent-primary/10 blur-[80px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-primary/50 focus:bg-white/10 outline-none transition-all resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-2xl bg-accent-primary text-white font-bold shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : <>Send Message <HiOutlineArrowRight /></>}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}