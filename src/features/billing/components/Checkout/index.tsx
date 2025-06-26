import { loadStripe } from "@stripe/stripe-js";
import { BadgeEuro, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutResponse {
  id: string;
  error?: string;
}

export const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Create checkout session
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session: CheckoutResponse = await response.json();
      
      if (session.error) {
        throw new Error(session.error);
      }

      if (!session.id) {
        throw new Error("No session ID received");
      }

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: session.id 
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading}
      className="cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="text-sm font-medium">Processing...</span>
        </>
      ) : (
        <>
          <BadgeEuro className="w-4 h-4 mr-2" />
          <span className="text-sm font-bold">BUY</span>
        </>
      )}
    </Button>
  );
};
