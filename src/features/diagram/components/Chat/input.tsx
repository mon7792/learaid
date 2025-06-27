"use client";

import { Send, Loader2, BotMessageSquare, LoaderPinwheel } from "lucide-react";

import { useChatInput } from "@/features/diagram/hooks/use-chat-input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const ChatInput = () => {
  const { form, isPending, handleSubmit, isFormValid } = useChatInput();

  const submitForm = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitForm();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>
                  {isPending ? (
                    <LoaderPinwheel className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the diagram you want to create..."
                    className="pr-12 min-h-[80px] resize-none"
                    {...field}
                    disabled={isPending}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            className="absolute right-2 bottom-2 h-8 w-8 p-0"
            disabled={isPending || !isFormValid}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          <BotMessageSquare className="inline" /> we are machines. we do
          mistakes. we are learning. we are improving.
        </p>
      </form>
    </Form>
  );
};
