import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookCheck, Presentation, User2 } from "lucide-react";

export type QuickStatsProps = {};

export const QuickStats = async (props: QuickStatsProps) => {
  const session = await getRequiredAuthSession();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users = await prisma.user.count({
    where: {
      ownedCategories: {
        some: {
          category: {
            creatorId: session.user.id,
          },
        },
      },
    },
  });

  const plants = await prisma.plant.count({
    where: {
      category: {
        creatorId: session.user.id,
      },
    },
  });

  const categories = await prisma.category.count({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography className="">
          <User2 className="inline" size={16} /> {users} utilisateurs
        </Typography>
        <Typography>
          <BookCheck className="inline" size={16} /> {plants} plantes
        </Typography>
        <Typography>
          <Presentation className="inline" size={16} /> {categories} categories
        </Typography>
      </CardContent>
    </Card>
  );
};
