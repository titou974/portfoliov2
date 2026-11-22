"use client";

import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import SectionWrapper from "@/components/SectionWrapper";
import Hero from "@/components/home/Hero";
import ProblemsSection from "@/components/home/ProblemsSection";
import ContentSection from "@/components/home/ContentSection";
import SovereigntySection from "@/components/home/SovereigntySection";
import CreationsSection from "@/components/home/CreationsSection";
import WhyMeSection from "@/components/home/WhyMeSection";
import BookingSection from "@/components/home/BookingSection";
import Faq from "@/components/home/Faq";
import { MotionConfig } from "framer-motion";
import { MouseProvider } from "@/lib/MouseContext";
import { t } from "@/lib/strings";

const HOME_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Titouan Hirsch / @bobodigital",
    url: "https://titouanhirsch.com",
    description:
      "Je donne vie à vos projets digitaux : MVP, applications web, agents IA et design sur-mesure. Je code ce que l'IA ne code pas.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Titouan Hirsch / @bobodigital",
    url: "https://titouanhirsch.com",
  },
];

export default function Home() {
  return (
    // `reducedMotion="user"` : Framer Motion suit le réglage système, que la
    // règle CSS équivalente ne peut pas atteindre (animations pilotées en JS).
    <MotionConfig reducedMotion="user">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <MouseProvider>
        <PageContainer>
          <PageWrapper>
            <Hero />
            <SectionWrapper
              id="problems"
              title={t("sections.problems.title")}
              subtitle={t("sections.problems.subtitle")}
            >
              <ProblemsSection />
            </SectionWrapper>
            <SectionWrapper
              id="contenu"
              eyebrow={t("content.eyebrow")}
              title={t("sections.content.title")}
              subtitle={t("sections.content.subtitle")}
            >
              <ContentSection />
            </SectionWrapper>
            <SovereigntySection />
            <CreationsSection
              title={t("sections.creations.title")}
              subtitle={t("sections.creations.subtitle")}
            />
            <SectionWrapper
              title={t("sections.whyMe.title")}
              subtitle={t("sections.whyMe.subtitle")}
            >
              <WhyMeSection />
            </SectionWrapper>
            <BookingSection />
            <Faq />
          </PageWrapper>
        </PageContainer>
      </MouseProvider>
    </MotionConfig>
  );
}
