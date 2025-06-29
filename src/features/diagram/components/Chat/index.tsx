"use client";

import { Radius } from "lucide-react";

import { ChatInput } from "@/features/diagram/components/Chat/input";
import { ChatContent } from "@/features/diagram/components/Chat/content";
import { BuyTokenDialog } from "@/components/buy-tokens-dialog";

export const Chat = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="font-semibold text-lg font-sora">
          <Radius className="inline mr-2" />
          Vee
        </h2>
        <p className="text-sm text-muted-foreground">
          Describe your idea and I&apos;ll draw it for you
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <ChatContent />
      </div>
      <div className="border-t p-4 flex-shrink-0 bg-background">
        <ChatInput />
      </div>
      <BuyTokenDialog />
    </div>
  );
};
