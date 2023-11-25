/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { CategoryForm } from "../[categoryId]/edit/CategoryForm";

export default async function CategoryPage() {
  await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Ajouter une catégorie</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CategoryForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
