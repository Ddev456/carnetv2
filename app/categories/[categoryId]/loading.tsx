import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CategoryPlaceholder } from "./CategoryPlaceholder";

export default async function CategoryPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle></LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CategoryPlaceholder />
      </LayoutContent>
    </Layout>
  );
}
