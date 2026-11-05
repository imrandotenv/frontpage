"use client";

import React from "react";
import { Printer, Download, Loader2, Sparkles } from "lucide-react";

interface NavbarProps {
  onPrint: () => void;
  onReset: () => void;
  onDownloadPdf?: () => void;
  onMagicFill?: () => void;
  isGenerating?: boolean;
  progressText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPrint,
  onDownloadPdf,
  onMagicFill,
  isGenerating = false,
  progressText = "",
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        {/* Left: Clean Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            FP
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            FrontPage
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {onMagicFill && (
            <button
              type="button"
              onClick={onMagicFill}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sample Data</span>
            </button>
          )}

          <button
            type="button"
            onClick={onPrint}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {onDownloadPdf && (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGenerating}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-300" />
                  <span>{progressText || "Exporting..."}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
