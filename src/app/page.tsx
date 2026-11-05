"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  StudentFormData,
  DEFAULT_FORM_DATA,
  TemplateId,
  TEMPLATES,
} from "@/types";
import { StudentForm } from "@/components/StudentForm";
import { FrontPageCanvas } from "@/components/FrontPageCanvas";
import { A4PaperPreview } from "@/components/A4PaperPreview";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { PreviewModal } from "@/components/PreviewModal";
import {
  generateFrontPagePdf,
  downloadFrontPageImage,
} from "@/utils/pdfGenerator";
import {
  Download,
  Printer,
  FileImage,
  Loader2,
  Maximize2,
  Minus,
  Plus,
  Eye,
  Edit3,
} from "lucide-react";
import confetti from "canvas-confetti";

const DEMO_PROFILES = [
  {
    studentName: "AARAV SHARMA",
    universityRollNo: "24500124018",
    course: "B.TECH",
    stream: "COMPUTER SCIENCE & ENGINEERING (CSE)",
    semester: "3RD SEMESTER",
    year: "2ND YEAR",
    paperName: "DATA STRUCTURES & ALGORITHMS",
    paperCode: "PCC-CS301",
    session: "2025-2026",
  },
  {
    studentName: "PRIYANKA BANERJEE",
    universityRollNo: "24500123089",
    course: "B.TECH",
    stream: "CSE (AI & MACHINE LEARNING)",
    semester: "5TH SEMESTER",
    year: "3RD YEAR",
    paperName: "DATABASE MANAGEMENT SYSTEMS",
    paperCode: "PCC-CS501",
    session: "2025-2026",
  },
  {
    studentName: "ROHAN MUKHERJEE",
    universityRollNo: "24500122012",
    course: "B.TECH",
    stream: "ELECTRONICS & COMM. ENG. (ECE)",
    semester: "6TH SEMESTER",
    year: "3RD YEAR",
    paperName: "VLSI DESIGN & MICROELECTRONICS",
    paperCode: "EC-602",
    session: "2025-2026",
  },
];

