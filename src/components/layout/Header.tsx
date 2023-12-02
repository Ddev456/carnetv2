import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { RedirectToLogin } from "@/features/auth/RedirectToLogin";
import { getAuthSession } from "@/lib/auth";

export const Header = async () => {
  const session = await getAuthSession();
  if (session?.user) return;
  return (
    <header className="fixed top-0 z-40 mb-[2rem] w-full border-b bg-background">
      <div className="mx-2 flex h-16 items-center justify-between space-x-4 sm:mx-4">
        <div className="flex">
          {/* {session?.user && (
            <>
              <MobileNav /> <ToggleSidebar />
            </>
          )} */}
          <Typography className="flex" variant="h3" as={Link} href="/">
            {/* <span className="hidden md:block"> */}
            {SiteConfig.title}
            {/* </span>  */}
            🥕
          </Typography>
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
