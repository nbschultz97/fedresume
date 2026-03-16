"use client";

import Link from "next/link";
import { useState } from "react";

const benefits = [
  {
    id: "linkedin",
    title: "LinkedIn Premium Free for Veterans",
    description: "Get 1 year of LinkedIn Premium completely free. Access advanced networking tools, premium insights, and unlimited profile views.",
    eligibility: "All veterans, active duty, guard/reserve, and military spouses",
    howToApply: "Visit linkedin.com/veterans and verify your military status",
    link: "https://linkedin.com/veterans",
    category: "Career",
    icon: "💼"
  },
  {
    id: "skillbridge",
    title: "SkillBridge Program",
    description: "Get paid apprenticeships and internships during your last 6 months of service. Work with industry leaders while still receiving military pay.",
    eligibility: "Active duty service members in their final 6 months of service",
    howToApply: "Search opportunities at skillbridge.osd.mil and get command approval",
    link: "https://skillbridge.osd.mil",
    category: "Career",
    icon: "🎓"
  },
  {
    id: "vettec",
    title: "VET TEC Program", 
    description: "VA-funded coding bootcamps and tech training programs. Get full tuition coverage plus housing allowance without using GI Bill benefits.",
    eligibility: "Veterans eligible for VA education benefits with at least 1 day of unexpired entitlement",
    howToApply: "Apply through VA.gov and choose from approved training providers",
    link: "https://va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/",
    category: "Education",
    icon: "💻"
  },
  {
    id: "hire-heroes",
    title: "Hire Heroes USA",
    description: "Free career coaching, resume writing, job search assistance, and networking for military members and veterans.",
    eligibility: "Military service members, veterans, and military spouses",
    howToApply: "Register at hireheroesusa.org and complete the intake process",
    link: "https://hireheroesusa.org",
    category: "Career",
    icon: "🚀"
  },
  {
    id: "acp",
    title: "American Corporate Partners",
    description: "Free one-on-one mentoring from Fortune 500 executives. Get career guidance, networking opportunities, and industry insights.",
    eligibility: "Veterans, active duty preparing for transition, and military spouses",
    howToApply: "Apply online at acp-usa.org with your goals and background",
    link: "https://acp-usa.org",
    category: "Mentorship",
    icon: "🤝"
  },
  {
    id: "google-veterans",
    title: "Google Veterans Certificate Programs",
    description: "Fast-track tech career certificates in high-growth fields like IT support, data analytics, UX design, and project management.",
    eligibility: "Veterans and military families with discounted or free access",
    howToApply: "Enroll through Grow with Google veterans portal",
    link: "https://grow.google/veterans",
    category: "Education",
    icon: "🏅"
  },
  {
    id: "aws-veterans",
    title: "AWS Veterans Training",
    description: "Free cloud computing training and certification programs. Get hands-on experience with Amazon Web Services technology.",
    eligibility: "Veterans and military spouses",
    howToApply: "Join AWS training programs through their veterans initiative",
    link: "https://aws.amazon.com/education/veterans",
    category: "Education",
    icon: "☁️"
  },
  {
    id: "microsoft-veterans",
    title: "Microsoft Veterans Programs",
    description: "Free Microsoft certifications, software skills training, and career transition support in technology fields.",
    eligibility: "Veterans transitioning to civilian technology careers",
    howToApply: "Access through Microsoft's military affairs program",
    link: "https://military.microsoft.com",
    category: "Education",
    icon: "🔧"
  },
  {
    id: "sdvosb",
    title: "SDVOSB Certification",
    description: "Service-Disabled Veteran-Owned Small Business certification provides contracting advantages and set-aside opportunities.",
    eligibility: "Veterans with service-connected disabilities who own 51%+ of the business",
    howToApply: "Apply through SBA.gov or certify.sba.gov",
    link: "https://sba.gov",
    category: "Business",
    icon: "📈"
  },
  {
    id: "veterans-preference",
    title: "Veterans' Preference in Federal Hiring",
    description: "Get preference points in federal job applications. 5 points for veterans, 10 points for disabled veterans.",
    eligibility: "Veterans with honorable discharge; disabled veterans get additional preference",
    howToApply: "Claim on USAJobs applications with DD-214 and disability documentation if applicable",
    link: "https://usajobs.gov",
    category: "Career",
    icon: "⭐"
  },
  {
    id: "schedule-a",
    title: "Schedule A Hiring Authority",
    description: "Non-competitive hiring pathway for veterans with service-connected disabilities. Bypass traditional competitive process.",
    eligibility: "Veterans with 30%+ service-connected disability rating from VA",
    howToApply: "Apply directly to federal agencies using Schedule A authority",
    link: "https://usajobs.gov",
    category: "Career",
    icon: "🎯"
  }
];

