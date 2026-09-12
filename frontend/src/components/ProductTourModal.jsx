"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineCube,
} from "react-icons/hi2";

const slides = [
  {
    id: 1,
    icon: <HiOutlineSparkles className="text-accent-orange text-2xl" />,
    title: "AI-Powered Doc Generation",
    subtitle: "Upload any code file — get professional docs in seconds.",
    image: "/tour_slide_1.png",
  },
  {
    id: 2,
    icon: <HiOutlineCube className="text-blue-400 text-2xl" />,
    title: "Architecture Mapping",
    subtitle: "Automatically generates visual flow diagrams from your code structure.",
    image: "/tour_slide_2.png",
  },
  {
    id: 3,
    icon: <HiOutlineShieldCheck className="text-red-400 text-2xl" />,
    title: "Security & Performance Audit",
    subtitle: "Instantly identifies vulnerabilities, anti-patterns, and bottlenecks.",
    image: "/tour_slide_3.png",
  },
  {
    id: 4,
    icon: <HiOutlineDocumentText className="text-purple-400 text-2xl" />,
    title: "My Documents Hub",
    subtitle: "Manage, search, and export all your generated documentation in one place.",
    image: "/tour_slide_4.png",
  },
];

export default function ProductTourModal({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const next = () => { if (currentSlide < slides.length - 1) goTo(currentSlide + 1); };
  const prev = () => { if (currentSlide > 0) goTo(currentSlide - 1); };

  const slide = slides[currentSlide];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl rounded-[32px] bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden"
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Gradient top strip */}
          <div className="h-1 w-full bg-gradient-to-r from-accent-orange via-amber-500 to-accent-primary" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              {slide.icon}
              <span>Product Tour</span>
              <span className="text-gray-700">— {currentSlide + 1} / {slides.length}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <HiOutlineXMark className="text-lg" />
            </button>
          </div>

          {/* Slide Content */}
          <div className="p-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{slide.title}</h2>
                  <p className="text-gray-400 mt-1">{slide.subtitle}</p>
                </div>
                {/* Screenshot Image */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between px-6 pb-6">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "w-6 bg-accent-orange" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={currentSlide === 0}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <HiOutlineArrowLeft />
              </button>
              {currentSlide < slides.length - 1 ? (
                <button
                  onClick={next}
                  className="px-5 h-10 rounded-full bg-accent-orange/90 hover:bg-accent-orange text-white font-bold text-sm flex items-center gap-2 transition-all"
                >
                  Next <HiOutlineArrowRight />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-5 h-10 rounded-full bg-accent-orange/90 hover:bg-accent-orange text-white font-bold text-sm flex items-center gap-2 transition-all"
                >
                  Get Started <HiOutlineArrowRight />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
