import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import AboutMeLocation from "./components/Navbar/ViewLocations/AboutMeLocation";
import ProjectsLocation from "./components/Navbar/ViewLocations/ProjectsLocation";
import ContactLocation from "./components/Navbar/ViewLocations/ContactLocation";
import Aos from "aos";
import "aos/dist/aos.css";
import SkillsLocation from "./components/Navbar/ViewLocations/SkillsLocation";
import { ScrollManager } from "./utils/scrollManager";
import NeuralBackground from "./components/NeuralBackground";

// Lazy load components
const AboutMe = lazy(() => import("./components/AboutMe"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Skills = lazy(() => import("./components/Skills"));

function App() {
  useEffect(() => {
    // Initialize scroll manager
    const scrollManager = ScrollManager.getInstance();

    // Optimize AOS initialization
    Aos.init({
      duration: 800,
      once: true,
      disable: window.innerWidth < 768,
      throttleDelay: 100,
    });

    // Clean up scroll listeners
    return () => {
      window.removeEventListener("scroll", scrollManager.handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "rgb(10,25,41)",
        fontFamily: "Open Sans",
        position: "relative",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
      className="container"
    >
      <NeuralBackground />
      <Navbar />

      <Box
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          paddingTop: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <br id="about_me" />
          <br />
          <AboutMeLocation />
          <AboutMe />

          <br id="skills" />
          <br />
          <SkillsLocation />
          <Skills />

          <br id="projects" />
          <br />
          <ProjectsLocation />
          <Projects />

          <br id="contact" />
          <br />
          <ContactLocation />
          <Contact />
        </Suspense>
      </Box>
    </Box>
  );
}

export default App;
