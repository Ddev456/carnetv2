import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/typography";
import { FooterNav } from "./FooterNav";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border">
      <div className="m-auto w-full max-w-3xl px-2 py-4">
        <FooterNav />
      </div>
    </footer>
  );
};
