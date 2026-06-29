"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";

import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

const pillars = [
  {
    title: "Products",

    icon: (
      <ShieldRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),

    description:
      "Enterprise networking, surveillance and smart automation infrastructure.",
  },

  {
    title: "Services",

    icon: (
      <AutoAwesomeRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),

    description:
      "Customized technology deployment and professional IT integration solutions.",
  },

  {
    title: "Installation",

    icon: (
      <PrecisionManufacturingRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),

    description:
      "Professional implementation and optimized infrastructure setup services.",
  },

  {
    title:
      "Support",

    icon: (
      <SupportAgentRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />
    ),

    description:
      "Reliable AMC support and proactive maintenance for business continuity.",
  },
];

export default function PillarsSection() {
  return (
    <Box
      sx={{
        py: {
          xs: 3.5,
          md: 4.5,
        },

        position: "relative",

        overflow: "hidden",

        background:
          "linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)",
      }}
    >
      {/* PREMIUM GLOW */}
      <Box
        sx={{
          position: "absolute",

          width: 320,

          height: 320,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.08)",

          top: -180,

          left: -120,

          filter: "blur(120px)",
        }}
      />

      <Container maxWidth="xl">
        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",

            mb: {
              xs: 3.5,
              md: 5,
            },
          }}
        >
          {/* TAG */}
          <Box
            sx={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent:
                "center",

              px: 1.7,

              py: 0.5,

              borderRadius: "40px",

              background:
                "rgba(139,197,63,0.10)",

              border:
                "1px solid rgba(139,197,63,0.16)",

              mb: 1,
            }}
          >
            <Typography
              sx={{
                color: "#8BC53F",

                fontWeight: 800,

                fontSize: "9px",

                letterSpacing: "2px",

                textTransform:
                  "uppercase",
              }}
            >
              NetworkTen Workflow
            </Typography>
          </Box>

          {/* TITLE */}
          <Typography
            sx={{
              color: "#08142e",

              fontWeight: 900,

              lineHeight: 1.05,

              letterSpacing:
                "-1px",

              fontSize: {
                xs: "26px",
                md: "40px",
              },
            }}
          >
            4 Pillars Of
            <Box
              component="span"
              sx={{
                color: "#8BC53F",

                ml: 1,
              }}
            >
              NetworkTen
            </Box>
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "#667085",

              maxWidth: "620px",

              mx: "auto",

              mt: 1.1,

              lineHeight: 1.7,

              fontSize: {
                xs: "11px",
                md: "12px",
              },
            }}
          >
            Complete enterprise technology
            solutions powered by innovation,
            deployment and long-term
            support.
          </Typography>
        </Box>

        {/* CONNECTOR */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },

            position: "absolute",

            left: "13%",

            right: "13%",

            top: 208,

            borderTop:
              "2px dashed rgba(139,197,63,0.20)",

            zIndex: 1,
          }}
        />

        {/* CARDS */}
        <Box
          sx={{
            position: "relative",

            zIndex: 2,

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },

            gap: {
              xs: 1.8,
              md: 2,
            },

            alignItems: "start",
          }}
        >
          {pillars.map(
            (item, index) => (
              <Box
                key={index}
                sx={{
                  position:
                    "relative",

                  mt: {
                    md:
                      index % 2 === 0
                        ? 0
                        : 4,
                  },

                  background:
                    "rgba(255,255,255,0.78)",

                  backdropFilter:
                    "blur(16px)",

                  borderRadius:
                    "26px",

                  px: {
                    xs: 2.3,
                    md: 2.5,
                  },

                  py: {
                    xs: 2.7,
                    md: 2.9,
                  },

                  textAlign:
                    "center",

                  border:
                    "1px solid rgba(255,255,255,0.85)",

                  boxShadow:
                    "0 12px 35px rgba(8,20,46,0.05)",

                  minHeight: 215,

                  overflow:
                    "hidden",

                  transition:
                    "0.4s ease",

                  "&:hover": {
                    transform:
                      "translateY(-8px)",

                    boxShadow:
                      "0 20px 50px rgba(8,20,46,0.10)",
                  },

                  "&:hover .iconBox":
                    {
                      transform:
                        "scale(1.08)",
                    },

                  "&::before": {
                    content: '""',

                    position:
                      "absolute",

                    top: 0,

                    left: 0,

                    width: "100%",

                    height: 4,

                    background:
                      "linear-gradient(90deg, #8BC53F, #6da82f)",
                  },
                }}
              >
                {/* DOT */}
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },

                    position:
                      "absolute",

                    top: -38,

                    left: "50%",

                    transform:
                      "translateX(-50%)",

                    width: 16,

                    height: 16,

                    borderRadius:
                      "50%",

                    background:
                      "#8BC53F",

                    border:
                      "4px solid #eef8e0",

                    zIndex: 5,

                    boxShadow:
                      "0 0 0 7px rgba(139,197,63,0.10)",
                  }}
                />

                {/* ICON */}
                <Box
                  className="iconBox"
                  sx={{
                    width: 68,

                    height: 68,

                    borderRadius:
                      "20px",

                    background:
                      "linear-gradient(135deg, #8BC53F, #6da82f)",

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    color: "#ffffff",

                    mx: "auto",

                    mb: 1.8,

                    boxShadow:
                      "0 12px 28px rgba(139,197,63,0.22)",

                    transition:
                      "0.35s",
                  }}
                >
                  {item.icon}
                </Box>

                {/* TITLE */}
                <Typography
                  sx={{
                    color: "#08142e",

                    fontWeight: 900,

                    lineHeight: 1.2,

                    mb: 0.9,

                    fontSize: {
                      xs: "18px",
                      md: "20px",
                    },
                  }}
                >
                  {item.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                  sx={{
                    color: "#667085",

                    lineHeight: 1.75,

                    fontSize: {
                      xs: "11px",
                      md: "12px",
                    },
                  }}
                >
                  {item.description}
                </Typography>

                {/* BOTTOM LIGHT */}
                <Box
                  sx={{
                    position:
                      "absolute",

                    bottom: -50,

                    left: "50%",

                    transform:
                      "translateX(-50%)",

                    width: 140,

                    height: 65,

                    borderRadius:
                      "50%",

                    background:
                      "rgba(139,197,63,0.10)",

                    filter:
                      "blur(45px)",
                  }}
                />
              </Box>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
}