export default function Home() {
  const [formData, setFormData] = useState<StudentFormData>(DEFAULT_FORM_DATA);
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("");
  const [useScannedHeader, setUseScannedHeader] = useState<boolean>(false);
  const [zoomOffset, setZoomOffset] = useState<number>(0);
  const [currentZoomPercent, setCurrentZoomPercent] = useState<number>(60);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  // Ref for the 1:1 unscaled print/export canvas
  const exportCanvasRef = useRef<HTMLDivElement>(null);

  // Load saved student details from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("frontpage_student_details");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          studentName: parsed.studentName || prev.studentName,
          universityRollNo: parsed.universityRollNo || prev.universityRollNo,
          course: parsed.course || prev.course,
          stream: parsed.stream || prev.stream,
        }));
        setIsSavedLocally(true);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }, []);

  // Save student credentials to localStorage
  const handleSaveToLocalStorage = () => {
    try {
      const toSave = {
        studentName: formData.studentName,
        universityRollNo: formData.universityRollNo,
        course: formData.course,
        stream: formData.stream,
      };
      localStorage.setItem("frontpage_student_details", JSON.stringify(toSave));
      setIsSavedLocally(true);
      setTimeout(() => setIsSavedLocally(false), 3000);
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all fields back to blank state?")) {
      setFormData(DEFAULT_FORM_DATA);
    }
  };

  const handleMagicFill = () => {
    // Pick the next demo profile or first
    const nextDemo =
      DEMO_PROFILES.find((d) => d.studentName !== formData.studentName) ||
      DEMO_PROFILES[0];

    setFormData((prev) => ({
      ...prev,
      ...nextDemo,
      customFields: [
        {
          id: "reg-no",
          label: "REGISTRATION NO.",
          value: "222450110042",
          enabled: true,
        },
        {
          id: "submitted-to",
          label: "SUBMITTED TO",
          value: "PROF. DEBASHIS MITRA",
          enabled: true,
        },
      ],
    }));

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const handleDownloadPdf = async () => {
    if (!exportCanvasRef.current) return;
    setIsGenerating(true);
    setProgressText("Creating PDF...");

    try {
      await generateFrontPagePdf({
        element: exportCanvasRef.current,
        studentName: formData.studentName,
        paperCode: formData.paperCode,
        onProgress: (pct, stage) => setProgressText(stage),
      });

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }
    } catch (err) {
      console.error(err);
      alert("Failed to export PDF. Please try again or use the browser print option.");
    } finally {
      setIsGenerating(false);
      setProgressText("");
    }
  };

  const handleDownloadImage = async () => {
    if (!exportCanvasRef.current) return;
    setIsGenerating(true);
    setProgressText("Rendering image...");
    try {
      await downloadFrontPageImage({
        element: exportCanvasRef.current,
        studentName: formData.studentName,
        paperCode: formData.paperCode,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsGenerating(false);
      setProgressText("");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-ui text-slate-800">
      {/* ------------------------------------------------------------- */}
      {/* 1. CLEAN MINIMAL HEADER                                       */}
      {/* ------------------------------------------------------------- */}
      <Navbar
        onPrint={handlePrint}
        onReset={handleReset}
        onDownloadPdf={handleDownloadPdf}
        isGenerating={isGenerating}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. SIMPLE, DIRECT HEADER SECTION                              */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-24 sm:pt-28 pb-3 px-4 sm:px-6 max-w-7xl mx-auto w-full no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/70">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Assignment Front Page Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter your coursework details on the left, preview live on A4, and download your print-ready PDF.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{progressText || "Generating..."}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Tabs (Only visible on small screens) */}
        <div className="lg:hidden grid grid-cols-2 gap-1.5 mt-3 p-1 bg-slate-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setMobileTab("editor")}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === "editor"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor &amp; Presets</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === "preview"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live A4 Preview</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN WORKSPACE: FORM (LEFT) & PREVIEW (RIGHT)              */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 pb-24 lg:pb-12 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT: STUDENT DETAILS FORM (5 COLS)                       */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-6 xl:col-span-5 ${
              mobileTab === "editor" ? "block" : "hidden lg:block"
            }`}
          >
            <StudentForm
              data={formData}
              onChange={setFormData}
              onSaveToLocalStorage={handleSaveToLocalStorage}
              onReset={handleReset}
              onMagicFill={handleMagicFill}
              isSaved={isSavedLocally}
            />
          </div>

          {/* ========================================================= */}
          {/* RIGHT: LIVE A4 PREVIEW (7 COLS, STICKY)                   */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-6 xl:col-span-7 sticky top-20 ${
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col space-y-3.5">
              {/* Preview Header & Controls */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Preview
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({TEMPLATES.find((t) => t.id === formData.templateId)?.name})
                  </span>
                </div>

                {/* Toolbar Buttons */}
                <div className="flex items-center gap-1.5">
                  {formData.templateId === "classic" && (
                    <button
                      type="button"
                      onClick={() => setUseScannedHeader(!useScannedHeader)}
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                      title="Toggle between vector header or scanned header"
                    >
                      {useScannedHeader ? "Scanned" : "Vector HD"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="Enlarge preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isGenerating}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="Export PNG image"
                  >
                    <FileImage className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="Print via browser"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Template Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: t.id })}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold truncate transition-all text-center ${
                      formData.templateId === t.id
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Canvas Preview Container */}
              <div className="w-full bg-slate-100/70 rounded-xl p-3 flex flex-col items-center justify-center overflow-hidden border border-slate-200/70">
                <div className="w-full max-w-[500px]">
                  <A4PaperPreview
                    data={formData}
                    useImageHeader={useScannedHeader}
                    maxContainerWidth={500}
                    zoomOffset={zoomOffset}
                    onScaleCalculated={setCurrentZoomPercent}
                  />
                </div>

                {/* Subtle Stage Zoom Controls */}
                <div className="mt-2 flex items-center justify-between w-full px-2 text-xs text-slate-500">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    A4 Sheet • 210mm × 297mm
                  </span>

                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full border border-slate-200 shadow-2xs ml-auto">
                    <button
                      type="button"
                      onClick={() => setZoomOffset((prev) => Math.max(-0.35, prev - 0.08))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom Out"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomOffset(0)}
                      className="px-2 text-[11px] font-mono font-semibold text-slate-700 hover:text-indigo-600"
                      title="Reset Zoom to Fit"
                    >
                      {zoomOffset === 0 ? `Fit (${currentZoomPercent}%)` : `${currentZoomPercent}%`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomOffset((prev) => Math.min(0.45, prev + 0.08))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom In"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons Below Canvas */}
              <div className="pt-1 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGenerating}
                  className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>{progressText || "Generating..."}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Download Print-Ready PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center gap-1.5 border border-slate-200 transition-all active:scale-98"
                  title="Print directly"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Standard A4 (210mm × 297mm)</span>
                <span>Ready for high-res print</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 4. CLEAN FOOTER                                               */}
      {/* ------------------------------------------------------------- */}
      <Footer onPrint={handlePrint} onReset={handleReset} />

      {/* ------------------------------------------------------------- */}
      {/* 5. MOBILE BOTTOM BAR                                          */}
      {/* ------------------------------------------------------------- */}
      <MobileBottomBar
        onDownloadPdf={handleDownloadPdf}
        onOpenPreview={() => setIsPreviewModalOpen(true)}
        onPrint={handlePrint}
        isGenerating={isGenerating}
        progressText={progressText}
      />

      {/* ------------------------------------------------------------- */}
      {/* 6. FULLSCREEN PREVIEW MODAL                                   */}
      {/* ------------------------------------------------------------- */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={formData}
        onDownloadPdf={handleDownloadPdf}
        onDownloadImage={handleDownloadImage}
        onPrint={handlePrint}
        isGenerating={isGenerating}
        progressText={progressText}
      />

      {/* ------------------------------------------------------------- */}
      {/* UNRENDERED 1:1 CANVASES FOR HIGH-RES EXPORT & PRINT           */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          width: "210mm",
          height: "297mm",
          overflow: "visible",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <FrontPageCanvas
          ref={exportCanvasRef}
          data={formData}
          useImageHeader={useScannedHeader}
        />
      </div>
    </div>
  );
}
