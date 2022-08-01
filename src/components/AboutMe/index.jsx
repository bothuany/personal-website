import React from "react";
import user from "../../user.json";
import Box from "@mui/material/Box";
import Typewriter from "typewriter-effect";
import Grid from "@mui/material/Grid";
import img from "../../images/animation.gif";
import "./aboutme.css";

function AboutMe() {
  const delay = 80;

  return (
    <Box sx={{}}>
      <Box
        sx={{
          fontFamily: "Source Code Pro",
        }}
      >
        <Box>
          <h1 id="terminal" style={{ float: "left" }}>
            <span style={{ float: "left" }}> &#62;&nbsp;</span>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.changeDelay(delay).typeString(user.name).start();
              }}
            />
          </h1>
        </Box>
      </Box>
      <hr style={{ clear: "both" }} />
      <Box
        data-aos="fade-down"
        data-aos-once="true"
        sx={{
          marginBottom: "10px",
        }}
      >
        <h2 style={{ textAlign: "center", fontFamily: "Source Code Pro" }}>
          {user.job}
        </h2>
      </Box>
      <Grid
        data-aos="fade-down"
        data-aos-once="true"
        container
        spacing={{ xs: 0, md: 3 }}
        style={{ justifyContent: "center" }}
      >
        <Grid item xs={10} md={5}>
          <img src={img} alt="animation" className="center" />
        </Grid>
        <Grid item xs={10} md={7}>
          <Box
            sx={{
              marginTop: "20px",
              color: "#6a7581",
              minHeight: "480px",
              maxHeight: "620px",
            }}
          >
            <span className="descriptionOfMe" style={{ textAlign: "center" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;{user.description}
            </span>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutMe;
