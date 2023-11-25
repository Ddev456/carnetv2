import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Category } from "./Category";
import { getCategory } from "./category.query";

export default async function CategoryPage({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const session = await getAuthSession();
  const category = await getCategory({
    categoryId: params.categoryId,
    userId: session?.user.id,
  });

  if (!category) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Recherche par catégorie</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Category category={category} userId={session?.user.id} />
      </LayoutContent>
    </Layout>
  );
}
