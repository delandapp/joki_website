import { User, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  MotionInView,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  titleReveal,
  descriptionReveal,
} from "../../ui/in-view";
import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface PricingProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
}

export default function Pricing({
  title = "PRICE LIST — JOKI PROJECT & WEBSITE SOLUTION",
  description =
    "Pilih layanan sesuai kebutuhanmu. Free konsultasi & revisi full sampai puas.",
  plans = [
    {
      name: "Joki Website",
      icon: <User className="size-4" />,
      description: "Website profesional, modern, dan siap online",
      price: 0,
      priceNote: "Harga fleksibel sesuai scope. Dapat konsultasi & estimasi gratis.",
      // @ts-ignore - extended prop supported in PricingColumn
      priceDisplay: "Rp 500.000 – Rp 2.500.000",
      cta: {
        variant: "default",
        label: "Konsultasi Gratis",
        href: "#kontak",
      },
      features: [
        "Desain modern & responsif (HP & laptop)",
        "Integrasi database (CRUD, login, register, dashboard)",
        "Domain + Hosting (opsional)",
        "Keamanan data terjamin",
        "Konsultasi & revisi tanpa batas",
        "Optimasi SEO & kecepatan website",
        "Support hingga website benar-benar online",
      ],
      variant: "glow-brand",
    },
    {
      name: "Joki Aplikasi (Android / Web App)",
      icon: <Users className="size-4" />,
      description: "Aplikasi keren untuk tugas, skripsi, atau bisnis",
      price: 0,
      priceNote: "UI/UX + coding + testing. Free konsultasi konsep.",
      // @ts-ignore - extended prop supported in PricingColumn
      priceDisplay: "Rp 700.000 – Rp 3.500.000",
      cta: {
        variant: "default",
        label: "Konsultasi Gratis",
        href: "#kontak",
      },
      features: [
        "Desain UI/UX modern & interaktif",
        "Login, register, CRUD, API integration",
        "Database real (MySQL, Firebase, PostgreSQL, dll)",
        "Free konsultasi konsep aplikasi",
        "Maintenance & perbaikan bug tanpa biaya tambahan",
        "Laporan dokumentasi untuk tugas/presentasi",
        "Free revisi full sampai puas",
        "Support deploy ke Play Store/hosting",
      ],
      variant: "glow",
    },
    {
      name: "Joki Tugas / Skripsi TI & SI",
      icon: <User className="size-4" />,
      description: "Tugas beres, nilai naik, tanpa stres",
      price: 0,
      priceNote: "Bisa request framework. Dapat file lengkap + dokumentasi.",
      // @ts-ignore - extended prop supported in PricingColumn
      priceDisplay: "Rp 300.000 – Rp 2.000.000",
      cta: {
        variant: "default",
        label: "Konsultasi Gratis",
        href: "#kontak",
      },
      features: [
        "Pengerjaan cepat & rapi sesuai format kampus",
        "Konsultasi gratis 24 jam",
        "File project lengkap + dokumentasi",
        "Bimbingan revisi & latihan presentasi",
        "BAB 1–BAB 5 + source code (jika skripsi IT)",
        "Bisa request framework (Laravel, Flutter, CodeIgniter, dll)",
        "Free revisi full sampai ACC dosen",
        "Data dijamin rahasia dan aman",
      ],
      variant: "default",
    },
  ],
  className = "",
}: PricingProps) {
  return (
    <Section id="harga" className={cn(className)}>
      <MotionInView
        variants={staggerContainer}
        className="mx-auto flex max-w-6xl flex-col items-center gap-12"
      >
        {(title || description) && (
          <MotionInView
            variants={staggerContainer}
            className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8"
          >
            {title && (
              <MotionInView variants={titleReveal}>
                <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                  {title}
                </h2>
              </MotionInView>
            )}
            {description && (
              <MotionInView variants={descriptionReveal}>
                <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                  {description}
                </p>
              </MotionInView>
            )}
          </MotionInView>
        )}
        {plans !== false && plans.length > 0 && (
          <MotionInView
            variants={staggerContainer}
            className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {plans.map((plan, index) => (
              <MotionInView
                key={plan.name}
                variants={index % 2 === 0 ? fadeLeft : fadeRight}
              >
                <PricingColumn
                  name={plan.name}
                  icon={plan.icon}
                  description={plan.description}
                  price={plan.price}
                  priceNote={plan.priceNote}
                  // @ts-ignore - extended prop supported in PricingColumn
                  priceDisplay={(plan as any).priceDisplay}
                  cta={plan.cta}
                  features={plan.features}
                  variant={plan.variant}
                  className={plan.className}
                />
              </MotionInView>
            ))}
          </MotionInView>
        )}
      </MotionInView>
    </Section>
  );
}
