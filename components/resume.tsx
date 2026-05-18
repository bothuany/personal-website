"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileTextIcon, BriefcaseIcon, GraduationCapIcon } from "lucide-react"
import ResumePdfModal from "@/components/resume-pdf-modal"

export default function Resume() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="resume" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Resume</h2>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>My Professional Experience</CardTitle>
          <CardDescription>
            A summary of my career journey — click below to view the full resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-primary" />
              Experience Highlights
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Software Developer, Turkcell</h4>
                <p className="text-sm text-muted-foreground">
                  May 2026 – Present | Istanbul, Turkey
                </p>
                <ul className="text-muted-foreground mt-1 text-sm space-y-1">
                  <li>
                    • Spearheading the modernisation of the TAG enterprise LMS
                    from legacy Java/JSF to .NET 10, architecting backend
                    services for 50,000+ corporate learners.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">
                  Associate Software Developer, Turkcell
                </h4>
                <p className="text-sm text-muted-foreground">
                  Aug 2025 – May 2026 | Istanbul, Turkey
                </p>
                <ul className="text-muted-foreground mt-1 text-sm space-y-1">
                  <li>
                    • Engineered core API routes for the Geleceği Yazanlar
                    evaluation platform using .NET 8.0 and React, reducing query
                    latency by ~20% for 50,000+ users.
                  </li>
                  <li>
                    • Pioneered AI-assisted development by engineering custom
                    Model Context Protocols for Cursor, accelerating team
                    delivery and code context management.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">
                  Junior Software Developer, ATP
                </h4>
                <p className="text-sm text-muted-foreground">
                  Jul 2024 – Jul 2025 | Istanbul, Turkey
                </p>
                <ul className="text-muted-foreground mt-1 text-sm space-y-1">
                  <li>
                    • Delivered full-stack solutions across 5+ retail clients
                    (TabGıda, Fasdat, Sencard) using .NET 5, Angular, and MsSQL.
                  </li>
                  <li>
                    • Built a centralised user management dashboard enabling
                    analysts to query, filter, and administer users across
                    multiple retail applications.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">
                  Software Developer Intern, Eczacıbaşı Bilişim
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sep 2023 – Jun 2024 | Istanbul, Turkey
                </p>
                <ul className="text-muted-foreground mt-1 text-sm space-y-1">
                  <li>
                    • Contributed to the Nextflow project, engineering a
                    Microsoft Teams Bot integration using .NET Core Web API and
                    React.js.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">
                  Bachelor&apos;s Degree in Computer Engineering
                </h4>
                <p className="text-sm text-muted-foreground">
                  Eskişehir Technical University | Oct 2020 – Jun 2024
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  GPA: 3.65 / 4.00 (Honor Student)
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  Turkcell GYGY 4.0 Bootcamp
                </h4>
                <p className="text-sm text-muted-foreground">
                  Java Spring Boot Development Program | Dec 2024 – Apr 2025
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  120-Hour Intensive Program — Architected an 8-service CRM
                  system using Spring Boot, Spring Security, and Kafka.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={() => setModalOpen(true)} className="flex items-center">
              <FileTextIcon className="mr-2 h-4 w-4" />
              View Full Resume
            </Button>
          </div>
        </CardContent>
      </Card>

      <ResumePdfModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}
