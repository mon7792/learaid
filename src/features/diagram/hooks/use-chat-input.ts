"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useStore } from "@/store";
import { ChatMessage } from "@/features/diagram/types";
import { useGenerateDiagram } from "@/features/diagram/api/mutation";
import { chatSchema } from "@/features/diagram/schema";

export const useChatInput = () => {
  const { setMessages, messages } = useStore();
  
  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate: generateDiagram, isPending } = useGenerateDiagram(
    (data) => {
      console.log("data", data);
      removeGeneratingMessage();
      form.reset();
    },
    (error) => {
      console.error("error", error);
      removeGeneratingMessage();
    }
  );

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      message: content,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
  };

  const addGeneratingMessage = () => {
    const generatingMessage: ChatMessage = {
      id: "generating",
      role: "ai",
      message: "Generating your diagram...",
      timestamp: new Date(),
    };
    setMessages([...messages, generatingMessage]);
  };

  const removeGeneratingMessage = () => {
    setMessages(messages.filter((msg: ChatMessage) => msg.id !== "generating"));
  };

  const onSubmit = (values: z.infer<typeof chatSchema>) => {
    if (!values.message.trim() || isPending) return;

    addUserMessage(values.message);
    addGeneratingMessage();
    generateDiagram(values.message);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isPending,
    handleSubmit,
    isFormValid: form.formState.isValid,
  };
};
