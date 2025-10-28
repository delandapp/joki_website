"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  title: string;
};

export interface SmoothTabProps {
  value: string;
  onChange: (id: string) => void;
  items: TabItem[]; // contoh: [{id:"all", title:"All"}, ...]
  className?: string;
  activeColorClass?: string; // bg untuk indikator aktif (default: bg-brand)
}

/**
 * SmoothTab
 *
 * Struktur:
 * - Wrapper luar: full-width, overflow-x-auto, sembunyi scrollbar
 * - Rail dalam: shrink-to-content (inline-flex), ada border & radius
 *
 * Kenapa begini?
 * - Rail nggak dipaksa w-full, jadi border cuma sepanjang tab terakhir
 * - Tapi kalau tab lebih panjang dari layar, wrapper luar bisa scroll ke kanan
 */
export default function SmoothTab({
  value,
  onChange,
  items,
  className,
  activeColorClass = "bg-brand",
}: SmoothTabProps) {
  return (
    <div
      className={cn(
        // wrapper scroll area
        "scrollbar-none relative mx-auto mt-4 mb-8 flex w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]",
        className,
      )}
      role="tablist"
      aria-label="Tabs"
    >
      {/* hide scrollbar webkit */}
      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* rail: cuma selebar isi tabs */}
      <div
        className={cn(
          "bg-background inline-flex items-center gap-2 rounded-xl border px-2 py-2",
          "transition-all duration-200",
          // biar rail nggak patah ke 2 baris
          "whitespace-nowrap",
          // shadow halus opsional
          "bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur",
        )}
      >
        {items.map((t) => {
          const selected = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                selected
                  ? "text-white"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {selected && (
                <motion.div
                  layoutId="smooth-tab-indicator"
                  className={cn(
                    "absolute inset-0 z-[1] rounded-lg",
                    activeColorClass,
                  )}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-[2] truncate">{t.title}</span>
            </button>
          );
        })}
      </div>

      {/* optional: fade kanan kecil sebagai hint bisa scroll */}
      <div className="from-background pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l to-transparent" />
    </div>
  );
}
