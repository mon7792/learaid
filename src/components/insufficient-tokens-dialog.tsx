"use client";

import { AlertTriangle, Coins } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InsufficientTokensDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTokens?: number;
}

export function InsufficientTokensDialog({
  open,
  onOpenChange,
  currentTokens = 0,
}: InsufficientTokensDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">
                Insufficient Tokens
              </AlertDialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Coins className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Current balance: {currentTokens.toLocaleString()} tokens
                </span>
              </div>
            </div>
          </div>
          <AlertDialogDescription className="text-left">
            You don't have enough tokens to generate a diagram. Please refill
            your token balance to continue creating amazing diagrams with AI.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-muted/50 rounded-lg p-4 my-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Generate unlimited diagrams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No daily limits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Priority AI processing</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/buy" className="bg-primary hover:bg-primary/90">
              Buy Tokens
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}