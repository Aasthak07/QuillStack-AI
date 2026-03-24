"use client";

import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen w-full">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
