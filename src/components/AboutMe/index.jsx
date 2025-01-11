import React from "react";
import user from "../../user.json";
import Box from "@mui/material/Box";
import Typewriter from "typewriter-effect";
import Grid from "@mui/material/Grid";
import "./aboutme.css";
import img from "../../images/animation.gif";

function AboutMe() {
  const delay = 80;

  return (
    <Box>
      <Box
        sx={{
          fontFamily: "Source Code Pro",
          padding: "2rem",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box>
          <h1
            id="terminal"
            style={{
              float: "left",
              background: "black",
              padding: "1rem",
              borderRadius: "8px",
              color: "#fff",
              marginBottom: "2rem",
            }}
          >
            <span style={{ float: "left", color: "#2196F3" }}>
              {" "}
              &#62;&nbsp;
            </span>
            <Typewriter
              options={{
                delay: delay,
                cursor: "▋",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(user.name)
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(user.name)
                  .start();
              }}
            />
          </h1>
        </Box>
      </Box>
      <Box
        data-aos="fade-up"
        data-aos-once="true"
        sx={{
          marginBottom: "2rem",
          textAlign: "center",
          marginTop: "2rem",
          clear: "both",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Source Code Pro",
            background: "linear-gradient(45deg, #2196F3, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {user.job}
        </h2>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          background: "rgba(33,150,243,0.03)",
          borderRadius: "15px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={img}
            alt="Animation"
            sx={{
              width: "95%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              color: "#9ba9b4",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              textAlign: "justify",
              padding: "1rem",
              "& span": {
                display: "block",
                marginBottom: "1rem",
                textIndent: "2rem",
                animation: "fadeIn 1s ease-out",
              },
            }}
          >
            <span className="descriptionOfMe">{user.description}</span>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutMe;
