import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AboutMeLocation from "./components/Navbar/ViewLocations/AboutMeLocation";
import ProjectsLocation from "./components/Navbar/ViewLocations/ProjectsLocation";
import ContactLocation from "./components/Navbar/ViewLocations/ContactLocation";
import Aos from "aos";
import "aos/dist/aos.css";
import Skills from "./components/Skills";
import SkillsLocation from "./components/Navbar/ViewLocations/SkillsLocation";

function App() {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "rgb(10,25,41)",
        fontFamily: "Open Sans",
      }}
    >
      <Navbar />

      <Box
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          paddingTop: "80px",
        }}
      >
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
      </Box>
    </Box>
  );
}

export default App;
