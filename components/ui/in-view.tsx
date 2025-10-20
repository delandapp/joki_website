"use client";

import * as React from "react";
import {
  MotionConfig,
  motion,
  type Variants,
  type Transition,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";

type MotionMarginValue = `${number}${"px" | "%"}`;
type MotionMargin =
  | MotionMarginValue
  | `${MotionMarginValue} ${MotionMarginValue}`
  | `${MotionMarginValue} ${MotionMarginValue} ${MotionMarginValue}`
  | `${MotionMarginValue} ${MotionMarginValue} ${MotionMarginValue} ${MotionMarginValue}`;

type MotionInViewProps = React.ComponentProps<typeof motion.div> & {
  variants: Variants;
  threshold?: number | "some" | "all";
  margin?: MotionMargin;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  respectReducedMotion?: boolean;
};

const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

const createEnterTransition = (duration = 0.7): Transition => ({
  duration,
  ease: DEFAULT_EASE,
});

const createExitTransition = (duration = 0.5): Transition => ({
  duration,
  ease: EXIT_EASE,
});

function createDirectionalFade(direction: "up" | "down" | "left" | "right", distance = 40): Variants {
  const sign = direction === "left" || direction === "up" ? -1 : 1;
  const offset = distance * sign;
  const horizontal = direction === "left" || direction === "right";

  const hidden = horizontal
    ? { opacity: 0, x: offset, filter: "blur(6px)" }
    : { opacity: 0, y: offset, filter: "blur(6px)" };

  const visible = horizontal
    ? {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: createEnterTransition(),
      }
    : {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: createEnterTransition(),
      };

  const exit = horizontal
    ? {
        opacity: 0,
        x: offset * 0.6,
        filter: "blur(6px)",
        transition: createExitTransition(0.55),
      }
    : {
        opacity: 0,
        y: offset * 0.6,
        filter: "blur(6px)",
        transition: createExitTransition(0.55),
      };

  return {
    hidden,
    visible,
    exit,
  };
}

function createFade(): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: createEnterTransition(),
    },
    exit: {
      opacity: 0,
      transition: createExitTransition(),
    },
  };
}

export function MotionInView({
  variants,
  threshold = "some",
  margin,
  once = false,
  onEnter,
  onLeave,
  respectReducedMotion = false,
  children,
  ...rest
}: MotionInViewProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: threshold, margin });
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = React.useState(false);
  const previousInView = React.useRef(inView);
  const hasBeenInView = React.useRef(false);

  const exitState = React.useMemo(
    () => ("exit" in variants ? "exit" : "hidden"),
    [variants],
  );

  const reduceMotion =
    respectReducedMotion && hasMounted && prefersReducedMotion;

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    if (reduceMotion) {
      controls.stop();
      controls.set("visible");
      return;
    }

    if (inView) {
      hasBeenInView.current = true;
      controls.start("visible");
      if (!previousInView.current) onEnter?.();
    } else if (hasBeenInView.current && !once) {
      controls.start(exitState);
      if (previousInView.current) onLeave?.();
    }

    previousInView.current = inView;
  }, [
    controls,
    exitState,
    inView,
    once,
    onEnter,
    onLeave,
    reduceMotion,
    respectReducedMotion,
    prefersReducedMotion,
  ]);

  return (
    <MotionConfig reducedMotion={respectReducedMotion ? "user" : "never"}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={reduceMotion ? "visible" : controls}
        exit={exitState}
        variants={variants}
        {...rest}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export const fadeUp = createDirectionalFade("up");
export const fadeDown = createDirectionalFade("down");
export const fadeLeft = createDirectionalFade("left");
export const fadeRight = createDirectionalFade("right");
export const fadeIn = createFade();

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: createEnterTransition(),
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: createExitTransition(),
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: createEnterTransition(),
  },
  exit: {
    opacity: 0,
    filter: "blur(16px)",
    y: -16,
    transition: createExitTransition(0.45),
  },
};

export const titleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    letterSpacing: "0.08em",
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "normal",
    transition: createEnterTransition(0.8),
  },
  exit: {
    opacity: 0,
    y: -24,
    letterSpacing: "0.04em",
    transition: createExitTransition(),
  },
};

export const descriptionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...createEnterTransition(0.65),
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
    transition: createExitTransition(0.45),
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};
