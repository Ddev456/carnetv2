"use client";

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PlantError() {
  const params = useParams();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Vous devez être connecté.</LayoutTitle>
      </LayoutHeader>
    </Layout>
  );
}
