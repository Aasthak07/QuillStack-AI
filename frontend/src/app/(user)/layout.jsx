"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBackground from "@/components/FloatingBackground";

export default function UserLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
            <FloatingBackground />
            <Navbar />
            <div className="flex-1 w-full flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
}