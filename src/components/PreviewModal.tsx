"use client";

import React, { useState } from "react";
import { A4PaperPreview } from "./A4PaperPreview";
import { StudentFormData } from "@/types";
import {
  X,
  Download,
  Printer,
  FileImage,
  Loader2,
  Check,
} from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudentFormData;
  onDownloadPdf: () => void;
  onDownloadImage: () => void;
  onPrint: () => void;
  isGenerating: boolean;
  progressText: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  onDownloadPdf,
  onDownloadImage,
  onPrint,
  isGenerating,
  progressText,
}) => {
  const [useImageHeader, setUseImageHeader] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col justify-between overflow-hidden animate-fadeIn no-print">
      {/* Modal Top Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
              A4 Page Preview
            </h3>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Exact print-ready layout (210mm × 297mm)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {data.templateId === "classic" && (
            <button
              type="button"
              onClick={() => setUseImageHeader(!useImageHeader)}
              className="text-[11px] font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors hidden sm:block border border-slate-200"
            >
              Header: {useImageHeader ? "Scanned" : "Vector HD"}
            </button>
          )}

          <button
            type="button"
            onClick={onPrint}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center gap-1.5 text-xs font-bold border border-slate-200"
            title="Print"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={onDownloadImage}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-200"
            title="Download PNG Image"
          >
            <FileImage className="w-4 h-4" />
            <span className="hidden md:inline">Save Image</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-indigo-800 to-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-75"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span className="truncate max-w-[100px]">{progressText}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal Body / Scrollable Canvas Container with Auto-Fit */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950/60">
        <div className="w-full max-w-[560px]">
          <A4PaperPreview
            data={data}
            useImageHeader={useImageHeader}
            maxContainerWidth={560}
          />
        </div>
      </div>
    </div>
  );
};
