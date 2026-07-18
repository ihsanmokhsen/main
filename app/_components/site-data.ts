export const SITE_URL = "https://www.ihsanmokhsen.com";
export const PERSON_NAME = "Muhammad Ihsanul Hakim Mokhsen";
export const SITE_DESCRIPTION =
  "Profil Muhammad Ihsanul Hakim Mokhsen, ASN Pranata Komputer BPAD Provinsi NTT, penerima Beasiswa Magister Komdigi, dan peneliti keamanan informasi.";

export const PRIMARY_PAGES = [
  { href: "/tentang", label: "Tentang" },
  { href: "/karya", label: "Karya" },
  { href: "/publikasi", label: "Publikasi" },
  { href: "/kontak", label: "Kontak" }
] as const;

export const PERSON_JSON_LD = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PERSON_NAME,
  alternateName: ["Ihsan Mokhsen", "alhakimi", "M. I. H. Mokhsen"],
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Pranata Komputer dan Peneliti Keamanan Informasi",
  description: SITE_DESCRIPTION,
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
    "Data Protection",
    "Web Development"
  ],
  sameAs: [
    "https://www.linkedin.com/in/ihsanmokhsen/",
    "https://github.com/ihsanmokhsen",
    "https://www.instagram.com/rex.orange777/",
    "https://works.ihsanmokhsen.com/"
  ]
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
