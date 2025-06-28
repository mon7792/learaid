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
  title: {
    default: "Vanita - AI-Powered Diagram Generator",
    template: "%s | Vanita"
  },
  description: "Create beautiful diagrams instantly with AI. Generate flowcharts, mind maps, and technical diagrams using natural language. Free to start, powerful to scale.",
  keywords: [
    "AI diagram generator",
    "flowchart maker",
    "mind map creator",
    "technical diagrams",
    "visual diagrams",
    "AI-powered tools",
    "diagram software",
    "collaborative diagrams"
  ],
  authors: [{ name: "Vanita Team" }],
  creator: "Vanita",
  publisher: "Vanita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vanita.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Vanita - AI-Powered Diagram Generator",
    description: "Create beautiful diagrams instantly with AI. Generate flowcharts, mind maps, and technical diagrams using natural language.",
    siteName: "Vanita",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vanita - AI-Powered Diagram Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanita - AI-Powered Diagram Generator",
    description: "Create beautiful diagrams instantly with AI. Generate flowcharts, mind maps, and technical diagrams using natural language.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
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