"use client";

import * as React from "react";
import {
  Cpu,
  ExternalLink,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { TextureButton } from "../ui/button-texture";
import { StatsCards } from "../ui/card-stats";
import { Timeline, type TimelineEntry } from "../ui/timeline";
import { Section } from "../ui/section";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import CardSwap, { Card } from "../ui/card-swap";

type ProjectAction = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "accent" | "secondary";
  newTab?: boolean;
};

type TimelineItem = {
  title: string;
  description: string;
  date: string;
  status?: "done" | "in-progress" | "up-next";
  icon?: React.ReactNode;
};

type TechItem = {
  name: string;
  category?: string;
  icon?: React.ReactNode;
};

type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  span?: "row" | "col";
};

type Insight = {
  title: string;
  bullets: string[];
};

type IntegrationCTA = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  newTab?: boolean;
};

type IntegrationHighlight = {
  quote: string;
  author: string;
  role?: string;
  icon?: React.ReactNode;
};

type DetailHighlight = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

type DetailSectionConfig = {
  title: string;
  description?: string;
  secondaryDescription?: string;
  highlights?: DetailHighlight[];
  image?: {
    light: string;
    dark?: string;
    alt: string;
  };
};

type GalleryCardConfig = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type GalleryShowcaseConfig = {
  title: string;
  description?: string;
  cards: GalleryCardConfig[];
  cardSize?: {
    width?: number | string;
    height?: number | string;
  };
};

export interface ProjectDetailTemplateProps {
  title: string;
  subtitle?: string;
  description: string;
  stats?: Array<{
    label: string;
    value: string;
    helper?: string;
    description?: string;
    icon?: string;
    trend?: {
      value: string;
      direction: "up" | "down";
    };
  }>;
  actions?: ProjectAction[];
  timeline?: TimelineItem[];
  techStack?: TechItem[];
  gallery?: GalleryItem[];
  insights?: Insight[];
  challenges?: Insight[];
  results?: Insight[];
  integrationsTitle?: string;
  integrationsDescription?: string;
  integrationsCTA?: IntegrationCTA;
  integrationsHighlight?: IntegrationHighlight;
  detailSection?: DetailSectionConfig;
  galleryShowcase?: GalleryShowcaseConfig;
  timelineTitle?: string;
  timelineDescription?: string;
  statsTitle?: string;
  statsDescription?: string;
  className?: string;
}

const statusColorMap: Record<NonNullable<TimelineItem["status"]>, string> = {
  done: "bg-emerald-500/90 text-emerald-50 border-emerald-500/80",
  "in-progress": "bg-brand/80 text-white border-brand/80",
  "up-next": "bg-muted text-muted-foreground border-border/60",
};

const DEFAULT_DETAIL_SECTION: DetailSectionConfig = {
  title: "The Lyra ecosystem brings together our models.",
  description:
    "Lyra is evolving to be more than just the models. It supports an entire ecosystem—dari produk hingga API yang membantu tim menginovasi lebih cepat.",
  secondaryDescription:
    "Semua modul saling terhubung, memastikan data real-time dan pengalaman yang konsisten lintas platform.",
  highlights: [
    {
      icon: <Zap className="text-brand size-4" />,
      title: "Responsif",
      description: "Performa tinggi dengan arsitektur event-driven.",
    },
    {
      icon: <Cpu className="text-brand size-4" />,
      title: "Stabil",
      description: "Pipeline teruji yang siap untuk skala besar.",
    },
  ],
  image: {
    light: "/assets/images/ilustrations/charts-light.webp",
    dark: "/assets/images/ilustrations/charts.webp",
    alt: "Visualisasi chart proses ekosistem",
  },
};

const DEFAULT_GALLERY_SHOWCASE: GalleryShowcaseConfig = {
  title: "Feature Capsules",
  description: "Highlight fitur utama dalam bentuk kartu interaktif.",
  cards: [
    {
      icon: <Sparkles className="text-brand size-5" />,
      title: "Workflow Otomatis",
      description: "Atur proses tanpa repot dengan penjadwalan pintar.",
    },
    {
      icon: <ShieldCheck className="text-brand size-5" />,
      title: "Keamanan Terpadu",
      description: "Proteksi berlapis dan audit trail menyeluruh.",
    },
    {
      icon: <Cpu className="text-brand size-5" />,
      title: "Analitik Real-time",
      description: "Pantau metrik penting lewat panel adaptif.",
    },
  ],
  cardSize: { width: 320, height: 420 },
};

