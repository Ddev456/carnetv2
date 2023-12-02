import { DashboardIcon } from "./icons/DashboardIcon";
import { JournalIcon } from "./icons/JournalIcon";
import { LegumothequeIcon } from "./icons/LegumothequeIcon";

export const SIDEBARITEMS = [
  {
    name: "Mon potager",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Légumothèque",
    href: "/explorer",
    icon: LegumothequeIcon,
  },
  {
    name: "Mon journal",
    href: "#",
    icon: JournalIcon,
  },
];
