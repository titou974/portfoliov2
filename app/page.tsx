"use client";

import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import SectionWrapper from "@/components/SectionWrapper";
import Hero from "@/components/home/Hero";
import ProblemsSection from "@/components/home/ProblemsSection";

export default function Home() {
  return (
    <PageContainer>
      <PageWrapper>
        <Hero />
        <SectionWrapper
          title="Je m'adapte à votre projet"
          subtitle="Quel que soit votre besoin, j'ai la solution."
        >
          <ProblemsSection />
        </SectionWrapper>
      </PageWrapper>
    </PageContainer>
  );
}
