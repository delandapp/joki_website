"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  MotionInView,
  blurIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  staggerContainer,
  descriptionReveal,
  titleReveal,
} from "../../ui/in-view";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";
import SparklesText from "@/components/ui/sparklestext";
import { WordPullUpText } from "@/components/ui/word-pull-up-text";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface HeroProps {
  title?: string;
  titles?: string[];
  description?: string;
  mockup?: React.ReactNode | false;
  badge?: React.ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

const DEFAULT_TITLES = [
  "Ide Kamu, Eksekusi Kami!",
  "Solusi Digital Cepat, Tepat, dan Rahasia Terjamin!",
  "Nggak Punya Waktu Ngerjain? Kami Ada untuk Kamu!",
  "Semua Bisa Jadi Nyata, Asal Bareng Kami!",
];

const CALM_IN_UP = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 0.68, 0.34, 0.99] },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: "blur(8px)",
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
} as const;

const TITLE_ROTATION_INTERVAL = 4800;

const HERO_TITLE_CLASS =
  "text-balance relative z-10 inline-block bg-linear-to-r from-foreground to-foreground dark:to-muted-foreground bg-clip-text text-transparent text-center font-semibold leading-tight text-4xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight";

export default function Hero({
  title,
  titles,
  description = "Butuh bantuan coding atau pembuatan website/aplikasi? Kami bantu dari analisis, desain, development hingga deploy. Free konsultasi & revisi full sampai puas.",
  mockup = (
    <Screenshot
      srcLight="/dashboard-light.png"
      srcDark="/dashboard-dark.png"
      alt="Launch UI app screenshot"
      width={1248}
      height={765}
      className="w-full"
    />
  ),
  badge = (
    <Badge variant="outline">
      <span className="text-muted-foreground text-[8px] sm:text-sm">
        Promo bulan ini:
      </span>
      <SparklesText
        as="span"
        sparkleCount={8}
        sparkleSize={12}
        colors={{ first: "#fde047", second: "#f97316" }}
      >
        <a
          href="#harga"
          className="flex items-center gap-1 text-[8px] sm:text-sm"
        >
          Diskon hingga 25% untuk mahasiswa aktif
          <ArrowRightIcon className="size-3" />
        </a>
      </SparklesText>
    </Badge>
  ),
  buttons = [
    {
      href: "#kontak",
      text: "Konsultasi Gratis",
      variant: "default",
    },
    {
      href: "#harga",
      text: "Lihat Harga",
      variant: "glow",
    },
  ],
  className,
}: HeroProps) {
  const heroTitles = React.useMemo(() => {
    if (titles && titles.length > 0) {
      return titles;
    }
    const fallback = [...DEFAULT_TITLES];
    if (title) {
      fallback[0] = title;
    }
    return fallback;
  }, [title, titles]);

  const [activeTitleIndex, setActiveTitleIndex] = React.useState(0);
  const [hasLoopStarted, setHasLoopStarted] = React.useState(false);

  React.useEffect(() => {
    setActiveTitleIndex(0);
    setHasLoopStarted(false);
  }, [heroTitles]);

  React.useEffect(() => {
    if (heroTitles.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveTitleIndex((previous) => (previous + 1) % heroTitles.length);
      setHasLoopStarted(true);
    }, TITLE_ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [heroTitles]);

  const currentTitle =
    heroTitles[hasLoopStarted ? activeTitleIndex : 0] ?? heroTitles[0] ?? "";

  return (
    <Section
      id="home"
      className={cn("overflow-hidden pb-0 sm:pb-0 md:pb-0", className)}
    >
      <MotionInView
        variants={staggerContainer}
        className="max-w-container mx-auto flex flex-col gap-12 sm:gap-24"
      >
        <MotionInView
          variants={staggerContainer}
          className="flex flex-col items-center gap-6 text-center sm:gap-12"
        >
          {badge !== false && (
            <MotionInView variants={scaleIn} className="flex justify-center">
              {badge}
            </MotionInView>
          )}
          <MotionInView variants={titleReveal} className="w-full">
            <div className="relative flex min-h-[3.5rem] w-full items-center justify-center sm:min-h-[5rem] md:min-h-[6rem]">
              {!hasLoopStarted ? (
                <WordPullUpText
                  text={heroTitles[0] ?? ""}
                  className={`${HERO_TITLE_CLASS} drop-shadow-none`}
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentTitle}
                    variants={CALM_IN_UP}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={HERO_TITLE_CLASS}
                  >
                    {currentTitle}
                  </motion.h1>
                </AnimatePresence>
              )}
            </div>
          </MotionInView>
          <MotionInView variants={descriptionReveal}>
            <p className="text-md text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance sm:text-xl">
              {description}
            </p>
          </MotionInView>
          {buttons !== false && buttons.length > 0 && (
            <MotionInView variants={fadeUp}>
              <MotionInView
                variants={staggerContainer}
                className="relative z-10 flex justify-center gap-4"
              >
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
      </MotionInView>
    </Section>
  );
}
