"use client";

import dynamic from "next/dynamic";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { useHydratedStore } from "@/store";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { UserProfile } from "@/features/auth/components/UserProfile";
import { Chat } from "@/features/diagram/components/Chat";
import { useListMessages } from "@/features/diagram/api/query";

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
}

export default function DiagramWorkspace({ diagramId }: DiagramWorkspaceProps) {
  // this temporary solution to set the diagram id in the store
  const {
    data: diagramData,
    isLoading: isLoadingDiagram,
    refetch: refetchDiagram,
  } = useListMessages(diagramId, false);
  const { setCurrentDiagramId, setDiagrams, isHydrated, diagrams } =
    useHydratedStore();

  const diagramTitle = useMemo(
    () => diagrams.find((d) => d.id === diagramId)?.name ?? "",
    [diagrams, diagramId]
  );

  useEffect(() => {
    // Only initialize when the store is hydrated
    if (isHydrated) {
      console.log("Initializing diagram with ID:", diagramId);
      // Set the current diagram ID
      setCurrentDiagramId(diagramId);

      // check if the diagram exists
      const diagramExists = diagrams.some((d) => d.id === diagramId);
      if (!diagramExists) {
        refetchDiagram();
      }
    }
  }, [diagramId, setCurrentDiagramId, isHydrated, refetchDiagram, diagrams]);

  useEffect(() => {
    if (diagramData) {
      setDiagrams((currentDiagrams) => {
        const diagramExists = currentDiagrams.some((d) => d.id === diagramId);
        if (!diagramExists) {
          return [
            ...currentDiagrams,
            {
              id: diagramId,
              name: diagramData.title,
              messages: diagramData.messages || [],
            },
          ];
        } else {
          return currentDiagrams.map((d) => {
            if (d.id === diagramId) {
              return {
                ...d,
                name: diagramData.title,
                messages: diagramData.messages || [],
              };
            }
            return d;
          });
        }
      });
    }
  }, [diagramData, setDiagrams, diagramId]);

  // Show loading state while store is hydrating
  if (!isHydrated || isLoadingDiagram) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading diagram workspace...</p>
        </div>
      </div>
    );
  }

  return <DiagramSection title={diagramTitle} />;
}

type DiagramSectionProps = {
  title: string;
};

const DiagramSection = ({ title }: DiagramSectionProps) => {
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
          <div className="text-sm text-muted-foreground">Diagram: {title}</div>
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
