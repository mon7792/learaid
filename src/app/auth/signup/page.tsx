import { Zap, Palette, Brain, DraftingCompass } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Github } from "@/features/auth/components/Github";

export default function SignupPage() {


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <DraftingCompass className="w-5 h-5 text-primary-foreground rotate-180" />
              </div>
              <span className="text-3xl font-bold">Vanita</span>
            </div>

            {/* Hero Text */}
            <div className="space-y-4 max-w-md">
              <h1 className="text-4xl font-bold tracking-tight">
                Start Creating
                <span className="text-primary block">Amazing Diagrams</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of users who are already transforming their ideas into stunning visual diagrams with the power of AI.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">AI Powered</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Instant Results</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Beautiful Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-background to-muted/20">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <DraftingCompass className="w-5 h-5 text-primary-foreground rotate-180" />
              </div>
              <span className="text-2xl font-bold">Vanita</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground">
              Get started with AI-powered diagram generation in seconds
            </p>
          </div>

          {/* Signup Card */}
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Join Vanita today</CardTitle>
              <CardDescription>
                Start your journey to effortless diagram creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GitHub Signup Button */}
              <Github />

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">
                    Free to get started
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Free account with AI diagram generation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Cloud storage for your projects</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Export and share your diagrams</span>
                </div>
              </div>

              {/* Terms */}
              <div className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="/terms-and-conditions" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-primary font-medium hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
            
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}