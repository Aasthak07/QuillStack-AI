# JavaScript Tutorial Part 3 - DOM, Advanced Concepts & Tasks
## Real-World Programming + Practical Exercises

---

## 6. DOM Manipulation {#dom}

### Selecting Elements

```javascript
// getElementById
const header = document.getElementById('header');

// querySelector (returns first match)
const button = document.querySelector('.btn-primary');
const input = document.querySelector('input[type="email"]');

// querySelectorAll (returns NodeList - like array)
const allButtons = document.querySelectorAll('button');
const listItems = document.querySelectorAll('.list-item');

// Convert NodeList to Array for array methods
const buttonsArray = Array.from(allButtons);
buttonsArray.forEach(btn => console.log(btn));

// Modern spread operator
const items = [...document.querySelectorAll('.item')];
```

### Modifying Elements

```javascript
// Change text content
element.textContent = "New text";  // Plain text
element.innerHTML = "<strong>Bold text</strong>";  // HTML

// Change attributes
element.setAttribute('data-id', '123');
element.getAttribute('data-id');  // "123"
element.removeAttribute('data-id');

// Direct property access (better performance)
element.id = 'newId';
element.className = 'active';
element.value = 'input value';  // For inputs

// Change styles
element.style.color = 'red';
element.style.backgroundColor = '#f0f0f0';
element.style.display = 'none';

// Add/remove CSS classes (recommended)
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
element.classList.contains('active');  // true/false
```

**Real-World Example: Dynamic Form Validation**
```javascript
// Real-time form validation with visual feedback
function setupFormValidation(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Validate on blur (when user leaves field)
    input.addEventListener('blur', () => validateField(input));
    
    // Clear error on input
    input.addEventListener('input', () => clearError(input));
  });
  
  // Validate entire form on submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      await submitForm(form);
    }
  });
}

function validateField(input) {
  const value = input.value.trim();
  const type = input.type;
  let error = '';
  
  // Required check
  if (input.required && !value) {
    error = 'This field is required';
  }
  // Email validation
  else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Please enter a valid email';
  }
  // Password strength
  else if (type === 'password' && value.length < 8) {
    error = 'Password must be at least 8 characters';
  }
  // Phone number
  else if (input.name === 'phone' && !/^\+?[\d\s-()]+$/.test(value)) {
    error = 'Please enter a valid phone number';
  }
  
  if (error) {
    showError(input, error);
    return false;
  }
  
  clearError(input);
  return true;
}

function showError(input, message) {
  // Add error class
  input.classList.add('error');
  input.classList.remove('success');
  
  // Show error message
  let errorDiv = input.parentElement.querySelector('.error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    input.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  input.classList.add('success');
  
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

async function submitForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showSuccessMessage('Form submitted successfully!');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    showErrorMessage('Failed to submit form. Please try again.');
  }
}

// Initialize validation
setupFormValidation('contactForm');
```

### Creating & Removing Elements

```javascript
// Create elements
const div = document.createElement('div');
div .className = 'card';
div.id = 'user-card';
div.innerHTML = `
  <h3>John Doe</h3>
  <p>john@example.com</p>
`;

// Append to DOM
document.body.appendChild(div);
document.querySelector('.container').appendChild(div);

// Insert at specific position
const parent = document.getElementById('list');
const firstChild = parent.firstElementChild;
parent.insertBefore(div, firstChild);  // Insert before first child

// Remove element
div.remove();  // Modern way
// parent.removeChild(div);  // Old way
```

**Real-World Example: Dynamic Product Card Generator**
```javascript
// Generate product listings dynamically
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">$${product.price.toFixed(2)}</span>
        ${product.inStock 
          ? '<button class="btn-add-cart">Add to Cart</button>' 
          : '<span class="out-of-stock">Out of Stock</span>'
        }
      </div>
    </div>
  `;
  
  // Add click handler
  if (product.inStock) {
    const btn = card.querySelector('.btn-add-cart');
    btn.addEventListener('click', () => addToCart(product));
  }
  
  return card;
}

function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';  // Clear existing
  
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Usage
const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop", price: 999.99, inStock: true, image: "/laptop.jpg" },
  { id: 2, name: "Mouse", description: "Wireless mouse", price: 29.99, inStock: false, image: "/mouse.jpg" }
];

