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
    // Root: jangan pakai overflow apapun di sini
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="max-w-screen overflow-x-hidden">
        <main
          className={cn(
            "flex flex-col space-y-24 px-2 py-0 sm:px-4 md:px-6 lg:px-8",
            className,
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
