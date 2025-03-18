import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MailIcon, LinkedinIcon, GithubIcon } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Contact</h2>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Get In Touch</CardTitle>
          <CardDescription>Feel free to reach out for collaborations or just a friendly chat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="h-auto py-4 flex-1 justify-start">
              <a href="mailto:rbdikmen@gmail.com" className="flex items-center">
                <MailIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">rbdikmen@gmail.com</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" asChild className="h-auto py-4 flex-1 justify-start">
              <a
                href="https://linkedin.com/in/recep-batuhan-dikmen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <LinkedinIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">recep-batuhan-dikmen</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" asChild className="h-auto py-4 flex-1 justify-start">
              <a
                href="https://github.com/bothuany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <GithubIcon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm text-muted-foreground">bothuany</div>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

