"use client";

/**
 * Analytics component - ready to integrate with:
 * - Google Analytics (gtag.js)
 * - Vercel Analytics
 * - Plausible
 * - PostHog
 *
 * Uncomment the relevant section and add your tracking ID.
 */

// import Script from "next/script";

export default function Analytics() {
  // Google Analytics
  // const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  // if (!GA_ID) return null;
  //
  // return (
  //   <>
  //     <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
  //     <Script id="google-analytics" strategy="afterInteractive">
  //       {`
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());
  //         gtag('config', '${GA_ID}');
  //       `}
  //     </Script>
  //   </>
  // );

  // Vercel Analytics
  // import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
  // return <VercelAnalytics />;

  return null;
}
