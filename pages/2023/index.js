import React from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import { Navbar } from "@/components/layouts/navbar";

export default function SH2023() {
  return (
    <PageLayout>
      <PageContent>
        <Navbar />
        <Container></Container>
      </PageContent>
    </PageLayout>
  );
}
