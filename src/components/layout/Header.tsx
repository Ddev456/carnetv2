import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { RedirectToLogin } from "@/features/auth/RedirectToLogin";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";

export const Header = async () => {
  const session = await getAuthSession();
  if (session?.user) return;
  return (
    <header className="z-40 m-4 rounded-xl bg-secondary/20">
      <div className="mx-2 flex h-16 items-center justify-between space-x-4 sm:mx-4">
        <div className="flex items-center">
          {/* {session?.user && (
            <>
              <MobileNav /> <ToggleSidebar />
            </>
          )} */}
          <Typography
            className="flex items-center"
            variant="h3"
            as={Link}
            href="/"
          >
            <Image src="/radis.png" alt="logo" width={40} height={40} />
            <h1 className="flex flex-col text-lg font-extrabold leading-none tracking-tight text-foreground/80">
              <span>Carnet</span>
              <span>Potager</span>
            </h1>
          </Typography>
          <span className="me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
            Demo
          </span>
        </div>

        {/* <div className="flex items-baseline justify-around gap-2">
          <SearchBar placeholder="Rechercher une plante ..." />
        </div> */}

        <nav className="flex items-center justify-end space-x-1">
          {/* {session?.user && <NotificationsButton />} */}
          <ThemeToggle />
          <RedirectToLogin />
        </nav>
      </div>
    </header>
  );
};
