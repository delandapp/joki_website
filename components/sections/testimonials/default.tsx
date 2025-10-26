"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  MotionInView,
  blurIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  staggerContainer,
  titleReveal,
  descriptionReveal,
} from "../../ui/in-view";
import { Card, CardContent } from "../../ui/card";
import { Marquee } from "../../ui/marquee";
import { Section } from "../../ui/section";

interface TestimonialItem {
  name: string;
  role: string;
  quote: React.ReactNode;
  avatar?: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  description?: string;
  items?: TestimonialItem[] | false;
  className?: string;
}

function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500",
        className,
      )}
    >
      {children}
    </span>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  const safe = Math.min(5, Math.max(0, count));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: safe }).map((_, i) => (
        <Star key={i} className="fill-brand text-brand size-4" />
      ))}
    </div>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (!src) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div className="bg-muted text-foreground/80 flex size-10 items-center justify-center rounded-full text-xs font-semibold">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={40}
      height={40}
      className="ring-foreground/10 size-10 rounded-full ring-1 ring-offset-2"
    />
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
  rating = 5,
}: TestimonialItem) {
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="text-brand/90">
          <StarRating count={rating} />
        </div>
        <div className="text-muted-foreground text-sm leading-relaxed">
          &ldquo;{quote}&rdquo;
        </div>
        <div className="flex items-center gap-3">
          <Avatar name={name} src={avatar} />
          <div className="flex flex-col text-left">
            <span className="text-foreground text-sm font-semibold">
              {name}
            </span>
            <span className="text-muted-foreground text-xs">{role}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials({
  title = "Apa Kata Klien Kami",
  description = "Testimoni nyata dari klien joki tugas, skripsi, website, dan aplikasi. Transparan, kredibel, dan hasil terbukti.",
  items = [
    {
      name: "Reza A.",
      role: "Mahasiswa TI",
      quote: (
        <>
          <Highlight>Skripsi saya ACC</Highlight> setelah dibimbing revisi bab
          demi bab. <Highlight>Kode clean & dokumentasi lengkap</Highlight>,
          plus latihan presentasi sampai percaya diri.
        </>
      ),
    },
    {
      name: "Ayu P.",
      role: "Owner UMKM Kuliner",
      quote: (
        <>
          <Highlight>Brand terasa lebih profesional</Highlight> - domain,
          hosting, dan SEO dibantu end-to-end.{" "}
          <Highlight>Order naik sejak 2 minggu pertama</Highlight>.
        </>
      ),
    },
    {
      name: "Bima R.",
      role: "Mahasiswa SI",
      quote: (
        <>
          <Highlight>Aplikasi Android selesai sebelum deadline</Highlight>.
          Backend API rapi,{" "}
          <Highlight>source code + penjelasan per modul</Highlight> membuat saya
          paham alurnya.
        </>
      ),
    },
    {
      name: "Dian K.",
      role: "PM - Startup Logistik",
      quote: (
        <>
          <Highlight>Tim responsif & transparan</Highlight>. Revisi tanpa ribet,
          dan <Highlight>data sensitif aman (NDA)</Highlight>. Prosesnya rapi
          dan terukur.
        </>
      ),
    },
    {
      name: "Nadia S.",
      role: "Mahasiswi TI",
      quote: (
        <>
          <Highlight>Free konsultasi sangat membantu</Highlight> - dari memilih
          framework hingga struktur laporan. Saat sidang,{" "}
          <Highlight>saya paham alur</Highlight> karena dijelaskan detail.
        </>
      ),
    },
    {
      name: "Fajar D.",
      role: "Pemilik Toko Online",
      quote: (
        <>
          <Highlight>Website e-commerce cepat & stabil</Highlight>. CRUD produk,
          otentikasi, dan dashboard berjalan mulus.{" "}
          <Highlight>Support pasca-go-live responsif</Highlight>.
        </>
      ),
    },
    {
      name: "Sinta M.",
      role: "Mahasiswi SI",
      quote: (
        <>
          <Highlight>BAB I-V tersusun rapi</Highlight> sesuai format. Ada
          bimbingan revisi dan latihan Q&A, jadi{" "}
          <Highlight>presentasi jauh lebih siap</Highlight>.
        </>
      ),
    },
    {
      name: "Rudi T.",
      role: "Founder Studio Kreatif",
      quote: (
        <>
          <Highlight>Deploy mulus</Highlight>. Dibantu setup CI/CD ringan &
          monitoring dasar, jadi <Highlight>siap online tanpa drama</Highlight>.
        </>
      ),
    },
  ],
  className,
}: TestimonialsProps) {
  const columns = items && items.length > 0 ? Math.ceil(items.length / 3) : 0;

  return (
    <Section id="testimoni" className={className}>
      <MotionInView
        variants={fadeUp}
        className="max-w-container relative mx-auto"
      >
        <MotionInView
          variants={blurIn}
          className="absolute top-20 -left-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"
        />
        <MotionInView
          variants={blurIn}
          className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"
        />

        <MotionInView
          variants={staggerContainer}
          className="relative mx-auto flex flex-col items-center gap-6 text-center sm:gap-10"
        >
          <MotionInView variants={titleReveal}>
            <h2 className="text-foreground text-4xl leading-[1.2] font-bold tracking-tighter md:text-5xl">
              {title}
            </h2>
          </MotionInView>
          <MotionInView variants={descriptionReveal}>
            <p className="text-muted-foreground mx-auto max-w-lg text-lg font-medium tracking-tight text-balance">
              {description}
            </p>
          </MotionInView>
        </MotionInView>

        {items !== false && items.length > 0 && (
          <MotionInView
            variants={fadeUp}
            className="relative mt-6 max-h-screen w-full overflow-hidden"
          >
            <MotionInView
              variants={staggerContainer}
              className="gap-4 md:columns-2 xl:columns-3"
            >
              {Array.from({ length: columns }).map((_, i) => (
                <MotionInView
                  key={`column-${i}`}
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  className="flex justify-center"
                >
                  <Marquee
                    vertical
                    pauseOnHover
                    className={cn({
                      "[--duration:60s]": i % 4 === 1,
                      "[--duration:30s]": i % 4 === 2,
                      "[--duration:70s]": i % 4 === 3,
                    })}
                  >
                    {items.slice(i * 3, (i + 1) * 3).map((testimonial, idx) => (
                      <MotionInView
                        key={`testimonial-${i}-${idx}`}
                        variants={scaleIn}
                      >
                        <TestimonialCard {...testimonial} />
                      </MotionInView>
                    ))}
                  </Marquee>
                </MotionInView>
              ))}
            </MotionInView>
            <MotionInView
              variants={fadeUp}
              className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-20%"
            />
            <MotionInView
              variants={fadeUp}
              className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-20%"
            />
          </MotionInView>
        )}
      </MotionInView>
    </Section>
  );
}
