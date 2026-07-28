import Link from "next/link";
import type { ReactNode } from "react";

import { PRIMARY_PAGES } from "@/app/_components/site-data";

type SubpageShellProps = {
  active: (typeof PRIMARY_PAGES)[number]["href"];
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function SubpageShell({ active, eyebrow, title, intro, children }: SubpageShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 py-3 sm:px-8">
      <div className="flex flex-1 flex-col justify-center gap-1">
        <header className="flex flex-col gap-2 border-b divider pb-2 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-sm tracking-tight text-[#1d1d1f] sm:text-base" href="/">
            Muhammad Ihsanul Hakim Mokhsen
          </Link>
          <nav aria-label="Navigasi utama" className="flex flex-wrap gap-x-5 gap-y-1">
            {PRIMARY_PAGES.map((page) => (
              <Link
                className={`nav-underline text-[11px] text-[#86868b] hover:text-[#f44a22] sm:text-xs ${active === page.href ? "is-active text-[#1d1d1f]" : ""}`}
                href={page.href}
                key={page.href}
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="border-b divider py-1.5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#f44a22]">{eyebrow}</p>
          <h1 className="mt-1 max-w-4xl text-base leading-snug tracking-tight text-[#1d1d1f] sm:text-lg">
            {title}
          </h1>
          <p className="mt-1 max-w-3xl text-[11px] leading-snug text-[#86868b] sm:text-xs">{intro}</p>
        </section>

        <div className="border-b divider py-1.5">{children}</div>

        <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-[10px] text-[#86868b] sm:text-[11px]">
          <span>ihsanmokhsen.com</span>
          <Link className="nav-underline hover:text-[#f44a22]" href="/">
            Kembali ke beranda
          </Link>
        </footer>
      </div>
    </main>
  );
}
