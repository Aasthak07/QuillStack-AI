import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0B0F1C] text-[#EAEAEA] antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen w-full selection:bg-[#8A4FFF]/30 selection:text-white">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
