"use client";

export default function AdminLayout({ children }) {
    return (
        <div className="flex-1 w-full flex flex-col bg-[#0B0F1C]">
            {children}
        </div>
    );
}
