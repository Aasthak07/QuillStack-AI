# 🛡️ QuillStack AI Security Guide: Authentication & Passwords

---

## 🎓 Academic Rationale: Why this is for a Major Project
Implementing `bcryptjs` for password security is a crucial requirement for any **College Major Project**. It demonstrates to your examiners that you have moved beyond simple "CRUD" operations and are applying **Industry Best Practices**.

### Why it secures your Marks:
- **Professional Standard**: Most external examiners check for "Plain Text Security" during the project viva. Using hashing proves you understand data privacy.
- **Project Maturity**: It separates a "Basic Project" from a "Professional Full-Stack Application."
- **Learning Outcomes**: It fulfills core requirements for learning and implementing "Security in Distributed Systems."

---

## 1. What is Password Hashing?
When a user signs up, we no longer store their actual password (e.g., `MyPassword123`) in the database. Instead, we use a library called **`bcryptjs`** to transform that password into a "Hash"—a long, scrambled string of characters that looks like this:
`$2a$10$vI8A7Wn8G.Kz8eO2lW1p.O3Qp5Y6...`

### Key Properties:
-   **One-Way**: You can turn a password into a hash, but you **cannot** turn a hash back into a password.
-   **Salted**: Even if two users have the exact same password, they will have different hashes, preventing hackers from using "Rainbow Tables" to guess them.

---

## 2. Why is this Necessary?
### 🛑 The Danger of Plain-Text
If your database is ever leaked or accessed by an unauthorized person, and you store passwords as plain-text, **every single user's account is instantly compromised.** Not only on your site, but likely on other sites where they reuse the same password.

### ✅ The Security of Hashing
With hashing, even if a hacker steals your entire database, they only have the scrambled hashes. They cannot log in as your users because the login system requires the *original* password to compare against the hash.

---

## 3. How to Manage Admin Access
Since you can no longer "see" the password in MongoDB Compass, here is how you manage your "preferences" or administrative access:

### A. Promoting a User to Admin
1.  Open **MongoDB Compass**.
2.  Find the user in the `users` collection.
3.  Change the `isAdmin` field from `false` to `true`.
4.  **Save.** The user now has full admin dashboard access.

### B. Creating an Admin "Master" Account
I have provided a special script located at `backend/scripts/create-admin.js`. If you need to create a new admin or reset a password without using the UI, run this command in your terminal:

```bash
# Navigate to the backend folder
cd backend

# Run the admin creator (Replace with your desired email and password)
node scripts/create-admin.js admin@quillstack.ai MySecurePassword123
```

---

## 4. Resetting a Forgotten Password
If you forget your own password and cannot log in:
1.  **Delete** the user document from MongoDB.
2.  **Re-register** using the signup form OR use the `create-admin.js` script above.
3.  Set `isAdmin: true` in Compass for the newly created account.

---

> [!IMPORTANT]
> **Production Standard**: This system is the industry standard used by companies like Google, Meta, and Amazon. It ensures that your users' data is safe and your project is professionally architected.
