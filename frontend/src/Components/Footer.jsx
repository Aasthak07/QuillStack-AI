'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer className="relative bg-[#060910] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent opacity-20" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center font-bold text-white shadow-lg shadow-accent-primary/20">
                Q
              </div>
              <span className="text-xl font-bold tracking-tight text-white select-none">
                QuillStack<span className="text-accent-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Automate your documentation workflow with AI-powered analysis. Built for modern development teams.
            </p>
          </div>
          
          {/* Product Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-6">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Integrations', 'Changelog', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-accent-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-6">Support</h3>
            <ul className="space-y-3">
              {['Documentation', 'Community', 'Contact Us', 'Feedback'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-accent-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-6">Connect</h3>
            <div className="flex gap-4">
              {['GitHub', 'Twitter', 'LinkedIn'].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-primary/10 hover:border-accent-primary/20 transition-all"
                  aria-label={platform}
                >
                  <span className="text-xs font-bold">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            © 2025 <span className="font-semibold text-gray-300">QuillStackAI</span>. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <div className="w-1 h-1 rounded-full bg-accent-primary animate-pulse" />
            System Status: Operational
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