const categories = [
  { name: "All", value: "all" },
  { name: "Career", value: "Career" },
  { name: "Education", value: "Education" },
  { name: "Business", value: "Business" },
  { name: "Mentorship", value: "Mentorship" }
];

export default function BenefitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const filteredBenefits = selectedCategory === "all" 
    ? benefits 
    : benefits.filter(benefit => benefit.category === selectedCategory);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'benefits-page' }),
      });

      if (response.ok) {
        setEmailStatus("Thanks! You'll receive weekly veteran career tips.");
        setEmail("");
        setTimeout(() => setEmailStatus(""), 5000);
      } else {
        setEmailStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setEmailStatus("Something went wrong. Please try again.");
    }
  };

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
            <Link href="/benefits" className="text-accent-600 hover:text-accent-800 transition-colors text-sm font-medium">
              Benefits
            </Link>
            <Link href="/#pricing" className="text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium">
              Pricing
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
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-navy-950 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Free Benefits Most Veterans
            <br />
            <span className="text-accent-400">Don't Know About</span>
          </h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Billions in veteran benefits go unclaimed every year. Here's your complete guide to 
            free career resources, training programs, and hiring advantages you've earned.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent-400/20 border border-accent-400/30 rounded-full px-6 py-2">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-accent-200 text-sm">
              100% free resources — no gimmicks
            </span>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-8 px-4 bg-accent-400/10 border-b border-accent-200">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-navy-900">Get Weekly Veteran Career Tips</h3>
              <p className="text-navy-600 text-sm">Job opportunities, benefits updates, and career strategies.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-accent-400 min-w-[250px]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </form>
          {emailStatus && (
            <p className="text-center mt-4 text-sm text-green-600">{emailStatus}</p>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-accent-400 text-navy-950'
                    : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <div key={benefit.id} className="card border border-navy-200 hover:border-accent-300 transition-all h-full">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{benefit.icon}</span>
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
                      benefit.category === 'Career' ? 'bg-blue-100 text-blue-800' :
                      benefit.category === 'Education' ? 'bg-green-100 text-green-800' :
                      benefit.category === 'Business' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {benefit.category}
                    </span>
                    <h3 className="text-lg font-bold text-navy-900">{benefit.title}</h3>
                  </div>
                </div>
                
                <p className="text-navy-600 mb-4 leading-relaxed">{benefit.description}</p>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <span className="font-medium text-navy-800">Eligibility:</span>
                    <p className="text-navy-600">{benefit.eligibility}</p>
                  </div>
                  <div>
                    <span className="font-medium text-navy-800">How to Apply:</span>
                    <p className="text-navy-600">{benefit.howToApply}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href={benefit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-400 text-navy-950 rounded-lg hover:bg-accent-500 transition-colors font-medium text-sm"
                  >
                    Apply Now
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-navy-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready to Apply for Federal Jobs?
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            Don't let your resume format hold you back. Convert your civilian resume 
            to proper federal format in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/convert" className="btn-primary text-lg">
              Convert My Resume — FREE
            </Link>
            <Link href="/" className="px-6 py-3 text-navy-600 border border-navy-300 rounded-lg hover:border-navy-400 transition-colors font-medium">
              Learn More
            </Link>
          </div>
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
              <Link href="/privacy" className="text-navy-400 hover:text-navy-200 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-navy-400 hover:text-navy-200 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}