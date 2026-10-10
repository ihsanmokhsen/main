export const SITE_URL = "https://www.ihsanmokhsen.com";
export const PERSON_NAME = "Muhammad Ihsanul Hakim Mokhsen";
export const SITE_DESCRIPTION =
  "Situs resmi Muhammad Ihsanul Hakim Mokhsen, S.Kom. — Government IT Practitioner di BPAD Provinsi NTT, peneliti Cybersecurity & Digital Forensics (HAIS-Q), pembangun web pemerintahan, dan pengelola VPS.";

export const PRIMARY_PAGES = [
  { href: "/tentang", label: "Tentang" },
  { href: "/karya", label: "Karya" },
  { href: "/publikasi", label: "Publikasi" },
  { href: "/kontak", label: "Kontak" }
] as const;

export const PROJECTS = [
  {
    title: "Works",
    description: "Aplikasi pemerintahan, produk digital, prototipe, dan proyek pribadi.",
    descriptionEn: "Government apps, digital products, prototypes, and personal projects.",
    href: "https://works.ihsanmokhsen.com/"
  },
  {
    title: "Stories",
    description: "Catatan, refleksi, proses kreatif, dan dokumentasi pekerjaan.",
    descriptionEn: "Notes, reflections, creative process, and work documentation.",
    href: "https://works.ihsanmokhsen.com/journal"
  },
  {
    title: "Research",
    description: "Riset Digital Forensics, Information Security Awareness, dan HAIS-Q.",
    descriptionEn: "Research on Digital Forensics, Information Security Awareness, and HAIS-Q.",
    href: "https://research.ihsanmokhsen.com/"
  },
  {
    title: "GitHub",
    description: "Repositori kode dan eksperimen pengembangan perangkat lunak.",
    descriptionEn: "Code repositories and software development experiments.",
    href: "https://github.com/ihsanmokhsen"
  }
] as const;

export const CONTACTS = [
  { label: "Email", value: "ihsanmokhsen17@gmail.com", href: "mailto:ihsanmokhsen17@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/ihsanmokhsen", href: "https://www.linkedin.com/in/ihsanmokhsen/" },
  { label: "GitHub", value: "github.com/ihsanmokhsen", href: "https://github.com/ihsanmokhsen" },
  { label: "Instagram", value: "@rex.orange777", href: "https://www.instagram.com/rex.orange777/" }
] as const;

export const PERSON_JSON_LD = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PERSON_NAME,
  alternateName: ["Ihsan Mokhsen", "alhakimi", "M. I. H. Mokhsen"],
  url: SITE_URL,
  image: `${SITE_URL}/foto-baru.png`,
  jobTitle: "Government IT Practitioner & Cybersecurity Researcher",
  description: SITE_DESCRIPTION,
  homeLocation: {
    "@type": "Place",
    name: "Kupang, Nusa Tenggara Timur, Indonesia"
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Telkom University",
      sameAs: "https://www.telkomuniversity.ac.id/"
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Universitas Nusa Cendana",
      sameAs: "https://www.undana.ac.id/"
    }
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Indonesian", alternateName: "id" },
    { "@type": "Language", name: "English", alternateName: "en" }
  ],
  worksFor: {
    "@type": "GovernmentOrganization",
    name: "Badan Pendapatan dan Aset Daerah Provinsi Nusa Tenggara Timur"
  },
  knowsAbout: [
    "Digital Forensics",
    "Information Security",
    "Cybersecurity Awareness",
    "HAIS-Q",
    "Artificial Intelligence",
    "Human-centered AI",
    "AI-assisted Software Development",
    "Data Protection",
    "Privacy",
    "Web Development",
    "Laravel",
    "PHP",
    "MySQL",
    "Linux Server Administration",
    "VPS Management",
    "Government Information Systems",
    "Quantitative Survey Analysis"
  ],
  sameAs: [
    "https://www.linkedin.com/in/ihsanmokhsen/",
    "https://github.com/ihsanmokhsen",
    "https://www.instagram.com/rex.orange777/",
    "https://works.ihsanmokhsen.com/",
    "https://research.ihsanmokhsen.com/",
    "https://jurnal.ihsanmokhsen.com/"
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Pranata Komputer",
    occupationLocation: {
      "@type": "City",
      name: "Kupang",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kupang",
        addressRegion: "Nusa Tenggara Timur",
        addressCountry: "ID"
      }
    }
  }
};

export const WEBSITE_JSON_LD = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: PERSON_NAME,
  alternateName: ["Ihsan Mokhsen", "ihsanmokhsen.com"],
  description: SITE_DESCRIPTION,
  inLanguage: ["id-ID", "en"],
  publisher: { "@id": `${SITE_URL}/#person` },
  hasPart: PRIMARY_PAGES.map((page) => ({
    "@type": "WebPage",
    name: page.label,
    url: `${SITE_URL}${page.href}`
  }))
};

export const NAVIGATION_JSON_LD = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#navigation`,
  name: "Navigasi utama",
  itemListElement: PRIMARY_PAGES.map((page, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: page.label,
    url: `${SITE_URL}${page.href}`
  }))
};

export function breadcrumbJsonLd(currentName: string, currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: currentName,
        item: `${SITE_URL}${currentPath}`
      }
    ]
  };
}
