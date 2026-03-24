'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flow-diagonal {
            0% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
            50% { transform: translate(20%, -40%) rotate(-25deg); opacity: 0.4; }
            100% { transform: translate(-20%, -20%) rotate(-25deg); opacity: 0.25; }
          }
        `
      }} />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-0 top-1/4 w-[60vw] h-[40vw] max-w-2xl max-h-[30vh] rounded-full bg-fuchsia-700 opacity-30 blur-3xl rotate-[-25deg]"
          style={{
            animation: "flow-diagonal 6s ease-in-out infinite",
          }}
        ></div>
      </div>
      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Get in Touch with <span className="text-blue-400">QuillStack AI</span>
          </h1>
          <p className="text-xl text-gray-300">
            Have questions, suggestions, or need support? Reach out to us.
          </p>
        </motion.div>

        <motion.div 
          className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-2xl rounded-2xl p-8 mb-12"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400 transition-all"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-2xl rounded-2xl p-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Email</h3>
                <a 
                  href="mailto:support@quillstack.ai" 
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  support@quillstack.ai
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <FiMapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Location</h3>
                <p className="text-gray-300">San Francisco, CA</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/QuillStack-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://linkedin.com/company/quillstack-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </a>
                <a
                  href="https://twitter.com/QuillStackAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label="Twitter"
                >
                  <FiTwitter className="h-6 w-6 text-blue-400 dark:text-blue-300" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;