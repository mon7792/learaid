"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo } from "react";

import { useStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";
import { useGenerateDiagram } from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";

export const useChatInput = () => {
  const { setMessages, setMermaid, id, diagrams } = useStore();

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
      addAiMessage(data.message, data.mermaid);
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

  const addAiMessage = (content: string, mermaid?: string) => {
    if (!id) return;
    
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "ai",
      message: content,
      mermaid: mermaid,
      timestamp: new Date(),
    };
    setMessages([...messages, aiMessage]);
  };

  const onSubmit = (values: z.infer<typeof chatSchema>) => {
    if (!values.message.trim() || isPending || !id) return;

    console.log(`Submitting with ID: ${id}`);
    addUserMessage(values.message);
    
    generateDiagram(values.message);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isPending,
    handleSubmit,
    isFormValid: form.formState.isValid && !!id,
  };
};
