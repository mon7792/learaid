import {
  getDiagramWithMessages,
  getPaginatedMessages,
} from "@/features/diagram/model";
import { ChatMessage, DiagramMessagesResponse, DiagramResponse } from "../types";

export const listMessagesWithDiagram = async (
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

export const listMessages = async (
  userId: string,
  diagramId: string,
  cursor: string,
  limit: number = 10,
): Promise<DiagramMessagesResponse> => {
  const { messages, nextCursor } = await getPaginatedMessages(
    userId,
    diagramId,
    cursor,
    limit,
  );

  const chatMessages: ChatMessage[] = messages.map((message) => ({
    id: message.id,
    role: message.role,
    message: String(message.message),
    mermaid: message.mermaid || undefined,
    excalidraw: message.excalidraw ? String(message.excalidraw) : undefined,
    timestamp: message.createdAt,
  }));

  return {
    messages: chatMessages,
    nextCursor,
  };
};
