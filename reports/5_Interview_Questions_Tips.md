# MERN Interview Questions & Answers
## Machine Coding Round Tips + Common Questions

---

## 🎯 React Interview Questions

### **Q1: What is Virtual DOM? Explain how it works**
**A:** 
Virtual DOM ek lightweight copy hai real DOM ka. Jab state change hoti hai:
1. React new virtual DOM banata hai
2. Old aur new virtual DOM compare karta hai (diffing)
3. Sirf changes ko real DOM mein update karta hai (reconciliation)

**Benefits:**
- Fast updates (sirf necessary changes)
- Better performance
- Predictable behavior

```javascript
// Example
setState({ name: "John" });  
// React: Old virtual DOM vs New virtual DOM
// Only `name` field update hoga in real DOM
```

---

### **Q2: useState vs useRef difference?**
**A:**

| useState | useRef |
|----------|--------|
| Re-render triggers | No re-render |
| State persist across renders | Value persist across renders |
| For UI data | For DOM access, timers |
| `const [val, setVal] = useState(0)` | `const ref = useRef(0)` |

```javascript
// useState - Re-renders component
const [count, setCount] = useState(0);
setCount(1);  // ✅ Component re-renders

// useRef - No re-render
const countRef = useRef(0);
countRef.current = 1;  // ❌ No re-render
```

---

### **Q3: useEffect cleanup function kyu chahiye?**
**A:**
Memory leaks rokne ke liye!

```javascript
useEffect(() => {
  // Setup
  const interval = setInterval(() => {
    console.log  ("Tick");
  }, 1000);
  
  // Cleanup (component unmount par chalega)
  return () => {
    clearInterval(interval);  // Timer stop karo
  };
}, []);
```

**When cleanup runs:**
- Component unmount hone par
- Dependencies change hone par (next effect se pehle)

---

### **Q4: Props drilling problem aur solution?**
**A:**
**Problem:** Props har level par pass karne padte hain

```javascript
// ❌ Props drilling
<App>
  <Header user={user} />
  <Main user={user}>
    <Profile user={user} />
  </Main>
</App>
```

**Solutions:**
1. **Context API** (for global state)
2. **Component composition** (children prop)
3. **State management** (Redux, Zustand)

```javascript
// ✅ Context API
const { user } = useContext(AuthContext);  // Anywhere!
```

---

### **Q5: Controlled vs Uncontrolled components?**
**A:**

**Controlled:** React state controls input value
```javascript
const [value, setValue] = useState('');

<input 
  value={value}  // React controls
  onChange={(e) => setValue(e.target.value)}
/>
```

**Uncontrolled:** DOM controls value (use ref)
```javascript
const inputRef = useRef();

<input ref={inputRef} />

// Get value: inputRef.current.value
```

**Interview tip:** Controlled components recommended for forms!

---

### **Q6: Keys in map kyu important hain?**
**A:**
React ko batate hain ki kaun sa element change/add/remove hua.

```javascript
// ❌ BAD - Index as key
{items.map((item, i) => <div key={i}>{item}</div>)}

// ✅ GOOD - Unique ID
{items.map((item) => <div key={item.id}>{item.name}</div>)}
```

**Why not index?**
- Items reorder ho jayein toh problem
- New items add ho toh issues
- Performance problems

---

## 🔧 JavaScript Interview Questions

### **Q7: Difference: var, let, const**
**A:**

| var | let | const |
|-----|-----|-------|
| Function-scoped | Block-scoped | Block-scoped |
| Hoisted (undefined) | Hoisted (TDZ) | Hoisted (TDZ) |
| Can redeclare | Cannot redeclare | Cannot redeclare |
| Can reassign | Can reassign | Cannot reassign |

```javascript
var x = 1;
var x = 2;  // ✅ OK

let y = 1;
let y = 2;  // ❌ Error

const z = 1;
z = 2;  // ❌ Error
```

**Interview tip:** Always use `const`, use `let` when reassignment needed. Never use `var`!

---

### **Q8: Arrow function vs Regular function**
**A:**

```javascript
// Regular function
function regular() {
  console.log(this);  // `this` depends on how called
}

// Arrow function
const arrow = () => {
  console.log(this);  // `this` from parent scope (lexical)
};
```

**Key differences:**
1. **`this` binding:** Arrow has lexical `this`
2. **arguments object:** Arrow doesn't have
3. **constructor:** Arrow cannot be constructor
4. **Hoisting:** Regular function hoisted, arrow (if const/let) not

---

### **Q9: Promise vs async/await**
**A:**
Same thing, different syntax!

```javascript
// Promises (.then)
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/await (cleaner)
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

**Interview tip:** async/await = syntactic sugar over Promises. Prefer async/await for readability!

---

### **Q10: Spread operator (...) uses**
**A:**

```javascript
// 1. Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1];  // [1, 2, 3]

// 2. Merge arrays
const merged = [...arr1, ...arr2];

// 3. Copy object
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };  // { a: 1, b: 2 }

// 4. Merge objects
const merged = { ...obj1, ...obj2, c: 3 };

