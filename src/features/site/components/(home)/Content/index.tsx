"use client";

import Image from "next/image";

import { ChatTextarea } from "@/features/site/components/(home)/Content/input";

export const Content = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-sora">
            Turn Ideas Into
            <span className="text-primary block">Diagrams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Describe your process, system, or concept in plain English, and
            watch as AI transforms it into a professional diagram instantly.
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">built with</p>
            <Image src="/built_with_bolt.png" alt="beta" width={100} height={100} />
          </div>
          <div className="inline-block bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-400/30 text-yellow-600 text-sm font-medium">
            we are in beta stage
          </div>
        </div>

        {/* Input Section */}
        <ChatTextarea />
      </div>
    </main>
  );
};
