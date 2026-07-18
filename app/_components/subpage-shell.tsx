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
    <main className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 py-6 sm:px-8 sm:py-8">
      <header className="flex flex-col gap-5 border-b divider pb-5 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-[15px] font-medium tracking-tight text-[#1d1d1f]" href="/">
          Muhammad Ihsanul Hakim Mokhsen
        </Link>
        <nav aria-label="Navigasi utama" className="flex flex-wrap gap-x-5 gap-y-2">
          {PRIMARY_PAGES.map((page) => (
            <Link
              className={`nav-underline text-[12px] text-[#86868b] hover:text-[#f44a22] ${active === page.href ? "is-active text-[#1d1d1f]" : ""}`}
              href={page.href}
              key={page.href}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="border-b divider py-12 sm:py-16">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#f44a22]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.95] tracking-tight text-[#1d1d1f]">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-[16px] leading-8 text-[#86868b] sm:text-[19px]">{intro}</p>
      </section>

      <div className="flex-1 py-10 sm:py-14">{children}</div>

      <footer className="flex flex-col gap-3 border-t divider py-5 text-[11px] text-[#86868b] sm:flex-row sm:items-center sm:justify-between">
        <span>ihsanmokhsen.com</span>
        <Link className="nav-underline hover:text-[#f44a22]" href="/">
          Kembali ke beranda
        </Link>
      </footer>
    </main>
  );
}
