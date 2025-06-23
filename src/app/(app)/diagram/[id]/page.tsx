import DiagramWorkspace from "@/components/diagram-workspace";

interface DiagramPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    prompt?: string;
  }>;
}

export default async function DiagramPage({
  params,
  searchParams,
}: DiagramPageProps) {
  const { id } = await params;
  const { prompt } = await searchParams;
  const initialPrompt = prompt || "";

  return (
    <div className="h-screen flex flex-col">
      <DiagramWorkspace diagramId={id} initialPrompt={initialPrompt} />
    </div>
  );
}
