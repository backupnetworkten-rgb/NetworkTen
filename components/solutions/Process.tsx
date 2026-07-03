"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

const steps = [
  {
    icon: FactCheckRoundedIcon,
    title: "Site Assessment",
    desc: "On-ground survey and requirement analysis tailored to your facility.",
  },
  {
    icon: DesignServicesRoundedIcon,
    title: "Solution Design",
    desc: "Custom infrastructure plan with the right technology stack for your needs.",
  },
  {
    icon: BuildCircleRoundedIcon,
    title: "Installation",
    desc: "Certified engineers deploy with minimal disruption to operations.",
  },
  {
    icon: TaskAltRoundedIcon,
    title: "Support & AMC",
    desc: "Ongoing maintenance, monitoring and 24/7 technical support.",
  },
];

export default function Process() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "#f6f8fb",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(139,197,63,.1)",
              border: "1px solid rgba(139,197,63,.28)",
              borderRadius: "16px",
              px: 1.3,
              py: "4px",
              mb: 1.8,
            }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: "#6fa52e",
              }}
            />
            <Typography
              sx={{
                color: "#5c9128",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              Our Process
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#0c1a2e",
              fontWeight: 800,
              fontSize: { xs: 22, md: 30 },
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
              mb: 1,
            }}
          >
            How We{" "}
            <Box component="span" sx={{ color: "#6fa52e" }}>
              Deliver
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(12,26,46,.6)",
              fontSize: 13,
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.65,
            }}
          >
            A structured, transparent process from first site visit to
            long-term support.
          </Typography>
        </Box>

        {/* Steps */}
        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: { xs: 2, lg: 0 },
          }}
        >
          {/* connecting line (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              position: "absolute",
              top: 26,
              left: "12.5%",
              right: "12.5%",
              height: "1.5px",
              background:
                "repeating-linear-gradient(90deg, rgba(12,26,46,.15) 0, rgba(12,26,46,.15) 6px, transparent 6px, transparent 12px)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Box
                key={step.title}
                sx={{
                  position: "relative",
                  textAlign: "center",
                  px: { lg: 2 },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    width: 52,
                    height: 52,
                    mx: "auto",
                    mb: 2,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "1.5px solid #6fa52e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(111,165,46,.15)",
                  }}
                >
                  <Icon sx={{ fontSize: 22, color: "#6fa52e" }} />
                </Box>

                <Typography
                  sx={{
                    color: "rgba(12,26,46,.35)",
                    fontWeight: 800,
                    fontSize: 10.5,
                    letterSpacing: "1.2px",
                    mb: 0.6,
                  }}
                >
                  STEP {String(index + 1).padStart(2, "0")}
                </Typography>

                <Typography
                  sx={{
                    color: "#0c1a2e",
                    fontWeight: 800,
                    fontSize: 14.5,
                    mb: 0.8,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(12,26,46,.55)",
                    fontSize: 12,
                    lineHeight: 1.65,
                    maxWidth: 220,
                    mx: "auto",
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}