"use client";

import React, { useState } from "react";
import {
  StudentFormData,
  DepartmentPreset,
  PRESETS,
  TemplateId,
} from "@/types";
import { TemplateSelector } from "./TemplateSelector";
import {
  User,
  GraduationCap,
  BookOpen,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Save,
  CheckCircle2,
  Sliders,
  Wand2,
  Building2,
  ChevronDown,
} from "lucide-react";

interface StudentFormProps {
  data: StudentFormData;
  onChange: (newData: StudentFormData) => void;
  onSaveToLocalStorage: () => void;
  onReset: () => void;
  onMagicFill: () => void;
  isSaved: boolean;
}

const COURSES = ["B.TECH", "DIPLOMA", "B.PHARM", "B.ARCH", "MCA"];
const STREAMS = [
  { short: "CSE", full: "COMPUTER SCIENCE & ENGINEERING (CSE)" },
  { short: "AIML", full: "CSE (AI & MACHINE LEARNING)" },
  { short: "ECE", full: "ELECTRONICS & COMM. ENG. (ECE)" },
  { short: "ME", full: "MECHANICAL ENGINEERING" },
  { short: "CIVIL", full: "CIVIL ENGINEERING" },
];

const SEMESTERS = [
  { label: "1st", sem: "1ST SEMESTER", year: "1ST YEAR" },
  { label: "2nd", sem: "2ND SEMESTER", year: "1ST YEAR" },
  { label: "3rd", sem: "3RD SEMESTER", year: "2ND YEAR" },
  { label: "4th", sem: "4TH SEMESTER", year: "2ND YEAR" },
  { label: "5th", sem: "5TH SEMESTER", year: "3RD YEAR" },
  { label: "6th", sem: "6TH SEMESTER", year: "3RD YEAR" },
  { label: "7th", sem: "7TH SEMESTER", year: "4TH YEAR" },
  { label: "8th", sem: "8TH SEMESTER", year: "4TH YEAR" },
];

const SUBJECT_PRESETS = [
  { name: "DSA", code: "PCC-CS301", title: "DATA STRUCTURES & ALGORITHMS", sem: "3RD SEMESTER", year: "2ND YEAR" },
  { name: "OS", code: "PCC-CS402", title: "OPERATING SYSTEMS", sem: "4TH SEMESTER", year: "2ND YEAR" },
  { name: "DBMS", code: "PCC-CS501", title: "DATABASE MANAGEMENT SYSTEMS", sem: "5TH SEMESTER", year: "3RD YEAR" },
  { name: "Networks", code: "PCC-CS601", title: "COMPUTER NETWORKS", sem: "6TH SEMESTER", year: "3RD YEAR" },
  { name: "EE", code: "ES-EE101", title: "BASIC ELECTRICAL ENGINEERING", sem: "1ST SEMESTER", year: "1ST YEAR" },
];

