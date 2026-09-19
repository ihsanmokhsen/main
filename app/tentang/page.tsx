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

type Bullet = string;

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: Bullet[];
  entries?: {
    heading: string;
    meta?: string;
    bullets: string[];
  }[];
  chips?: string[];
  chipsLabel?: string;
};

const SECTIONS: Section[] = [
  {
    id: "summary",
    title: "Professional Summary",
    paragraphs: [
      "Government IT practitioner and graduate researcher with a background in computer science, web application development, information security awareness, cybersecurity, and digital forensics. Experienced in developing and supporting digital systems in a public-sector environment, translating operational requirements into practical web-based solutions, analyzing structured information, and producing clear technical and research documentation.",
      "Strong interest in human-centered AI, data protection, security awareness, and AI-assisted software development. Comfortable working independently on research, technical problem solving, documentation, and iterative development.",
      "Currently expanding professional English communication skills and interested in contributing to AI evaluation, data-quality, reasoning, coding, and human-feedback tasks."
    ]
  },
  {
    id: "experience",
    title: "Professional Experience",
    entries: [
      {
        heading: "Pranata Komputer — Badan Pendapatan dan Aset Daerah (BPAD) Provinsi NTT",
        meta: "Kupang, Indonesia | Government IT / Digital Systems",
        bullets: [
          "Support digital transformation and information-technology activities within a provincial government agency.",
          "Develop and maintain practical web-based systems for internal workflows, public information, activity reporting, asset information, and operational monitoring.",
          "Translate business and administrative requirements into functional system concepts, interfaces, data structures, and implementation plans.",
          "Work with Laravel, PHP, MySQL, Blade, Bootstrap, APIs, Git, Linux-based hosting, and related web technologies.",
          "Prepare technical documentation, reports, dashboards, and digital content while coordinating requirements with government units and stakeholders."
        ]
      },
      {
        heading: "Graduate Researcher — Information Security Awareness & Digital Forensics",
        meta: "Telkom University | 2024–2026",
        bullets: [
          "Conducted applied research on information security awareness in Indonesian government institutions.",
          "Improved and validated the Human Aspects of Information Security Questionnaire (HAIS-Q) for a government context.",
          "Analyzed survey data from government employees using quantitative methods and translated findings into actionable security-awareness insights.",
          "Connected research findings with information-security governance, data protection, and human-factor considerations."
        ]
      }
    ]
  },
  {
    id: "education",
    title: "Education",
    bullets: [
      "Master of Forensic Science (Magister Ilmu Forensik), Telkom University, Bandung — 2024–2026 | Final GPA 3.81 | Thesis/Capstone: A",
      "Bachelor of Computer Science (S.Kom.), Universitas Nusa Cendana (UNDANA)"
    ]
  },
  {
    id: "research",
    title: "Research & Publications",
    paragraphs: [
      "Selected research: \u201cIMPROVING HAIS-Q TO ENHANCE INFORMATION SECURITY AWARENESS IN GOVERNMENT AGENCY.\u201d",
      "Co-author/research contributor for \u201cAdaptation and Validation of HAIS-Q for Measuring Information Security Awareness in Indonesian Government Institutions,\u201d presented at ICoCICs 2025.",
      "Research interests include human-centered cybersecurity, security awareness, digital forensics, privacy and data protection, and AI-supported approaches to improving organizational cyber resilience."
    ]
  },
  {
    id: "projects",
    title: "Selected Projects",
    paragraphs: [
      "Selected technical projects include government information websites and internal reporting systems built with Laravel/PHP/MySQL; asset-information and mapping applications; activity-reporting workflows for regional government units; an information-security incident reporting MVP; and experimentation with AI APIs and AI-assisted development workflows.",
      "These projects involve requirements analysis, interface design, database planning, implementation, testing, deployment, and iterative improvement."
    ]
  },
  {
    id: "skills",
    title: "Technical & Professional Skills",
    entries: [
      {
        heading: "Technical",
        bullets: [
          "PHP, Laravel 12, MySQL, Blade, Bootstrap, HTML/CSS, JavaScript, REST APIs, Git, Linux, aaPanel, Docker, networking fundamentals, web development, database design, troubleshooting, and AI/API integration."
        ]
      },
      {
        heading: "Research",
        bullets: [
          "Quantitative survey analysis, questionnaire adaptation and validation, information-security awareness, digital forensics, technical writing, documentation, and evidence-oriented analysis."
        ]
      },
      {
        heading: "Professional",
        bullets: [
          "Problem solving, independent research, requirements analysis, stakeholder coordination, clear documentation, and attention to detail."
        ]
      }
    ]
  },
  {
    id: "additional",
    title: "Additional Information",
    paragraphs: [
      "Professional focus: AI training and evaluation, coding and technical problem solving, research and analytical tasks, information-security content, data quality, and clear written communication.",
      "Languages: Indonesian (native) and English (working proficiency, currently improving through regular practical use)."
    ]
  }
];

function CvSection({ section }: { section: Section }) {
  return (
    <div id={section.id} className="grid gap-1 sm:grid-cols-[0.22fr_1fr] sm:gap-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#86868b]">{section.title}</p>
      <div className="max-w-3xl space-y-2 text-xs leading-snug text-[#1d1d1f] sm:text-sm">
        {section.paragraphs?.map((text) => (
          <p key={text.slice(0, 40)}>{text}</p>
        ))}
        {section.bullets && (
          <ul className="list-disc space-y-0.5 pl-4">
            {section.bullets.map((text) => (
              <li key={text.slice(0, 40)}>{text}</li>
            ))}
          </ul>
        )}
        {section.entries?.map((entry) => (
          <div key={entry.heading} className="space-y-1 border-l-2 divider pl-3">
            <p className="font-medium tracking-tight">{entry.heading}</p>
            {entry.meta && <p className="text-[10px] text-[#86868b] sm:text-[11px]">{entry.meta}</p>}
            <ul className="list-disc space-y-0.5 pl-4 text-[11px] text-[#86868b] sm:text-xs">
              {entry.bullets.map((text) => (
                <li key={text.slice(0, 40)}>{text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <div className="flex items-center gap-3 pb-2 sm:gap-4">
          <img
            src="/foto-baru.png"
            alt="Foto Muhammad Ihsanul Hakim Mokhsen"
            className="h-24 w-[72px] shrink-0 rounded-md object-cover object-top sm:h-32 sm:w-24"
          />
          <div className="min-w-0">
            <p className="text-sm tracking-tight text-[#1d1d1f] sm:text-base">
              Muhammad Ihsanul Hakim Mokhsen, S.Kom.
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-[#86868b] sm:text-[11px]">
              Kupang, East Nusa Tenggara, Indonesia | Government IT Practitioner | Cybersecurity &amp; Digital
              Forensics Researcher
            </p>
          </div>
        </div>
        <div className="divide-y divide-[var(--divider)]">
          {SECTIONS.map((section) => (
            <CvSection key={section.id} section={section} />
          ))}
        </div>
      </SubpageShell>
    </>
  );
}
