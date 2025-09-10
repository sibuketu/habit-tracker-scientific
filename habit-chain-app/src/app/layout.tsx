import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/layout/BottomNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IF-THEN Habit Chain",
  description: "習慣化をゲーム感覚で支援するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative">
          {/* Main Content */}
          <main className="pb-20">
            {children}
          </main>
          
          {/* Bottom Navigation - Always visible and fixed */}
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
