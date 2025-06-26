"use client";

import { useState } from "react";

import { Sidebar } from "@/components/sidebar";

import { Header } from "@/features/site/components/(home)/Header";
import { Footer } from "@/features/site/components/(home)/Footer";
import { Content } from "@/features/site/components/(home)/Content";

export default function Home() {

  // TODO: move this to the store
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}