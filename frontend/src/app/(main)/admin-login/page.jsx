'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Link from 'next/link'
import { FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft } from 'react-icons/fa'

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email: values.email,
        password: values.password,
      })

      if (response.data.success) {
        // Store admin token
        localStorage.setItem('adminToken', response.data.token)
        // Store admin user info
        localStorage.setItem('adminUser', JSON.stringify(response.data.user))
        // Redirect to admin dashboard
        router.push('/admin/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message)
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1C] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#3B82F6]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#6366F1]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[#6366F1]/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
      </div>

      {/* Back to main login link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-30"
      >
        <Link
          href="/login"
          className="flex items-center space-x-2 text-[#3B82F6] hover:text-[#6366F1] transition-colors duration-300 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back to User Login</span>
        </Link>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <motion.div
            whileHover={{ 
              rotateY: 5,
              rotateX: 2,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="bg-gradient-to-br from-[#181C2A]/80 to-[#0F1420]/80 backdrop-blur-xl border border-[#3B82F6]/20 rounded-2xl p-8 shadow-2xl"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Admin Panel
              </h1>
              <p className="text-[#3B82F6] font-semibold">
                QuillStack AI
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Secure access to administrative controls
              </p>
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-3 bg-[#0F1420]/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-300 ${
                          errors.email && touched.email 
                            ? 'border-red-500' 
                            : 'border-gray-600 hover:border-[#3B82F6]/50'
                        }`}
                        placeholder="admin@quillstackai.com"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className={`w-full px-4 py-3 pr-12 bg-[#0F1420]/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-300 ${
                          errors.password && touched.password 
                            ? 'border-red-500' 
                            : 'border-gray-600 hover:border-[#3B82F6]/50'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3B82F6] transition-colors duration-300"
                      >
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] hover:from-[#2563EB] hover:to-[#5B21B6] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <FaShieldAlt size={16} />
                          <span>Login as Admin</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </Form>
              )}
            </Formik>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-gray-500">
                🔒 This is a secure admin portal. Unauthorized access is prohibited.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
