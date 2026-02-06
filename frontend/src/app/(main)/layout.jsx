"use client";

import { AuthProvider } from "@/context/AuthContext";
// import "./globals.css";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
    return (
        <AuthProvider>
            <Navbar />
            <main>{children}</main>
        </AuthProvider>
    );
}