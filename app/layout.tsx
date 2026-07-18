import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NAVIGATION_JSON_LD, PERSON_JSON_LD, PERSON_NAME, SITE_DESCRIPTION, SITE_URL, WEBSITE_JSON_LD } from "@/app/_components/site-data";
import { StructuredData } from "@/app/_components/structured-data";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans"
});

export const metadata: Metadata = {
  applicationName: PERSON_NAME,
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Ihsanul Hakim Mokhsen",
    template: "%s | ihsanmokhsen.com"
  },
  description: SITE_DESCRIPTION,
  keywords: [
    PERSON_NAME,
    "Ihsan Mokhsen",
    "alhakimi",
    "Pranata Komputer BPAD NTT",
    "Digital Forensics",
    "Information Security Awareness",
    "HAIS-Q"
  ],
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
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
      <body className={`${jakartaSans.variable} font-light`}>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [PERSON_JSON_LD, WEBSITE_JSON_LD, NAVIGATION_JSON_LD]
          }}
        />
        {children}
      </body>
    </html>
  );
}