renderProducts(products);
```

---

## 7. Advanced Concepts {#advanced}

### Closures

```javascript
// Closure: Inner function has access to outer function's variables
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getCount();   // 2
// count is NOT accessible directly (private)
```

**Real-World Example: Rate Limiter**
```javascript
// API rate limiter using closure
function createRateLimiter(maxRequests, timeWindow) {
  let requests = [];
  
  return function(apiCall) {
    const now = Date.now();
    
    // Remove old requests outside time window
    requests = requests.filter(time => now - time < timeWindow);
    
    if (requests.length >= maxRequests) {
      throw new Error(`Rate limit exceeded. Max ${maxRequests} requests per ${timeWindow/1000}s`);
    }
    
    requests.push(now);
    return apiCall();
  };
}

// Usage: Max 5 requests per 10 seconds
const limitedFetch = createRateLimiter(5, 10000);

async function fetchData(url) {
  try {
    return await limitedFetch(() => fetch(url));
  } catch (error) {
    console.error(error.message);
    // Show user-friendly error
    alert('Too many requests. Please wait a moment.');
  }
}
```

### this Keyword

```javascript
// 'this' depends on HOW function is called

// 1. Method: this = object
const user = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
user.greet();  // "Hello, John"

// 2. Regular function: this = window (or undefined in strict mode)
function regularFunc() {
  console.log(this);
}
regularFunc();  // window object

// 3. Arrow function: this = lexical (parent scope)
const obj = {
  name: "Test",
  regularFunc() {
    setTimeout(function() {
      console.log(this.name);  // undefined (this = window)
    }, 100);
  },
  arrowFunc() {
    setTimeout(() => {
      console.log(this.name);  // "Test" (this = obj)
    }, 100);
  }
};

// 4. bind, call, apply - explicitly set this
const boundFunc = user.greet.bind({ name: "Jane" });
boundFunc();  // "Hello, Jane"
```

### Classes (ES6)

```javascript
class User {
  // Private fields (ES2022)
  #password;
  
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = password;  // Private
  }
  
  // Method
  greet() {
    return `Hello, ${this.name}!`;
  }
  
  // Getter
  get info() {
    return `${this.name} (${this.email})`;
  }
  
  // Setter
  set updateEmail(email) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }
    this.email = email;
  }
  
  // Static method (called on class, not instance)
  static create(data) {
    return new User(data.name, data.email, data.password);
  }
  
  // Private method
  #hashPassword() {
    return this.#password.split('').reverse().join('');  // Dummy hash
  }
}

// Usage
const user = new User("John", "john@example.com", "pass123");
console.log(user.greet());  // "Hello, John!"
console.log(user.info);     // "John (john@example.com)"
// console.log(user.#password);  // ❌ Error: private field

// Static method
const user2 = User.create({ name: "Jane", email: "jane@example.com", password: "pass456" });
```

**Real-World Example: Cache Manager Class**
```javascript
class CacheManager {
  #cache = new Map();
  #maxSize;
  #ttl;
  
  constructor(maxSize = 100, ttl = 3600000) {  // 1 hour default TTL
    this.#maxSize = maxSize;
    this.#ttl = ttl;
  }
  
  set(key, value, customTTL) {
    // Remove oldest if cache full
    if (this.#cache.size >= this.#maxSize) {
      const firstKey = this.#cache.keys().next().value;
      this.#cache.delete(firstKey);
    }
    
    const expiresAt = Date.now() + (customTTL || this.#ttl);
    this.#cache.set(key, { value, expiresAt });
  }
  
  get(key) {
    const item = this.#cache.get(key);
    
    if (!item) return null;
    
    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.#cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  clear() {
    this.#cache.clear();
  }
  
  get size() {
    return this.#cache.size;
  }
  
  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.#cache.entries()) {
      if (now > item.expiresAt) {
        this.#cache.delete(key);
      }
    }
  }
}

// Usage
const cache = new CacheManager(50, 5000);  // 50 items, 5s TTL

