# Context API Complete Guide
## Global State Management without Redux!

---

## 🤔 Context API kyu chahiye?

### **Problem without Context:**
```
App
 ├── Header (needs user data)
 ├── Sidebar (needs user data)
 └──  Dashboard
      ├── Profile (needs user data)
      └── Settings (needs user data)
```

**Bina Context:** Props drilling - har level par props pass karo 😫
```javascript
<App>
  <Header user={user} />
  <Dashboard user={user}>
    <Profile user={user} />
  </Dashboard>
</App>
```

**With Context:** Direct access! 🎉
```javascript
// Kahi bhi use karo
const { user } = useAuth();
```

---

## 📦 Context API Setup (4 Steps)

### **Step 1: Create Context**
```javascript
import { createContext } from 'react';

const AuthContext = createContext();  // Context banao
```

### **Step 2: Create Provider Component**

**Tumhare AuthContext.jsx se:**
```javascript
export function AuthProvider({ children }) {
  // ✅ State define karo (jo globally share karni hai)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Functions banao
  const login = async (credentials) => { ... };
  const signup = async (userData) => { ... };
  const logout = () => { ... };

  // ✅ Value object banao (jo share karna hai)
  const value = {
    user,        // State
    loading,     // State
    login,       // Function
    signup,      // Function
    logout,      // Function
    isAuthenticated  // Function
  };

  // ✅ Provider se wrap karo
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}  {/* Loading ke baad hi children dikhao */}
    </AuthContext.Provider>
  );
}
```

### **Step 3: Wrap your App with Provider**
```javascript
// app/layout.jsx or _app.js
import { AuthProvider } from './context/AuthContext';

export default function Layout({ children }) {
  return (
    <AuthProvider>  {/* ✅ Wrap your entire app */}
      {children}
    </AuthProvider>
  );
}
```

### **Step 4: Create Custom Hook for easy access**
```javascript
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
```

---

## 🎯 Using Context in Components

### **Consumer Component:**
```javascript
import { useAuth } from '@/context/AuthContext';

function Profile() {
  // ✅ Context se data lao
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Interview Question:** Context vs Props?
**Answer:**
- **Props:** Parent → Child (one level down)
- **Context:** Any component can access (no matter how deep)
- **Use Context when:** Multiple components need same data
- **Use Props when:** Parent-child relationship, single level

---

## 🔐 Real Example: Authentication Context

### **Complete AuthContext.jsx breakdown:**

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1️⃣ Context banao
const AuthContext = createContext();

// 2️⃣ Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 3️⃣ Initial load - check localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));  // Restore user
      } catch (error) {
        localStorage.removeItem('user');  // Corrupt data remove karo
      }
    }
    setLoading(false);  // Loading complete
  }, []);  // Empty array = runs once on mount

  // 4️⃣ Signup function
  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Token decode karo
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const userInfo = {
        id: payload._id,
        name: payload.name,
        email: payload.email,
        token: data.token
      };

      // State aur localStorage update karo
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 5️⃣ Login function (similar to signup)
  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const userInfo = { ...payload, token: data.token };

      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 6️⃣ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');  // Redirect to home
  };

  // 7️⃣ Check if authenticated
  const isAuthenticated = () => {
    if (!user) return false;
    
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Token expiry check karo
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        logout();  // Expired token
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  // 8️⃣ Value object banao
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated,
  };

  // 9️⃣ Provider return karo
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 🔟 Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## 🎨 Using AuthContext in Components

### **Example 1: Login Page**
```javascript
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();  // ✅ Context use karo
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login({ email, password });
    
    if (result.success) {
      router.push('/dashboard');  // Success - redirect
    } else {
      alert(result.error);  // Error dikhaao
    }
  };

  // Already logged in?
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### **Example 2: Protected Component**
```javascript
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ Check authentication on mount
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### **Example 3: Header Component**
```javascript
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <span>Hi, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
}
```

---

## 🚀 Advanced Patterns

### **Pattern 1: Multiple Contexts**
```javascript
// ThemeContext
const ThemeContext = createContext();

// AuthContext
const AuthContext = createContext();

// Combine in App
<ThemeProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>

// Use both
const { user } = useAuth();
const { theme, toggleTheme } = useTheme();
```

### **Pattern 2: Context with Reducer (Complex state)**
```javascript
import { useReducer } from 'react';

const initialState = {
  user: null,
  loading: true,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    // ... API call
    dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🎓 Interview Questions & Answers

**Q1: Context API vs Redux?**
**A:** 
- **Context API:** Built-in, simple, good for small-medium apps
- **Redux:** Third-party, complex, better for large apps with complex state
- **When to use Context:** Theme, Auth, Language
- **When to use Redux:** E-commerce cart, Real-time data, Undo/Redo

**Q2: Context API performance issues?**
**A:** 
- Re-renders all consumers when value changes
- Solution: Split contexts (AuthContext, ThemeContext separately)
- Or use `useMemo` to memoize value object

**Q3: Can we use multiple contexts?**
**A:** Yes! Nest providers or use compound pattern

**Q4: Context vs localStorage?**
**A:**
- **localStorage:** Persist data (survives refresh)
- **Context:** In-memory (lost on refresh)
- **Best practice:** Use both - Context for current session + localStorage for persistence

---

## 💡 Best Practices

1. ✅ Create custom hooks (`useAuth`, `useTheme`)
2. ✅ Split contexts by concern (don't put everything in one)
3. ✅ Use default values in `createContext(defaultValue)`
4. ✅ Handle loading states
5. ✅ Error boundaries for context errors
6. ✅ Memoize value object if expensive calculations

```javascript
const value = useMemo(() => ({
  user,
  login,
  logout
}), [user]);  // Only recalculate when user changes
```

Agle guide mein Backend Structure aur MongoDB deep dive! 🚀
