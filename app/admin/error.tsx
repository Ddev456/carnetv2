"use client"; // Error components must be Client Components

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginButton } from "@/features/auth/LoginButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>Désolé, une erreur s'est produite.</CardTitle>
        <CardDescription>
          Merci de vous authentifier ou de contacter le support pour continuer.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
}
