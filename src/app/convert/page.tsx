"use client";

import Link from "next/link";
import { useState } from "react";

export default function ConvertPage() {
  const [resume, setResume] = useState("");
  const [jobListing, setJobListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!resume.trim() || resume.trim().length < 100) {
      setError("Please paste your full resume (at least 100 characters).");
      return;
    }
    if (!jobListing.trim() || jobListing.trim().length < 50) {
      setError("Please paste the job listing (at least 50 characters).");
      return;
    }

    setLoading(true);

    try {
      // Store resume data in sessionStorage for retrieval after payment
      sessionStorage.setItem(
        "fedresume_data",
        JSON.stringify({ resume, jobListing })
      );

      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeLength: resume.length,
          jobListingLength: jobListing.length,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy-50">
      <nav className="bg-white border-b border-navy-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
              <span className="text-accent-400 font-bold text-sm">FR</span>
            </div>
            <span className="font-bold text-xl text-navy-900">
              Fed<span className="text-navy-500">Resume</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Convert Your Resume
          </h1>
          <p className="text-navy-500 text-lg max-w-xl mx-auto">
            Paste your civilian resume and the USAJobs listing below. We'll
            convert it to proper federal format instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card">
            <label
              htmlFor="resume"
              className="block text-lg font-semibold text-navy-900 mb-2"
            >
              Your Current Resume
            </label>
            <p className="text-sm text-navy-400 mb-4">
              Paste your full civilian resume. Include all experience, education,
              and skills.
            </p>
            <textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={12}
              className="w-full border border-navy-200 rounded-xl p-4 text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-y text-sm leading-relaxed"
              placeholder={`John Smith
San Antonio, TX | john.smith@email.com | (555) 123-4567

EXPERIENCE

Senior Project Manager — Acme Corp (2019-Present)
• Led cross-functional teams of 12-15 members...
• Managed $2.5M annual budget...

...paste your complete resume here`}
            />
            <div className="text-right mt-1 text-xs text-navy-300">
              {resume.length > 0 && `${resume.length.toLocaleString()} characters`}
            </div>
          </div>

          <div className="card">
            <label
              htmlFor="jobListing"
              className="block text-lg font-semibold text-navy-900 mb-2"
            >
              USAJobs Listing
            </label>
            <p className="text-sm text-navy-400 mb-4">
              Paste the full job announcement from USAJobs. Include duties,
              qualifications, and requirements.
            </p>
            <textarea
              id="jobListing"
              value={jobListing}
              onChange={(e) => setJobListing(e.target.value)}
              rows={10}
              className="w-full border border-navy-200 rounded-xl p-4 text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-y text-sm leading-relaxed"
              placeholder={`Program Analyst, GS-0343-12
Department of Defense
Duty Location: Washington, DC

Duties:
• Serves as Program Analyst responsible for...

Qualifications:
Specialized Experience: You must have one year of specialized experience...

...paste the full job listing here`}
            />
            <div className="text-right mt-1 text-xs text-navy-300">
              {jobListing.length > 0 &&
                `${jobListing.length.toLocaleString()} characters`}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Continue to Payment — $9.99"
              )}
            </button>
            <p className="text-sm text-navy-400 mt-4">
              Secure payment via Stripe · Your resume is generated after payment
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
