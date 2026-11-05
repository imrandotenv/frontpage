import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://frontpage-maker.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FrontPage - Instant A4 Assignment & Lab Report Cover Generator",
    template: "%s | FrontPage",
  },
  description:
    "Generate print-ready, high-resolution A4 assignment cover pages and engineering lab records in seconds. 100% Free, client-side, mobile-optimized with 1-click PDF download.",
  keywords: [
    "Assignment Cover Page Generator",
    "Front Page Maker",
    "Lab Report Cover Sheet",
    "A4 Assignment PDF",
    "Engineering Lab Record Front Page",
    "College Assignment Cover Maker",
    "B.Tech Assignment PDF",
  ],
  authors: [{ name: "MD Imran Ahmad", url: "https://github.com/imrandotenv" }],
  creator: "MD Imran Ahmad",
  publisher: "MD Imran Ahmad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FrontPage - Instant A4 Assignment & Lab Report Cover Generator",
    description:
      "Generate print-ready A4 assignment front pages and lab records in seconds with real-time preview and 1-click PDF export.",
    url: siteUrl,
    siteName: "FrontPage Maker",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "FrontPage - Instant A4 Assignment Cover Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrontPage - Instant A4 Assignment & Lab Report Cover Generator",
    description:
      "Generate print-ready A4 assignment front pages and lab records in seconds with real-time preview and 1-click PDF export.",
    images: ["/og-preview.png"],
    creator: "@imrandotenv",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e1b4b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-slate-50">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fallback social share meta tags */}
        <meta property="og:image" content="/og-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/og-preview.png" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
