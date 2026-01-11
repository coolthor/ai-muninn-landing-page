import type { Metadata } from "next";
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
  return children;
}
