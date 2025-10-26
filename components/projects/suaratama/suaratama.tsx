import * as React from "react";
import { BarChart3, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

import Flutter from "../../logos/flutter";
import ReactLogo from "../../logos/react";
import Tailwind from "../../logos/tailwind";
import Typescript from "../../logos/typescript";
import {
  CardShiftProject,
  type CardShiftProjectProps,
} from "../card-shift-project";

const SUARATAMA_PROJECT_CARD: CardShiftProjectProps = {
  title: "Suaratama",
  description:
    "Platform terpadu untuk memonitor tugas akhir, jadwal pembimbingan, dan arsip dokumen akademik secara real-time. Dashboard dirancang agar tim kampus dan mahasiswa dapat berkolaborasi tanpa hambatan.",
  image: {
    src: "/assets/images/projects/suaratama/poster.svg",
    alt: "Pratinjau dashboard Tata Kelola Akademik",
  },
  icons: [
    { icon: <ReactLogo className="h-6 w-6" />, label: "React" },
    { icon: <Typescript className="h-6 w-6" />, label: "TypeScript" },
    { icon: <Tailwind className="h-6 w-6" />, label: "TailwindCSS" },
    { icon: <Flutter className="h-6 w-6" />, label: "Flutter Companion" },
  ],
  highlights: [
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "Workflow Otomatis",
      description:
        "Status proposal, revisi, hingga persetujuan ter-update otomatis sehingga dosen dan mahasiswa selalu sinkron.",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Keamanan Terkendali",
      description:
        "Role-based access, arsip terenkripsi, serta log aktivitas lengkap untuk audit internal kampus.",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Analitik Realtime",
      description:
        "Pantau progres tiap jurusan, riwayat konsultasi, dan performa kelulusan lewat panel analitik interaktif.",
    },
  ],
  actions: [
    {
      label: "Lihat Demo",
      href: "#",
      icon: <ExternalLink className="h-4 w-4" />,
      newTab: true,
    },
    {
      label: "Detail Project",
      href: "#",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
  ],
};

const SuaratamaProject = () => (
  <CardShiftProject
    {...SUARATAMA_PROJECT_CARD}
    className="flex justify-center"
  />
);

export default SuaratamaProject;
