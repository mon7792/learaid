import { ulid } from "ulidx";
import {
  addMessagesToDiagramDB,
} from "@/features/diagram/model";
import { diagramMessages } from "@/schema";

// addMessagesToDiagram adds a user message and an ai message to a diagram
// update the diagram tokens and user billing tokens
export const addMessagesToDiagram = async (
  userId: string,
  diagramId: string,
  tokenCost: number,
  userMessage: string,
  aiMessage: {
    message: string;
    mermaid: string | null;
    excalidraw: string | null;
  }
): Promise<string> => {
  const usrMsg = prepareUserMessage(diagramId, userMessage);
  const aiMsg = prepareAiMessage(diagramId, aiMessage.message, aiMessage.mermaid, aiMessage.excalidraw, tokenCost);
  await addMessagesToDiagramDB(userId, diagramId, tokenCost, [usrMsg, aiMsg]);

  return aiMsg.id;
};

const prepareUserMessage = (
  diagramId: string,
  message: string
): typeof diagramMessages.$inferInsert => {
  const id = ulid();
  return {
    id,
    diagramId,
    message,
    role: "user",
    mermaid: null,
    excalidraw: null,
    tokenCost: 0,
  };
};

const prepareAiMessage = (
  diagramId: string,
  message: string,
  mermaid: string | null,
  excalidraw: string | null,
  tokenCost: number
): typeof diagramMessages.$inferInsert => {
  const id = ulid();
  return {
    id,
    diagramId,
    message,
    role: "ai",
    mermaid,
    excalidraw,
    tokenCost,
  };
};
