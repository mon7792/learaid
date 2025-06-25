"use client";

import { ChatMessage } from "@/features/diagram/types";
import { StateCreator } from "zustand";

type Diagram = {
  id: string; // id of the diagram
  name: string; // name of the diagram
  messages: ChatMessage[]; // messages sent back and forth between the user and the assistant
};

type DiagramsSlice = {
  id: string | null; // id of the current selected diagram
  mermaid: string | null; // current mermaid code visible in excalidraw
  diagrams: Diagram[]; // all the diagrams store in the store.
  setDiagrams: (diagrams: Diagram[] | ((current: Diagram[]) => Diagram[])) => void;
  setCurrentDiagramId: (id: string | null) => void; // set the current diagram id
  setDiagram: (id: string | null, name: string) => void; // set the name of the diagram display component
  setMessages: (messages: ChatMessage[]) => void; // set the messages of the current diagram
  setMermaid: (mermaid: string | null) => void; // set the mermaid code of the diagram
};

export const createDiagramSlice: StateCreator<
  DiagramsSlice,
  [],
  [],
  DiagramsSlice
> = (set, get) => ({
  id: null,
  mermaid: null,
  diagrams: [],
  setDiagrams: (diagrams: Diagram[] | ((current: Diagram[]) => Diagram[])) => {
    if (typeof diagrams === 'function') {
      set((state) => ({ diagrams: diagrams(state.diagrams) }));
    } else {
      set({ diagrams });
    }
  },
  setCurrentDiagramId: (id: string | null) => {
    set({ id });
  },
  setDiagram: (id: string | null, name: string) => {
    set((state) => ({
      diagrams: state.diagrams.map((diagram) =>
        diagram.id === id ? { ...diagram, name } : diagram
      ),
    }));
  },
  setMessages: (messages: ChatMessage[]) => {
    const { id } = get();
    if (!id) return;
    
    set((state) => ({
      diagrams: state.diagrams.map((diagram) => {
        if (diagram.id === id) {
          return { ...diagram, messages: [...messages] };
        }
        return diagram;
      }),
    }));
  },
  setMermaid: (mermaid: string | null) => {
    set({ mermaid });
  },
});
