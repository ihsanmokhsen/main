"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { id: "subdomains", label: "Subdomains" },
  { id: "about", label: "About" },
  { id: "publications", label: "Publications" },
  { id: "focus", label: "Focus" },
  { id: "footer", label: "Contact" }
];

const subdomains = [
  "works.ihsanmokhsen.com",
  "research.ihsanmokhsen.com",
  "tools.ihsanmokhsen.com",
  "lab.ihsanmokhsen.com",
  "cv.ihsanmokhsen.com"
];

const focusItems = [
  "Thesis: Improving HAIS-Q",
  "Government cybersecurity awareness",
  "AI and data protection"
];

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

export default function Home() {
  const [activeSection, setActiveSection] = useState("subdomains");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax='true']")
    );

    const items = parallaxElements.map((element) => ({
      element,
      speed: Number(element.dataset.parallaxSpeed ?? "0.12"),
      currentY: 0,
      targetY: 0,
      currentX: 0,
      targetX: 0,
      currentScale: 1.04,
      targetScale: 1.04,
      currentRotate: 0,
      targetRotate: 0
    }));

    let rafId = 0;
    let running = false;

    const updateTargets = () => {
      const viewportCenter = window.innerHeight / 2;
      const viewportHeight = window.innerHeight;

      items.forEach((item) => {
        const rect = item.element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = viewportCenter - elementCenter;
        const distanceRatio = Math.max(-1.2, Math.min(1.2, distanceFromCenter / viewportHeight));

        item.targetY = distanceFromCenter * item.speed;
        item.targetX = distanceFromCenter * item.speed * 0.05;
        item.targetScale = 1.035 + Math.min(Math.abs(distanceRatio), 1) * 0.04;
        item.targetRotate = distanceRatio * 1.6;
      });
    };

    const animate = () => {
      let keepRunning = false;

      items.forEach((item) => {
        item.currentY += (item.targetY - item.currentY) * 0.11;
        item.currentX += (item.targetX - item.currentX) * 0.1;
        item.currentScale += (item.targetScale - item.currentScale) * 0.1;
        item.currentRotate += (item.targetRotate - item.currentRotate) * 0.08;

        const delta =
          Math.abs(item.targetY - item.currentY) +
          Math.abs(item.targetX - item.currentX) +
          Math.abs(item.targetScale - item.currentScale) +
          Math.abs(item.targetRotate - item.currentRotate);

        if (delta > 0.02) keepRunning = true;

        item.element.style.transform = `translate3d(${item.currentX.toFixed(2)}px, ${item.currentY.toFixed(
          2
        )}px, 0) scale(${item.currentScale.toFixed(4)}) rotate(${item.currentRotate.toFixed(3)}deg)`;
      });

      if (keepRunning) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        running = false;
        rafId = 0;
      }
    };

    const startAnimation = () => {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(animate);
    };

    const onScrollOrResize = () => {
      updateTargets();
      startAnimation();
    };

    updateTargets();
    startAnimation();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-8 sm:px-8 lg:px-10">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed right-6 top-6 z-50 border divider bg-white px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#1d1d1f] hover:text-[#f44a22] sm:right-8 sm:top-8"
        aria-expanded={menuOpen}
        aria-controls="right-menu"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      {menuOpen && (
        <aside
          id="right-menu"
          className="fixed inset-y-0 right-0 z-40 w-[280px] border-l divider bg-white px-6 py-20"
        >
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">Navigate</p>
              <ul className="mt-3 space-y-2 text-sm text-[#1d1d1f]">
                {navLinks.map((link) => (
                  <li key={`menu-${link.id}`}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`nav-underline hover:text-[#f44a22] ${
                        activeSection === link.id ? "is-active text-[#f44a22]" : ""
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t divider pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#86868b]">Contact</p>
              <ul className="mt-3 space-y-2 text-xs text-[#1d1d1f]">
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
              </ul>
            </div>
          </div>
        </aside>
      )}

      <div className="space-y-0">
        <section id="home" className="reveal reveal-delay-1 border-b divider py-12 sm:py-14">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src="/profile.png"
              alt="Muhammad Ihsanul Hakim Mokhsen"
              className="h-16 w-16 object-cover grayscale sm:h-20 sm:w-20"
            />
            <h1 className="text-balance text-3xl tracking-tight text-[#1d1d1f] sm:text-5xl lg:text-6xl">
              Muhammad Ihsanul Hakim Mokhsen S.Kom., M.S.F
            </h1>
          </div>
          <p className="mt-5 text-base tracking-[0.01em] text-[#1d1d1f] sm:text-lg">
            Digital Forensics &amp; Information Security
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#68686d] sm:text-base sm:leading-8">
            Government IT practitioner and graduate researcher building practical security awareness and human-centered cyber resilience across institutions.
          </p>

          <div className="mt-7 border-l divider pl-4 text-sm sm:text-base">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#86868b] sm:text-xs">
              Currently Working On
            </p>
            <p className="mt-2 text-[#1d1d1f]">
              - Official <span className="font-medium">Website</span> of the Regional Revenue and Asset Agency of
              East Nusa Tenggara Province
            </p>
            <a
              href="https://works.ihsanmokhsen.com/"
              target="_blank"
              rel="noreferrer"
              className="nav-underline mt-2 inline-block text-[#1d1d1f] hover:text-[#f44a22]"
            >
              Explore more projects: https://works.ihsanmokhsen.com/
            </a>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-[#86868b]">
            Use the right sidebar to navigate sections.
          </p>
        </section>

        <section
          aria-label="Featured visual section one"
          className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y"
        >
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]">
            <img
              src="/sec1.png"
              alt="Section visual one"
              data-parallax="true"
              data-parallax-speed="0.14"
              className="block h-full w-full object-cover grayscale will-change-transform"
            />
          </div>
          <p className="pointer-events-none absolute bottom-4 right-4 text-xs tracking-[0.16em] text-white sm:bottom-6 sm:right-6 sm:text-sm">
            Mushala Kantor Gubernur NTT
          </p>
        </section>

        <section id="subdomains" className="reveal reveal-delay-2 py-24 sm:py-32">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">Subdomain Navigation</h2>
          <ul className="mt-6">
            {subdomains.map((subdomain) => (
              <li key={subdomain} className="border-b divider py-5 first:border-t">
                <a
                  className="group inline-flex items-center gap-3 text-xl tracking-tight text-[#1d1d1f] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#f44a22] focus-visible:text-[#f44a22] sm:text-3xl"
                  href={`https://${subdomain}`}
                >
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    {subdomain}
                  </span>
                  <span className="text-[#86868b] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-[#f44a22] group-focus-visible:translate-x-2 group-focus-visible:text-[#f44a22]">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Featured visual section two"
          className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y"
        >
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]">
            <img
              src="/sec2.png"
              alt="Section visual two"
              data-parallax="true"
              data-parallax-speed="0.16"
              className="block h-full w-full object-cover grayscale will-change-transform"
            />
          </div>
        </section>

        <section id="about" className="reveal reveal-delay-3 border-y divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">About</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1d1d1f] sm:text-xl">
            Government IT practitioner and Digital Forensics graduate student, focused on Information Security Awareness and HAIS-Q research for measurable behavioral security improvement.
          </p>
        </section>

        <section id="publications" className="reveal reveal-delay-4 border-b divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">Publications</h2>
          <ul className="mt-6 space-y-5">
            {publications.map((publication) => (
              <li key={publication.doi} className="border-b divider pb-6">
                <p className="text-xl leading-relaxed text-[#1d1d1f] sm:text-2xl">{publication.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#86868b] sm:text-base">{publication.authors}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#86868b] sm:text-base">{publication.venue}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#86868b] sm:text-base">DOI: {publication.doi}</p>
                <a
                  className="nav-underline mt-3 inline-block text-sm text-[#1d1d1f] hover:text-[#f44a22] focus-visible:text-[#f44a22] sm:text-base"
                  href={publication.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on IEEE Xplore
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="focus" className="reveal py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">Current Focus</h2>
          <ul className="mt-6 space-y-4 text-xl tracking-tight text-[#1d1d1f] sm:text-2xl">
            {focusItems.map((item) => (
              <li key={item} className="border-b divider pb-4">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Featured visual section three"
          className="reveal divider relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y"
        >
          <div className="h-[22vh] overflow-hidden sm:h-[26vh]">
            <img
              src="/sec3.png"
              alt="Section visual three"
              data-parallax="true"
              data-parallax-speed="0.18"
              className="block h-full w-full object-cover grayscale will-change-transform"
            />
          </div>
        </section>

        <section id="footer" className="reveal border-t divider py-12 sm:py-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#86868b]">Contact</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#86868b] sm:text-base">
            Open for collaboration in cybersecurity awareness, digital forensics, and information security research.
          </p>
          <ul className="mt-6 space-y-3 text-base text-[#1d1d1f] sm:text-lg">
            <li>
              <a
                className="nav-underline hover:text-[#f44a22] focus-visible:text-[#f44a22]"
                href="https://www.linkedin.com/in/ihsanmokhsen/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin: https://www.linkedin.com/in/ihsanmokhsen/
              </a>
            </li>
            <li>
              <a
                className="nav-underline hover:text-[#f44a22] focus-visible:text-[#f44a22]"
                href="https://github.com/ihsanmokhsen"
                target="_blank"
                rel="noreferrer"
              >
                github: https://github.com/ihsanmokhsen
              </a>
            </li>
          </ul>
        </section>

        <footer className="reveal border-t divider pb-10 pt-8 text-[10px] uppercase tracking-[0.32em] text-[#86868b] [font-variant:small-caps] sm:text-xs">
          ihsanmokhsen.com
        </footer>
      </div>
    </main>
  );
}
