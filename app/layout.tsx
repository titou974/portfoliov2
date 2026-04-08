import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SecretButton from "@/components/SecretButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bobodigital.fr"),
  title: {
    default: "Bobodigital — Développeur Web Freelance & Créateur de contenu",
    template: "%s | Bobodigital",
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
  authors: [{ name: "Titouan Hirsch", url: "https://bobodigital.fr" }],
  creator: "Titouan Hirsch",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bobodigital.fr",
    siteName: "Bobodigital",
    title: "Bobodigital — Développeur Web Freelance & Créateur de contenu",
    description:
      "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure.",
    images: [
      {
        url: "/titou.jpeg",
        width: 512,
        height: 512,
        alt: "Titouan Hirsch — Bobodigital",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bobodigital — Développeur Web Freelance",
    description:
      "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure.",
    images: ["/titou.jpeg"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}
      >
        <SecretButton />
        {children}
      </body>
    </html>
  );
}
