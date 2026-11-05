import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrontPage - Assignment & Lab Report Cover Generator",
  description:
    "Generate print-ready, high-resolution A4 assignment and lab report cover pages in seconds.",
  keywords: [
    "Assignment Cover",
    "Front Page Generator",
    "Lab Report Cover",
    "Engineering Assignment PDF",
    "A4 Cover Page",
  ],
  authors: [{ name: "MD Imran Ahmad", url: "https://github.com/imrandotenv" }],
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
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
