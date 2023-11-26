"use client";

import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { SiteConfig } from "@/lib/site-config";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { buttonVariants } from "../ui/button";
import { LayoutDashboard, PenSquare, Search } from "lucide-react";

export const FooterNav = () => {
  const _pathname = usePathname();
  const isLandingPage = _pathname === "/" ? true : false;
  return (
    <>
      {isLandingPage ? (
        <div className="flex">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* <div className="flex flex-row items-center gap-2">
              🥕
              <Typography variant="base" as={Link} href="/">
                {SiteConfig.title}
              </Typography>
            </div> */}
            <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
              {/* <Link className="hover:underline" href="/legal/privacy">
                Privacy
              </Link>
              <Link className="hover:underline" href="/legal/cgv">
                CGV
              </Link>
              <Link className="hover:underline" href="/categories">
                Categorys
              </Link>
              <Link className="hover:underline" href="/admin">
                Admin
              </Link> */}
            </div>
          </div>
          <div className="flex w-full items-center justify-center py-6">
            <Typography
              variant="base"
              className="text-xs text-muted-foreground"
            >
              &copy; {new Date().getFullYear()} Carnet Potager
            </Typography>
          </div>
        </div>
      ) : (
        <>
          <div className="container fixed inset-x-0 bottom-0 m-auto flex justify-between gap-1 border-t border-accent bg-background py-2 md:hidden">
            <Link
              href="/categories"
              className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
            >
              <LayoutDashboard size={16} />
            </Link>
            {/* <Link
              href="/"
              className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
            >
              <PenSquare size={16} />
            </Link> */}
            <Link
              href="/explorer"
              className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
            >
              <Search size={16} />
            </Link>
          </div>
        </>
      )}
    </>
  );
};
