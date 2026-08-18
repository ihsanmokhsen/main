"use client";

import { useEffect, useState } from "react";

type Lang = "id" | "en";
type Theme = "light" | "dark";

const subdomains = [
  { label: "works.ihsanmokhsen.com", href: "https://works.ihsanmokhsen.com/" },
  { label: "jurnal.ihsanmokhsen.com", href: "https://works.ihsanmokhsen.com/journal" },
  { label: "research.ihsanmokhsen.com", href: "https://research.ihsanmokhsen.com/" },
  { label: "tools.ihsanmokhsen.com", href: "https://www.spacex.com/" },
  { label: "lab.ihsanmokhsen.com", href: "https://openai.com/form/codex-labs/" },
  { label: "cv.ihsanmokhsen.com", href: "https://www.linkedin.com/in/ihsanmokhsen/" }
];

const focusItems: Record<Lang, string[]> = {
  id: [
    "Tesis: Peningkatan HAIS-Q",
    "Kesadaran keamanan siber pemerintahan",
    "AI dan perlindungan data"
  ],
  en: [
    "Thesis: Improving HAIS-Q",
    "Government cybersecurity awareness",
    "AI and data protection"
  ]
};

const publications = [
  {
    title:
      "Adaptation and Validation of HAIS-Q for Measuring Information Security Awareness in Indonesian Government Institutions",
    authors: "M. I. H. Mokhsen and R. G. Utomo",
    venue:
      "2025 IEEE 2nd Int. Conf. on Cryptography, Informatics, and Cybersecurity (ICoCICs), Depok, 2025, pp. 1-6",
    doi: "10.1109/ICoCICs68032.2025.11383985",
    url: "https://ieeexplore.ieee.org/document/11383985"
  }
];

