"use client"

import { useState, useCallback, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  DownloadIcon,
  Loader2Icon,
} from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

interface PdfViewerProps {
  file: string
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    const updateWidth = () => {
      const vw = window.innerWidth
      setContainerWidth(vw < 768 ? vw - 48 : Math.min(vw * 0.85 - 64, 800))
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages)
      setPageNumber(1)
      setLoading(false)
      setError(false)
    },
    []
  )

  const onDocumentLoadError = useCallback(() => {
    setLoading(false)
    setError(true)
  }, [])

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }, [numPages])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
        <FileTextIcon className="h-12 w-12" />
        <p>Could not load PDF.</p>
        <Button variant="outline" asChild>
          <a href={file} download="recep-batuhan-dikmen-resume.pdf">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download instead
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex-1 overflow-auto flex items-start justify-center w-full">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center h-64 gap-2 text-muted-foreground">
              <Loader2Icon className="h-5 w-5 animate-spin" />
              <span>Loading PDF...</span>
            </div>
          }
          className="flex flex-col items-center"
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            className="shadow-lg rounded-sm"
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>

      {!loading && numPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3 shrink-0">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
