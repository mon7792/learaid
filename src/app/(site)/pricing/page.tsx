"use client";

import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/features/site/components/(app)/Header";
import { Footer } from "@/features/site/components/(home)/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Load Tokens
              <span className="text-primary block"></span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start creating professional diagrams with AI.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">499 Plan</CardTitle>
                <CardDescription>
                  Perfect for your diagraming needs and more
                </CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">€4.99</span>
                  <span className="text-muted-foreground">/ 50000 tokens</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      AI-powered diagram generation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      Interactive Excalidraw editor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Export to multiple formats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Cloud storage</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Simple and transparent pricing. No hidden fees. all the tokens
                  you buy are yours to use.
                  <br />
                  tokens are valid for 1 year.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-sm text-muted-foreground">
              we are experimenting with pricing. if you have any feedback,
              please let us know.
            </p>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
