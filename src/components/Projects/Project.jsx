import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ".//project.css";
import "./github-lang-colors.css";

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
    <Card
      data-aos="fade-down"
      data-aos-once="true"
      className="project"
      onClick={() => {
        window.open(html_url);
      }}
      sx={{ display: "flex", justifyContent: "space-between" }}
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
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
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
    </Card>
  );
}
