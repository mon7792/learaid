import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

const samplePrompts = [
  "Create a flowchart for a user registration process",
  "Design a system architecture diagram for an e-commerce platform",
  "Generate an organizational chart for a startup company",
  "Build a network topology diagram for a small office",
  "Create a decision tree for choosing a programming language",
  "Design a database schema for a blog application"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Learaid</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Turn Ideas Into
              <span className="text-primary block">Visual Diagrams</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Describe your process, system, or concept in plain English, and watch as AI transforms it into a professional diagram instantly.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <textarea
                placeholder="Describe the diagram you want to create..."
                className="w-full min-h-[120px] p-4 pr-16 text-lg border border-input rounded-xl bg-background/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                rows={4}
              />
              <Button 
                size="icon"
                className="absolute bottom-4 right-4 rounded-full w-10 h-10"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 mr-2" />
              Press Enter to generate or click the arrow
            </div>
          </div>

          {/* Sample Prompts */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Try these examples:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {samplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="p-4 text-left bg-card hover:bg-accent rounded-lg border border-border transition-all hover:border-accent-foreground/20 hover:shadow-sm group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:bg-accent-foreground transition-colors" />
                    <span className="text-sm text-card-foreground group-hover:text-accent-foreground transition-colors">
                      {prompt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © 2024 Learaid. Powered by AI diagram generation.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}