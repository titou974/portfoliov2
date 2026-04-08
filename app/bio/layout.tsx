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
        url: "/titou.jpeg",
        width: 512,
        height: 512,
        alt: "@bobodigital_ — Bio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bio — @bobodigital_",
    description:
      "Tous les liens de @bobodigital_ : portfolio, réseaux sociaux, réservation et projets.",
    images: ["/titou.jpeg"],
  },
};

export default function BioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
