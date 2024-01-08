"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBARITEMS } from "./constants";
import { motion, useCycle } from "framer-motion";
import { ThemeToggle } from "../theme/ThemeToggle";
import { NotificationsButton } from "./NotificationsButton";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import { Notifications } from "@/db/query/user.query";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export type SideNavItem = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MobileNav = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const session = useSession();
  const user = session.data?.user;
  if (!user) return;
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 w-full bg-background"
        variants={sidebar}
      />

      <motion.ul
        variants={variants}
        className="absolute flex h-full w-full flex-col justify-between gap-3 px-10 py-16"
      >
        <motion.div variants={sidebar}>
          <Link href="/" onClick={() => toggleOpen()}>
            Carnet Potager 🥕
          </Link>
        </motion.div>
        {SIDEBARITEMS.map((item, index) => {
          const isLastItem = index === SIDEBARITEMS.length - 1; // Check if it's the last item

          return (
            <div key={index}>
              <MenuItem>
                <Link
                  href={item.href}
                  onClick={() => toggleOpen()}
                  className={`flex w-full text-2xl ${
                    item.href === pathname ? "font-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </MenuItem>

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-secondary/60" />
              )}
            </div>
          );
        })}
        <motion.div variants={sidebar} className="flex justify-between gap-1">
          <ThemeToggle />
          <LoggedInButton user={user} />
        </motion.div>
      </motion.ul>

      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <Button
    variant={"default"}
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[14px] z-30 bg-background"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
