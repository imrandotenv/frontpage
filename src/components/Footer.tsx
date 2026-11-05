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
          text: "Generate instant, print-ready assignment front pages in seconds!",
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
    <footer className="w-full bg-white border-t border-slate-200/80 mt-16 pt-12 pb-24 lg:pb-12 text-slate-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Col 1: Branding & Intro */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-900 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight font-ui">
                FrontPage
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Free, modern, and mobile-friendly A4 cover sheet generator for university
              assignments, engineering lab files, project reports, and seminar papers.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side • Your information never leaves your phone</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Actions
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={handleShare}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Share with Classmates</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onPrint}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Quick Print (Save as PDF)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onReset}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Reset Form to Defaults
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Project & Source */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Open Source
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have an idea or want to contribute? The source code is freely available on GitHub.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/imrandotenv/frontpage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>Designed &amp; Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              href="https://github.com/imrandotenv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-700 hover:text-indigo-600 transition-colors ml-0.5"
            >
              MD Imran Ahmad
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span>MIT License</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-slate-700 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
