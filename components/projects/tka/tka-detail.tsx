"use client";

import * as React from "react";
import {
  BarChart3,
  ExternalLink,
  FileText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";

import {
  ProjectDetailTemplate,
  type ProjectDetailTemplateProps,
} from "@/components/projects/project-detail-template";
import NextJs from "@/components/icons/next-js-icon";
import Typescript from "@/components/icons/typescript-icon";
import Tailwind from "@/components/icons/tailwind-icon";
import FramermotionWordmark from "@/components/icons/framer-motion";
import Express from "@/components/icons/express-js-icon";
import Postgresql from "@/components/icons/posgresql-icon";

const TKA_DETAIL_CONFIG: ProjectDetailTemplateProps = {
  title: "TKA — Tryout Kelompok Aktif",
  subtitle: "Realtime Tryout Platform",
  description:
    "Platform tryout berbasis web yang menghadirkan pengalaman ujian layaknya ruang kelas virtual. Siswa masuk ke room, pengawas memantau secara realtime, lengkap dengan pembahasan interaktif pasca-ujian.",
  detailSection: {
    title: "Ujian Online Sekelas Zoom, tapi Lebih Fokus & Terkontrol",
    description:
      "Pengawas dapat membuat room ujian, memantau aktivitas peserta, hingga menutup sesi secara langsung dengan satu klik.",
    secondaryDescription:
      "Siswa cukup masuk ke room yang ditentukan, mengikuti tryout realtime, dan langsung mendapat pembahasan otomatis setelah selesai.",
    highlights: [
      {
        icon: <Rocket className="text-brand size-4" />,
        title: "Realtime Monitoring",
        description:
          "Setiap aktivitas siswa — mulai dari masuk room hingga submit jawaban — terpantau langsung via socket.",
      },
      {
        icon: <BarChart3 className="text-brand size-4" />,
        title: "Pembahasan Otomatis",
        description:
          "Selesai ujian, sistem langsung menampilkan hasil dan pembahasan interaktif per soal.",
      },
    ],
    image: {
      light: "/assets/images/projects/tka/showcase-1.png",
      alt: "Tampilan dashboard TKA realtime tryout",
    },
  },

  galleryShowcase: {
    title: "Sorotan Fitur Utama",
    description:
      "Fitur-fitur inti yang membuat pengalaman tryout jadi terasa nyata, terarah, dan menyenangkan.",
    cards: [
      {
        image: {
          src: "/assets/images/projects/tka/showcase-1.png",
          alt: "Pratinjau room tryout TKA",
        },
        icon: <Rocket className="text-brand size-5" />,
        title: "Room Ujian Realtime",
        description:
          "Pengawas membuat ruang ujian layaknya Zoom — siswa bergabung dan langsung diawasi realtime.",
      },
      {
        image: {
          src: "/assets/images/projects/tka/showcase-2.png",
          alt: "Pratinjau pembahasan tryout TKA",
        },
        icon: <BarChart3 className="text-brand size-5" />,
        title: "Pembahasan Otomatis",
        description:
          "Begitu ujian selesai, hasil dan pembahasan muncul instan untuk tiap soal.",
      },
      {
        image: {
          src: "/assets/images/projects/tka/showcase-3.png",
          alt: "Dashboard pengawas TKA",
        },
        icon: <Timer className="text-brand size-5" />,
        title: "Dashboard Pengawas",
        description:
          "Pantau kehadiran, aktivitas, dan waktu siswa secara langsung dalam satu panel realtime.",
      },
    ],
    cardSize: { width: 460, height: 420 },
  },

  statsTitle: "Snapshot Proyek",
  statsDescription:
    "Data singkat yang menggambarkan kompleksitas proyek, fokus pengembangan, dan efisiensi pengerjaan.",
  stats: [
    {
      label: "Durasi Pengembangan",
      value: "2 Minggu",
      description: "Build fullstack dari setup hingga deployment final",
      icon: "Timer",
    },
    {
      label: "Jumlah Developer",
      value: "1 Orang",
      description:
        "Fullstack: frontend, backend, dan DevOps dikerjakan mandiri",
      icon: "User",
    },
    {
      label: "Platform",
      value: "Web Only",
      description: "Akses lewat browser, responsif untuk desktop & mobile",
      icon: "Monitor",
    },
    {
      label: "Integrasi",
      value: "Dockerized",
      description:
        "Environment tersusun rapi dengan container untuk service utama",
      icon: "ShieldCheck",
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
    "TKA dirancang agar mudah dijalankan di berbagai server melalui Docker. Backend, frontend, dan socket server terpisah dalam container independen untuk performa optimal.",
  integrationsCTA: {
    label: "Pelajari Setup Docker",
    href: "#",
    icon: <ExternalLink className="size-4" />,
    newTab: true,
  },
  integrationsHighlight: {
    quote:
      "Dengan integrasi socket.io dan Docker, semua aktivitas tryout berjalan lancar tanpa delay.",
    author: "Muhammad Deland Arjuna Putra",
    role: "Fullstack Developer TKA",
    icon: <Rocket className="text-brand size-6" />,
  },

  timelineTitle: "Timeline Pengerjaan",
  timelineDescription:
    "Dua minggu sprint dengan fokus pada stabilitas realtime dan efisiensi deployment.",
  timeline: [
    {
      title: "Perancangan Fitur & Arsitektur",
      description:
        "Menentukan alur user, struktur database, dan arsitektur socket realtime.",
      date: "Day 1 - Day 2",
      status: "done",
      icon: <Users className="text-brand size-3" />,
    },
    {
      title: "Pembuatan UI & API",
      description:
        "Build frontend dengan Next.js dan backend Express + Socket.io.",
      date: "Day 3 - Day 7",
      status: "done",
      icon: <Sparkles className="text-brand size-3" />,
    },
    {
      title: "Integrasi Realtime & Testing",
      description:
        "Menghubungkan socket, memastikan komunikasi antar room stabil.",
      date: "Day 8 - Day 11",
      status: "in-progress",
      icon: <Timer className="text-brand size-3" />,
    },
    {
      title: "Dockerization & Launch",
      description:
        "Menyusun environment Docker dan melakukan deployment final.",
      date: "Day 12 - Day 14",
      status: "up-next",
      icon: <Rocket className="text-brand size-3" />,
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
    { name: "Express.js", category: "Backend", icon: <Express size="16" /> },
    { name: "Socket.io", category: "Realtime", icon: <Rocket size="16" /> },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: <Postgresql size="16" />,
    },
    { name: "Docker", category: "Deployment", icon: <ShieldCheck size="16" /> },
  ],

  insights: [
    {
      title: "Masalah Awal",
      bullets: [
        "Tryout online sering terkendala karena delay dan minim kontrol pengawas.",
        "Sistem lama tidak mendukung komunikasi realtime antar siswa dan pengawas.",
      ],
    },
    {
      title: "Tujuan Utama",
      bullets: [
        "Menciptakan ruang ujian virtual interaktif dengan pengawasan realtime.",
        "Memberi siswa pengalaman belajar & evaluasi yang transparan dan cepat.",
      ],
    },
  ],

  challenges: [
    {
      title: "Kendala Teknis",
      bullets: [
        "Menjaga stabilitas socket di banyak room dengan pengguna aktif bersamaan.",
        "Optimasi performa agar ringan di jaringan sekolah yang terbatas.",
      ],
    },
    {
      title: "Solusi Implementasi",
      bullets: [
        "Menggunakan event-driven architecture di socket server.",
        "Men-deploy semua service lewat Docker untuk environment yang konsisten.",
      ],
    },
  ],

  results: [
    {
      title: "Hasil & Dampak",
      bullets: [
        "Tryout berlangsung stabil hingga 100+ peserta aktif tanpa lag.",
        "Waktu evaluasi turun 80% berkat pembahasan otomatis pasca-ujian.",
      ],
    },
  ],

  gallery: [
    {
      src: "/assets/images/projects/tka/showcase-1.png",
      alt: "Room tryout realtime",
      caption:
        "Antarmuka room tryout dengan daftar peserta dan waktu berjalan realtime.",
      span: "col",
    },
    {
      src: "/assets/images/projects/tka/showcase-2.png",
      alt: "Hasil & pembahasan tryout",
      caption:
        "Pembahasan otomatis muncul langsung setelah siswa menyelesaikan ujian.",
    },
    {
      src: "/assets/images/projects/tka/showcase-3.png",
      alt: "Dashboard pengawas",
      caption:
        "Dashboard pengawas untuk memantau seluruh aktivitas peserta secara live.",
    },
  ],
};

const TkaDetailProject: React.FC = () => (
  <ProjectDetailTemplate {...TKA_DETAIL_CONFIG} />
);

export default TkaDetailProject;
