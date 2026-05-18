import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon, Building2 } from "lucide-react"

type Project = {
  id: string
  name: string
  role: string
  description: string[]
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  isProfessional: boolean
}

const portfolioProjects: Project[] = [
  {
    id: "tag-lms",
    name: "TAG Turkcell Akademi Gelişim",
    role: "Associate Software Developer at Turkcell",
    description: [
      "Developed and maintained an internal Learning Management System (LMS) dedicated to Turkcell's corporate training and employee development programs.",
      "Engineered a custom MCP for Oracle Database to integrate seamlessly with Cursor, bridging a gap in the existing tooling and enhancing AI-assisted development workflows."
    ],
    technologies: ["Java", "JSF", "Oracle DB", "SonarQube", "Fortify", "Dynatrace", "Jenkins", "BitBucket"],
    isProfessional: true,
  },
  {
    id: "gelecegi-yazanlar",
    name: "Geleceği Yazanlar Puanlama Sistemi",
    role: "Associate Software Developer at Turkcell",
    description: [
      "Built a comprehensive evaluation system integrated with \"Geleceği Yazanlar,\" enabling juries to seamlessly score and assess participating teams in competitions.",
      "Utilized Cursor and existing MCP integrations to accelerate the development process and improve code context management."
    ],
    technologies: [".NET 8.0", "React", "PostgreSQL", "Playwright", "SonarQube", "Fortify", "Dynatrace", "Jenkins", "AWS S3", "BitBucket"],
    demoUrl: "https://gelecegiyazanlar.turkcell.com.tr/",
    isProfessional: true,
  },
  {
    id: "crm-microservices",
    name: "CRM Microservices",
    role: "Turkcell GYGY 4.0 Final Project",
    description: [
      "Architected a cloud-native CRM system comprising 8 Java Spring Boot microservices, utilizing Docker and Kubernetes for orchestration and Kafka for event-driven communication.",
      "Optimized data management by integrating PostgreSQL, MongoDB, and Redis, while ensuring system reliability through monitoring (Prometheus, Grafana) and centralized logging (AWS ELK stack).",
      "Streamlined the development lifecycle by building automated CI/CD pipelines using GitHub Actions."
    ],
    technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "Kafka", "PostgreSQL", "MongoDB", "Redis", "Prometheus", "Grafana", "AWS ELK"],
    githubUrl: "https://github.com/bothuany/crm-microservices-turkcell-final-project",
    isProfessional: false,
  },
  {
    id: "tabgida-fasdat",
    name: "TabGıda & Fasdat & Entegre & Polat Apps",
    role: "Junior Software Developer at ATP Tech",
    description: [
      "Developed and maintained monolithic applications optimizing business-critical operations and enhancing system performance."
    ],
    technologies: [".NET", "HTML", "CSS", "Javascript", "MsSQL", "Azure", "Git"],
    isProfessional: true,
  },
  {
    id: "sencard",
    name: "Sencard Internal Tools",
    role: "Junior Software Developer at ATP Tech",
    description: [
      "Contributed to internal applications for Sencard, including tools for active user querying and authentication management."
    ],
    technologies: [".NET", "Angular", "MsSQL", "Azure", "Git"],
    demoUrl: "https://www.sencard.com.tr/",
    isProfessional: true,
  },
  {
    id: "blinder-app",
    name: "Blinder App",
    role: "University Project",
    description: [
      "Collaborated on the Blinder App, a full-stack mobile application developed as a final project for the Software Engineering course.",
      "The app utilizes Spring Boot for the backend, React Native for the mobile, and is deployed on AWS."
    ],
    technologies: ["Java", "Spring Boot", "React Native", "WebFlux", "PostgreSQL", "Azure", "AWS", "Postman", "Git", "GitHub", "Figma"],
    githubUrl: "https://github.com/bothuany/blinder-api",
    isProfessional: false,
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Projects</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {portfolioProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col h-full border border-border bg-card hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                {project.isProfessional && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Professional
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm font-medium text-foreground/80 mb-3">
                {project.role}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="bg-background/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-muted-foreground text-sm">
                {project.description.map((desc, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-start gap-4 pt-4 border-t border-border/50">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="default" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
