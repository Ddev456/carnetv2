import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

export const RedirectToLogin = () => {
  return (
    <Link className={buttonVariants({ variant: "secondary" })} href="/login">
      Connexion
    </Link>
  );
};
