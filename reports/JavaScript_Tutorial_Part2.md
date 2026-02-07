# JavaScript Tutorial Part 2 - ES6+ & Async Programming
## Modern JavaScript + Real-World Examples

---

## 4. ES6+ Modern Features {#es6-features}

### Template Literals (Template Strings)

```javascript
// Old way - string concatenation
const name = "John";
const age = 30;
const oldWay = "My name is " + name + " and I'm " + age + " years old";

// New way - template literals (use backticks `)
const newWay = `My name is ${name} and I'm ${age} years old`;

// Multi-line strings
const html = `
  <div class="user-card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;

// Expressions inside ${}
const price = 99.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
// "Total: $107.99"
```

**Real-World Example: Email Template Generator**
```javascript
// Email notification system
function generateWelcomeEmail(user) {
  const { firstName, email, verificationToken } = user;
  const appName = "QuillStack AI";
  const verificationLink = `https://app.example.com/verify?token=${verificationToken}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to ${appName}</title>
    </head>
    <body>
      <h1>Welcome, ${firstName}!</h1>
      <p>Thank you for joining ${appName}. We're excited to have you!</p>
      
      <p>Your account email: <strong>${email}</strong></p>
      
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}" style="
        background-color: #6366F1;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
      ">Verify Email</a>
      
      <p style="margin-top: 20px; color: #666;">
        If you didn't create this account, please ignore this email.
      </p>
      
      <footer style="margin-top: 40px; color: #999; font-size: 12px;">
        © 2026 ${appName}. All rights reserved.
      </footer>
    </body>
    </html>
  `;
}

// Usage
const newUser = {
  firstName: "John",
  email: "john@example.com",
  verificationToken: "abc123xyz"
};

const emailHTML = generateWelcomeEmail(newUser);
// Send via email service (SendGrid, AWS SES, etc.)
```

---

### Destructuring

```javascript
// Array Destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
// first = "red", second = "green", third = "blue"

// Skip elements
const [primary, , tertiary] = colors;
// primary = "red", tertiary = "blue"

// Object Destructuring
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  address: {
    city: "NYC",
    country: "USA"
  }
};

const { name, age } = user;
// name = "John", age = 30

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { role = "user" } = user;
// role = "user" (default, since not in object)

// Nested destructuring
const { address: { city, country } } = user;
// city = "NYC", country = "USA"

// Function parameters
function displayUser({ name, email }) {
  console.log(`${name}: ${email}`);
}
displayUser(user);
```

**Real-World Example: API Response Handler**
```javascript
// Handle complex API responses
async function fetchUserDashboard(userId) {
  const response = await fetch(`/api/dashboard/${userId}`);
  const data = await response.json();
  
  // Destructure complex response
  const {
    user: {
      name,
      avatar,
      subscription: { plan, expiresAt }
    },
    stats: {
      totalDocuments,
      storageUsed,
      lastActive
    },
    recentActivity = []  // Default to empty array
  } = data;
  
  // Use extracted data
  return {
    welcomeMessage: `Welcome back, ${name}!`,
    planInfo: `You're on the ${plan} plan (expires: ${new Date(expiresAt).toLocaleDateString()})`,
    usage: `${totalDocuments} documents, ${(storageUsed / 1024 / 1024).toFixed(2)} MB used`,
    lastSeen: `Last active: ${new Date(lastActive).toRelativeTime()}`,
    activities: recentActivity.slice(0, 5)  // Latest 5
  };
}

// Usage
const dashboard = await fetchUserDashboard(123);
console.log(dashboard);
```

---

### Spread & Rest Operators

```javascript
// Spread Operator (...) - Expand array/object

// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

const copy = [...arr1];  // Create shallow copy

// Objects
const user = { name: "John", age: 30 };
const updatedUser = { ...user, age: 31 };  // { name: "John", age: 31 }

const userWithEmail = { ...user, email: "john@example.com" };

// Rest Operator (...) - Collect remaining items

// Function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5);  // 15

// Array destructuring
const [first, ...rest] = [1, 2, 3, 4, 5];
// first = 1, rest = [2, 3, 4, 5]

// Object destructuring
const { name, ...otherProps } = { name: "John", age: 30, email: "john@example.com" };
// name = "John", otherProps = { age: 30, email: "john@example.com" }
```

**Real-World Example: State Management Helper**
```javascript
// React/Redux style state updater
class StateManager {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = [];
  }
  
  // Update state (immutable)
  setState(updates) {
    this.state = {
      ...this.state,  // Keep existing state
      ...updates      // Apply updates
    };
    this.notifyListeners();
  }
  
  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
  
  getState() {
    return { ...this.state };  // Return copy
  }
}

// Usage
const store = new StateManager({
  user: null,
  theme: 'light',
  notifications: []
});

// Subscribe to changes
const unsubscribe = store.subscribe((state) => {
  console.log("State updated:", state);
});

// Update state
store.setState({ user: { id: 1, name: "John" } });
store.setState({ theme: 'dark' });

// Add notification (spread with array)
const currentState = store.getState();
store.setState({
  notifications: [...currentState.notifications, { id: 1, message: "Welcome!" }]
});
```

---

### Modules (Import/Export)

```javascript
// ===== user.js (Module file) =====

