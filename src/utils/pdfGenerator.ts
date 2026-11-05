import jsPDF from "jspdf";
import { toJpeg, toPng } from "html-to-image";
import confetti from "canvas-confetti";

export interface GeneratePdfOptions {
  element: HTMLElement;
  studentName?: string;
  paperCode?: string;
  onProgress?: (progress: number, stage: string) => void;
}

export async function generateFrontPagePdf({
  element,
  studentName = "Student",
  paperCode = "FrontPage",
  onProgress,
}: GeneratePdfOptions): Promise<void> {
  try {
    onProgress?.(20, "Preparing page canvas...");

    if (typeof document !== "undefined" && document.fonts) {
      try {
        await document.fonts.ready;
      } catch {
        // Ignore font wait timeout
      }
    }

    onProgress?.(50, "Rendering crisp graphics...");

    let imgData: string;
    try {
      // Primary: high-definition JPEG at 2x pixel ratio (optimal balance of sharpness & mobile RAM)
      imgData = await toJpeg(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: false,
      });
    } catch (renderError) {
      console.warn("JPEG rendering fallback triggered:", renderError);
      // Secondary fallback to PNG
      imgData = await toPng(element, {
        pixelRatio: 1.8,
        backgroundColor: "#ffffff",
      });
    }

    onProgress?.(75, "Compiling A4 PDF document...");

    // Standard A4 dimensions: 210mm x 297mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

    onProgress?.(90, "Finalizing download...");

    const safeName = studentName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const safeCode = paperCode.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 15);
    const fileName = `FrontPage_${safeName || "Student"}_${safeCode || "Assignment"}.pdf`;

    pdf.save(fileName);

    onProgress?.(100, "Completed!");

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#38335b", "#c07f2b", "#de931f", "#38bdf8"],
      });
    } catch {
      // Decorative only
    }
  } catch (error) {
    console.error("Critical failure during PDF generation:", error);
    // If client canvas completely fails (e.g. strict mobile lockdown), fallback to native browser print
    if (typeof window !== "undefined") {
      const shouldPrint = window.confirm(
        "Could not generate direct PDF file on this device. Would you like to use Quick Print (Save as PDF) instead?"
      );
      if (shouldPrint) {
        window.print();
        return;
      }
    }
    throw error;
  }
}

export async function downloadFrontPageImage({
  element,
  studentName = "Student",
  paperCode = "FrontPage",
}: {
  element: HTMLElement;
  studentName?: string;
  paperCode?: string;
}): Promise<void> {
  if (typeof document !== "undefined" && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue
    }
  }

  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: false,
  });

  const safeName = studentName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
  const safeCode = paperCode.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 15);
  const fileName = `FrontPage_${safeName || "Student"}_${safeCode || "Assignment"}.png`;

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
