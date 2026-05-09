import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jesnar Tindogan — Architecting Systems Today, Justice Tomorrow",
  description:
    "Portfolio of Jesnar Tindogan — full-stack engineer specializing in backend architecture, AI integration, and project leadership. Building scalable software today, preparing for law school tomorrow.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jesnar Tindogan — Portfolio",
    description:
      "Architecting scalable systems today. Preparing for the justice system tomorrow.",
    url: siteUrl,
    siteName: "jsnaur-dev",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesnar Tindogan — Portfolio",
    description:
      "Architecting scalable systems today. Preparing for the justice system tomorrow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink-950 text-paper-50 font-sans selection:bg-navy-500">
        {children}
      </body>
    </html>
  );
}
