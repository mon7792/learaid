"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

export const Github = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({ provider: "github", callbackURL: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className="w-full h-12 text-base font-medium group relative overflow-hidden"
      size="lg"
      disabled={loading}
    >
      <div className="relative flex items-center justify-center gap-3">
        <Image src="/github.svg" alt="GitHub" width={20} height={20} />
        <span>Continue with GitHub</span>
        {loading ? (
          <Loader2 className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        ) : (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </div>
    </Button>
  );
};
