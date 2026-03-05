#!/usr/bin/env node

/**
 * Setup Stripe product and price for FedResume.
 * Run: node scripts/setup-stripe.mjs
 * 
 * Requires STRIPE_SECRET_KEY env var.
 */

import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("ERROR: Set STRIPE_SECRET_KEY environment variable first.");
  process.exit(1);
}

const stripe = new Stripe(secretKey);

async function setup() {
  console.log("Setting up FedResume Stripe product...\n");

  // Check for existing product
  const existing = await stripe.products.search({
    query: "metadata['product']:'fedresume'",
  });

  let product;
  if (existing.data.length > 0) {
    product = existing.data[0];
    console.log(`Found existing product: ${product.id} (${product.name})`);
  } else {
    product = await stripe.products.create({
      name: "Federal Resume Conversion",
      description:
        "AI-powered civilian to federal resume conversion — USAJobs compatible format with KSAs, specialized experience blocks, and GS-level language.",
      metadata: { product: "fedresume" },
    });
    console.log(`Created product: ${product.id}`);
  }

  // Check for existing price
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 1,
  });

  let price;
  if (prices.data.length > 0) {
    price = prices.data[0];
    console.log(
      `Found existing price: ${price.id} ($${(price.unit_amount / 100).toFixed(2)})`
    );
  } else {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 999,
      currency: "usd",
    });
    console.log(`Created price: ${price.id} ($9.99)`);
  }

  console.log("\n=== Add these to your .env.local and Vercel env vars ===");
  console.log(`STRIPE_PRICE_ID=${price.id}`);
  console.log("\nDone! ✅");
}

setup().catch((err) => {
  console.error("Setup failed:", err.message);
  process.exit(1);
});
