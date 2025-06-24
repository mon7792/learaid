import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withCors } from '@/utils/cors';
// import { db } from '@/config/db';
// import { userBilling, userPurchase } from '@/schema/billing';
// import { eq } from 'drizzle-orm';
// import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function for consistent logging
function logWebhookEvent(message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] WEBHOOK: ${message}`, data ? JSON.stringify(data, null, 2) : '');
}

// // Helper function to get user ID from customer ID
// async function getUserIdFromCustomerId(customerId: string): Promise<string | null> {
//   try {
//     const { data, error } = await supabase
//       .from('stripe_customers')
//       .select('user_id')
//       .eq('customer_id', customerId)
//       .eq('deleted_at', null)
//       .single();

//     if (error || !data) {
//       logWebhookEvent(`No user found for customer ${customerId}`, error);
//       return null;
//     }

//     return data.user_id;
//   } catch (error) {
//     logWebhookEvent(`Error getting user ID for customer ${customerId}`, error);
//     return null;
//   }
// }

// // Helper function to update user billing tokens
// async function updateUserTokens(userId: string, tokensToAdd: number) {
//   try {
//     // First, try to get existing billing record
//     const existingBilling = await db
//       .select()
//       .from(userBilling)
//       .where(eq(userBilling.userId, userId))
//       .limit(1);

//     if (existingBilling.length > 0) {
//       // Update existing record
//       await db
//         .update(userBilling)
//         .set({
//           tokens: existingBilling[0].tokens + tokensToAdd,
//           updatedAt: new Date(),
//         })
//         .where(eq(userBilling.userId, userId));
//     } else {
//       // Create new billing record
//       await db.insert(userBilling).values({
//         id: crypto.randomUUID().replace(/-/g, '').substring(0, 26),
//         userId,
//         tokens: tokensToAdd,
//         plan: 'trial',
//       });
//     }

//     logWebhookEvent(`Updated tokens for user ${userId}: +${tokensToAdd}`);
//   } catch (error) {
//     logWebhookEvent(`Error updating tokens for user ${userId}`, error);
//     throw error;
//   }
// }

// // Helper function to create purchase record
// async function createPurchaseRecord(
//   userId: string,
//   checkoutSessionId: string,
//   paymentIntentId: string,
//   tokensAdded: number,
//   pricePaid: number,
//   currency: string = 'usd'
// ) {
//   try {
//     await db.insert(userPurchase).values({
//       id: crypto.randomUUID().replace(/-/g, '').substring(0, 26),
//       userId,
//       tokensAdded,
//       pricePaid,
//       currency,
//       stripeCheckoutSessionId: checkoutSessionId,
//       stripePaymentIntentId: paymentIntentId,
//       status: 'COMPLETED',
//     });

//     logWebhookEvent(`Created purchase record for user ${userId}`, {
//       checkoutSessionId,
//       paymentIntentId,
//       tokensAdded,
//       pricePaid,
//     });
//   } catch (error) {
//     logWebhookEvent(`Error creating purchase record for user ${userId}`, error);
//     throw error;
//   }
// }

// // Helper function to update Supabase stripe_orders table
// async function updateStripeOrder(
//   checkoutSessionId: string,
//   paymentIntentId: string,
//   customerId: string,
//   amountSubtotal: number,
//   amountTotal: number,
//   currency: string,
//   paymentStatus: string,
//   status: 'pending' | 'completed' | 'canceled' = 'completed'
// ) {
//   try {
//     const { error } = await supabase
//       .from('stripe_orders')
//       .upsert({
//         checkout_session_id: checkoutSessionId,
//         payment_intent_id: paymentIntentId,
//         customer_id: customerId,
//         amount_subtotal: amountSubtotal,
//         amount_total: amountTotal,
//         currency,
//         payment_status: paymentStatus,
//         status,
//         updated_at: new Date().toISOString(),
//       });

//     if (error) {
//       logWebhookEvent(`Error updating stripe_orders for session ${checkoutSessionId}`, error);
//       throw error;
//     }

//     logWebhookEvent(`Updated stripe_orders for session ${checkoutSessionId}`);
//   } catch (error) {
//     logWebhookEvent(`Error in updateStripeOrder for session ${checkoutSessionId}`, error);
//     throw error;
//   }
// }

// Event handlers
// async function handlePaymentIntentCreated(event: Stripe.Event) {
//   const paymentIntent = event.data.object as Stripe.PaymentIntent;
//   logWebhookEvent(`Payment intent created: ${paymentIntent.id}`);
  
//   // Store payment intent metadata for later use
//   // This is mainly for logging/tracking purposes
// }

// async function handlePaymentIntentSucceeded(event: Stripe.Event) {
//   const paymentIntent = event.data.object as Stripe.PaymentIntent;
//   logWebhookEvent(`Payment intent succeeded: ${paymentIntent.id}`);

//   if (!paymentIntent.customer) {
//     logWebhookEvent('No customer associated with payment intent');
//     return;
//   }

//   const customerId = typeof paymentIntent.customer === 'string' 
//     ? paymentIntent.customer 
//     : paymentIntent.customer.id;
//   const userId = await getUserIdFromCustomerId(customerId);
  
//   if (!userId) {
//     logWebhookEvent(`No user found for customer ${customerId}`);
//     return;
//   }

//   // Calculate tokens based on amount (you can adjust this logic)
//   const amountInCents = paymentIntent.amount;
//   const tokensToAdd = Math.floor(amountInCents / 100); // 1 token per dollar/cent

//   try {
//     await updateUserTokens(userId, tokensToAdd);
//     logWebhookEvent(`Successfully processed payment intent ${paymentIntent.id} for user ${userId}`);
//   } catch (error) {
//     logWebhookEvent(`Error processing payment intent ${paymentIntent.id}`, error);
//     throw error;
//   }
// }

// async function handleCheckoutSessionCompleted(event: Stripe.Event) {
//   const session = event.data.object as Stripe.Checkout.Session;
//   logWebhookEvent(`Checkout session completed: ${session.id}`);

//   if (!session.customer) {
//     logWebhookEvent('No customer associated with checkout session');
//     return;
//   }

//   const customerId = typeof session.customer === 'string' 
//     ? session.customer 
//     : session.customer.id;
//   const userId = await getUserIdFromCustomerId(customerId);
  
//   if (!userId) {
//     logWebhookEvent(`No user found for customer ${customerId}`);
//     return;
//   }

//   try {
//     // Update stripe_orders table
//     await updateStripeOrder(
//       session.id,
//       session.payment_intent as string,
//       customerId,
//       session.amount_subtotal || 0,
//       session.amount_total || 0,
//       session.currency || 'usd',
//       session.payment_status || 'paid'
//     );

//     // If this is a one-time purchase, add tokens
//     if (session.mode === 'payment' && session.payment_intent) {
//       const amountInCents = session.amount_total || 0;
//       const tokensToAdd = Math.floor(amountInCents / 100);

//       await updateUserTokens(userId, tokensToAdd);
//       await createPurchaseRecord(
//         userId,
//         session.id,
//         session.payment_intent as string,
//         tokensToAdd,
//         amountInCents,
//         session.currency || 'usd'
//       );
//     }

//     logWebhookEvent(`Successfully processed checkout session ${session.id} for user ${userId}`);
//   } catch (error) {
//     logWebhookEvent(`Error processing checkout session ${session.id}`, error);
//     throw error;
//   }
// }

// async function handleChargeSucceeded(event: Stripe.Event) {
//   const charge = event.data.object as Stripe.Charge;
//   logWebhookEvent(`Charge succeeded: ${charge.id}`);

//   // This event is more granular than payment_intent.succeeded
//   // We'll mainly use it for logging and tracking
//   if (charge.customer) {
//     const customerId = typeof charge.customer === 'string' 
//       ? charge.customer 
//       : charge.customer.id;
//     const userId = await getUserIdFromCustomerId(customerId);
    
//     if (userId) {
//       logWebhookEvent(`Charge ${charge.id} processed for user ${userId}`);
//     }
//   }
// }

// async function handleChargeUpdated(event: Stripe.Event) {
//   const charge = event.data.object as Stripe.Charge;
//   logWebhookEvent(`Charge updated: ${charge.id}`);

//   // Handle refunds, disputes, etc.
//   if (charge.refunded) {
//     logWebhookEvent(`Charge ${charge.id} was refunded`);
//     // You might want to deduct tokens or update purchase status here
//   }

//   if (charge.disputed) {
//     logWebhookEvent(`Charge ${charge.id} has a dispute`);
//     // Handle dispute logic
//   }
// }


export const POST = withCors(async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  try {
    logWebhookEvent('Received webhook request');
    logWebhookEvent('Stripe signature', sig);

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    logWebhookEvent(`Event received: ${event.type}`, event.data.object);

    // Handle events in any order
    // switch (event.type) {
    //   case 'payment_intent.created':
    //     await handlePaymentIntentCreated(event);
    //     break;
      
    //   case 'payment_intent.succeeded':
    //     await handlePaymentIntentSucceeded(event);
    //     break;
      
    //   case 'checkout.session.completed':
    //     await handleCheckoutSessionCompleted(event);
    //     break;
      
    //   case 'charge.succeeded':
    //     await handleChargeSucceeded(event);
    //     break;
      
    //   case 'charge.updated':
    //     await handleChargeUpdated(event);
    //     break;

    //   default:
    //     logWebhookEvent(`Unhandled event type: ${event.type}`);
    // }

    return NextResponse.json({ received: true });
  } catch (err) {
    logWebhookEvent('Webhook error', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
});
