import clsx from "clsx";
import Link from "next/link";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SIDEBARITEMS } from "./constants";
import { Session } from "next-auth";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string;
  role?: string;
};

type SidebarProps = {
  user: User;
};

export const Sidebar = async ({ user }: SidebarProps) => {
  if (!user) return;
  return (
    <div
      className={clsx(
        "duration-600 text-semibold text-md group sticky top-0 hidden h-screen w-[4rem] border-r border-borders bg-background pt-[2rem] text-foreground/80 transition-all hover:w-[12rem] md:flex md:flex-col md:items-center md:justify-between md:gap-8 md:space-y-8 md:px-4 md:pb-8"
      )}
    >
      <div className="flex pb-4">
        <Link href="/" className={clsx("hidden group-hover:flex")}>
          Carnet Potager
        </Link>
        🥕
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevrons-right stroke-foreground/80 group-hover:hidden"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7l5 5l-5 5" />
        <path d="M13 7l5 5l-5 5" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevrons-left hidden stroke-foreground/80 group-hover:block"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11 7l-5 5l5 5" />
        <path d="M17 7l-5 5l5 5" />
      </svg>

      <aside className="flex  h-screen flex-col justify-between">
        <ul className="flex w-full flex-col items-center justify-around gap-2">
          {SIDEBARITEMS.map(({ name, href, icon: Icon }) => (
            <li
              key={name}
              className={clsx("w-full rounded-xl py-2 hover:bg-secondary/50")}
            >
              <Link
                href={href}
                className={clsx(
                  "sidebar-menu-link flex items-center justify-start gap-4"
                )}
              >
                <span>
                  <Icon />
                </span>
                <span className={clsx("hidden text-center group-hover:flex")}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <nav
          className={clsx(
            "bottom-0 flex flex-col items-center justify-center gap-1"
          )}
        >
          <ThemeToggle />
          <LoggedInButton user={user} />
        </nav>
      </aside>
    </div>
  );
};
