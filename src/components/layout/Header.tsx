import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import { AuthButton } from "@/features/auth/AuthButton";
import { getAuthSession } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { NotificationsButton } from "./NotificationsButton";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          🥕
          <div className="flex items-baseline gap-2">
            <Typography variant="h3" as={Link} href="/">
              {SiteConfig.title}
            </Typography>
            <Typography
              as={Link}
              variant="link"
              href="/explorer"
              className="ml-6 hidden text-muted-foreground hover:text-foreground md:block"
            >
              Explorer
            </Typography>
            {session?.user && (
              <Typography
                as={Link}
                variant="link"
                href="/categories"
                className="hidden text-muted-foreground hover:text-foreground md:block"
              >
                Mon potager
              </Typography>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <NotificationsButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
