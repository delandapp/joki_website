"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "../../ui/marquee";
import { Section } from "../../ui/section";

import Laravel from "../../logos/laravel";
import Go from "../../logos/go";
import Nodejs from "../../logos/nodejs";
import Python from "../../logos/python";
import FastAPI from "../../logos/fastapi";
import MySQL from "../../logos/mysql";
import PostgreSQL from "../../logos/postgresql";
import Flutter from "../../logos/flutter";
import Javascript from "../../logos/javascript";

interface LogosProps {
  title?: string;
  description?: string;
  className?: string;
}

const logos = [
  { name: "Laravel", Component: Laravel },
  { name: "Go", Component: Go },
  { name: "Node.js", Component: Nodejs },
  { name: "Python", Component: Python },
  { name: "FastAPI", Component: FastAPI },
  { name: "MySQL", Component: MySQL },
  { name: "PostgreSQL", Component: PostgreSQL },
  { name: "Flutter", Component: Flutter },
  { name: "Javascript", Component: Javascript },
];

function LogoItem({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "text-foreground/70 hover:text-brand flex h-16 w-36 items-center justify-center gap-2 transition-colors",
      )}
      aria-label={name}
      title={name}
    >
      {children}
    </div>
  );
}

export default function Logos({
  title = "Teknologi & Framework Populer",
  description = "Kami memiliki pengalaman dalam menggunakan berbagai teknologi dan framework",
  className,
}: LogosProps) {
  const rowA = logos.filter((_, i) => i % 2 === 0);
  const rowB = logos.filter((_, i) => i % 2 === 1);

  return (
    <Section id="logos" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 sm:gap-12">
        <h2 className="text-center text-2xl leading-tight font-semibold sm:text-4xl">
          {title}
        </h2>
        <p className="text-md text-muted-foreground relative z-10 max-w-[740px] text-center font-medium text-balance sm:text-xl">
          {description}
        </p>
        <div className="w-full space-y-6">
          <Marquee pauseOnHover>
            {rowA.map(({ name, Component }) => (
              <LogoItem key={name} name={name}>
                <Component className="h-8 w-8" />
              </LogoItem>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover>
            {rowB.map(({ name, Component }) => (
              <LogoItem key={name} name={name}>
                <Component className="h-8 w-8" />
              </LogoItem>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