// Named exports
export const API_URL = "https://api.example.com";

export function getUser(id) {
  return fetch(`${API_URL}/users/${id}`).then(r => r.json());
}

export class User {
  constructor(data) {
    this.data = data;
  }
}

// Default export (one per file)
export default function authenticate(credentials) {
  return fetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

// ===== app.js (Import file) =====

// Import default export
import authenticate from './user.js';

// Import named exports
import { getUser, API_URL } from './user.js';

// Import all as namespace
import * as UserModule from './user.js';
UserModule.getUser(123);

// Rename imports
import { getUser as fetchUser } from './user.js';
```

**Real-World Example: Utility Modules Structure**
```javascript
// ===== utils/validation.js =====
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

export function isValidPhone(phone) {
  return /^\+?[\d\s-()]+$/.test(phone);
}

// ===== utils/format.js =====
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

export function formatDate(date, format = 'short') {
  return new Intl.DateTimeFormat('en-US', { dateStyle: format }).format(new Date(date));
}

// ===== utils/index.js (Barrel export) =====
export * from './validation.js';
export * from './format.js';

// ===== app.js (Clean imports) =====
import { isValidEmail, formatCurrency, formatDate } from './utils/index.js';

// Use utilities
const email = "user@example.com";
if (isValidEmail(email)) {
  console.log("Valid email!");
}

const price = formatCurrency(1234.56);  // "$1,234.56"
const date = formatDate(new Date());     // "2/6/26"
```

---

## 5. Async JavaScript {#async-js}

### Callbacks (Old Way - Callback Hell)

```javascript
// ❌ Callback Hell - Difficult to read and maintain
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      processPayment(details.total, (result) => {
        console.log("Payment processed:", result);
      });
    });
  });
});
```

### Promises (Better)

```javascript
// Promise states: pending, fulfilled, rejected
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  }, 1000);
});

// Using promises
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));

// Chaining promises
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/orders/${user.id}`))
  .then(response => response.json())
  .then(orders => console.log(orders))
  .catch(error => console.error('Error:', error));
```

**Real-World Example: Sequential API Calls**
```javascript
// Fetch user, then their documents, then document details
function getUserDocuments(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error('User not found');
      return response.json();
    })
    .then(user => {
      console.log(`Fetching documents for ${user.name}`);
      return fetch(`/api/users/${user.id}/documents`);
    })
    .then(response => response.json())
    .then(documents => {
      // Get details for first document
      if (documents.length > 0) {
        return fetch(`/api/documents/${documents[0].id}`);
      }
      throw new Error('No documents found');
    })
    .then(response => response.json())
    .then(docDetails => {
      console.log('Document details:', docDetails);
      return docDetails;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error;
    });
}
```

### Async/Await (Modern & Clean) ⭐

```javascript
// Same logic as above, much cleaner!
async function getUserDocuments(userId) {
  try {
    // Await makes async code look synchronous
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) throw new Error('User not found');
    
    const user = await userResponse.json();
    console.log(`Fetching documents for ${user.name}`);
    
    const docsResponse = await fetch(`/api/users/${user.id}/documents`);
    const documents = await docsResponse.json();
    
    if (documents.length === 0) {
      throw new Error('No documents found');
    }
    
    const detailsResponse = await fetch(`/api/documents/${documents[0].id}`);
    const docDetails = await detailsResponse.json();
    
    console.log('Document details:', docDetails);
    return docDetails;
    
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Call async function
getUserDocuments(123);
```

**Real-World Example: File Upload with Progress**
```javascript
// File upload with retry logic and progress
async function uploadFileWithRetry(file, maxRetries = 3) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`Upload attempt ${attempt}/${maxRetries}`);
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload with progress tracking
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Upload successful:', result);
      return result;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt >= maxRetries) {
        throw new Error(`Upload failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;  // 2s, 4s, 8s...
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
async function handleFileUpload(fileInput) {
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a file');
    return;
  }
  
  try {
    const result = await uploadFileWithRetry(file);
    alert(`File uploaded successfully! File ID: ${result.id}`);
  } catch (error) {
    alert(`Upload failed: ${error.message}`);
  }
}
```

### Promise.all, Promise.race, Promise.allSettled

```javascript
// Promise.all - Wait for all (fails if any fails)
async function loadDashboard() {
  try {
    const [user, stats, notifications] = await Promise.all([
      fetch('/api/user').then(r => r.json()),
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/notifications').then(r => r.json())
    ]);
    
    return { user, stats, notifications };
  } catch (error) {
    console.error('One of the requests failed:', error);
  }
}

// Promise.race - First to complete wins
async function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Promise.allSettled - Wait for all, regardless of success/failure
async function syncMultipleDataSources() {
  const results = await Promise.allSettled([
    fetch('/api/source1').then(r => r.json()),
    fetch('/api/source2').then(r => r.json()),
    fetch('/api/source3').then(r => r.json())
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Source ${index + 1} data:`, result.value);
    } else {
      console.error(`Source ${index + 1} failed:`, result.reason);
    }
  });
}
```

**TO BE CONTINUED IN PART 3...**

Next: DOM Manipulation, Advanced Concepts, and Real-World Tasks!
