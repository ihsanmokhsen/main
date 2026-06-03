import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ihsanmokhsen.com"),
  title: {
    default: "Muhammad Ihsanul Hakim Mokhsen",
    template: "%s | ihsanmokhsen.com"
  },
  description:
    "ASN Pranata Komputer BPAD Provinsi NTT, penerima Beasiswa Magister Komdigi, dan peneliti ketahanan siber berpusat pada manusia, security awareness, serta pengembangan web berbasis AI.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon-profile.png",
    shortcut: "/favicon-profile.png",
    apple: "/favicon-profile.png"
  },
  openGraph: {
    title: "Muhammad Ihsanul Hakim Mokhsen",
    description:
      "Personal site of Muhammad Ihsanul Hakim Mokhsen: government IT, human-centered cyber resilience, security awareness, and AI-powered web development.",
    url: "https://ihsanmokhsen.com",
    siteName: "ihsanmokhsen.com",
    images: [
      {
        url: "/profile.png",
        width: 1086,
        height: 1448,
        alt: "Muhammad Ihsanul Hakim Mokhsen"
      }
    ],
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ihsanul Hakim Mokhsen",
    description:
      "Government IT practitioner and graduate researcher in human-centered cyber resilience, security awareness, and AI-powered web development.",
    images: ["/profile.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var preferredTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.dataset.theme = preferredTheme;
                  document.documentElement.style.colorScheme = preferredTheme;
                } catch (error) {}
              })();
            `
          }}
        />
      </head>
      <body className={`${jakartaSans.variable} font-light`}>{children}</body>
    </html>
  );
}
