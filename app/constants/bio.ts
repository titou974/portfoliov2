export interface BioLink {
  id: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  primary?: boolean;
  badge?: string;
}

export interface BioStat {
  id: string;
  icon: string;
  valueKey: string;
  labelKey: string;
}

export const BIO_STATS: BioStat[] = [
  {
    id: "instagram",
    icon: "/creations/instagram.webp",
    valueKey: "1.1k",
    labelKey: "bio.stats.instagramLabel",
  },
  {
    id: "tiktok",
    icon: "/creations/tiktok.webp",
    valueKey: "2k",
    labelKey: "bio.stats.tiktokLabel",
  },
  {
    id: "projects",
    icon: "/creations/projects.png",
    valueKey: "bio.stats.projectsValue",
    labelKey: "bio.stats.projectsLabel",
  },
];

export const BIO_CONTACT: BioLink = {
  id: "contact",
  icon: "/creations/calendar.png",
  titleKey: "bio.contact.title",
  subtitleKey: "bio.contact.subtitle",
  href: "https://cal.eu/bobodigital",
  primary: true,
  badge: "bio.contact.badge",
};

export const BIO_ACTIVITIES: BioLink[] = [
  {
    id: "projects",
    icon: "/creations/projects.png",
    titleKey: "bio.activities.projects.title",
    subtitleKey: "bio.activities.projects.subtitle",
    href: "/projets",
  },
  {
    id: "portfolio",
    icon: "/creations/plant.png",
    titleKey: "bio.activities.portfolio.title",
    subtitleKey: "bio.activities.portfolio.subtitle",
    href: "#",
  },
];

export const BIO_SOCIALS: BioLink[] = [
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
  avatar: "/titou.jpeg",
  username: "bio.username",
  tagline: "bio.tagline",
} as const;
