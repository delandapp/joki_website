"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Section } from "../../ui/section";
import SmoothTab, { type TabItem } from "@/components/ui/smooth-tab";

import MediatamaEduProject from "@/components/projects/mediatamaedu/mediatamaedu";
import TkaProject from "@/components/projects/tka/tka";
import SuaratamaProject from "@/components/projects/suaratama/suaratama";
import StemduProject from "@/components/projects/stemdu/stemdu";
import EplusProject from "@/components/projects/eplus/eplus";
import VideoRisetProject from "@/components/projects/video-riset/video_riset";

/**
 * PROJECT SECTION + TABS (All, Website, Aplikasi, Dekstop, Other)
 * - Render SEMUA komponen project sesuai filter tab (UI card project tidak diubah).
 * - Tabs bar reusable (SmoothTab) di atas, grid project di bawah.
 * - Transisi antar tab: slide + blur + scale (ala SmoothTab).
 * - Height mengalir: state "center" relative -> tidak menabrak section berikutnya.
 */

type Category = "Website" | "Aplikasi" | "Dekstop" | "Other";

interface ProjectItem {
  name: string;
  category: Category;
  Component: React.ComponentType;
}

interface ProjectProps {
  title?: string;
  className?: string;
}

/** Daftar project + kategori */
const projectList: ProjectItem[] = [
  { name: "Tka", category: "Website", Component: TkaProject },
  {
    name: "Mediatama Edu",
    category: "Website",
    Component: MediatamaEduProject,
  },
  { name: "Suaratama", category: "Aplikasi", Component: SuaratamaProject },
  { name: "E-Plus", category: "Dekstop", Component: EplusProject },
  { name: "Stemdu", category: "Website", Component: StemduProject },
  { name: "Video Riset", category: "Other", Component: VideoRisetProject },
];

/** Tabs */
const TABS: TabItem[] = [
  { id: "all", title: "All" },
  { id: "website", title: "Website" },
  { id: "aplikasi", title: "Aplikasi" },
  { id: "dekstop", title: "Dekstop" },
  { id: "other", title: "Other" },
];

type TabId = (typeof TABS)[number]["id"];

const TAB_TO_CATEGORY: Record<Exclude<TabId, "all">, Category> = {
  website: "Website",
  aplikasi: "Aplikasi",
  dekstop: "Dekstop",
  other: "Other",
};

/** Varian transisi ala SmoothTab */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
    inset: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "relative" as const, // kunci: ikut tinggi konten
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
    inset: 0,
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
};

export default function Project({
  title = "My Project",
  className,
}: ProjectProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>("all");
  const [direction, setDirection] = React.useState(0);

  const onChangeTab = (next: string) => {
    // pastikan next valid
    const nextIndex = TABS.findIndex((t) => t.id === next);
    const curIndex = TABS.findIndex((t) => t.id === activeTab);
    if (nextIndex === -1) return;
    setDirection(nextIndex > curIndex ? 1 : -1);
    setActiveTab(next as TabId);
  };

  const filteredProjects = React.useMemo(() => {
    if (activeTab === "all") return projectList;
    const cat = TAB_TO_CATEGORY[activeTab as Exclude<TabId, "all">];
    return projectList.filter((p) => p.category === cat);
  }, [activeTab]);

  return (
    <Section id="project" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center justify-center gap-2 sm:gap-6">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>

        {/* Reusable SmoothTab (bar saja) */}
        <SmoothTab
          value={activeTab}
          onChange={onChangeTab}
          items={TABS}
          activeColorClass="bg-brand"
          className={cn("w-full")}
        />

        {/* Panel transisi – tinggi mengikuti konten */}
        <div className="relative w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`grid-${activeTab}`}
              custom={direction}
              variants={slideVariants as any}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition as any}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map(({ name, Component }, index) => (
                  <Component key={`${name}-${index}`} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
