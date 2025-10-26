"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  Variants,
} from "framer-motion";

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
import { useActiveHash } from "@/hooks/use-active-hash";

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
  /** daftar id untuk highlight aktif (tanpa '#'), urut dari atas ke bawah */
  sectionIds?: string[];
}

/** Hitung offset top sticky sesuai breakpoint Tailwind (md=768px, lg=1024px) */
function useStickyTopOffset() {
  const [offset, setOffset] = useState(8); // top-2 = 8px

  useLayoutEffect(() => {
    const mmMd = window.matchMedia("(min-width: 768px)");
    const mmLg = window.matchMedia("(min-width: 1024px)");

    const compute = () => {
      if (mmLg.matches)
        setOffset(24); // top-6
      else if (mmMd.matches)
        setOffset(16); // top-4
      else setOffset(8); // top-2
    };

    compute();
    mmMd.addEventListener?.("change", compute);
    mmLg.addEventListener?.("change", compute);
    return () => {
      mmMd.removeEventListener?.("change", compute);
      mmLg.removeEventListener?.("change", compute);
    };
  }, []);

  return offset;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Joki Lab",
  homeUrl = "/",
  mobileLinks = [
    { text: "Home", href: "/" },
    { text: "Layanan", href: "#layanan" },
    { text: "Testimoni", href: "#testimoni" },
    { text: "Harga", href: "#harga" },
    { text: "Project", href: "#project" },
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
  // urut sesuai nyata di halaman (tanpa '#'); tambahkan "home" virtual via hook
  sectionIds = ["layanan", "testimoni", "harga", "project"],
}: NavbarProps) {
  const topOffset = useStickyTopOffset();

  // ===== Active section (realtime & akurat)
  const activeId = useActiveHash(sectionIds, 120, true); // include "home"
  const activeHash = activeId ? `#${activeId}` : "#home";

  // ===== Scroll detection untuk glass on/off
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const stateSpring = useSpring(0, { stiffness: 220, damping: 30, mass: 0.6 });

  useEffect(() => {
    const y = window.scrollY || document.scrollingElement?.scrollTop || 0;
    const atTop = y <= topOffset + 1;
    setIsAtTop(atTop);
    stateSpring.set(atTop ? 0 : 1);
  }, [topOffset, stateSpring]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const atTop = y <= topOffset + 1;
    if (atTop !== isAtTop) setIsAtTop(atTop);
    stateSpring.set(atTop ? 0 : 1);
  });

  // ===== Variants framer-motion
  const variants: Variants = useMemo(
    () => ({
      top: {
        backgroundColor: "rgba(255,255,255,0.00)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        borderColor: "rgba(255,255,255,0.20)",
        opacity: 1,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      },
      scrolled: {
        backgroundColor: "rgba(255,255,255,0.35)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        borderColor: "rgba(255,255,255,0.40)",
        opacity: 1,
        transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
      },
    }),
    [],
  );

  const containerClass = cn(
    "relative mx-auto flex max-w-container items-center justify-between gap-6 rounded-2xl border px-4 py-3 transition-[background-color,border-color,box-shadow] duration-300 will-change-[backdrop-filter,transform]",
    " before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-white/30 before:to-white/10 dark:before:from-white/10 dark:before:to-white/5",
    "bg-transparent border-white/20",
    !isAtTop &&
      "supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:saturate-150",
  );

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-2 z-50 transition-all duration-300 md:top-4 lg:top-6",
        className,
      )}
    >
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={variants}
          animate={isAtTop ? "top" : "scrolled"}
          style={
            {
              "--glass-k": stateSpring,
            } as React.CSSProperties
          }
          className={containerClass}
        >
          <NavbarComponent className="w-full justify-between gap-6 py-0">
            <NavbarLeft className="flex-1 gap-6">
              <a
                href={homeUrl}
                className="flex min-w-0 flex-nowrap items-center gap-2 text-lg font-semibold whitespace-nowrap md:text-xl"
              >
                <span className="shrink-0">{logo}</span>
                <span className="truncate">{name}</span>
              </a>

              {showNavigation && (
                <div className="hidden md:flex">
                  {customNavigation || <Navigation activeHash={activeHash} />}
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

                    {/* Mobile links (opsional underline bisa diterapkan serupa) */}
                    {mobileLinks.map((link, index) => {
                      const isActive =
                        activeHash && link.href.endsWith(activeHash);
                      return (
                        <a
                          key={index}
                          href={link.href}
                          className={cn(
                            "text-muted-foreground hover:text-foreground rounded-md px-2 py-1 transition-colors",
                            isActive &&
                              "text-foreground decoration-brand underline decoration-2 underline-offset-8",
                          )}
                        >
                          {link.text}
                        </a>
                      );
                    })}

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
        </motion.div>
      </div>
    </header>
  );
}
