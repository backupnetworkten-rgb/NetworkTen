"use client";

import React from "react";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

export default function CTA() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            background: "#0c1a2e",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* glow accents */}
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              right: -100,
              top: -120,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,197,63,.16) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 260,
              height: 260,
              left: -80,
              bottom: -120,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,197,63,.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* dot grid */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              pointerEvents: "none",
            }}
          />

          {/* Text */}
          <Box sx={{ position: "relative", zIndex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              sx={{
                color: "#8BC53F",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                mb: 1.2,
              }}
            >
              Let's Get Started
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: 22, md: 28 },
                lineHeight: 1.25,
                letterSpacing: "-0.6px",
                mb: 1,
                maxWidth: 480,
              }}
            >
              Ready To Upgrade Your Business Infrastructure?
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,.55)",
                fontSize: 13,
                lineHeight: 1.65,
                maxWidth: 440,
              }}
            >
              Talk to our team for a free site assessment and custom solution
              plan — no obligation.
            </Typography>
          </Box>

          {/* CTAs */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ position: "relative", zIndex: 1, flexShrink: 0 }}
          >
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                height: 46,
                px: "20px",
                borderRadius: "12px",
                background: "#6fa52e",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                textTransform: "none",
                boxShadow: "0 4px 16px rgba(111,165,46,.3)",
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#5c8c24",
                },
              }}
            >
              Get Free Consultation
            </Button>

            <Button
              component={Link}
              href="tel:+918687878755"
              variant="outlined"
              startIcon={<PhoneRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{
                height: 46,
                px: "20px",
                borderRadius: "12px",
                color: "#fff",
                borderColor: "rgba(255,255,255,.25)",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 13,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "rgba(255,255,255,.45)",
                  background: "rgba(255,255,255,.05)",
                },
              }}
            >
              Call Us Now
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}