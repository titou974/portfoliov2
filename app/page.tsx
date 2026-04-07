"use client";

import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import SectionWrapper from "@/components/SectionWrapper";
import Hero from "@/components/home/Hero";
import ProblemsSection from "@/components/home/ProblemsSection";
import CreationsSection from "@/components/home/CreationsSection";
import VideosSection from "@/components/home/VideosSection";
import WhyMeSection from "@/components/home/WhyMeSection";
import BookingSection from "@/components/home/BookingSection";
import Navbar from "@/components/Navbar";
import { MouseProvider } from "@/lib/MouseContext";
import { t } from "@/lib/strings";

export default function Home() {
  return (
    <MouseProvider>
      <Navbar />
      <PageContainer>
        <PageWrapper>
          <Hero />
          <SectionWrapper
            title={t("sections.problems.title")}
            subtitle={t("sections.problems.subtitle")}
          >
            <ProblemsSection />
          </SectionWrapper>
          <CreationsSection
            title={t("sections.creations.title")}
            subtitle={t("sections.creations.subtitle")}
          />
          {/* <SectionWrapper
            title={t("sections.videos.title")}
            subtitle={t("sections.videos.subtitle")}
          >
            <VideosSection />
          </SectionWrapper> */}
          <SectionWrapper
            title={t("sections.whyMe.title")}
            subtitle={t("sections.whyMe.subtitle")}
          >
            <WhyMeSection />
          </SectionWrapper>
          <BookingSection />
        </PageWrapper>
      </PageContainer>
    </MouseProvider>
  );
}
