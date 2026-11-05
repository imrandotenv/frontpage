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
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [formData, setFormData] = useState<StudentFormData>(DEFAULT_FORM_DATA);
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("");
  const [useScannedHeader, setUseScannedHeader] = useState<boolean>(false);

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
    setFormData(DEFAULT_FORM_DATA);
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
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#38335b", "#c07f2b", "#10b981"],
        });
      } catch {
        // Confetti optional
      }
    } catch (error) {
      console.error(error);
      alert(
        "There was an issue generating the PDF. Please try again or use Quick Print to save as PDF."
      );
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
      <section className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 max-w-7xl mx-auto w-full no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/70">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Assignment Front Page Maker
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter your details on the left, preview in real-time, and download your print-ready A4 PDF.
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
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN WORKSPACE: FORM (LEFT) & PREVIEW (RIGHT)              */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 pb-24 lg:pb-12 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT: STUDENT DETAILS FORM (5 COLS)                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-5">
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
          <div className="lg:col-span-6 xl:col-span-7 sticky top-20">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col space-y-4">
              {/* Preview Header & Controls */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
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
              <div className="w-full bg-slate-100/70 rounded-xl p-3 flex items-center justify-center overflow-hidden border border-slate-200/70">
                <div className="w-full max-w-[480px]">
                  <A4PaperPreview
                    data={formData}
                    useImageHeader={useScannedHeader}
                    maxContainerWidth={480}
                  />
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
