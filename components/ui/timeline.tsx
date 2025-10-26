"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  data,
  title = "Timeline",
  description = "Rangkaian tahapan kunci sepanjang perjalanan proyek.",
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn("w-full font-sans md:px-6", className)}
      ref={containerRef}
    >
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-foreground mb-3 text-2xl font-semibold md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl pb-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:gap-10 md:pt-20"
          >
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3">
                <div className="h-4 w-4 rounded-full border border-border bg-muted" />
              </div>
              <h3 className="hidden text-left text-xl font-bold text-muted-foreground md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-16 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-xl font-semibold text-muted-foreground md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute top-0 left-7 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-border to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-brand via-brand/40 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
