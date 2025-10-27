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
 * SmoothTab (reusable)
 * - Hanya bar navigasi tab (tidak render konten).
 * - Indicator aktif menggunakan Framer Motion layoutId -> posisi & lebar konsisten,
 *   tidak perlu hitung manual, sehingga hover/active tidak mempengaruhi lebar.
 * - Desain: 1 baris, kolom sama rata (menggunakan grid cols = items.length).
 */
export default function SmoothTab({
  value,
  onChange,
  items,
  className,
  activeColorClass = "bg-brand",
}: SmoothTabProps) {
  const cols = Math.max(1, items.length);

  return (
    <div
      role="tablist"
      aria-label="Tabs"
      className={cn(
        "relative mx-auto mt-4 mb-8 w-full max-w-[720px]",
        "bg-background rounded-xl border px-1 py-1",
        "transition-all duration-200",
        className,
      )}
    >
      <div
        className={cn(
          "relative grid w-full gap-1",
          // bagi rata dengan grid-cols-N
          `grid-cols-${cols}` as any, // Tailwind safelist: pastikan sudah di-allow jika perlu
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
                "relative overflow-hidden rounded-lg px-3 py-2",
                "text-sm font-medium transition-colors duration-200",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                selected
                  ? "text-white"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {/* Indicator aktif menempel di dalam button -> lebar & posisi selalu konsisten */}
              {selected && (
                <motion.div
                  layoutId="smooth-tab-indicator"
                  className={cn(
                    "absolute inset-0 z-[1] rounded-lg",
                    activeColorClass,
                  )}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              )}

              {/* Label di atas indicator */}
              <span className="relative z-[2] truncate">{t.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
