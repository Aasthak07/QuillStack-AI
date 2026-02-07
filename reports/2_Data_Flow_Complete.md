# Complete Data Flow Guide (Frontend to Backend)
## QuillStack AI Project se sikho!

---

## 🔄 Data Flow Overview

```
USER ACTION
    ↓
REACT COMPONENT (Frontend)
    ↓
API CALL (fetch/axios)
    ↓
EXPRESS ROUTER (Backend)
    ↓
CONTROLLER FUNCTION
    ↓
MONGODB (Database)
    ↓
RESPONSE back to Frontend
    ↓
REACT STATE UPDATE
    ↓
UI RE-RENDER
```

---

## 📝 Example 1: User Signup Flow (Step-by-step)

### **Step 1: User fills form (Frontend)**

```javascript
// signup page component
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,  // Spread operator - purane values rakh lo
    [e.target.name]: e.target.value  // Computed property name
  });
};

<input 
  name="name"
  value={formData.name}
  onChange={handleChange}
/>
```

**Interview Question:** Why `...formData`?
**Answer:** State ko directly modify nahi kar sakte (immutability). Naya object banate hain with old + new values.

---

### **Step 2: Form Submit → API Call (Frontend)**

**Tumhare AuthContext.jsx se:**
```javascript
const signup = async (userData) => {
  try {
    // 1️⃣ Request body banao
    const requestBody = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    // 2️⃣ Fetch API call
    const response = await fetch('http://localhost:5000/user/add', {
      method: 'POST',  // HTTP method
      headers: {
        'Content-Type': 'application/json',  // JSON bhej rahe hain
      },
      body: JSON.stringify(requestBody),  // Object → JSON string
    });

    // 3️⃣ Response parse karo
    const responseData = await response.json();

    // 4️⃣ Error handling
    if (!response.ok) {
      throw new Error(responseData.message || 'Signup failed');
    }

    // 5️⃣ Success - token store karo
    localStorage.setItem('token', responseData.token);
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

---

### **Fetch API Deep Dive (Interview ke liye MUST know!)**

#### **Basic Syntax:**
```javascript
fetch(url, options)
  .then(response => response.json())  // Response → JSON
  .then(data => console.log(data))    // Use data
  .catch(error => console.error(error));  // Error handling
```

#### **Modern Async/Await syntax (Prefer this!):**
```javascript
async function getData() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

#### **Fetch Options Object:**
```javascript
{
  method: 'POST',  // GET, POST, PUT, DELETE, PATCH
  headers: {
    'Content-Type': 'application/json',  // Batao ki kya bhej rahe ho
    'Authorization': `Bearer ${token}`    // Authentication
  },
  body: JSON.stringify(data),  // Data (only for POST/PUT/PATCH)
}
```

#### **Response Object Properties:**
```javascript
const response = await fetch(url);

response.ok        // true if status 200-299
response.status    // 200, 404, 500, etc.
response.statusText // "OK", "Not Found"
response.headers   // Response headers
response.json()    // Parse as JSON (async)
response.text()    // Parse as text (async)
response.blob()    // For files/images (async)
```

---

### **Step 3: Backend receives request (Express Router)**

**Tumhare userRouter.js se:**
```javascript
const express = require('express');
const router = express.Router();
const Model = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/add', (req, res) => {
  // req.body mein frontend se data aaya
  console.log(req.body);  // { name: "John", email: "...", password: "..." }

  // MongoDB mein save karo
  new Model(req.body).save()
    .then((result) => {
      // User created successfully
      const { _id, name, email } = result;
      const payload = { _id, name, email };
      
      // JWT token generate karo
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
          res.status(500).json({ message: 'Error generating token' });
        } else {
          res.status(200).json({ token });  // Token frontend ko bhejo
        }
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    });
});
```

**Key Concepts:**
- `req.body`: Frontend से JSON data
- `res.status()`: HTTP status code set karo
- `res.json()`: JSON response bhejo
- Promise chain: `.then()` for success, `.catch()` for errors

---

### **Step 4: MongoDB Operation (Database)**

```javascript
// User model (models/User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);

// Save operation
new Model(req.body).save()  // Creates new document and saves to DB
```

**MongoDB Operations (Interview ke liye):**
```javascript
// CREATE
const user = new User({ name: "John", email: "..." });
await user.save();

// READ
const users = await User.find();  // All users
const user = await User.findOne({ email: "test@example.com" });
const user = await User.findById("64abc123");

// UPDATE
await User.findByIdAndUpdate(id, { name: "New Name" });
await User.updateOne({ email: "..." }, { $set: { name: "..." } });

// DELETE
await User.findByIdAndDelete(id);
await User.deleteOne({ email: "..." });
```

