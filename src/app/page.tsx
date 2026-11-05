"use client";

import React, { useState, useEffect, useRef } from "react";
import { StudentFormData, DEFAULT_FORM_DATA, TemplateId, TEMPLATES } from "@/types";
import { StudentForm } from "@/components/StudentForm";
import { FrontPageCanvas } from "@/components/FrontPageCanvas";
import { A4PaperPreview } from "@/components/A4PaperPreview";
import { Navbar } from "@/components/Navbar";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { PreviewModal } from "@/components/PreviewModal";
import {
  generateFrontPagePdf,
  downloadFrontPageImage,
} from "@/utils/pdfGenerator";
import {
  Download,
  Eye,
  Printer,
  FileImage,
  Loader2,
  Info,
  Maximize2,
} from "lucide-react";

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
    if (
      window.confirm(
        "Reset form back to default sample template?"
      )
    ) {
      setFormData(DEFAULT_FORM_DATA);
    }
  };

  const handleMagicFill = () => {
    setFormData(DEFAULT_FORM_DATA);
  };

  const handleDownloadPdf = async () => {
    if (!exportCanvasRef.current) return;
    setIsGenerating(true);
    setProgressText("Initializing PDF...");

    try {
      await generateFrontPagePdf({
        element: exportCanvasRef.current,
        studentName: formData.studentName,
        paperCode: formData.paperCode,
        onProgress: (pct, stage) => setProgressText(stage),
      });
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
    setProgressText("Rendering PNG...");
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
      {/* NAVIGATION BAR                                                */}
      {/* ------------------------------------------------------------- */}
      <Navbar onPrint={handlePrint} onReset={handleReset} />

      {/* ------------------------------------------------------------- */}
      {/* MAIN WORKSPACE                                                */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 no-print">
        {/* Hero Banner / Quick Actions */}
        <div className="mb-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Assignment Front Page Maker
              </h2>
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                4 Cover Formats
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Generate print-ready, high-resolution A4 assignment and lab report cover sheets in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="lg:hidden flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-4 h-4 text-slate-600" />
              <span>Full Preview</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-indigo-800 to-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 disabled:opacity-75"
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

        {/* Responsive Grid: Inputs (Left) and Sticky Preview (Right on lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: STUDENT DETAILS FORM */}
          <section className="lg:col-span-6 xl:col-span-5">
            <StudentForm
              data={formData}
              onChange={setFormData}
              onSaveToLocalStorage={handleSaveToLocalStorage}
              onReset={handleReset}
              onMagicFill={handleMagicFill}
              isSaved={isSavedLocally}
            />
          </section>

          {/* RIGHT: DESKTOP STICKY LIVE PREVIEW */}
          <section className="hidden lg:block lg:col-span-6 xl:col-span-7 sticky top-20">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live A4 Preview
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    [{TEMPLATES.find((t) => t.id === formData.templateId)?.name}]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Header style toggle for classic template */}
                  {formData.templateId === "classic" && (
                    <button
                      type="button"
                      onClick={() => setUseScannedHeader(!useScannedHeader)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                      title="Toggle between HD Vector header or exact scanned header"
                    >
                      Header: {useScannedHeader ? "Scanned" : "Vector HD"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Enlarge preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isGenerating}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Download PNG image"
                  >
                    <FileImage className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Print via Browser"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Template quick switcher tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: t.id })}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold truncate transition-all ${
                      formData.templateId === t.id
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Auto-Fitting Canvas Container */}
              <div className="w-full bg-slate-100/70 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-slate-200/70">
                <div className="w-full max-w-[480px]">
                  <A4PaperPreview
                    data={formData}
                    useImageHeader={useScannedHeader}
                    maxContainerWidth={480}
                  />
                </div>
              </div>

              {/* Quick tip footer */}
              <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-500" />
                  All fields update in real-time
                </span>
                <span className="font-semibold text-slate-700">
                  Standard A4 (210mm × 297mm)
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE PERSISTENT BOTTOM BAR                                  */}
      {/* ------------------------------------------------------------- */}
      <MobileBottomBar
        onDownloadPdf={handleDownloadPdf}
        onOpenPreview={() => setIsPreviewModalOpen(true)}
        onPrint={handlePrint}
        isGenerating={isGenerating}
        progressText={progressText}
      />

      {/* ------------------------------------------------------------- */}
      {/* MOBILE FULLSCREEN PREVIEW MODAL                               */}
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
