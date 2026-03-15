import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { convertToFederalResume, scoreResumeAgainstJob } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 60; // Allow up to 60s for AI generation on Vercel

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip, 'default');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateCheck.retryAfterMs || 60000) / 1000)) } }
      );
    }

    const body = await req.json();
    const { sessionId, resume, jobListing } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    if (!resume || !jobListing) {
      return NextResponse.json(
        { error: "Missing resume data. Please start a new conversion." },
        { status: 400 }
      );
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed. Please complete payment first." },
        { status: 402 }
      );
    }

    // Check if already generated (prevent re-generation abuse)
    if (session.metadata?.generated === "true") {
      return NextResponse.json(
        {
          error:
            "Resume already generated for this payment. If you lost your result, please contact noah@ceradonsystems.com",
        },
        { status: 410 }
      );
    }

    // Generate the federal resume
    const federalResume = await convertToFederalResume(
      resume.slice(0, 50000),
      jobListing.slice(0, 50000)
    );

    // Generate scoring for paid users
    let scoring = null;
    try {
      scoring = await scoreResumeAgainstJob(
        federalResume,
        jobListing.slice(0, 50000)
      );
    } catch (error) {
      console.error("Failed to generate scoring (non-critical):", error);
      // Don't fail the whole request if scoring fails
    }

    // Mark session as generated
    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...session.metadata,
          generated: "true",
        },
      });
    } catch (e) {
      // Non-critical — don't fail the request
      console.error("Failed to update session metadata:", e);
    }

    return NextResponse.json({ resume: federalResume, scoring });
  } catch (error: any) {
    console.error("Generate error:", error);

    if (error.message?.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate resume. Please try again." },
      { status: 500 }
    );
  }
}
