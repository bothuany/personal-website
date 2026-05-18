"use client"

import dynamic from "next/dynamic"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DownloadIcon, Loader2Icon } from "lucide-react"

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 gap-2 text-muted-foreground">
      <Loader2Icon className="h-5 w-5 animate-spin" />
      <span>Loading PDF viewer...</span>
    </div>
  ),
})

const PDF_PATH = "/resume.pdf"

interface ResumePdfModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ResumePdfModal({
  open,
  onOpenChange,
}: ResumePdfModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b shrink-0">
          <div>
            <DialogTitle>Resume</DialogTitle>
            <DialogDescription className="sr-only">
              PDF resume viewer
            </DialogDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="mr-8">
            <a href={PDF_PATH} download="recep-batuhan-dikmen-resume.pdf">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted/30 p-4">
          {open && <PdfViewer file={PDF_PATH} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
