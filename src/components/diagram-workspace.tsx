'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';

// Dynamically import Excalidraw to avoid SSR issues
const ExcalidrawWrapper = dynamic(
  () => import('@/components/excalidraw-wrapper'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading diagram editor...</p>
        </div>
      </div>
    )
  }
);

interface DiagramWorkspaceProps {
  diagramId: string;
  initialPrompt: string;
}

export default function DiagramWorkspace({ diagramId, initialPrompt }: DiagramWorkspaceProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [error, setError] = useState('');

  // Generate diagram when component mounts with initial prompt
  useEffect(() => {
    if (initialPrompt.trim()) {
      generateDiagram(initialPrompt);
    }
  }, [initialPrompt]);

  const generateDiagram = async (promptText: string) => {
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate diagram');
      }

      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating diagram:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const debouncedGenerate = useDebouncedCallback(generateDiagram, 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateDiagram(prompt);
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    if (value.trim()) {
      debouncedGenerate(value);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Chat Sidebar */}
        <div className="w-80 border-r bg-background flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-2">Describe Your Diagram</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  value={prompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  placeholder="Describe the diagram you want to create..."
                  className="pr-10"
                  disabled={isGenerating}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Status and Messages */}
          <div className="flex-1 p-4 space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {isGenerating && (
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Generating diagram...</p>
                </div>
              </div>
            )}

            {mermaidCode && !isGenerating && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Generated Diagram</h3>
                <div className="p-3 bg-muted/30 rounded-md">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                    {mermaidCode}
                  </pre>
                </div>
              </div>
            )}

            {!mermaidCode && !isGenerating && !error && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a prompt to start generating your diagram
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Excalidraw Canvas */}
        <div className="flex-1 relative">
          <ExcalidrawWrapper mermaidCode={mermaidCode} />
        </div>
      </div>
    </>
  );
}</parameter>