import { Separator } from "@/components/ui/separator";
import React from "react";

export const Stats = () => {
  return (
    <div className="space-y-8">
      <div className="text-2xl font-bold">7</div>
      <p className="text-xs text-muted-foreground">
        plantes ajouté(e)s au potager.
      </p>
      <Separator className="my-4" />
      <div className="text-2xl font-bold">14</div>
      <p className="text-xs text-muted-foreground">
        tâche(s) réalisée(s) dans le journal de bord
      </p>
    </div>
  );
};
