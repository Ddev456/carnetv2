"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { signIn } from "next-auth/react";

export const GoogleSignInButton = () => {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/explorer" });
  };
  return (
    <Button
      onClick={handleClick}
      className="mt-4 flex h-14 w-full items-center justify-center px-6 text-xl font-semibold transition-colors duration-300"
    >
      <Image src="/google.png" alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continuer avec Google</span>
    </Button>
  );
};