// 5. Function arguments
const nums = [1, 2, 3];
Math.max(...nums);  // Math.max(1, 2, 3)

// 6. Update state (React)
setState({ ...prevState, name: "John" });
```

---

## 🗄️ MongoDB Interview Questions

### **Q11: SQL vs NoSQL (MongoDB)**
**A:**

| SQL | NoSQL (MongoDB) |
|-----|-----------------|
| Tables (rows, columns) | Collections (documents) |
| Fixed schema | Flexible schema |
| Relations (JOIN) | Embedded/References |
| Vertical scaling | Horizontal scaling |
| ACID transactions | Eventually consistent |

**When to use MongoDB:**
- Flexible schema needed
- Rapid development
- Large scale data
- Document-based data

---

### **Q12: Mongoose schema vs model difference**
**A:**

**Schema:** Structure/blueprint define karta hai
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
```

**Model:** Database se interact karta hai
```javascript
const User = mongoose.model('User', userSchema);

// Now you can:
await User.find();
await User.create({...});
```

**Analogy:** Schema = Class definition, Model = Class instance

---

### **Q13: findOne vs findById difference?**
**A:**

```javascript
// findById - By MongoDB _id (optimized)
const user = await User.findById("64abc123");

// findOne - By any field
const user = await User.findOne({ email: "test@example.com" });
```

**Performance:** `findById` faster (indexed on _id)

---

## 🌐 Express/Backend Questions

### **Q14: Middleware kya hai? Types?**
**A:**
Functions jo request-response cycle mein run hote hain.

**Types:**
1. **Application-level:** `app.use()`
2. **Router-level:** `router.use()`
3. **Error-handling:** `app.use((err, req, res, next) => {...})`
4. **Built-in:** `express.json()`, `express.static()`
5. **Third-party:** `cors()`, `morgan()`

```javascript
// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // ⚠️ MUST call next()!
});
```

---

### **Q15: JWT authentication kaise kaam karta hai?**
**A:**

**Flow:**
```
1. User login → Server verifies
2. Server creates JWT token
3. Server sends token to client
4. Client stores token (localStorage)
5. Client sends token in headers for requests
6. Server verifies token → Grants access
```

**Code:**
```javascript
// Generate token (server)
const token = jwt.sign(
  { userId: user._id },  // Payload
  process.env.JWT_SECRET,  // Secret key
  { expiresIn: '1d' }  // Options
);

// Verify token (middleware)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;  // Attach to request
```

---

### **Q16: req.body vs req.params vs req.query**
**A:**

```javascript
// POST /api/users
// Body: { "name": "John", "email": "john@example.com" }
req.body.name   // "John"

// GET /api/users/123
req.params.id   // "123"

// GET /api/users?page=2&limit=10
req.query.page  // "2"
req.query.limit // "10"
```

**Use cases:**
- **body:** POST/PUT data (JSON)
- **params:** URL path variables (/:id)
- **query:** Filter/search parameters (?key=value)

---

## 🚀 Machine Coding Round Tips

### **Tip 1: Project Structure (5 minutes)**
```
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routers/
│   ├── middleware/
│   └── index.js
└── README.md
```

---

### **Tip 2: Start with boilerplate (10 min)**

**Frontend:**
```javascript
// App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Your UI */}
    </div>
  );
}
```

**Backend:**
```javascript
// index.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(5000, () => console.log('Server running'));
```

---

### **Tip 3: Common patterns (copy-paste ready)**

**Fetch with error handling:**
```javascript
async function fetchData() {
  try {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
```

**Form handling:**
```javascript
const [form, setForm] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Submit form
};
```

---

### **Tip 4: Common machine coding tasks**

1. **Todo App** (CRUD operations)
2. **Search/Filter** (array methods)
3. **Authentication** (login/signup)
4. **Pagination** (limit + skip)
5. **File Upload** (FormData)
6. **Real-time updates** (WebSocket/polling)

---

### **Tip 5: Time management**
- **0-10 min:** Setup + boilerplate
- **10-40 min:** Core functionality
- **40-50 min:** Styling + edge cases
- **50-60 min:** Testing + cleanup

---

## 🎓 Final Checklist

**React:**
- ✅ Components, props, state
- ✅ Hooks (useState, useEffect, useRef)
- ✅ Context API
- ✅ Event handling
- ✅ Conditional rendering
- ✅ Lists & keys

**Backend:**
- ✅ Express setup
- ✅ Routing
- ✅ Middleware
- ✅ MongoDB CRUD
- ✅ JWT authentication
- ✅ Error handling

**JavaScript:**
- ✅ var/let/const
- ✅ Arrow functions
- ✅ Promises/async-await
- ✅ Spread operator
- ✅ Destructuring
- ✅ Array methods (map, filter, reduce)

---

## 💪 Practice Tips

1. **Build 3-4 small projects**
2. **Ek baar pure MERN flow implement karo**
3. **Common patterns yaad karo**
4. **Error handling practice karo**
5. **Time limit mein practice karo (1 hour)**

**All the best for your interview! 🚀**
