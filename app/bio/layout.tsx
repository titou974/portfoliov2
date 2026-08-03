import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio — @bobodigital_",
  description:
    "Retrouvez tous les liens de @bobodigital_ : portfolio, réseaux sociaux, réservation d'appel et projets. Je code ce que l'IA ne code pas.",
  openGraph: {
    title: "Bio — @bobodigital_",
    description:
      "Tous les liens de @bobodigital_ : portfolio, réseaux sociaux, réservation et projets.",
    url: "https://bio.bobodigital.fr",
    images: [
      {
        url: "/bio-meta-image-1200x628.png",
        width: 1200,
        height: 628,
        alt: "@bobodigital_ — Bio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio — @bobodigital_",
    description:
      "Tous les liens de @bobodigital_ : portfolio, réseaux sociaux, réservation et projets.",
    images: ["/bio-meta-image-1200x628.png"],
  },
};

export default function BioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
