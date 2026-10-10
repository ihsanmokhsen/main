import type { Metadata } from "next";

import { breadcrumbJsonLd, CONTACTS } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import { SubpageShell } from "@/app/_components/subpage-shell";

export const metadata: Metadata = {
  title: "Kontak & Kolaborasi",
  description:
    "Hubungi Muhammad Ihsanul Hakim Mokhsen untuk kolaborasi keamanan siber, digital forensics, riset, dan pengembangan web.",
  alternates: { canonical: "/kontak" },
  openGraph: { title: "Kontak Ihsan Mokhsen", url: "/kontak", type: "website" }
};

export default function KontakPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd("Kontak", "/kontak")} />
      <SubpageShell
        active="/kontak"
        eyebrow="Kontak"
        intro="Terbuka untuk diskusi dan kolaborasi pada keamanan informasi, digital forensics, riset pemerintahan, AI, dan pengembangan produk digital."
        title="Mari membangun sesuatu yang berguna."
      >
        <address className="not-italic divide-y divider">
          {CONTACTS.map((contact) => (
            <a
              className="group grid gap-1 py-1.5 sm:grid-cols-[0.22fr_1fr_auto] sm:items-center sm:gap-5"
              href={contact.href}
              key={contact.label}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
            >
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">{contact.label}</span>
              <span className="text-xs text-[#1d1d1f] group-hover:text-[#f44a22] sm:text-sm">{contact.value}</span>
              <span aria-hidden="true" className="text-xs text-[#86868b] group-hover:text-[#f44a22]">↗</span>
            </a>
          ))}
        </address>
      </SubpageShell>
    </>
  );
}
