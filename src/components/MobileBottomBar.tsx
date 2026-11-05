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
    <div className="fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 bg-white/90 backdrop-blur-xl border border-neutral-200/90 p-2 rounded-full shadow-2xl lg:hidden no-print">
      <div className="max-w-md mx-auto flex items-center gap-1.5">
        {/* Preview Button */}
        <button
          type="button"
          onClick={onOpenPreview}
          className="min-h-[48px] px-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-neutral-200/80"
        >
          <Eye className="w-4 h-4 text-neutral-600" />
          <span>Preview</span>
        </button>

        {/* Download PDF Primary Button */}
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isGenerating}
          className="min-h-[48px] flex-1 px-4 bg-[#0a0a0a] text-white rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#FB923C]" />
              <span className="truncate">{progressText || "Rendering..."}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#FB923C]" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Print Button */}
        <button
          type="button"
          onClick={onPrint}
          className="min-h-[48px] w-12 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full flex items-center justify-center transition-all active:scale-95 border border-neutral-200/80 shrink-0"
          title="Print Cover Page"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
