"use client";

import { useState } from "react";

import { Header } from "@/features/site/components/(home)/Header";
import { Footer } from "@/features/site/components/(home)/Footer";
import { Content } from "@/features/site/components/(home)/Content";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Header onSidebarToggle={toggleSidebar} />
        <Content />
        <Footer />
      </div>
    </div>
  );
}