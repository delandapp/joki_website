"use client";

import Link from "next/link";
import * as React from "react";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import JokiLabUI from "../logos/joki-lab-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode | "default" | "components";
}

interface IntroItem {
  title: string;
  href: string;
  description: string;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: IntroItem[];
  activeHash?: string; // mis. "#layanan" | "#home"
}

const getHash = (href?: string) => {
  if (!href) return "";
  try {
    const url = href.startsWith("http")
      ? new URL(href)
      : new URL(href, "http://localhost");
    return url.hash || "";
  } catch {
    const i = href.indexOf("#");
    return i >= 0 ? href.slice(i) : "";
  }
};

const normalizeHash = (hash: string) =>
  hash.trim().toLowerCase().replace(/\/+$/, "");

const hashOrHome = (href?: string) => {
  const h = normalizeHash(getHash(href));
  return h || "#home";
};

export default function Navigation({
  menuItems = [
    { title: "Home", isLink: true, href: siteConfig?.url ?? "/" },
    { title: "Layanan", isLink: true, href: `${siteConfig?.url}/#layanan` },
    { title: "Testimoni", isLink: true, href: `${siteConfig?.url}/#testimoni` },
    { title: "Harga", isLink: true, href: `${siteConfig?.url}/#harga` },
    { title: "Project", content: "components" },
    { title: "Getting started", content: "default" },
  ],
  components = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "Layered sections of content that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "Popup that displays information related to an element on focus/hover.",
    },
  ],
  logo = <JokiLabUI />,
  logoTitle = "Joki Lab",
  logoDescription = "Landing page template built with React, Shadcn/ui and Tailwind that you can copy/paste into your project.",
  logoHref = siteConfig?.url ?? "/",
  introItems = [
    {
      title: "Introduction",
      href: siteConfig?.url ?? "/",
      description:
        "Re-usable components built using Radix UI and Tailwind CSS.",
    },
    {
      title: "Installation",
      href: siteConfig?.url ?? "/",
      description: "How to install dependencies and structure your app.",
    },
    {
      title: "Typography",
      href: siteConfig?.url ?? "/",
      description: "Styles for headings, paragraphs, lists...etc",
    },
  ],
  activeHash = "",
}: NavigationProps) {
  const normalizedActive = normalizeHash(activeHash || "#home");

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item, index) => {
          const currentHash = normalizeHash(hashOrHome(item.href));
          const isActive = currentHash === normalizedActive;

          return (
            <NavigationMenuItem key={index}>
              {item.isLink ? (
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    // Hilangkan bg pada hover/active, biar underline saja
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    "px-2 py-2",
                  )}
                  asChild
                >
                  <Link href={item.href ?? "/"} aria-label={item.title}>
                    {/* Pakai group/item AGAR hover hanya berlaku untuk item ini */}
                    <span className="group/item relative inline-flex items-center">
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/70 group-hover/item:text-foreground",
                        )}
                      >
                        {item.title}
                      </span>

                      {/* Hover underline - HANYA untuk item ini */}
                      <span
                        aria-hidden
                        className={cn(
                          "bg-brand pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 ease-out",
                          !isActive && "group-hover/item:scale-x-100",
                        )}
                      />

                      {/* Active underline (shared layout untuk transisi smooth antar item) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="bg-brand pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                  </Link>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className="bg-transparent"
                    aria-label={item.title}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.content === "default" ? (
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                              href={logoHref}
                              aria-label={logoTitle}
                            >
                              {logo}
                              <div className="mt-4 mb-2 text-lg font-medium">
                                {logoTitle}
                              </div>
                              <p className="text-muted-foreground text-sm leading-tight">
                                {logoDescription}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>

                        {introItems.map((intro, i) => (
                          <ListItem
                            key={i}
                            href={intro.href}
                            title={intro.title}
                          >
                            {intro.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : item.content === "components" ? (
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : (
                      item.content
                    )}
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/** Disederhanakan agar sepenuhnya pakai Next <Link> */
function ListItem({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          data-slot="list-item"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
