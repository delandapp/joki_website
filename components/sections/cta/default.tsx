import { type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import {
  MotionInView,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  staggerContainer,
  titleReveal,
} from "../../ui/in-view";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";

interface CTAButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface CTAProps {
  title?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

export default function CTA({
  title = "Gratis konsultasi ide & estimasi biaya",
  buttons = [
    {
      href: siteConfig.links.email,
      text: "Hubungi via Email",
      variant: "default",
    },
    {
      href: "#harga",
      text: "Lihat Harga",
      variant: "glow",
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section id="kontak" className={cn("group relative overflow-hidden", className)}>
      <MotionInView
        variants={staggerContainer}
        className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8"
      >
        <MotionInView variants={titleReveal}>
          <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            {title}
          </h2>
        </MotionInView>
        {buttons !== false && buttons.length > 0 && (
          <MotionInView variants={fadeUp}>
            <MotionInView variants={staggerContainer} className="flex justify-center gap-4">
              {buttons.map((button, index) => (
                <MotionInView
                  key={index}
                  variants={index % 2 === 0 ? fadeRight : fadeLeft}
                >
                  <Button
                    variant={button.variant || "default"}
                    size="lg"
                    asChild
                  >
                    <a href={button.href}>
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </a>
                  </Button>
                </MotionInView>
              ))}
            </MotionInView>
          </MotionInView>
        )}
      </MotionInView>
      <MotionInView
        variants={scaleIn}
        className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100"
      >
        <Glow variant="bottom" />
      </MotionInView>
    </Section>
  );
}
