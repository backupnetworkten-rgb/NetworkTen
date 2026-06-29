"use client";

import { Box, Typography } from "@mui/material";

export default function AccountHero() {
  return (
    <Box mb={5}>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#2A52BE",
          textTransform: "uppercase",
          mb: 0.75,
        }}
      >
        My Account
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: { xs: 30, md: 38 },
          color: "#11162B",
          lineHeight: 1.15,
          mb: 0.75,
        }}
      >
        Account Settings
      </Typography>
      <Typography sx={{ color: "#7A8094", fontSize: 15 }}>
        Manage your profile, delivery addresses and account security.
      </Typography>
    </Box>
  );
}