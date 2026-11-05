"use client";

import React from "react";
import { TemplateId, TEMPLATES } from "@/types";
import { Check, Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">
              Choose Cover Design
            </h3>
            <p className="text-[11px] text-slate-400">
              Pick your preferred layout — all your entered details stay intact
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          4 Formats
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {TEMPLATES.map((t) => {
          const isSelected = selectedId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 flex items-start gap-3 relative ${
                isSelected
                  ? "bg-indigo-50/60 border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                  : "bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-700"
              }`}
            >
              <div className="text-2xl shrink-0 p-1 bg-white rounded-lg border border-slate-200/60 shadow-2xs">
                {t.icon}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {t.name}
                  </span>
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    {t.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight line-clamp-2">
                  {t.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
