"use client";

import React from "react";
import { TemplateId, TEMPLATES } from "@/types";

interface TemplateSelectorProps {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Cover Design Template
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          6 Academic Formats
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {TEMPLATES.map((t) => {
          const isSelected = selectedId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`p-2.5 rounded-xl border text-left transition-all active:scale-98 flex flex-col justify-between gap-1 relative ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200/90 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base">{t.icon}</span>
                {isSelected ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                ) : (
                  <span className="text-[9px] font-semibold text-slate-400 uppercase">
                    {t.badge}
                  </span>
                )}
              </div>

              <div>
                <span className={`block text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                  {t.name}
                </span>
                <span className={`block text-[10px] line-clamp-1 mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                  {t.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
