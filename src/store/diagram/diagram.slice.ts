"use client";

import { ChatMessage } from "@/features/diagram/types";
import { StateCreator } from "zustand";

type DiagramSlice = {
  id: string | null;
  name: string | null;
  setDiagram: (id: string, name: string) => void;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
};

export const createDiagramSlice: StateCreator<
  DiagramSlice,
  [],
  [],
  DiagramSlice
> = (set) => ({
  id: null,
  name: null,
  messages: [],
  setMessages: (messages: ChatMessage[]) => {
    set({ messages });
  },
  setDiagram: (id: string, name: string) => {
    set({ id, name });
  },
});
