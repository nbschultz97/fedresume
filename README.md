# FedResume.ai

AI-powered civilian-to-federal resume converter. Paste your resume + a USAJobs listing → get a properly formatted federal resume with KSAs, specialized experience blocks, and GS-level language.

**$9.99 per conversion** — no subscription.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout
- **AI:** Google Gemini 2.0 Flash
- **Hosting:** Vercel

## Development

```bash
npm install
cp .env.example .env.local  # Fill in your keys
npm run dev
```

## Stripe Setup

```bash
npm run setup-stripe  # Creates product + price in Stripe
```

## Deploy

```bash
npx vercel --prod
```

## License

Proprietary — Ceradon Systems
