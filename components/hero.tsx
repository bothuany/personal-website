"use client";

import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      // Get the navbar height plus some additional padding (64px as requested)
      const offset = 64;

      // Calculate the element's position relative to the viewport
      const elementPosition = aboutSection.getBoundingClientRect().top;

      // Calculate the position to scroll to (current position + element position - offset)
      const offsetPosition = window.pageYOffset + elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <div className="text-center space-y-6 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Recep Batuhan Dikmen
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Software Engineer
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="default" onClick={scrollToAbout} className="group">
            Discover More
            <ArrowDownIcon className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
