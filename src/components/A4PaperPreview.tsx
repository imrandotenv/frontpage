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

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const A4PaperPreview: React.FC<A4PaperPreviewProps> = ({
  data,
  useImageHeader = false,
  className = "",
  maxContainerWidth,
  zoomOffset = 0,
  onScaleCalculated,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState<number>(0.58);
  const lastReportedScale = useRef<number>(-1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const targetWidth = maxContainerWidth ? Math.min(width, maxContainerWidth) : width;
      const calculatedScale = Math.max(0.2, (targetWidth - 8) / A4_WIDTH_PX);
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

  const effectiveScale = Math.max(0.25, Math.min(1.4, baseScale + zoomOffset));

  useEffect(() => {
    const rounded = Math.round(effectiveScale * 100);
    if (onScaleCalculated && lastReportedScale.current !== rounded) {
      lastReportedScale.current = rounded;
      onScaleCalculated(rounded);
    }
  }, [effectiveScale, onScaleCalculated]);

  const scaledWidth = Math.round(A4_WIDTH_PX * effectiveScale);
  const scaledHeight = Math.round(A4_HEIGHT_PX * effectiveScale);

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center overflow-hidden py-1 ${className}`}
    >
      <div
        className="relative bg-white shadow-xl rounded-sm transition-all duration-150 border border-slate-300/80 shrink-0"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          className="origin-top-left absolute top-0 left-0"
          style={{
            transform: `scale(${effectiveScale})`,
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
          }}
        >
          <FrontPageCanvas data={data} useImageHeader={useImageHeader} />
        </div>
      </div>
    </div>
  );
};