---

### **Step 5: Response back to Frontend**

```javascript
// Backend sends:
res.status(200).json({ token: "eyJhbGciOiJIUzI1..." });

// Frontend receives:
const responseData = await response.json();
console.log(responseData.token);  // Access karo
```

---

### **Step 6: Frontend updates state & UI**

```javascript
// Token decode karo
const payload = JSON.parse(atob(responseData.token.split('.')[1]));

// User info extract karo
const userInfo = {
  id: payload._id,
  name: payload.name,
  email: payload.email,
  token: responseData.token
};

// State update karo (re-render trigger hoga!)
setUser(userInfo);

// localStorage mein persist karo
localStorage.setItem('user', JSON.stringify(userInfo));
```

---

## 📤 Example 2: File Upload Flow (FormData)

### **Frontend: FileUpload.jsx**

```javascript
const handleUpload = async () => {
  // 1️⃣ Token lao
  const token = localStorage.getItem("token");
  
  // 2️⃣ FormData object banao (for file uploads)
  const formData = new FormData();
  formData.append("file", selectedFile);  // File attach karo
  
  // 3️⃣ API call with FormData
  try {
    const res = await fetch("http://localhost:5000/api/docs/upload", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`  // ⚠️ NO Content-Type for FormData!
      },
      body: formData,  // FormData directly bhejo
    });
    
    const data = await res.json();
    
    if (data.success) {
      toast.success("✅ Docs Generated!");
      onUploadSuccess(data.data);  // Callback function call karo
    }
  } catch (error) {
    toast.error("Upload failed");
  }
};
```

**FormData Important Points:**
1. `new FormData()` - multipart/form-data ke liye
2. `.append(key, value)` - data add karo
3. **Don't set `Content-Type` header** - browser automatically set karega
4. Files upload ke liye MUST use FormData

---

### **Backend: docRouter.js**

```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/" });  // File kaha save hogi

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  //                        ↑              ↑
  //                  middleware    multer middleware
  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  // File info access karo
  console.log(req.file.originalname);
  console.log(req.file.path);
  console.log(req.file.size);
  
  // File read karo
  const fileContent = fs.readFileSync(req.file.path, "utf-8");
  
  // Process karo...
});
```

---

## 🔐 Example 3: Protected Route with JWT

### **Flow:**
```
User logs in → Token milta hai → Token localStorage mein → 
Next request mein token bhejo → Backend verify karta hai → Access granted/denied
```

### **Frontend: API call with token**
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/docs/mydocs', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`  // ⭐ Bearer scheme use karo
  }
});
```

### **Backend: Auth Middleware**
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1️⃣ Header se token nikalo
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // "Bearer TOKEN" → "TOKEN"

  try {
    // 2️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3️⃣ Decoded user info req object mein attach karo
    req.user = decoded;  // { _id, name, email }
    
    // 4️⃣ Next middleware/route handler call karo
    next();
    
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Use karo:
router.get('/mydocs', authMiddleware, async (req, res) => {
  // req.user se current user ka data mil jayega!
  console.log(req.user._id);
  
  const docs = await Documentation.find({ userId: req.user._id });
  res.json(docs);
});
```

---

## 🎯 HTTP Status Codes (Interview mein zaroor puchte hain!)

### **Success (2xx)**
- `200` OK - Request successful
- `201` Created - Resource created (POST requests)
- `204` No Content - Successful but no data to return

### **Client Errors (4xx)**
- `400` Bad Request - Invalid data
- `401` Unauthorized - No/invalid token
- `403` Forbidden - Valid token but no permission
- `404` Not Found - Resource not found
- `409` Conflict - Duplicate data (email already exists)

### **Server Errors (5xx)**
- `500` Internal Server Error - Generic error
- `503` Service Unavailable - Server down

---

## 🔑 Key Takeaways for Interview

1. **Data flow:** User Action → Component → API → Router → Controller → DB → Response → State → UI
2. **Fetch vs Axios:** Fetch built-in hai, Axios third-party (both work same)
3. **async/await:** Promises ko handle karne ka modern way
4. **FormData:** Files upload ke liye use karo
5. **JWT:** Token-based authentication
6. **Middleware:** Request → Middleware → Route handler
7. **Status codes:** Success (2xx), Client errors (4xx), Server errors (5xx)

Agle section mein Context API deep dive! 🚀
