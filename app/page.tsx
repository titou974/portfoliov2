"use client"; // Nécessaire pour utiliser les hooks dans Next.js 13+

import { useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@heroui/react";
import CustomCursor from "@/components/CustomCursor";
import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import Lottie from "lottie-react";
import developerAnimation from "@/assets/developer.json";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <PageContainer>
      <PageWrapper>
        <Hero />
        <Lottie
          animationData={developerAnimation}
          loop={true}
          className="mx-auto w-[80%]"
        />
      </PageWrapper>
    </PageContainer>
  );
}
