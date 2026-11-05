"use client";

import React, { useState } from "react";
import {
  StudentFormData,
  TemplateId,
} from "@/types";
import { TemplateSelector } from "./TemplateSelector";
import {
  RotateCcw,
  CheckCircle2,
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
  { short: "CSE", full: "COMPUTER SCIENCE & ENGINEERING" },
  { short: "AIML", full: "CSE (AI & MACHINE LEARNING)" },
  { short: "ECE", full: "ELECTRONICS & COMMUNICATION" },
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
  { name: "Basic EE", code: "ES-EE101", title: "BASIC ELECTRICAL ENGINEERING", sem: "1ST SEMESTER", year: "1ST YEAR" },
];

export const StudentForm: React.FC<StudentFormProps> = ({
  data,
  onChange,
  onSaveToLocalStorage,
  onReset,
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

  const currentSemPill = SEMESTERS.find(
    (s) =>
      s.sem.toLowerCase() === (data.semester || "").toLowerCase() ||
      s.label.toLowerCase() === (data.semester || "").toLowerCase()
  );

  return (
    <div className="space-y-4">
      {/* Template Selector */}
      <TemplateSelector
        selectedId={data.templateId || "classic"}
        onSelect={(id: TemplateId) => handleFieldChange("templateId", id)}
      />

      {/* Quick Subject Presets */}
      <div className="bg-white rounded-xl p-3 border border-slate-200">
        <div className="text-xs font-semibold text-slate-700 mb-2">
          Subject Presets
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {SUBJECT_PRESETS.map((p) => (
            <button
              key={p.code}
              type="button"
              onClick={() => applySubjectQuickPreset(p)}
              className="shrink-0 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Student Details */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Student Details
          </h2>
          <button
            type="button"
            onClick={onSaveToLocalStorage}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            title="Save to this browser"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved</span>
              </>
            ) : (
              <span>Save Details</span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={data.studentName}
              onChange={(e) => handleFieldChange("studentName", e.target.value)}
              placeholder="e.g. AARAV SHARMA"
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              University Roll No.
            </label>
            <input
              type="text"
              value={data.universityRollNo}
              onChange={(e) => handleFieldChange("universityRollNo", e.target.value)}
              placeholder="e.g. 24500124018"
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none uppercase"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-600">
              Course
            </label>
            <div className="flex gap-1">
              {COURSES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleFieldChange("course", c)}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
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
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-600">
              Stream / Branch
            </label>
            <div className="flex gap-1">
              {STREAMS.map((s) => (
                <button
                  key={s.short}
                  type="button"
                  onClick={() => handleFieldChange("stream", s.full)}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
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
            placeholder="e.g. COMPUTER SCIENCE & ENGINEERING"
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Semester
          </label>
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
                  className={`py-1.5 rounded text-xs font-semibold border text-center transition-colors ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">Semester</span>
              <input
                type="text"
                value={data.semester}
                onChange={(e) => handleFieldChange("semester", e.target.value)}
                placeholder="3RD SEMESTER"
                className="w-full rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">Year</span>
              <input
                type="text"
                value={data.year}
                onChange={(e) => handleFieldChange("year", e.target.value)}
                placeholder="2ND YEAR"
                className="w-full rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">Session</span>
              <input
                type="text"
                value={data.session}
                onChange={(e) => handleFieldChange("session", e.target.value)}
                placeholder="2025-2026"
                className="w-full rounded-md border border-slate-200 px-2.5 py-1 text-xs font-mono font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coursework & Paper Details */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
          Coursework &amp; Subject
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Paper / Subject Name
            </label>
            <input
              type="text"
              value={data.paperName}
              onChange={(e) => handleFieldChange("paperName", e.target.value)}
              placeholder="e.g. DATA STRUCTURES & ALGORITHMS"
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Paper Code
            </label>
            <input
              type="text"
              value={data.paperCode}
              onChange={(e) => handleFieldChange("paperCode", e.target.value)}
              placeholder="e.g. PCC-CS301"
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-mono font-medium text-slate-900 focus:border-slate-800 focus:outline-none uppercase"
            />
          </div>
        </div>
      </section>

      {/* Optional Fields */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Optional Fields
          </h2>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => quickAddCustomField("REGISTRATION NO.", "")}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              + Reg No.
            </button>
            <button
              type="button"
              onClick={() => quickAddCustomField("SUBMITTED TO", "")}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              + Submitted To
            </button>
            <button
              type="button"
              onClick={() => quickAddCustomField("ASSIGNMENT TOPIC", "")}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              + Topic
            </button>
            <button
              type="button"
              onClick={() => quickAddCustomField("SUBMISSION DATE", "")}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              + Date
            </button>
          </div>
        </div>

        {data.customFields.filter((f) => f.enabled).length > 0 && (
          <div className="space-y-2">
            {data.customFields
              .filter((f) => f.enabled)
              .map((field) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                    placeholder="LABEL"
                    className="w-1/3 rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 uppercase focus:outline-none"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                    placeholder="VALUE"
                    className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-900 uppercase focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomField(field.id)}
                    className="text-slate-400 hover:text-red-500 text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Sheet Settings */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Sheet Settings
          </h2>
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={data.autoUppercase}
              onChange={(e) => handleFieldChange("autoUppercase", e.target.checked)}
              className="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="text-xs text-slate-600">Uppercase</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] uppercase text-slate-500 mb-1">
              Font
            </label>
            <select
              value={data.fontFamily}
              onChange={(e) => handleFieldChange("fontFamily", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
            >
              <option value="chakra">Chakra Petch (Athletic)</option>
              <option value="mono">JetBrains Mono</option>
              <option value="sans">Inter Sans</option>
              <option value="serif">Libre Baskerville</option>
              <option value="rajdhani">Rajdhani</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase text-slate-500 mb-1">
              Signatures
            </label>
            <select
              value={data.signatures || "show"}
              onChange={(e) => handleFieldChange("signatures", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
            >
              <option value="show">Student + Faculty</option>
              <option value="minimal">Minimal Footer Only</option>
            </select>
          </div>
        </div>

        {/* Institution customization */}
        <details
          open={showInstitutionOverride}
          onToggle={(e) => setShowInstitutionOverride(e.currentTarget.open)}
          className="group pt-2 border-t border-slate-100"
        >
          <summary className="cursor-pointer list-none flex items-center justify-between text-xs text-slate-600">
            <span>Institution Header &amp; Photo</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition group-open:rotate-180" />
          </summary>
          <div className="mt-2 space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">College Name</span>
              <input
                type="text"
                value={data.collegeName || ""}
                onChange={(e) => handleFieldChange("collegeName", e.target.value)}
                placeholder="SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS"
                className="w-full rounded border border-slate-200 px-2 py-1 text-xs uppercase focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">Affiliation</span>
              <input
                type="text"
                value={data.affiliation || ""}
                onChange={(e) => handleFieldChange("affiliation", e.target.value)}
                placeholder="AFFILIATED TO M.A.K.A.U.T"
                className="w-full rounded border border-slate-200 px-2 py-1 text-xs uppercase focus:outline-none"
              />
            </div>
            {data.templateId === "classic" && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">Campus Photo</span>
                <div className="flex items-center gap-1.5">
                  {data.customCampusImage && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange("customCampusImage", undefined)}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                  <label className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded cursor-pointer">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => handleFieldChange("customCampusImage", reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </details>
      </section>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
