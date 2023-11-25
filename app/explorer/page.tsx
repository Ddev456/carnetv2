import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { DataView } from "@/features/legumotheque/DataView";
import { CategoryView } from "@/features/legumotheque/CategoryView";
import Image from "next/image";

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0) ?? 0;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        <div className="overflow-visible rounded-[0.5rem] border p-8 shadow">
          <div className="flex items-center justify-between space-y-2">
            <p className="text-xl text-foreground">
              Retrouvez ici toutes les fiches des plantes potagères
            </p>
            <div>
              <Image
                className="absolute z-20 translate-y-[-7rem]"
                src="/logo_helper.svg"
                width={100}
                height={100}
                alt="helper_logo"
              />
              {/* <span className="absolute translate-y-[-5rem] rounded-full bg-muted p-10"></span> */}
            </div>
          </div>
          <DataView />
          <CategoryView />
        </div>
      </LayoutContent>
    </Layout>
  );
}
