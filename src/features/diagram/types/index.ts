export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  message: string;
  mermaid?: string;
  excalidraw?: string;
  timestamp: Date;
};


export type ChatResponse = {
  message: string;
  mermaid?: string;
  excalidraw?: string;
};