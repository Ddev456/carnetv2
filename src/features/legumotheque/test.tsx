"use client";

import * as React from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  getPlant,
  getPlantInfos,
} from "../../../app/categories/[categoryId]/plants/[plantId]/plant.query";
import {
  PlantDataTable,
  PlantsCard,
  getPlants,
  getPlantsDataTable,
  plantsDataTable,
} from "../../../app/categories/[categoryId]/plants/plant.query";
import { getRequiredAuthSession } from "@/lib/auth";

export type categoryType = {
  id: string;
};

export type Plant = {
  id: string;
  name: string;
  // category: categoryType;
};

const data = [
  {
    id: "fdfsd",
    name: "dsfsd",
    category: {
      id: "sdqfsd",
    },
  },
];

const columnHelper = createColumnHelper<Plant>();

export const columns: ColumnDef<Plant>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => {
      const value = row.getValue("id");
      return value;
    },
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => {
      return <Badge variant={"outline"}>{row.getValue("name")}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // columnHelper.accessor<"id", string>("id", {
  //   cell: (info) => info.getValue(),
  //   footer: (props) => props.column.id,
  // }),
  // columnHelper.accessor<"category", categoryType>("category", {
  //   cell: (info) => info.getValue(),
  //   footer: (props) => props.column.id,
  // }),
  // columnHelper.accessor<"name", string>("name", {
  //   cell: ({ row }) => {
  //     const value = row.getValue<string>("name");
  //     const categoryId = row.getValue<string>("category");
  //     const plantId = row.getValue<string>("id");
  //     <Link href={`/categories/${categoryId}/plant/${plantId}`}>
  //       {value}
  //     </Link>;
  //   },
  // }),
  // columnHelper.display({ column: "id", cell: (info) => info.getValue() }),
  // columnHelper.display({
  //   id: "name",
  // }),
  // columnHelper.display({ id: "category", cell: (info) => info.getValue() }),
];

export const PlantsDataView = async () => {
  const { plants } = await getPlantsDataTable();
  // const myData: Plant[] = plants.map((plant) => {
  //   return {
  //     id: plant.id,
  //     name: plant.name,
  //     category: {
  //       id: plant.category.id,
  //     },
  //   };
  // });

  const myData = [{ id: "dofhnsd", name: "sdlfjsd" }];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    myData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-6 rounded-b-[1rem] shadow-xl bg-white">
      <div className="flex items-center py-4">
        <Input
          placeholder="Rechercher une plante ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Mois <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className="hover:cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};
