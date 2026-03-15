import { NextRequest, NextResponse } from "next/server";
import { convertToFederalResume, scoreResumeAgainstJob } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - more restrictive for free tier
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip, 'free-generation'); // Different key for free tier
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateCheck.retryAfterMs || 60000) / 1000)) } }
      );
    }

    const body = await req.json();
    const { email, resume, jobListing } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!resume || !jobListing) {
      return NextResponse.json(
        { error: "Resume and job listing are required" },
        { status: 400 }
      );
    }

    if (resume.length < 100) {
      return NextResponse.json(
        { error: "Resume must be at least 100 characters long" },
        { status: 400 }
      );
    }

    if (jobListing.length < 50) {
      return NextResponse.json(
        { error: "Job listing must be at least 50 characters long" },
        { status: 400 }
      );
    }

    // Store email (simple append to file for now - in production would use proper DB)
    try {
      await storeEmail(email);
    } catch (error) {
      console.error("Failed to store email:", error);
      // Don't fail the request for email storage issues
    }

    // Generate the federal resume
    const federalResume = await convertToFederalResume(
      resume.slice(0, 50000),
      jobListing.slice(0, 50000)
    );

    // Generate the scoring report
    const scoring = await scoreResumeAgainstJob(
      federalResume,
      jobListing.slice(0, 50000)
    );

    return NextResponse.json({ 
      resume: federalResume,
      scoring: scoring 
    });

  } catch (error: any) {
    console.error("Free generation error:", error);

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

async function storeEmail(email: string) {
  // Simple file append for now - in production would use proper database
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const emailsFile = path.join(process.cwd(), 'data', 'emails.txt');
  
  // Ensure directory exists
  try {
    await fs.mkdir(path.dirname(emailsFile), { recursive: true });
  } catch (e) {
    // Directory might already exist
  }
  
  // Append email with timestamp
  const timestamp = new Date().toISOString();
  const emailLine = `${timestamp},${email}\n`;
  
  try {
    await fs.appendFile(emailsFile, emailLine);
  } catch (e) {
    console.error("Failed to append to emails file:", e);
  }
}