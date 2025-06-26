'use client';

import { useState, useEffect } from 'react';
import { PanelLeft, Plus, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useSession } from '@/lib/auth-client';
import { useHydratedStore } from '@/store';
import { useListDiagrams } from '@/features/diagram/api/query';
import { useCreateNewDiagram } from '@/features/diagram/api/mutation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { setCurrentDiagramId, setMermaid, diagrams, setDiagrams } = useHydratedStore();
  
  const { data: diagramData } = useListDiagrams();
  
  const { mutate: createNewDiagram, isPending: isCreatingNewDiagram } =
    useCreateNewDiagram(
      (data) => {
        toast.success("New diagram created");
        setCurrentDiagramId(data.id);
        setMermaid(null);
        setDiagrams([
          ...diagrams,
          {
            id: data.id,
            name: data.title,
            messages: [],
          },
        ]);
        router.push(`/diagram/${data.id}`);
      },
      (error) => {
        console.error("Error creating new diagram", error);
        toast.error("Error creating new diagram");
      }
    );

  const handleCreateNewDiagram = () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }
    createNewDiagram("create a diagram");
  };

  const handleDiagramClick = (diagramId: string) => {
    setCurrentDiagramId(diagramId);
    const mermaid = diagrams
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
          // On mobile: hide completely when collapsed, show full width when open
          // On desktop: show narrow when collapsed, show full width when open
          isOpen 
            ? "w-80 md:w-64 translate-x-0" 
            : "w-16 -translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isOpen ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="md:hidden"
              >
                <PanelLeft className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={handleCreateNewDiagram}
                disabled={isCreatingNewDiagram}
                className="flex-1 md:flex-none ml-2 md:ml-0"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Diagram
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
              
              {/* New Diagram Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCreateNewDiagram}
                disabled={isCreatingNewDiagram}
                className="w-8 h-8 hover:bg-muted"
                title="New Diagram"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Diagrams List */}
        <div className="flex-1 overflow-y-auto p-2">
          {isOpen ? (
            <div className="space-y-1">
              {diagramData?.items && diagramData.items.length > 0 ? (
                diagramData.items.map((diagram) => (
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
                        {diagram.title || 'Untitled Diagram'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Diagram • {diagram.id.slice(0, 8)}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              ) : (
                <div className="text-center py-8 px-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">No diagrams yet</p>
                  <p className="text-xs text-muted-foreground">
                    Create your first diagram to get started
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Collapsed view - show only icons
            <div className="space-y-2 flex flex-col items-center">
              {diagramData?.items && diagramData.items.length > 0 ? (
                diagramData.items.slice(0, 8).map((diagram) => (
                  <button
                    key={diagram.id}
                    onClick={() => handleDiagramClick(diagram.id)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
                      "hover:bg-muted/50 group"
                    )}
                    title={diagram.title || 'Untitled Diagram'}
                  >
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))
              ) : (
                <div className="w-8 h-8 flex items-center justify-center" title="No diagrams">
                  <MessageSquare className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Section */}
        <div className="border-t border-border p-4">
          {isOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {session.user.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="flex-1"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="flex-1"
                >
                  <Link href="/pricing">Upgrade</Link>
                </Button>
              </div>
            </>
          ) : (
            // Collapsed user section - just avatar
            <div className="flex justify-center">
              <Link href="/dashboard">
                <div 
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
                  title={session.user.name || 'User Profile'}
                >
                  <span className="text-sm font-medium text-primary-foreground">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}