"use client";

import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import {  User, Bot, Play, Loader2, DraftingCompass } from "lucide-react";

import { useHydratedStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";
import { useInfiniteListMessages } from "@/features/diagram/api/query";

import { Button } from "@/components/ui/button";

// Memoized empty state component
const EmptyState = memo(() => (
  <div className="text-center py-8">
    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
      <DraftingCompass className="w-6 h-6 text-muted-foreground rotate-180" />
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
    <div
      className={`w-8 h-8 ${bgClass} rounded-full flex items-center justify-center flex-shrink-0`}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
});

Avatar.displayName = "Avatar";

// Memoized mermaid code block component
const MermaidCodeBlock = memo<{
  mermaid: string;
  updateMermaid: (mermaid: string) => void;
}>(({ mermaid, updateMermaid }) => (
  <div className="flex flex-col gap-2">
    <div className="mt-2 p-2 bg-background/10 rounded text-xs font-mono overflow-x-auto border-2">
      <pre className="whitespace-pre-wrap">{mermaid}</pre>
    </div>
    <div className="flex justify-end">
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => updateMermaid(mermaid)}
      >
        <Play className="w-4 h-4" />
      </Button>
    </div>
  </div>
));

MermaidCodeBlock.displayName = "MermaidCodeBlock";

// Memoized individual message component
const MessageItem = memo<{ message: ChatMessage }>(({ message }) => {
  const { setMermaid } = useHydratedStore();
  const isUser = message.role === "user";

  const formatTime = useCallback((date: Date | string) => {
    // Ensure we have a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const updateMermaid = useCallback(
    (mermaid: string) => {
      console.log("update mermaid", mermaid);
      setMermaid(mermaid);
    },
    [setMermaid]
  );

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
    return `text-xs text-muted-foreground mt-1 ${
      isUser ? "text-right" : "text-left"
    }`;
  }, [isUser]);

  return (
    <div className={containerClasses}>
      {!isUser && <Avatar role="ai" />}

      <div className={contentClasses}>
        <div className={messageClasses}>
          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          {message.mermaid && (
            <MermaidCodeBlock
              mermaid={message.mermaid}
              updateMermaid={updateMermaid}
            />
          )}
        </div>
        <div className={timeClasses}>{formatTime(message.timestamp)}</div>
      </div>

      {isUser && <Avatar role="user" />}
    </div>
  );
});

MessageItem.displayName = "MessageItem";

export const ChatContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHeightRef = useRef<number>(0);
  const { id } = useHydratedStore();

  const {
    data: messagesData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteListMessages(id || "", !!id);

  // Flatten all pages into a single array of messages
  const messages = useMemo(() => {
    if (!messagesData?.pages) return [];

    const allMessages = messagesData.pages
      .flatMap((page) => page.messages || [])
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        
        // First sort by timestamp (newest first)
        if (timeA !== timeB) {
          return timeB - timeA;
        }
        
        // If timestamps are the same, ensure user messages come first
        if (a.role === "user" && b.role === "ai") {
          return -1; // User message first
        }
        if (a.role === "ai" && b.role === "user") {
          return 1; // User message first
        }
        
        return 0; // Same role, maintain order
      });
    return allMessages;
  }, [messagesData]);

  // Optimized scroll effect with useCallback
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // Preserve scroll position when loading older messages
  useEffect(() => {
    if (isFetchingNextPage || !containerRef.current) return;

    const container = containerRef.current;
    const newScrollHeight = container.scrollHeight;
    const oldScrollHeight = scrollHeightRef.current;

    if (oldScrollHeight > 0 && newScrollHeight > oldScrollHeight) {
      // Calculate the difference in scroll height and adjust scroll position
      const scrollDiff = newScrollHeight - oldScrollHeight;
      container.scrollTop = scrollDiff;
    }
  }, [messages, isFetchingNextPage]);

  // Scroll to top when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      scrollToTop();
    }
  }, [messages.length, scrollToTop]);

  // Memoized messages list to prevent unnecessary re-renders
  const messagesList = useMemo(() => {
    return messages.map((message: ChatMessage) => (
      <MessageItem key={message.id} message={message} />
    ));
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-destructive">Error loading messages</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div ref={containerRef}>
      {/* Loading indicator at top */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      {hasNextPage && (
          <Button 
            onClick={() => {
              console.log("Manual fetch triggered");
              fetchNextPage();
            }}
            variant="outline"
            className="flex w-1/2 max-w-xs rounded justify-self-center my-2 text-muted-foreground cursor-pointer"
          >
            Load More
          </Button>
        )}

      {messagesList}
    </div>
  );
};
