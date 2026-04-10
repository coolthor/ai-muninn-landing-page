import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPS Tracker - Master Your Bull Put Spreads",
  description: "The position tracking tool designed for options traders. Real-time Greeks monitoring, risk assessment, and profit tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-P45M24HL0T" strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-P45M24HL0T');
      `}</Script>
      {children}
      <Analytics />
    </>
  );
}
