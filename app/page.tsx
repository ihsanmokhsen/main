"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PageMascot } from "@/app/_components/mascot";
import { CONTACTS, PROJECTS } from "@/app/_components/site-data";

type Lang = "id" | "en";
type Theme = "light" | "dark";

const subdomains = [
  { label: "works.ihsanmokhsen.com", href: "https://works.ihsanmokhsen.com/" },
  { label: "jurnal.ihsanmokhsen.com", href: "https://works.ihsanmokhsen.com/journal" },
  { label: "research.ihsanmokhsen.com", href: "https://research.ihsanmokhsen.com/" },
  { label: "cv.ihsanmokhsen.com", href: "https://www.linkedin.com/in/ihsanmokhsen/" }
];

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
      "ASN Pranata Komputer BPAD NTT | Awardee Beasiswa Magister Komdigi | Praktisi TI · Web Pemerintahan & Keamanan Informasi",
    workingLabel: "Proyek yang lagi jalan",
    workingItem:
      "Profil Aset NTT",
    workingExtra: "Penjaga Server VPS Kantor",
    subdomainsTitle: "Kerjaan",
    aboutTitle: "Tentang",
    publicationsTitle: "Publikasi",
    publicationLink: "IEEE Xplore",
    contactTitle: "Kontak",
    navTitle: "Navigasi",
    menu: "Menu",
    close: "Tutup",
    openPage: "Buka halaman",
    aboutHeading: "Teknologi publik yang praktis dan berpusat pada manusia.",
    aboutIntro:
      "Praktisi TI pemerintahan dan peneliti yang menerjemahkan keamanan informasi menjadi riset, alat, dan alur kerja yang dapat dipahami serta diukur.",
    aboutItems: [
      { label: "Pengalaman", value: "Pranata Komputer — BPAD Provinsi NTT", zoom: "BPAD Provinsi NTT" },
      { label: "Riset", value: "Graduate Researcher — Telkom University, 2024–2026" },
      { label: "Pendidikan", value: "Magister Ilmu Forensik, Telkom University · S.Kom., Universitas Nusa Cendana" },
      { label: "Keahlian", value: "PHP, Laravel, MySQL, Linux, Docker, integrasi AI/API" }
    ],
    workHeading: "Aplikasi, riset, dan eksperimen digital.",
    workIntro:
      "Pilihan pekerjaan yang menghubungkan kebutuhan pemerintahan, riset keamanan informasi, dan pengembangan produk digital.",
    pubHeading: "Riset keamanan informasi yang dapat diukur.",
    pubIntro:
      "Riset yang berfokus pada pengukuran kesadaran keamanan informasi dan peningkatan perilaku keamanan di institusi pemerintahan Indonesia.",
    contactHeading: "Mari membangun sesuatu yang berguna.",
    contactIntro:
      "Terbuka untuk diskusi dan kolaborasi pada keamanan informasi, digital forensics, riset pemerintahan, AI, dan pengembangan produk digital."
  },
  en: {
    role:
      "Computer Systems Officer at BPAD NTT | Komdigi Master's Scholarship Awardee | IT Practitioner · Government Web & Information Security",
    workingLabel: "Ongoing Projects",
    workingItem:
      "NTT Asset Profile",
    workingExtra: "Office VPS Server Keeper",
    subdomainsTitle: "Work",
    aboutTitle: "About",
    publicationsTitle: "Publications",
    publicationLink: "IEEE Xplore",
    contactTitle: "Contact",
    navTitle: "Navigation",
    menu: "Menu",
    close: "Close",
    openPage: "Open page",
    aboutHeading: "Practical, human-centered public technology.",
    aboutIntro:
      "Government IT practitioner and researcher turning information security into research, tools, and workflows that are understandable and measurable.",
    aboutItems: [
      { label: "Experience", value: "Computer Systems Officer — BPAD NTT Province", zoom: "BPAD NTT Province" },
      { label: "Research", value: "Graduate Researcher — Telkom University, 2024–2026" },
      { label: "Education", value: "Master of Forensic Science, Telkom University · B.Comp.Sc., Universitas Nusa Cendana" },
      { label: "Skills", value: "PHP, Laravel, MySQL, Linux, Docker, AI/API integration" }
    ],
    workHeading: "Apps, research, and digital experiments.",
    workIntro:
      "Selected work connecting government needs, information security research, and digital product development.",
    pubHeading: "Measurable information security research.",
    pubIntro:
      "Research on measuring information security awareness and improving security behavior in Indonesian government institutions.",
    contactHeading: "Let's build something useful.",
    contactIntro:
      "Open to discussion and collaboration on information security, digital forensics, government research, AI, and digital product development."
  }
};

const SCENE_COUNT = 5;
const ZOOM_MAX = 32;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

