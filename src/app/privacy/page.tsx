import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | FedResume",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-white border-b border-navy-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
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

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Privacy Policy</h1>
        <p className="text-navy-400 mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-navy max-w-none space-y-8 text-navy-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">What We Collect</h2>
            <p>When you use FedResume, we process:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Resume text</strong> — the civilian resume you paste into the converter</li>
              <li><strong>Job listing text</strong> — the USAJobs announcement you paste</li>
              <li><strong>Payment information</strong> — processed by Stripe (we never see your card number)</li>
              <li><strong>IP address</strong> — for rate limiting and abuse prevention only</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your resume and job listing text are sent to Google&apos;s Gemini AI to generate your federal resume</li>
              <li>This data is processed in real-time and is <strong>not stored</strong> on our servers after generation</li>
              <li>We do not use your resume data for AI training</li>
              <li>We do not sell, share, or distribute your personal information to third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Stripe</strong> — payment processing. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-600 underline">Stripe&apos;s Privacy Policy</a></li>
              <li><strong>Google Gemini AI</strong> — resume generation. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-600 underline">Google&apos;s Privacy Policy</a></li>
              <li><strong>Vercel</strong> — hosting. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent-600 underline">Vercel&apos;s Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Data Retention</h2>
            <p>We do not permanently store your resume or job listing data. After your federal resume is generated and delivered to your browser, the data is discarded. Stripe retains payment records per their policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Cookies</h2>
            <p>We use essential cookies only (session management). We do not use tracking cookies or third-party analytics.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Your Rights</h2>
            <p>You can request deletion of any data associated with your payment by contacting us at <a href="mailto:noah@ceradonsystems.com" className="text-accent-600 underline">noah@ceradonsystems.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Contact</h2>
            <p>
              Ceradon Systems LLC<br />
              Email: <a href="mailto:noah@ceradonsystems.com" className="text-accent-600 underline">noah@ceradonsystems.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