const copy = {
  id: {
    role:
      "ASN Pranata Komputer BPAD NTT | Penerima Beasiswa Magister Komdigi | Fokus pada ketahanan siber, kesadaran keamanan, dan web berbasis AI.",
    workingLabel: "Sedang Dikerjakan",
    workingItem:
      "Profil Aset NTT",
    workingExtra: "Penjaga Server VPS Kantor",
    moreProjects: "works.ihsanmokhsen.com",
    subdomainsTitle: "Kerjaan",
    aboutTitle: "Tentang",
    aboutText:
      "Praktisi TI pemerintahan dan mahasiswa pascasarjana Digital Forensik, fokus riset Information Security Awareness dan HAIS-Q.",
    publicationsTitle: "Publikasi",
    publicationLink: "IEEE Xplore",
    focusTitle: "Fokus",
    contactTitle: "Kontak",
    menu: "Menu",
    close: "Tutup"
  },
  en: {
    role:
      "Computer Systems Officer at BPAD NTT | Komdigi Master's Scholarship Awardee | Human-centered cyber resilience & AI-powered web.",
    workingLabel: "Currently Working On",
    workingItem:
      "Official Website of Bapenda NTT Province",
    workingExtra: "Office VPS Server Keeper",
    moreProjects: "works.ihsanmokhsen.com",
    subdomainsTitle: "Work",
    aboutTitle: "About",
    aboutText:
      "Government IT practitioner and Digital Forensics graduate student, focused on HAIS-Q research for measurable security improvement.",
    publicationsTitle: "Publications",
    publicationLink: "IEEE Xplore",
    focusTitle: "Focus",
    contactTitle: "Contact",
    menu: "Menu",
    close: "Close"
  }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("light");

  const t = copy[lang];

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const preferredTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-[1180px] px-6 py-3 sm:px-8">
      <div className="fixed right-6 top-3 z-50 flex gap-2 sm:right-8 sm:top-3">
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "en" ? "id" : "en"))}
          className="border divider bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
        >
          {lang === "en" ? "EN" : "ID"}
        </button>
        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className="border divider bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="border divider bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
          aria-expanded={menuOpen}
        >
          {menuOpen ? t.close : t.menu}
        </button>
      </div>

      {menuOpen && (
        <aside className="fixed inset-y-0 right-0 z-40 w-[220px] border-l border-white/10 bg-[#171717] px-5 py-16 text-white">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Navigasi</p>
            <ul className="space-y-1.5 text-xs text-white">
              <li><a href="/karya" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.subdomainsTitle}</a></li>
              <li><a href="/tentang" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.aboutTitle}</a></li>
              <li><a href="/publikasi" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.publicationsTitle}</a></li>
              <li><a href="#focus" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.focusTitle}</a></li>
              <li><a href="/kontak" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.contactTitle}</a></li>
            </ul>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Kontak</p>
              <ul className="mt-2 space-y-1 text-[10px] text-white">
                <li><a className="nav-underline hover:text-[#f44a22]" href="https://www.linkedin.com/in/ihsanmokhsen/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a className="nav-underline hover:text-[#f44a22]" href="https://github.com/ihsanmokhsen" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a className="nav-underline hover:text-[#f44a22]" href="mailto:ihsanmokhsen17@gmail.com">Email</a></li>
              </ul>
            </div>
          </div>
        </aside>
      )}

      <div className="flex flex-1 flex-col justify-center gap-1">
        <section className="flex items-center gap-3 border-b divider pb-2">
          <img src="/profile.png" alt="" className="h-10 w-10 shrink-0 rounded-full object-cover grayscale sm:h-12 sm:w-12" />
          <div className="min-w-0">
            <h1 className="truncate text-base tracking-tight text-[#1d1d1f] sm:text-lg">
              Muhammad Ihsanul Hakim Mokhsen S.Kom., M.S.F
            </h1>
            <p className="text-[11px] leading-snug text-[#86868b] sm:text-xs">{t.role}</p>
          </div>
        </section>

        <nav aria-label="Navigasi utama" className="flex flex-wrap gap-x-5 gap-y-1 border-b divider py-1.5 text-[11px] sm:text-xs">
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="/tentang">{t.aboutTitle}</a>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="/karya">{t.subdomainsTitle}</a>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="/publikasi">{t.publicationsTitle}</a>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="/kontak">{t.contactTitle}</a>
        </nav>

        <div className="flex flex-wrap gap-3 border-b divider py-1.5 text-[11px] sm:text-xs">
          <span className="text-[#86868b]">{t.workingLabel}:</span>
          <span className="text-[#1d1d1f]">{t.workingItem}</span>
          <span className="text-[#86868b]">|</span>
          <span className="text-[#1d1d1f]">{t.workingExtra}</span>
          <a href="https://works.ihsanmokhsen.com/" target="_blank" rel="noreferrer" className="nav-underline text-[#f44a22]">{t.moreProjects}</a>
        </div>

        <section id="subdomains" className="border-b divider py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.subdomainsTitle}</h2>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
            {subdomains.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="nav-underline text-xs tracking-tight text-[#1d1d1f] hover:text-[#f44a22] sm:text-sm">{s.label}</a>
            ))}
          </div>
        </section>

        <section id="about" className="border-b divider py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.aboutTitle}</h2>
          <p className="text-xs leading-snug text-[#1d1d1f] sm:text-sm">{t.aboutText}</p>
        </section>

        <section id="publications" className="border-b divider py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.publicationsTitle}</h2>
          {publications.map((p) => (
            <div key={p.doi} className="mt-1">
              <p className="text-xs leading-snug text-[#1d1d1f] sm:text-sm">{p.title}</p>
              <p className="text-[10px] text-[#86868b]">{p.authors} &middot; <a href={p.url} target="_blank" rel="noreferrer" className="nav-underline text-[#f44a22]">{t.publicationLink}</a></p>
            </div>
          ))}
        </section>

        <section id="focus" className="border-b divider py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.focusTitle}</h2>
          <p className="text-xs text-[#1d1d1f] sm:text-sm">{focusItems[lang].join(" · ")}</p>
        </section>

        <section id="footer" className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1.5 text-[11px] sm:text-xs">
          <span className="text-[#86868b]">Kontak:</span>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="mailto:ihsanmokhsen17@gmail.com">ihsanmokhsen17@gmail.com</a>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="https://www.linkedin.com/in/ihsanmokhsen/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]" href="https://github.com/ihsanmokhsen" target="_blank" rel="noreferrer">GitHub</a>
        </section>

        <footer className="border-t divider pt-1 text-[9px] uppercase tracking-[0.32em] text-[#86868b]">ihsanmokhsen.com</footer>
      </div>
    </main>
  );
}
