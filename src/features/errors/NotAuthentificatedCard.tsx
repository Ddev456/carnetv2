import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import React from "react";
import { LoginButton } from "../auth/LoginButton";

export const NotAuthenticatedCard = () => {
  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>Vous devez être authentifié pour voir cette page.</CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
};
