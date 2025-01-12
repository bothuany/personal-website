import React, { useEffect, useState } from "react";
import axios from "axios";
import user from "../../user.json";
import Box from "@mui/material/Box";
import Project from "./Project";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Virtuoso } from "react-virtuoso";

function Projects() {
  const [myProjects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const githubApiString = (username) =>
    `https://api.github.com/users/${username}/repos?per_page=100`;

  useEffect(() => {
    axios
      .get(githubApiString(user.github_username))
      .then((res) => setProjects(res.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  if (myProjects) {
    myProjects.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }

  const paginatedProjects = myProjects.slice(0, page * itemsPerPage);

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "15px",
          textAlign: "center",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <h2>Projects</h2>
      </Box>
      <Box
        sx={{
          marginBottom: "30px",
          textAlign: "center",
          color: "rgb(179,185,180)",
        }}
      >
        (Hint: Click them to inspect!)
      </Box>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {!isLoading &&
          paginatedProjects.map((myProject, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Project
                name={myProject.name}
                language={myProject.language}
                html_url={myProject.html_url}
              />
            </Grid>
          ))}
      </Grid>

      {paginatedProjects.length < myProjects.length && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
            sx={{ textTransform: "none" }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Projects;
