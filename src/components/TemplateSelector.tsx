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
    <div className="bg-white rounded-xl p-3 border border-slate-200">
      <div className="text-xs font-semibold text-slate-700 mb-2">
        Template
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {TEMPLATES.map((t) => {
          const isSelected = selectedId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`py-2 px-3 rounded-lg border text-left transition-colors text-xs font-medium ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <div className="truncate">{t.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
