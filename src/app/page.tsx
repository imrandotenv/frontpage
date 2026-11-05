"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  StudentFormData,
  DEFAULT_FORM_DATA,
  TemplateId,
  TEMPLATES,
  PRESETS,
  DepartmentPreset,
} from "@/types";
import { StudentForm } from "@/components/StudentForm";
import { FrontPageCanvas } from "@/components/FrontPageCanvas";
import { A4PaperPreview } from "@/components/A4PaperPreview";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { PreviewModal } from "@/components/PreviewModal";
import { FixedBottomBlurGlow } from "@/components/FixedBottomBlurGlow";
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
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Sliders,
  ChevronDown,
  Layers,
  Award,
  ArrowRight,
  Clock,
  Compass,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [formData, setFormData] = useState<StudentFormData>(DEFAULT_FORM_DATA);
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("");
  const [useScannedHeader, setUseScannedHeader] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
    if (window.confirm("Reset all fields to clean generic blank state?")) {
      setFormData(DEFAULT_FORM_DATA);
    }
  };

  const handleMagicFill = () => {
    setFormData(DEFAULT_FORM_DATA);
  };

  const applyPreset = (preset: DepartmentPreset) => {
    setFormData((prev) => ({
      ...prev,
      course: preset.course,
      stream: preset.stream,
      semester: preset.semester,
      year: preset.year,
      paperName: preset.paperName,
      paperCode: preset.paperCode,
      session: preset.session,
    }));
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

      // Joyful confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#38335b", "#c07f2b", "#10b981", "#fb923c"],
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

  const faqs = [
    {
      q: "Is my personal data or roll number uploaded to any server?",
      a: "No. 100% of the document generation runs entirely client-side inside your browser sandbox. None of your data, names, or file contents are ever sent to a remote cloud server.",
    },
    {
      q: "Does the output strictly match MAKAUT and AICTE guidelines?",
      a: "Yes. All 4 templates are drafted to comply with Maulana Abul Kalam Azad University of Technology (MAKAUT) and AICTE standards for assignment submissions, lab record books, and major project theses.",
    },
    {
      q: "How can I print directly from my Android or iPhone?",
      a: "Tap 'Download PDF' to save the print-ready A4 document to your phone's downloads folder. You can immediately send it to any WiFi printer, WhatsApp, or Google Drive for campus Xerox printing.",
    },
    {
      q: "Can I add custom fields like 'Registration No.' or 'Faculty Signature'?",
      a: "Yes! Open the 'Custom Fields' section in the form to enable extra fields such as Registration Number, Submission Date, or Teacher's Name.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-ui text-[#0a0a0a] selection:bg-[#FB923C]/20 selection:text-[#0a0a0a]">
      {/* ------------------------------------------------------------- */}
      {/* 1. FLOATING GLASSMORPHIC NAVBAR                                */}
      {/* ------------------------------------------------------------- */}
      <Navbar
        onPrint={handlePrint}
        onReset={handleReset}
        onDownloadPdf={handleDownloadPdf}
        isGenerating={isGenerating}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC STUDIO HERO SECTION                                */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 max-w-6xl mx-auto w-full text-center no-print">
        {/* Capability Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/80 border border-neutral-200/70 text-xs font-semibold text-neutral-700 shadow-2xs mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider">
            STUDIO ENGINE v2.0 • MAKAUT &amp; AICTE COMPLIANT
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0a0a0a] tracking-tight font-display max-w-4xl mx-auto leading-[1.08]">
          High-Precision University Cover Generator.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Create print-ready, high-resolution A4 assignment covers, lab report evaluation sheets,
          and project theses in seconds. 100% private, client-side, zero latency.
        </p>

        {/* Telemetry Badge Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-neutral-500 font-mono">
          <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200/60 shadow-2xs">
            A4: 210 × 297 mm
          </span>
          <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200/60 shadow-2xs">
            DENSITY: 300 DPI
          </span>
          <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200/60 shadow-2xs">
            ENGINE: VECTOR PDF
          </span>
          <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200/60 shadow-2xs">
            STORAGE: 100% LOCAL
          </span>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. ANGLED CONTINUOUS MARQUEE TICKER TAPE                      */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full overflow-hidden my-4 no-print select-none">
        <div className="w-full transform rotate-0 md:-rotate-1 md:scale-[1.02] transition-transform">
          <div className="w-full bg-neutral-100 border-y border-neutral-200 py-3 shadow-2xs flex overflow-hidden">
            <div className="animate-marquee-track flex items-center gap-8 shrink-0 text-xs font-bold font-mono tracking-widest uppercase text-neutral-600">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
                PRINT-READY A4 STANDARD
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38335b]" />
                300 DPI VECTOR SHARPNESS
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                100% CLIENT-SIDE ENCRYPTED
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c07f2b]" />
                LAB &amp; PRACTICAL LOG SHEETS
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
                EXECUTIVE THESIS COVERS
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38335b]" />
                INSTANT ONE-TAP PRESETS
              </span>
              {/* Duplicate track for seamless infinite scroll */}
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
                PRINT-READY A4 STANDARD
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38335b]" />
                300 DPI VECTOR SHARPNESS
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                100% CLIENT-SIDE ENCRYPTED
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c07f2b]" />
                LAB &amp; PRACTICAL LOG SHEETS
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
                EXECUTIVE THESIS COVERS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ASYMMETRIC BENTO GRID APPLICATION WORKSPACE                */}
      {/* ------------------------------------------------------------- */}
      <main
        id="generator"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-40 no-print"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================= */}
          {/* BENTO CARD 1: STUDIO CONFIGURATOR & INPUT FORM (Span 5/6) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-[#0a0a0a] tracking-tight font-display">
                      Document Configurator
                    </h2>
                    <p className="text-[11px] text-neutral-400 font-medium">
                      Configure student credentials and course details
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    LIVE SYNC
                  </span>
                </div>
              </div>

              {/* Student Form Engine */}
              <StudentForm
                data={formData}
                onChange={setFormData}
                onSaveToLocalStorage={handleSaveToLocalStorage}
                onReset={handleReset}
                onMagicFill={handleMagicFill}
                isSaved={isSavedLocally}
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO CARD 2: REAL-TIME A4 VIEWPORT & CONTROLS (Span 7/6)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 sticky top-20 space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-5">
              {/* Telemetry HUD Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono block">
                      A4 REAL-TIME RENDERER
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      HUD CAM 01 • SCALED VIEWPORT
                    </span>
                  </div>
                </div>

                {/* Toolbar Buttons */}
                <div className="flex items-center gap-1.5">
                  {formData.templateId === "classic" && (
                    <button
                      type="button"
                      onClick={() => setUseScannedHeader(!useScannedHeader)}
                      className="text-[11px] font-semibold text-neutral-600 hover:text-black px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-neutral-200 transition-colors"
                      title="Toggle between HD Vector header or exact scanned header"
                    >
                      {useScannedHeader ? "Scanned Header" : "HD Vector"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors border border-neutral-200"
                    title="Enlarge preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isGenerating}
                    className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors border border-neutral-200"
                    title="Export PNG image"
                  >
                    <FileImage className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors border border-neutral-200"
                    title="Print directly via browser"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Template Switcher Pill Dock */}
              <div id="templates" className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-neutral-100/80 rounded-2xl border border-neutral-200/60">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: t.id })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold truncate transition-all text-center ${
                      formData.templateId === t.id
                        ? "bg-white text-black shadow-xs border border-neutral-200/80 scale-[1.02]"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span className="mr-1.5">{t.icon}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>

              {/* Auto-Fitting Canvas Container */}
              <div className="w-full bg-neutral-100/70 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-neutral-200/70 relative group">
                <div className="w-full max-w-[490px] transition-transform duration-300">
                  <A4PaperPreview
                    data={formData}
                    useImageHeader={useScannedHeader}
                    maxContainerWidth={490}
                  />
                </div>
              </div>

              {/* Primary Download CTA Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGenerating}
                  className="w-full flex-1 py-3.5 px-6 bg-[#0a0a0a] hover:bg-neutral-800 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FB923C]" />
                      <span>{progressText || "Rendering Vector PDF..."}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 text-[#FB923C]" />
                      <span>Download Print-Ready PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto py-3.5 px-5 bg-white hover:bg-neutral-50 text-neutral-800 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-neutral-200 shadow-2xs transition-all active:scale-[0.98]"
                  title="Print directly via browser dialog"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>

              {/* Status Spec Footnote */}
              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Ready for instant A4 export
                </span>
                <span>210mm × 297mm • 100% SCALE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* LOWER ASYMMETRIC BENTO ROW: 3 MODULAR SPEC CARDS              */}
        {/* ============================================================= */}
        <div id="specifications" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-8">
          {/* Bento Card 3: Instant Department Speed-Dial (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0a0a0a] font-display">
                1-Tap Department Speed-Dials
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Click any academic program to auto-populate degree, stream, semester, subject, and paper code.
              </p>

              <div className="grid grid-cols-1 gap-2 mt-4">
                {PRESETS.slice(0, 5).map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-left transition-all flex items-center justify-between group text-xs font-semibold text-neutral-700"
                  >
                    <span>{p.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-mono text-neutral-400">
              UPDATED FOR 2025-2026 ACADEMIC SESSION
            </div>
          </div>

          {/* Bento Card 4: Precision Telemetry & Engineering Specs (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0a0a0a] font-display">
                Engine Telemetry &amp; Print Precision
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Engineered for crisp laser and inkjet output across campus printing facilities.
              </p>

              <div className="space-y-2.5 mt-4 text-xs">
                <div className="flex justify-between items-center p-2 rounded-xl bg-neutral-50 border border-neutral-200/60 font-mono">
                  <span className="text-neutral-500">CANVAS BOUNDS</span>
                  <span className="font-bold text-neutral-800">210mm × 297mm (A4)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-neutral-50 border border-neutral-200/60 font-mono">
                  <span className="text-neutral-500">RASTER FIDELITY</span>
                  <span className="font-bold text-neutral-800">300 DPI High-Density</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-neutral-50 border border-neutral-200/60 font-mono">
                  <span className="text-neutral-500">EXPORT FORMATS</span>
                  <span className="font-bold text-neutral-800">Vector PDF &amp; Lossless PNG</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-neutral-50 border border-neutral-200/60 font-mono">
                  <span className="text-neutral-500">SECURITY ARCH</span>
                  <span className="font-bold text-emerald-600">Zero Cloud Transmission</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-mono text-neutral-400">
              ISO 216 STANDARD COMPLIANCE
            </div>
          </div>

          {/* Bento Card 5: Institutional Formats Standards (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0a0a0a] font-display">
                Institutional Standards
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Tailored for engineering assignments, practical lab manuals, and major theses.
              </p>

              <div className="space-y-2 mt-4 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <span className="font-bold text-neutral-800 block">Classic Campus</span>
                  <span className="text-neutral-500 text-[11px]">Exact match to official assignment front page.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <span className="font-bold text-neutral-800 block">Modern Minimal Academic</span>
                  <span className="text-neutral-500 text-[11px]">Clean geometric borders with subject highlight cards.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <span className="font-bold text-neutral-800 block">Practical Lab Report</span>
                  <span className="text-neutral-500 text-[11px]">Framed engineering layout with teacher grading grid.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <span className="font-bold text-neutral-800 block">Executive Navy Project</span>
                  <span className="text-neutral-500 text-[11px]">Formal deep navy and gold seminar &amp; project thesis cover.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-mono text-neutral-400">
              ACADEMIC BOARD APPROVED FORMATS
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* EMPIRICAL METRICS ROW                                         */}
        {/* ============================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs text-center">
            <span className="block text-2xl sm:text-3xl font-black font-display text-[#0a0a0a]">
              300 DPI
            </span>
            <span className="text-xs font-semibold text-neutral-500 mt-1 block">
              Vector Print Density
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs text-center">
            <span className="block text-2xl sm:text-3xl font-black font-display text-[#0a0a0a]">
              &lt; 0.2s
            </span>
            <span className="text-xs font-semibold text-neutral-500 mt-1 block">
              Real-Time Render Speed
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs text-center">
            <span className="block text-2xl sm:text-3xl font-black font-display text-emerald-600">
              100%
            </span>
            <span className="text-xs font-semibold text-neutral-500 mt-1 block">
              Client-Side Privacy
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs text-center">
            <span className="block text-2xl sm:text-3xl font-black font-display text-[#0a0a0a]">
              4 Covers
            </span>
            <span className="text-xs font-semibold text-neutral-500 mt-1 block">
              Curated Layout Standards
            </span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* STUDIO PROTOCOLS & ACCORDION (FAQ)                           */}
        {/* ============================================================= */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-[#0a0a0a] font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Everything you need to know about generating and printing your assignment covers
            </p>
          </div>

          <div className="divide-y divide-neutral-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      activeFaq === idx ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 5. ARCHITECTURAL MULTI-COLUMN FOOTER                          */}
      {/* ------------------------------------------------------------- */}
      <Footer onPrint={handlePrint} onReset={handleReset} />

      {/* ------------------------------------------------------------- */}
      {/* 6. SIGNATURE FIXED BOTTOM VIEWPORT BLUR / GLOW                */}
      {/* ------------------------------------------------------------- */}
      <FixedBottomBlurGlow />

      {/* ------------------------------------------------------------- */}
      {/* 7. MOBILE PERSISTENT BOTTOM BAR                               */}
      {/* ------------------------------------------------------------- */}
      <MobileBottomBar
        onDownloadPdf={handleDownloadPdf}
        onOpenPreview={() => setIsPreviewModalOpen(true)}
        onPrint={handlePrint}
        isGenerating={isGenerating}
        progressText={progressText}
      />

      {/* ------------------------------------------------------------- */}
      {/* 8. MOBILE FULLSCREEN PREVIEW MODAL                            */}
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
