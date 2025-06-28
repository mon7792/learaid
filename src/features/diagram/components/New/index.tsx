"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

import { useCreateNewDiagram } from "@/features/diagram/api/mutation";
import { useHydratedStore } from "@/store";

import { Button } from "@/components/ui/button";

type NewDiagramProps = {
  variant?:  "default" | "icon" | "outline";
};

export const NewDiagram = ({ variant = "default" }: NewDiagramProps) => {
  const router = useRouter();
  const { setCurrentDiagramId, setMermaid, diagrams, setDiagrams , csrfToken} =
    useHydratedStore();
  const { mutate: createNewDiagram, isPending: isCreatingNewDiagram } =
    useCreateNewDiagram(
      csrfToken,
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
    <Button
      variant={variant === "default" ? "default" : "outline"}
      onClick={handleCreateNewDiagram}
      disabled={isCreatingNewDiagram}
      className="w-full border-2 flex items-center justify-center"
    >
      {isCreatingNewDiagram ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      {variant !== "icon" && (
        <span className="text-sm tracking-wide">Diagram</span>
      )}
    </Button>
  );
};
