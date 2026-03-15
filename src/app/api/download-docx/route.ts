import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { generateDocxResume } from "@/lib/docx-generator";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip, 'docx-download');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateCheck.retryAfterMs || 60000) / 1000)) } }
      );
    }

    const body = await req.json();
    const { sessionId, resumeText } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    if (!resumeText) {
      return NextResponse.json(
        { error: "Missing resume text" },
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

    // Generate DOCX
    const docxBuffer = await generateDocxResume(resumeText);

    // Return the DOCX file
    return new NextResponse(docxBuffer as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="federal-resume.docx"',
        'Content-Length': docxBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error("DOCX generation error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate DOCX. Please try again." },
      { status: 500 }
    );
  }
}