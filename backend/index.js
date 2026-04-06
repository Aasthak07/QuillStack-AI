const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Load environment variables
require('./connection'); // MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

// ========== RATE LIMITING ==========

// Strict limiter for auth endpoints — blocks brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again after 15 minutes.' },
});

// General limiter for all other routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Please slow down.' },
});

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== ROUTES ==========

// Auth routes (Signup & Login) mounted at /user — strict rate limited
app.use('/user', authLimiter, require('./routers/userRouter'));

// Admin routes mounted at /admin — strict rate limited
app.use('/admin', authLimiter, require('./routers/adminRouter'));

app.use('/api/docs', generalLimiter, require('./routers/docRouter'));

// ========== ERROR HANDLING ==========

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ========== START SERVER ==========
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
