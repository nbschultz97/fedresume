import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FedResume — Convert Your Resume to Federal Format in Minutes",
  description:
    "AI-powered federal resume converter. Paste your civilian resume and a USAJobs listing, get a properly formatted federal resume with KSAs, specialized experience, and GS-level language. $9.99 per conversion.",
  keywords: [
    "federal resume",
    "USAJobs resume",
    "federal resume converter",
    "civilian to federal resume",
    "KSA",
    "government resume",
    "federal job application",
  ],
  openGraph: {
    title: "FedResume — AI Federal Resume Converter",
    description:
      "Convert your civilian resume to federal format in minutes. USAJobs-compatible. $9.99.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
