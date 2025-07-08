const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
require('./connection'); // MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== ROUTES ==========

// Auth routes (Signup & Login) mounted at /user
app.use('/user', require('./routes/authRoutes'));

// Test route (optional)
app.get('/', (req, res) => {
  res.send('🚀 QuillStack AI Backend is Live');
});

app.get('/add', (req, res) => {
  res.send('Response From Add All Route');
});

app.get('/getall', (req, res) => {
  res.send('Response From Get All Route');
});

// ========== ERROR HANDLING ==========

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ========== START SERVER ==========
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
