"use client";

import React from "react";
import { GraduationCap, Heart, Share2, Printer, ArrowUp, ShieldCheck } from "lucide-react";

interface FooterProps {
  onPrint: () => void;
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrint, onReset }) => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "FrontPage - Assignment Cover Generator",
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
    <footer className="w-full bg-white border-t border-slate-200 mt-12 pt-8 pb-24 lg:pb-8 text-slate-500 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Left: Branding & Privacy */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                FrontPage
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md">
              Fast, client-side A4 front page generator for engineering assignments and lab records.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onPrint}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Quick Print</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onReset}
              className="hover:text-slate-900 transition-colors"
            >
              Reset Form
            </button>
            <span>•</span>
            <a
              href="https://github.com/imrandotenv/frontpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-4 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Created by</span>
            <a
              href="https://github.com/imrandotenv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-700 hover:text-slate-900 transition-colors"
            >
              MD Imran Ahmad
            </a>
            <span>• MIT License</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-slate-700 transition-colors flex items-center gap-1"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
