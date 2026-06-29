"use client";

import React from "react";

import Link from "next/link";

import {
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

import LanIcon from "@mui/icons-material/Lan";
import SecurityIcon from "@mui/icons-material/Security";
import CampaignIcon from "@mui/icons-material/Campaign";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";

export default function AboutSection() {
  const services = [
    {
      title: "Networking",
      icon: <LanIcon />,
    },

    {
      title: "Conference",
      icon: <CampaignIcon />,
    },

    {
      title: "Surveillance",
      icon: <SecurityIcon />,
    },

    {
      title: "Smart Class",
      icon: <DesktopWindowsIcon />,
    },

    {
      title: "Furniture",
      icon: <SettingsSuggestIcon />,
    },

    {
      title: "Communication",
      icon: <PhoneInTalkIcon />,
    },
  ];

  return (
    <Box
      sx={{
        py: {
          xs: 4,
          md: 5,
        },

        background:
          "linear-gradient(to bottom, #f9fcf6, #eef7e8)",

        position: "relative",

        overflow: "hidden",
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
            "rgba(139,197,63,0.10)",

          top: -140,

          right: -120,

          filter: "blur(100px)",
        }}
      />

      <Container maxWidth="xl">
        {/* TOP CONTENT */}
        <Box
          sx={{
            textAlign: "center",

            mb: {
              xs: 3,
              md: 3.5,
            },

            position: "relative",

            zIndex: 2,
          }}
        >
          {/* TAG */}
          <Box
            sx={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent: "center",

              px: 1.8,

              py: 0.6,

              borderRadius: "40px",

              background:
                "rgba(139,197,63,0.12)",

              border:
                "1px solid rgba(139,197,63,0.18)",

              mb: 1.6,
            }}
          >
            <Typography
              sx={{
                color: "#8BC53F",

                fontWeight: 700,

                fontSize: "10px",

                letterSpacing: "1.3px",

                textTransform: "uppercase",
              }}
            >
              About NetworkTen
            </Typography>
          </Box>

          {/* TITLE */}
          <Typography
            sx={{
              color: "#08142e",

              fontWeight: 900,

              lineHeight: 1.1,

              letterSpacing: "-0.8px",

              mb: 1,

              fontSize: {
                xs: "24px",
                md: "38px",
              },
            }}
          >
            All Solutions Under One Umbrella
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "#667085",

              lineHeight: 1.7,

              fontSize: {
                xs: "13px",
                md: "14px",
              },

              maxWidth: "680px",

              mx: "auto",
            }}
          >
            Complete networking,
            surveillance, conferencing,
            automation and enterprise
            infrastructure solutions for
            modern businesses.
          </Typography>
        </Box>

        {/* MAIN GRID */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              lg: "40% 60%",
            },

            gap: {
              xs: 2.5,
              md: 2.5,
            },

            alignItems: "stretch",

            position: "relative",

            zIndex: 2,
          }}
        >
          {/* LEFT CARD */}
          <Box
            sx={{
              background:
                "rgba(255,255,255,0.76)",

              backdropFilter: "blur(14px)",

              borderRadius: "30px",

              border:
                "1px solid rgba(139,197,63,0.10)",

              p: {
                xs: 2,
                md: 2.4,
              },

              boxShadow:
                "0 18px 50px rgba(0,0,0,0.05)",

              display: "flex",

              flexDirection: "column",

              justifyContent: "space-between",
            }}
          >
            {/* SERVICE GRID */}
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(3, 1fr)",

                gap: {
                  xs: 1.8,
                  md: 2,
                },
              }}
            >
              {services.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    textAlign: "center",

                    transition: "0.35s",

                    "&:hover .circleIcon": {
                      transform:
                        "translateY(-5px) scale(1.06)",

                      boxShadow:
                        "0 20px 38px rgba(139,197,63,0.32)",
                    },
                  }}
                >
                  {/* ICON */}
                  <Box
                    className="circleIcon"
                    sx={{
                      width: {
                        xs: 92,
                        md: 108,
                      },

                      height: {
                        xs: 92,
                        md: 108,
                      },

                      borderRadius: "50%",

                      background:
                        "linear-gradient(135deg, #8BC53F, #b2e565)",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      color: "#08142e",

                      mb: 1.2,

                      transition: "0.35s",

                      boxShadow:
                        "0 14px 32px rgba(139,197,63,0.28)",

                      border:
                        "6px solid rgba(255,255,255,0.80)",

                      position: "relative",

                      overflow: "hidden",

                      "&::before": {
                        content: '""',

                        position: "absolute",

                        width: 90,

                        height: 90,

                        borderRadius: "50%",

                        background:
                          "rgba(255,255,255,0.14)",

                        top: -40,

                        right: -20,
                      },

                      "& svg": {
                        fontSize: {
                          xs: 38,
                          md: 44,
                        },

                        position: "relative",

                        zIndex: 2,
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography
                    sx={{
                      color: "#08142e",

                      fontWeight: 800,

                      lineHeight: 1.35,

                      fontSize: {
                        xs: "11px",
                        md: "12px",
                      },

                      maxWidth: "90px",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* BUTTONS */}
            <Box
              sx={{
                display: "flex",

                justifyContent: "center",

                gap: 1.2,

                flexWrap: "wrap",

                mt: 2.5,
              }}
            >
              <Link
                href="/contact"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: "#8BC53F",

                    borderRadius: "40px",

                    px: 3,

                    py: 0.9,

                    fontWeight: 700,

                    textTransform: "none",

                    fontSize: "13px",

                    boxShadow:
                      "0 10px 22px rgba(139,197,63,0.20)",

                    "&:hover": {
                      background: "#74ab35",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Link>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: "40px",

                  px: 3,

                  py: 0.9,

                  fontWeight: 700,

                  textTransform: "none",

                  fontSize: "13px",

                  background: "#ffffff",

                  borderColor:
                    "rgba(15,23,42,0.10)",

                  color: "#08142e",

                  "&:hover": {
                    borderColor: "#8BC53F",

                    background:
                      "rgba(139,197,63,0.05)",
                  },
                }}
              >
                Explore
              </Button>
            </Box>
          </Box>

          {/* RIGHT VIDEO */}
          <Box
            sx={{
              position: "relative",

              borderRadius: "30px",

              overflow: "hidden",

              minHeight: {
                xs: "260px",
                md: "100%",
              },

              background:
                "linear-gradient(145deg, #ffffff, #f6fbf1)",

              boxShadow:
                "0 22px 55px rgba(0,0,0,0.08)",

              p: 1,

              border:
                "1px solid rgba(139,197,63,0.10)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              transition: "0.35s",

              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            {/* VIDEO */}
            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{
                width: "100%",
                height: "100%",

                objectFit: "contain",

                borderRadius: "22px",

                background: "#eef5e8",

                display: "block",
              }}
            >
              <source
                src="/videos/VIDEO.mp4"
                type="video/mp4"
              />
            </video>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}