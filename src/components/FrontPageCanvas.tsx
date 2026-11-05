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
        {/* TEMPLATE 1: CLASSIC CAMPUS                                           */}
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
                      alt="Logo"
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

            {/* Campus Photo */}
            <div className="w-full relative h-[250px] overflow-hidden bg-slate-900 border-y border-slate-200">
              <img
                src={data.customCampusImage || SANAKA_BUILDING_BASE64}
                alt="Campus"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Student Details */}
            <main className="relative flex-1 sanaka-bg-pattern px-10 py-6 flex flex-col justify-between">
              <div className={`relative z-10 ${fontClass} space-y-4 text-[16px]`}>
                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    NAME:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.studentName)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    UNIVERSITY ROLL NO.:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.universityRollNo)}
                  </span>
                </div>

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

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    COURSE:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.course)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    STREAM:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.stream)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SEMESTER:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.semester)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    YEAR:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.year)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER NAME:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperName)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    PAPER CODE:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.paperCode)}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap leading-tight">
                  <span className="text-[#38335b] font-bold tracking-wide mr-2.5">
                    SESSION:
                  </span>
                  <span className="text-[#c07f2b] font-extrabold tracking-wider">
                    {formatText(data.session)}
                  </span>
                </div>
              </div>

              {/* Signatures & Footer */}
              <div className="relative z-10 pt-2 space-y-2">
                {data.signatures !== "minimal" && (
                  <div className="grid grid-cols-2 gap-16 pt-3 pb-1">
                    <div className="border-t border-dashed border-slate-400 pt-1.5 text-center">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                        Student&apos;s Signature
                      </p>
                    </div>
                    <div className="border-t border-dashed border-slate-400 pt-1.5 text-center">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                        Teacher&apos;s Signature
                      </p>
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{data.collegeName || "SANAKA GROUP OF INSTITUTIONS"}</span>
                  <span>{formatText(data.session)}</span>
                </div>
              </div>
            </main>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 2: MODERN ACADEMIC                                          */}
        {/* ==================================================================== */}
        {templateId === "modern" && (
          <div className="w-full h-full p-10 flex flex-col justify-between bg-white">
            {/* Header */}
            <div>
              <div className="h-2.5 w-full bg-slate-900 rounded-t-sm mb-7" />
              <div className="flex items-start justify-between gap-6 pb-5 border-b-2 border-slate-900">
                <div className="flex-1 pr-4">
                  <h1 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight uppercase leading-snug">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">
                    {data.affiliation || "(FORMERLY KNOWN AS INSTITUTE OF ENGINEERING & INDUSTRIAL TECHNOLOGY) • AFFILIATED TO M.A.K.A.U.T"}
                  </p>
                </div>
                <div className="w-13 h-13 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center font-mono shrink-0">
                  <span className="text-[9px] text-amber-400 uppercase font-bold">SEM</span>
                  <span className="text-base font-extrabold">{shortSemester}</span>
                </div>
              </div>

              {/* Subject Box */}
              <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  <span>Subject</span>
                  {data.paperCode && (
                    <span className="font-bold text-slate-800">
                      CODE: {formatText(data.paperCode)}
                    </span>
                  )}
                </div>
                <div className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                  {formatText(data.paperName)}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className={`my-auto py-4 ${fontClass}`}>
              <div className="border-t border-slate-200 divide-y divide-slate-200">
                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    NAME
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.studentName)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    UNIVERSITY ROLL NO.
                  </span>
                  <div className="col-span-7 font-semibold font-mono text-slate-900">
                    {formatText(data.universityRollNo)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    COURSE
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.course)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    STREAM
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.stream)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    SEMESTER
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.semester)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    YEAR
                  </span>
                  <div className="col-span-7 font-semibold text-slate-900">
                    {formatText(data.year)}
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]">
                  <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                    SESSION
                  </span>
                  <div className="col-span-7 font-semibold font-mono text-slate-900">
                    {formatText(data.session)}
                  </div>
                </div>

                {data.customFields
                  ?.filter((f) => f.enabled && (f.label.trim() !== "" || f.value.trim() !== ""))
                  .map((field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 items-center py-2.5 px-3 text-[13.5px]"
                    >
                      <span className="col-span-5 font-bold uppercase tracking-wider text-slate-500 text-xs">
                        {formatText(field.label)}
                      </span>
                      <div className="col-span-7 font-semibold text-slate-900">
                        {formatText(field.value)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Signatures & Footer */}
            <div>
              {data.signatures !== "minimal" && (
                <div className="grid grid-cols-2 gap-12 pt-3 pb-4">
                  <div className="border-t-2 border-slate-900 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Submitted By
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formatText(data.studentName)}
                    </p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Evaluated By
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Faculty Signature</p>
                  </div>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span>SESSION: {formatText(data.session)}</span>
                <span>{formatText(data.course)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 3: LAB & PRACTICAL REPORT                                   */}
        {/* ==================================================================== */}
        {templateId === "lab" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative">
            <div className="absolute inset-4 border-2 border-slate-900 pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-slate-400 pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-10 pt-4 px-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-16 h-16">
                  <img
                    src={SANAKA_LOGO_BASE64}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-slate-900 font-black text-[16px] leading-tight uppercase font-chakra">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">
                    {data.affiliation || "AFFILIATED TO MAKAUT, WEST BENGAL"}
                  </p>
                  <p className="text-[10px] text-amber-700 font-extrabold uppercase">
                    DEPARTMENT OF {formatText(data.stream) || "ENGINEERING"}
                  </p>
                </div>
              </div>

              <div className="border-y-2 border-slate-900 py-1.5 mt-3 bg-slate-50">
                <h2 className="text-slate-900 font-black text-[14px] tracking-widest uppercase font-ui">
                  LABORATORY REPORT
                </h2>
              </div>
            </div>

            {/* Middle Section */}
            <div className="relative z-10 px-6 space-y-3">
              <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-2 text-xs">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
                  <span className="font-bold text-slate-800 uppercase">Subject:</span>
                  <span className="font-bold text-slate-900 uppercase font-chakra">{formatText(data.paperName)}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
                  <span className="font-bold text-slate-800 uppercase">Paper Code:</span>
                  <span className="font-mono text-slate-900">{formatText(data.paperCode)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-800 uppercase">Session:</span>
                  <span className="text-slate-900">{formatText(data.session)}</span>
                </div>
              </div>

              <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-2 text-xs">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
                  <span className="font-bold text-slate-800 uppercase">Student Name:</span>
                  <span className="font-bold text-slate-900 uppercase">{formatText(data.studentName)}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
                  <span className="font-bold text-slate-800 uppercase">Roll No.:</span>
                  <span className="font-mono font-bold text-slate-900">{formatText(data.universityRollNo)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-1">
                  <div className="flex justify-between pr-2">
                    <span className="font-bold text-slate-800 uppercase">Course:</span>
                    <span>{formatText(data.course)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800 uppercase">Semester:</span>
                    <span>{formatText(data.semester)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-800 uppercase">Year:</span>
                  <span>{formatText(data.year)}</span>
                </div>
              </div>
            </div>

            {/* Evaluation Table */}
            <div className="relative z-10 px-6 pb-4">
              <table className="w-full border-collapse border border-slate-900 text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-900 p-2 text-center font-bold">Performance Date</th>
                    <th className="border border-slate-900 p-2 text-center font-bold">Submission Date</th>
                    <th className="border border-slate-900 p-2 text-center font-bold">Marks Awarded</th>
                    <th className="border border-slate-900 p-2 text-center font-bold">Faculty Signature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-14">
                    <td className="border border-slate-900 p-2 text-center text-slate-400">___ / ___ / 20__</td>
                    <td className="border border-slate-900 p-2 text-center text-slate-400">___ / ___ / 20__</td>
                    <td className="border border-slate-900 p-2 text-center font-bold text-slate-800">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]</td>
                    <td className="border border-slate-900 p-2 text-center text-slate-400 align-bottom pb-1">Sign: _________</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 4: FORMAL SEAL                                              */}
        {/* ==================================================================== */}
        {templateId === "minimal" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative">
            <div className="w-full h-full border-2 border-slate-900 p-2">
              <div className="w-full h-full border border-slate-300 p-8 flex flex-col justify-between">
                <div className="text-center flex flex-col items-center">
                  <div className="w-18 h-18 mb-3">
                    <img
                      src={SANAKA_LOGO_BASE64}
                      alt="Crest"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="font-serif font-bold text-xl text-slate-900 tracking-wide uppercase leading-tight">
                    {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                  </h1>
                  <p className="text-[10px] font-semibold text-slate-600 tracking-wider uppercase mt-1">
                    {data.affiliation || "AFFILIATED TO MAKAUT"}
                  </p>
                  <div className="w-40 h-[1px] bg-slate-400 my-4" />
                </div>

                <div className="my-auto py-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center mb-5">
                    {data.paperCode && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">
                        CODE: {formatText(data.paperCode)}
                      </span>
                    )}
                    <h2 className="font-serif font-bold text-lg text-slate-900 uppercase">
                      {formatText(data.paperName)}
                    </h2>
                  </div>

                  <div className={`space-y-2.5 ${fontClass}`}>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]">
                      <span className="font-bold text-slate-700 uppercase">Student Name:</span>
                      <span className="font-semibold text-slate-900 uppercase">{formatText(data.studentName)}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]">
                      <span className="font-bold text-slate-700 uppercase">Roll No:</span>
                      <span className="font-mono font-bold text-slate-900">{formatText(data.universityRollNo)}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]">
                      <span className="font-bold text-slate-700 uppercase">Course &amp; Stream:</span>
                      <span className="font-semibold text-slate-900 uppercase">
                        {formatText(data.course)} - {formatText(data.stream)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]">
                      <span className="font-bold text-slate-700 uppercase">Semester &amp; Year:</span>
                      <span className="font-semibold text-slate-900 uppercase">
                        {formatText(data.semester)} • {formatText(data.year)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]">
                      <span className="font-bold text-slate-700 uppercase">Session:</span>
                      <span className="font-mono font-semibold text-slate-900">{formatText(data.session)}</span>
                    </div>
                    {data.customFields
                      ?.filter((f) => f.enabled && f.value.trim() !== "")
                      .map((field) => (
                        <div
                          key={field.id}
                          className="flex justify-between items-baseline border-b border-dashed border-slate-300 pb-1 text-[13.5px]"
                        >
                          <span className="font-bold text-slate-700 uppercase">{formatText(field.label)}:</span>
                          <span className="font-semibold text-slate-900 uppercase">{formatText(field.value)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-16 pt-3 pb-2">
                    <div className="border-t border-slate-900 pt-1 text-center">
                      <p className="text-xs font-semibold uppercase text-slate-800">Student Signature</p>
                    </div>
                    <div className="border-t border-slate-900 pt-1 text-center">
                      <p className="text-xs font-semibold uppercase text-slate-800">Faculty Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 5: TECHNICAL GRID                                           */}
        {/* ==================================================================== */}
        {templateId === "technical" && (
          <div className="w-full h-full p-8 flex flex-col justify-between bg-white relative font-mono">
            <div className="w-full h-full border-2 border-slate-800 p-5 flex flex-col justify-between relative">
              <span className="absolute -top-2 -left-2 text-sm font-bold text-slate-800">+</span>
              <span className="absolute -top-2 -right-2 text-sm font-bold text-slate-800">+</span>
              <span className="absolute -bottom-2 -left-2 text-sm font-bold text-slate-800">+</span>
              <span className="absolute -bottom-2 -right-2 text-sm font-bold text-slate-800">+</span>

              <div>
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0">
                      <img src={SANAKA_LOGO_BASE64} alt="Crest" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-xs font-bold uppercase text-slate-900">
                        {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
                      </h1>
                      <p className="text-[10px] text-slate-500 uppercase">
                        DEPARTMENT OF {formatText(data.stream) || "ENGINEERING"}
                      </p>
                    </div>
                  </div>
                  {data.paperCode && (
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold">
                      {formatText(data.paperCode)}
                    </span>
                  )}
                </div>

                <div className="mt-4 border-2 border-slate-800 p-3 bg-slate-50">
                  <span className="text-[10px] text-slate-500 uppercase block mb-0.5">SUBJECT</span>
                  <div className="text-base font-black text-slate-900 uppercase">
                    {formatText(data.paperName)}
                  </div>
                </div>
              </div>

              <div className="my-auto py-2">
                <table className="w-full text-xs border border-slate-800">
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 w-1/3 uppercase">NAME</td>
                      <td className="p-2 uppercase">{formatText(data.studentName)}</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 uppercase">ROLL NO.</td>
                      <td className="p-2 font-bold">{formatText(data.universityRollNo)}</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 uppercase">COURSE &amp; STREAM</td>
                      <td className="p-2 uppercase">{formatText(data.course)} - {formatText(data.stream)}</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 uppercase">SEMESTER</td>
                      <td className="p-2 uppercase">{formatText(data.semester)} • {formatText(data.year)}</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 uppercase">SESSION</td>
                      <td className="p-2">{formatText(data.session)}</td>
                    </tr>
                    {data.customFields
                      ?.filter((f) => f.enabled && f.value.trim() !== "")
                      .map((field) => (
                        <tr key={field.id} className="border-b border-slate-800">
                          <td className="p-2 font-bold bg-slate-100 border-r border-slate-800 uppercase">{formatText(field.label)}</td>
                          <td className="p-2 uppercase">{formatText(field.value)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-8 pt-2">
                  <div className="border-t border-slate-800 pt-1 text-center text-[10px]">
                    STUDENT SIGNATURE
                  </div>
                  <div className="border-t border-slate-800 pt-1 text-center text-[10px]">
                    FACULTY SIGNATURE
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TEMPLATE 6: PROJECT REPORT                                           */}
        {/* ==================================================================== */}
        {templateId === "executive" && (
          <div className="w-full h-full flex flex-col justify-between bg-white relative">
            <div className="w-full bg-[#1e1b4b] text-white pt-8 pb-10 px-8 text-center relative shadow-sm">
              <div className="w-full h-1 bg-[#d97706] absolute bottom-0 left-0" />
              <h1 className="text-white font-black text-[18px] leading-tight tracking-tight uppercase font-chakra">
                {data.collegeName || "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"}
              </h1>
              <p className="text-slate-300 font-semibold text-[10.5px] uppercase mt-1">
                {data.affiliation || "AFFILIATED TO MAKAUT, WEST BENGAL"}
              </p>
            </div>

            <div className="w-full flex justify-center -mt-9 relative z-20">
              <div className="w-20 h-20 rounded-full bg-white p-2 shadow-md border border-slate-200">
                <img
                  src={SANAKA_LOGO_BASE64}
                  alt="Crest"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="text-center px-10 my-auto space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                PROJECT REPORT
              </span>
              <h2 className="text-[22px] font-black text-slate-900 uppercase font-chakra tracking-tight leading-tight">
                {formatText(data.paperName)}
              </h2>
              {data.paperCode && (
                <span className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-mono font-bold text-slate-700 uppercase">
                  {formatText(data.paperCode)}
                </span>
              )}
            </div>

            <div className="px-10 py-6 bg-slate-50 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase block">
                    SUBMITTED BY:
                  </span>
                  <div className="text-[16px] font-black text-slate-900 uppercase font-chakra">
                    {formatText(data.studentName)}
                  </div>
                  <div className="text-xs text-slate-700 font-mono">
                    {formatText(data.universityRollNo)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatText(data.semester)} • {formatText(data.year)}
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase block">
                    DEPARTMENT:
                  </span>
                  <div className="text-xs font-bold text-slate-800 uppercase">
                    Department of {formatText(data.stream)}
                  </div>
                  <div className="text-xs text-slate-500">
                    Session: {formatText(data.session)}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-900 text-white py-2.5 px-8 flex justify-between items-center text-[10px] uppercase">
              <span>{data.collegeName || "SANAKA GROUP OF INSTITUTIONS"}</span>
              <span>{formatText(data.course)}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FrontPageCanvas.displayName = "FrontPageCanvas";
