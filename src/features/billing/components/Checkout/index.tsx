import { BadgeEuro, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import getStripe from "@/config/stripe";
import { useHydratedStore } from "@/store";

interface CheckoutResponse {
  id: string;
  error?: string;
}

export const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const {  csrfToken } = useHydratedStore();

  useEffect(() => {
    // Check if Stripe can be loaded
    const checkStripe = async () => {
      try {
        const stripe = await getStripe();
        setStripeLoaded(!!stripe);
      } catch (error) {
        console.error("Failed to load Stripe:", error);
        setStripeLoaded(false);
      }
    };
    
    checkStripe();
  }, []);

  const handleCheckout = async () => {
    if (isLoading || !stripeLoaded) return;

    setIsLoading(true);
    
    try {
      // Load Stripe
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Create checkout session
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
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
      disabled={isLoading || !stripeLoaded}
      className="cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="text-sm font-medium">Processing...</span>
        </>
      ) : !stripeLoaded ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="text-sm font-medium">Loading...</span>
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
