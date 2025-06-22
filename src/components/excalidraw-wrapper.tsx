'use client';

import { useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';

interface ExcalidrawWrapperProps {
  mermaidCode: string;
}

export default function ExcalidrawWrapper({ mermaidCode }: ExcalidrawWrapperProps) {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (mermaidCode) {
      convertDiagram();
    }
  }, [mermaidCode]);

  const convertDiagram = async () => {
    setIsConverting(true);
    try {
      const { elements: excalidrawElements } = await parseMermaidToExcalidraw(mermaidCode, {
        fontSize: 16,
      });
      setElements(excalidrawElements);
    } catch (error) {
      console.error('Error converting diagram:', error);
      // Set empty elements on error to prevent showing old diagram
      setElements([]);
    } finally {
      setIsConverting(false);
    }
  };

  if (isConverting) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Converting diagram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Excalidraw
        initialData={{ elements }}
        viewModeEnabled={false}
        theme="light"
        name="Learaid Diagram"
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
}</parameter>