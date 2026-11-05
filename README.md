# 📄 FrontPage — Instant A4 Assignment & Lab Report Cover Generator

> **FrontPage** is a lightweight, mobile-first web application built to generate print-ready, high-resolution A4 (210mm × 297mm) cover sheets for assignments, engineering lab records, term projects, and seminar reports in seconds.

---

## 🌟 Highlights & Features

### 🎨 4 Professional Cover Layouts
- **🏛️ Classic Campus**: Traditional academic layout with building photo, formal letterhead, and block typography.
- **✨ Modern Minimal**: Centered emblem, clean divider rules, and structured report cards. Ideal for theory assignments and term papers.
- **🔬 Lab & Practical Report**: Engineering laboratory format featuring an academic framed border, subject details, and an **Official Evaluation Table** with *Date of Performance*, *Date of Submission*, *Marks/Grade Awarded*, and *Teacher's Signature*.
- **🎓 Executive Project**: Bold navy & gold layout designed for major/minor projects, seminar presentations, and industrial training reports.

### 📱 Mobile-First Ergonomics
- **Sticky Bottom Action Bar**: Quick access to **Preview**, **Download PDF**, and **Quick Print**.
- **Auto-Fitting A4 Modal**: Fullscreen preview that automatically scales to your phone's screen width with zero horizontal scroll.
- **Touch-Optimized Form**: One-tap semester chips that automatically sync the academic year.

### ⚡ Built-in Productivity
- **1-Tap Quick Fill Presets**: Pre-configured subjects for CSE (DSA, OS, DBMS, AI & ML), ME, EE, ECE, Civil, and Pharmacy.
- **"Sample Demo" Button**: Test the entire tool in 1 click without typing a single character.
- **Save on Device (`localStorage`)**: Saves your Name, Roll Number, Course, and Stream locally so you only ever have to update the subject name for each new assignment.
- **Custom Fields Manager**: Easily toggle or add custom lines (e.g. *Registration No.*, *Submitted To: Faculty Name*, *Topic / Experiment No.*, *Submission Date*).

### 🖨️ Multi-Format High-Resolution Export
- **Vector-Quality PDF**: 300+ DPI A4 PDF generated directly in the browser via `jspdf` & `html-to-image`.
- **PNG Image Export**: High-resolution image export for instant submission via WhatsApp, Telegram, or Google Classroom.
- **Native Browser Print**: Standard `@media print` rules with zero margins for direct printing.

### 🔒 100% Client-Side & Private
- All processing, rendering, and PDF compilation occurs entirely inside your device's browser.
- No personal data, student credentials, or files are ever transmitted to or stored on external servers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Engine**: [`jspdf`](https://github.com/parallax/jsPDF) & [`html-to-image`](https://github.com/bubkoo/html-to-image)
- **Typography**: Google Fonts (`Chakra Petch`, `Rajdhani`, `Plus Jakarta Sans`)
- **Delight**: `canvas-confetti`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v26)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imrandotenv/frontpage.git
   cd frontpage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) on your desktop or mobile browser.

---

## 📦 Production Build

```bash
# Compile and optimize production build
npm run build

# Start production server
npm run start
```

Deployable to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or GitHub Pages with zero configuration.

---

## 📄 License

Created with ❤️ by [MD Imran Ahmad](https://github.com/imrandotenv). Distributed under the MIT License.
