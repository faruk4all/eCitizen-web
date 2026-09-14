import { NextResponse } from 'next/server';

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: bots should fill this, real users should not.
    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const lead = {
      name: clean(body.name, 120),
      phone: clean(body.phone, 40),
      email: clean(body.email, 160),
      service: clean(body.service, 120),
      message: clean(body.message, 2000),
      source: clean(body.source || 'website', 120),
      createdAt: new Date().toISOString(),
    };

    if (!lead.name || !lead.phone) {
      return NextResponse.json(
        { ok: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    // Optional Google Sheets/automation webhook.
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        cache: 'no-store',
      });
    }

    // Optional email notification through Resend.
    if (process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL && process.env.LEAD_TO_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL,
          to: [process.env.LEAD_TO_EMAIL],
          subject: `New eCitizen Digital lead — ${lead.name}`,
          text:
            `Name: ${lead.name}\n` +
            `Phone: ${lead.phone}\n` +
            `Email: ${lead.email || '-'}\n` +
            `Service: ${lead.service || '-'}\n` +
            `Message: ${lead.message || '-'}\n` +
            `Source: ${lead.source}\n` +
            `Created: ${lead.createdAt}`,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to process the request.' },
      { status: 500 }
    );
  }
}
