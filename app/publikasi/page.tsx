import type { Metadata } from "next";

import { breadcrumbJsonLd, SITE_URL } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import { SubpageShell } from "@/app/_components/subpage-shell";

export const metadata: Metadata = {
  title: "Publikasi & Riset",
  description:
    "Publikasi dan riset Muhammad Ihsanul Hakim Mokhsen tentang Information Security Awareness dan HAIS-Q.",
  alternates: { canonical: "/publikasi" },
  openGraph: { title: "Publikasi & Riset Ihsan Mokhsen", url: "/publikasi", type: "article" }
};

export default function PublikasiPage() {
  const title =
    "Adaptation and Validation of HAIS-Q for Measuring Information Security Awareness in Indonesian Government Institutions";

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd("Publikasi", "/publikasi"),
          {
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: title,
            author: [
              { "@id": `${SITE_URL}/#person` },
              { "@type": "Person", name: "Rio Guntur Utomo" }
            ],
            datePublished: "2025",
            identifier: "https://doi.org/10.1109/ICoCICs68032.2025.11383985",
            sameAs: "https://doi.org/10.1109/ICoCICs68032.2025.11383985"
          }
        ]}
      />
      <SubpageShell
        active="/publikasi"
        eyebrow="Publikasi"
        intro="Riset yang berfokus pada pengukuran kesadaran keamanan informasi dan peningkatan perilaku keamanan di institusi pemerintahan Indonesia."
        title="Riset keamanan informasi yang dapat diukur."
      >
        <article className="max-w-4xl border-y divider py-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">IEEE ICoCICs 2025</p>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3.4rem)] font-light leading-tight tracking-tight text-[#1d1d1f]">
            {title}
          </h2>
          <p className="mt-5 text-[14px] leading-7 text-[#86868b]">M. I. H. Mokhsen dan Rio Guntur Utomo</p>
          <a
            className="nav-underline mt-6 text-[13px] text-[#f44a22]"
            href="https://doi.org/10.1109/ICoCICs68032.2025.11383985"
            rel="noreferrer"
            target="_blank"
          >
            DOI 10.1109/ICoCICs68032.2025.11383985
          </a>
        </article>
      </SubpageShell>
    </>
  );
}
