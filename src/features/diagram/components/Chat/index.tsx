"use client";

import { ChatInput } from "@/features/diagram/components/Chat/input";
import { ChatContent } from "@/features/diagram/components/Chat/content";
import { BuyTokenDialog } from "@/components/buy-tokens-dialog";

export const Chat = () => {
  return (
    <>
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="font-semibold">Lea</h2>
        <p className="text-sm text-muted-foreground">
          Describe your diagram and I&apos;ll create it for you
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <ChatContent />
      </div>
      <div className="border-t p-4 flex-shrink-0">
        <ChatInput />
      </div>
      <BuyTokenDialog />
    </>
  );
};
