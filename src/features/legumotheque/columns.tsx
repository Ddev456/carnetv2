"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CloudSun, DropletsIcon } from "lucide-react";
import Link from "next/link";
import { AddPotagerButton } from "./AddPotagerButton";
import clsx from "clsx";
import { MustLoggedAlert } from "@/components/ui/mustLoggedAlert";

export type Plant = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  water: number;
  exposition: number;
  isPotager: boolean;
  isReadOnly: boolean;
};

export const columns: ColumnDef<Plant>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: "Plante",
    cell: ({ row }) => {
      const value: string = row.getValue("name");
      const plantId: string = row.getValue("id");
      const categoryId: string = row.getValue("categoryId");
      return (
        <Link href={`/categories/${categoryId}/plants/${plantId}`}>
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) => {
      const value: string = row.getValue("category");
      return (
        <Badge
          className={clsx(
            value === "Légume-Feuille"
              ? "hover:bg-[#94CE9A]"
              : value === "Légume-Racine"
              ? "hover:bg-[#FFD19A]"
              : value === "Légume-Grain"
              ? "hover:bg-[#D4CAFE]"
              : value === "Légume-Fruit"
              ? "hover:bg-[#FFE770]"
              : value === "Courges & Courgettes"
              ? "hover:bg-[#8EC8F6]"
              : "hover:bg-[#D9D9D9]",
            "bg-secondary"
          )}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "water",
    header: "Besoins en eau",
    cell: ({ row }) => {
      const value: number = row.getValue("water");
      const renderIcons = () => {
        const waterIcons = [];
        for (let i = 0; i < value; i++) {
          waterIcons.push(<DropletsIcon />);
        }
        return waterIcons;
      };
      return <span className="flex">{renderIcons()}</span>;
    },
  },
  {
    accessorKey: "exposition",
    header: "Exposition",
    cell: ({ row }) => {
      const value: number = row.getValue("exposition");
      const renderIcons = () => {
        const waterIcons = [];
        for (let i = 0; i < value; i++) {
          waterIcons.push(<CloudSun />);
        }
        return waterIcons;
      };
      return <span className="flex">{renderIcons()}</span>;
    },
  },
  {
    accessorKey: "isReadOnly",
    header: "Action",
    cell: ({ row }) => {
      const plantId: string = row.getValue("id");
      const plantName: string = row.getValue("name");
      const plantCategory: string = row.getValue("category");

      const isPotager: boolean = row.getValue("isPotager");

      const renderCell = () => {
        {
          return Boolean(row.getValue("isReadOnly")) ? (
            <MustLoggedAlert />
          ) : (
            <AddPotagerButton
              isPotager={isPotager}
              plantId={plantId}
              plantName={plantName}
              plantCategory={plantCategory}
            />
          );
        }
      };
      return <span className="flex">{renderCell()}</span>;
    },
  },
  {
    accessorKey: "isPotager",
    header: "",
    cell: ({ row }) => {
      return <></>;
    },
  },
  {
    accessorKey: "categoryId",
  },
];
