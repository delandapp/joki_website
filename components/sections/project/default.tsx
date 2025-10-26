"use client";

import { Section } from "../../ui/section";
import TkaProject from "@/components/projects/tka/tka";

interface ProjectProps {
  title?: string;
  description?: string;
  className?: string;
}

const logos = [
  { name: "Laravel", Component: TkaProject },
  { name: "Go", Component: TkaProject },
  { name: "Node.js", Component: TkaProject },
  { name: "Python", Component: TkaProject },
  { name: "FastAPI", Component: TkaProject },
  { name: "MySQL", Component: TkaProject },
  { name: "PostgreSQL", Component: TkaProject },
  { name: "Flutter", Component: TkaProject },
  { name: "Javascript", Component: TkaProject },
];

export default function Project({
  title = "My Project",
  description = "Berikut adalah project yang telah kami kerjakan",
  className,
}: ProjectProps) {
  const rowA = logos.filter((_, i) => i % 2 === 0);
  const rowB = logos.filter((_, i) => i % 2 === 1);

  return (
    <Section id="logos" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-2 sm:gap-6">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        <div className="grid w-full grid-cols-1 space-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {rowB.map(({ name, Component }) => (
            <Component />
          ))}
        </div>
      </div>
    </Section>
  );
}
