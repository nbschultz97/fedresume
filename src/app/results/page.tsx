"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found. Please start a new conversion.");
      setLoading(false);
      return;
    }

    async function generateResume() {
      try {
        // Retrieve stored resume data
        const stored = sessionStorage.getItem("fedresume_data");
        if (!stored) {
          setError(
            "Resume data not found. This can happen if you used a different browser tab or cleared your session. Please start a new conversion."
          );
          setLoading(false);
          return;
        }

        const { resume, jobListing } = JSON.parse(stored);

        const res = await fetch("/api/get-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, resume, jobListing }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to generate resume");
        }

        setResult(data.resume);
        // Clean up stored data
        sessionStorage.removeItem("fedresume_data");
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    generateResume();
  }, [sessionId]);

  function handleCopy() {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleDownload() {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "federal-resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-navy-500">
              <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
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
              <span className="text-xl font-medium">
                Generating your federal resume...
              </span>
            </div>
            <p className="text-navy-400 mt-4">
              This usually takes 30-60 seconds. Please don't close this tab.
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-navy-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-navy-500 mb-8 max-w-md mx-auto">{error}</p>
            <Link href="/convert" className="btn-primary">
              Start New Conversion
            </Link>
          </div>
        )}

        {result && !loading && (
          <>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-navy-900 mb-3">
                Your Federal Resume is Ready
              </h1>
              <p className="text-navy-500">
                Review the content below, then copy or download.
              </p>
            </div>

            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-navy-900">
                  Federal Resume
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm font-medium text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy All"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 text-sm font-medium text-white bg-navy-800 rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    ⬇ Download .txt
                  </button>
                </div>
              </div>
              <div className="bg-navy-50 rounded-xl p-6 overflow-auto max-h-[700px]">
                <pre className="whitespace-pre-wrap text-sm text-navy-800 leading-relaxed font-mono">
                  {result}
                </pre>
              </div>
            </div>

            <div className="card bg-accent-50 border-accent-200">
              <h3 className="font-bold text-navy-900 mb-3">
                💡 Before You Submit to USAJobs
              </h3>
              <ul className="space-y-2 text-sm text-navy-600">
                <li>
                  ✓ Review all dates, job titles, and contact info for accuracy
                </li>
                <li>
                  ✓ Fill in any [PLACEHOLDER] fields with your actual information
                </li>
                <li>
                  ✓ Verify hours worked per week and salary figures
                </li>
                <li>
                  ✓ Add supervisor names and phone numbers where needed
                </li>
                <li>
                  ✓ Submit through USAJobs.gov — do not email applications
                </li>
              </ul>
            </div>

            <div className="text-center mt-10">
              <Link href="/convert" className="btn-secondary">
                Convert Another Resume
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-navy-100 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-sm text-navy-400">
          A{" "}
          <a
            href="https://ceradonsystems.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-navy-600 underline"
          >
            Ceradon Systems
          </a>{" "}
          product · © {new Date().getFullYear()}
        </div>
      </footer>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-navy-50">
          <div className="text-navy-400 text-lg">Loading...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
