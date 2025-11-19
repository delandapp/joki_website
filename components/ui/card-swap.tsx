"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string; // ukuran CONTAINER
  height?: number | string; // ukuran CONTAINER
  cardWidth?: number | string; // ukuran CARD
  cardHeight?: number | string; // ukuran CARD
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number; // ms
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
  containerClassName?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [will-change:transform] [backface-visibility:hidden] [transform-style:preserve-3d] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  ),
);
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardWidth = 300,
  cardHeight = 200,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
  containerClassName,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const {
    ease: easeValue,
    durDrop,
    durMove,
    durReturn,
    promoteOverlap,
    returnDelay,
  } = config;

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );

  // Ref list (biarkan TS infer)
  const refs = useMemo(() => {
    return childArr.map(() => React.createRef<HTMLDivElement>());
  }, [childArr.length]);

  // Urutan index kartu
  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i),
  );

  // ==== scheduler & state ====
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const delayCallRef = useRef<gsap.core.Tween | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const isHoveringRef = useRef<boolean>(false);

  // Swap executor disimpan di ref agar bisa dipanggil dari scheduler
  const runSwapRef = useRef<() => void>(() => {});
  const callRunSwap = () => runSwapRef.current?.();

  const killDelayCall = () => {
    if (delayCallRef.current) {
      delayCallRef.current.kill();
      delayCallRef.current = null;
    }
  };

  const resetTimeline = () => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    isAnimatingRef.current = false;
  };

  const scheduleNext = (ms: number) => {
    killDelayCall();
    const s = Math.max(0, ms) / 1000;
    delayCallRef.current = gsap.delayedCall(s, () => {
      if (!isHoveringRef.current) {
        callRunSwap();
      }
    });
  };

  // Re-init order bila jumlah anak berubah (penting untuk mencegah stuck)
  useEffect(() => {
    order.current = Array.from({ length: childArr.length }, (_, i) => i);
    // jika sudah siap dan tak sedang animasi/hover, kickstart
    if (
      childArr.length >= 2 &&
      !isAnimatingRef.current &&
      !isHoveringRef.current
    ) {
      scheduleNext(0); // jalankan segera
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childArr.length]);

  useEffect(() => {
    const total = refs.length;

    // Posisi awal
    refs.forEach((r, i) => {
      const el = r.current;
      if (!el) return;
      placeNow(
        el,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount,
      );
    });

    // Jika belum ada kartu, atau kurang dari 2, jadwalkan cek ulang (supaya tidak buntu)
    if (refs.length < 2) {
      scheduleNext(delay);
      return () => {
        resetTimeline();
        killDelayCall();
      };
    }

    // ===== fungsi swap (ANIMASI TETAP SAMA) =====
    const runSwap = () => {
      if (isAnimatingRef.current) return;
      if (order.current.length < 2) {
        // backup: bila sewaktu2 jadi <2, coba lagi nanti
        scheduleNext(delay);
        return;
      }

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) {
        scheduleNext(delay);
        return;
      }

      isAnimatingRef.current = true;

      tlRef.current?.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
          isAnimatingRef.current = false;
          scheduleNext(delay); // jadwalkan setelah selesai
        },
      });
      tlRef.current = tl;

      // === ANIMASI ASLI (tanpa perubahan) ===
      tl.to(elFront, {
        y: "+=500",
        duration: durDrop,
        ease: easeValue,
      });

      tl.addLabel("promote", `-=${durDrop * promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: durMove,
            ease: easeValue,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );
      tl.addLabel("return", `promote+=${durMove * returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: durReturn,
          ease: easeValue,
        },
        "return",
      );
    };

    // expose ke scheduler
    runSwapRef.current = runSwap;

    // Kickstart pertama kali (langsung jalan sekali)
    runSwap();

    // Hover handling
    if (pauseOnHover && container.current) {
      const node = container.current;

      const onEnter = () => {
        isHoveringRef.current = true;
        tlRef.current?.pause();
        killDelayCall();
      };
      const onLeave = () => {
        isHoveringRef.current = false;
        if (tlRef.current && tlRef.current.paused()) {
          tlRef.current.play();
        } else if (!isAnimatingRef.current) {
          scheduleNext(delay);
        }
      };

      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);

      return () => {
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
        resetTimeline();
        killDelayCall();
      };
    }

    return () => {
      resetTimeline();
      killDelayCall();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refs,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    durDrop,
    durMove,
    durReturn,
    promoteOverlap,
    returnDelay,
    easeValue,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: {
            width: cardWidth ?? width,
            height: cardHeight ?? height,
            ...(child.props.style ?? {}),
          },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child,
  );

  return (
    <div
      ref={container}
      className={[
        "relative h-full w-full overflow-visible perspective-[900px]",
        "max-[768px]:scale-[0.75] max-[480px]:scale-[0.55]",
        containerClassName ?? "",
      ].join(" ")}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
