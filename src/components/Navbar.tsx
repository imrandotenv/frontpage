"use client";

import React from "react";
import { GraduationCap, Printer, Share2, Download } from "lucide-react";

interface NavbarProps {
  onPrint: () => void;
  onReset: () => void;
  onDownloadPdf?: () => void;
  isGenerating?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPrint,
  onReset,
  onDownloadPdf,
  isGenerating = false,
}) => {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "FrontPage - High-End Assignment Cover Generator",
          text: "Generate instant, print-ready university assignment front pages in seconds!",
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Website URL copied to clipboard!");
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-40 no-print transition-all duration-300">
      <div className="bg-white/85 backdrop-blur-xl border border-neutral-200/80 rounded-full px-3.5 sm:px-5 py-2.5 shadow-lg shadow-black/[0.04] flex items-center justify-between gap-3">
        {/* Left: Studio Branding & Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-4 h-4 text-[#FB923C]" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-[#0a0a0a] text-sm sm:text-base tracking-tight font-chakra uppercase">
              FrontPage
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v2.0 • 300 DPI
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 p-1 rounded-full border border-neutral-200/50 text-[11px] font-semibold text-neutral-600">
          <a
            href="#generator"
            className="px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all"
          >
            Studio Generator
          </a>
          <a
            href="#templates"
            className="px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all"
          >
            4 Layouts
          </a>
          <a
            href="#specifications"
            className="px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all"
          >
            Specs &amp; Standards
          </a>
        </nav>

        {/* Right: Quick actions & Solid CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-1.5"
            title="Share with classmates"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-1.5 border border-neutral-200/80"
            title="Browser quick print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {onDownloadPdf ? (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGenerating}
              className="px-3.5 sm:px-4 py-1.5 bg-[#0a0a0a] hover:bg-neutral-800 text-white text-xs font-bold rounded-full transition-all shadow-xs flex items-center gap-1.5 active:scale-95 disabled:opacity-75"
            >
              <Download className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Get PDF</span>
            </button>
          ) : (
            <a
              href="https://github.com/imrandotenv/frontpage"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3.5 sm:py-1.5 bg-[#0a0a0a] hover:bg-neutral-800 text-white text-xs font-bold rounded-full transition-all shadow-xs flex items-center gap-1.5"
              title="View GitHub repository"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