export const StudentForm: React.FC<StudentFormProps> = ({
  data,
  onChange,
  onSaveToLocalStorage,
  onReset,
  onMagicFill,
  isSaved,
}) => {
  const [showInstitutionOverride, setShowInstitutionOverride] = useState(false);

  const handleFieldChange = (field: keyof StudentFormData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSemesterSelect = (sem: string, year: string) => {
    onChange({
      ...data,
      semester: sem,
      year: year,
    });
  };

  const applySubjectQuickPreset = (preset: typeof SUBJECT_PRESETS[0]) => {
    onChange({
      ...data,
      paperName: preset.title,
      paperCode: preset.code,
      semester: preset.sem,
      year: preset.year,
    });
  };

  const quickAddCustomField = (label: string, defaultValue: string = "") => {
    const existingIndex = data.customFields.findIndex(
      (f) => f.label.toUpperCase() === label.toUpperCase()
    );

    if (existingIndex >= 0) {
      const updated = [...data.customFields];
      updated[existingIndex] = {
        ...updated[existingIndex],
        enabled: true,
        value: updated[existingIndex].value || defaultValue,
      };
      handleFieldChange("customFields", updated);
    } else {
      const newField = {
        id: `cf-${Date.now()}`,
        label: label.toUpperCase(),
        value: defaultValue,
        enabled: true,
      };
      handleFieldChange("customFields", [...data.customFields, newField]);
    }
  };

  const updateCustomField = (id: string, field: "label" | "value", val: string) => {
    const updated = data.customFields.map((f) =>
      f.id === id ? { ...f, [field]: val } : f
    );
    handleFieldChange("customFields", updated);
  };

  const removeCustomField = (id: string) => {
    const updated = data.customFields.filter((f) => f.id !== id);
    handleFieldChange("customFields", updated);
  };

  // Find active semester index if any
  const currentSemPill = SEMESTERS.find(
    (s) =>
      s.sem.toLowerCase() === (data.semester || "").toLowerCase() ||
      s.label.toLowerCase() === (data.semester || "").toLowerCase()
  );

  return (
    <div className="space-y-5">
      {/* ------------------------------------------------------------- */}
      {/* 1. CHOOSE DESIGN / TEMPLATE SELECTOR                          */}
      {/* ------------------------------------------------------------- */}
      <TemplateSelector
        selectedId={data.templateId || "classic"}
        onSelect={(id: TemplateId) => handleFieldChange("templateId", id)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION 1: STUDENT & ACADEMIC PROFILE                      */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
              1
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Student &amp; Academic Profile
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSaveToLocalStorage}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                isSaved
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
              title="Save Name & Roll No on device"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3 h-3" />
                  <span>Remember</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Name & University Roll No */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.studentName}
                onChange={(e) => handleFieldChange("studentName", e.target.value)}
                placeholder="e.g. AARAV SHARMA"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                University Roll No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.universityRollNo}
                onChange={(e) => handleFieldChange("universityRollNo", e.target.value)}
                placeholder="e.g. 24500124018"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-mono font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition uppercase"
              />
            </div>
          </div>

          {/* Course Quick Chips & Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Course / Degree <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1">
                {COURSES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleFieldChange("course", c)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      data.course === c
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={data.course}
              onChange={(e) => handleFieldChange("course", e.target.value)}
              placeholder="e.g. B.TECH"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition uppercase"
            />
          </div>

          {/* Stream Quick Chips & Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Stream / Branch <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1">
                {STREAMS.map((s) => (
                  <button
                    key={s.short}
                    type="button"
                    onClick={() => handleFieldChange("stream", s.full)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      data.stream === s.full
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {s.short}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={data.stream}
              onChange={(e) => handleFieldChange("stream", e.target.value)}
              placeholder="e.g. COMPUTER SCIENCE & ENGINEERING (CSE)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition uppercase"
            />
          </div>

          {/* Semester (Auto-syncs Year) */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Semester <span className="text-slate-400 font-normal lowercase">(auto-syncs year)</span>
              </label>
              {data.year && (
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Year: {data.year}
                </span>
              )}
            </div>

            {/* 8-pill segmented selector */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
              {SEMESTERS.map(({ label, sem, year }) => {
                const isSelected =
                  currentSemPill?.sem === sem ||
                  data.semester === sem ||
                  data.semester === label;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => handleSemesterSelect(sem, year)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 text-center ${
                      isSelected
                        ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Compact manual override inputs */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Semester
                </label>
                <input
                  type="text"
                  value={data.semester}
                  onChange={(e) => handleFieldChange("semester", e.target.value)}
                  placeholder="3RD"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={data.year}
                  onChange={(e) => handleFieldChange("year", e.target.value)}
                  placeholder="2ND YEAR"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Session
                </label>
                <input
                  type="text"
                  value={data.session}
                  onChange={(e) => handleFieldChange("session", e.target.value)}
                  placeholder="2025-2026"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION 2: SUBJECT & PAPER INFO (1-TAP QUICK FILL)         */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
              2
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Subject &amp; Paper Info
            </h2>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            1-Tap Presets
          </span>
        </div>

        <div className="p-4 space-y-3.5">
          {/* Quick Subject Presets */}
          <div>
            <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
              Click a subject preset to populate Paper Name, Code &amp; Semester:
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUBJECT_PRESETS.map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => applySubjectQuickPreset(p)}
                  className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/80 text-slate-700 transition"
                >
                  {p.name} <span className="text-slate-400 font-mono text-[10px]">{p.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paper Name & Paper Code Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Paper / Subject Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.paperName}
                onChange={(e) => handleFieldChange("paperName", e.target.value)}
                placeholder="e.g. DATA STRUCTURES & ALGORITHMS"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Paper Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.paperCode}
                onChange={(e) => handleFieldChange("paperCode", e.target.value)}
                placeholder="e.g. PCC-CS301"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-mono font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition uppercase"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECTION 3: CUSTOM FIELDS & STYLING                         */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Custom Fields &amp; Styling
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {data.customFields.filter((f) => f.enabled && (f.label || f.value)).length} active rows
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* Quick-Add Optional Rows */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Quick-Add Optional Rows
              </span>
              <button
                type="button"
                onClick={() => quickAddCustomField("CUSTOM FIELD", "")}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Blank Row</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => quickAddCustomField("REGISTRATION NO.", "")}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/70 transition"
              >
                + Registration No.
              </button>
              <button
                type="button"
                onClick={() => quickAddCustomField("SUBMITTED TO", "")}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/70 transition"
              >
                + Submitted To
              </button>
              <button
                type="button"
                onClick={() => quickAddCustomField("ASSIGNMENT TOPIC", "")}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/70 transition"
              >
                + Assignment Topic
              </button>
              <button
                type="button"
                onClick={() => quickAddCustomField("SUBMISSION DATE", "")}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/70 transition"
              >
                + Submission Date
              </button>
            </div>
          </div>

          {/* Dynamic Compact Custom Fields List */}
          {data.customFields.filter((f) => f.enabled).length > 0 && (
            <div className="space-y-2 pt-1">
              {data.customFields
                .filter((f) => f.enabled)
                .map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                      placeholder="FIELD LABEL"
                      className="w-1/3 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 uppercase"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                      placeholder="ENTER VALUE"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-900 uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomField(field.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove field"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Typography & Rules */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Typography &amp; Layout
              </span>

              {/* Auto-uppercase toggle */}
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={data.autoUppercase}
                  onChange={(e) => handleFieldChange("autoUppercase", e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span className="text-xs font-medium text-slate-700">Auto-Uppercase Values</span>
              </label>
            </div>

            {/* Font Switcher & Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Sheet Font Style
                </label>
                <select
                  value={data.fontFamily}
                  onChange={(e) => handleFieldChange("fontFamily", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="chakra">Chakra Petch (Modern Athletic)</option>
                  <option value="mono">JetBrains Mono (Technical)</option>
                  <option value="sans">Inter Modern (Clean Sans)</option>
                  <option value="serif">Libre Baskerville (Academic Serif)</option>
                  <option value="rajdhani">Rajdhani (Tech Bold)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Footer Signatures
                </label>
                <select
                  value={data.signatures || "show"}
                  onChange={(e) => handleFieldChange("signatures", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="show">Student + Faculty Sign</option>
                  <option value="minimal">Compliance Footer Only</option>
                </select>
              </div>
            </div>

            {/* Optional Collapsible Institution Override */}
            <details
              open={showInstitutionOverride}
              onToggle={(e) => setShowInstitutionOverride(e.currentTarget.open)}
              className="group rounded-xl border border-slate-200/80 bg-slate-50/50 px-3 py-2.5"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Customize College / Institution Name
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="mt-2.5 space-y-2 pt-2 border-t border-slate-200/60">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-0.5">
                    Institution Header
                  </label>
                  <input
                    type="text"
                    value={data.collegeName || ""}
                    onChange={(e) => handleFieldChange("collegeName", e.target.value)}
                    placeholder="SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-0.5">
                    Sub-header / Affiliation
                  </label>
                  <input
                    type="text"
                    value={data.affiliation || ""}
                    onChange={(e) => handleFieldChange("affiliation", e.target.value)}
                    placeholder="AFFILIATED TO M.A.K.A.U.T"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 uppercase"
                  />
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Reset & Quick Sample Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onMagicFill}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Fill Sample Demo</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>
      </div>
    </div>
  );
};
