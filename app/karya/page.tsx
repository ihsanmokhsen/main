import type { Metadata } from "next";

import { breadcrumbJsonLd } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import { SubpageShell } from "@/app/_components/subpage-shell";

export const metadata: Metadata = {
  title: "Karya & Proyek",
  description: "Kumpulan aplikasi, riset, catatan, dan eksperimen digital karya Muhammad Ihsanul Hakim Mokhsen.",
  alternates: { canonical: "/karya" },
  openGraph: { title: "Karya & Proyek Ihsan Mokhsen", url: "/karya", type: "website" }
};

const projects = [
  {
    title: "Works",
    description: "Aplikasi pemerintahan, produk digital, prototipe, dan proyek pribadi.",
    href: "https://works.ihsanmokhsen.com/"
  },
  {
    title: "Stories",
    description: "Catatan, refleksi, proses kreatif, dan dokumentasi pekerjaan.",
    href: "https://works.ihsanmokhsen.com/journal"
  },
  {
    title: "Research",
    description: "Riset Digital Forensics, Information Security Awareness, dan HAIS-Q.",
    href: "https://research.ihsanmokhsen.com/"
  },
  {
    title: "GitHub",
    description: "Repositori kode dan eksperimen pengembangan perangkat lunak.",
    href: "https://github.com/ihsanmokhsen"
  }
] as const;

export default function KaryaPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd("Karya", "/karya")} />
      <SubpageShell
        active="/karya"
        eyebrow="Karya"
        intro="Pilihan pekerjaan yang menghubungkan kebutuhan pemerintahan, riset keamanan informasi, dan pengembangan produk digital."
        title="Aplikasi, riset, dan eksperimen digital."
      >
        <div className="divide-y divider">
          {projects.map((project) => (
            <a
              className="group grid gap-1 py-1.5 sm:grid-cols-[0.25fr_1fr_auto] sm:items-center sm:gap-5"
              href={project.href}
              key={project.title}
              rel="noreferrer"
              target="_blank"
            >
              <h2 className="text-xs tracking-tight text-[#1d1d1f] group-hover:text-[#f44a22] sm:text-sm">
                {project.title}
              </h2>
              <p className="text-[10px] leading-snug text-[#86868b] sm:text-[11px]">{project.description}</p>
              <span aria-hidden="true" className="text-xs text-[#86868b] group-hover:text-[#f44a22]">↗</span>
            </a>
          ))}
        </div>
      </SubpageShell>
    </>
  );
}
