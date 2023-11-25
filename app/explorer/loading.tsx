import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CategoryCardSkeleton } from "../categories/CategoryCardSkeleton";

export default async function LoadingPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
