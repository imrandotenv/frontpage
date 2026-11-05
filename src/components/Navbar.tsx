"use client";

import React from "react";
import { FileText, Printer, Sparkles, Download, Loader2 } from "lucide-react";

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
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Clean Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-base tracking-tight font-ui">
              FrontPage
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
              Studio
            </span>
          </div>
        </div>

        {/* Right: Essential Studio Actions */}
        <div className="flex items-center gap-2">
          {onMagicFill && (
            <button
              type="button"
              onClick={onMagicFill}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
              title="Populate realistic sample details"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Fill Demo</span>
            </button>
          )}

          <button
            type="button"
            onClick={onPrint}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 border border-slate-200"
            title="Print directly to printer or save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {onDownloadPdf && (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGenerating}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-75"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>{progressText || "Exporting..."}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-amber-400" />
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
