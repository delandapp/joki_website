"use client";

import * as React from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  PlayCircle,
  Timer,
  Youtube,
} from "lucide-react";

import {
  ProjectDetailTemplate,
  type ProjectDetailTemplateProps,
} from "@/components/projects/project-detail-template";
import NextJs from "@/components/icons/next-js-icon";
import Typescript from "@/components/icons/typescript-icon";
import Tailwind from "@/components/icons/tailwind-icon";
import FramermotionWordmark from "@/components/icons/framer-motion";
import Postgresql from "@/components/icons/posgresql-icon";

const VIDEO_RISET_DETAIL_CONFIG: ProjectDetailTemplateProps = {
  title: "VIDEO_RISET — Video Materi Terstruktur",
  subtitle: "Learning Video Platform",
  description:
    "Website pembelajaran yang mengkurasi video materi sesuai bab buku. Siswa menonton seperti YouTube Learning, lalu latihan/tryout setelahnya — cepat, terarah, dan nyaman di browser.",

  detailSection: {
    title: "Belajar dari Video, Terstruktur Sesuai Bab Buku",
    description:
      "Akses katalog video yang dipetakan ke kurikulum: per mata pelajaran, bab, hingga subbab.",
    secondaryDescription:
      "Tonton, tandai progres, simpan playlist, dan lanjutkan dari posisi terakhir. Setelah menonton, kerjakan tryout pendamping.",
    highlights: [
      {
        icon: <PlayCircle className="text-brand size-4" />,
        title: "Player Nyaman",
        description:
          "Kontrol playback, resume otomatis, dan history tontonan per siswa.",
      },
      {
        icon: <BookOpen className="text-brand size-4" />,
        title: "Mapping ke Buku",
        description:
          "Video tertaut ke bab & halaman buku sehingga materi mudah dicari.",
      },
    ],
    image: {
      light: "/assets/images/projects/video-riset/fitur.svg",
      alt: "Tampilan dashboard VIDEO_RISET katalog video belajar",
    },
  },

  galleryShowcase: {
    title: "Sorotan Fitur Utama",
    description:
      "Semua yang dibutuhkan siswa untuk belajar dari video: cari, tonton, tandai, dan latihan.",
    cards: [
      {
        image: {
          src: "/assets/images/projects/video-riset/showcase-1.png",
          alt: "Katalog video kurasi per bab",
        },
        icon: <PlayCircle className="text-brand size-5" />,
        title: "Katalog Video Materi",
        description:
          "Kurasi video sesuai mata pelajaran & bab; tinggal klik dan belajar.",
      },
      {
        image: {
          src: "/assets/images/projects/video-riset/showcase-2.png",
          alt: "Playlist berdasarkan buku & bab",
        },
        icon: <BookOpen className="text-brand size-5" />,
        title: "Playlist Buku & Bab",
        description:
          "Susun playlist per topik/halaman buku agar belajar tetap runtut.",
      },
      {
        image: {
          src: "/assets/images/projects/video-riset/showcase-3.png",
          alt: "Pemutar video responsif",
        },
        icon: <Youtube className="text-brand size-5" />,
        title: "Integrasi YouTube",
        description:
          "Embed resmi & YouTube Data API untuk pencarian, detail, dan statistik.",
      },
    ],
    cardSize: { width: 460, height: 420 },
  },

  statsTitle: "Snapshot Proyek",
  statsDescription:
    "Ringkasan cepat durasi, tim, cakupan platform, dan integrasi utama.",
  stats: [
    {
      label: "Durasi Pengembangan",
      value: "1 Minggu",
      description: "Perencanaan, build, dan rilis awal",
      icon: "Timer",
    },
    {
      label: "Jumlah Developer",
      value: "1 Orang",
      description: "Fullstack end-to-end",
      icon: "User",
    },
    {
      label: "Platform",
      value: "Web Only",
      description: "Optimasi desktop & mobile browser",
      icon: "Monitor",
    },
    {
      label: "Integrasi",
      value: "YouTube API",
      description: "Embed, playlist, dan metadata video",
      icon: "Youtube",
    },
  ],

  actions: [
    {
      label: "Lihat Demo",
      href: "#kontak",
      icon: <ExternalLink className="size-4" />,
      variant: "accent",
      newTab: false,
    },
    {
      label: "Download Dokumentasi",
      href: "#",
      icon: <FileText className="size-4" />,
      newTab: true,
    },
  ],

  integrationsTitle: "Ekosistem & Integrasi",
  integrationsDescription:
    "Terhubung ke YouTube Data API v3 untuk pencarian, playlist, detail channel, dan statistik tontonan. Dukungan embed resmi memastikan performa dan kepatuhan.",
  integrationsCTA: {
    label: "Pelajari Integrasi YouTube",
    href: "#",
    icon: <ExternalLink className="size-4" />,
    newTab: true,
  },
  integrationsHighlight: {
    quote:
      "Integrasi YouTube membuat kurasi materi jadi cepat, legal, dan mudah diskalakan.",
    author: "Muhammad Deland Arjuna Putra",
    role: "Fullstack Developer VIDEO_RISET",
    icon: <Youtube className="text-brand size-6" />,
  },

  timelineTitle: "Timeline Pengerjaan",
  timelineDescription:
    "Sprint 7 hari fokus pada kurasi konten & integrasi YouTube.",
  timeline: [
    {
      title: "Scoping & Struktur Konten",
      description:
        "Mapping mata pelajaran → bab → subbab, definisi skema playlist.",
      date: "Day 1",
      status: "done",
      icon: <BookOpen className="text-brand size-3" />,
    },
    {
      title: "UI Katalog & Player",
      description:
        "Bangun UI katalog, halaman detail video, dan pemutar responsif.",
      date: "Day 2 - Day 3",
      status: "done",
      icon: <PlayCircle className="text-brand size-3" />,
    },
    {
      title: "Integrasi YouTube API",
      description: "Pencarian, detail video, playlist, dan cache server-side.",
      date: "Day 4 - Day 5",
      status: "in-progress",
      icon: <Youtube className="text-brand size-3" />,
    },
    {
      title: "QA & Launch",
      description: "Uji lintas perangkat, dokumentasi singkat, rilis awal.",
      date: "Day 6 - Day 7",
      status: "up-next",
      icon: <Timer className="text-brand size-3" />,
    },
  ],

  techStack: [
    { name: "Next.js 15", category: "Frontend", icon: <NextJs size="16" /> },
    {
      name: "TypeScript",
      category: "Language",
      icon: <Typescript size="16" />,
    },
    { name: "Tailwind CSS", category: "Styling", icon: <Tailwind size="16" /> },
    {
      name: "Framer Motion",
      category: "Animation",
      icon: <FramermotionWordmark size="16" />,
    },
    {
      name: "YouTube Data API v3",
      category: "Integration",
      icon: <Youtube size="16" />,
    },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: <Postgresql size="16" />,
    }, // untuk bookmark/history opsional
  ],

  insights: [
    {
      title: "Masalah Awal",
      bullets: [
        "Video materi tersebar, sulit ditemukan sesuai bab & halaman buku.",
        "Siswa belum punya jejak tontonan/lanjutkan dari posisi terakhir.",
      ],
    },
    {
      title: "Tujuan Utama",
      bullets: [
        "Menghadirkan kurasi video yang mengikuti struktur buku/kurikulum.",
        "Memberi pengalaman nonton nyaman + tryout pendamping setelah belajar.",
      ],
    },
  ],

  challenges: [
    {
      title: "Kendala Teknis",
      bullets: [
        "Rate limit YouTube API saat pencarian & load playlist besar.",
        "Sinkronisasi metadata video ke struktur bab buku yang konsisten.",
      ],
    },
    {
      title: "Solusi Implementasi",
      bullets: [
        "Caching server-side & pagination agar efisien dan hemat kuota API.",
        "Normalisasi skema (map: pelajaran → bab → video) untuk query cepat.",
      ],
    },
  ],

  results: [
    {
      title: "Hasil & Dampak",
      bullets: [
        "Waktu mencari materi turun signifikan berkat kurasi per bab.",
        "Siswa lebih tuntas: tonton → tandai selesai → lanjut tryout.",
      ],
    },
  ],

  gallery: [
    {
      src: "/assets/images/projects/video-riset/showcase-1.png",
      alt: "Katalog video per mata pelajaran",
      caption: "Katalog kurasi: filter pelajaran, bab, durasi, dan channel.",
      span: "col",
    },
    {
      src: "/assets/images/projects/video-riset/showcase-2.png",
      alt: "Halaman player & playlist",
      caption: "Player responsif dengan playlist dan resume tontonan.",
    },
    {
      src: "/assets/images/projects/video-riset/showcase-3.png",
      alt: "Halaman detail video & materi pendamping",
      caption: "Detail video, ringkasan materi, dan tautan ke tryout.",
    },
  ],
};

const TkaDetailProject: React.FC = () => (
  <ProjectDetailTemplate {...VIDEO_RISET_DETAIL_CONFIG} />
);

export default TkaDetailProject;