// Cache API responses
async function fetchUserWithCache(userId) {
  const cacheKey = `user_${userId}`;
  
  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('From cache');
    return cached;
  }
  
  // Fetch from API
  console.log('From API');
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  
  // Store in cache
  cache.set(cacheKey, user);
  
  return user;
}
```

---

## 8. Real-World Practical Tasks {#tasks}

### Task 1: Todo App (CRUD Operations)

**Requirements:**
- Add new todos
- Mark as complete/incomplete
- Delete todos
- Filter: All, Active, Completed
- Store in localStorage

**Solution:**
```javascript
class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.filter = 'all';
    this.init();
  }
  
  init() {
    this.renderTodos();
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    const form = document.getElementById('todoForm');
    const filterBtns = document.querySelectorAll('[data-filter]');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      this.addTodo(input.value);
      input.value = '';
    });
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filter = btn.dataset.filter;
        this.renderTodos();
      });
    });
  }
  
  addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.todos.push(todo);
    this.saveTodos();
    this.renderTodos();
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.renderTodos();
    }
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.renderTodos();
  }
  
  getFilteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }
  
  renderTodos() {
    const container = document.getElementById('todoList');
    const filtered = this.getFilteredTodos();
    
    container.innerHTML = filtered.map(todo => `
      <div class="todo-item ${todo.completed ? 'completed' : ''}">
        <input 
          type="checkbox" 
          ${todo.completed ? 'checked' : ''}
          onchange="app.toggleTodo(${todo.id})"
        >
        <span>${todo.text}</span>
        <button onclick="app.deleteTodo(${todo.id})">Delete</button>
      </div>
    `).join('');
    
    // Update stats
    document.getElementById('totalCount').textContent = this.todos.length;
    document.getElementById('activeCount').textContent = this.todos.filter(t => !t.completed).length;
  }
  
  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  
  loadTodos() {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  }
}

// Initialize app
const app = new TodoApp();
```

### Task 2: Search with Debounce

**Requirements:**
- Search API as user types
- Debounce to avoid too many requests
- Show loading state
- Cancel previous requests

**Solution:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

class SearchComponent {
  constructor(inputId, resultsId) {
    this.input = document.getElementById(inputId);
    this.results = document.getElementById(resultsId);
    this.controller = null;  // For aborting requests
    
    this.input.addEventListener('input', debounce((e) => {
      this.search(e.target.value);
    }, 300));  // 300ms debounce
  }
  
  async search(query) {
    if (!query.trim()) {
      this.results.innerHTML = '';
      return;
    }
    
    // Abort previous request
    if (this.controller) {
      this.controller.abort();
    }
    
    this.controller = new AbortController();
    
    try {
      this.showLoading();
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: this.controller.signal
      });
      
      const data = await response.json();
      this.displayResults(data);
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        this.showError('Search failed');
      }
    }
  }
  
  showLoading() {
    this.results.innerHTML = '<div class="loading">Searching...</div>';
  }
  
  displayResults(data) {
    if (data.length === 0) {
      this.results.innerHTML = '<div>No results found</div>';
      return;
    }
    
    this.results.innerHTML = data.map(item => `
      <div class="search-result">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `).join('');
  }
  
  showError(message) {
    this.results.innerHTML = `<div class="error">${message}</div>`;
  }
}

const search = new SearchComponent('searchInput', 'searchResults');
```

---

## 🎯 Practice Challenges

### Challenge 1: Shopping Cart
Build a shopping cart with:
- Add/remove items
- Update quantities
- Calculate subtotal, tax, total
- Apply discount codes
- localStorage persistence

### Challenge 2: Image Gallery with Lazy Loading
- Load images only when visible
- Lightbox on click
- Keyboard navigation
- Responsive grid

### Challenge 3: Form Builder
- Drag & drop form fields
- Preview mode
- Generate JSON schema
- Export/Import forms

### Challenge 4: Real-time Chat UI (Frontend  only)
- Message list with auto-scroll
- Typing indicator
- Online status
- Emoji picker

---

## 📚 Complete Reference Summary

**Variables:** const (default), let (reassign), avoid var  
**Functions:** Arrow functions, async/await  
**Arrays:** map, filter, reduce, find, some, every  
**Objects:** Spread (...), destructuring, Object.keys/values/entries  
**DOM:** querySelector, addEventListener, classList  
**Async:** async/await > Promises > Callbacks  
**Modern:** ES6+ modules, classes, template literals  

---

**🎉 Congratulations!** You now have complete JavaScript knowledge from basics to industry-level coding!

**Next Steps:**
1. Practice these examples
2. Build the challenge projects
3. Read other people's code on GitHub
4. Contribute to open source

**All the best with your JavaScript journey! 🚀**
