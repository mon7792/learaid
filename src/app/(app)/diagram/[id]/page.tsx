import DiagramWorkspace from "@/components/diagram-workspace";

interface DiagramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DiagramPage({ params }: DiagramPageProps) {
  const { id } = await params;

  return (
    <div className="h-screen flex flex-col">
      <DiagramWorkspace diagramId={id} />
    </div>
  );
}
