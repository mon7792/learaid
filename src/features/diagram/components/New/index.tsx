"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

import { useCreateNewDiagram } from "@/features/diagram/api/mutation";
import { useHydratedStore } from "@/store";

import { Button } from "@/components/ui/button";

export const NewDiagram = () => {
  const router = useRouter();
  const { setCurrentDiagramId, setMermaid, diagrams, setDiagrams } =
    useHydratedStore();
  const { mutate: createNewDiagram, isPending: isCreatingNewDiagram } =
    useCreateNewDiagram(
      (data) => {
        // notify user
        toast.success("New diagram created");

        // update diagram store
        setCurrentDiagramId(data.id);
        setMermaid(null);
        setDiagrams([
          ...diagrams,
          {
            id: data.id,
            name: data.title,
            messages: [],
          },
        ]);

        // redirect to the new diagram
        router.push(`/diagram/${data.id}`);
      },
      (error) => {
        console.error("Error creating new diagram", error);
        toast.error("Error creating new diagram");
      }
    );

  const handleCreateNewDiagram = () => {
    createNewDiagram("create a diagram");
  };
  return (
    <Button onClick={handleCreateNewDiagram} disabled={isCreatingNewDiagram}>
      {isCreatingNewDiagram ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      New
    </Button>
  );
};