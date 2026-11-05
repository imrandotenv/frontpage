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
  Lock,
  Plus,
  Trash2,
  RotateCcw,
  Save,
  CheckCircle2,
  Sliders,
  Wand2,
} from "lucide-react";

interface StudentFormProps {
  data: StudentFormData;
  onChange: (newData: StudentFormData) => void;
  onSaveToLocalStorage: () => void;
  onReset: () => void;
  onMagicFill: () => void;
  isSaved: boolean;
}

const COURSES = ["B.TECH", "DIPLOMA", "B.PHARM", "B.ARCH", "BCA", "MCA"];
const SESSIONS = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
const SEMESTERS = [
  { sem: "1ST SEMESTER", year: "1ST YEAR" },
  { sem: "2ND SEMESTER", year: "1ST YEAR" },
  { sem: "3RD SEMESTER", year: "2ND YEAR" },
  { sem: "4TH SEMESTER", year: "2ND YEAR" },
  { sem: "5TH SEMESTER", year: "3RD YEAR" },
  { sem: "6TH SEMESTER", year: "3RD YEAR" },
  { sem: "7TH SEMESTER", year: "4TH YEAR" },
  { sem: "8TH SEMESTER", year: "4TH YEAR" },
];

export const StudentForm: React.FC<StudentFormProps> = ({
  data,
  onChange,
  onSaveToLocalStorage,
  onReset,
  onMagicFill,
  isSaved,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const applyPreset = (preset: DepartmentPreset) => {
    onChange({
      ...data,
      course: preset.course,
      stream: preset.stream,
      semester: preset.semester,
      year: preset.year,
      paperName: preset.paperName,
      paperCode: preset.paperCode,
      session: preset.session,
    });
  };

  const toggleCustomField = (id: string) => {
    const updated = data.customFields.map((f) =>
      f.id === id ? { ...f, enabled: !f.enabled } : f
    );
    handleFieldChange("customFields", updated);
  };

  const updateCustomField = (id: string, field: "label" | "value", val: string) => {
    const updated = data.customFields.map((f) =>
      f.id === id ? { ...f, [field]: val } : f
    );
    handleFieldChange("customFields", updated);
  };

  const addCustomField = () => {
    const newId = `custom-${Date.now()}`;
    const updated = [
      ...data.customFields,
      { id: newId, label: "NEW FIELD", value: "", enabled: true },
    ];
    handleFieldChange("customFields", updated);
  };

  const removeCustomField = (id: string) => {
    const updated = data.customFields.filter((f) => f.id !== id);
    handleFieldChange("customFields", updated);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. CHOOSE DESIGN / TEMPLATE OPTIONS                           */}
      {/* ------------------------------------------------------------- */}
      <TemplateSelector
        selectedId={data.templateId || "classic"}
        onSelect={(id: TemplateId) => handleFieldChange("templateId", id)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. ONE-TAP PRESETS & MAGIC FILL                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            1-Tap Quick Fill Subjects
          </label>
          <button
            type="button"
            onClick={onMagicFill}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors border border-amber-200"
            title="Auto fill sample data"
          >
            <Wand2 className="w-3 h-3 text-amber-600" />
            <span>Sample Demo</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin no-scrollbar">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-700 whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs"
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. STUDENT CREDENTIALS                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                Student Details
              </h3>
              <p className="text-[11px] text-slate-400">
                Your personal university identity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onSaveToLocalStorage}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all ${
              isSaved
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            title="Save your Name & Roll No so you never have to re-type"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved on Device</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Remember Me</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={data.studentName}
              onChange={(e) => handleFieldChange("studentName", e.target.value)}
              placeholder="e.g. MD IMRAN AHMAD"
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all uppercase"
            />
          </div>

          {/* University Roll No */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              University Roll No. *
            </label>
            <input
              type="text"
              value={data.universityRollNo}
              onChange={(e) =>
                handleFieldChange("universityRollNo", e.target.value)
              }
              placeholder="e.g. 2780012XXXX"
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all uppercase tracking-wide font-mono"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. ACADEMIC PROGRAM & STREAM                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">
              Course &amp; Department
            </h3>
            <p className="text-[11px] text-slate-400">
              Academic program and curriculum details
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Course */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-600">
                Course *
              </label>
              <div className="flex gap-1">
                {COURSES.slice(0, 4).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleFieldChange("course", c)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      data.course === c
                        ? "bg-amber-600 text-white"
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
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all uppercase"
            />
          </div>

          {/* Stream */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Stream / Branch *
            </label>
            <input
              type="text"
              value={data.stream}
              onChange={(e) => handleFieldChange("stream", e.target.value)}
              placeholder="e.g. COMPUTER SCIENCE AND ENGINEERING (CSE)"
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all uppercase"
            />
          </div>

          {/* Semester & Year */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Semester (Auto-selects matching Year) *
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {SEMESTERS.map(({ sem, year }, idx) => {
                const isSelected = data.semester === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => handleSemesterSelect(sem, year)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      isSelected
                        ? "bg-[#38335b] text-white border-[#38335b] shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="text-[12px]">{idx + 1}st</div>
                    <div className="text-[9px] opacity-75 truncate">Sem</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                type="text"
                value={data.semester}
                onChange={(e) => handleFieldChange("semester", e.target.value)}
                placeholder="SEMESTER"
                className="bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 uppercase"
              />
              <input
                type="text"
                value={data.year}
                onChange={(e) => handleFieldChange("year", e.target.value)}
                placeholder="YEAR"
                className="bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. PAPER & SESSION INFORMATION                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">
              Subject &amp; Paper Info
            </h3>
            <p className="text-[11px] text-slate-400">
              Exam paper name, subject code and session
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Paper Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Paper / Subject Name *
            </label>
            <input
              type="text"
              value={data.paperName}
              onChange={(e) => handleFieldChange("paperName", e.target.value)}
              placeholder="e.g. DATA STRUCTURES AND ALGORITHMS (DSA)"
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all uppercase"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Paper Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Paper Code *
              </label>
              <input
                type="text"
                value={data.paperCode}
                onChange={(e) => handleFieldChange("paperCode", e.target.value)}
                placeholder="e.g. PCC CS 301"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all uppercase tracking-wide font-mono"
              />
            </div>

            {/* Academic Session */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  Session *
                </label>
                <div className="flex gap-1">
                  {SESSIONS.slice(1, 3).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleFieldChange("session", s)}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        data.session === s
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={data.session}
                onChange={(e) => handleFieldChange("session", e.target.value)}
                placeholder="e.g. 2025-2026"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. OPTIONAL CUSTOM FIELDS ACCORDION                            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                Optional Custom Fields
              </h3>
              <p className="text-[11px] text-slate-400">
                Registration No., Faculty Name, Topic, etc.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addCustomField}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Field</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.customFields.map((field) => (
            <div
              key={field.id}
              className={`p-3 rounded-xl border transition-all ${
                field.enabled
                  ? "bg-slate-50/90 border-slate-300"
                  : "bg-slate-50/40 border-slate-200/60 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={() => toggleCustomField(field.id)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                  />
                  <span>Show on cover sheet</span>
                </label>
                <button
                  type="button"
                  onClick={() => removeCustomField(field.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                  title="Remove this field"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {field.enabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateCustomField(field.id, "label", e.target.value)
                    }
                    placeholder="Field Name (e.g. REGISTRATION NO.)"
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 uppercase"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      updateCustomField(field.id, "value", e.target.value)
                    }
                    placeholder="Value (e.g. 23800120012)"
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-amber-700 uppercase"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 7. ADVANCED TYPOGRAPHY                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-500" />
            <span>Font Styling &amp; Uppercase Rule</span>
          </div>
          <span className="text-[11px] text-indigo-600 font-semibold">
            {showAdvanced ? "Hide" : "Show"}
          </span>
        </button>

        {showAdvanced && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Font Family
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "chakra", label: "Athletic Block (Sample)" },
                  { id: "rajdhani", label: "Collegiate Tech" },
                  { id: "sans", label: "Clean Modern Sans" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleFieldChange("fontFamily", f.id)}
                    className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                      data.fontFamily === f.id
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-bold text-slate-700 block">
                  Automatic Uppercase Formatting
                </span>
                <span className="text-[11px] text-slate-400">
                  Standard university assignment formatting guideline
                </span>
              </div>
              <input
                type="checkbox"
                checked={data.autoUppercase}
                onChange={(e) =>
                  handleFieldChange("autoUppercase", e.target.checked)
                }
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>
      </div>
    </div>
  );
};
