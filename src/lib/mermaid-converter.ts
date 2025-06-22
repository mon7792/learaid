import type { ExcalidrawElement } from '@excalidraw/excalidraw';

// Basic converter that creates simple shapes for Mermaid diagrams
// This is a simplified implementation - a full converter would parse Mermaid syntax more thoroughly
export async function convertMermaidToExcalidraw(mermaidCode: string): Promise<ExcalidrawElement[]> {
  const elements: ExcalidrawElement[] = [];
  
  // Simple parsing for demonstration
  const lines = mermaidCode.split('\n').filter(line => line.trim());
  
  let yOffset = 100;
  let xOffset = 100;
  const nodeSpacing = 200;
  const verticalSpacing = 150;
  
  // Track nodes for positioning
  const nodes: { [key: string]: { x: number; y: number; width: number; height: number } } = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip diagram type declarations
    if (line.startsWith('flowchart') || line.startsWith('graph') || line.startsWith('sequenceDiagram')) {
      continue;
    }
    
    // Simple node detection (A[Label] or A --> B patterns)
    const nodeMatch = line.match(/([A-Z]+)\[(.*?)\]/);
    const arrowMatch = line.match(/([A-Z]+)\s*-->\s*([A-Z]+)/);
    const labeledArrowMatch = line.match(/([A-Z]+)\s*-->\|([^|]+)\|\s*([A-Z]+)/);
    
    if (nodeMatch) {
      const [, nodeId, label] = nodeMatch;
      const width = Math.max(120, label.length * 8);
      const height = 60;
      
      // Create rectangle element
      const rect: ExcalidrawElement = {
        id: `node-${nodeId}`,
        type: 'rectangle',
        x: xOffset,
        y: yOffset,
        width,
        height,
        angle: 0,
        strokeColor: '#1e1e1e',
        backgroundColor: '#ffffff',
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        roundness: { type: 1 },
        seed: Math.floor(Math.random() * 1000000),
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        groupIds: [],
        frameId: null,
        boundElements: null,
        updated: 1,
        link: null,
        locked: false,
      };
      
      // Create text element
      const text: ExcalidrawElement = {
        id: `text-${nodeId}`,
        type: 'text',
        x: xOffset + width / 2,
        y: yOffset + height / 2,
        width: width - 20,
        height: 25,
        angle: 0,
        strokeColor: '#1e1e1e',
        backgroundColor: 'transparent',
        fillStyle: 'solid',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        text: label,
        fontSize: 16,
        fontFamily: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
        containerId: null,
        originalText: label,
        autoResize: true,
        lineHeight: 1.25,
        baseline: 18,
        seed: Math.floor(Math.random() * 1000000),
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        groupIds: [],
        frameId: null,
        boundElements: null,
        updated: 1,
        link: null,
        locked: false,
      };
      
      elements.push(rect, text);
      nodes[nodeId] = { x: xOffset, y: yOffset, width, height };
      
      xOffset += nodeSpacing;
      if (xOffset > 800) {
        xOffset = 100;
        yOffset += verticalSpacing;
      }
    }
    
    // Handle arrows (simplified)
    if (arrowMatch || labeledArrowMatch) {
      const match = labeledArrowMatch || arrowMatch;
      const [, fromNode, label, toNode] = match;
      const actualToNode = toNode || label; // Handle both patterns
      
      if (nodes[fromNode] && nodes[actualToNode]) {
        const fromPos = nodes[fromNode];
        const toPos = nodes[actualToNode];
        
        // Create arrow element
        const arrow: ExcalidrawElement = {
          id: `arrow-${fromNode}-${actualToNode}`,
          type: 'arrow',
          x: fromPos.x + fromPos.width / 2,
          y: fromPos.y + fromPos.height,
          width: toPos.x + toPos.width / 2 - (fromPos.x + fromPos.width / 2),
          height: toPos.y - (fromPos.y + fromPos.height),
          angle: 0,
          strokeColor: '#1e1e1e',
          backgroundColor: 'transparent',
          fillStyle: 'solid',
          strokeWidth: 2,
          strokeStyle: 'solid',
          roughness: 1,
          opacity: 100,
          points: [
            [0, 0],
            [toPos.x + toPos.width / 2 - (fromPos.x + fromPos.width / 2), toPos.y - (fromPos.y + fromPos.height)]
          ],
          lastCommittedPoint: null,
          startBinding: null,
          endBinding: null,
          startArrowhead: null,
          endArrowhead: 'arrow',
          seed: Math.floor(Math.random() * 1000000),
          versionNonce: Math.floor(Math.random() * 1000000),
          isDeleted: false,
          groupIds: [],
          frameId: null,
          boundElements: null,
          updated: 1,
          link: null,
          locked: false,
        };
        
        elements.push(arrow);
      }
    }
  }
  
  return elements;
}</parameter>