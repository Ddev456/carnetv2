"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type CategoryPaginationButtonProps = {
  totalPage: number;
  page: number;
  baseUrl: string;
};

export const CategoryPaginationButton = (
  props: CategoryPaginationButtonProps
) => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={props.page === 0}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page - 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Précédent
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={props.page === props.totalPage}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(props.page + 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Suivant
      </Button>
    </div>
  );
};
