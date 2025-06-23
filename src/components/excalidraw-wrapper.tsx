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
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const convertDiagram = async () => {
      if (!mermaidCode?.trim()) {
        setElements([]);
        return;
      }

      setIsConverting(true);
      setError('');

      try {
        console.log('Converting mermaid code:', mermaidCode);
        
        const { elements: excalidrawElements } = await parseMermaidToExcalidraw(mermaidCode, {
          fontSize: 16,
        });
        
        console.log('Converted elements:', excalidrawElements);
        setElements(excalidrawElements);
      } catch (error) {
        console.error('Error converting diagram:', error);
        setError(`Failed to convert diagram: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setElements([]);
      } finally {
        setIsConverting(false);
      }
    };

    convertDiagram();
  }, [mermaidCode]);

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

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-destructive text-xl">⚠</span>
          </div>
          <div>
            <p className="text-destructive font-medium mb-2">Failed to render diagram</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mermaidCode?.trim()) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
            <span className="text-muted-foreground text-xl">📊</span>
          </div>
          <p className="text-muted-foreground">No diagram to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Excalidraw
        initialData={{ 
          elements,
          appState: {
            viewBackgroundColor: "#ffffff",
            zoom: { value: 1 },
          }
        }}
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
            clearCanvas: true,
          },
        }}
      />
    </div>
  );
}