"use client";

import { useEffect, useState, type ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/joki-lab-ui";
import { Button, buttonVariants } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Joki Lab",
  homeUrl = "#home",
  mobileLinks = [
    { text: "Produk", href: "#produk" },
    { text: "Harga", href: "#harga" },
    { text: "FAQ", href: "#faq" },
    { text: "Kontak", href: "#kontak" },
  ],
  actions = [
    {
      text: "Konsultasi Gratis",
      href: "#kontak",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerClasses = cn(
    "mx-auto flex max-w-container items-center justify-between gap-6 rounded-2xl border px-4 py-3 transition-all duration-300",
    isScrolled
      ? "border-border/50 bg-background/80 backdrop-blur-xl shadow-lg mt-2 md:mt-4"
      : "border-transparent bg-background/20 backdrop-blur-md",
  );

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 transition-all duration-300",
        className,
      )}
    >
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className={containerClasses}>
          <NavbarComponent className="w-full justify-between gap-6 py-0">
            <NavbarLeft className="flex-1 gap-6">
              <a
                href={homeUrl}
                className="flex items-center gap-2 text-lg font-semibold md:text-xl"
              >
                {logo}
                {name}
              </a>
              {showNavigation && (
                <div className="hidden md:flex">
                  {customNavigation || <Navigation />}
                </div>
              )}
            </NavbarLeft>
            <NavbarRight className="flex-1 justify-end gap-4">
              <div className="hidden items-center gap-4 md:flex">
                {actions.map((action, index) =>
                  action.isButton ? (
                    <Button
                      key={`${action.href}-${index}`}
                      variant={action.variant || "default"}
                      asChild
                    >
                      <a href={action.href}>
                        {action.icon}
                        {action.text}
                        {action.iconRight}
                      </a>
                    </Button>
                  ) : (
                    <a key={`${action.href}-${index}`} href={action.href}>
                      {action.text}
                    </a>
                  ),
                )}
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="grid gap-6 text-lg font-medium">
                    <a
                      href={homeUrl}
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <span>{name}</span>
                    </a>
                    {mobileLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.text}
                      </a>
                    ))}
                    {actions.map((action, index) => (
                      <a
                        key={`mobile-${action.href}-${index}`}
                        href={action.href}
                        className={cn(
                          "text-sm",
                          action.isButton && "text-foreground font-semibold",
                        )}
                      >
                        {action.text}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </NavbarRight>
          </NavbarComponent>
        </div>
      </div>
    </header>
  );
}