export function ProjectDetailTemplate({
  title,
  subtitle,
  description,
  stats = [],
  statsTitle,
  statsDescription,
  actions = [],
  timeline = [],
  techStack = [],
  gallery = [],
  insights = [],
  challenges = [],
  results = [],
  integrationsTitle,
  integrationsDescription,
  integrationsCTA,
  integrationsHighlight,
  detailSection,
  galleryShowcase,
  timelineTitle,
  timelineDescription,
  className,
}: ProjectDetailTemplateProps) {
  const timelineEntries = React.useMemo<TimelineEntry[]>(
    () =>
      timeline.map((item, index) => {
        const badgeClass =
          item.status && statusColorMap[item.status]
            ? statusColorMap[item.status]
            : "bg-muted text-muted-foreground border-border";

        return {
          title: item.title,
          content: (
            <div className="border-border/50 bg-card/80 space-y-3 rounded-2xl border p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                {item.icon && <span className="text-brand">{item.icon}</span>}
                {item.date && (
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.date}
                  </p>
                )}
                {item.status && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                      badgeClass,
                    )}
                  >
                    {item.status === "done" && <Rocket className="size-3" />}
                    {item.status}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ),
        };
      }),
    [timeline],
  );

  const detailConfig = React.useMemo<DetailSectionConfig>(() => {
    if (!detailSection) {
      return DEFAULT_DETAIL_SECTION;
    }

    return {
      ...DEFAULT_DETAIL_SECTION,
      ...detailSection,
      highlights:
        detailSection.highlights?.map((highlight, index) => ({
          ...highlight,
          icon: highlight.icon ??
            DEFAULT_DETAIL_SECTION.highlights?.[
              index % (DEFAULT_DETAIL_SECTION.highlights?.length ?? 1)
            ]?.icon ?? <Sparkles className="text-brand size-4" />,
        })) ?? DEFAULT_DETAIL_SECTION.highlights,
      image: detailSection.image ?? DEFAULT_DETAIL_SECTION.image,
    };
  }, [detailSection]);

  const galleryShowcaseConfig = React.useMemo<GalleryShowcaseConfig>(() => {
    if (!galleryShowcase) {
      return DEFAULT_GALLERY_SHOWCASE;
    }

    const cards =
      galleryShowcase.cards.length > 0
        ? galleryShowcase.cards
        : DEFAULT_GALLERY_SHOWCASE.cards;

    return {
      title: galleryShowcase.title ?? DEFAULT_GALLERY_SHOWCASE.title,
      description:
        galleryShowcase.description ?? DEFAULT_GALLERY_SHOWCASE.description,
      cards: cards.map((card, index) => ({
        ...card,
        icon: card.icon ??
          DEFAULT_GALLERY_SHOWCASE.cards[
            index % DEFAULT_GALLERY_SHOWCASE.cards.length
          ]?.icon ?? <Sparkles className="text-brand size-5" />,
      })),
      cardSize: galleryShowcase.cardSize ?? DEFAULT_GALLERY_SHOWCASE.cardSize,
    };
  }, [galleryShowcase]);

  return (
    <div className={cn("w-full space-y-16", className)}>
      <Section className="bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center">
          <div className="mx-auto flex flex-col gap-4">
            {subtitle && (
              <span className="bg-brand/10 text-brand w-fit rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase">
                {subtitle}
              </span>
            )}
            <h1 className="text-4xl font-semibold text-balance sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {stats.length > 0 && (
            <StatsCards
              title={statsTitle ?? "Snapshot Proyek"}
              description={
                statsDescription ??
                "Gambaran cepat tentang capaian, cakupan, dan nilai utama proyek ini."
              }
              stats={stats.map((stat) => ({
                value: stat.value,
                label: stat.label,
                description: stat.description ?? stat.helper,
                icon: stat.icon,
                trend: stat.trend,
              }))}
            />
          )}

          {actions.length > 0 && (
            <div className="mx-auto flex flex-wrap justify-center gap-3">
              {actions.map((action) => (
                <TextureButton
                  key={action.label}
                  variant={action.variant ?? "primary"}
                  size="lg"
                  asChild
                >
                  <a
                    href={action.href}
                    target={action.newTab ? "_blank" : undefined}
                    rel={action.newTab ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2"
                  >
                    {action.icon}
                    {action.label}
                  </a>
                </TextureButton>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-background">
        <div className="grid w-full auto-rows-[minmax(220px,_1fr)] gap-4 sm:gap-6 md:grid-cols-4">
          <div className="md:col-span-2 md:row-span-3">
            <ContentDetail detail={detailConfig} />
          </div>
          <div className="md:col-span-2 md:col-start-3 md:row-span-3">
            <ContentGallery showcase={galleryShowcaseConfig} />
          </div>
          <div className="md:col-span-4 md:row-span-4">
            <div className="border-border/60 bg-card overflow-hidden rounded-3xl border">
              <IntegrationsSection
                title={integrationsTitle ?? "Teknologi yang Dipakai"}
                description={integrationsDescription}
                techStack={techStack}
                cta={integrationsCTA}
                highlight={integrationsHighlight}
              />
            </div>
          </div>
        </div>
      </Section>

      {timelineEntries.length > 0 && (
        <Section className="bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="border-border/60 bg-card rounded-3xl border shadow-lg">
              <Timeline
                data={timelineEntries}
                title={timelineTitle ?? "Timeline Pengembangan"}
                description={
                  timelineDescription ??
                  "Rangkaian fase penting yang membawa proyek ini menuju implementasi penuh."
                }
                className="bg-card rounded-3xl"
              />
            </div>
          </div>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section className="bg-background">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Galeri Proyek</h2>
                <p className="text-muted-foreground text-sm">
                  Cuplikan layar dan mockup yang menampilkan detail antarmuka
                  dan alur kerja.
                </p>
              </div>
              <Sparkles className="text-brand hidden h-6 w-6 sm:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, index) => (
                <figure
                  key={item.src + index}
                  className={cn(
                    "bg-card group border-border/50 relative overflow-hidden rounded-2xl border shadow-md",
                    item.span === "row" && "sm:row-span-2",
                    item.span === "col" && "lg:col-span-2",
                  )}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                  {item.caption && (
                    <figcaption className="bg-background/80 text-foreground absolute inset-x-0 bottom-0 px-4 py-3 text-sm backdrop-blur">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

function IntegrationsSection({
  title,
  description,
  techStack,
  cta,
  highlight,
}: {
  title: string;
  description?: string;
  techStack: TechItem[];
  cta?: IntegrationCTA;
  highlight?: IntegrationHighlight;
}) {
  const fallbackIntegrations: TechItem[] = [
    { name: "Integrasi SSO", category: "Auth" },
    { name: "LMS Sync", category: "Learning" },
    { name: "Arsip Digital", category: "Docs" },
    { name: "Email Gateway", category: "Comms" },
    { name: "Analytics API", category: "Metrics" },
    { name: "Mobile Companion", category: "Apps" },
  ];

  const source = techStack.length > 0 ? techStack : fallbackIntegrations;
  const integrations = source.slice(0, 6);

  return (
    <section>
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-12">
          <div className="order-last mt-6 flex flex-col gap-12 md:order-first">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-balance md:text-4xl lg:text-5xl">
                {title}
              </h2>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
              {cta && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={cta.href}
                    target={cta.newTab ? "_blank" : undefined}
                    rel={cta.newTab ? "noopener noreferrer" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {cta.icon}
                      {cta.label}
                    </span>
                  </Link>
                </Button>
              )}
            </div>

            {highlight && (
              <div className="mt-auto grid grid-cols-[auto_1fr] gap-3">
                <div className="flex aspect-square items-center justify-center border">
                  {highlight.icon ?? <Sparkles className="text-brand size-9" />}
                </div>
                <blockquote>
                  <p>{highlight.quote}</p>
                  <div className="mt-2 flex gap-2 text-sm">
                    <cite>{highlight.author}</cite>
                    {highlight.role && (
                      <p className="text-muted-foreground">{highlight.role}</p>
                    )}
                  </div>
                </blockquote>
              </div>
            )}
          </div>

          <div className="-mx-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] px-6 sm:mx-auto sm:max-w-md md:-mx-6 md:mr-0 md:ml-auto">
            <div className="bg-background dark:bg-muted/50 rounded-2xl border p-3 shadow-lg md:pb-12">
              <div className="grid grid-cols-2 gap-2">
                {integrations.map((integration, index) => (
                  <Integration
                    key={`${integration.name}-${index}`}
                    icon={integration.icon}
                    name={integration.name}
                    description={integration.category ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  description?: string;
}) => {
  return (
    <div className="hover:bg-muted dark:hover:bg-muted/50 space-y-4 rounded-lg border p-4 transition-colors">
      <div className="backdrop-blur-s2 inline-flex aspect-square size-fit flex-1 items-center justify-center rounded-md bg-gradient-to-br from-white/90 to-white/60 p-2">
        {icon ?? <Sparkles className="text-brand size-6" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{name}</h3>
        {description && (
          <p className="text-muted-foreground line-clamp-1 text-sm md:line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

function ContentDetail({ detail }: { detail: DetailSectionConfig }) {
  const {
    title,
    description,
    secondaryDescription,
    highlights = [],
    image,
  } = detail;

  return (
    <div className="border-border/60 bg-card flex h-full flex-col gap-6 rounded-3xl border p-6 sm:p-8">
      <div className="space-y-3">
        <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        )}
        {secondaryDescription && (
          <p className="text-muted-foreground text-xs sm:text-sm">
            {secondaryDescription}
          </p>
        )}
      </div>

      {highlights.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="border-border/40 bg-background/60 flex flex-col gap-2 rounded-2xl border p-3 sm:p-4"
            >
              <div className="text-brand flex items-center gap-2">
                {item.icon ?? <Sparkles className="size-4" />}
                <h3 className="text-foreground text-sm font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {image && (
        <div className="border-border/40 relative mt-auto w-full overflow-hidden rounded-2xl border">
          {image.dark && (
            <Image
              src={image.dark}
              className="hidden w-full object-cover dark:block"
              alt={image.alt}
              width={1207}
              height={929}
            />
          )}
          <Image
            src={
              image.light ??
              image.dark ??
              "/assets/images/projects/coming-soon.svg"
            }
            className={cn(
              "w-full object-cover",
              image.dark ? "dark:hidden" : undefined,
            )}
            alt={image.alt}
            width={1207}
            height={929}
          />
        </div>
      )}
    </div>
  );
}

function ContentGallery({ showcase }: { showcase: GalleryShowcaseConfig }) {
  const { title, description, cards, cardSize } = showcase;
  const width = cardSize?.width ?? 320;
  const height = cardSize?.height ?? 420;

  return (
    <div className="border-border/60 bg-card relative flex h-full flex-col rounded-3xl border p-6 sm:p-8">
      <div className="space-y-2">
        <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* area CardSwap isi sisa ruang */}
      <div className="mt-6 min-h-0 flex-1">
        <CardSwap
          // CONTAINER full
          width="100%"
          height="100%"
          // KARTU tetap pakai ukuran yang kamu tentukan
          cardWidth={width}
          cardHeight={height}
          cardDistance={10}
          verticalDistance={60}
          delay={3200}
          pauseOnHover
          containerClassName="w-full h-full"
        >
          {cards.map((card, index) => (
            <Card
              key={`${card.title}-${index}`}
              customClass="border-border/40 bg-gradient-to-br from-brand/10 via-card/40 to-card/60 text-left text-foreground border shadow-lg"
            >
              <div className="flex h-full w-full flex-col justify-between gap-4 p-6">
                <div className="text-brand flex items-center gap-2">
                  {card.icon ?? <Sparkles className="size-5" />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
export const SAMPLE_PROJECT_DETAIL: ProjectDetailTemplateProps = {
  title: "Transformasi Tata Kelola Akademik",
  subtitle: "Studi Kasus",
  description:
    "Bagaimana kami membantu kampus digital mengelola ribuan mahasiswa tugas akhir dengan dashboard realtime, automasi workflow, dan analitik performa.",
  detailSection: DEFAULT_DETAIL_SECTION,
  galleryShowcase: DEFAULT_GALLERY_SHOWCASE,
  timelineTitle: "Timeline Pengembangan",
  timelineDescription:
    "Catatan fase penting mulai dari discovery hingga peluncuran.",
  statsTitle: "Snapshot Proyek",
  statsDescription:
    "Empat metrik utama yang menggambarkan ritme pengembangan, kolaborasi tim, dan cakupan teknologi.",
  stats: [
    {
      label: "Durasi Sprint",
      value: "12 Minggu",
      description: "Discovery hingga launch dengan sprint mingguan",
      icon: "Timer",
    },
    {
      label: "Tim Inti",
      value: "6 Orang",
      description: "PM, FE, BE, QA, dan UI/UX berkolaborasi erat",
      icon: "Users",
    },
    {
      label: "Platform Aktif",
      value: "Web & Mobile",
      description: "Dashboard admin, portal mahasiswa, dan mobile companion",
      icon: "Smartphone",
    },
    {
      label: "Integrasi Sistem",
      value: "4 Sistem",
      description: "SSO Kampus, LMS, Arsip Digital, Email Gateway",
      icon: "ShieldCheck",
    },
  ],
  actions: [
    {
      label: "Minta Demo",
      href: "#kontak",
      icon: <ExternalLink className="size-4" />,
      variant: "accent",
    },
    {
      label: "Lihat Case Study",
      href: "#",
      icon: <Rocket className="size-4" />,
    },
  ],
  integrationsTitle: "Integrasi & Ekosistem",
  integrationsDescription:
    "Satu tim analitik, akademik, dan operasional terhubung lewat integrasi yang terkontrol.",
  integrationsCTA: {
    label: "Lihat Diagram Integrasi",
    href: "#",
    icon: <ExternalLink className="size-4" />,
    newTab: true,
  },
  integrationsHighlight: {
    quote:
      "Kini kami punya satu alur kerja terpadu—akses, arsip, dan analitik berada dalam satu ekosistem yang aman.",
    author: "Direktur Akademik",
    role: "Pemilik Proyek",
    icon: <ShieldCheck className="text-brand size-6" />,
  },
  timeline: [
    {
      title: "Discovery & Ideation",
      description:
        "Audit proses akademik, workshop bersama divisi akademik, dan pemetaan pain point mahasiswa.",
      date: "Week 1 - Week 2",
      status: "done",
    },
    {
      title: "Desain Sistem & Prototype",
      description:
        "User flow utama, desain UI untuk dashboard dan portal mahasiswa, prototipe interaktif untuk uji cepat.",
      date: "Week 3 - Week 5",
      status: "done",
    },
    {
      title: "Pengembangan Iteratif",
      description:
        "Implementasi modul konsultasi, manajemen dokumen, dan integrasi SSO kampus dengan sprint mingguan.",
      date: "Week 6 - Week 10",
      status: "in-progress",
    },
    {
      title: "QA, UAT, & Launch",
      description:
        "Pengujian multi-role, pelatihan tim kampus, dan deployment bertahap dengan dukungan 24/7.",
      date: "Week 11 - Week 12",
      status: "up-next",
    },
  ],
  techStack: [
    { name: "Next.js 15", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "Supabase", category: "Backend" },
    { name: "Playwright", category: "Testing" },
  ],
  insights: [
    {
      title: "Masalah Pengguna",
      bullets: [
        "Dosen kesulitan memantau progres mahasiswa karena data tersebar di banyak platform.",
        "Mahasiswa tidak punya satu sumber kebenaran untuk deadline, revisi, dan jadwal bimbingan.",
      ],
    },
    {
      title: "Target Bisnis",
      bullets: [
        "Mengurangi waktu administrasi hingga 45% dan menekan bottle-neck acc proposal.",
        "Memberi transparansi antar tim dalam satu dashboard terpadu.",
      ],
    },
  ],
  challenges: [
    {
      title: "Constraint Teknis",
      bullets: [
        "Integrasi dengan sistem informasi kampus yang legacy tanpa dokumentasi lengkap.",
        "Harus mendukung akses mobile rendah bandwidth untuk mahasiswa di luar kota.",
      ],
    },
    {
      title: "Pendekatan",
      bullets: [
        "Membangun middleware GraphQL untuk sinkronisasi data secara incremental.",
        "Menambahkan offline-ready module untuk catatan konsultasi mahasiswa.",
      ],
    },
  ],
  results: [
    {
      title: "Dampak",
      bullets: [
        "Dashboard memberikan notifikasi otomatis sehingga 87% mahasiswa submit revisi tepat waktu.",
        "Tim akademik bisa melihat heatmap progres dan membagi pembimbing lebih merata.",
      ],
    },
  ],
  gallery: [
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Dashboard monitoring tugas akhir",
      caption: "Dashboard ringkas dengan status bimbingan realtime.",
    },
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Portal mahasiswa",
      caption: "Portal mahasiswa dengan catatan revisi terstruktur.",
    },
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Analytics view",
      caption: "Panel analitik untuk memantau progress per jurusan.",
      span: "col",
    },
  ],
};

export const SampleProjectDetailPage = () => (
  <ProjectDetailTemplate {...SAMPLE_PROJECT_DETAIL} />
);

export default ProjectDetailTemplate;
