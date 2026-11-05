"use client";

import React, { useRef, useState, useEffect } from "react";
import { FrontPageCanvas } from "./FrontPageCanvas";
import { StudentFormData } from "@/types";

interface A4PaperPreviewProps {
  data: StudentFormData;
  useImageHeader?: boolean;
  className?: string;
  maxContainerWidth?: number;
  zoomOffset?: number;
  onScaleCalculated?: (scalePercent: number) => void;
}

export const A4PaperPreview: React.FC<A4PaperPreviewProps> = ({
  data,
  useImageHeader = false,
  className = "",
  maxContainerWidth,
  zoomOffset = 0,
  onScaleCalculated,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState<number>(0.6);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      // Standard A4 at 96 DPI: 210mm ≈ 794px
      const a4WidthPx = 794;
      const targetWidth = maxContainerWidth ? Math.min(width, maxContainerWidth) : width;
      const calculatedScale = Math.max(0.2, targetWidth / a4WidthPx);
      setBaseScale(calculatedScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateScale);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [maxContainerWidth]);

  const effectiveScale = Math.max(0.25, Math.min(1.5, baseScale + zoomOffset));

  useEffect(() => {
    if (onScaleCalculated) {
      onScaleCalculated(Math.round(effectiveScale * 100));
    }
  }, [effectiveScale, onScaleCalculated]);

  // Scaled height: 297mm ≈ 1123px at 96 DPI
  const a4HeightPx = 1123;
  const a4WidthPx = 794;
  const scaledWidth = a4WidthPx * effectiveScale;
  const scaledHeight = a4HeightPx * effectiveScale;

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center overflow-auto py-2 ${className}`}
    >
      <div
        className="relative bg-white shadow-2xl rounded-sm transition-all duration-150 border border-slate-200/80"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          className="origin-top-left absolute top-0 left-0"
          style={{
            transform: `scale(${effectiveScale})`,
            width: "210mm",
            height: "297mm",
          }}
        >
          <FrontPageCanvas data={data} useImageHeader={useImageHeader} />
        </div>
      </div>
    </div>
  );
};
