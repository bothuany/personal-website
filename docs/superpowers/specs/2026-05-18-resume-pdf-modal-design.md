# Resume PDF Modal — Design Spec

## Goal

Remove the FlowCV external link flow entirely. Replace it with an in-site PDF viewer modal powered by `react-pdf`, so visitors never leave the site to view the resume. Update the resume section content to reflect the latest CV data.

## Tech Stack

- **react-pdf** (`@wojtekmaj/react-pdf`) — renders PDF pages as canvas/SVG inside React
- **PDF.js worker** — loaded from CDN (`unpkg.com/pdfjs-dist/build/pdf.worker.min.mjs`) for static export compatibility
- **shadcn Dialog** — already in the project (`components/ui/dialog.tsx`, Radix-based)
- **PDF source** — `public/resume.pdf` (static asset, user replaces manually)

## Architecture

### Files Changed

| File | Action |
|------|--------|
| `components/resume.tsx` | Rewrite — update content from CV JSON, replace FlowCV button with modal trigger |
| `components/resume-pdf-modal.tsx` | **New** — Dialog + react-pdf viewer with pagination, download, loading/error states |
| `public/resume.pdf` | **New** — static PDF asset (user-provided) |
| `package.json` | Add `react-pdf` dependency |

### Resume Section (`resume.tsx`)

Content updated from CV JSON (`hidden: false` items only):

**Experience Highlights:**
1. Software Developer, Turkcell — May 2026 - Present
2. Associate Software Developer, Turkcell — Aug 2025 - May 2026
3. Junior Software Developer, ATP — Jul 2024 - Jul 2025
4. Software Developer Intern, Eczacıbaşı Bilişim — Sep 2023 - Jun 2024

**Education:**
1. Bachelor's in Computer Engineering, Eskişehir Technical University — GPA: 3.65/4.00
2. Turkcell GYGY 4.0 Bootcamp — Java Spring Boot Development Program

**CTA:** "View Full Resume" button triggers the PDF modal (no external link).

### PDF Modal (`resume-pdf-modal.tsx`)

**Structure:**
- `Dialog` (shadcn) wrapping the viewer
- `DialogContent` sized `max-w-4xl`, height ~85vh
- `DialogHeader`: title "Resume" + download button (`<a href="/resume.pdf" download>`) + close button
- Body: `react-pdf` `<Document>` + `<Page>` components
- Footer: page navigation (previous/next + "Page X of Y")

**States:**
- **Loading:** Skeleton/spinner while PDF loads
- **Success:** PDF rendered with pagination
- **Error:** "Could not load PDF" message + direct download link as fallback

**Responsive:**
- Desktop: `max-w-4xl` modal, PDF rendered at container width
- Mobile: near full-screen modal, PDF scales to fit width

### react-pdf Configuration

- Worker loaded via CDN: `pdfjs-dist/build/pdf.worker.min.mjs` from unpkg
- Configured in the modal component via `pdfjs.GlobalWorkerOptions.workerSrc`
- No server-side rendering needed (component is `"use client"`)

## Constraints

- Static export (`output: "export"`) — no API routes, no server components for PDF serving
- PDF file must be manually placed in `public/resume.pdf` by the user
- Phone number privacy handled by user providing a redacted PDF
