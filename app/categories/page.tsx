import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NotAuthenticatedCard } from "@/features/errors/NotAuthentificatedCard";
import { CategoryPaginationButton } from "@/features/pagination/PaginationButton";
import { getAuthSession } from "@/lib/auth";
import {
  AlertTriangle,
  BarChart3,
  BellRing,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { CategoryCard } from "../categories/CategoryCard";
import { getCategories } from "../categories/category.query";
import { getPlants } from "./[categoryId]/plants/plant.query";
import { PlantCard } from "./[categoryId]/plants/PlantCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentNotifications } from "./RecentNotifications";
import Image from "next/image";
import { Stats } from "./Stats";
import { Tips } from "./Tips";
import { getNotifications } from "./notifications.action";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return <NotAuthenticatedCard />;
  }

  const { notifications } = await getNotifications({
    userId: session?.user.id,
  });

  const page = Number(searchParams.page ?? 0) ?? 0;
  const { plants, totalPlants } = await getPlants({
    userId: session.user.id,
    page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Mon Potager</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        <div className="overflow-visible rounded-[0.5rem] border bg-background p-2 shadow md:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xl text-accent">
              Retrouvez ici toutes les informations concernant votre potager
            </p>
            <div>
              <Image
                className="absolute z-20 translate-x-[-4rem] translate-y-[-7rem] md:translate-x-0"
                src="/logo_helper.svg"
                width={100}
                height={100}
                alt="helper_logo"
              />
              {/* <span className="absolute translate-y-[-5rem] rounded-full bg-muted p-10"></span> */}
            </div>
          </div>
          <div className="flex">
            <Card className="mt-4 min-h-[10vh] w-full">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Bon à savoir</span>
                  <Sparkles className="text-muted-foreground" />
                </CardTitle>
                {/* <CardDescription>
                  Vous avez ajouté 4 plantes récemment.
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <Tips />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Card className="mt-4 min-h-[50vh] w-full md:w-[40%]">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Statistiques</span>
                  <BarChart3 className="text-muted-foreground" />
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Stats />
              </CardContent>
            </Card>
            <Card className="mt-4 min-h-[50vh] w-full md:w-[40%]">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Notifications</span>
                  <BellRing className="text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Vous avez ajouté {notifications.length} plante(s) récemment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentNotifications notifications={notifications} />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* {plants.length === 0 ? (
          <Alert>
            <AlertTriangle />
            <AlertTitle>Aucunes catégories.</AlertTitle>
          </Alert>
        ) : (
          <CategoryPaginationButton
            baseUrl={`/categories`}
            page={page}
            totalPage={totalPlants}
          />
        )} */}
      </LayoutContent>
    </Layout>
  );
}
