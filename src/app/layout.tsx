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
    default: "Croi - Copilot for technical diagrams",
    template: "%s | Croi"
  },
  description: "Copilot for technical diagrams. Transform plain English descriptions into stunning, interactive diagrams in seconds. Whether you're a developer visualizing system architectures, Sequence Diagram, or an product Manager illustrating concepts with flowcharts, Croi makes it effortless.",
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
  authors: [{ name: "Croi Team" }],
  creator: "Croi",
  publisher: "Croi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://croi.store"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Croi - Copilot for technical diagrams",
    description: "Copilot for technical diagrams. Transform plain English descriptions into stunning, interactive diagrams in seconds. Whether you're a developer visualizing system architectures, Sequence Diagram, or an product Manager illustrating concepts with flowcharts, Croi makes it effortless.",
    siteName: "Croi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Croi - Copilot for technical diagrams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Croi - Copilot for technical diagrams",
    description: "Copilot for technical diagrams. Transform plain English descriptions into stunning, interactive diagrams in seconds. Whether you're a developer visualizing system architectures, Sequence Diagram, or an product Manager illustrating concepts with flowcharts, Croi makes it effortless.",
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