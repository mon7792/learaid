"use client";

import { ChatTextarea } from "./input";

export const Content = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Turn Ideas Into
            <span className="text-primary block">Visual Diagrams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Describe your process, system, or concept in plain English, and
            watch as AI transforms it into a professional diagram instantly.
          </p>
        </div>

        {/* Input Section */}
        <ChatTextarea />
      </div>
    </main>
  );
};