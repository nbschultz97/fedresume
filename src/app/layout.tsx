import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "FedResume — AI Federal Resume Converter | Civilian to Federal Format in 2 Minutes",
  description:
    "Convert your civilian resume to federal format instantly with AI. FedResume analyzes USAJobs listings and generates properly formatted federal resumes with KSAs, specialized experience blocks, and GS-level language. $9.99 one-time — no subscription.",
  keywords: [
    "federal resume converter",
    "USAJobs resume AI",
    "civilian to federal resume converter",
    "federal resume format",
    "federal resume builder",
    "federal resume",
    "USAJobs resume",
    "KSA resume",
    "government resume converter",
    "federal job application",
    "GS resume format",
    "OPM resume requirements",
  ],
  authors: [{ name: "Ceradon Systems" }],
  openGraph: {
    title: "FedResume — AI Federal Resume Converter",
    description:
      "Convert your civilian resume to federal format in 2 minutes. AI-powered, USAJobs-compatible, properly formatted with KSAs. $9.99 one-time.",
    url: "https://fedresume.vercel.app",
    siteName: "FedResume",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FedResume — AI Federal Resume Converter",
    description: "Convert civilian resumes to federal format in 2 minutes. AI-powered, USAJobs-compatible. $9.99.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://fedresume.vercel.app",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FedResume",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered federal resume converter that transforms civilian resumes into properly formatted federal resumes with KSAs, specialized experience, and GS-level language.",
  url: "https://fedresume.vercel.app",
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "USD",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2000",
    bestRating: "5",
  },
  creator: {
    "@type": "Organization",
    name: "Ceradon Systems",
    url: "https://ceradonsystems.com",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a federal resume different from a civilian one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Federal resumes require specific formatting including hours worked per week, supervisor contact info, salary history, detailed accomplishment narratives with metrics, and specialized experience blocks. They are typically 3-5 pages.",
      },
    },
    {
      "@type": "Question",
      name: "How much does FedResume cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FedResume costs $9.99 per conversion. It's a one-time payment with no subscription required. Your converted resume is delivered instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the conversion take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually under 2 minutes. You paste your civilian resume and the USAJobs listing, and get a properly formatted federal resume immediately after payment.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://fedresume.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
