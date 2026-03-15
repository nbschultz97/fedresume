"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  {
    num: "1",
    title: "Paste Your Resume",
    desc: "Copy and paste your current civilian resume — any format works.",
    icon: "📋",
  },
  {
    num: "2",
    title: "Add the Job Listing",
    desc: "Paste the USAJobs announcement you're targeting. We match your experience to their requirements.",
    icon: "🎯",
  },
  {
    num: "3",
    title: "Get Your Federal Resume",
    desc: "Our AI restructures everything into proper federal format with KSAs, specialized experience blocks, and GS-level language.",
    icon: "📄",
  },
];

const benefits = [
  {
    title: "Proper Federal Format",
    desc: "Hours/week, supervisor info, salary history, detailed narratives — everything USAJobs screening requires.",
    icon: "📋",
  },
  {
    title: "KSA Narratives Built In",
    desc: "Context-Challenge-Action-Result stories extracted from YOUR experience, matched to the listing's requirements.",
    icon: "🎯",
  },
  {
    title: "Keyword Optimized",
    desc: "Mirrors the exact language from the job announcement so automated HR screening doesn't filter you out.",
    icon: "🔍",
  },
];

const faqs = [
  {
    q: "What makes a federal resume different from a civilian one?",
    a: "Federal resumes require specific formatting including hours worked per week, supervisor contact info, salary history, detailed accomplishment narratives with metrics, and specialized experience blocks that match the job announcement's qualification requirements. They're typically 3-5 pages, not 1-2.",
  },
  {
    q: "How does the AI know the right federal format?",
    a: "Our AI is trained on federal resume standards from OPM (Office of Personnel Management), USAJobs guidelines, and successful federal resume examples. It understands GS-level language, KSA requirements, and how to translate civilian experience into federal terminology.",
  },
  {
    q: "Can I use this for any GS level?",
    a: "Yes. Our converter works for all GS levels (GS-5 through GS-15 and SES). It analyzes the specific job listing you provide and tailors your resume to match those exact requirements.",
  },
  {
    q: "What if the result isn't perfect?",
    a: "The AI generates a strong foundation that's 90%+ ready to submit. We recommend a quick review to verify dates and details. No tool — human or AI — should be submitted without a final personal review.",
  },
  {
    q: "How long does the conversion take?",
    a: "Usually under 2 minutes. You'll be redirected to your completed federal resume immediately after payment.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your resume and job listing data are processed in real-time and not stored permanently. We don't sell your data or use it for training.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left group"
      >
        <span className="text-lg font-medium text-navy-800 group-hover:text-navy-600 transition-colors pr-4">
          {q}
        </span>
        <span className="text-2xl text-navy-400 shrink-0 transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-navy-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-navy-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
              <span className="text-accent-400 font-bold text-sm">FR</span>
            </div>
            <span className="font-bold text-xl text-navy-900">
              Fed<span className="text-navy-500">Resume</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hidden sm:inline text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#pricing" className="hidden sm:inline text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#faq" className="hidden sm:inline text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              FAQ
            </a>
            <Link
              href="/convert"
              className="px-5 py-2.5 text-sm font-semibold text-navy-950 bg-accent-400 rounded-lg hover:bg-accent-500 transition-all"
            >
              Convert Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80">
              AI-powered federal resume conversion
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Your Civilian Resume Won't
            <br />
            <span className="text-accent-400">Get You a Federal Job</span>
          </h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Federal resumes follow completely different rules. Wrong format = auto-rejection.
            Our AI converts your resume into a properly formatted, USAJobs-compatible federal
            resume in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/convert" className="btn-primary text-lg">
              Convert My Resume — $9.99
            </Link>
          </div>
          <p className="mt-6 text-sm text-navy-300">
            One-time payment · No subscription · Instant delivery
          </p>
        </div>
      </section>

      {/* Value Props Bar */}
      <section className="py-8 bg-navy-50 border-b border-navy-100">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-navy-900">&lt; 2 min</div>
            <div className="text-sm text-navy-500">Delivery Time</div>
          </div>
          <div className="hidden sm:block w-px bg-navy-200" />
          <div>
            <div className="text-2xl font-bold text-navy-900">$9.99</div>
            <div className="text-sm text-navy-500">One-Time Payment</div>
          </div>
          <div className="hidden sm:block w-px bg-navy-200" />
          <div>
            <div className="text-2xl font-bold text-navy-900">All GS Levels</div>
            <div className="text-sm text-navy-500">GS-5 through SES</div>
          </div>
          <div className="hidden sm:block w-px bg-navy-200" />
          <div>
            <div className="text-2xl font-bold text-navy-900">OPM Format</div>
            <div className="text-sm text-navy-500">USAJobs Compatible</div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading">
            Why Most Civilian Resumes Get Rejected
          </h2>
          <p className="section-subheading">
            Federal hiring is a different world. Here's what trips people up.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Wrong Format",
                desc: "Federal resumes need hours/week, supervisor info, salary history, and detailed narratives. A 1-page PDF won't cut it.",
                icon: "❌",
              },
              {
                title: "Missing Keywords",
                desc: "Federal HR uses automated screening. If your resume doesn't mirror the announcement's exact language, you're filtered out.",
                icon: "🔍",
              },
              {
                title: "No KSA Alignment",
                desc: "Knowledge, Skills, and Abilities must be explicitly demonstrated — not implied. Civilian resumes bury this information.",
                icon: "📊",
              },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-navy-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading">Three Steps. Two Minutes.</h2>
          <p className="section-subheading">
            No accounts, no uploads, no waiting.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-accent-600 mb-2">
                  STEP {step.num}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-navy-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/convert" className="btn-primary">
              Start Converting →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading">
            The Smart Alternative
          </h2>
          <p className="section-subheading">
            Professional federal resume writers charge $200-$500 and take 5-10 business days.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card border-navy-200 opacity-75">
              <h3 className="text-lg font-bold text-navy-400 mb-4">
                Traditional Resume Writer
              </h3>
              <div className="text-4xl font-extrabold text-navy-400 mb-6">
                $200-$500
              </div>
              <ul className="space-y-3 text-navy-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1">⏳</span>5-10 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">📞</span>Phone consultation required
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">🔄</span>Limited revisions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">📧</span>Back-and-forth over email
                </li>
              </ul>
            </div>
            <div className="card border-2 border-accent-400 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-400 text-navy-950 text-sm font-bold px-4 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-4">
                FedResume AI
              </h3>
              <div className="text-4xl font-extrabold text-navy-900 mb-1">
                $9.99
              </div>
              <p className="text-sm text-navy-400 mb-6">one-time payment</p>
              <ul className="space-y-3 text-navy-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>Ready in under 2 minutes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>Tailored to your specific listing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>Proper federal format & KSAs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>Instant download
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>Works for all GS levels
                </li>
              </ul>
              <Link href="/convert" className="btn-primary w-full mt-8">
                Convert Now — $9.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading">What You Get</h2>
          <p className="section-subheading">
            A complete, properly formatted federal resume tailored to your target position.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card text-center">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {b.title}
                </h3>
                <p className="text-navy-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="mt-12 card">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-navy-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Getting Auto-Rejected.
            <br />
            <span className="text-accent-400">Get the Format Right.</span>
          </h2>
          <p className="text-navy-300 text-lg mb-10 max-w-xl mx-auto">
            Your qualifications aren't the problem — your resume format is.
            Fix it in 2 minutes for less than the cost of lunch.
          </p>
          <Link href="/convert" className="btn-primary text-lg">
            Convert My Resume — $9.99
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-navy-950 border-t border-navy-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-navy-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-navy-800 rounded flex items-center justify-center">
              <span className="text-accent-400 font-bold text-xs">FR</span>
            </div>
            <span>FedResume</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>
              A{" "}
              <a
                href="https://ceradonsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-300 hover:text-white transition-colors underline"
              >
                Ceradon Systems
              </a>{" "}
              product · © {new Date().getFullYear()}
            </span>
            <span className="hidden sm:inline text-navy-600">·</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-navy-400 hover:text-navy-200 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-navy-400 hover:text-navy-200 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
