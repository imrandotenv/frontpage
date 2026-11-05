"use client";

import React, { forwardRef } from "react";
import { StudentFormData } from "@/types";
import {
  SANAKA_LOGO_BASE64,
  SANAKA_BUILDING_BASE64,
  SANAKA_HEADER_BASE64,
} from "@/constants/assets";

interface FrontPageCanvasProps {
  data: StudentFormData;
  scale?: number;
  useImageHeader?: boolean;
}

const CampusIllustrationSVG: React.FC = () => (
  <svg viewBox="0 0 700 210" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="lawnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="100%" stopColor="#bbf7d0" />
      </linearGradient>
    </defs>
    <rect width="700" height="210" fill="url(#skyGrad)" />
    <ellipse cx="140" cy="38" rx="55" ry="14" fill="#ffffff" fillOpacity="0.75" />
    <ellipse cx="530" cy="32" rx="70" ry="16" fill="#ffffff" fillOpacity="0.7" />

    {/* Architectural University Building */}
    <polygon points="45,95 250,58 250,175 45,175" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <polygon points="42,90 250,52 250,60 42,97" fill="#0284c7" />

    <rect x="245" y="42" width="115" height="133" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
    <polygon points="240,42 365,42 360,32 245,32" fill="#0369a1" />
    <rect x="268" y="60" width="70" height="72" rx="35" fill="url(#glassGrad)" stroke="#e2e8f0" strokeWidth="2" />
    <line x1="303" y1="60" x2="303" y2="132" stroke="#93c5fd" strokeWidth="1.2" />
    <line x1="268" y1="96" x2="338" y2="96" stroke="#93c5fd" strokeWidth="1.2" />

    <polygon points="360,58 655,92 655,175 360,175" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <polygon points="360,51 658,86 658,94 360,60" fill="#0284c7" />

    <g fill="#334155" opacity="0.8">
      <rect x="70" y="105" width="18" height="20" rx="1" />
      <rect x="105" y="100" width="18" height="22" rx="1" />
      <rect x="140" y="95" width="20" height="24" rx="1" />
      <rect x="180" y="90" width="22" height="26" rx="1" />
      <rect x="215" y="85" width="20" height="28" rx="1" />

      <rect x="70" y="135" width="18" height="20" rx="1" />
      <rect x="105" y="132" width="18" height="22" rx="1" />
      <rect x="140" y="129" width="20" height="24" rx="1" />
      <rect x="180" y="126" width="22" height="26" rx="1" />
      <rect x="215" y="123" width="20" height="28" rx="1" />
    </g>

    <g fill="#334155" opacity="0.8">
      <rect x="380" y="82" width="24" height="26" rx="1" />
      <rect x="420" y="86" width="24" height="25" rx="1" />
      <rect x="460" y="90" width="22" height="24" rx="1" />
      <rect x="500" y="94" width="22" height="23" rx="1" />
      <rect x="540" y="98" width="20" height="22" rx="1" />
      <rect x="578" y="102" width="18" height="20" rx="1" />
      <rect x="612" y="106" width="18" height="19" rx="1" />

      <rect x="380" y="122" width="24" height="26" rx="1" />
      <rect x="420" y="124" width="24" height="25" rx="1" />
      <rect x="460" y="127" width="22" height="24" rx="1" />
      <rect x="500" y="130" width="22" height="23" rx="1" />
      <rect x="540" y="133" width="20" height="22" rx="1" />
      <rect x="578" y="136" width="18" height="20" rx="1" />
      <rect x="612" y="138" width="18" height="19" rx="1" />
    </g>

    <rect x="262" y="138" width="82" height="37" fill="#e2e8f0" stroke="#94a3b8" />
    <rect x="282" y="146" width="42" height="29" fill="#0f172a" />

    <rect x="0" y="173" width="700" height="37" fill="url(#lawnGrad)" />
    <polygon points="240,210 285,173 325,173 370,210" fill="#cbd5e1" />
    <circle cx="38" cy="165" r="18" fill="#15803d" />
    <circle cx="65" cy="170" r="14" fill="#16a34a" />
    <circle cx="655" cy="165" r="20" fill="#15803d" />
    <circle cx="630" cy="172" r="14" fill="#16a34a" />
  </svg>
);

