import { ChatResponse } from "@/features/diagram/types";

export const generateDiagram = async (
  message: string
): Promise<ChatResponse> => {
  const response = await fetch("/api/diagram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate diagram");
  }
  return data;
};
