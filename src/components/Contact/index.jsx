import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import user from "../../user.json";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import "./Contact.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Recep Batuhan Dikmen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Contact() {
  return (
    <Container
      data-aos="fade-down"
      data-aos-once="true"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        textAlign: "center",
      }}
    >
      <br />
      <br />
      <Box
        id="contact_sub_title"
        sx={{
          color: "rgb(179,185,180)",
          display: "flex",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        {user.contact.sub_title}
      </Box>

      <Box
        id="contact_title"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        {user.contact.title}
      </Box>
      <Box
        id="contact_description"
        sx={{
          display: "flex",
          textAlign: "center",
          fontSize: "24px",
          maxWidth: "300px",
        }}
      >
        {user.contact.description}
      </Box>
      <br />
      <br />
      <br />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            id="profile_image"
            sx={{ width: "70px", height: "70px" }}
            alt="me"
            src={`https://avatars.githubusercontent.com/${user.github_username}`}
          />
        </StyledBadge>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            minWidth: "250px",
          }}
        >
          <Button
            fullWidth
            sx={{
              textTransform: "lowercase",
              fontSize: "0.9rem",
              padding: "8px 0px",
              minHeight: "40px",
            }}
            variant="contained"
            href={`mailto:${user.contact.email}`}
          >
            👋 {user.contact.email}
          </Button>
          <Button
            fullWidth
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              padding: "8px 0px",
              minHeight: "40px",
            }}
            variant="contained"
            href={user.contact.cv}
            target="_blank"
          >
            📄 You can find my CV here!
          </Button>
        </Box>
      </Box>

      <br />
      <br />
      <br />

      <Link
        color="inherit"
        href={`https://www.linkedin.com/in/${user.contact.linkedin_username}`}
        target="_blank"
      >
        <LinkedInIcon className="icon" />
      </Link>
      <Link
        color="inherit"
        href={`https://github.com/${user.github_username}`}
        target="_blank"
      >
        <GitHubIcon className="icon" />
      </Link>
      <Link
        color="inherit"
        href={`https://www.instagram.com/${user.contact.instagram_username}`}
        target="_blank"
      >
        <InstagramIcon className="icon" />
      </Link>

      <br />

      <Copyright id="copyright" sx={{ mt: 5 }} />
      <br />
    </Container>
  );
}

export default Contact;
