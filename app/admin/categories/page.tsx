/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CategoriesPage() {
  const session = await getRequiredAuthSession();

  const categories = await prisma.category.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Catégories</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          href="/admin/categories/new"
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          Ajouter une catégorie de plante
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{category.name[0]}</AvatarFallback>
                        {category.image && (
                          <AvatarImage
                            src={category.image}
                            alt={category.name}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/categories/${category.id}`}
                      >
                        {category.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
