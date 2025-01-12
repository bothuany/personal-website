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
    <Box
      sx={{
        width: "100%",
        maxWidth: "1600px",
        mx: "auto",
        px: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          fontFamily: "Source Code Pro",
          padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
          backdropFilter: "blur(4px)",
          animation: "fadeIn 1s ease-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            id="terminal"
            style={{
              background: "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
              padding: "1.5rem",
              borderRadius: "12px",
              color: "#fff",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                minWidth: "fit-content",
              }}
            >
              <span
                style={{
                  color: "#2196F3",
                  position: "absolute",
                  marginTop: "2px",
                  textShadow: "0 0 8px rgba(33, 150, 243, 0.4)",
                }}
              >
                &#62;&nbsp;
              </span>
              <div style={{ marginLeft: "35px", width: "100%" }}>
                <Typewriter
                  options={{
                    delay: delay,
                    cursor: "▋",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        '<span style="color: #FFFFFF">user info</span>'
                      )
                      .pauseFor(500)
                      .typeString("<br />")
                      .typeString('<span style="color: #FFFFFF">Loading</span>')
                      .typeString(".")
                      .pauseFor(300)
                      .typeString(".")
                      .pauseFor(300)
                      .typeString(".")
                      .pauseFor(300)
                      .deleteChars(10)
                      .typeString(
                        `<span style="color: #919191">[INFO]</span> <span style="color: #919191">Name: </span> <span style="color: #FFFFFF">${user.name}</span>`
                      )
                      .typeString("<br />")
                      .typeString(
                        `<span style="color: #919191">[INFO]</span> <span style="color: #919191">Position: </span><span style="color: #FFFFFF">${user.job}</span>`
                      )
                      .start();
                  }}
                />
              </div>
            </div>
          </h1>
        </Box>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
          padding: { xs: "1rem", sm: "1.5rem", md: "2.5rem", lg: "3rem" },
          background:
            "linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0.02) 100%)",
          borderRadius: "20px",
          backdropFilter: "blur(8px)",
          marginX: "auto",
          marginY: "1rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "transform 0.3s ease",
          maxWidth: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={img}
            alt="Animation"
            sx={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "15px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              display: "block",
              margin: "0 auto",
              transition: "transform 0.3s ease",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box
            sx={{
              color: "#9ba9b4",
              fontSize: { xs: "1.1rem", md: "1.2rem", lg: "1.3rem" },
              lineHeight: "1.8",
              textAlign: "justify",
              padding: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "15px",
              "& span": {
                display: "block",
                marginBottom: "1rem",
                textIndent: "2rem",
                maxWidth: "100%",
                margin: "0 auto",
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
