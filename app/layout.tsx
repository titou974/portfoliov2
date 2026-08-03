import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SecretButton from "@/components/SecretButton";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://titouanhirsch.com"),
  title: {
    default:
      "Titouan Hirsch/ @bobodigital — Développeur Web Freelance & Créateur de contenu",
    template: "%s | Titouan Hirsch/@bobodigital",
  },
  description:
    "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure. Je code ce que l'IA ne code pas.",
  keywords: [
    "développeur web freelance",
    "MVP",
    "application web",
    "agent IA",
    "Next.js",
    "React",
    "bobodigital",
    "Titouan Hirsch",
  ],
  authors: [{ name: "Titouan Hirsch", url: "https://titouanhirsch.com" }],
  creator: "Titouan Hirsch",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://titouanhirsch.com",
    siteName: "Titouan Hirsch",
    title:
      "Titouan Hirsch/ @bobodigital — Développeur Web Freelance & Créateur de contenu",
    description:
      "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure.",
    images: [
      {
        url: "/site-meta-image-1200x628.png",
        width: 1200,
        height: 628,
        alt: "Titouan Hirsch — Bobodigital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titouan Hirsch/ @bobodigital — Développeur Web Freelance",
    description:
      "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure.",
    images: ["/site-meta-image-1200x628.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light" data-theme="light">
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}
      >
        <SecretButton />
        {children}
      </body>
    </html>
  );
}
