"use client";

import { useHydratedStore } from "@/store";
import { useSession } from "@/lib/auth-client";

import { Sidebar } from "@/components/sidebar";

import { Header } from "@/features/site/components/(home)/Header";
import { Footer } from "@/features/site/components/(home)/Footer";
import { Content } from "@/features/site/components/(home)/Content";

export default function Home() {
  const { data: session } = useSession();
  const { isSidebarOpen } = useHydratedStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {session && (
        <Sidebar />
      )}
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}