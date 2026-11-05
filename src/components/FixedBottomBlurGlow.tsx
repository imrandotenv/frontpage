"use client";

import React from "react";

/**
 * FixedBottomBlurGlow
 * Signature design system effect: persistent, fixed overlay pinned to the bottom 
 * of the viewport that softens scrolling content with a warm architectural pastel glow.
 * Touch & Click Safety: pointer-events-none on all layers.
 */
export const FixedBottomBlurGlow: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 w-full h-32 z-30 pointer-events-none select-none transition-opacity duration-700 no-print"
    >
      {/* 1. Backdrop blur + primary white gradient */}
      <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none" />

      {/* 2. Signature pastel peach/orange glow tint */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FED7AA]/35 via-[#FFEDD5]/15 to-transparent pointer-events-none" />

      {/* 3. Subtle horizontal atmospheric center bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-12 bg-gradient-to-r from-transparent via-[#FB923C]/20 to-transparent blur-xl pointer-events-none" />
    </div>
  );
};
