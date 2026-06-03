"use client";

import { useEffect, useState } from "react";

type Lang = "id" | "en";
type Theme = "light" | "dark";

const navLinks = [
  { id: "subdomains", label: { id: "Kerjaan", en: "Work" } },
  { id: "about", label: { id: "Tentang", en: "About" } },
  { id: "publications", label: { id: "Publikasi", en: "Publications" } },
  { id: "focus", label: { id: "Fokus", en: "Focus" } },
  { id: "footer", label: { id: "Kontak", en: "Contact" } }
];

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
      "2025 IEEE 2nd International Conference on Cryptography, Informatics, and Cybersecurity (ICoCICs), Depok, Indonesia, 2025, pp. 1-6",
    doi: "10.1109/ICoCICs68032.2025.11383985",
    url: "https://ieeexplore.ieee.org/document/11383985"
  }
];

const copy = {
  id: {
    role:
      "ASN Pranata Komputer BPAD Provinsi NTT | Penerima Beasiswa Magister Komdigi | Fokus pada ketahanan siber berpusat pada manusia, kesadaran keamanan, dan pengembangan web berbasis AI.",
    workingLabel: "Yang Sedang Dikerjakan",
    workingItem:
      "- Website Resmi Badan Pendapatan dan Aset Daerah Provinsi Nusa Tenggara Timur",
    moreProjects: "Lihat project lain: https://works.ihsanmokhsen.com/",
    guide: "Gunakan sidebar kanan untuk navigasi bagian.",
    subdomainsTitle: "Kerjaan",
    aboutTitle: "Tentang",
    aboutText:
      "Praktisi TI pemerintahan dan mahasiswa pascasarjana Digital Forensik, berfokus pada riset Information Security Awareness dan HAIS-Q untuk peningkatan perilaku keamanan yang terukur.",
    publicationsTitle: "Publikasi",
    publicationLink: "Lihat di IEEE Xplore",
    focusTitle: "Fokus Saat Ini",
    contactTitle: "Kontak",
    contactText:
      "Terbuka untuk kolaborasi dalam awareness keamanan siber, digital forensik, dan riset keamanan informasi.",
    navigate: "Navigasi",
    contactMini: "Kontak",
    menu: "Menu",
    close: "Tutup"
  },
  en: {
    role:
      "Computer Systems Officer at BPAD East Nusa Tenggara Province | Komdigi Master's Scholarship Awardee | Focused on human-centered cyber resilience, security awareness, and AI-powered web development.",
    workingLabel: "Currently Working On",
    workingItem:
      "- Official Website of the Regional Revenue and Asset Agency of East Nusa Tenggara Province",
    moreProjects: "Explore more projects: https://works.ihsanmokhsen.com/",
    guide: "Use the right sidebar to navigate sections.",
    subdomainsTitle: "Work",
    aboutTitle: "About",
    aboutText:
      "Government IT practitioner and Digital Forensics graduate student, focused on Information Security Awareness and HAIS-Q research for measurable behavioral security improvement.",
    publicationsTitle: "Publications",
    publicationLink: "View on IEEE Xplore",
    focusTitle: "Current Focus",
    contactTitle: "Contact",
    contactText:
      "Open for collaboration in cybersecurity awareness, digital forensics, and information security research.",
    navigate: "Navigate",
    contactMini: "Contact",
    menu: "Menu",
    close: "Close"
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("subdomains");
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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -45% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, []);

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-8 sm:px-8 lg:px-10">
      <div className="fixed right-6 top-6 z-50 flex gap-2 sm:right-8 sm:top-8">
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "en" ? "id" : "en"))}
          className="border divider bg-white px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
        >
          {lang === "en" ? "EN" : "ID"}
        </button>
        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className="border divider bg-white px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="border divider bg-white px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22]"
          aria-expanded={menuOpen}
          aria-controls="right-menu"
        >
          {menuOpen ? t.close : t.menu}
        </button>
      </div>

      {menuOpen && (
        <aside id="right-menu" className="fixed inset-y-0 right-0 z-40 w-[280px] border-l border-white/10 bg-[#171717] px-6 py-20 text-white">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.navigate}</p>
              <ul className="mt-3 space-y-2 text-sm text-white">
                {navLinks.map((link) => (
                  <li key={`menu-${link.id}`}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`nav-underline hover:text-[#f44a22] ${
                        activeSection === link.id ? "is-active text-[#f44a22]" : ""
                      }`}
                    >
                      {link.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.contactMini}</p>
              <ul className="mt-3 space-y-2 text-xs text-white">
                <li>
                  <a className="nav-underline hover:text-[#f44a22]" href="https://www.linkedin.com/in/ihsanmokhsen/" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="nav-underline hover:text-[#f44a22]" href="https://github.com/ihsanmokhsen" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a className="nav-underline hover:text-[#f44a22]" href="mailto:ihsanmokhsen17@gmail.com">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      )}

      <div className="space-y-0">
        <section id="home" className="reveal reveal-delay-1 border-b divider py-12 sm:py-14">
          <div className="flex items-center gap-4 sm:gap-5">
            <img src="/profile.png" alt="Muhammad Ihsanul Hakim Mokhsen" className="h-16 w-16 object-cover grayscale sm:h-20 sm:w-20" />
            <h1 className="text-balance text-3xl tracking-tight text-[#1d1d1f] sm:text-5xl lg:text-6xl">
              Muhammad Ihsanul Hakim Mokhsen S.Kom., M.S.F
            </h1>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#1d1d1f] sm:text-base sm:leading-8">{t.role}</p>
          <div className="mt-7 border-l divider pl-4 text-sm sm:text-base">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#86868b] sm:text-xs">{t.workingLabel}</p>
            <p className="mt-2 text-[#1d1d1f]">{t.workingItem}</p>
            <a href="https://works.ihsanmokhsen.com/" target="_blank" rel="noreferrer" className="nav-underline mt-2 inline-block text-[#1d1d1f] hover:text-[#f44a22]">
              {t.moreProjects}
            </a>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-[#86868b]">{t.guide}</p>
        </section>

        <section aria-label="Featured visual section one" className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y">
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]"><img src="/sec1.png" alt="Section visual one" className="block h-full w-full object-cover grayscale" /></div>
          <p className="pointer-events-none absolute bottom-4 right-4 text-xs tracking-[0.16em] text-white sm:bottom-6 sm:right-6 sm:text-sm">Mushala Kantor Gubernur NTT</p>
        </section>

        <section id="subdomains" className="reveal reveal-delay-2 py-24 sm:py-32">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">{t.subdomainsTitle}</h2>
          <ul className="mt-6">
            {subdomains.map((subdomain) => (
              <li key={subdomain.label} className="border-b divider py-5 first:border-t">
                <a
                  className="group inline-flex items-center gap-3 text-xl tracking-tight text-[#1d1d1f] hover:text-[#f44a22] sm:text-3xl"
                  href={subdomain.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{subdomain.label}</span>
                  <span className="text-[#86868b] group-hover:translate-x-2 group-hover:text-[#f44a22] transition-all duration-300">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Featured visual section two" className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y">
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]"><img src="/sec2.png" alt="Section visual two" className="block h-full w-full object-cover grayscale" /></div>
        </section>

        <section id="about" className="reveal reveal-delay-3 border-y divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">{t.aboutTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1d1d1f] sm:text-xl">{t.aboutText}</p>
        </section>

        <section id="publications" className="reveal reveal-delay-4 border-b divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">{t.publicationsTitle}</h2>
          <ul className="mt-6 space-y-5">
            {publications.map((publication) => (
              <li key={publication.doi} className="border-b divider pb-6">
                <p className="text-xl leading-relaxed text-[#1d1d1f] sm:text-2xl">{publication.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#86868b] sm:text-base">{publication.authors}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#86868b] sm:text-base">{publication.venue}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#86868b] sm:text-base">DOI: {publication.doi}</p>
                <a className="nav-underline mt-3 inline-block text-sm text-[#1d1d1f] hover:text-[#f44a22] sm:text-base" href={publication.url} target="_blank" rel="noreferrer">{t.publicationLink}</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="focus" className="reveal py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">{t.focusTitle}</h2>
          <ul className="mt-6 space-y-4 text-xl tracking-tight text-[#1d1d1f] sm:text-2xl">
            {focusItems[lang].map((item) => (
              <li key={item} className="border-b divider pb-4">{item}</li>
            ))}
          </ul>
        </section>

        <section aria-label="Featured visual section three" className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y">
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]"><img src="/sec3.png" alt="Section visual three" className="block h-full w-full object-cover grayscale" /></div>
        </section>

        <section id="footer" className="reveal border-t divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">{t.contactTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#86868b] sm:text-base">{t.contactText}</p>
          <ul className="mt-6 space-y-3 text-base text-[#1d1d1f] sm:text-lg">
            <li><a className="nav-underline hover:text-[#f44a22]" href="mailto:ihsanmokhsen17@gmail.com">email: ihsanmokhsen17@gmail.com</a></li>
            <li><a className="nav-underline hover:text-[#f44a22]" href="https://www.linkedin.com/in/ihsanmokhsen/" target="_blank" rel="noreferrer">linkedin: https://www.linkedin.com/in/ihsanmokhsen/</a></li>
            <li><a className="nav-underline hover:text-[#f44a22]" href="https://github.com/ihsanmokhsen" target="_blank" rel="noreferrer">github: https://github.com/ihsanmokhsen</a></li>
          </ul>
        </section>

        <footer className="reveal border-t divider pb-10 pt-8 text-[10px] uppercase tracking-[0.32em] text-[#86868b] [font-variant:small-caps] sm:text-xs">ihsanmokhsen.com</footer>
      </div>
    </main>
  );
}
