"use client";
import DiagramWorkspace from '@/components/diagram-workspace';

interface DiagramPageProps {
  params: {
    id: string;
  };
  searchParams: {
    prompt?: string;
  };
}

export default function DiagramPage({ params, searchParams }: DiagramPageProps) {
  const { id } = params;
  const initialPrompt = searchParams.prompt || '';

  return (
    <div className="h-screen flex flex-col">
      <DiagramWorkspace 
        diagramId={id}
        initialPrompt={initialPrompt}
      />
    </div>
  );
}</parameter>