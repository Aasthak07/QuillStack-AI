"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const passwordRules = [
  { label: "Minimum 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /[0-9]/.test(v) },
  { label: "One special character", test: (v) => /[@!#%&*^$]/.test(v) },
];

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "One uppercase letter")
    .matches(/[a-z]/, "One lowercase letter")
    .matches(/[0-9]/, "One number")
    .matches(/[@!#%&*^$]/, "One special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function SignUpPage() {
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

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
  const handleMouseLeave = () => {
    setCardPos({ x: 0, y: 0 });
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0B0F1C]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          shake
            ? { x: [0, -16, 16, -12, 12, -6, 6, 0], opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={
          shake
            ? { x: { type: "tween", duration: 0.6 }, opacity: { duration: 0.3 }, y: { duration: 0.3 } }
            : { type: "spring", stiffness: 400, damping: 20 }
        }
        className="relative w-full max-w-xl bg-gradient-to-br from-[#181C2A] to-[#1B113A] rounded-2xl px-8 py-8 shadow-2xl border border-white/10"
        style={{
          boxShadow: isHovered
            ? '0 0 40px 8px rgba(234, 0, 255, 0.25), 0 2px 32px 0 rgba(138, 79, 255, 0.25)'
            : '0 4px 32px 0 #8A4FFF33',
          rotateX: cardPos.x,
          rotateY: cardPos.y,
          scale: isHovered ? 1.04 : 1,
          transition: 'box-shadow 0.3s, scale 0.3s',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <h1 className="text-2xl font-bold text-[#EAEAEA] mb-2 text-center">Sign Up</h1>
        <p className="text-xs text-gray-400 mb-6 text-center">
          Create your account to get started
        </p>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
            setSuccess(false);
            setShake(false);
            try {
              await axios.post("http://localhost:5000/user/add", {
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password,
              });
              setSuccess(true);
              resetForm();
            } catch (error) {
              setShake(true);
              setSuccess(false);
              console.error("Signup error:", error);
              
              // Handle different types of errors
              if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 'Signup failed. Please try again.';
                setErrors({ email: errorMessage });
              } else if (error.request) {
                // Network error - no response received
                setErrors({ email: 'Network error. Please check your connection and try again.' });
              } else {
                // Other error
                setErrors({ email: 'An unexpected error occurred. Please try again.' });
              }
              
              setTimeout(() => setShake(false), 600);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting, values }) => {
            const passwordChecks = passwordRules.map((rule) => rule.test(values.password));
            return (
              <Form className="space-y-5">
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 border-gray-600"
                      placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-xs text-[#FF5F5F] mt-1" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 border-gray-600"
                      placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-xs text-[#FF5F5F] mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${touched.email && errors.email ? "border-[#FF5F5F]" : "border-gray-600"}`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-xs text-[#FF5F5F] mt-1 animate-pulse" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${touched.password && errors.password ? "border-[#FF5F5F]" : "border-gray-600"}`}
                    placeholder="Create a password"
                  />
                  <ErrorMessage name="password" component="div" className="text-xs text-[#FF5F5F] mt-1" />
                  <div className="mt-2 space-y-1">
                    {passwordRules.map((rule, idx) => (
                      <div key={rule.label} className={`text-xs flex items-center gap-2 ${values.password ? (passwordChecks[idx] ? "text-[#00FFB2]" : "text-[#FF5F5F]") : "text-gray-400"}`}>
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: values.password ? (passwordChecks[idx] ? "#00FFB2" : "#FF5F5F") : "#888" }}></span>
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/30 transition-all duration-200 ${touched.confirmPassword && errors.confirmPassword ? "border-[#FF5F5F]" : "border-gray-600"}`}
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-xs text-[#FF5F5F] mt-1 bg-[#2a0e1c] px-3 py-2 rounded shadow-lg border border-[#FF5F5F]/40" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 16px #A259FF" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8A4FFF] to-[#A259FF] hover:from-[#A259FF] hover:to-[#8A4FFF] text-white py-3 rounded-lg font-semibold transition-all duration-200 mt-2 shadow-lg"
                  disabled={isSubmitting}
                >
                  Sign Up
                </motion.button>
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      className="mb-4 px-4 py-2 bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] rounded-md text-xs text-center font-semibold shadow"
                    >
                      Signed up successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            );
          }}
        </Formik>
        <p className="mt-6 text-xs text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
