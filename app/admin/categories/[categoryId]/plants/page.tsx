/* eslint-disable @next/next/no-img-element */
import { SubmitButton } from "@/components/form/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { AdminPlantSortable } from "./AdminPlantSortable";
import { getCategoryPlants } from "./plants.query";

export default async function CategoryPlantsPage({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const category = await getCategoryPlants({
    categoryId: params.categoryId,
    userId: session.user.id,
  });

  if (!category) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Plants · {category.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Plants</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AdminPlantSortable items={category.plants} />
            <form>
              <SubmitButton
                size="sm"
                variant="secondary"
                className="w-full"
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();

                  const categoryId = params.categoryId;

                  // Authorize the user
                  await prisma.category.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: categoryId,
                    },
                  });

                  const plant = await prisma.plant.create({
                    data: {
                      name: "Plante Brouillon",
                      type: "",
                      thumbnail: "",
                      rank: "aaaaa",
                      state: "BROUILLON",
                      categoryId: categoryId,
                      content: "## Default content",
                      seedling: [0, 0],
                      nursery: [0, 0],
                      plantation: [0, 0],
                      flowering: [0, 0],
                      harvest: [0, 0],
                      exposition: 0,
                      water: 0,
                      spaceBetween: 0,
                      spaceOnRow: 0,
                      seedMinTemp: 0,
                      seedMaxTemp: 0,
                      seedDepth: 0,
                      emergence: 0,
                      optimalTemp: 0,
                      // hardiness: 0,
                      nitrogenN: 0,
                      phosphorusP: 0,
                      potassiumK: 0,
                      level: 0,
                      efficiency: 0,
                      conservation: 60,
                      isHardiness: true,
                    },
                  });

                  redirect(
                    `/admin/categories/${categoryId}/plants/${plant.id}`
                  );
                }}
              >
                Créer une plante
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
