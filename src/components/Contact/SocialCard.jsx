import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Box } from "@mui/material";

function SocialCard({ platform, username, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card
        sx={{
          background:
            "linear-gradient(145deg, rgba(10,25,41,0.7) 0%, rgba(25,40,65,0.8) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">{platform}</Typography>
              <Typography variant="body2">@{username}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SocialCard;
