import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
      stripePromise = Promise.resolve(null);
      return stripePromise;
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export default getStripe;