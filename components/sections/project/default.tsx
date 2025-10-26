"use client";

import MediatamaEduProject from "@/components/projects/mediatamaedu/mediatamaedu";
import { Section } from "../../ui/section";
import TkaProject from "@/components/projects/tka/tka";
import SuaratamaProject from "@/components/projects/suaratama/suaratama";
import StemduProject from "@/components/projects/stemdu/stemdu";
import EplusProject from "@/components/projects/eplus/eplus";
import VideoRisetProject from "@/components/projects/video-riset/video_riset";
import SmoothTab from "@/components/ui/smooth-tab";

interface ProjectProps {
  title?: string;
  className?: string;
}

const projectList = [
  { name: "Tka", Component: TkaProject },
  { name: "Mediatama Edu", Component: MediatamaEduProject },
  { name: "Suaratama", Component: SuaratamaProject },
  { name: "E-Plus", Component: EplusProject },
  { name: "Stemdu", Component: StemduProject },
  { name: "Video Riset", Component: VideoRisetProject },
];

export default function Project({
  title = "My Project",
  className,
}: ProjectProps) {
  return (
    <Section id="project" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-2 sm:gap-6">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {/* <SmoothTab /> */}
        <div className="grid w-full grid-cols-1 space-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.map(({ name, Component }, index) => (
            <Component key={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
