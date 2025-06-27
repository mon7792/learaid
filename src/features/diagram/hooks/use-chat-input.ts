"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo } from "react";
import { toast } from "sonner";

import { useHydratedStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";
import { useGenerateDiagram } from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";
import { useGetTokens } from "@/features/billing/api/query";
import { useEstimateTokenCost } from "@/features/billing/api/mutation";

export const useChatInput = () => {
  const { setMessages, setMermaid, id, diagrams, user, setBuyDialogOpen } =
    useHydratedStore();
  const { getTokenTotal, getTokenEstimate } = useTokensCost();

  const messages = useMemo(() => {
    if (!id) return [];
    return diagrams.find((diagram) => diagram.id === id)?.messages || [];
  }, [diagrams, id]);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate: generateDiagram, isPending } = useGenerateDiagram(
    (data) => {
      console.log("data", data);
      addAiMessage(data);
      setMermaid(data.mermaid || null);
      form.reset();
    },
    (error) => {
      console.error("error", error);
    }
  );

  const addUserMessage = (content: string) => {
    if (!id) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      message: content,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
  };

  const addAiMessage = (message: ChatMessage) => {
    if (!id) return;
    setMessages([...messages, message]);
  };

  const checkSufficientTokens = async (message: string): Promise<boolean> => {
    // check if the user token is less than 0
    if (user?.token && user.token < 0) {
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
      toast.error("Failed to get token total. Please try again.");
      return false;
    }

    try {
      const estimatedTokens = await getTokenEstimate(message);
      tokenEstimate = estimatedTokens.tokens || 0;
    } catch (error) {
      console.error("Failed to get token estimate:", error);
      toast.error("Failed to get token estimate. Please try again.");
      return false;
    }

    // Check if the user has sufficient tokens
    if (tokenTotal - tokenEstimate < 0) {
      return false;
    }

    return true;
  };

  const onSubmit = async (values: z.infer<typeof chatSchema>) => {
    if (!values.message.trim() || isPending || !id) return;

    // check if the user has sufficient tokens
    const isSufficientTokens = await checkSufficientTokens(values.message);
    if (!isSufficientTokens) {
      setBuyDialogOpen(true);
      return;
    }

    // TODO: fix this flow of messages

    addUserMessage(values.message);

    generateDiagram({ id, message: values.message });
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isPending,
    handleSubmit,
    isFormValid: form.formState.isValid && !!id,
  };
};

const useTokensCost = () => {
  const { refetch: getTokenTotal } = useGetTokens();
  const { mutateAsync: getTokenEstimate } = useEstimateTokenCost();

  return {
    getTokenTotal,
    getTokenEstimate,
  };
};
