import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/joki-lab-ui";
import {
  MotionInView,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../../ui/in-view";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Joki Project & Website",
  columns = [
    {
      title: "Layanan",
      links: [
        { text: "Joki Website", href: "#harga" },
        { text: "Joki Aplikasi", href: "#harga" },
        { text: "Joki Tugas / Skripsi", href: "#harga" },
      ],
    },
    {
      title: "Informasi",
      links: [
        { text: "Produk", href: "#produk" },
        { text: "Harga", href: "#harga" },
        { text: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Kontak",
      links: [
        { text: "Email", href: siteConfig.links.email },
        { text: "Konsultasi Gratis", href: "#kontak" },
      ],
    },
  ],
  copyright = "Ac 2025 Miko�,aj Dobrucki. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: siteConfig.url },
    { text: "Terms of Service", href: siteConfig.url },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <MotionInView variants={staggerContainer}>
            <FooterContent>
              <MotionInView
                variants={fadeUp}
                className="col-span-2 sm:col-span-3 md:col-span-1"
              >
                <FooterColumn className="h-full">
                  <div className="flex items-center gap-2">
                    {logo}
                    <h3 className="text-xl font-bold">{name}</h3>
                  </div>
                </FooterColumn>
              </MotionInView>
              {columns.map((column, index) => (
                <MotionInView
                  key={index}
                  variants={index % 2 === 0 ? fadeRight : fadeLeft}
                >
                  <FooterColumn>
                    <h3 className="text-md pt-1 font-semibold">
                      {column.title}
                    </h3>
                    {column.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="text-muted-foreground text-sm"
                      >
                        {link.text}
                      </a>
                    ))}
                  </FooterColumn>
                </MotionInView>
              ))}
            </FooterContent>
          </MotionInView>
          <MotionInView variants={fadeUp}>
            <FooterBottom>
              <div>Ac 2025 Joki Project & Website. All rights reserved</div>
              <div className="flex items-center gap-4">
                {policies.map((policy, index) => (
                  <a key={index} href={policy.href}>
                    {policy.text}
                  </a>
                ))}
                {showModeToggle && <ModeToggle />}
              </div>
            </FooterBottom>
          </MotionInView>
        </Footer>
      </div>
    </footer>
  );
}
