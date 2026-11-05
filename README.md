# 📄 FrontPage - Instant A4 Assignment & Lab Report Cover Generator

> A minimal, modern, and mobile-friendly web tool to generate print-ready, high-resolution A4 (210mm × 297mm) cover pages for university assignments, lab records, seminar reports, and term projects.

Generate your formatted assignment cover page in seconds directly from your phone or laptop.

---

## 🌟 Key Features

- **Multiple Professional Layouts**: Switch between Classic, Modern Minimal, Engineering Lab Report, and Executive Project cover designs.
- **1-Tap Quick Fill Presets**: Pre-configured subjects and departments for instant testing.
- **Auto-Sync Semester & Year**: Selecting a semester automatically sets the corresponding academic year.
- **Save to Device (`localStorage`)**: Persists your credentials so you only need to change the subject name for each assignment.
- **Multi-Format Export**: One-click 300 DPI A4 PDF download, PNG image export, and native browser print formatting.
- **Mobile-First Ergonomics**: Designed for phone screens with sticky action bar, live preview modal, and fast touch-friendly inputs.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Engine**: [`jspdf`](https://github.com/parallax/jsPDF) & [`html-to-image`](https://github.com/bubkoo/html-to-image)
- **Typography**: Google Fonts (`Chakra Petch`, `Rajdhani`, `Plus Jakarta Sans`)

---

## 🚀 Getting Started

```bash
# 1. Clone repository
git clone https://github.com/imrandotenv/frontpage.git
cd frontpage

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your desktop or mobile browser.

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

Created by [MD Imran Ahmad](https://github.com/imrandotenv). Distributed under the MIT License.
