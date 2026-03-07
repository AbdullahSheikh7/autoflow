import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2025-06-30.basil",
  });

  const products = await stripe.prices.list({
    limit: 3,
  });

  return NextResponse.json(products.data);
};

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2025-06-30.basil",
  });

  const data = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url:
      "https://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://localhost:3000/billing",
  });

  return NextResponse.json(session.url);
};
