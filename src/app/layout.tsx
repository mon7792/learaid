import { Suspense } from "react";
import { Metadata } from "next";
import { Geist, Geist_Mono, Sora, Source_Code_Pro } from "next/font/google";

import { ThemeProvider } from "@/contexts/theme-context";
import { TanstackProvider } from "@/provider/tanstack";

import { Toaster } from "@/components/ui/sonner"

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const fontSourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Vanita",
  description: "Your AI-powered learning assistant for complex subjects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fontSora.variable} ${fontSourceCodePro.variable}`} suppressHydrationWarning>
      <body className="font-source-code-pro">
        <ThemeProvider>
          <TanstackProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}