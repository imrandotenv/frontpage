"use client";

import React from "react";

interface FooterProps {
  onPrint?: () => void;
  onReset?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-16 py-6 text-slate-500 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-800">FrontPage</span>
          <span>—</span>
          <span>Assignment Cover Generator</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>
            Created by{" "}
            <a
              href="https://github.com/imrandotenv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-800 hover:underline"
            >
              MD Imran Ahmad
            </a>
          </span>
          <span>•</span>
          <a
            href="https://github.com/imrandotenv/frontpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-800 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
