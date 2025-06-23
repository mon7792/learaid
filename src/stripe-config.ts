export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_S4Icu1Etr7qMmr',
    priceId: 'price_1RAA1ORx5lzCxHj0CAlRKW0p',
    name: 'Hobby Plan',
    description: 'Perfect for personal projects and small teams',
    mode: 'subscription',
    price: 49.99,
    currency: 'EUR',
  },
  {
    id: 'prod_S4IX82dpFopOxZ',
    priceId: 'price_1RA9wDRx5lzCxHj0OC4hQ7zW',
    name: 'Hobby Plan',
    description: 'Get started with basic features',
    mode: 'subscription',
    price: 4.99,
    currency: 'EUR',
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}