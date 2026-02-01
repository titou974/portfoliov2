"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@heroui/react";
import PageWrapper from "@/components/PageWrapper";
import PageContainer from "@/components/PageContainer";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <PageContainer>
      <PageWrapper>
        <Hero />
      </PageWrapper>
    </PageContainer>
  );
}
