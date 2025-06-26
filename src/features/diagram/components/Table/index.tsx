"use client";

import { Plus, FileText, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useHydratedStore } from "@/store";
import { useListDiagrams } from "@/features/diagram/api/query";

export const DiagramTable = () => {
  const { setCurrentDiagramId } = useHydratedStore();
  const { data: diagrams, isLoading, isError } = useListDiagrams();

  const router = useRouter();

  const handleOpenDiagram = (id: string) => () => {
    setCurrentDiagramId(id);
    router.push(`/diagram/${id}`);
  };

  if (isLoading) {
    // TODO: add the table skeleton.
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO: add the table error skeleton.
    return <div>Error loading diagrams</div>;
  }

  if (!diagrams || diagrams.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No diagrams yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first diagram to get started with AI-powered visual
              design.
            </p>
            <Button asChild>
              <Link href="/">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Diagram
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Title</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {diagrams.items.map((diagram) => {
                return (
                  <tr
                    key={diagram.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{diagram.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleOpenDiagram(diagram.id)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
