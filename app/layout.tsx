import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "./Providers";
import "./code.css";
import "./globals.css";
import { Sidebar } from "../src/components/Sidebar";
import { useSideBarStore } from "@/store/SideBarStore";
import StoreInitializer from "@/store/StoreInitializer";
import { SideBar } from "../src/components/layout/SideBar";
import { getUserNotifications } from "@/db/query/user.query";
import { getAuthSession } from "@/lib/auth";
import { MobileNav } from "@/components/layout/MobileNav";

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
                  <SideBar />
                </>
              )}
              <main className="w-full">{children}</main>
            </section>
            {/* <StoreInitializer state={false} />
            <div className="min-h-screen">
              <Header />
              <section className="md:flex">
                <Sidebar />
                {children}
              </section>
              <Footer />
            </div>
            {modal} */}
          </Providers>
        </body>
      </html>
    </>
  );
}
