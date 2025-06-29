import { Sparkles, Heart, Coffee, Target, Users, Rocket, Globe, Github, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center border-b bg-background/95 backdrop-blur">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold font-sora">Vanita</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-16">
          {/* Vision Section */}
          <section className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sora">
                Our Vision for the Future
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We&apos;re building a world where anyone can transform complex ideas into beautiful, 
                professional diagrams using the power of AI. No design skills, no technical expertise—just 
                pure creativity unleashed.
              </p>
            </div>

            {/* Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Democratize Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Making professional diagram creation accessible to everyone, regardless of their 
                    technical background or design experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Accelerate Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Helping teams and individuals rapidly prototype, communicate, and iterate on their 
                    ideas through intuitive visual representations.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Global Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Bridging communication gaps across cultures and languages through universal 
                    visual language that everyone can understand.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission Statement */}
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 mt-16">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that every great idea deserves to be visualized beautifully. Our mission is to 
                  eliminate the barriers between imagination and implementation, empowering creators, entrepreneurs, 
                  educators, and innovators to communicate their vision with clarity and impact.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">User-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium">Accessible</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">Innovative</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sora">
                Support Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Help us build the future of diagram creation. Every contribution, no matter how small, 
                fuels our mission to democratize design and make AI-powered visualization accessible to everyone.
              </p>
            </div>

            {/* Support Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

              {/* Other Ways to Support */}
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">Other Ways to Help</CardTitle>
                  <p className="text-muted-foreground">
                    Support us through community and engagement
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-left space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Github className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Star our GitHub repo</div>
                          <div className="text-xs text-muted-foreground">Help us gain visibility</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Twitter className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Share on social media</div>
                          <div className="text-xs text-muted-foreground">Spread the word</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Heart className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Provide feedback</div>
                          <div className="text-xs text-muted-foreground">Help us improve</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Sparkles className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Create and share diagrams</div>
                          <div className="text-xs text-muted-foreground">Show what&apos;s possible</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Thank You Message */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 mt-16">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">Thank You! 🙏</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We&apos;re grateful for every supporter who believes in our vision. Together, we&apos;re 
                  building something truly special that will empower creators worldwide. Your support 
                  makes all the difference!
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Diagrams Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
              </div>
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