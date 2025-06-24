'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, Home, Loader2, User, Bot } from 'lucide-react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { ThemeModeSwitcher } from '@/components/theme-toggle';
import "@excalidraw/excalidraw/index.css";

import dynamic from "next/dynamic";

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

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mermaidCode?: string;
  isGenerating?: boolean;
}

interface DiagramWorkspaceProps {
  diagramId: string;
  initialPrompt: string;
}

export default function DiagramWorkspace({ diagramId, initialPrompt }: DiagramWorkspaceProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate diagram when component mounts with initial prompt
  useEffect(() => {
    if (initialPrompt.trim()) {
      addUserMessage(initialPrompt);
      generateDiagram(initialPrompt);
    }
  }, [initialPrompt]);

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addAssistantMessage = (content: string, mermaidCode?: string) => {
    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      mermaidCode,
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const addGeneratingMessage = () => {
    const generatingMessage: ChatMessage = {
      id: 'generating',
      role: 'assistant',
      content: 'Generating your diagram...',
      timestamp: new Date(),
      isGenerating: true,
    };
    setMessages(prev => [...prev, generatingMessage]);
  };

  const removeGeneratingMessage = () => {
    setMessages(prev => prev.filter(msg => msg.id !== 'generating'));
  };

  const generateDiagram = async (promptText: string) => {
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setError('');
    addGeneratingMessage();

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

      console.log("data", data.mermaidCode);

      setMermaidCode(data.mermaidCode);
      removeGeneratingMessage();
      addAssistantMessage(
        `I've created a diagram based on your request: "${promptText}". The diagram has been generated and displayed in the canvas.`,
        data.mermaidCode
      );
    } catch (err) {
      removeGeneratingMessage();
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      addAssistantMessage(`Sorry, I encountered an error: ${errorMessage}`);
      console.error('Error generating diagram:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    addUserMessage(prompt);
    generateDiagram(prompt);
    setPrompt('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          <ThemeModeSwitcher />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar with Fixed Height */}
        <div className="w-80 border-r bg-background flex flex-col h-full">
          {/* Chat Header - Fixed Height */}
          <div className="p-4 border-b flex-shrink-0">
            <h2 className="font-semibold">Diagram Assistant</h2>
            <p className="text-sm text-muted-foreground">Describe your diagram and I'll create it for you</p>
          </div>

          {/* Messages Area - Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Start a conversation to generate your diagram
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    {message.isGenerating ? (
                      <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.mermaidCode && (
                      <div className="mt-2 p-2 bg-background/10 rounded text-xs font-mono overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{message.mermaidCode}</pre>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs text-muted-foreground mt-1 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area at Bottom - Fixed Height */}
          <div className="border-t p-4 flex-shrink-0">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the diagram you want to create..."
                  className="pr-12"
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
              <p className="text-xs text-muted-foreground">
                Press Enter to send or click the send button
              </p>
            </form>
          </div>
        </div>

        {/* Excalidraw Canvas */}
        <div className="flex-1 relative">
          <ExcalidrawWrapper mermaidCode={mermaidCode} />
        </div>
      </div>
    </>
  );
}