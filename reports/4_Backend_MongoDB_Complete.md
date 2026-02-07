# Backend & MongoDB Complete Guide
## Express + MongoDB interview ke liye!

---

## 🏗️ Backend Architecture

```
backend/
├── index.js              # Entry point
├── connection.js         # MongoDB connection
├── models/              # Database schemas
│   ├── User.js
│   ├── docsModel.js
│   └── contactModel.js
├── routers/             # Route definitions
│   ├── userRouter.js
│   ├── docRouter.js
│   └── adminRouter.js
├── controllers/         # Business logic
│   └── docsControllers.js
├── middleware/          # Custom middleware
│   └── authMiddleware.js
└── .env                 # Environment variables
```

---

## 🚀 Express.js Setup

### **index.js (Entry Point)**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load .env file
require('./connection');     // MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========
app.use(cors({ origin: '*' }));  // Allow all origins
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse form data

// ========== ROUTES ==========
app.use('/user', require('./routers/userRouter'));
app.use('/api/docs', require('./routers/docRouter'));
app.use('/admin', require('./routers/adminRouter'));

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
```

**Interview Points:**
- `app.use()` - Middleware register karne ke liye
- `app.listen()` - Server start karne ke liye
- Route prefix (`/user`, `/api/docs`) - organize routes

---

## 📡 Express Router Pattern

### **Basic Router Setup:**
```javascript
const express = require('express');
const router = express.Router();

// GET request
router.get('/all', (req, res) => {
  res.json({ message: 'Get all items' });
});

// POST request
router.post('/add', (req, res) => {
  const data = req.body;  // Request body
  res.status(201).json({ message: 'Created', data });
});

// PUT request (update)
router.put('/update/:id', (req, res) => {
  const id = req.params.id;  // URL parameter
  const data = req.body;
  res.json({ message: `Updated ${id}`, data });
});

// DELETE request
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `Deleted ${id}` });
});

module.exports = router;
```

---

## 🔐 Middleware Deep Dive

### **What is Middleware?**
Functions jo request-response cycle mein beech mein run hote hain.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### **Types of Middleware:**

**1. Application-level Middleware**
```javascript
// Har request par chalega
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // ⚠️ MUST call next()!
});
```

**2. Route-level Middleware**
```javascript
router.get('/protected', authMiddleware, (req, res) => {
  // authMiddleware pehle chalega
  res.json({ message: 'Protected route' });
});
```

**3. Built-in Middleware**
```javascript
app.use(express.json());  // Parse JSON
app.use(express.static('public'));  // Serve static files
```

**4. Third-party Middleware**
```javascript
const cors = require('cors');
app.use(cors());  // Enable CORS
```

**5. Error-handling Middleware**
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

---

### **Auth Middleware Example (Your Project):**
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1️⃣ Header se token nikalo
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // 2️⃣ Token extract karo
  const token = authHeader.split(' ')[1];

  try {
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4️⃣ req object mein user info attach karo
    req.user = decoded;  // Next middleware/route use kar sakta hai
    
    // 5️⃣ Next middleware call karo
    next();
    
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authMiddleware };
```

**Use karo:**
```javascript
router.get('/mydocs', authMiddleware, async (req, res) => {
  // req.user available hai!
  const userId = req.user._id;
  const docs = await Documentation.find({ userId });
  res.json(docs);
});
```

---

## 🗄️ MongoDB with Mongoose

### **Connection Setup:**
```javascript
// connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/quillstack';

mongoose.connect(url)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB error:', err));

module.exports = mongoose;
```

---

### **Schema & Model:**

```javascript
// models/User.js
const mongoose = require('mongoose');

// 1️⃣ Schema define karo
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,  // Mandatory field
    unique: true,    // No duplicates
    lowercase: true  // Auto lowercase
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6  // Validation
  },
  name: { type: String },
  isAdmin: { 
    type: Boolean, 
    default: false  // Default value
  },
  createdAt: {
    type: Date,
    default: Date.now  // Auto timestamp
  }
}, { 
  timestamps: true  // Auto createdAt & updatedAt
});

// 2️⃣ Schema methods (instance methods)
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;
};

// Usage: user.comparePassword('test123')

// 3️⃣ Schema statics (model methods)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Usage: User.findByEmail('test@example.com')

// 4️⃣ Model banao
module.exports = mongoose.model('User', userSchema);
//                                 ↑        ↑
//                            model name  schema
```

---

