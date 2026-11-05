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

    const templateId = data.templateId || "classic";

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
        {/* TEMPLATE 1: CLASSIC CAMPUS (OFFICIAL EXACT MATCH WITH REAL PHOTO)     */}
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

            {/* REAL CAMPUS PHOTO */}
            <div className="w-full relative h-[250px] overflow-hidden bg-slate-900 border-y border-slate-200 shadow-inner">
              <img
                src={data.customCampusImage || SANAKA_BUILDING_BASE64}
                alt="College Campus Building"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Student Details */}
            <main className="relative flex-1 sanaka-bg-pattern px-10 py-6 flex flex-col justify-between">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 100% 0%, rgba(222, 147, 31, 0.08) 0%, transparent 60%),
                                    radial-gradient(circle at 0% 100%, rgba(56, 51, 91, 0.06) 0%, transparent 60%)`,
                }}
              />

              <div className={`relative z-10 ${fontClass} space-y-4 text-[16px]`}>
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
                    {formatText(data.year) || "ACADEMIC YEAR"}
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

              {/* Signatures & Footer */}
              <div className="relative z-10 pt-2 space-y-3">
                {data.signatures !== "minimal" && (
                  <div className="grid grid-cols-2 gap-16 pt-3 pb-1">
                    <div className="border-t border-dashed border-slate-400 pt-1.5 text-center">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Student&apos;s Signature
                      </p>
                    </div>
                    <div className="border-t border-dashed border-slate-400 pt-1.5 text-center">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Faculty / Examiner&apos;s Signature
                      </p>
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>SANAKA GROUP OF INSTITUTIONS</span>
                  <span>MAKAUT / AICTE COMPLIANT FORMAT</span>
                </div>
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
              <div className="h-3 w-full bg-slate-900 rounded-t-sm mb-7" />
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
              <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
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
            <div className={`my-auto py-4 ${fontClass}`}>
              <div className="border-t border-slate-200 divide-y divide-slate-200">
                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    NAME
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.studentName) || "STUDENT FULL NAME"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    UNIVERSITY ROLL NO.
                  </span>
                  <div className="col-span-7 font-semibold font-mono text-slate-900">
                    {formatText(data.universityRollNo) || "UNIVERSITY ROLL NUMBER"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    COURSE
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.course) || "COURSE / DEGREE"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    STREAM
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.stream) || "DEPARTMENT / STREAM"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    SEMESTER
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.semester) || "SEMESTER"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    YEAR
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.year) || "ACADEMIC YEAR"}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
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
                      className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]"
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
                <div className="grid grid-cols-2 gap-12 pt-3 pb-5">
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
            <div className="absolute inset-4 border-2 border-[#1e1b4b] pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-[#d97706]/70 pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-10 pt-4 px-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-[74px] h-[74px]">
                  <img
                    src={SANAKA_LOGO_BASE64}
                    alt="Sanaka Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-[#1e1b4b] font-black text-[17px] leading-tight uppercase font-chakra">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
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
              <div className="border-y-2 border-[#1e1b4b] py-2 mt-3 bg-slate-50">
                <h2 className="text-[#1e1b4b] font-black text-[15px] tracking-widest uppercase font-ui">
                  PRACTICAL / LABORATORY REPORT
                </h2>
              </div>
            </div>

            {/* Middle Section: Subject & Lab Details */}
            <div className="relative z-10 px-6 space-y-3.5">
              <div className="border border-slate-300 rounded-lg p-3.5 bg-white space-y-2">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1.5">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Subject / Lab Name:
                  </span>
                  <span className="text-sm font-extrabold text-[#d97706] uppercase font-chakra">
                    {formatText(data.paperName)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1.5">
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
              <div className="border border-slate-300 rounded-lg p-3.5 bg-white space-y-2">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1.5">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    Student Name:
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 uppercase font-chakra">
                    {formatText(data.studentName)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1.5">
                  <span className="text-xs font-bold text-[#1e1b4b] uppercase">
                    University Roll No.:
                  </span>
                  <span className="text-xs font-bold text-[#d97706] uppercase font-mono tracking-wider">
                    {formatText(data.universityRollNo)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-1.5">
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
                  <tr className="h-16">
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

              <div className="mt-2.5 flex justify-between text-[10px] text-slate-500 font-semibold px-1">
                <span>SETGOI ENGINEERING &amp; TECHNOLOGY RECORD</span>
                <span>OFFICIAL EVALUATION SHEET</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 4: MINIMAL ACADEMIC SEAL (REFINED FORMAL LETTERHEAD)        */}
        {/* ==================================================================== */}
        {templateId === "minimal" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative">
            <div className="w-full h-full border-2 border-slate-900 p-2">
              <div className="w-full h-full border border-slate-300 p-8 flex flex-col justify-between">
                {/* Centered Crest & Academic Header */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-20 h-20 mb-3">
                    <img
                      src={SANAKA_LOGO_BASE64}
                      alt="University Crest"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <h1 className="font-serif font-bold text-xl text-slate-900 tracking-wide uppercase leading-tight">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[10px] font-semibold text-slate-600 tracking-widest uppercase mt-1">
                    {data.affiliation || "AFFILIATED TO MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY"}
                  </p>

                  <div className="w-48 h-[1.5px] bg-slate-900 my-4" />

                  <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Academic Assignment Report
                  </span>
                </div>

                {/* Subject Block */}
                <div className="my-auto py-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      PAPER CODE: {formatText(data.paperCode) || "PAPER CODE"}
                    </span>
                    <h2 className="font-serif font-bold text-xl text-slate-900 uppercase">
                      {formatText(data.paperName) || "SUBJECT / PAPER NAME"}
                    </h2>
                  </div>

                  {/* 2-Column Key Value Grid */}
                  <div className={`space-y-3 ${fontClass}`}>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]">
                      <span className="font-bold text-slate-700 uppercase">Student Name:</span>
                      <span className="font-semibold text-slate-900 uppercase">{formatText(data.studentName)}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]">
                      <span className="font-bold text-slate-700 uppercase">University Roll No:</span>
                      <span className="font-mono font-bold text-slate-900">{formatText(data.universityRollNo)}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]">
                      <span className="font-bold text-slate-700 uppercase">Course &amp; Stream:</span>
                      <span className="font-semibold text-slate-900 uppercase">
                        {formatText(data.course)} - {formatText(data.stream)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]">
                      <span className="font-bold text-slate-700 uppercase">Semester &amp; Year:</span>
                      <span className="font-semibold text-slate-900 uppercase">
                        {formatText(data.semester)} • {formatText(data.year)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]">
                      <span className="font-bold text-slate-700 uppercase">Academic Session:</span>
                      <span className="font-mono font-semibold text-slate-900">{formatText(data.session)}</span>
                    </div>

                    {/* Custom fields */}
                    {data.customFields
                      ?.filter((f) => f.enabled && f.value.trim() !== "")
                      .map((field) => (
                        <div
                          key={field.id}
                          className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1.5 text-[14px]"
                        >
                          <span className="font-bold text-slate-700 uppercase">{formatText(field.label)}:</span>
                          <span className="font-semibold text-slate-900 uppercase">{formatText(field.value)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Signatures & Formal Footer */}
                <div>
                  <div className="grid grid-cols-2 gap-16 pt-4 pb-2">
                    <div className="border-t border-slate-900 pt-1.5 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Submitted by (Student)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{formatText(data.studentName)}</p>
                    </div>
                    <div className="border-t border-slate-900 pt-1.5 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Evaluated by (Examiner)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Signature &amp; Date</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] font-mono text-slate-400 uppercase">
                    <span>STANDARD A4 FORMAT</span>
                    <span>MAKAUT / AICTE COMPLIANT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 5: TECHNICAL BLUEPRINT (ENGINEERING & TECH SPEC)           */}
        {/* ==================================================================== */}
        {templateId === "technical" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative font-mono">
            {/* Technical Border Frame with Corner Crosshairs */}
            <div className="w-full h-full border-2 border-slate-800 p-6 flex flex-col justify-between relative">
              {/* Corner crosshairs */}
              <span className="absolute -top-2 -left-2 text-base font-bold text-slate-800">+</span>
              <span className="absolute -top-2 -right-2 text-base font-bold text-slate-800">+</span>
              <span className="absolute -bottom-2 -left-2 text-base font-bold text-slate-800">+</span>
              <span className="absolute -bottom-2 -right-2 text-base font-bold text-slate-800">+</span>

              {/* Technical Header Block */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0">
                      <img src={SANAKA_LOGO_BASE64} alt="Crest" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-xs font-bold tracking-tight uppercase text-slate-900">
                        {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                      </h1>
                      <p className="text-[10px] text-slate-500 uppercase">
                        FACULTY OF ENGINEERING &amp; TECHNOLOGY
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold">
                      STATUS: SUBMITTED
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">ISO 216 / A4 SPEC</p>
                  </div>
                </div>

                {/* Coursework Hero */}
                <div className="mt-5 border-2 border-slate-800 p-4 bg-slate-50">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase mb-1">
                    <span>COURSEWORK SPECIFICATION</span>
                    <span className="font-bold text-indigo-700">CODE: {formatText(data.paperCode) || "PAPER CODE"}</span>
                  </div>
                  <div className="text-lg font-black text-slate-900 uppercase">
                    {formatText(data.paperName) || "SUBJECT / PAPER NAME"}
                  </div>
                </div>
              </div>

              {/* Technical Key-Value Table */}
              <div className="my-auto py-4">
                <table className="w-full text-xs border border-slate-800">
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 w-1/3 uppercase">
                        CANDIDATE NAME
                      </td>
                      <td className="p-2.5 font-semibold text-slate-900 uppercase">
                        {formatText(data.studentName) || "STUDENT NAME"}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 uppercase">
                        UNIVERSITY ROLL NO.
                      </td>
                      <td className="p-2.5 font-bold text-indigo-700">
                        {formatText(data.universityRollNo) || "ROLL NUMBER"}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 uppercase">
                        COURSE &amp; STREAM
                      </td>
                      <td className="p-2.5 uppercase">
                        {formatText(data.course)} - {formatText(data.stream)}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 uppercase">
                        SEMESTER / YEAR
                      </td>
                      <td className="p-2.5 uppercase">
                        {formatText(data.semester)} • {formatText(data.year)}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 uppercase">
                        ACADEMIC SESSION
                      </td>
                      <td className="p-2.5">{formatText(data.session) || "2025-2026"}</td>
                    </tr>

                    {data.customFields
                      ?.filter((f) => f.enabled && f.value.trim() !== "")
                      .map((field) => (
                        <tr key={field.id} className="border-b border-slate-800">
                          <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-800 uppercase">
                            {formatText(field.label)}
                          </td>
                          <td className="p-2.5 uppercase">{formatText(field.value)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Faculty Evaluation Rubric Matrix */}
              <div>
                <div className="border-2 border-slate-800 p-3 bg-slate-50 text-[11px] mb-3">
                  <div className="font-bold border-b border-slate-800 pb-1 mb-2 uppercase text-slate-800">
                    FACULTY ASSESSMENT &amp; VERIFICATION
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="border border-slate-400 p-1">
                      <span className="block font-semibold">METHOD (10)</span>
                      <span className="font-bold text-slate-700">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
                    </div>
                    <div className="border border-slate-400 p-1">
                      <span className="block font-semibold">RESULTS (10)</span>
                      <span className="font-bold text-slate-700">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
                    </div>
                    <div className="border border-slate-400 p-1">
                      <span className="block font-semibold">VIVA (10)</span>
                      <span className="font-bold text-slate-700">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-100 p-1">
                      <span className="block font-bold">TOTAL (30)</span>
                      <span className="font-bold text-indigo-700">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-2">
                  <div className="border-t border-slate-800 pt-1 text-center text-[10px]">
                    CANDIDATE SIGNATURE
                  </div>
                  <div className="border-t border-slate-800 pt-1 text-center text-[10px]">
                    EVALUATOR SIGNATURE &amp; STAMP
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 6: EXECUTIVE NAVY & GOLD PROJECT                           */}
        {/* ==================================================================== */}
        {templateId === "executive" && (
          <div className="w-full h-full flex flex-col justify-between bg-white relative">
            {/* Top Navy Header Banner */}
            <div className="w-full bg-[#1e1b4b] text-white pt-8 pb-12 px-8 text-center relative shadow-lg">
              <div className="w-full h-1.5 bg-[#d97706] absolute bottom-0 left-0" />

              <h1 className="text-white font-black text-[20px] leading-tight tracking-tight uppercase font-chakra">
                {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
              </h1>
              <p className="text-amber-200/90 font-bold text-[11px] tracking-widest uppercase mt-1">
                {data.affiliation || "AFFILIATED TO MAKAUT, WB • APPROVED BY AICTE, COA & PCI"}
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
