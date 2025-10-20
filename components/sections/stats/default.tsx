import {
  MotionInView,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../../ui/in-view";
import { Section } from "../../ui/section";

interface StatItemProps {
  label?: string;
  value: string | number;
  suffix?: string;
  description?: string;
}

interface StatsProps {
  items?: StatItemProps[] | false;
  className?: string;
}

export default function Stats({
  items = [
    {
      label: "mulai dari",
      value: "Rp 300rb",
      description: "harga untuk joki tugas",
    },
    {
      label: "produk",
      value: 3,
      description: "Website, Aplikasi, Tugas/Skripsi",
    },
    {
      label: "revisi",
      value: "Full",
      description: "sampai puas/ACC dosen",
    },
    {
      label: "support",
      value: "hingga online",
      description: "deploy hosting/Play Store",
    },
  ],
  className,
}: StatsProps) {
  return (
    <Section id="stats" className={className}>
      <MotionInView
        variants={staggerContainer}
        className="container mx-auto max-w-[960px]"
      >
        {items !== false && items.length > 0 && (
          <MotionInView
            variants={staggerContainer}
            className="grid grid-cols-2 gap-12 sm:grid-cols-4"
          >
            {items.map((item, index) => (
              <MotionInView
                key={index}
                variants={index % 2 === 0 ? fadeUp : index % 3 === 0 ? fadeLeft : fadeRight}
                className="flex flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl">
                    {item.value}
                  </div>
                  {item.suffix && (
                    <div className="text-brand text-2xl font-semibold">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-semibold text-pretty">
                    {item.description}
                  </div>
                )}
              </MotionInView>
            ))}
          </MotionInView>
        )}
      </MotionInView>
    </Section>
  );
}
