import type { Metadata } from "next";

import { breadcrumbJsonLd } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import { SubpageShell } from "@/app/_components/subpage-shell";

export const metadata: Metadata = {
  title: "Kontak & Kolaborasi",
  description:
    "Hubungi Muhammad Ihsanul Hakim Mokhsen untuk kolaborasi keamanan siber, digital forensics, riset, dan pengembangan web.",
  alternates: { canonical: "/kontak" },
  openGraph: { title: "Kontak Ihsan Mokhsen", url: "/kontak", type: "website" }
};

const contacts = [
  { label: "Email", value: "ihsanmokhsen17@gmail.com", href: "mailto:ihsanmokhsen17@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/ihsanmokhsen", href: "https://www.linkedin.com/in/ihsanmokhsen/" },
  { label: "GitHub", value: "github.com/ihsanmokhsen", href: "https://github.com/ihsanmokhsen" },
  { label: "Instagram", value: "@rex.orange777", href: "https://www.instagram.com/rex.orange777/" }
] as const;

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
        <address className="not-italic divide-y divider border-y divider">
          {contacts.map((contact) => (
            <a
              className="group grid gap-2 py-6 sm:grid-cols-[0.3fr_1fr_auto] sm:items-center sm:gap-8"
              href={contact.href}
              key={contact.label}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
            >
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">{contact.label}</span>
              <span className="text-[16px] text-[#1d1d1f] group-hover:text-[#f44a22]">{contact.value}</span>
              <span aria-hidden="true" className="text-[#86868b] group-hover:text-[#f44a22]">↗</span>
            </a>
          ))}
        </address>
      </SubpageShell>
    </>
  );
}
