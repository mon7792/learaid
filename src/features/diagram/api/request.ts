import { ChatMessage, DiagramMessagesResponse, DiagramResponse } from "@/features/diagram/types";
import { Paginated } from "@/types";

export const generateDiagram = async (
  id: string,
  message: string,
  csrfToken: string
): Promise<ChatMessage> => {
  const response = await fetch(`/api/diagram/${id}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ message }),
    credentials: "include",
  });

  const data = await response.json();

  // TODO: update this to handle in sufficient tokens
  if (!response.ok) {
    throw new Error(data.error || "Failed to generate diagram");
  }
  return data;
};

export const createNewDiagram = async (
  message: string,
  csrfToken: string
): Promise<DiagramResponse> => {
  const response = await fetch("/api/diagram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ message }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create new diagram");
  }
  return data;
};

export const listDiagrams = async (
  cursor?: string
): Promise<Paginated<DiagramResponse>> => {
  const queryParams = new URLSearchParams();
  if (cursor) {
    queryParams.set("cursor", cursor);
  }

  const response = await fetch(`/api/diagram?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create new diagram");
  }
  return data;
};

export const listPaginatedMessages = async (
  id: string,
  cursor?: string
): Promise<DiagramMessagesResponse> => {
  const queryParams = new URLSearchParams();
  if (cursor) {
    queryParams.set("cursor", cursor);
  }

  const response = await fetch(`/api/diagram/${id}/messages?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create new diagram");
  }
  return data;
};
