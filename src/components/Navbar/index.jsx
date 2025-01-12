import React, { useState, useEffect, memo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useTab } from "../../context/TabContext";
import { throttle } from "../../utils/performance";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import "./navbar.css";

const NavItem = memo(({ icon: Icon, label, isActive, onClick }) => {
  return (
    <Box
      onClick={onClick}
      className={`nav-item ${isActive ? "active" : ""}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        padding: "16px 24px",
        transition: "all 0.3s ease",
        color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
        "&:hover": {
          color: "#fff",
          "& .MuiTypography-root": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <IconButton
        sx={{
          color: "inherit",
          transition: "all 0.3s ease",
          padding: "8px",
          "&:hover": {
            background: "none",
          },
        }}
      >
        <Icon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <Typography
        sx={{
          fontSize: "0.8rem",
          marginTop: "4px",
          opacity: isActive ? 1 : 0.7,
          transform: isActive ? "translateY(0)" : "translateY(5px)",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
          fontWeight: isActive ? 500 : 400,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
});

const Navbar = memo(() => {
  const { tab, setTab } = useTab();
  const [value, setValue] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isManualScroll, setIsManualScroll] = useState(false);

  // Handle tab changes from intersection observers
  useEffect(() => {
    if (!isManualScroll) {
      if (tab === "about_me_tab") setValue(0);
      else if (tab === "skills_tab") setValue(1);
      else if (tab === "projects_tab") setValue(2);
      else if (tab === "contact_tab") setValue(3);
    }
  }, [tab, isManualScroll]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);

      // Reset manual scroll flag after some time
      if (isManualScroll) {
        setTimeout(() => setIsManualScroll(false), 1000);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll]);

  const jump = (toWhereById, newValue) => {
    setIsManualScroll(true);
    setValue(newValue);

    // Update tab context based on the clicked section
    const tabMap = {
      about_me: "about_me_tab",
      skills: "skills_tab",
      projects: "projects_tab",
      contact: "contact_tab",
    };
    setTab(tabMap[toWhereById]);

    const element = document.getElementById(toWhereById);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      className={`navbar-container ${scrolled ? "scrolled" : ""}`}
      sx={{
        position: "fixed",
        top: scrolled ? "20px" : "40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1100,
        transition: "all 0.3s ease",
      }}
    >
      <Box
        className="navbar-content"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          borderRadius: scrolled ? "18px" : "25px",
          background: scrolled ? "rgba(10,25,41,0.95)" : "rgba(10,25,41,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.2)"
            : "0 20px 40px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <NavItem
          icon={HomeIcon}
          label="About Me"
          isActive={value === 0}
          onClick={() => jump("about_me", 0)}
        />
        <NavItem
          icon={CodeIcon}
          label="Skills"
          isActive={value === 1}
          onClick={() => jump("skills", 1)}
        />
        <NavItem
          icon={WorkIcon}
          label="Projects"
          isActive={value === 2}
          onClick={() => jump("projects", 2)}
        />
        <NavItem
          icon={EmailIcon}
          label="Contact"
          isActive={value === 3}
          onClick={() => jump("contact", 3)}
        />
      </Box>
    </Box>
  );
});

export default Navbar;
