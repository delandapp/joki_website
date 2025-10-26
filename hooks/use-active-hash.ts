"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Deteksi section aktif berbasis posisi scroll + offset sticky.
 * Logika:
 * - Ambil top offset setiap section (element.offsetTop).
 * - Hitung viewportTop = scrollY + topOffset.
 * - Active = section terakhir dengan top <= viewportTop + tolerance.
 * - Jika di atas section pertama -> kembalikan "home" (opsional).
 */
export function useActiveHash(
  ids: string[],
  topOffsetPx = 120,
  useHome = true,
) {
  const [active, setActive] = useState<string>(useHome ? "home" : "");
  const positionsRef = useRef<{ id: string; top: number }[]>([]);
  const frameRef = useRef<number | null>(null);

  const getPositions = useCallback(() => {
    const list: { id: string; top: number }[] = [];
    for (const id of ids) {
      const el =
        typeof document !== "undefined"
          ? (document.getElementById(id) as HTMLElement | null)
          : null;
      if (el) {
        // gunakan offsetTop absolut terhadap dokumen
        let top = el.offsetTop;
        // bump kecil agar section dengan margin-top tidak nyasar
        list.push({ id, top });
      }
    }
    // urutkan ascending
    list.sort((a, b) => a.top - b.top);
    positionsRef.current = list;
  }, [ids]);

  const handleScroll = useCallback(() => {
    if (!positionsRef.current.length) return;

    const y = window.scrollY ?? document.scrollingElement?.scrollTop ?? 0;
    const viewportTop = y + topOffsetPx + 1; // +1 untuk toleransi sticky
    const tolerance = 8; // px

    // Cari section terakhir yang top <= viewportTop + tolerance
    let current = useHome ? "home" : "";
    for (const { id, top } of positionsRef.current) {
      if (top <= viewportTop + tolerance) {
        current = id;
      } else {
        break;
      }
    }
    setActive(current);
  }, [topOffsetPx, useHome]);

  // Recalc posisi saat mount & resize & font loaded
  useEffect(() => {
    const recalc = () => {
      getPositions();
      handleScroll();
    };

    recalc();

    window.addEventListener("resize", recalc);
    // beberapa layout berubah setelah font load
    document.fonts?.ready?.then(recalc).catch(() => {});

    const onScroll = () => {
      if (frameRef.current != null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        handleScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [getPositions, handleScroll]);

  return active; // id aktif, mis. "layanan" / "harga" / "home"
}
