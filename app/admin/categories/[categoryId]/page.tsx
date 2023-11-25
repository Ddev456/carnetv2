/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Menu } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { CategoryPaginationButton } from "../../../../src/features/pagination/PaginationButton";
import { getAdminCategory } from "./admin-category.query";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const category = await getAdminCategory({
    categoryId: params.categoryId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Categorys</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableHeader>
              <TableBody>
                {category.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? ""}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {user.canceled ? "Canceled" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-row-reverse">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button size="sm" variant="secondary">
                            <Menu size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <form>
                              <button
                                formAction={async () => {
                                  "use server";

                                  const session =
                                    await getRequiredAuthSession();

                                  const categoryId = params.categoryId;
                                  const userId = user.id;

                                  const categoryOnUser =
                                    await prisma.categoryOnUser.findFirst({
                                      where: {
                                        userId,
                                        category: {
                                          id: categoryId,
                                          creatorId: session?.user.id,
                                        },
                                      },
                                    });

                                  if (!categoryOnUser) return;

                                  await prisma.categoryOnUser.update({
                                    where: {
                                      id: categoryOnUser.id,
                                    },
                                    data: {
                                      canceledAt: categoryOnUser.canceledAt
                                        ? null
                                        : new Date(),
                                    },
                                  });

                                  revalidatePath(
                                    `/admin/categories/${categoryId}`
                                  );
                                }}
                              >
                                {user.canceled ? "Activate" : "Cancel"}
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CategoryPaginationButton
              baseUrl={`/admin/categories/${category.id}`}
              page={page}
              totalPage={category._count?.users ?? 0 / 5}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{category.name?.[0]}</AvatarFallback>
              {category.image && (
                <AvatarImage src={category.image} alt={category.name ?? ""} />
              )}
            </Avatar>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Badge className="w-fit">{category.state}</Badge>
            <Typography>{category._count?.users} users</Typography>
            <Typography>{category._count?.plants} plants</Typography>
            <Link
              href={`/admin/categories/${category.id}/edit`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit
            </Link>{" "}
            <Link
              href={`/admin/categories/${category.id}/plants`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit plants
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
