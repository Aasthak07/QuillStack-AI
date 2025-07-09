'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0B0F1C] to-[#0A0D18] text-[#EAEAEA] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top Divider with gradient */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-[#0B0F1C] px-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] rounded-full"></div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8A4FFF] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#EA00FF] rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#8A4FFF] rounded-full blur-xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Product Column */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] bg-clip-text text-transparent">
                Product
              </span>
              <div className="ml-2 w-2 h-2 bg-[#8A4FFF] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['API', 'Integrations', 'Changelog', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-gray-300 hover:text-[#8A4FFF] transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] bg-clip-text text-transparent">
                Support
              </span>
              <div className="ml-2 w-2 h-2 bg-[#8A4FFF] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['Community Forum', 'Contact Us', 'Feedback'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-gray-300 hover:text-[#8A4FFF] transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] bg-clip-text text-transparent">
                Legal
              </span>
              <div className="ml-2 w-2 h-2 bg-[#8A4FFF] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-gray-300 hover:text-[#8A4FFF] transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] bg-clip-text text-transparent">
                Follow Us
              </span>
              <div className="ml-2 w-2 h-2 bg-[#8A4FFF] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  name: 'GitHub',
                  icon: (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
                {
                  name: 'Twitter/X',
                  icon: (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="relative group/social text-[#EAEAEA] hover:text-[#8A4FFF] transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8A4FFF]/20 to-[#EA00FF]/20 rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative p-2 rounded-lg border border-transparent hover:border-[#8A4FFF]/30 transition-all duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-[#0B0F1C] px-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#8A4FFF] to-[#EA00FF] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">© 2025 QuillStackAI</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-gradient-to-r from-[#8A4FFF]/10 to-[#EA00FF]/10 px-3 py-1 rounded-full border border-[#8A4FFF]/20">
            <span className="text-[#8A4FFF]">🟣</span>
            <span className="text-gray-300">Open Source</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <span className="text-green-400">🌱</span>
            <span className="text-gray-300">Carbon Neutral</span>
          </div>
        </div>

        {/* Additional decorative element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-1 h-1 bg-[#8A4FFF] rounded-full animate-pulse"></div>
            <span>Built with ❤️ for developers</span>
            <div className="w-1 h-1 bg-[#8A4FFF] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
