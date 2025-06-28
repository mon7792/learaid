"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

import { useHydratedStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";
import { useGenerateDiagram } from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";
import { useGetTokens } from "@/features/billing/api/query";
import { useEstimateTokenCost } from "@/features/billing/api/mutation";

export const useChatInput = () => {
  const { setMessages, setMermaid, id, diagrams, tokens, setBuyDialogOpen, csrfToken } =
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
    csrfToken,
    (data) => {
      addAiMessage(data);
      setMermaid(data.mermaid || null);
      form.reset();
    },
    (error) => {
      console.error("error", error);
      toast.error("Something went wrong. refresh the page and try again.");
      form.setFocus("message");
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

  const checkSufficientTokens = async (message: string): Promise<boolean | null> => {
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
    if (!values.message.trim() || isPending || !id) return;

    // check if the user has sufficient tokens
    const isSufficientTokens = await checkSufficientTokens(values.message);

    // handle the csrf token error
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
  const { csrfToken, setTokens } = useHydratedStore();
  const { refetch: getTokenTotal, data: tokenTotal, isSuccess: isTokenTotalSuccess } = useGetTokens();
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
