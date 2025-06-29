import { Heart, Coffee, Target } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/features/site/components/(home)/Header";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-16">
          {/* Vision Section */}
          <section className="text-center space-y-8 mt-10">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sora">
                Next Steps
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Building a architecture base in the age of Agentic Coding.
              </p>
            </div>
          </section>

          {/* Support Section */}
          <section className="text-center space-y-8 mt-24">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sora">
                Support Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Help us build the future of Agentic Architecture. Every contribution, no matter how small.
              </p>
            </div>

            {/* Support Cards */}
            <div className="flex justify-center">
              {/* Buy Me a Coffee Card */}
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">Buy Me a Coffee</CardTitle>
                  <p className="text-muted-foreground">
                    Fuel our development with your support
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your contributions help us:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>Cover development and hosting costs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>Add new diagram types and features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>Improve AI model capabilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>Keep the service affordable for everyone</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Buy Me a Coffee Button */}
                  <div className="pt-4">
                    <Button asChild className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white">
                      <Link 
                        href="https://buymeacoffee.com/monishkadam" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <Coffee className="w-5 h-5" />
                        Buy Me a Coffee
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center pt-16 border-t mt-16">
          <p className="text-sm text-muted-foreground">
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}