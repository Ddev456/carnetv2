import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Galindo, Poppins } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "./Providers";
import "./code.css";
import "./globals.css";
import { Sidebar } from "./sidebar/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--heading-font",
  weight: "400",
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<{
  modal?: ReactNode;
}>) {
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
            <div className="min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>

            {/* <TailwindIndicator /> */}
            {modal}
          </Providers>
        </body>
      </html>
    </>
  );
}
