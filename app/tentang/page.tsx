import type { Metadata } from "next";

import { breadcrumbJsonLd, SITE_URL } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import { SubpageShell } from "@/app/_components/subpage-shell";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Profil Muhammad Ihsanul Hakim Mokhsen, ASN Pranata Komputer BPAD NTT dan peneliti Digital Forensics serta Information Security.",
  alternates: { canonical: "/tentang" },
  openGraph: { title: "Tentang Muhammad Ihsanul Hakim Mokhsen", url: "/tentang", type: "profile" }
};

export default function TentangPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd("Tentang", "/tentang"),
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${SITE_URL}/tentang#profile`,
            url: `${SITE_URL}/tentang`,
            name: "Tentang Muhammad Ihsanul Hakim Mokhsen",
            mainEntity: { "@id": `${SITE_URL}/#person` }
          }
        ]}
      />
      <SubpageShell
        active="/tentang"
        eyebrow="Tentang"
        intro="Praktisi TI pemerintahan dan peneliti yang menerjemahkan keamanan informasi menjadi riset, alat, dan alur kerja yang dapat dipahami serta diukur."
        title="Teknologi publik yang praktis dan berpusat pada manusia."
      >
        <div className="grid gap-1 sm:grid-cols-[0.22fr_1fr] sm:gap-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#86868b]">Profil</p>
          <div className="max-w-3xl space-y-2 text-xs leading-snug text-[#1d1d1f] sm:text-sm">
            <p>
              Muhammad Ihsanul Hakim Mokhsen, S.Kom., M.S.F adalah ASN Pranata Komputer di BPAD Provinsi Nusa
              Tenggara Timur dan penerima Beasiswa Magister Komdigi.
            </p>
            <p>
              Bidang utamanya meliputi Digital Forensics, Information Security Awareness, HAIS-Q, ketahanan siber
              pemerintahan, AI, perlindungan data, dan pengembangan aplikasi web.
            </p>
            <p>
              Fokus kerjanya adalah membangun solusi yang tidak berhenti pada teknologi, tetapi membantu manusia dan
              institusi mengadopsi perilaku keamanan yang lebih baik.
            </p>
          </div>
        </div>
      </SubpageShell>
    </>
  );
}
