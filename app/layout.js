import './globals.css';
import Script from 'next/script';
import SiteRuntime from '../components/SiteRuntime';

export const metadata = {
  metadataBase: new URL('https://ecitizendigit.com'),
  title: {
    default: 'eCitizen Digital — Kishoreganj',
    template: '%s | eCitizen Digital'
  },
  description: 'কিশোরগঞ্জের business-এর জন্য Website, Branding, Digital Marketing ও Digital Growth solutions.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'eCitizen Digital',
    locale: 'bn_BD'
  }
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="bn">
      <body>
        {children}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <SiteRuntime />
      </body>
    </html>
  );
}
