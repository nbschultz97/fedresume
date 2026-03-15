import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Strip markdown formatting from AI output.
 * USAJobs text fields render raw markdown as literal asterisks/hashes.
 */
function stripMarkdown(text: string): string {
  return text
    // Remove bold/italic markers
    .replace(/\*\*\*(.*?)\*\*\*/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, "")
    // Replace markdown bullet points with dashes
    .replace(/^\s*\*\s+/gm, "- ")
    // Remove backticks
    .replace(/`([^`]*)`/g, "$1")
    // Remove "Desired Salary" lines (federal pay is GS scale)
    .replace(/^.*desired\s+salary.*$/gim, "")
    // Clean up any double blank lines left behind
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function convertToFederalResume(
  civilianResume: string,
  jobListing: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert federal resume writer with 20+ years of experience helping civilians transition to government positions. You deeply understand OPM (Office of Personnel Management) standards, USAJobs requirements, and federal HR screening processes.

TASK: Convert the following civilian resume into a properly formatted federal resume tailored to the specific job listing provided.

CIVILIAN RESUME:
---
${civilianResume}
---

TARGET JOB LISTING:
---
${jobListing}
---

CRITICAL DATA INTEGRITY RULES — VIOLATING THESE INVALIDATES THE ENTIRE RESUME:
- NEVER change, inflate, round up, or fabricate any numbers from the source resume
- Dollar amounts must be EXACTLY as provided (if they wrote $4.2M, output $4.2M — NOT $20M, NOT $5M)
- Team sizes must be EXACTLY as provided (if they wrote 18 engineers, output 18 — NOT 20, NOT 25)
- Percentages must be EXACTLY as provided (23% stays 23%)
- Dates must be EXACTLY as provided
- Job titles must be EXACTLY as provided
- If a metric is not in the source resume, DO NOT invent one — describe the accomplishment without fake numbers
- You may restructure, reword, and enhance HOW things are described, but NEVER change WHAT happened

FEDERAL RESUME REQUIREMENTS — Follow these exactly:

1. CONTACT BLOCK (top of resume):
   - Full legal name
   - Complete mailing address
   - Phone number(s)
   - Email address
   - Citizenship: United States (assume unless stated otherwise)
   - Veterans' Preference: [VERIFY — check with applicant]
   - Highest Federal Civilian Grade Held: N/A (or extract from resume if applicable)
   - Security Clearance: [Extract from resume or mark N/A]
   - Do NOT include "Desired Salary" — federal pay is determined by GS scale

2. PROFESSIONAL SUMMARY (3-5 sentences):
   - Write a targeted summary using language from the job listing
   - Include total years of relevant experience
   - Reference the specific series/grade (e.g., GS-0343-12)
   - Use federal terminology

3. WORK EXPERIENCE (most critical section — for EACH position):
   - Job Title (official title from source resume, unchanged)
   - Employer name and full address
   - Supervisor: [Name, Phone — mark as [PLACEHOLDER] if not in source resume]
   - Start Date - End Date (MM/YYYY format)
   - Hours per week: [Extract or estimate 40 for full-time]
   - Salary: [Extract or mark [PLACEHOLDER]]
   - Series/Grade: N/A (for non-federal positions)

   Then write DETAILED accomplishment narratives that:
   - Start with action verbs
   - Include the EXACT metrics, dollar amounts, team sizes, and outcomes FROM THE SOURCE RESUME
   - Mirror the language and keywords from the job listing's duties and qualifications
   - Demonstrate the specialized experience requirements explicitly
   - Each narrative should be 2-4 sentences with concrete details
   - Only quantify with numbers that appear in the source resume

4. EDUCATION:
   - Degree, Major, Institution name and location
   - Graduation date (or expected)
   - GPA if 3.0+ (on a 4.0 scale)
   - Relevant coursework if it supports the position

5. CERTIFICATIONS AND TRAINING:
   - List all relevant certifications with issuing body and dates
   - Include any government-relevant training (FAC-COR, PMP, DAWIA, etc.)

6. KSA NARRATIVES (Knowledge, Skills, and Abilities):
   - Extract the key KSAs from the job listing's qualification requirements
   - For each KSA, write a CCAR narrative (Context, Challenge, Action, Result)
   - Each narrative should be 100-150 words — be CONCISE, not padded
   - Use specific examples from the applicant's experience with EXACT figures from the source
   - Directly address the specialized experience requirements
   - Federal HR reviewers skim these — every sentence must earn its place

7. ADDITIONAL INFORMATION:
   - Awards and recognitions
   - Professional affiliations
   - Volunteer experience (if relevant)
   - Language skills
   - Technical skills and tools

FORMATTING RULES — THIS IS CRITICAL:
- Output PLAIN TEXT ONLY — absolutely NO markdown
- No asterisks (*), no bold (**), no headers (#), no backticks
- Use ALL CAPS for section headers (e.g., WORK EXPERIENCE, EDUCATION)
- Use dashes (-) for bullet points
- Keep line lengths reasonable
- Federal resumes should be 3-5 pages — be thorough but not padded
- Do NOT fabricate experience — only restructure and enhance what is provided
- If information is missing (supervisor name, salary), use [PLACEHOLDER] notation
- Mirror exact keywords from the job listing throughout the resume
- Do NOT include "Desired Salary" — this does not apply to federal positions

OUTPUT: Return ONLY the completed federal resume as plain text. No commentary, no explanations, no preamble. Just the resume, ready to paste into USAJobs.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text();

  if (!text || text.length < 200) {
    throw new Error("AI generated insufficient content. Please try again.");
  }

  // Post-process: strip any markdown that slipped through
  text = stripMarkdown(text);

  return text;
}
