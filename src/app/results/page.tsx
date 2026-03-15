"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ScoringData {
  overallScore: number;
  keywordMatches: string[];
  coveredRequirements: string[];
  gaps: string[];
  recommendations: string[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const mode = searchParams.get("mode");
  const [result, setResult] = useState<string | null>(null);
  const [scoring, setScoring] = useState<ScoringData | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);

  useEffect(() => {
    async function loadResults() {
      try {
        if (mode === "free") {
          // Handle free tier results
          const stored = sessionStorage.getItem("fedresume_free_data");
          if (!stored) {
            setError("Result data not found. Please start a new conversion.");
            setLoading(false);
            return;
          }

          const data = JSON.parse(stored);
          setResult(data.resume);
          setScoring(data.scoring);
          setUserEmail(data.email);
          setLoading(false);
          // Clean up stored data
          sessionStorage.removeItem("fedresume_free_data");
          return;
        }

        // Handle paid tier results
        if (!sessionId) {
          setError("No session ID found. Please start a new conversion.");
          setLoading(false);
          return;
        }

        // Retrieve stored resume data
        const stored = sessionStorage.getItem("fedresume_data");
        if (!stored) {
          setError(
            "Resume data not found. This can happen if you used a different browser tab or cleared your session. Please start a new conversion."
          );
          setLoading(false);
          return;
        }

        const { resume, jobListing, email } = JSON.parse(stored);
        setUserEmail(email || "");

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
        if (data.scoring) {
          setScoring(data.scoring);
        }
        
        // Clean up stored data
        sessionStorage.removeItem("fedresume_data");
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [sessionId, mode]);

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

  async function handleDocxDownload() {
    if (!result || !sessionId || downloadingDocx) return;

    setDownloadingDocx(true);

    try {
      const res = await fetch("/api/download-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, resumeText: result }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate DOCX");
      }

      // Download the file
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "federal-resume.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err: any) {
      setError(err.message || "Failed to download DOCX. Please try again.");
    } finally {
      setDownloadingDocx(false);
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

            {/* Scoring Report */}
            {scoring && (
              <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Resume Analysis & Score
                </h2>
                
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {scoring.overallScore}%
                    </div>
                    <div className="text-sm text-navy-600">Overall Match</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {scoring.keywordMatches.length}
                    </div>
                    <div className="text-sm text-navy-600">Keywords Matched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {scoring.coveredRequirements.length}
                    </div>
                    <div className="text-sm text-navy-600">Requirements Met</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {scoring.gaps.length}
                    </div>
                    <div className="text-sm text-navy-600">Areas to Improve</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-2">✅ Keywords Matched</h3>
                    <div className="flex flex-wrap gap-2">
                      {scoring.keywordMatches.slice(0, 8).map((keyword, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                      {scoring.keywordMatches.length > 8 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{scoring.keywordMatches.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-2">💡 Top Recommendations</h3>
                    <ul className="space-y-1 text-sm text-navy-600">
                      {scoring.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {mode === "free" && (
                  <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-navy-900">Want Detailed Analysis?</h4>
                        <p className="text-sm text-navy-600">Upgrade to Pro for gap analysis and DOCX download</p>
                      </div>
                      <Link href="/convert" className="btn-primary text-sm">
                        Upgrade to Pro
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

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
                    className="px-4 py-2 text-sm font-medium text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                  >
                    ⬇ Download .txt
                  </button>
                  {mode !== "free" && sessionId && (
                    <button
                      onClick={handleDocxDownload}
                      disabled={downloadingDocx}
                      className="px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingDocx ? "Creating..." : "📄 Download Word (.docx)"}
                    </button>
                  )}
                  {mode === "free" && (
                    <Link
                      href="/convert"
                      className="px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors"
                    >
                      🔒 Upgrade for DOCX
                    </Link>
                  )}
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
