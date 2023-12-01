import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import React from "react";
import { RedirectToLogin } from "../auth/RedirectToLogin";

export const NotAuthenticatedCard = () => {
  return (
    <Card className="m-auto mt-[6rem] max-w-lg">
      <CardHeader>
        <CardTitle>Vous devez être authentifié pour voir cette page.</CardTitle>
      </CardHeader>
      <CardFooter>
        <RedirectToLogin />
      </CardFooter>
    </Card>
  );
};
