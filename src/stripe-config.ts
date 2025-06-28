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