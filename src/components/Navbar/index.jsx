import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTab } from "../../context/TabContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function jump(toWhereById) {
  document.getElementById(toWhereById).scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const { tab } = useTab();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (tab === "about_me_tab") {
      setValue(0);
    } else if (tab === "projects_tab") {
      setValue(1);
    } else if (tab === "contact_tab") {
      setValue(2);
    }
  }, [tab]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        backgroundColor: "rgb(10,25,41);",
        zIndex: "3",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab
            onClick={() => jump("about_me")}
            label="About Me"
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => jump("projects")}
            label="Projects"
            {...a11yProps(1)}
          />
          <Tab
            onClick={() => jump("contact")}
            label="Contact"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}

export default Navbar;
