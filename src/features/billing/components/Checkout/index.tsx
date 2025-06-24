import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const Checkout = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/billing/checkout", {
      method: "POST",
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return <Button onClick={handleCheckout}>Checkout</Button>;
};
