import { Home, Search, HelpCircle, DraftingCompass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <DraftingCompass className="w-5 h-5 text-primary-foreground rotate-180" />
          </div>
          <span className="text-2xl font-bold font-sora">Vanita</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* 404 Illustration */}
          <div className="relative">
            <div className="text-8xl md:text-9xl font-bold text-primary/20 font-sora">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-primary/60" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sora">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off
              into the digital void. Let&apos;s get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cursor-pointer">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span>Popular Pages</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition-colors">
                        Dashboard
                      </div>
                      <div className="text-xs text-muted-foreground">
                        View your saved diagrams
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        €
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition-colors">
                        Pricing
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Get more tokens for diagrams
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">
              Still can&apos;t find what you&apos;re looking for?
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link
                href="/support"
                className="text-primary hover:underline transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-primary hover:underline transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
