import type { Metadata } from "next";
import "../styles.css";
import * as React from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Tour Lanka — Luxury Sri Lanka Travel Experiences",
  description: "Tour Lanka crafts cinematic luxury journeys through Sri Lanka — Sigiriya, Ella, Yala safaris, tea country and golden beaches.",
  authors: [{ name: "Tour Lanka" }],
  openGraph: {
    title: "Tour Lanka — Luxury Sri Lanka Travel Experiences",
    description: "Tour Lanka crafts cinematic luxury journeys through Sri Lanka — Sigiriya, Ella, Yala safaris, tea country and golden beaches.",
    type: "website",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/28fbd4e9-7a62-4bc7-8aeb-27eb2f02936a"],
  },
  twitter: {
    card: "summary",
    title: "Tour Lanka — Luxury Sri Lanka Travel Experiences",
    description: "Tour Lanka crafts cinematic luxury journeys through Sri Lanka — Sigiriya, Ella, Yala safaris, tea country and golden beaches.",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/28fbd4e9-7a62-4bc7-8aeb-27eb2f02936a"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme — runs before CSS paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('tl-theme');var d=document.documentElement;d.classList.remove('dark','light');if(t==='light'||t==='dark'){d.classList.add(t);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){d.classList.add('light');}else{d.classList.add('dark');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
