import { Workflow, Building2, PenTool, Check, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const diagramOptions = [
  {
    id: "mermaid",
    name: "Mermaid",
    description: "Clean, structured diagrams",
    icon: Workflow,
    status: "ready",
    statusText: "Ready to use!",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "plantuml", 
    name: "PlantUML",
    description: "Professional UML diagrams",
    icon: Building2,
    status: "coming-soon",
    statusText: "Coming soon",
    statusColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    iconColor: "text-orange-600 dark:text-orange-400 opacity-60",
    bgColor: "bg-orange-100 dark:bg-orange-900/20 opacity-60",
  },
  {
    id: "excalidraw",
    name: "Excalidraw", 
    description: "Hand-drawn, whiteboard style visualizations",
    icon: PenTool,
    status: "ready",
    statusText: "Ready to use!",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
];

export const DiagramOptions = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          From Idea to Diagram in Three Simple Steps
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Transform your ideas into visual diagrams with just one click - no technical knowledge required.
        </p>
      </div>

      {/* Steps Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Step 1 */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">1</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Start with Your Prompt</h3>
            <p className="text-sm text-muted-foreground">
              A simple text description of your system or process
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex justify-center">
          <div className="w-8 h-0.5 bg-border"></div>
        </div>

        {/* Step 2 */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">2</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Choose Your Style</h3>
            <p className="text-sm text-muted-foreground">
              Select from our powerful diagram generation options
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex justify-center">
          <div className="w-8 h-0.5 bg-border"></div>
        </div>

        {/* Step 3 */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">3</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Get Your Diagram</h3>
            <p className="text-sm text-muted-foreground">
              Instantly generated, professional-quality diagrams
            </p>
          </div>
        </div>
      </div>

      {/* Diagram Options */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Choose Your Preferred Diagram Style</h3>
          <p className="text-muted-foreground">
            Each style offers unique advantages for different use cases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diagramOptions.map((option) => (
            <div
              key={option.id}
              className={`relative p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200 ${
                option.status === "coming-soon" ? "opacity-75" : "hover:border-accent-foreground/20"
              }`}
            >
              {/* Status Badge */}
              <div className="absolute -top-2 left-4">
                <Badge
                  variant="secondary"
                  className={`${option.statusColor} border-0 text-xs font-medium px-2 py-1`}
                >
                  {option.status === "ready" ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {option.statusText}
                </Badge>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4 mt-2">
                <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center`}>
                  <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-lg">{option.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-medium">No Technical Skills</h4>
            <p className="text-xs text-muted-foreground">
              Simple text prompts create complex diagrams
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto">
              <Workflow className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-medium">Multiple Formats</h4>
            <p className="text-xs text-muted-foreground">
              Export to PNG, SVG, PDF, and more
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto">
              <PenTool className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-medium">Fully Editable</h4>
            <p className="text-xs text-muted-foreground">
              Customize colors, shapes, and layout
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-medium">Professional Quality</h4>
            <p className="text-xs text-muted-foreground">
              Ready for presentations and documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};