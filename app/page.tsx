"use client";

import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import SectionWrapper from "@/components/SectionWrapper";
import Hero from "@/components/home/Hero";
import ProblemsSection from "@/components/home/ProblemsSection";
import CreationsSection from "@/components/home/CreationsSection";
import VideosSection from "@/components/home/VideosSection";
import WhyMeSection from "@/components/home/WhyMeSection";
import { MouseProvider } from "@/lib/MouseContext";

export default function Home() {
  return (
    <MouseProvider>
    <PageContainer>
      <PageWrapper>
        <Hero />
        <SectionWrapper
          title="Je m'adapte à votre projet"
          subtitle="Quel que soit votre besoin, j'ai la solution."
        >
          <ProblemsSection />
        </SectionWrapper>
        <SectionWrapper
          title="Je crée ce que l'IA ne peut pas"
          subtitle="Des produits pensés, designés et développés avec une vraie vision produit."
        >
          <CreationsSection />
        </SectionWrapper>
        <SectionWrapper
          title="Pourquoi me choisir comme développeur web ?"
          subtitle="Mon approche personnalisée vs les solutions classiques du marché."
        >
          <WhyMeSection />
        </SectionWrapper>
        <SectionWrapper
          title="J'apprends les bonnes pratiques de code via mes vidéos"
          subtitle="Du vrai code, sans IA, pour devenir un vrai développeur."
        >
          <VideosSection />
        </SectionWrapper>
      </PageWrapper>
    </PageContainer>
    </MouseProvider>
  );
}
