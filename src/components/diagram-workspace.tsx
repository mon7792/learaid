"use client";

import dynamic from "next/dynamic";
import { Loader2, DraftingCompass } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { useHydratedStore } from "@/store";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { UserProfile } from "@/features/auth/components/UserProfile";
import { Chat } from "@/features/diagram/components/Chat";

import "@excalidraw/excalidraw/index.css";

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
  csrfToken?: string;
}

export default function DiagramWorkspace({ diagramId, csrfToken }: DiagramWorkspaceProps) {
  const { setCurrentDiagramId, isHydrated, setCsrfToken } = useHydratedStore();

  useEffect(() => {
    if (csrfToken) {
      setCsrfToken(csrfToken);
    }
  }, [csrfToken, setCsrfToken]);

  useEffect(() => {
    // Only initialize when the store is hydrated
    if (isHydrated) {
      console.log("Initializing diagram with ID:", diagramId);
      // Set the current diagram ID
      setCurrentDiagramId(diagramId);
    }
  }, [diagramId, setCurrentDiagramId, isHydrated]);

  // Show loading state while store is hydrating
  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading diagram workspace...</p>
        </div>
      </div>
    );
  }

  return <DiagramSection />;
}

const DiagramSection = () => {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <DraftingCompass className="w-4 h-4 text-primary-foreground rotate-180" />
            </div>
            <span className="font-semibold text-2xl font-sora">Vanita</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <UserProfile />
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
};
