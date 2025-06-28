import Stripe from "stripe";

import { NextRequest, NextResponse } from "next/server";
import { getUser, isAuthenticated } from "@/utils/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" }, 
        { status: 405 }
      );
    }
    const isAuth = await isAuthenticated(request);
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the origin for dynamic URLs
    const origin = request.headers.get("origin") || (process.env.APP_BASE_URL as string);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "499 plan",
              description: "50000 tokens",
            },
            unit_amount: 499, // $4.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        source: "web_checkout",
        userId: user.id,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
