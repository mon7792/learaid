"use client";

import { toast } from "sonner";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  useCreateNewDiagram,
  useGenerateDiagram,
} from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";
import { useSession } from "@/lib/auth-client";

type UseChatInputReturnProps = {
  isPending: boolean;
  isFormValid: boolean;
  form: UseFormReturn<z.infer<typeof chatSchema>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  samplePrompts: string[];
};

export const useChatInput = (): UseChatInputReturnProps => {
  const [diagramId, setDiagramId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate: generateDiagram, isPending: isGeneratingDiagram } =
    useGenerateDiagram(
      () => {
        toast.success("Diagram generated successfully");
        router.push(`/diagram/${diagramId}`);
      },
      (error) => {
        console.error("error", error);
      }
    );

  const { mutate: createNewDiagram, isPending: isCreatingNewDiagram } =
    useCreateNewDiagram(
      (data) => {
        toast.success("Diagram created successfully");
        setDiagramId(data.id);
        generateDiagram({ id: data.id, message: form.getValues("message") });
      },
      (error) => {
        console.error("error", error);
      }
    );

  const onSubmit = (values: z.infer<typeof chatSchema>) => {
    if (!session) {
      router.push(`/auth/login?prompt=${encodeURIComponent(values.message)}`);
      return;
    }

    // create a new diagram
    createNewDiagram(values.message);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isPending: isGeneratingDiagram || isCreatingNewDiagram,
    handleSubmit,
    isFormValid: form.formState.isValid,
    samplePrompts: [
      "Create a flowchart for a user registration process",
      "Design a system architecture diagram for an e-commerce platform",
      "Generate an organizational chart for a startup company",
      "Build a network topology diagram for a small office",
      "Create a decision tree for choosing a programming language",
      "Design a database schema for a blog application",
    ],
  };
};
