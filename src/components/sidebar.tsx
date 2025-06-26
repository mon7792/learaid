"use client";

import { PanelLeft, MessageSquare, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import { useHydratedStore } from "@/store";
import { useListDiagrams } from "@/features/diagram/api/query";
import { UserProfile } from "@/features/auth/components/UserProfile";
import { UserProfileFooter } from "@/features/auth/components/UserProfile/footer";
import { NewDiagram } from "@/features/diagram/components/New";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { setCurrentDiagramId, setMermaid, diagrams } = useHydratedStore();

  const { data: diagramData } = useListDiagrams();

  const handleDiagramClick = (diagramId: string) => {
    setCurrentDiagramId(diagramId);
    const mermaid =
      diagrams
        .find((d) => d.id === diagramId)
        ?.messages.filter((m) => m.role === "ai")[0]?.mermaid ?? null;
    setMermaid(mermaid);
    router.push(`/diagram/${diagramId}`);
  };

  // Don't render sidebar if user is not authenticated
  if (!session) {
    return null;
  }

  return (
    <>
      {/* Overlay - only on mobile when expanded */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-background border-r border-border transition-all duration-300 ease-in-out",
          "flex flex-col",
          isOpen
            ? "w-80 md:w-64 translate-x-0"
            : "w-16 -translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isOpen ? (
            <>
              {/* Logo */}
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className=""
              >
                <PanelLeft className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center w-full">
              {/* Logo */}
              <button
                onClick={onToggle}
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-3 hover:bg-primary/90 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* new diagram */}
        <div className="flex items-center justify-between p-3.5 border-border">
          {isOpen ? <NewDiagram variant="outline" /> : <NewDiagram variant="icon" />}
        </div>

        {/* Diagrams List */}
        <div className="flex-1 overflow-y-auto p-2">
          {isOpen && (
            <>
              <div className="space-y-1">
                {diagramData?.items.slice(0, 4).map((diagram) => (
                  <button
                    key={diagram.id}
                    onClick={() => handleDiagramClick(diagram.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                      "hover:bg-muted/50 group"
                    )}
                  >
                    <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {diagram.title || "Untitled Diagram"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Diagram • {diagram.id.slice(0, 8)}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              <div className="space-y-1 text-center mt-2">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 border-1 tracking-light cursor-pointer"
                  >
                    view more
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* dashboard */}
        {/* User Section */}
        <div className="border-t border-border p-4">
          {isOpen ? (
            <UserProfileFooter />
          ) : (
            // Collapsed user section - just avatar
            <div className="flex justify-center">
              <UserProfile />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
