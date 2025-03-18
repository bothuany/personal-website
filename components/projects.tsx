"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import Loading from "./loading"

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  topics: string[]
  language: string
  created_at: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Repository[]>([])
  const [visibleProjects, setVisibleProjects] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("https://api.github.com/users/bothuany/repos?per_page=100")
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()

        const allProjects = data    
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
     

        setProjects(allProjects)
        setVisibleProjects(allProjects.slice(0, 6))
        setLoading(false)
      } catch (err) {
        setError("Failed to load projects. Please try again later.")
        setLoading(false)
        console.error(err)
      }
    }

    fetchProjects()
  }, [])

  const loadMore = () => {
    setVisibleProjects(projects.slice(0, visibleProjects.length + 6))
  }

  if (loading) return <Loading />
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col h-full border border-border bg-card hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription>
                {project.language && (
                  <Badge variant="outline" className="mr-2">
                    {project.language}
                  </Badge>
                )}
                {project.topics &&
                  project.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="mr-2">
                      {topic}
                    </Badge>
                  ))}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description || "No description available"}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline" size="sm" asChild>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              {project.homepage && (
                <Button variant="default" size="sm" asChild>
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {visibleProjects.length < projects.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </section>
  )
}

