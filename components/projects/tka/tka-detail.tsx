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
  title: "Transformasi Tata Kelola Akademik",
  subtitle: "Case Study",
  description:
    "Kami merancang platform terpadu untuk memantau tugas akhir, bimbingan, dan arsip akademik secara real-time. Fokusnya: pengalaman dosen & mahasiswa yang lebih sinkron, aman, dan transparan.",
  detailSection: {
    title: "Serahkan koordinasi tugas akhir ke platform yang terintegrasi",
    description:
      "Tim kampus memperoleh satu pusat kontrol untuk memantau proposal, konsultasi, hingga pengesahan dokumen.",
    secondaryDescription:
      "Mahasiswa, dosen pembimbing, dan admin akademik melihat status yang sama — tanpa lagi berburu file atau catatan manual.",
    highlights: [
      {
        icon: <Sparkles className="text-brand size-4" />,
        title: "Dashboard Realtime",
        description:
          "Status setiap mahasiswa tersinkron otomatis beserta notifikasi progres berikutnya.",
      },
      {
        icon: <ShieldCheck className="text-brand size-4" />,
        title: "Kepatuhan & Arsip",
        description:
          "Arsip digital terenkripsi dengan log audit untuk memenuhi standar institusi.",
      },
    ],
    image: {
      light: "/assets/images/projects/coming-soon.svg",
      alt: "Tampilan dashboard Tata Kelola Akademik",
    },
  },
  galleryShowcase: {
    title: "Sorotan Modul Utama",
    description:
      "Kartu-kartu fitur yang menunjukkan nilai praktis untuk tim kampus dan mahasiswa.",
    cards: [
      {
        icon: <Rocket className="text-brand size-5" />,
        title: "Automasi Workflow",
        description:
          "Template tahapan tugas akhir yang otomatis mengarahkan mahasiswa dan pembimbing.",
      },
      {
        icon: <BarChart3 className="text-brand size-5" />,
        title: "Panel Analitik",
        description:
          "Pantau beban pembimbing, tingkat revisi, dan distribusi progress per jurusan.",
      },
      {
        icon: <Timer className="text-brand size-5" />,
        title: "Pengingat Adaptif",
        description:
          "Pengingat cerdas melalui email dan mobile companion demi ketepatan jadwal.",
      },
    ],
    cardSize: { width: 460, height: 420 },
  },
  statsTitle: "Snapshot Proyek",
  statsDescription:
    "Empat indikator inti yang menggambarkan ritme kerja, cakupan platform, serta komitmen keamanan dalam implementasi TKA.",
  stats: [
    {
      label: "Durasi Sprint",
      value: "12 Minggu",
      description: "Discovery, build, QA hingga pelatihan internal",
      icon: "Timer",
    },
    {
      label: "Tim Inti",
      value: "6 Orang",
      description: "Product, FE, BE, QA, dan UI/UX berkolaborasi",
      icon: "Users",
    },
    {
      label: "Platform Aktif",
      value: "Web & Mobile",
      description: "Dashboard admin, portal mahasiswa, companion mobile",
      icon: "Smartphone",
    },
    {
      label: "Integrasi Sistem",
      value: "4 Sistem",
      description: "SSO Kampus, LMS, Arsip Digital, dan Email Gateway",
      icon: "ShieldCheck",
    },
  ],
  actions: [
    {
      label: "Minta Demo",
      href: "#kontak",
      icon: <ExternalLink className="size-4" />,
      variant: "accent",
      newTab: false,
    },
    {
      label: "Download Ringkasan",
      href: "#",
      icon: <FileText className="size-4" />,
      newTab: true,
    },
  ],
  integrationsTitle: "Integrasi & Ekosistem",
  integrationsDescription:
    "Dirancang untuk tersambung dengan ekosistem kampus: mulai dari SSO, learning management system, hingga repository dokumen resmi.",
  integrationsCTA: {
    label: "Lihat Integrasi Lengkap",
    href: "#",
    icon: <ExternalLink className="size-4" />,
    newTab: true,
  },
  integrationsHighlight: {
    quote:
      "Integrasi ke sistem kampus lama berlangsung mulus dan kini proses monitoring jauh lebih transparan.",
    author: "Kepala Divisi TI Kampus Digital",
    role: "Stakeholder Implementasi",
    icon: <ShieldCheck className="text-brand size-6" />,
  },
  timelineTitle: "Timeline Pengembangan",
  timelineDescription:
    "Tahapan prioritas yang kami lalui untuk melepas dashboard TKA ke lingkungan produksi.",
  timeline: [
    {
      title: "Discovery & Alignment",
      description:
        "Audit alur akademik, interview stakeholder, dan mapping kebutuhan lintas fakultas.",
      date: "Week 1 - Week 2",
      status: "done",
      icon: <Users className="text-brand size-3" />,
    },
    {
      title: "Design Sprint & Prototype",
      description:
        "Blueprint modul dashboard, portal mahasiswa, serta prototipe interaktif untuk usability testing cepat.",
      date: "Week 3 - Week 5",
      status: "done",
      icon: <Sparkles className="text-brand size-3" />,
    },
    {
      title: "Implementasi Bertahap",
      description:
        "Pengembangan modul workflow, integrasi SSO kampus, sistem notifikasi, dan automasi arsip.",
      date: "Week 6 - Week 10",
      status: "in-progress",
      icon: <Timer className="text-brand size-3" />,
    },
    {
      title: "QA, UAT, & Launch Support",
      description:
        "Stress-test multi-role, dokumentasi internal, onboarding tim kampus, dan support peluncuran.",
      date: "Week 11 - Week 12",
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
    { name: "Express Js", category: "Backend", icon: <Express size="16" /> },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: <Postgresql size="16" />,
    },
  ],
  insights: [
    {
      title: "Masalah Inti",
      bullets: [
        "Data progres mahasiswa tersebar di spreadsheet pribadi, sulit dilacak lintas pembimbing.",
        "Admin akademik menghabiskan waktu 3-4 jam per hari untuk rekap manual status tugas akhir.",
      ],
    },
    {
      title: "Target Bisnis",
      bullets: [
        "Mengurangi beban administrasi hingga 40% dalam semester pertama.",
        "Menumbuhkan kepuasan mahasiswa dan dosen dengan status bimbingan yang transparan.",
      ],
    },
  ],
  challenges: [
    {
      title: "Constraint Teknis",
      bullets: [
        "Integrasi dengan sistem legacy kampus tanpa dokumentasi API yang lengkap.",
        "Mendukung akses mahasiswa di daerah dengan koneksi internet terbatas.",
      ],
    },
    {
      title: "Solusi",
      bullets: [
        "Membangun middleware GraphQL agar sinkronisasi data bisa incremental dan terjaga konsistensinya.",
        "Menambahkan mode offline-ready untuk catatan konsultasi via aplikasi mobile companion.",
      ],
    },
  ],
  results: [
    {
      title: "Dampak",
      bullets: [
        "87% mahasiswa submit revisi tepat waktu berkat notifikasi otomatis dan checklist digital.",
        "Tim akademik dapat memonitor beban dosen pembimbing dan redistribusi tugas secara cepat.",
      ],
    },
  ],
  gallery: [
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Dashboard monitoring tugas akhir",
      caption:
        "Dashboard ringkas menampilkan status bimbingan dan notifikasi otomatis.",
      span: "col",
    },
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Portal mahasiswa",
      caption: "Portal mahasiswa dengan timeline tugas akhir dan arsip revisi.",
    },
    {
      src: "/assets/images/projects/coming-soon.svg",
      alt: "Panel analitik akademik",
      caption: "Analitik performa tiap jurusan untuk rapat evaluasi berkala.",
    },
  ],
};

const TkaDetailProject: React.FC = () => (
  <ProjectDetailTemplate {...TKA_DETAIL_CONFIG} />
);

export default TkaDetailProject;
