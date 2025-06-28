import DiagramWorkspace from "@/components/diagram-workspace";
import { getCsrfToken } from "@/utils/csrf";

interface DiagramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DiagramPage({ params }: DiagramPageProps) {
  const { id } = await params;

  const csrfToken = await getCsrfToken();

  return (
    <div className="h-screen flex flex-col">
      <DiagramWorkspace diagramId={id} csrfToken={csrfToken} />
    </div>
  );
}
