import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip, 'checkout');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateCheck.retryAfterMs || 60000) / 1000)) } }
      );
    }

    const body = await req.json();
    const { resumeLength, jobListingLength } = body;

    if (!resumeLength || !jobListingLength) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Get or create the price
    let priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      // Search for existing product first
      const products = await stripe.products.search({
        query: "metadata['product']:'fedresume'",
      });

      let product;
      if (products.data.length > 0) {
        product = products.data[0];
      } else {
        product = await stripe.products.create({
          name: "Federal Resume Conversion",
          description:
            "AI-powered civilian to federal resume conversion — USAJobs compatible",
          metadata: { product: "fedresume" },
        });
      }

      // Check for existing price
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 1,
      });

      if (prices.data.length > 0) {
        priceId = prices.data[0].id;
      } else {
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: 499,
          currency: "usd",
        });
        priceId = price.id;
      }

      console.log(
        `Using Stripe price: ${priceId} — set STRIPE_PRICE_ID env var for faster checkouts`
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/results?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/convert`,
      metadata: {
        resumeLength: String(resumeLength),
        jobListingLength: String(jobListingLength),
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
