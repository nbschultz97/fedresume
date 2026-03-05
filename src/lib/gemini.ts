import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function convertToFederalResume(
  civilianResume: string,
  jobListing: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

FEDERAL RESUME REQUIREMENTS — Follow these exactly:

1. **CONTACT BLOCK** (top of resume):
   - Full legal name
   - Complete mailing address
   - Phone number(s)
   - Email address
   - Citizenship: United States (assume unless stated otherwise)
   - Veterans' Preference: [Ask applicant to verify] 
   - Highest Federal Civilian Grade Held: N/A (or extract from resume if applicable)
   - Security Clearance: [Extract from resume or mark N/A]

2. **PROFESSIONAL SUMMARY** (3-5 sentences):
   - Write a targeted summary using language from the job listing
   - Include total years of relevant experience
   - Reference the specific series/grade (e.g., GS-0343-12)
   - Use federal terminology

3. **WORK EXPERIENCE** (most critical section — for EACH position):
   - Job Title (Official title, then translated federal equivalent if needed)
   - Employer name and full address
   - Supervisor: [Name, Phone — mark as PLACEHOLDER if not in source resume]
   - Start Date – End Date (MM/YYYY format)
   - Hours per week: [Extract or estimate 40 for full-time]
   - Salary: [Extract or mark PLACEHOLDER]
   - Series/Grade: N/A (for non-federal positions)
   
   Then write DETAILED accomplishment narratives that:
   - Start with action verbs
   - Include specific metrics, dollar amounts, team sizes, and outcomes
   - Mirror the language and keywords from the job listing's duties and qualifications
   - Demonstrate the specialized experience requirements explicitly
   - Each narrative should be 3-5 sentences with concrete details
   - Quantify everything possible (managed X people, $X budget, X% improvement)
   
4. **EDUCATION**:
   - Degree, Major, Institution name and location
   - Graduation date (or expected)
   - GPA if 3.0+ (on a 4.0 scale)
   - Relevant coursework if it supports the position

5. **CERTIFICATIONS & TRAINING**:
   - List all relevant certifications with issuing body and dates
   - Include any government-relevant training (FAC-COR, PMP, DAWIA, etc.)

6. **KSA NARRATIVES** (Knowledge, Skills, and Abilities):
   - Extract the key KSAs from the job listing's qualification requirements
   - For each KSA, write a CCAR narrative (Context, Challenge, Action, Result)
   - Each narrative should be 150-250 words
   - Use specific examples from the applicant's experience
   - Directly address the specialized experience requirements

7. **ADDITIONAL INFORMATION**:
   - Awards and recognitions
   - Professional affiliations
   - Volunteer experience (if relevant)
   - Language skills
   - Technical skills and tools

FORMATTING RULES:
- Use plain text (no markdown headers, no bold, no bullets with special chars)
- Use ALL CAPS for section headers
- Use dashes (-) for bullet points
- Keep line lengths reasonable (wrap at ~80 characters)
- Federal resumes should be 3-5 pages — be THOROUGH, not brief
- Do NOT fabricate experience — only restructure and enhance what's provided
- If information is missing (supervisor name, salary), use [PLACEHOLDER] notation
- Mirror exact keywords from the job listing throughout the resume

OUTPUT: Return ONLY the completed federal resume text. No commentary, no explanations, no headers like "Here is your resume." Just the resume itself, ready to paste into USAJobs.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text || text.length < 200) {
    throw new Error("AI generated insufficient content. Please try again.");
  }

  return text;
}
