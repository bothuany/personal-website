import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ".//project.css";
import "./github-lang-colors.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

export default function Project({
  name,
  description,
  created_at,
  language,
  html_url,
}) {
  let date = new Date(created_at).toDateString();

  let returnLanguage = "None";
  if (language) {
    returnLanguage = "● " + language;
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        data-aos="fade-down"
        data-aos-once="true"
        className="project"
        onClick={() => window.open(html_url)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background:
            "linear-gradient(145deg, rgba(10,25,41,0.9) 0%, rgba(25,40,65,0.95) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            background:
              "linear-gradient(145deg, rgba(25,40,65,0.95) 0%, rgba(40,55,80,1) 100%)",
            "& .MuiTypography-root": {
              color: "#fff",
            },
            "& .github-icon": {
              opacity: 1,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                lineHeight: "1.5em",
                maxHeight: "3em",
              }}
            >
              {description ? description : "No description available"}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              {date}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            maxWidth: `${returnLanguage.length * 8 + 12}px`,
          }}
        >
          <span
            style={{ width: `${returnLanguage.length * 8 + 12}px` }}
            className={language}
          >
            {" "}
            {returnLanguage}
          </span>
        </Box>
        <Box sx={{ position: "absolute", right: 10, top: 10 }}>
          <GitHubIcon
            className="github-icon"
            sx={{
              opacity: 0.5,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </Box>
      </Card>
    </motion.div>
  );
}
