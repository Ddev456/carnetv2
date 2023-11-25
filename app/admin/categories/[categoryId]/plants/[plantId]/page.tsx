/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxEditor } from "./content/MdxEditor";
import { PlantDetail } from "./form/PlantDetailsForm";
import { getAdminPlant } from "./plant.query";

export default async function CategoryPlantsPage({
  params,
}: {
  params: {
    plantId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const plant = await getAdminPlant(params.plantId, session.user.id);

  if (!plant) {
    notFound();
  }

  return (
    <Layout className="max-w-5xl">
      <LayoutHeader>
        <LayoutTitle>{plant.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
          })}
          href={`/admin/categories/${plant.categoryId}/plants`}
        >
          Retour
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Caractéristiques</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <PlantDetail defaultValue={plant} />
          </CardContent>
        </Card>
        <Card className="max-w-full flex-[3] overflow-auto">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <MdxEditor plantId={plant.id} markdown={plant.content} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
