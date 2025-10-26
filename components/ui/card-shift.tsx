"use client";

import * as React from "react";
import { AnimatePresence, MotionProps, motion } from "motion/react";

import { cn } from "@/lib/utils";

interface ShiftCardProps
  extends Omit<MotionProps, "onAnimationStart" | "onAnimationComplete"> {
  className?: string;
  topContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  topAnimateContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

const ShiftCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
ShiftCardHeader.displayName = "ShiftCardHeader";

interface ShiftCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isHovered: boolean;
}
const ShiftCardContent = React.forwardRef<
  HTMLDivElement,
  ShiftCardContentProps
>(({ isHovered, children, ...divProps }, ref) => {
  // Explicitly define motion props to avoid passing incompatible HTML attributes
  const motionProps: MotionProps = {
    initial: { opacity: 0, height: 0 },
    animate: isHovered
      ? { opacity: 1, height: 210 }
      : { opacity: 1, height: 50 },
    transition: { duration: 0.3, delay: 0.1, ease: "circIn" },
  };

  return (
    <motion.div
      key="shift-card-content"
      ref={ref}
      {...motionProps}
      className={divProps.className}
    >
      {children}
    </motion.div>
  );
});
ShiftCardContent.displayName = "ShiftCardContent";

const ShiftCard = React.forwardRef<HTMLDivElement, ShiftCardProps>(
  (
    {
      className,
      topContent,
      topAnimateContent,
      middleContent,
      bottomContent,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setHovered] = React.useState(false);
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleTapStart = () => setHovered(true);
    const handleTapCancel = () => setHovered(false);
    const handleTap = () => setHovered(false);

    return (
      <motion.div
        ref={ref}
        className={cn(
          // === your original classes (unchanged) ===
          "min-h-[240px] w-[280px] md:min-h-[300px] md:w-[300px]",
          "group relative flex flex-col items-center justify-between overflow-hidden rounded-xl p-3 text-sm",
          "bg-card hover:cursor-pointer",
          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
          "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",

          // === minimal additive glassmorphism ===
          // enables blur on browsers that support backdrop-filter
          "supports-[backdrop-filter]:backdrop-blur-xl",
          // subtle frosted edge and separation without overriding bg-card
          "border border-white/30 dark:border-white/10",
          // glossy highlight layer
          "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
          "before:bg-gradient-to-br before:from-white/40 before:to-white/5",
          "dark:before:from-white/10 dark:before:to-white/0",
          "before:opacity-60 before:transition-opacity group-hover:before:opacity-80",
          // soft light flare layer
          "after:pointer-events-none after:absolute after:content-['']",
          "after:-top-1/3 after:-left-1/3 after:h-[200%] after:w-[200%] after:rotate-12",
          "after:bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent_60%)]",
          "dark:after:bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent_60%)]",
          "after:opacity-40 after:transition-opacity group-hover:after:opacity-60",
          // smooth hover lift
          "transition-transform duration-200 will-change-transform hover:-translate-y-0.5",

          className,
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTapStart={handleTapStart}
        onTapCancel={handleTapCancel}
        onTap={handleTap}
        {...props}
      >
        <ShiftCardHeader className="text-primary-foreground relative flex h-[46px] w-full flex-col">
          <div className="w-full">
            {topContent}

            <AnimatePresence>
              {isHovered ? <>{topAnimateContent}</> : null}
            </AnimatePresence>
          </div>
        </ShiftCardHeader>

        <div className="pb-12">
          <AnimatePresence>
            {!isHovered ? <>{middleContent}</> : null}
          </AnimatePresence>
        </div>

        <ShiftCardContent
          isHovered={isHovered}
          className="absolute right-0 bottom-0 left-0 mt-2 flex flex-col gap-4"
        >
          <motion.div className="flex w-full flex-col gap-1">
            {bottomContent}
          </motion.div>
        </ShiftCardContent>
      </motion.div>
    );
  },
);

ShiftCard.displayName = "ShiftCard";

export { ShiftCard, ShiftCardHeader, ShiftCardContent };
