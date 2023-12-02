"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "../ui/button";
import { AlignJustify, X } from "lucide-react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Typography } from "../ui/typography";
import { SiteConfig } from "@/lib/site-config";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import { useSession } from "next-auth/react";

export const MobileNav = () => {
  const session = useSession();
  const user = session.data?.user;
  const [isOpen, trigger] = React.useState(false);
  return (
    <Sheet onOpenChange={(open) => trigger(open)}>
      <SheetTrigger
        className={clsx(
          buttonVariants({ variant: "ghost" }),
          "my-auto flex hover:bg-primary/10 hover:text-foreground md:hidden"
        )}
      >
        {isOpen ? <X size={24} /> : <AlignJustify size={24} />}
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Typography variant="h3" as={Link} href="/">
              {SiteConfig.title} 🥕
            </Typography>
          </SheetTitle>
          <SheetDescription>
            <div
              className={clsx(
                "duration-600 text-semibold text-md flex h-[80vh] flex-col items-center justify-between gap-8 space-y-8 bg-background px-4 py-8 text-foreground/80 transition-all"
              )}
            >
              <ul className="flex w-full flex-col items-center justify-around gap-2">
                <li
                  className={clsx(
                    "w-full rounded-xl py-2 hover:bg-secondary/50"
                  )}
                >
                  <SheetClose asChild>
                    <Link
                      href="/dashboard"
                      className={clsx(
                        "sidebar-menu-link flex items-center justify-start gap-4"
                      )}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-fence stroke-foreground/60"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 12v4h16v-4z" />
                          <path d="M6 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" />
                          <path d="M14 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" />
                        </svg>
                      </span>
                      <span
                        className={clsx("text-center group-hover:inline-flex")}
                      >
                        Mon potager
                      </span>
                    </Link>
                  </SheetClose>
                </li>
                <li
                  className={clsx(
                    "w-full rounded-xl py-2 hover:bg-secondary/50"
                  )}
                >
                  <SheetClose asChild>
                    <Link
                      href="/explorer"
                      className={clsx(
                        "sidebar-menu-link flex items-center justify-start gap-4"
                      )}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-books stroke-foreground/60"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                          <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                          <path d="M5 8h4" />
                          <path d="M9 16h4" />
                          <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                          <path d="M14 9l4 -1" />
                          <path d="M16 16l3.923 -.98" />
                        </svg>
                        {/* <Search size={20} /> */}
                      </span>
                      <span
                        className={clsx("text-center group-hover:inline-flex")}
                      >
                        Explorer
                      </span>
                    </Link>
                  </SheetClose>
                </li>
                <li
                  className={clsx(
                    "w-full rounded-xl py-2 hover:bg-secondary/50"
                  )}
                >
                  <SheetClose asChild>
                    <Link
                      href="#"
                      className={clsx(
                        "sidebar-menu-link flex items-center justify-start gap-4"
                      )}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-layout-dashboard stroke-foreground/60"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 4h6v8h-6z" />
                          <path d="M4 16h6v4h-6z" />
                          <path d="M14 12h6v8h-6z" />
                          <path d="M14 4h6v4h-6z" />
                        </svg>
                      </span>
                      <span
                        className={clsx("text-center group-hover:inline-flex")}
                      >
                        Journal
                      </span>
                    </Link>
                  </SheetClose>
                </li>
              </ul>
              <nav
                className={clsx(
                  "bottom-0 flex items-center justify-center gap-4"
                )}
              >
                <a
                  href="#"
                  className={clsx(
                    "flex items-center justify-start gap-4 py-2 hover:bg-secondary/50"
                  )}
                >
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-settings stroke-foreground/60"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                          </svg>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Paramètres</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </a>
                {user && <LoggedInButton user={user} />}
              </nav>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
