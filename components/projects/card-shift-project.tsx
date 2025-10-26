"use client";

import * as React from "react";

import { motion } from "motion/react";

import { TextureButton } from "../ui/button-texture";
import { ShiftCard } from "../ui/card-shift";

type ProjectIcon = {
  icon: React.ReactNode;
  label?: string;
};

type DetailItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type ActionItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  newTab?: boolean;
};

export interface CardShiftProjectProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt?: string;
  };
  icons: ProjectIcon[];
  highlights?: DetailItem[];
  actions?: ActionItem[];
  className?: string;
}

const FALLBACK_ACTIONS: ActionItem[] = [
  {
    label: "View Project",
    href: "#",
  },
];

export function CardShiftProject({
  title,
  description,
  image,
  icons,
  highlights = [],
  actions = FALLBACK_ACTIONS,
  className,
}: CardShiftProjectProps) {
  const renderProjectIcons = () => (
    <div className="flex items-center gap-2">
      {icons.map(({ icon, label }, index) => (
        <div
          key={index}
          className="bg-background/80 text-foreground/90 border-border/40 flex size-10 items-center justify-center rounded-lg border shadow-sm"
          title={label}
        >
          {icon}
        </div>
      ))}
    </div>
  );

  const topContent = (
    <div className="bg-card/95 text-foreground border-border/60 dark:border-border/30 relative flex flex-col gap-2 rounded-lg border px-4 py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_1px_1px_0_rgba(12,12,12,0.08)] sm:gap-3">
      {renderProjectIcons()}
      <div className="text-left">
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Project
        </p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );

  const topAnimateContent = (
    <>
      <motion.img
        transition={{ duration: 0.35, ease: "easeInOut" }}
        src={image.src}
        layoutId={`project-${title}-image`}
        width={90}
        height={60}
        alt={image.alt ?? title}
        className="border-border/70 absolute top-3.5 right-3.5 h-[68px] rounded-md border object-cover shadow-md"
      />

      <motion.div
        className="border-border/70 dark:border-border/40 absolute top-2.5 right-2.5 h-[76px] w-[98px] rounded-md border border-dashed"
        initial={{ opacity: 0, scale: 1.2, y: 10, filter: "blur(6px)" }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { delay: 0.25, duration: 0.2 },
        }}
        exit={{
          opacity: 0,
          y: 40,
          filter: "blur(4px)",
          transition: { duration: 0.2 },
        }}
      />
    </>
  );

  const middleContent = (
    <motion.img
      src={image.src}
      layoutId={`project-${title}-image`}
      width={330}
      alt={image.alt ?? title}
      className="bg-muted border-border/60 rounded-xl border object-contain shadow-lg"
    />
  );

  const bottomContent = (
    <div className="bg-card/95 text-foreground border-border/60 flex w-full flex-col gap-4 rounded-xl border px-4 pt-5 pb-4 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]">
      <div className="space-y-2">
        <p className="text-brand text-xs font-semibold tracking-wide uppercase">
          Deskripsi Project
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
          {description}
        </p>
      </div>

      {actions.length > 0 && (
        <div className="bg-background/80 border-border/40 flex justify-start gap-2 rounded-lg border">
          {actions.map(({ label, href, icon, newTab }, index) => (
            <TextureButton key={`${label}-${index}`} variant="primary" asChild>
              <a
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm font-medium"
              >
                {icon && <span className="text-brand">{icon}</span>}
                {label}
              </a>
            </TextureButton>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      <ShiftCard
        className="bg-background/40 h-[400px] w-full backdrop-blur-lg md:w-[400px]"
        topContent={topContent}
        topAnimateContent={topAnimateContent}
        middleContent={middleContent}
        bottomContent={bottomContent}
      />
    </div>
  );
}

export default CardShiftProject;
