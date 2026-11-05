"use client";

import React from "react";
import { Download, Eye, Printer, Loader2 } from "lucide-react";

interface MobileBottomBarProps {
  onDownloadPdf: () => void;
  onOpenPreview: () => void;
  onPrint: () => void;
  isGenerating: boolean;
  progressText: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onDownloadPdf,
  onOpenPreview,
  onPrint,
  isGenerating,
  progressText,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 sm:px-6 shadow-xl lg:hidden no-print">
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Preview Button */}
        <button
          type="button"
          onClick={onOpenPreview}
          className="flex-1 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-slate-200/80"
        >
          <Eye className="w-4 h-4 text-slate-600" />
          <span>Preview</span>
        </button>

        {/* Download PDF Primary Button */}
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isGenerating}
          className="flex-[2] py-3 px-4 bg-gradient-to-r from-indigo-800 to-slate-900 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span className="truncate">{progressText || "Generating..."}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Print Button */}
        <button
          type="button"
          onClick={onPrint}
          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all active:scale-95 border border-slate-200/80 shrink-0"
          title="Print Cover Page"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
