"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UserLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex-1 w-full flex flex-col">
                {children}
            </div>
            <Footer />
        </>
    );
}