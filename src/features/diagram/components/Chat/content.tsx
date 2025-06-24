"use client";

import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Sparkles, User, Bot } from "lucide-react";

import { useStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";

// Memoized empty state component
const EmptyState = memo(() => (
  <div className="text-center py-8">
    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
      <Sparkles className="w-6 h-6 text-muted-foreground" />
    </div>
    <p className="text-sm text-muted-foreground">
      Start a conversation to generate your diagram
    </p>
  </div>
));

EmptyState.displayName = "EmptyState";

// Memoized avatar component
const Avatar = memo<{ role: "user" | "ai" }>(({ role }) => {
  const isUser = role === "user";
  const Icon = isUser ? User : Bot;
  const bgClass = isUser ? "bg-secondary" : "bg-primary";
  
  return (
    <div className={`w-8 h-8 ${bgClass} rounded-full flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-4 h-4" />
    </div>
  );
});

Avatar.displayName = "Avatar";

// Memoized mermaid code block component
const MermaidCodeBlock = memo<{ mermaid: string }>(({ mermaid }) => (
  <div className="mt-2 p-2 bg-background/10 rounded text-xs font-mono overflow-x-auto">
    <pre className="whitespace-pre-wrap">{mermaid}</pre>
  </div>
));

MermaidCodeBlock.displayName = "MermaidCodeBlock";

// Memoized individual message component
const MessageItem = memo<{ message: ChatMessage }>(({ message }) => {
  const isUser = message.role === "user";
  
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  const messageClasses = useMemo(() => {
    const baseClasses = "p-3 rounded-lg";
    return isUser 
      ? `${baseClasses} bg-primary text-primary-foreground ml-auto`
      : `${baseClasses} bg-muted`;
  }, [isUser]);

  const containerClasses = useMemo(() => {
    return `flex gap-3 ${isUser ? "justify-end" : "justify-start"}`;
  }, [isUser]);

  const contentClasses = useMemo(() => {
    return `max-w-[70%] ${isUser ? "order-first" : ""}`;
  }, [isUser]);

  const timeClasses = useMemo(() => {
    return `text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`;
  }, [isUser]);

  return (
    <div className={containerClasses}>
      {!isUser && <Avatar role="ai" />}
      
      <div className={contentClasses}>
        <div className={messageClasses}>
          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          {message.mermaid && <MermaidCodeBlock mermaid={message.mermaid} />}
        </div>
        <div className={timeClasses}>
          {formatTime(message.timestamp)}
        </div>
      </div>

      {isUser && <Avatar role="user" />}
    </div>
  );
});

MessageItem.displayName = "MessageItem";

export const ChatContent = () => {
  const { messages } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Optimized scroll effect with useCallback
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Memoized messages list to prevent unnecessary re-renders
  const messagesList = useMemo(() => {
    return messages.map((message: ChatMessage) => (
      <MessageItem key={message.id} message={message} />
    ));
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {messagesList}
      <div ref={messagesEndRef} />
    </div>
  );
};
