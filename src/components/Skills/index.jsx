import React from "react";
import { motion } from "framer-motion";
import { Box, Chip, Typography } from "@mui/material";
import user from "../../user.json";

function Skills() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Skills & Technologies
      </Typography>

      {user.skills.map((category, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {category.category}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {category.items.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={skill}
                  sx={{
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Skills;
