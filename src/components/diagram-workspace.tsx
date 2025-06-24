"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { ThemeModeSwitcher } from "@/components/theme-toggle";
import "@excalidraw/excalidraw/index.css";

import dynamic from "next/dynamic";
import { Chat } from "@/features/diagram/components/Chat";

// Dynamically import Excalidraw to avoid SSR issues
const ExcalidrawWrapper = dynamic(
  () => import("@/components/excalidraw-wrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading diagram editor...</p>
        </div>
      </div>
    ),
  }
);

interface DiagramWorkspaceProps {
  diagramId: string;
}

export default function DiagramWorkspace({ diagramId }: DiagramWorkspaceProps) {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Learaid</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Diagram #{diagramId}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
          <ThemeModeSwitcher />
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Chat />
        </div>
        <div className="flex-1 relative">
          <ExcalidrawWrapper />
        </div>
      </main>
    </>
  );
}
