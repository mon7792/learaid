import { ulid } from "ulidx";
import { addMessageToDiagram } from "@/features/diagram/model";

export const addUserMessage = async (
  diagramId: string,
  message: string
): Promise<void> => {
  const id = ulid();
  await addMessageToDiagram(id, diagramId, message, "user", null, null, 0);
};

export const addAiMessage = async (
  diagramId: string,
  message: string,
  mermaid: string | null,
  excalidraw: string | null,
  tokenCost: number
): Promise<string> => {
  const id = ulid();
  await addMessageToDiagram(
    id,
    diagramId,
    message,
    "ai",
    mermaid,
    excalidraw,
    tokenCost
  );
  return id;
};
