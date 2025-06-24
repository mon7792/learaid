"use client";

import { Send, Loader2 } from "lucide-react";

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
import { Input } from "@/components/ui/input";

export const ChatInput = () => {
  const { form, isPending, handleSubmit, isFormValid } = useChatInput();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe the diagram you want to create..."
                    className="pr-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
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
          Press Enter to send or click the send button
        </p>
      </form>
    </Form>
  );
};
