import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Career Blog | FedResume",
  description: "Expert advice on federal career transitions, resume writing, and veteran employment opportunities.",
  keywords: ["federal career", "veteran employment", "federal resume", "USAJobs", "government careers"],
};

const blogPosts = [
  {
    slug: "linkedin-premium-free-veterans",
    title: "LinkedIn Premium is Free for Veterans — Here's How to Claim It",
    excerpt: "Step-by-step guide to claiming your free year of LinkedIn Premium as a veteran, active duty, or military spouse.",
    date: "March 16, 2026",
    readTime: "4 min read",
    category: "Benefits"
  },
  {
    slug: "federal-vs-civilian-resume-differences",
    title: "Federal Resume vs Civilian Resume: The 7 Differences That Get You Rejected",
    excerpt: "Understand the critical format differences that separate federal resumes from civilian ones — and why the wrong format means auto-rejection.",
    date: "March 15, 2026", 
    readTime: "6 min read",
    category: "Resume Writing"
  },
  {
    slug: "vet-tec-vs-gi-bill-tech-career",
    title: "VET TEC vs GI Bill: Which Should You Use for a Tech Career?",
    excerpt: "Compare VET TEC and GI Bill benefits for technology training. Learn which program offers better ROI for your career goals.",
    date: "March 14, 2026",
    readTime: "5 min read", 
    category: "Education"
  }
];

export default function BlogPage() {
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
            <Link href="/blog" className="text-accent-600 hover:text-accent-800 transition-colors text-sm font-medium">
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-navy-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">
            Federal Career <span className="text-accent-600">Insights</span>
          </h1>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Expert guidance for veterans and civilians navigating federal career transitions, 
            resume writing, and government employment opportunities.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card border border-navy-200 hover:border-accent-300 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent-100 text-accent-800 text-xs font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-2xl font-bold text-navy-900 mb-3 hover:text-accent-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-navy-600 leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-navy-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-navy-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-800 font-medium transition-colors"
                  >
                    Read Full Article
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-navy-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready to Convert Your Resume?
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            Don't let format issues hold back your federal career. Convert your civilian 
            resume to proper federal format in under 2 minutes.
          </p>
          <Link href="/convert" className="btn-primary text-lg">
            Convert My Resume — FREE
          </Link>
        </div>
      </section>

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
    </main>
  );
}