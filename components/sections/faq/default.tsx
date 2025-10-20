import Link from "next/link";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  MotionInView,
  fadeUp,
  staggerContainer,
  titleReveal,
} from "../../ui/in-view";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Pertanyaan yang Sering Diajukan",
  items = [
    {
      question: "Apa saja layanan yang tersedia?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            Kami menyediakan joki Tugas/Skripsi IT, pembuatan Website (landing page,
            company profile, e-commerce, dashboard), dan Joki Aplikasi (Android/Web App).
          </p>
        </>
      ),
    },
    {
      question: "Berapa lama waktu pengerjaan?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            Tergantung kompleksitas. Proyek sederhana bisa 2–5 hari kerja. Kami akan
            berikan estimasi timeline setelah konsultasi awal (gratis).
          </p>
        </>
      ),
    },
    {
      question: "Apakah ada revisi?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Ya, revisi full sampai puas/ACC dosen. Kami utamakan komunikasi yang jelas
            agar hasil sesuai harapanmu.
          </p>
        </>
      ),
    },
    {
      question: "Bagaimana dengan keamanan dan kerahasiaan data?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Data kamu aman dan bersifat rahasia. Kami menerapkan praktik keamanan yang
            baik dan tidak membagikan data ke pihak lain.
          </p>
        </>
      ),
    },
    {
      question: "Bagaimana cara order/konsultasi?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          Klik tombol <Link href="#kontak" className="text-foreground underline">Konsultasi Gratis</Link> di bagian bawah
          atau kirim email ke {" "}
          <a href={siteConfig.links.email} className="underline underline-offset-2">email</a>.
        </p>
      ),
    },
    {
      question: "Apakah ada diskon untuk mahasiswa?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Ya! Diskon hingga 25% untuk mahasiswa aktif. Lihat promo di bagian harga
            atau hubungi kami untuk info lebih lanjut.
          </p>
        </>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section id="faq" className={className}>
      <MotionInView
        variants={staggerContainer}
        className="max-w-container mx-auto flex flex-col items-center gap-8"
      >
        <MotionInView variants={titleReveal}>
          <h2 className="text-center text-3xl font-semibold sm:text-5xl">
            {title}
          </h2>
        </MotionInView>
        {items !== false && items.length > 0 && (
          <MotionInView variants={fadeUp} className="w-full max-w-[800px]">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.value || `item-${index + 1}`}
                >
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionInView>
        )}
      </MotionInView>
    </Section>
  );
}
