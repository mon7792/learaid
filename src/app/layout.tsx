import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { Suspense } from "react";
import { Metadata } from "next";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Learaid",
  description: "Your AI-powered learning assistant for complex subjects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}