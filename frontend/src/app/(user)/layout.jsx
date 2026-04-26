"use client";

import Navbar from "../../../components/Navbar.jsx";
import Footer from "../../../components/Footer.jsx";
import FloatingBackground from "../../../components/FloatingBackground.jsx";

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