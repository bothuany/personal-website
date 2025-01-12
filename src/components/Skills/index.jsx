import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Container, Grid } from "@mui/material";
import user from "../../user.json";

const getSkillIcon = (skill) => {
  const iconMap = {
    // Languages
    Java: "/images/skills/java.svg",
    "C#": "/images/skills/csharp.svg",
    JavaScript: "/images/skills/javascript.svg",
    Python: "/images/skills/python.svg",
    Go: "/images/skills/go.svg",

    // Web Development
    Spring: "/images/skills/spring.svg",
    ".NET": "/images/skills/dotnet.svg",
    "Node.js": "/images/skills/nodejs.svg",
    Express: "/images/skills/express.svg",

    // Frameworks and Libraries
    Bootstrap: "/images/skills/bootstrap.svg",
    React: "/images/skills/react.svg",
    "React Native": "/images/skills/react-native.svg",
    Angular: "/images/skills/angular.svg",

    // Databases
    MongoDB: "/images/skills/mongodb.svg",
    MySQL: "/images/skills/mysql.svg",
    PostgreSQL: "/images/skills/postgresql.svg",
    MSSQL: "/images/skills/mssql.svg",
    // Tools
    Git: "/images/skills/git.svg",
    Docker: "/images/skills/docker.svg",
    Postman: "/images/skills/postman.svg",

    // Cloud Services
    AWS: "/images/skills/aws.svg",
  };

  return iconMap[skill] || null;
};

function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Box
        sx={{
          py: 5,
          px: { xs: 2, md: 4 },
          paddingBottom: 10,
          background: "rgba(10,25,41,0.7)",
          backdropFilter: "blur(10px)",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        >
          Skills & Technologies
        </Typography>

        <motion.div variants={container} initial="hidden" animate="show">
          <Grid container spacing={6}>
            {user.skills.map((category, idx) => (
              <Grid item xs={12} md={6} lg={4} key={idx}>
                <Box
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "12px",
                    p: 2.5,
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: "#2196F3",
                      opacity: 0.9,
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  >
                    {category.category}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      justifyContent: "flex-start",
                    }}
                  >
                    {category.items.map((skill, index) => (
                      <motion.div key={index} variants={item}>
                        <Box
                          sx={{
                            width: "65px",
                            height: "65px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.75,
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              background: "rgba(255,255,255,0.06)",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <img
                            src={getSkillIcon(skill)}
                            alt={skill}
                            loading="lazy"
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "contain",
                              filter: "brightness(1.2)",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "0.675rem",
                              textAlign: "center",
                              maxWidth: "90%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              lineHeight: 1.2,
                            }}
                          >
                            {skill}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
}

export default Skills;
