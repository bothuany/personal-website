import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, ExternalLinkIcon } from "lucide-react"

export default function Resume() {
  return (
    <section id="resume" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Resume</h2>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>My Professional Experience</CardTitle>
          <CardDescription>
            View my complete resume to learn more about my experience, education, and skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Experience Highlights</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Junior Software Developer, ATP Tech</h4>
                <p className="text-sm text-muted-foreground">07/2024 – present | Remote, Türkiye</p>
                <p className="text-muted-foreground mt-1">
                  Working on various projects including TabGıda, Fasdat, Entegre, Sencard, and Polat.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Software Development Intern, Eczacıbaşı Bilişim</h4>
                <p className="text-sm text-muted-foreground">09/2023 – 06/2024 | Remote, Türkiye</p>
                <p className="text-muted-foreground mt-1">
                  Contributed to the Nextflow project and developed an HR chatbot for Microsoft Teams.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Education</h3>
            <div>
              <h4 className="font-medium">Bachelor's Degree in Computer Engineering</h4>
              <p className="text-sm text-muted-foreground">Eskişehir Technical University | 2020 – 06/2024</p>
              <p className="text-muted-foreground mt-1">GPA: 3.65</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild>
              <a
                href="https://flowcv.com/resume/8s8k0h48u9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FileTextIcon className="mr-2 h-4 w-4" />
                View Full Resume
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

