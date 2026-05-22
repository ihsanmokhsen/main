import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ihsanmokhsen.com",
  description: "Personal dashboard homepage for Muhammad Ihsanul Hakim Mokhsen",
  icons: {
    icon: "/favicon-profile.png",
    shortcut: "/favicon-profile.png",
    apple: "/favicon-profile.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-light">{children}</body>
    </html>
  );
}
