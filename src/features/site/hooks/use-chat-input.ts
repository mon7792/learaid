"use client";

import { toast } from "sonner";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  useCreateNewDiagram,
  useGenerateDiagram,
} from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";
import { useSession } from "@/lib/auth-client";
import { useHydratedStore } from "@/store";
import { useGetTokens } from "@/features/billing/api/query";
import { useEstimateTokenCost } from "@/features/billing/api/mutation";

type UseChatInputReturnProps = {
  isPending: boolean;
  isFormValid: boolean;
  form: UseFormReturn<z.infer<typeof chatSchema>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  samplePrompts: string[];
};

export const useChatInput = (): UseChatInputReturnProps => {
  const { tokens, setBuyDialogOpen, csrfToken, setMermaid } =
    useHydratedStore();
  const { getTokenTotal, getTokenEstimate } = useTokensCost(csrfToken);
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
      csrfToken,
      (data) => {
        setMermaid(data.mermaid || null);
        toast.success("Diagram generated successfully");
        router.push(`/diagram/${diagramId}`);
      },
      (error) => {
        console.error("error", error);
        // Check if the error is about insufficient tokens
        if (
          error.message.includes("Insufficient tokens") ||
          error.message.includes("402")
        ) {
          setBuyDialogOpen(true);
        } else {
          toast.error("Failed to generate diagram. Please try again.");
        }
      }
    );

  const { mutate: createNewDiagram, isPending: isCreatingNewDiagram } =
    useCreateNewDiagram(
      csrfToken,
      (data) => {
        toast.success("Diagram created successfully");
        setDiagramId(data.id);
        generateDiagram({ id: data.id, message: form.getValues("message") });
      },
      (error) => {
        console.error("error", error);
        // Check if the error is about insufficient tokens
        if (
          error.message.includes("Insufficient tokens") ||
          error.message.includes("402")
        ) {
          setBuyDialogOpen(true);
        } else {
          toast.error("Failed to create diagram. Please try again.");
        }
      }
    );

  const checkSufficientTokens = async (
    message: string
  ): Promise<boolean | null> => {
    // check if the user token is less than 0
    if (tokens && tokens < 0) {
      return false;
    }

    // Estimate token cost for the message
    let tokenTotal = 0;
    let tokenEstimate = 0;
    try {
      const tokens = await getTokenTotal();
      tokenTotal = tokens?.data?.tokens || 0;
    } catch (error) {
      console.error("Failed to get token total:", error);
      return null;
    }

    try {
      const estimatedTokens = await getTokenEstimate(message);
      tokenEstimate = estimatedTokens.tokens || 0;
    } catch (error) {
      console.error("Failed to get token estimate:", error);
      return null;
    }

    // Check if the user has sufficient tokens
    if (tokenTotal - tokenEstimate < 0) {
      return false;
    }

    return true;
  };

  const onSubmit = async (values: z.infer<typeof chatSchema>) => {
    if (!session) {
      router.push(`/auth/login?prompt=${encodeURIComponent(values.message)}`);
      return;
    }

    const isSufficientTokens = await checkSufficientTokens(values.message);

    if (isSufficientTokens === null) {
      toast.error("Something went wrong. refresh the page and try again.");
      form.setFocus("message");
      return;
    }

    if (isSufficientTokens === false) {
      setBuyDialogOpen(true);
      form.setFocus("message");
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

const useTokensCost = (csrfToken: string) => {
  const { setTokens } = useHydratedStore();
  const {
    refetch: getTokenTotal,
    data: tokenTotal,
    isSuccess: isTokenTotalSuccess,
  } = useGetTokens();
  const { mutateAsync: getTokenEstimate } = useEstimateTokenCost(csrfToken);

  useEffect(() => {
    if (isTokenTotalSuccess) {
      setTokens(tokenTotal?.tokens || 0);
    }
  }, [isTokenTotalSuccess, tokenTotal, setTokens]);

  return {
    getTokenTotal,
    getTokenEstimate,
  };
};
