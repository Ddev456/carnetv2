import { Header } from "@/components/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "./Providers";
import "./code.css";
import "./globals.css";

import { getAuthSession } from "@/lib/auth";
import { MobileNav } from "@/components/layout/MobileNav";
import { FooterNav } from "@/components/layout/FooterNav";
import { Sidebar } from "@/components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--heading-font",
  weight: "400",
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default async function RootLayout({
  children,
  modal,
}: PropsWithChildren<{
  modal?: ReactNode;
}>) {
  const session = await getAuthSession();
  return (
    <>
      <html lang="fr" className="h-full" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body
          className={cn(
            "h-full bg-secondary/60 font-heading antialiased",
            poppins.variable
          )}
        >
          <Providers>
            <section className="relative flex">
              <Header />
              {session?.user && (
                <>
                  <MobileNav />
                  <Sidebar />
                </>
              )}
              <main className="w-full">{children}</main>
              {/* <FooterNav /> */}
            </section>
          </Providers>
        </body>
      </html>
    </>
  );
}
