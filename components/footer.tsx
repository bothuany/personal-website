import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Recep Batuhan Dikmen. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/bothuany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/recep-batuhan-dikmen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:rbdikmen@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MailIcon className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

