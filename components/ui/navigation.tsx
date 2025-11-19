"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  activeHash?: string; // ex: "#layanan" | "#project" | "#home"
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

// hash untuk item non-link (ex: "Project" -> "#project")
const titleToHash = (title: string) =>
  `#${title.trim().toLowerCase().replace(/\s+/g, "-")}`;

export default function Navigation({
  menuItems = [
    { title: "Home", isLink: true, href: siteConfig?.url ?? "/" },
    { title: "Layanan", isLink: true, href: `${siteConfig?.url}/#layanan` },
    { title: "Project", content: "components" },
    { title: "Testimoni", isLink: true, href: `${siteConfig?.url}/#testimoni` },
    { title: "Harga", isLink: true, href: `${siteConfig?.url}/#harga` },
    { title: "Getting started", content: "default" },
  ],
  components = [
    {
      title: "Tryout TKA",
      href: "/project/tka",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Mediatama Edu",
      href: "/project/mediatamaedu",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Suaratama",
      href: "/project/suaratama",
      description:
        "Displays an indicator showing the completion progress of a task.",
    },
    {
      title: "E-Plus",
      href: "/project/eplus",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Stemdu",
      href: "/project/stemdu",
      description:
        "Layered sections of content that are displayed one at a time.",
    },
    {
      title: "Video Riset",
      href: "/project/riset",
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
  const pathname = (usePathname() || "/").toLowerCase();
  const isProjectRoute = pathname.startsWith("/project");
  const isOnRoot = pathname === "/";
  const normalizedActive = normalizeHash(activeHash || "#home");
  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item, index) => {
          const isProjectItem = item.title.trim().toLowerCase() === "project";

          // link → hash dari href; non-link → hash dari title (ex: "Project" → "#project")
          const derivedHash = item.isLink
            ? normalizeHash(hashOrHome(item.href))
            : titleToHash(item.title);

          // Hanya pakai hash di halaman root
          const isActiveByHash = isOnRoot && derivedHash === normalizedActive;

          // Project aktif kalau di /project/* atau hash #project saat di root
          // Item lain aktif hanya via hash saat di root
          const isActive = isProjectItem
            ? isProjectRoute || isActiveByHash
            : isActiveByHash;

          return (
            <NavigationMenuItem key={index}>
              {item.isLink ? (
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    "px-2 py-2",
                  )}
                  asChild
                >
                  <Link href={item.href ?? "/"} aria-label={item.title}>
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

                      {/* hover underline */}
                      <span
                        aria-hidden
                        className={cn(
                          "bg-brand pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 ease-out",
                          !isActive && "group-hover/item:scale-x-100",
                        )}
                      />

                      {/* active underline (shared layout) */}
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
                    aria-label={item.title}
                    className={cn(
                      "bg-transparent hover:bg-transparent focus:bg-transparent",
                      "data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent",
                      "px-2 py-2",
                    )}
                  >
                    <span className="group/item relative inline-flex items-center">
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/70 group-hover/item:text-foreground group-data-[state=open]:text-foreground",
                        )}
                      >
                        {item.title}
                      </span>

                      {/* hover/open underline */}
                      <span
                        aria-hidden
                        className={cn(
                          "bg-brand pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 ease-out",
                          !isActive &&
                            "group-hover/item:scale-x-100 group-data-[state=open]:scale-x-100",
                        )}
                      />

                      {/* active underline (shared layout) */}
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
                            // aktifkan berdasarkan pathname juga kalau kamu mau
                            active={pathname === intro.href.toLowerCase()}
                          >
                            {intro.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : item.content === "components" ? (
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => {
                          const isCompActive = pathname.startsWith(
                            component.href.toLowerCase(),
                          );
                          return (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                              active={isCompActive}
                            >
                              {component.description}
                            </ListItem>
                          );
                        })}
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

/** Item di dropdown: bg transparan + garis oranye (hover & active) */
function ListItem({
  className,
  title,
  children,
  href,
  active = false,
}: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <li className="relative">
      <NavigationMenuLink
        asChild
        active={active}
        className={cn(
          // paksa transparan di semua state & kalau active
          "data-[active=true]:text-foreground bg-transparent hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent",
          // biar warna teks hover konsisten
          "hover:text-foreground focus:text-foreground",
          // layout dasar
          "block rounded-md p-0",
          className,
        )}
      >
        <Link
          href={href}
          data-slot="list-item"
          className={cn(
            "relative block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            "group/item",
          )}
        >
          <div
            className={cn(
              "text-sm leading-none font-medium transition-colors",
              active
                ? "text-foreground"
                : "text-foreground/80 group-hover/item:text-foreground",
            )}
          >
            {title}
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>

          {/* hover underline */}
          <span
            aria-hidden
            className={cn(
              "bg-brand pointer-events-none absolute right-3 bottom-2 left-3 h-0.5 origin-left scale-x-0 transition-transform duration-200 ease-out",
              !active && "group-hover/item:scale-x-100",
            )}
          />

          {/* active underline (shared layout di dalam content) */}
          <AnimatePresence>
            {active && (
              <motion.span
                layoutId="nav-underline-content"
                className="bg-brand pointer-events-none absolute right-3 bottom-2 left-3 h-0.5 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </AnimatePresence>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
