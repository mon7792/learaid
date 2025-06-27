'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";

import { useStore } from "@/store";

import "@excalidraw/excalidraw/index.css";


const defaultMermaidCode = `
graph TD
A[Start] --> B[Stop]
`;

export default function ExcalidrawWrapper() {
  const { resolvedTheme } = useTheme();
  const { mermaid } = useStore();
  const [isConverting, setIsConverting] = useState(true);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }

    let isCancelled = false;

    const convertAndCenter = async () => {
      setIsConverting(true);
      try {
        const { elements: skeletonElements, files: excalidrawFiles } = await parseMermaidToExcalidraw(mermaid || defaultMermaidCode, {});
        
        if (isCancelled) return;
        
        const excalidrawElements = convertToExcalidrawElements(skeletonElements);
        
        excalidrawAPI.updateScene({ 
          elements: excalidrawElements,
        });

        if (excalidrawFiles) {
          excalidrawAPI.addFiles(Object.values(excalidrawFiles));
        }

        excalidrawAPI.scrollToContent(excalidrawElements, { fitToContent: true, duration: 0 });

      } catch (error) {
        console.error('Error converting diagram:', error);
        if (isCancelled) return;
        excalidrawAPI.updateScene({ elements: [] });
      } finally {
        if (!isCancelled) {
          setIsConverting(false);
        }
      }
    };

    convertAndCenter();

    return () => {
      isCancelled = true;
    };
  }, [excalidrawAPI, mermaid]);

  return (
    <div className="h-full w-full relative">
      {isConverting && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 z-10">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Converting diagram...</p>
          </div>
        </div>
      )}
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
        initialData={{ elements: [], files: {} }}
        viewModeEnabled={false}
        theme={resolvedTheme as "light" | "dark"}
        name="Vanita Diagram"
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: {
              saveFileToDisk: true,
            },
            toggleTheme: true,
          },
        }}
      />
    </div>
  );
}