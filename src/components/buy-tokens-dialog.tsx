"use client";

import { AlertTriangle, BadgeEuro, Coins } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useHydratedStore } from "@/store";


export const BuyTokenDialog = () => {
  const { buyDialogOpen, setBuyDialogOpen, tokens } = useHydratedStore();

  return (
    <AlertDialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
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
                  Current balance: {tokens?.toLocaleString()} tokens
                </span>
              </div>
            </div>
          </div>
          <AlertDialogDescription className="text-left">
            You don&apos;t have enough tokens to generate a diagram. Please refill
            your token balance to continue creating amazing diagrams with AI.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer border-border">Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/buy">
              <Button className="cursor-pointer">
                <BadgeEuro className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wide">BUY</span>
              </Button>
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}