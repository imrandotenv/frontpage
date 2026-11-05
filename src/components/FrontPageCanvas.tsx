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

export const FrontPageCanvas = forwardRef<HTMLDivElement, FrontPageCanvasProps>(
  ({ data, scale = 1, useImageHeader = false }, ref) => {
    const formatText = (text?: string) => {
      if (!text) return "";
      return data.autoUppercase ? text.toUpperCase() : text;
    };

    const fontClass =
      data.fontFamily === "rajdhani"
        ? "font-rajdhani"
        : data.fontFamily === "sans"
        ? "font-ui"
        : "font-chakra";

    const templateId = data.templateId || "classic";

    return (
      <div
        ref={ref}
        id="frontpage-print-container"
        className="relative bg-white text-slate-900 overflow-hidden shadow-2xl mx-auto select-none print:shadow-none"
        style={{
          width: "210mm",
          height: "297mm",
          minWidth: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          maxHeight: "297mm",
          transform: scale !== 1 ? `scale(${scale})` : undefined,
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
                    SANAKA EDUCATIONAL TRUST&apos;S GROUP OF INSTITUTIONS
                  </h1>
                  <p className="text-[#38335b] font-bold text-[10.5px] leading-tight tracking-tight uppercase mt-1">
                    (FORMELY KNOWN AS INSTITUTE OF ENGINEERING &amp; INDUSTRIAL TECHNOLOGY)
                  </p>
                  <p className="text-[#38335b] font-bold text-[11px] leading-tight tracking-wide uppercase mt-0.5">
                    A UNIT OF SANAKA EDUCATIONAL TRUST
                  </p>
                  <p className="text-[#de931f] font-black text-[10.5px] leading-tight tracking-wider uppercase mt-1">
                    (APPROVED BY A.I.C.T.E, C.O .A &amp; P.C .I AND AFF ILIATED TO M.A.K .A.U.T)
                  </p>
                </div>
              </header>
            )}

            {/* Campus Photo */}
            <div className="w-full relative h-[255px] overflow-hidden bg-slate-900 shadow-inner">
              <img
                src={SANAKA_BUILDING_BASE64}
                alt="Sanaka Campus Building"
                className="w-full h-full object-cover object-center"
              />
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
                    {formatText(data.studentName) || "ENTER YOUR NAME"}
                  </span>
                </div>

                {/* 2. UNIVERSITY ROLL NO. */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    UNIVERSITY ROLL NO.:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.universityRollNo) || "XXXXXXXXXXX"}
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
                    {formatText(data.course) || "B.TECH"}
                  </span>
                </div>

                {/* 4. STREAM */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    STREAM:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.stream) || "COMPUTER SCIENCE AND ENGINEERING (CSE)"}
                  </span>
                </div>

                {/* 5. SEMESTER */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SEMESTER:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.semester) || "3RD SEMESTER"}
                  </span>
                </div>

                {/* 6. YEAR */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    YEAR:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.year) || "2ND YEAR"}
                  </span>
                </div>

                {/* 7. PAPER NAME */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER NAME:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperName) || "DATA STRUCTURES AND ALGORITHMS (DSA)"}
                  </span>
                </div>

                {/* 8. PAPER CODE */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER CODE:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperCode) || "PCC CS 301"}
                  </span>
                </div>

                {/* 9. SESSION */}
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SESSION:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.session) || "2025-2026"}
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
        {/* TEMPLATE 2: MODERN MINIMAL ACADEMIC                                 */}
        {/* ==================================================================== */}
        {templateId === "modern" && (
          <div className="w-full h-full p-12 flex flex-col justify-between bg-white border-[10px] border-[#38335b]/10">
            {/* Top Emblem & College Info */}
            <div className="text-center flex flex-col items-center">
              <div className="w-[125px] h-[125px] mb-4">
                <img
                  src={SANAKA_LOGO_BASE64}
                  alt="Sanaka Crest"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              <h1 className="text-[#1e1b4b] font-black text-[22px] tracking-tight uppercase font-chakra leading-tight">
                SANAKA EDUCATIONAL TRUST&apos;S GROUP OF INSTITUTIONS
              </h1>
              <p className="text-slate-500 font-bold text-[11px] tracking-wider uppercase mt-1">
                (A Unit of Sanaka Educational Trust • Formerly IEIT Durgapur)
              </p>
              <p className="text-[#d97706] font-bold text-[10.5px] tracking-widest uppercase mt-0.5">
                Approved by A.I.C.T.E, C.O.A &amp; P.C.I • Affiliated to M.A.K.A.U.T, WB
              </p>

              {/* Decorative Divider */}
              <div className="w-3/4 h-[3px] bg-gradient-to-r from-transparent via-[#d97706] to-transparent my-6" />

              {/* Assignment Title Badge */}
              <div className="bg-[#1e1b4b] text-white px-8 py-2.5 rounded-full inline-block shadow-md">
                <span className="font-extrabold tracking-widest text-[13px] uppercase font-ui">
                  ACADEMIC ASSIGNMENT REPORT
                </span>
              </div>
              <p className="text-slate-400 font-bold text-[11px] tracking-wider uppercase mt-2">
                SESSION: {formatText(data.session) || "2025-2026"}
              </p>
            </div>

            {/* Subject Highlight Card */}
            <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-6 text-center shadow-xs my-4">
              <span className="text-[11px] font-bold text-[#d97706] tracking-widest uppercase block mb-1">
                SUBJECT &amp; PAPER CODE
              </span>
              <h2 className="text-[#1e1b4b] text-[20px] font-black tracking-tight uppercase font-chakra">
                {formatText(data.paperName) || "DATA STRUCTURES AND ALGORITHMS (DSA)"}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 uppercase tracking-wider">
                PAPER CODE: {formatText(data.paperCode) || "PCC CS 301"}
              </span>
            </div>

            {/* Student Metadata Card */}
            <div className="bg-white border-2 border-[#1e1b4b]/15 rounded-2xl p-6 space-y-3.5 shadow-sm">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Student Name
                  </span>
                  <span className="text-[16px] font-black text-[#1e1b4b] uppercase font-chakra">
                    {formatText(data.studentName) || "MD IMRAN AHMAD"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    University Roll No.
                  </span>
                  <span className="text-[16px] font-black text-[#d97706] uppercase font-chakra tracking-wider">
                    {formatText(data.universityRollNo) || "2XXXXXXXXXX"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Course &amp; Stream
                  </span>
                  <span className="text-[13.5px] font-bold text-slate-800 uppercase">
                    {formatText(data.course)} - {formatText(data.stream)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Semester &amp; Year
                  </span>
                  <span className="text-[13.5px] font-bold text-slate-800 uppercase">
                    {formatText(data.semester)} • {formatText(data.year)}
                  </span>
                </div>
              </div>

              {/* Custom fields if present */}
              {data.customFields
                ?.filter((f) => f.enabled && f.value.trim() !== "")
                .map((field) => (
                  <div key={field.id} className="pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">
                      {formatText(field.label)}
                    </span>
                    <span className="text-[13.5px] font-bold text-slate-800 uppercase">
                      {formatText(field.value)}
                    </span>
                  </div>
                ))}
            </div>

            {/* Footer with Signoff */}
            <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200">
              <div>
                <span className="font-bold text-slate-600 block">CAMPUS</span>
                <span>Malandighi, Durgapur, West Bengal - 713212</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-600 block">AFFILIATION</span>
                <span>Maulana Abul Kalam Azad University of Technology (MAKAUT)</span>
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
                {formatText(data.paperName) || "DATA STRUCTURES AND ALGORITHMS (DSA)"}
              </h2>
              <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700 uppercase tracking-wider">
                COURSE CODE: {formatText(data.paperCode) || "PCC CS 301"}
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
