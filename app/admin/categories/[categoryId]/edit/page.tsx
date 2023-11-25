/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CategoryForm } from "./CategoryForm";

export default async function CategoryPage({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      state: true,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit category</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CategoryForm defaultValue={category} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
