import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Rate limiting check (simple IP-based)
    const clientIP = request.ip || 'unknown';
    const now = Date.now();
    const rateLimit = 5; // 5 signups per minute
    const rateLimitWindow = 60 * 1000; // 1 minute

    // Store email in simple JSON file (for demo purposes)
    const dataDir = path.join(process.cwd(), 'data');
    const emailsFile = path.join(dataDir, 'emails.json');
    const rateLimitFile = path.join(dataDir, 'rate-limits.json');

    // Ensure data directory exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Check rate limiting
    let rateLimits: Record<string, { count: number; timestamp: number }> = {};
    try {
      const rateLimitData = await fs.readFile(rateLimitFile, 'utf-8');
      rateLimits = JSON.parse(rateLimitData);
    } catch {
      // File doesn't exist yet
    }

    const clientLimit = rateLimits[clientIP];
    if (clientLimit && now - clientLimit.timestamp < rateLimitWindow) {
      if (clientLimit.count >= rateLimit) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
      clientLimit.count += 1;
    } else {
      rateLimits[clientIP] = { count: 1, timestamp: now };
    }

    // Clean up old rate limit entries
    Object.keys(rateLimits).forEach(ip => {
      if (now - rateLimits[ip].timestamp > rateLimitWindow) {
        delete rateLimits[ip];
      }
    });

    await fs.writeFile(rateLimitFile, JSON.stringify(rateLimits, null, 2));

    // Read existing emails
    let emails: Array<{ email: string; source: string; timestamp: number }> = [];
    try {
      const emailData = await fs.readFile(emailsFile, 'utf-8');
      emails = JSON.parse(emailData);
    } catch {
      // File doesn't exist yet
    }

    // Check if email already exists
    if (emails.some(e => e.email === email)) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 });
    }

    // Add new email
    emails.push({
      email,
      source: source || 'unknown',
      timestamp: now
    });

    await fs.writeFile(emailsFile, JSON.stringify(emails, null, 2));

    return NextResponse.json({ message: 'Email added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}