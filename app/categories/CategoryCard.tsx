import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { CategoriesCard } from "./category.query";

export type CategoryCardProps = {
  category: CategoriesCard;
};

export const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Link href={`/categories/${props.category.id}`}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row gap-3 space-y-0 transition-transform hover:scale-105 hover:bg-secondary">
          {/* <Avatar className="h-16 w-16 rounded">
            <AvatarFallback>{props.category.name[0]}</AvatarFallback>
            {props.category.image ? (
              <AvatarImage src={props.category.image} />
            ) : null}
          </Avatar> */}

          <p className="max-w-lg text-xl font-semibold leading-normal">
            {props.category.name === "Légume-Grain"
              ? "🫛"
              : props.category.name === "Légume-Feuille"
              ? "🥬"
              : props.category.name === "Légume-Racine"
              ? "🥕"
              : props.category.name === "Légume-Fruit"
              ? "🫑"
              : props.category.name === "Courges & Courgettes"
              ? "🍈"
              : props.category.name === "Bulbes & Tubercules"
              ? "🧅"
              : props.category.name === "Petits Fruits"
              ? "🍓"
              : ""}
            {props.category.name}
          </p>

          <div className="flex flex-col gap-3">
            {/* <CardTitle>{props.category.name}</CardTitle> */}
            <div className="flex flex-row gap-2">
              {/* <Avatar className="h-8 w-8">
                <AvatarFallback>{props.category.name[0]}</AvatarFallback>
                {props.category.creator.image ? (
                  <AvatarImage src={props.category.creator.image} />
                ) 
                : null}
              </Avatar> */}
              {/* <Typography variant="large" className=" text-muted-foreground">
                {props.category.presentation}
              </Typography> */}
              {/* <Typography variant="large" className=" text-muted-foreground">
                {props.category.creator.name}
              </Typography> */}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