function Scene({
  eyebrow,
  title,
  intro,
  href,
  cta,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full max-w-[1180px] flex-col justify-center px-6 py-16 sm:px-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#f44a22]">{eyebrow}</p>
      <h2 className="mt-2 max-w-3xl text-2xl leading-tight tracking-tight text-[#1d1d1f] sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-xs leading-snug text-[#86868b] sm:text-sm">{intro}</p>
      <div className="mt-5 divide-y divide-[var(--divider)] border-y divider">{children}</div>
      <a href={href} className="nav-underline mt-4 self-start text-xs text-[#f44a22] sm:text-sm">
        {cta} &rarr;
      </a>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("light");
  const [mascotSize, setMascotSize] = useState(128);

  const t = copy[lang];
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMascotSize(mq.matches ? 72 : 128);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const preferredTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferredTheme);
  }, []);

  // Scroll dives into one word of the current scene until it fills the
  // screen; only then does the next scene surface, sharpening out of a blur.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".zj-scene"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    // Aim each scene's zoom at the middle of its [data-zoom] text, measured unscaled.
    const measure = () => {
      scenes.forEach((scene) => {
        const target = scene.querySelector<HTMLElement>("[data-zoom]");
        if (!target) return;
        const previous = scene.style.transform;
        scene.style.transform = "none";
        const range = document.createRange();
        range.selectNodeContents(target);
        const text = range.getBoundingClientRect();
        const visible = target.getBoundingClientRect();
        const box = scene.getBoundingClientRect();
        scene.style.transform = previous;
        // Truncated text runs past its box; keep the aim on what is actually shown.
        const x = (Math.max(text.left, visible.left) + Math.min(text.right, visible.right)) / 2;
        scene.style.transformOrigin = `${x - box.left}px ${text.top + text.height / 2 - box.top}px`;
      });
    };

    const render = () => {
      frame = 0;
      if (reduce.matches) {
        scenes.forEach((scene) => scene.removeAttribute("style"));
        return;
      }
      const range = root.offsetHeight - window.innerHeight;
      const progress = range > 0 ? clamp01(-root.getBoundingClientRect().top / range) * (SCENE_COUNT - 1) : 0;

      scenes.forEach((scene, i) => {
        const d = progress - i;
        let scale = 1;
        let opacity = 0;
        let blur = 0;

        if (d >= 0 && d < 1) {
          // Outgoing: an even, exponential dive into the word, blurring as it nears.
          const dive = clamp01((d - 0.05) / 0.67);
          scale = ZOOM_MAX ** dive;
          blur = clamp01((d - 0.4) / 0.32) * 14;
          opacity = 1 - clamp01((d - 0.56) / 0.16);
        } else if (d > -1 && d < 0) {
          // Incoming: no zoom, just sharpening out of the blur.
          const reveal = clamp01((1 + d - 0.62) / 0.3);
          opacity = reveal;
          blur = (1 - reveal) * 16;
        }

        if (opacity <= 0) {
          scene.style.visibility = "hidden";
          scene.style.pointerEvents = "none";
          return;
        }
        scene.style.visibility = "visible";
        scene.style.transform = scale === 1 ? "" : `scale(${scale})`;
        scene.style.opacity = String(opacity);
        scene.style.filter = blur > 0.05 ? `blur(${blur}px)` : "";
        scene.style.pointerEvents = opacity > 0.9 && scale < 1.5 ? "auto" : "none";
        scene.style.zIndex = String(SCENE_COUNT - i);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", schedule);
    };
  }, [lang, mascotSize]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main ref={rootRef} className="zj">
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
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.navTitle}</p>
            <ul className="space-y-1.5 text-xs text-white">
              <li><a href="/karya" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.subdomainsTitle}</a></li>
              <li><a href="/tentang" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.aboutTitle}</a></li>
              <li><a href="/publikasi" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.publicationsTitle}</a></li>
              <li><a href="/kontak" onClick={() => setMenuOpen(false)} className="nav-underline hover:text-[#f44a22]">{t.contactTitle}</a></li>
            </ul>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.contactTitle}</p>
              <ul className="mt-2 space-y-1 text-[10px] text-white">
                <li><a className="nav-underline hover:text-[#f44a22]" href="https://www.linkedin.com/in/ihsanmokhsen/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a className="nav-underline hover:text-[#f44a22]" href="https://github.com/ihsanmokhsen" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a className="nav-underline hover:text-[#f44a22]" href="mailto:ihsanmokhsen17@gmail.com">Email</a></li>
              </ul>
            </div>
          </div>
        </aside>
      )}

      <div className="zj-stage">
      <section className="zj-scene">
      <div className="mx-auto flex h-full max-w-[1180px] flex-col justify-center gap-1 px-6 py-3 sm:px-8">
        <section className="relative flex items-center gap-3 border-b divider pb-2">
          <img src="/foto-baru.png" alt="Foto Muhammad Ihsanul Hakim Mokhsen" className="h-20 w-[60px] shrink-0 rounded-md object-cover object-top sm:h-24 sm:w-[72px]" />
          <div className="min-w-0 pr-20 sm:pr-36">
            <h1 className="truncate text-base tracking-tight text-[#1d1d1f] sm:text-lg">
              Muhammad Ihsanul Hakim Mokhsen S.Kom., M.S.F
            </h1>
            <p className="text-[11px] leading-snug text-[#86868b] sm:text-xs">{t.role}</p>
          </div>
          <div className="absolute right-3 top-2 z-10 block sm:right-6 sm:top-4">
            <PageMascot size={mascotSize} />
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-b divider py-1.5 text-[11px] sm:text-xs">
          <span className="text-[#86868b]">{t.workingLabel}:</span>
          <a data-zoom href="https://aset.bpadntt.cloud/" target="_blank" rel="noreferrer" className="nav-underline text-[#1d1d1f] hover:text-[#f44a22]">{t.workingItem}</a>
          <span className="text-[#86868b]">|</span>
          <span className="text-[#1d1d1f]">{t.workingExtra}</span>
        </div>

        <section id="subdomains" className="border-b divider py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.subdomainsTitle}</h2>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
            {subdomains.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="nav-underline text-xs tracking-tight text-[#1d1d1f] hover:text-[#f44a22] sm:text-sm">{s.label}</a>
            ))}
          </div>
        </section>

        <section id="publications" className="py-1.5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">{t.publicationsTitle}</h2>
          {publications.map((p) => (
            <div key={p.doi} className="mt-1">
              <p className="text-xs leading-snug text-[#1d1d1f] sm:text-sm">{p.title}</p>
              <p className="text-[10px] text-[#86868b]">{p.authors} &middot; <a href={p.url} target="_blank" rel="noreferrer" className="nav-underline text-[#f44a22]">{t.publicationLink}</a></p>
            </div>
          ))}
        </section>
      </div>
      </section>

      <section className="zj-scene">
        <Scene eyebrow={t.aboutTitle} title={t.aboutHeading} intro={t.aboutIntro} href="/tentang" cta={t.openPage}>
          {t.aboutItems.map((item) => (
            <div key={item.label} className="grid gap-0.5 py-2 sm:grid-cols-[0.22fr_1fr] sm:gap-5">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">{item.label}</span>
              <span className="text-xs text-[#1d1d1f] sm:text-sm">
                {"zoom" in item && item.zoom ? (
                  <>
                    {item.value.split(item.zoom)[0]}
                    <span data-zoom>{item.zoom}</span>
                    {item.value.split(item.zoom)[1]}
                  </>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
        </Scene>
      </section>

      <section className="zj-scene">
        <Scene eyebrow={t.subdomainsTitle} title={t.workHeading} intro={t.workIntro} href="/karya" cta={t.openPage}>
          {PROJECTS.map((project) => (
            <a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="group grid gap-0.5 py-2 sm:grid-cols-[0.22fr_1fr_auto] sm:items-center sm:gap-5">
              <span data-zoom={project.title === "Works" ? "" : undefined} className="text-xs tracking-tight text-[#1d1d1f] group-hover:text-[#f44a22] sm:text-sm">{project.title}</span>
              <span className="text-[11px] leading-snug text-[#86868b] sm:text-xs">{lang === "en" ? project.descriptionEn : project.description}</span>
              <span aria-hidden="true" className="hidden text-xs text-[#86868b] group-hover:text-[#f44a22] sm:inline">&#8599;</span>
            </a>
          ))}
        </Scene>
      </section>

      <section className="zj-scene">
        <Scene eyebrow={t.publicationsTitle} title={t.pubHeading} intro={t.pubIntro} href="/publikasi" cta={t.openPage}>
          {publications.map((p) => (
            <div key={p.doi} className="py-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">IEEE ICoCICs 2025</p>
              <p className="mt-1 text-xs leading-snug tracking-tight text-[#1d1d1f] sm:text-sm">{p.title}</p>
              <p className="mt-1 text-[10px] text-[#86868b] sm:text-[11px]">{p.authors} &middot; <a data-zoom href={p.url} target="_blank" rel="noreferrer" className="nav-underline text-[#f44a22]">{t.publicationLink}</a></p>
            </div>
          ))}
        </Scene>
      </section>

      <section className="zj-scene">
        <Scene eyebrow={t.contactTitle} title={t.contactHeading} intro={t.contactIntro} href="/kontak" cta={t.openPage}>
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              className="group grid gap-0.5 py-2 sm:grid-cols-[0.22fr_1fr_auto] sm:items-center sm:gap-5"
            >
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">{contact.label}</span>
              <span className="text-xs text-[#1d1d1f] group-hover:text-[#f44a22] sm:text-sm">{contact.value}</span>
              <span aria-hidden="true" className="hidden text-xs text-[#86868b] group-hover:text-[#f44a22] sm:inline">&#8599;</span>
            </a>
          ))}
        </Scene>
      </section>
      </div>
    </main>
  );
}
