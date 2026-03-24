"use client";

import { AuthProvider } from "@/context/AuthContext";
// import "./globals.css";

export default function MainLayout({ children }) {
    return (
        <AuthProvider>
            <div className="w-full">{children}</div>
        </AuthProvider>
    );
}