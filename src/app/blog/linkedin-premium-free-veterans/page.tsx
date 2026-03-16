import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Premium is Free for Veterans — Here's How to Claim It | FedResume",
  description: "Step-by-step guide to claiming your free year of LinkedIn Premium as a veteran, active duty, or military spouse. Learn how to unlock premium networking features.",
  keywords: ["LinkedIn Premium", "veterans", "military", "free LinkedIn", "veteran benefits", "career networking"],
  openGraph: {
    title: "LinkedIn Premium is Free for Veterans — Here's How to Claim It",
    description: "Get free LinkedIn Premium for a full year. Available to all veterans, active duty, and military spouses.",
    type: "article",
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "LinkedIn Premium is Free for Veterans — Here's How to Claim It",
  author: {
    "@type": "Organization",
    name: "FedResume"
  },
  publisher: {
    "@type": "Organization", 
    name: "Ceradon Systems",
    url: "https://ceradonsystems.com"
  },
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  description: "Complete guide to claiming free LinkedIn Premium for veterans, active duty, and military spouses."
};

export default function LinkedInPremiumPost() {
  return (
    <main className="min-h-screen bg-white">
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
            <Link href="/benefits" className="text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              Benefits
            </Link>
            <Link href="/blog" className="text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link
              href="/convert"
              className="px-5 py-2.5 text-sm font-semibold text-navy-950 bg-accent-400 rounded-lg hover:bg-accent-500 transition-all"
            >
              Convert Resume
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="inline-block px-3 py-1 bg-accent-100 text-accent-800 text-sm font-medium rounded-full mb-4">
              Veterans Benefits
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              LinkedIn Premium is Free for Veterans — Here's How to Claim It
            </h1>
            <div className="flex items-center justify-center gap-4 text-navy-500 text-sm">
              <span>March 16, 2026</span>
              <span>•</span>
              <span>4 min read</span>
              <span>•</span>
              <span>By FedResume</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-accent-50 border-l-4 border-accent-400 p-6 mb-8">
              <p className="text-lg font-medium text-navy-900 mb-2">Quick Summary</p>
              <p className="text-navy-600 mb-0">Veterans, active duty service members, Guard/Reserve, and military spouses get LinkedIn Premium free for one full year. This benefit is worth $600+ and includes advanced networking tools, premium insights, and unlimited profile views.</p>
            </div>

            <p className="text-xl text-navy-600 leading-relaxed mb-8">
              LinkedIn Premium normally costs $59.99 per month, but if you've served in the military, you can get it completely free for a full year. Here's exactly how to claim this benefit and what you'll unlock.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">Who's Eligible?</h2>
            <p>LinkedIn's military offer covers a broad range of people connected to military service:</p>
            <ul className="mb-8">
              <li><strong>All veterans</strong> with honorable discharge</li>
              <li><strong>Active duty</strong> service members (all branches)</li>
              <li><strong>National Guard and Reserve</strong> members</li>
              <li><strong>Military spouses</strong> and dependents</li>
              <li><strong>Transitioning service members</strong> within 12 months of separation</li>
            </ul>
            
            <p>You don't need to be looking for a job to qualify — this benefit applies whether you're employed, unemployed, or still serving.</p>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">What You Get with LinkedIn Premium</h2>
            <p>LinkedIn Premium unlocks several powerful networking and job search features:</p>
            <div className="bg-navy-50 p-6 rounded-lg mb-8">
              <ul className="space-y-3">
                <li><strong>InMail credits:</strong> Send direct messages to anyone on LinkedIn, even if you're not connected</li>
                <li><strong>Advanced search filters:</strong> Find people by company, location, seniority level, and more</li>
                <li><strong>See who viewed your profile:</strong> Get full details on profile visitors, not just summary statistics</li>
                <li><strong>Salary insights:</strong> View salary ranges for jobs you're interested in</li>
                <li><strong>LinkedIn Learning:</strong> Access to thousands of professional development courses</li>
                <li><strong>Premium career insights:</strong> See how you compare to other applicants for jobs</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">Step-by-Step: How to Claim Your Free Year</h2>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-accent-400 pl-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">Step 1: Visit LinkedIn Veterans Page</h3>
                <p>Go to <a href="https://linkedin.com/veterans" className="text-accent-600 hover:text-accent-800 underline" target="_blank" rel="noopener noreferrer">linkedin.com/veterans</a> and click "Get Premium Free"</p>
              </div>

              <div className="border-l-4 border-accent-400 pl-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">Step 2: Verify Your Military Status</h3>
                <p>You'll be asked to verify your military connection through one of these methods:</p>
                <ul>
                  <li>Upload your DD-214 (veterans)</li>
                  <li>Upload military ID (active duty)</li>
                  <li>Provide military email address (@mil domain)</li>
                  <li>Use spouse verification if applying as military family member</li>
                </ul>
              </div>

              <div className="border-l-4 border-accent-400 pl-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">Step 3: Choose Your Premium Plan</h3>
                <p>Select which premium tier you want (Career or Business). Career is usually the best choice for job seekers and career changers.</p>
              </div>

              <div className="border-l-4 border-accent-400 pl-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">Step 4: Activate Your Account</h3>
                <p>Once verified, your Premium features activate immediately. You'll see the Premium badge on your profile within minutes.</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold text-green-800 mb-2">💡 Pro Tip</h3>
              <p className="text-green-700 mb-0">Set a calendar reminder 11 months from activation to decide whether you want to continue with paid Premium. LinkedIn will automatically start billing you after the free year unless you cancel.</p>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">Make the Most of Your Free Premium</h2>
            <p>Don't let this valuable benefit go to waste. Here are the highest-impact ways to use LinkedIn Premium:</p>

            <ol className="mb-8 space-y-4">
              <li><strong>Connect with hiring managers:</strong> Use InMail to reach out directly to recruiters at companies you want to work for</li>
              <li><strong>Research salary ranges:</strong> Use salary insights before negotiations to know your market value</li>
              <li><strong>Take LinkedIn Learning courses:</strong> Add certifications to your profile in relevant skills</li>
              <li><strong>Study your competition:</strong> See who else is applying for jobs you want and how you compare</li>
              <li><strong>Expand your network strategically:</strong> Use advanced search to find and connect with industry leaders</li>
            </ol>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">Common Issues and Solutions</h2>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="font-bold text-navy-900">Problem: Verification documents rejected</h4>
                <p className="text-navy-600">Solution: Make sure all text on your DD-214 or military ID is clearly readable. Try scanning at higher resolution or taking a photo in good lighting.</p>
              </div>
              <div>
                <h4 className="font-bold text-navy-900">Problem: Already have Premium subscription</h4>
                <p className="text-navy-600">Solution: Cancel your current subscription first, then apply for the military benefit. LinkedIn will extend your current subscription for the free year.</p>
              </div>
              <div>
                <h4 className="font-bold text-navy-900">Problem: Verification taking too long</h4>
                <p className="text-navy-600">Solution: Verification usually takes 2-5 business days. If it's been longer, contact LinkedIn support directly.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-6">Beyond LinkedIn: Other Free Benefits You Should Claim</h2>
            <p>LinkedIn Premium is just one of many free benefits available to veterans. Don't stop here:</p>
            <ul className="mb-8">
              <li><strong>SkillBridge Program:</strong> Paid internships during your last 6 months of service</li>
              <li><strong>VET TEC:</strong> Free coding bootcamps and tech training (doesn't use GI Bill)</li>
              <li><strong>Google Career Certificates:</strong> Free tech certifications for veterans</li>
              <li><strong>Hire Heroes USA:</strong> Free career coaching and resume writing</li>
            </ul>
            <p>Check out our <Link href="/benefits" className="text-accent-600 hover:text-accent-800 underline">complete veterans benefits guide</Link> to see what else you're eligible for.</p>

            <div className="bg-navy-50 p-8 rounded-lg text-center mt-12">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Ready to Take the Next Step?</h3>
              <p className="text-navy-600 mb-6">LinkedIn Premium will help you network and research opportunities, but you still need a federal resume that actually gets through the screening process.</p>
              <Link href="/convert" className="btn-primary">
                Convert Your Resume to Federal Format — FREE
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 bg-navy-950 text-navy-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
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
              product — Veteran-Founded SDVOSB · © {new Date().getFullYear()}
            </span>
            <span className="hidden sm:inline text-navy-600">·</span>
            <div className="flex gap-4">
              <Link href="/benefits" className="text-navy-400 hover:text-navy-200 transition-colors">Benefits</Link>
              <Link href="/blog" className="text-navy-400 hover:text-navy-200 transition-colors">Blog</Link>
              <Link href="/privacy" className="text-navy-400 hover:text-navy-200 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-navy-400 hover:text-navy-200 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}