export const FrontPageCanvas = forwardRef<HTMLDivElement, FrontPageCanvasProps>(
  ({ data, scale = 1, useImageHeader = false }, ref) => {
    const formatText = (text?: string) => {
      if (!text) return "";
      return data.autoUppercase ? text.toUpperCase() : text;
    };

    const shortSemester = data.semester
      ? data.semester.replace(/SEMESTER/i, "").replace(/SEM/i, "").trim()
      : "3RD";

    const fontClass =
      data.fontFamily === "rajdhani"
        ? "font-rajdhani"
        : data.fontFamily === "sans"
        ? "font-ui"
        : data.fontFamily === "serif"
        ? "font-serif"
        : data.fontFamily === "mono"
        ? "font-mono"
        : "font-chakra";

    const templateId = data.templateId || "modern";

    return (
      <div
        ref={ref}
        id="frontpage-print-container"
        className="relative bg-white text-slate-900 overflow-hidden shadow-2xl mx-auto select-none print:shadow-none"
        style={{
          width: "794px",
          height: "1123px",
          minWidth: "794px",
          minHeight: "1123px",
          maxWidth: "794px",
          maxHeight: "1123px",
          transformOrigin: "top left",
          pageBreakInside: "avoid",
          boxSizing: "border-box",
        }}
      >
        {/* ==================================================================== */}
        {/* TEMPLATE 1: CLASSIC CAMPUS (OFFICIAL EXACT MATCH)                   */}
        {/* ==================================================================== */}
        {templateId === "classic" && (
          <div className="w-full h-full flex flex-col justify-between bg-white">
            {/* Header */}
            {useImageHeader ? (
              <div className="w-full bg-white px-5 pt-3 pb-2 border-b border-slate-100 flex items-center justify-center">
                <img
                  src={SANAKA_HEADER_BASE64}
                  alt="Sanaka Header"
                  className="w-full h-auto object-contain max-h-[105px]"
                />
              </div>
            ) : (
              <header className="w-full bg-[#fdfdfd] pt-4 pb-3 px-6 flex items-center justify-between border-b border-slate-100">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-[84px] h-[84px] relative flex items-center justify-center">
                    <img
                      src={SANAKA_LOGO_BASE64}
                      alt="Sanaka Group of Institutions Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center flex flex-col justify-center select-text pr-2">
                  <h1 className="text-[#38335b] font-black text-[18px] leading-tight tracking-tight uppercase font-chakra">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[#38335b] font-bold text-[10.5px] leading-tight tracking-tight uppercase mt-1">
                    (FORMERLY KNOWN AS INSTITUTE OF ENGINEERING &amp; INDUSTRIAL TECHNOLOGY)
                  </p>
                  <p className="text-[#38335b] font-bold text-[11px] leading-tight tracking-wide uppercase mt-0.5">
                    A UNIT OF SANAKA EDUCATIONAL TRUST
                  </p>
                  <p className="text-[#de931f] font-black text-[10.5px] leading-tight tracking-wider uppercase mt-1">
                    (APPROVED BY A.I.C.T.E, C.O.A &amp; P.C.I AND AFFILIATED TO M.A.K.A.U.T)
                  </p>
                </div>
              </header>
            )}

            {/* Campus Architectural Banner */}
            <div className="w-full relative h-[195px] overflow-hidden bg-sky-50 border-y border-slate-200">
              <CampusIllustrationSVG />
            </div>

            {/* Student Details */}
            <main className="relative flex-1 sanaka-bg-pattern px-10 py-7 flex flex-col justify-between">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 100% 0%, rgba(222, 147, 31, 0.08) 0%, transparent 60%),
                                    radial-gradient(circle at 0% 100%, rgba(56, 51, 91, 0.06) 0%, transparent 60%)`,
                }}
              />

              <div className={`relative z-10 ${fontClass} space-y-5 text-[16.5px]`}>
                {/* 1. NAME */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    NAME:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.studentName) || "STUDENT NAME"}
                  </span>
                </div>

                {/* 2. UNIVERSITY ROLL NO. */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    UNIVERSITY ROLL NO.:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.universityRollNo) || "ROLL NUMBER"}
                  </span>
                </div>

                {/* Optional Custom Fields */}
                {data.customFields
                  ?.filter((f) => f.enabled && f.value.trim() !== "")
                  .map((field) => (
                    <div
                      key={field.id}
                      className="flex items-baseline flex-wrap leading-tight"
                    >
                      <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                        {formatText(field.label)}:
                      </span>
                      <span className="text-[#c07f2b] font-extrabold tracking-wider">
                        {formatText(field.value)}
                      </span>
                    </div>
                  ))}

                {/* 3. COURSE */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    COURSE:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.course) || "COURSE NAME"}
                  </span>
                </div>

                {/* 4. STREAM */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    STREAM:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.stream) || "DEPARTMENT / STREAM"}
                  </span>
                </div>

                {/* 5. SEMESTER */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SEMESTER:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.semester) || "SEMESTER"}
                  </span>
                </div>

                {/* 6. YEAR */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    YEAR:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.year) || "YEAR"}
                  </span>
                </div>

                {/* 7. PAPER NAME */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER NAME:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperName) || "SUBJECT / PAPER NAME"}
                  </span>
                </div>

                {/* 8. PAPER CODE */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER CODE:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperCode) || "PAPER CODE"}
                  </span>
                </div>

                {/* 9. SESSION */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SESSION:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.session) || "ACADEMIC SESSION"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>SANAKA GROUP OF INSTITUTIONS</span>
                <span>MAKAUT / AICTE COMPLIANT FORMAT</span>
              </div>
            </main>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 2: MODERN ACADEMIC (SWISS MINIMALIST GRID)                 */}
        {/* ==================================================================== */}
        {templateId === "modern" && (
          <div className="w-full h-full p-10 flex flex-col justify-between bg-white">
            {/* Top Bold Accent Header */}
            <div>
              <div className="h-3 w-full bg-slate-900 rounded-t-sm mb-8" />
              <div className="flex items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
                <div className="flex-1 pr-4">
                  <span className="inline-block px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
                    Academic Submission Dossier
                  </span>
                  <h1 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight uppercase leading-snug">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">
                    {data.affiliation || "(FORMERLY KNOWN AS INSTITUTE OF ENGINEERING & INDUSTRIAL TECHNOLOGY) • AFFILIATED TO M.A.K.A.U.T"}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-mono shrink-0 shadow-sm">
                  <span className="text-[9px] text-amber-400 uppercase font-bold">SEM</span>
                  <span className="text-base font-extrabold">{shortSemester}</span>
                </div>
              </div>

              {/* Highlighted Subject Hero Box */}
              <div className="mt-7 p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  <span>Subject &amp; Coursework</span>
                  <span className="font-bold text-indigo-600">
                    CODE: {formatText(data.paperCode) || "PAPER CODE"}
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                  {formatText(data.paperName) || "SUBJECT / PAPER NAME"}
                </div>
              </div>
            </div>

            {/* Clean Structured Data Table */}
            <div className={`my-auto py-6 ${fontClass}`}>
              <div className="border-t border-slate-200 divide-y divide-slate-200">
                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    NAME
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.studentName) || "STUDENT FULL NAME"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    UNIVERSITY ROLL NO.
                  </span>
                  <div className="col-span-7 font-semibold font-mono text-slate-900">
                    {formatText(data.universityRollNo) || "UNIVERSITY ROLL NUMBER"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    COURSE
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.course) || "COURSE / DEGREE"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    STREAM
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.stream) || "DEPARTMENT / STREAM"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    SEMESTER
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.semester) || "SEMESTER"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    YEAR
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.year) || "ACADEMIC YEAR"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    SESSION
                  </span>
                  <div className="col-span-7 font-semibold font-mono text-slate-900">
                    {formatText(data.session) || "ACADEMIC SESSION"}
                  </div>
                </div>

                {/* Custom Fields */}
                {data.customFields
                  ?.filter((f) => f.enabled && (f.label.trim() !== "" || f.value.trim() !== ""))
                  .map((field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 items-center py-3 px-3 text-[13.5px]"
                    >
                      <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                        {formatText(field.label) || "CUSTOM FIELD"}
                      </span>
                      <div className="col-span-7 font-semibold text-slate-900">
                        {formatText(field.value) || "ENTER VALUE"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer Signatures */}
            <div>
              {data.signatures !== "minimal" && (
                <div className="grid grid-cols-2 gap-12 pt-4 pb-6">
                  <div className="border-t-2 border-slate-900 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Submitted By (Student)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formatText(data.studentName) || "Student Signature"}
                    </p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Evaluated By (Faculty)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Signature &amp; Date</p>
                  </div>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span>SESSION: {formatText(data.session) || "2025-2026"}</span>
                <span>STANDARD A4 • ISO 216</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 3: MAKAUT LAB & PRACTICAL REPORT                           */}
        {/* ==================================================================== */}
        {templateId === "lab" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative">
            {/* Formal Framed Border */}
            <div className="absolute inset-4 border-2 border-[#1e1b4b] pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-[#d97706]/70 pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-10 pt-4 px-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-[78px] h-[78px]">
                  <img
                    src={SANAKA_LOGO_BASE64}
                    alt="Sanaka Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-[#1e1b4b] font-black text-[17px] leading-tight uppercase font-chakra">
                    SANAKA EDUCATIONAL TRUST&apos;S GROUP OF INSTITUTIONS
                  </h1>
                  <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">
                    Approved by A.I.C.T.E &amp; Affiliated to MAKAUT, West Bengal
                  </p>
                  <p className="text-[10px] text-[#d97706] font-extrabold uppercase">
                    DEPARTMENT OF {formatText(data.stream) || "ENGINEERING"}
                  </p>
                </div>
              </div>

              {/* Lab Record Title */}
              <div className="border-y-2 border-[#1e1b4b] py-2 mt-4 bg-slate-50">
                <h2 className="text-[#1e1b4b] font-black text-[16px] tracking-widest uppercase font-ui">
                  PRACTICAL / LABORATORY REPORT
                </h2>
              </div>
            </div>

            {/* Middle Section: Subject & Lab Details */}
            <div className="relative z-10 px-6 space-y-4">
              <div className="border border-slate-300 rounded-lg p-4 bg-white space-y-2.5">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Subject / Lab Name:
                  </span>
                  <span className="text-sm font-extrabold text-[#d97706] uppercase font-chakra">
                    {formatText(data.paperName)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Paper Code:
                  </span>
                  <span className="text-xs font-bold text-slate-800 uppercase font-mono">
                    {formatText(data.paperCode)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Academic Session:
                  </span>
                  <span className="text-xs font-bold text-slate-800 uppercase">
                    {formatText(data.session)}
                  </span>
                </div>
              </div>

              {/* Student Credential Grid */}
              <div className="border border-slate-300 rounded-lg p-4 bg-white space-y-2.5">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Student Name:
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 uppercase font-chakra">
                    {formatText(data.studentName)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    University Roll No.:
                  </span>
                  <span className="text-xs font-bold text-[#d97706] uppercase font-mono tracking-wider">
                    {formatText(data.universityRollNo)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
                  <div className="flex justify-between pr-4">
                    <span className="text-xs font-bold text-[#1e1b4b] uppercase">Course:</span>
                    <span className="text-xs font-semibold text-slate-800 uppercase">{formatText(data.course)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-[#1e1b4b] uppercase">Semester:</span>
                    <span className="text-xs font-semibold text-slate-800 uppercase">{formatText(data.semester)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Year of Study:
                  </span>
                  <span className="text-xs font-semibold text-slate-800 uppercase">
                    {formatText(data.year)}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Practical Evaluation & Signature Table */}
            <div className="relative z-10 px-6 pb-4">
              <table className="w-full border-collapse border border-[#1e1b4b] text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-[#1e1b4b]">
                    <th className="border border-[#1e1b4b] p-2 text-center font-bold">
                      Date of Performance
                    </th>
                    <th className="border border-[#1e1b4b] p-2 text-center font-bold">
                      Date of Submission
                    </th>
                    <th className="border border-[#1e1b4b] p-2 text-center font-bold">
                      Marks / Grade Awarded
                    </th>
                    <th className="border border-[#1e1b4b] p-2 text-center font-bold">
                      Teacher&apos;s Signature
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-20">
                    <td className="border border-[#1e1b4b] p-2 text-center text-slate-400">
                      ___ / ___ / 20__
                    </td>
                    <td className="border border-[#1e1b4b] p-2 text-center text-slate-400">
                      ___ / ___ / 20__
                    </td>
                    <td className="border border-[#1e1b4b] p-2 text-center font-extrabold text-[#d97706] text-sm">
                      [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
                    </td>
                    <td className="border border-[#1e1b4b] p-2 text-center text-slate-400 align-bottom pb-2">
                      Sign: ___________________
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 flex justify-between text-[10px] text-slate-500 font-semibold px-1">
                <span>SETGOI ENGINEERING &amp; TECHNOLOGY RECORD</span>
                <span>OFFICIAL EVALUATION SHEET</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 4: EXECUTIVE NAVY & GOLD PROJECT                           */}
        {/* ==================================================================== */}
        {templateId === "executive" && (
          <div className="w-full h-full flex flex-col justify-between bg-white relative">
            {/* Top Navy Header Banner */}
            <div className="w-full bg-[#1e1b4b] text-white pt-8 pb-12 px-8 text-center relative shadow-lg">
              <div className="w-full h-1.5 bg-[#d97706] absolute bottom-0 left-0" />

              <h1 className="text-white font-black text-[20px] leading-tight tracking-tight uppercase font-chakra">
                SANAKA EDUCATIONAL TRUST&apos;S GROUP OF INSTITUTIONS
              </h1>
              <p className="text-amber-200/90 font-bold text-[11px] tracking-widest uppercase mt-1">
                AFFILIATED TO MAKAUT, WB • APPROVED BY AICTE, COA &amp; PCI
              </p>
            </div>

            {/* Crest Floating on Header Boundary */}
            <div className="w-full flex justify-center -mt-10 relative z-20">
              <div className="w-24 h-24 rounded-full bg-white p-2 shadow-xl border-2 border-[#d97706]">
                <img
                  src={SANAKA_LOGO_BASE64}
                  alt="Sanaka Crest"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Project / Paper Main Title */}
            <div className="text-center px-10 my-auto space-y-4">
              <span className="text-[12px] font-extrabold tracking-widest text-[#d97706] uppercase block">
                A PROJECT / SEMINAR REPORT ON
              </span>
              <h2 className="text-[26px] font-black text-[#1e1b4b] uppercase font-chakra tracking-tight leading-tight">
                {formatText(data.paperName) || "PROJECT / PAPER NAME"}
              </h2>
              <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700 uppercase tracking-wider">
                COURSE CODE: {formatText(data.paperCode) || "PAPER CODE"}
              </div>

              <p className="text-slate-500 text-xs italic max-w-lg mx-auto pt-2">
                Submitted in partial fulfillment of the requirements for the degree of{" "}
                <span className="font-bold text-slate-700 uppercase">
                  {formatText(data.course)} in {formatText(data.stream)}
                </span>
              </p>
            </div>

            {/* Two-Column Author & Department Info */}
            <div className="px-12 py-8 bg-slate-50/70 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-8">
                {/* Submitted By */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#d97706] tracking-wider uppercase block">
                    SUBMITTED BY:
                  </span>
                  <div className="text-[17px] font-black text-[#1e1b4b] uppercase font-chakra">
                    {formatText(data.studentName)}
                  </div>
                  <div className="text-xs font-bold text-slate-700">
                    Roll No: <span className="font-mono">{formatText(data.universityRollNo)}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {formatText(data.semester)} • {formatText(data.year)}
                  </div>
                </div>

                {/* Submitted To / Department */}
                <div className="space-y-1.5 text-right">
                  <span className="text-[11px] font-bold text-[#d97706] tracking-wider uppercase block">
                    SUBMITTED TO:
                  </span>
                  <div className="text-xs font-bold text-slate-800 uppercase">
                    DEPARTMENT FACULTY &amp; HOD
                  </div>
                  <div className="text-xs text-slate-600 font-medium uppercase">
                    Department of {formatText(data.stream)}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Session: {formatText(data.session)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Gold Accent Bar */}
            <div className="w-full bg-[#1e1b4b] text-white py-3 px-8 flex justify-between items-center text-[10px] font-bold tracking-wider uppercase">
              <span>SANAKA GROUP OF INSTITUTIONS</span>
              <span className="text-amber-400">SCIENCE • SKILL • SUCCESS</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FrontPageCanvas.displayName = "FrontPageCanvas";
