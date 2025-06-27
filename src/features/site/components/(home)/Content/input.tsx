"use client";

import { ArrowRight, Lightbulb } from "lucide-react";
import { useChatInput } from "@/features/site/hooks/use-chat-input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { BuyTokenDialog } from "@/components/buy-tokens-dialog";

export const ChatTextarea = () => {
  const { 
    form, 
    handleSubmit, 
    isPending, 
    samplePrompts,
  } = useChatInput();
  
  const submitForm = async () => {
    const isValid = await form.trigger();
      if (isValid) {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
      }
  }

  
    const handleSampleClick = async (samplePrompt: string) => {
      form.setValue("message", samplePrompt);
      submitForm();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitForm();
      }
    };

  return (
    <>
    <Form {...form}>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <textarea
                    placeholder="Describe the diagram you want to create..."
                    className="w-full min-h-[120px] p-4 pr-16 text-lg border border-input rounded-xl bg-background/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all disabled:opacity-50"
                    rows={4}
                    disabled={isPending}
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="icon"
            className="absolute bottom-4 right-4 rounded-full w-10 h-10"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Lightbulb className="w-4 h-4 mr-2" />
          Press Enter to generate or click the arrow
        </div>
      </form>
    </Form>
    
    <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Try these examples:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {samplePrompts.map((prompt, index) => (
              <button
                onClick={() => handleSampleClick(prompt)}
                key={index}
                className="p-4 text-left bg-card hover:bg-accent rounded-lg border border-border transition-all hover:border-accent-foreground/20 hover:shadow-sm group disabled:opacity-50"
                disabled={isPending}
              >
                <div className="flex items-start gap-3">
                  {/* <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:bg-accent-foreground transition-colors" /> */}
                  <span className="text-sm text-card-foreground group-hover:text-accent-foreground transition-colors">
                    {prompt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

    {/* Insufficient Tokens Dialog */}
    <BuyTokenDialog />
    </>
  );
};