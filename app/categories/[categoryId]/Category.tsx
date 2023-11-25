import { SubmitButton } from "@/components/form/SubmitButton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryType } from "./category.query";
import { PlantItem } from "./plants/PlantItem";

export type CategoryProps = {
  category: CategoryType;
  userId?: string;
};

export const Category = ({ category, userId }: CategoryProps) => {
  const isLogin = Boolean(userId);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-4">
        <Card className="w-full flex-[2]">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              {category.name === "Légume-Grain" ? (
                <span className="text-3xl">🫛</span>
              ) : category.name === "Légume-Feuille" ? (
                <span className="text-3xl">🥬</span>
              ) : category.name === "Légume-Racine" ? (
                <span className="text-3xl">🥕</span>
              ) : category.name === "Légume-Fruit" ? (
                <span className="text-3xl">🫑</span>
              ) : category.name === "Courges & Courgettes" ? (
                <span className="text-3xl">🍈</span>
              ) : category.name === "Bulbes & Tubercules" ? (
                <span className="text-3xl">🧅</span>
              ) : category.name === "Petits fruits" ? (
                <span className="text-3xl">🍓</span>
              ) : (
                ""
              )}
            </Avatar>
            <div className="flex flex-col gap-3">
              <CardTitle>{category.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <MarkdownProse markdown={category.presentation} />
          </CardContent>
        </Card>
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Liste de Plantes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {category.plants.map((plant) => (
              <PlantItem plant={plant} key={plant.id} />
            ))}
            {category.plants.length === 0 ? (
              <Alert>
                <AlertTriangle />
                <AlertTitle>
                  There are no plants yet. Please come back later.
                </AlertTitle>
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      </div>
      {category.isCanceled ? <p>You can't join this category.</p> : null}
    </div>
  );
};
