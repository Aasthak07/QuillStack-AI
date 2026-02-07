# Complete JavaScript Tutorial - Basic to Advanced
## Real-World Industry Examples + Practical Tasks

---

## 📚 Table of Contents
1. [JavaScript Fundamentals](#fundamentals)
2. [Functions Deep Dive](#functions)
3. [Arrays & Objects](#arrays-objects)
4. [ES6+ Modern Features](#es6-features)
5. [Async JavaScript](#async-js)
6. [DOM Manipulation](#dom)
7. [Advanced Concepts](#advanced)
8. [Real-World Tasks](#tasks)

---

## 1. JavaScript Fundamentals {#fundamentals}

### Variables (var, let, const)

```javascript
// ❌ Avoid var (function-scoped, hoisted with 'undefined')
var oldWay = "Don't use this";

// ✅ Use let for reassignable variables (block-scoped)
let age = 25;
age = 26;  // ✅ OK

// ✅ Use const for constants (block-scoped, can't reassign)
const API_URL = "https://api.example.com";
// API_URL = "new";  // ❌ Error

// ⚠️ const with objects (reference is constant, not content)
const user = { name: "John" };
user.name = "Jane";  // ✅ OK - modifying property
user.age = 30;       // ✅ OK - adding property
// user = {};        // ❌ Error - can't reassign
```

**Real-World Example: Configuration Management**
```javascript
// config.js (Industry standard)
const CONFIG = {
  API_BASE_URL: process.env.API_URL || 'http://localhost:5000',
  TIMEOUT: 5000,
  MAX_RETRIES: 3,
  FEATURES: {
    DARK_MODE: true,
    ANALYTICS: process.env.NODE_ENV === 'production'
  }
};

// Usage in your app
async function fetchUserData(userId) {
  const response = await fetch(`${CONFIG.API_BASE_URL}/users/${userId}`, {
    timeout: CONFIG.TIMEOUT
  });
  return response.json();
}
```

---

### Data Types

```javascript
// Primitives (immutable)
let str = "Hello";           // String
let num = 42;                // Number
let bool = true;             // Boolean
let nothing = null;          // Null (intentional absence)
let notDefined;              // Undefined (declared but not assigned)
let sym = Symbol('unique');  // Symbol (ES6)
let big = 123n;              // BigInt (for very large numbers)

// Reference Types (mutable)
let arr = [1, 2, 3];                    // Array
let obj = { name: "John", age: 30 };     // Object
let func = function() { return 1; };     // Function

// Type checking
console.log(typeof str);     // "string"
console.log(typeof num);     // "number"
console.log(typeof bool);    // "boolean"
console.log(typeof null);    // "object" (⚠️ known bug in JS!)
console.log(typeof arr);     // "object" (arrays are objects)
console.log(Array.isArray(arr));  // true (correct way to check arrays)
```

**Real-World Example: Form Validation**
```javascript
// E-commerce checkout validation
function validateCheckoutForm(formData) {
  const errors = {};
  
  // String validation
  if (typeof formData.email !== 'string' || !formData.email.includes('@')) {
    errors.email = "Valid email required";
  }
  
  // Number validation
  if (typeof formData.quantity !== 'number' || formData.quantity < 1) {
    errors.quantity = "Quantity must be at least 1";
  }
  
  // Boolean validation
  if (typeof formData.termsAccepted !== 'boolean' || !formData.termsAccepted) {
    errors.terms = "You must accept terms and conditions";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Usage
const checkoutData = {
  email: "user@example.com",
  quantity: 2,
  termsAccepted: true
};

const validation = validateCheckoutForm(checkoutData);
if (!validation.isValid) {
  console.error("Form errors:", validation.errors);
}
```

---

### Operators

```javascript
// Arithmetic
let sum = 10 + 5;      // 15
let diff = 10 - 5;     // 5
let product = 10 * 5;  // 50
let quotient = 10 / 5; // 2
let remainder = 10 % 3; // 1 (modulo)
let power = 2 ** 3;    // 8 (exponentiation)

// Increment/Decrement
let count = 0;
count++;  // 1 (post-increment)
++count;  // 2 (pre-increment)
count--;  // 1 (post-decrement)

// Comparison
10 == "10"   // true (loose equality - type coercion)
10 === "10"  // false (strict equality - no coercion)
10 != "10"   // false
10 !== "10"  // true
10 > 5       // true
10 >= 10     // true

// Logical
true && false  // false (AND)
true || false  // true (OR)
!true          // false (NOT)

// Nullish Coalescing (??) - ES2020
let value = null ?? "default";  // "default"
let value2 = 0 ?? "default";    // 0 (not null/undefined)

// Optional Chaining (?.) - ES2020
const user = { address: { city: "NYC" } };
console.log(user?.address?.city);     // "NYC"
console.log(user?.contact?.phone);    // undefined (no error!)
```

**Real-World Example: Shopping Cart Calculation**
```javascript
// E-commerce cart total calculator
function calculateCart(items, discountCode, isMember) {
  let subtotal = 0;
  
  // Calculate subtotal
  items.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  // Apply discount (10% for members, 5% for discount code)
  let discount = 0;
  if (isMember) {
    discount = subtotal * 0.10;
  } else if (discountCode === "SAVE5") {
    discount = subtotal * 0.05;
  }
  
  // Tax calculation (8%)
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * 0.08;
  
  // Shipping (free if subtotal > $50)
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  const total = subtotal - discount + tax + shipping;
  
  return {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    tax: tax.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2)
  };
}

// Usage
const cart = [
  { name: "Laptop", price: 999.99, quantity: 1 },
  { name: "Mouse", price: 29.99, quantity: 2 }
];

const result = calculateCart(cart, "SAVE5", false);
console.log(result);
// { subtotal: "1059.97", discount: "53.00", tax: "80.56", shipping: "0.00", total: "1087.53" }
```

---

## 2. Functions Deep Dive {#functions}

### Function Declaration vs Expression

```javascript
// Function Declaration (hoisted)
greet("John");  // ✅ Works! (hoisted)

function greet(name) {
  return `Hello, ${name}!`;
}

// Function Expression (not hoisted)
// sayHi("John");  // ❌ Error: sayHi is not defined

const sayHi = function(name) {
  return `Hi, ${name}!`;
};

sayHi("John");  // ✅ Works

// Arrow Function (ES6) - concise syntax
const add = (a, b) => a + b;
const square = x => x * x;  // Single param, no parentheses
const log = () => console.log("Hello");  // No params

// Multi-line arrow function
const complexOperation = (x, y) => {
  const result = x * y;
  return result + 10;
};
```

**Real-World Example: API Request Helper**
```javascript
// utils/api.js - Industry standard API helper
const API_BASE = "https://api.yourapp.com";

// Request wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...defaultOptions,
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Specific API functions
const getUser = (userId) => apiRequest(`/users/${userId}`);

const updateUser = (userId, data) => apiRequest(`/users/${userId}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});

const deleteUser = (userId) => apiRequest(`/users/${userId}`, {
  method: 'DELETE'
});

// Usage
async function loadUserProfile() {
  try {
    const user = await getUser(123);
    console.log(user);
  } catch (error) {
    alert("Failed to load profile");
  }
}
```

---

### Parameters & Arguments

```javascript
// Default Parameters
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}

createUser("John");  // { name: "John", role: "user", active: true }
createUser("Admin", "admin");  // { name: "Admin", role: "admin", active: true }

// Rest Parameters (collect remaining arguments)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5);  // 15

// Destructuring Parameters
function displayUser({ name, age, email }) {
  console.log(`${name} (${age}) - ${email}`);
}

displayUser({ name: "John", age: 30, email: "john@example.com" });
```

**Real-World Example: Logger Utility**
```javascript
// utils/logger.js - Production-ready logging
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class Logger {
  constructor(minLevel = LOG_LEVELS.INFO) {
    this.minLevel = minLevel;
  }
  
  log(level, message, ...data) {
    if (level < this.minLevel) return;
    
    const timestamp = new Date().toISOString();
    const levelName = Object.keys(LOG_LEVELS).find(
      key => LOG_LEVELS[key] === level
    );
    
    console.log(`[${timestamp}] [${levelName}] ${message}`, ...data);
    
    // In production, send to logging service
    if (level >= LOG_LEVELS.ERROR) {
      this.sendToServer(levelName, message, data);
    }
  }
  
  debug(message, ...data) {
    this.log(LOG_LEVELS.DEBUG, message, ...data);
  }
  
  info(message, ...data) {
    this.log(LOG_LEVELS.INFO, message, ...data);
  }
  
  warn(message, ...data) {
    this.log(LOG_LEVELS.WARN, message, ...data);
  }
  
  error(message, ...data) {
    this.log(LOG_LEVELS.ERROR, message, ...data);
  }
  
  async sendToServer(level, message, data) {
    // Send to error tracking service (Sentry, LogRocket, etc.)
    try {
      await fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify({ level, message, data, timestamp: Date.now() })
      });
    } catch (e) {
      console.error('Failed to send log to server:', e);
    }
  }
}

// Usage
const logger = new Logger(LOG_LEVELS.INFO);

logger.debug("Debug info");  // Won't show (below min level)
logger.info("User logged in", { userId: 123 });
logger.error("Payment failed", { orderId: 456, error: "Card declined" });
```

---

## 3. Arrays & Objects {#arrays-objects}

### Arrays - Modern Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - Transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter() - Keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce() - Reduce to single value
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

// find() - First element that passes test
const firstEven = numbers.find(n => n % 2 === 0);
// 2

// some() - At least one passes test
const hasEven = numbers.some(n => n % 2 === 0);
// true

// every() - All pass test
const allPositive = numbers.every(n => n > 0);
// true

// forEach() - Execute function for each (no return value)
numbers.forEach(n => console.log(n));

// includes() - Check if value exists
numbers.includes(3);  // true

// Chaining methods
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);
// 24 (3*2 + 4*2 + 5*2 = 6 + 8 + 10)
```

**Real-World Example: E-commerce Product Filtering**
```javascript
// Products from database
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, inStock: true, rating: 4.5 },
  { id: 2, name: "Phone", category: "electronics", price: 699, inStock: false, rating: 4.7 },
  { id: 3, name: "Desk", category: "furniture", price: 299, inStock: true, rating: 4.2 },
  { id: 4, name: "Chair", category: "furniture", price: 199, inStock: true, rating: 4.0 },
  { id: 5, name: "Monitor", category: "electronics", price: 349, inStock: true, rating: 4.6 }
];

// Filter, sort, and format products
function getProductsForDisplay(filters = {}) {
  let filtered = products;
  
  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  // Filter by price range
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  
  // Filter by stock
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }
  
  // Sort by rating (highest first)
  filtered.sort((a, b) => b.rating - a.rating);
  
  // Format for display
  return filtered.map(p => ({
    id: p.id,
    name: p.name,
    price: `$${p.price}`,
    availability: p.inStock ? "In Stock" : "Out of Stock",
    rating: `${p.rating}/5`
  }));
}

// Usage
const displayProducts = getProductsForDisplay({
  category: "electronics",
  maxPrice: 800,
  inStockOnly: true
});

console.log(displayProducts);
// [{ id: 5, name: "Monitor", price: "$349", availability: "In Stock", rating: "4.6/5" }]
```

### Objects - Modern Features

```javascript
// Object literal shorthand
const name = "John";
const age = 30;

// Old way
const user1 = { name: name, age: age };

// New way (ES6)
const user2 = { name, age };  // Same as above

// Computed property names
const key = "email";
const user3 = {
  name: "John",
  [key]: "john@example.com"  // email: "john@example.com"
};

// Object destructuring
const { name: userName, age: userAge } = user2;
console.log(userName, userAge);  // "John" 30

// Spread operator
const baseUser = { id: 1, name: "John" };
const fullUser = { ...baseUser, email: "john@example.com", age: 30 };
// { id: 1, name: "John", email: "john@example.com", age: 30 }

// Object methods
Object.keys(user2);     // ["name", "age"]
Object.values(user2);   // ["John", 30]
Object.entries(user2);  // [["name", "John"], ["age", 30]]
```

**Real-World Example: User Profile Merger**
```javascript
// Merge data from multiple sources
function mergeUserProfiles(dbUser, socialProfile, preferences) {
  // Default values
  const defaults = {
    theme: 'light',
    notifications: true,
    language: 'en'
  };
  
  // Merge with priority: preferences > socialProfile > dbUser > defaults
  const mergedProfile = {
    ...defaults,
    ...dbUser,
    ...socialProfile,
    ...preferences,
    updatedAt: new Date().toISOString()
  };
  
  // Remove sensitive data before sending to frontend
  const { password, ssn, ...safeProfile } = mergedProfile;
  
  return safeProfile;
}

// Usage
const dbData = {
  id: 123,
  email: "john@example.com",
  password: "hashed_password",
  createdAt: "2023-01-01"
};

const socialData = {
  name: "John Doe",
  avatar: "https://avatar.url",
  verified: true
};

const userPrefs = {
  theme: 'dark',
  language: 'es'
};

const profile = mergeUserProfiles(dbData, socialData, userPrefs);
console.log(profile);
// {
//   theme: 'dark',
//   notifications: true,
//   language: 'es',
//   id: 123,
//   email: "john@example.com",
//   createdAt: "2023-01-01",
//   name: "John Doe",
//   avatar: "https://avatar.url",
//   verified: true,
//   updatedAt: "2026-02-06T..."
// }
```

---

**TO BE CONTINUED...**

Next sections will cover:
- ES6+ Features (Template literals, Destructuring, Modules)
- Async JavaScript (Promises, async/await, Error handling)
- DOM Manipulation
- Advanced Concepts (Closures, Prototypes, Classes)
- Real-World Tasks & Exercises

This is Part 1 of the tutorial. Would you like me to continue with the remaining sections?
