import {
  getDiagramWithMessages,
} from "@/features/diagram/model";
import { ChatMessage, DiagramResponse } from "../types";

export const listMessages = async (
  userId: string,
  diagramId: string,
  cursor: string,
  limit: number = 10,
): Promise<DiagramResponse | null> => {
  const { diagram, messages, nextCursor } = await getDiagramWithMessages(
    userId,
    diagramId,
    cursor,
    limit
  );
  if (!diagram || !diagram.title) {
    return null;
  }

  const chatMessages: ChatMessage[] = messages.map((message) => ({
    id: message.id,
    role: message.role,
    message: String(message.message),
    mermaid: message.mermaid || undefined,
    excalidraw: message.excalidraw ? String(message.excalidraw) : undefined,
    timestamp: message.createdAt,
  }));

  return {
    id: diagram.id,
    title: diagram.title,
    messages: chatMessages,
    nextCursor,
  };
};
