"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import Navbar from "@/components/sections/navbar/default";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main
        className={cn(
          "flex flex-1 flex-col space-y-24 px-2 py-16 sm:px-4 md:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
