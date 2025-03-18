import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Projects from "@/components/projects"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-20">
        <About />
        <TechStack />
        <Suspense fallback={<Loading />}>
          <Projects />
        </Suspense>
        <Resume />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}

