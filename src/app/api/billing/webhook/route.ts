import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { withCors } from '@/utils/cors';
import { createUserPurchase } from '@/features/billing/usecase/create-user-billing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function for consistent logging
function logWebhookEvent(message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] WEBHOOK: ${message}`, data ? JSON.stringify(data, null, 2) : '');
}

// Helper function to get user ID from checkout session metadata
function getUserIdFromMetadata(session: Stripe.Checkout.Session): string | null {
  const userId = session.metadata?.userId;
  if (!userId) {
    logWebhookEvent('No userId found in checkout session metadata');
    return null;
  }
  return userId;
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  logWebhookEvent(JSON.stringify(session)); 
  logWebhookEvent(`Checkout session completed: ${session.id}`); 

  // Only handle payment mode (one-time purchases)
  if (session.mode !== 'payment') {
    logWebhookEvent(`Skipping non-payment mode session: ${session.mode}`);
    return;
  }

  // Get user ID from metadata
  const userId = getUserIdFromMetadata(session);
  if (!userId) {
    logWebhookEvent(`No user found for checkout session ${session.id}`);
    return;
  }

  // get the payment status
  const paymentStatus = session.payment_status;

  // if the payment status is paid, then update the user's tokens
  if (paymentStatus !== 'paid') {
    logWebhookEvent(`Payment status is not paid, skipping`);
    return;
  }
  try {
    // Add operations to batch
    // const amountInCents = session.amount_total || 0;
    // const tokensToAdd = Math.floor(amountInCents / 100);

    await createUserPurchase(userId, session.customer as string, session.id, session.payment_intent as string);

    // Update stripe_orders table

      


    logWebhookEvent(`Queued checkout session ${session.id} for user ${userId}`);
  } catch (error) {
    logWebhookEvent(`Error processing checkout session ${session.id}`, error);
    throw error;
  }
}

export const POST = withCors(async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  try {
    logWebhookEvent('Received webhook request');
    logWebhookEvent('Stripe signature', sig);

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    logWebhookEvent(`Event received: ${event.type}`, event.data.object);

    // Handle payment mode events only
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;
    
      default:
        logWebhookEvent(`UNHANDLED EVENT TYPE: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    logWebhookEvent('Webhook error', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
});