### **Mongoose Data Types:**
```javascript
{
  stringField: String,
  numberField: Number,
  dateField: Date,
  boolField: Boolean,
  arrayField: [String],  // Array of strings
  objectField: {
    nested: String
  },
  mixedField: mongoose.Schema.Types.Mixed,  // Any type
  objectIdField: mongoose.Schema.Types.ObjectId,  // Reference
  bufferField: Buffer,  // Binary data
}
```

---

### **CRUD Operations:**

#### **CREATE (C)**
```javascript
// Method 1: new + save
const user = new User({
  name: "John",
  email: "john@example.com",
  password: "pass123"
});
await user.save();

// Method 2: create (direct)
const user = await User.create({
  name: "John",
  email: "john@example.com",
  password: "pass123"
});

// Method 3: insertMany (multiple)
await User.insertMany([
  { name: "John", email: "john@example.com" },
  { name: "Jane", email: "jane@example.com" }
]);
```

#### **READ (R)**
```javascript
// Find all
const users = await User.find();

// Find with conditions
const admins = await User.find({ isAdmin: true });

// Find one
const user = await User.findOne({ email: "john@example.com" });

// Find by ID
const user = await User.findById("64abc123def");

// Select specific fields
const users = await User.find().select('name email -_id');
//                                        ↑       ↑
//                                   include   exclude

// Limit & Skip (pagination)
const users = await User.find()
  .limit(10)   // First 10
  .skip(20);   // Skip first 20

// Sort
const users = await User.find().sort({ createdAt: -1 });
//                                                   ↑
//                                              -1 = descending

// Count
const count = await User.countDocuments({ isAdmin: true });
```

#### **UPDATE (U)**
```javascript
// Method 1: findByIdAndUpdate
const user = await User.findByIdAndUpdate(
  id,
  { name: "New Name" },
  { new: true }  // Return updated document
);

// Method 2: findOneAndUpdate
const user = await User.findOneAndUpdate(
  { email: "john@example.com" },
  { $set: { name: "New Name" } },
  { new: true }
);

// Method 3: updateOne (no doc returned)
await User.updateOne(
  { email: "john@example.com" },
  { $set: { name: "New Name" } }
);

// Method 4: updateMany
await User.updateMany(
  { isAdmin: false },
  { $set: { role: "user" } }
);

// Update operators:
{ $set: { field: value } }      // Set value
{ $inc: { age: 1 } }            // Increment
{ $ push: { tags: "new" } }    // Add to array
{ $pull: { tags: "old" } }      // Remove from array
```

#### **DELETE (D)**
```javascript
// Method 1: findByIdAndDelete
const deleted = await User.findByIdAndDelete(id);

// Method 2: findOneAndDelete
const deleted = await User.findOneAndDelete({ email: "john@example.com" });

// Method 3: deleteOne
await User.deleteOne({ email: "john@example.com" });

// Method 4: deleteMany
await User.deleteMany({ isAdmin: false });
```

---

### **Advanced Queries:**

```javascript
// AND condition
const users = await User.find({
  isAdmin: true,
  age: { $gte: 18 }  // age >= 18
});

// OR condition
const users = await User.find({
  $or: [
    { isAdmin: true },
    { age: { $gte: 18 } }
  ]
});

// Comparison operators
{ $eq: value }    // Equal
{ $ne: value }    // Not equal
{ $gt: value }    // Greater than
{ $gte: value }   // Greater than or equal
{ $lt: value }    // Less than
{ $lte: value }   // Less than or equal
{ $in: [array] }  // In array
{ $nin: [array] } // Not in array

// Regex search
const users = await User.find({
  name: { $regex: /john/i }  // Case-insensitive
});

// Exists check
const users = await User.find({
  email: { $exists: true }
});
```

---

## 🔑 Environment Variables (.env)

```bash
# .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/quillstack
JWT_SECRET=your-super-secret-key-here
GEMINI_API_KEY=your-api-key
```

**Usage in code:**
```javascript
require('dotenv').config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
```

**⚠️ NEVER commit .env to Git!**
```bash
# .gitignore
.env
node_modules/
```

---

## 📦 Complete Route Example

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all users (protected)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
router.post('/add', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT update user
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

## 🎓 Interview Must-Know Points

1. **Middleware:** Functions between request and response
2. **next():** MUST call to pass to next middleware
3. **req object:** body, params, query, headers, user (from middleware)
4. **Mongoose Schema:** Structure + validation
5. **Mongoose Model:** Interact with database
6. **CRUD:** Create, Read, Update, Delete
7. **async/await:** Handle promises in async operations
8. **Error handling:** try-catch blocks
9. **Status codes:** 200, 201, 400, 401, 404, 500
10. **JWT:** Token-based authentication

Agle guide mein common interview questions! 🎯
