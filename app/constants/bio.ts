export interface BioLink {
  id: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  variant?: "codeself" | "accent";
  badge?: string;
}

export const BIO_CODESELF: BioLink = {
  id: "codeself",
  icon: "/logos/codeself.svg",
  titleKey: "bio.codeself.title",
  subtitleKey: "bio.codeself.subtitle",
  href: "https://code-self.com",
  variant: "codeself",
  badge: "bio.codeself.badge",
};

export const BIO_CONTACT: BioLink = {
  id: "contact",
  icon: "/creations/calendar.png",
  titleKey: "bio.contact.title",
  subtitleKey: "bio.contact.subtitle",
  href: "https://cal.eu/bobodigital",
  variant: "accent",
  badge: "bio.contact.badge",
};

export const BIO_SOCIALS: BioLink[] = [
  {
    id: "portfolio",
    icon: "/creations/portfolio.png",
    titleKey: "bio.portfolio.title",
    subtitleKey: "bio.portfolio.subtitle",
    href: "https://titouanhirsch.com",
  },
  {
    id: "instagram",
    icon: "/creations/instagram.webp",
    titleKey: "bio.socials.instagram.title",
    subtitleKey: "bio.socials.instagram.subtitle",
    href: "https://www.instagram.com/bobodigital_",
  },
  {
    id: "tiktok",
    icon: "/creations/tiktok.webp",
    titleKey: "bio.socials.tiktok.title",
    subtitleKey: "bio.socials.tiktok.subtitle",
    href: "https://www.tiktok.com/@bobodigital_",
  },
  {
    id: "youtube",
    icon: "/creations/youtube.webp",
    titleKey: "bio.socials.youtube.title",
    subtitleKey: "bio.socials.youtube.subtitle",
    href: "https://www.youtube.com/@bobo_digital",
  },
  {
    id: "linkedin",
    icon: "/creations/linkedin.webp",
    titleKey: "bio.socials.linkedin.title",
    subtitleKey: "bio.socials.linkedin.subtitle",
    href: "https://www.linkedin.com/in/titouan-hirsch",
  },
];

export const PROFILE = {
  avatar: "/titou-bio.jpg",
  username: "bio.username",
  tagline: "bio.tagline",
} as const;
