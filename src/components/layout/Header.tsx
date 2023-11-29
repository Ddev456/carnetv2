import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import { AuthButton } from "@/features/auth/AuthButton";
import { getAuthSession } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { NotificationsButton } from "./NotificationsButton";
import { LayoutDashboard, Search } from "lucide-react";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-2 flex h-16 items-center justify-between space-x-4 sm:mx-4">
        <div className="flex items-baseline justify-around gap-2">
          🥕
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
          <Typography
            as={Link}
            variant="base"
            href="/explorer"
            className="ml-6 hidden items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground/80 active:text-foreground/100 md:flex"
          >
            <Search size={16} /> Explorer
          </Typography>
          {session?.user && (
            <Typography
              as={Link}
              variant="link"
              href="/dashboard"
              className="ml-6 hidden items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground/80 active:text-foreground/100 md:flex"
            >
              <LayoutDashboard size={16} /> Mon potager
            </Typography>
          )}
        </div>

        <nav className="flex items-center justify-end space-x-1">
          <NotificationsButton />
          <ThemeToggle />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
