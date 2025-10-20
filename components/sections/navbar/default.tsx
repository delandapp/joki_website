import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import { Button, buttonVariants } from "../../ui/button";
import {
  MotionInView,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
} from "../../ui/in-view";
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
  name = "Joki Project & Website",
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
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <MotionInView
        variants={fadeDown}
        className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"
      />
      <div className="max-w-container relative mx-auto">
        <MotionInView variants={fadeDown}>
          <NavbarComponent>
            <MotionInView
              variants={staggerContainer}
              className="flex w-full items-center justify-between gap-6"
            >
              <NavbarLeft className="flex-1">
                <MotionInView variants={fadeRight} className="flex">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    {logo}
                    {name}
                  </a>
                </MotionInView>
                {showNavigation && (
                  <MotionInView variants={fadeLeft}>
                    {customNavigation || <Navigation />}
                  </MotionInView>
                )}
              </NavbarLeft>
              <NavbarRight className="flex-1 justify-end">
                <MotionInView
                  variants={staggerContainer}
                  className="flex items-center gap-4"
                >
                  {actions.map((action, index) => (
                    <MotionInView
                      key={`${action.href}-${index}`}
                      variants={index % 2 === 0 ? fadeLeft : fadeRight}
                      className="flex"
                    >
                      {action.isButton ? (
                        <Button variant={action.variant || "default"} asChild>
                          <a href={action.href}>
                            {action.icon}
                            {action.text}
                            {action.iconRight}
                          </a>
                        </Button>
                      ) : (
                        <a
                          href={action.href}
                          className="hidden text-sm md:block"
                        >
                          {action.text}
                        </a>
                      )}
                    </MotionInView>
                  ))}
                </MotionInView>
                <MotionInView variants={scaleIn} className="flex md:hidden">
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
                      </nav>
                    </SheetContent>
                  </Sheet>
                </MotionInView>
              </NavbarRight>
            </MotionInView>
          </NavbarComponent>
        </MotionInView>
      </div>
    </header>
  );
}
