import { Globe2, GraduationCap, NotebookPen, Smartphone } from "lucide-react";
import { ReactNode } from "react";

import {
  MotionInView,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../../ui/in-view";
import { Section } from "../../ui/section";
import CardFlip from "@/components/ui/card-flip";

interface ItemProps {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

export default function Items({
  title = "Layanan unggulan untuk kamu",
  items = [
    {
      title: "Bimbingan Tugas Kuliah",
      subtitle: "Pendampingan cepat, jelas, dan terarah",
      description:
        "Dapatkan bantuan langkah demi langkah untuk memahami materi dan menyelesaikan tugas dengan benar—bukan sekadar jawaban instan.",
      features: [
        "Konsultasi 1:1 via chat/meet",
        "Penjelasan konsep + contoh",
        "Review dan perbaikan tugas",
        "Deadline fleksibel & terukur",
      ],
      icon: <NotebookPen className="size-5 stroke-1" />,
    },
    {
      title: "Bimbingan Skripsi / TA",
      subtitle: "Dari pemilihan topik hingga siap sidang",
      description:
        "Pendampingan etis untuk menyusun skripsi/TA: ide topik, metodologi, analisis, hingga persiapan presentasi.",
      features: [
        "Validasi topik & rumusan masalah",
        "Metodologi & instrumen penelitian",
        "Pendampingan Bab 1–5",
        "Review & revisi berkelanjutan",
      ],
      icon: <GraduationCap className="size-5 stroke-1" />,
    },
    {
      title: "Pembuatan Website",
      subtitle: "Website modern, cepat, dan SEO-ready",
      description:
        "Landing page, company profile, atau web app dengan UI/UX rapi, performa tinggi, dan SEO dasar.",
      features: [
        "Next.js + Tailwind modern stack",
        "CMS / Admin panel opsional",
        "Integrasi API & pembayaran",
        "Deploy + domain/hosting",
      ],
      icon: <Globe2 className="size-5 stroke-1" />,
    },
    {
      title: "Pengembangan Mobile App",
      subtitle: "Android/iOS siap produksi",
      description:
        "Aplikasi mobile dengan performa optimal dan antarmuka modern. Termasuk integrasi API dan publikasi store.",
      features: [
        "React Native / Flutter sesuai kebutuhan",
        "Auth, CRUD, notifikasi",
        "Realtime & offline support",
        "Publish Play/App Store",
      ],
      icon: <Smartphone className="size-5 stroke-1" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section id="layanan" className={className}>
      <MotionInView
        variants={staggerContainer}
        className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20"
      >
        <MotionInView variants={fadeUp}>
          <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            {title}
          </h2>
        </MotionInView>
        {items !== false && items.length > 0 && (
          <MotionInView
            variants={fadeUp}
            style={{ ["--primary" as any]: "var(--brand)" }}
          >
            <MotionInView
              variants={staggerContainer}
              className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            >
              {items.map((item, index) => (
                <MotionInView
                  key={index}
                  variants={index % 2 === 0 ? fadeRight : fadeLeft}
                  className="h-full w-74 sm:w-76 md:w-80"
                >
                  <CardFlip
                    title={item.title}
                    icon={item.icon}
                    subtitle={item.subtitle}
                    description={item.description}
                    features={item.features}
                  />
                </MotionInView>
              ))}
            </MotionInView>
          </MotionInView>
        )}
      </MotionInView>
    </Section>
  );
}
