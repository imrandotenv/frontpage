"use client";

import React, { useRef, useState, useEffect } from "react";
import { FrontPageCanvas } from "./FrontPageCanvas";
import { StudentFormData } from "@/types";

interface A4PaperPreviewProps {
  data: StudentFormData;
  useImageHeader?: boolean;
  className?: string;
  maxContainerWidth?: number;
}

export const A4PaperPreview: React.FC<A4PaperPreviewProps> = ({
  data,
  useImageHeader = false,
  className = "",
  maxContainerWidth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      // Standard A4 at 96 DPI: 210mm ≈ 794px
      const a4WidthPx = 794;
      const targetWidth = maxContainerWidth ? Math.min(width, maxContainerWidth) : width;
      const newScale = Math.max(0.2, targetWidth / a4WidthPx);
      setScale(newScale);
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

  // Scaled height: 297mm ≈ 1123px at 96 DPI
  const a4HeightPx = 1123;
  const a4WidthPx = 794;
  const scaledWidth = a4WidthPx * scale;
  const scaledHeight = a4HeightPx * scale;

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="relative bg-white shadow-xl rounded-sm transition-all duration-150 overflow-hidden"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          className="origin-top-left absolute top-0 left-0"
          style={{
            transform: `scale(${scale})`,
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
