# eCitizen Digital — Next.js

A Next.js App Router migration of the eCitizen Digital production-oriented static website.

## Included
- App Router architecture
- Reusable global design system
- Responsive dark premium UI
- All Digital Marketing, Web Station, Industry and Blog pages
- Dynamic routes for service/industry/blog pages
- SEO metadata per page
- `robots.txt`, `sitemap.xml`, manifest
- Accessible mobile navigation
- Demo lead forms
- Cookie consent behavior
- 404 page

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Before launch
1. Replace `https://ecitizendigit.com` with the real production domain.
2. Add the real logo/favicon/OG image.
3. Connect forms to a real email/CRM/WhatsApp backend.
4. Add analytics and Search Console after the consent/privacy implementation is finalized.
5. Add verified business contact details and structured local-business data.
6. Add security headers at the hosting/CDN layer.

The current forms are intentionally demo-only and do not store or transmit leads.


## Confirmed business configuration
- Brand: eCitizen Digital
- Tagline: Your Trusted Growth Partner
- Positioning: কিশোরগঞ্জের পন্য বাংলাদেশের জন্য
- Phone / WhatsApp: 01313886828
- Email: ecitizendigital@gmail.com
- Address: Kharrampatti, Kishoreganj
- Facebook: fb.com/ecitizendigit
- Domain: https://ecitizendigit.com

## Lead integrations
The website now posts forms to `/api/leads`.
Configure `.env.local` from `.env.example` to enable:
- Google Sheets automation webhook
- Email notifications via Resend
- Google Analytics 4
