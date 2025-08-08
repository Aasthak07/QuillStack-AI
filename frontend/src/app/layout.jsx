"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for authentication token and decode user info
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    if (token) {
      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          email: payload.email,
          name: payload.name || payload.email, // Use name or fallback to email
          initials: getInitials(payload.name || payload.email)
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("userToken");
      }
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <html lang="en">
      <body>
        <Navbar user={user} onLogout={handleLogout} />
        {children}
      </body>
    </html>
  );
}
