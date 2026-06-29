"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import SpeedIcon from "@mui/icons-material/Speed";

import SavingsIcon from "@mui/icons-material/Savings";

import SecurityIcon from "@mui/icons-material/Security";

import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <SupportAgentIcon />,

      title:
        "Single Point Of Contact",

      desc:
        "One dedicated team managing all your IT infrastructure and technology requirements.",
    },

    {
      icon: <SpeedIcon />,

      title:
        "Faster Response Time",

      desc:
        "Quick issue resolution and centralized support for seamless operations.",
    },

    {
      icon: <SavingsIcon />,

      title:
        "Cost Efficient Solutions",

      desc:
        "Reduce operational and maintenance costs with unified enterprise solutions.",
    },

    {
      icon: <SecurityIcon />,

      title:
        "Stronger Security System",

      desc:
        "Advanced surveillance, firewall and enterprise-grade protection for your business.",
    },

    {
      icon:
        <IntegrationInstructionsIcon />,

      title:
        "Seamless Integration",

      desc:
        "Smooth coordination across networking, automation and infrastructure systems.",
    },

    {
      icon:
        <TrendingUpIcon />,

      title:
        "Scalable Infrastructure",

      desc:
        "Future-ready solutions designed to grow with your business operations.",
    },
  ];

  return (
    <Box
      sx={{
        py: {
          xs: 4,
          md: 4.5,
        },

        background:
          "linear-gradient(135deg, #08142e 0%, #102048 55%, #8BC53F 180%)",

        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* PREMIUM GLOW */}
      <Box
        sx={{
          position: "absolute",

          width: 300,

          height: 300,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.10)",

          top: -120,

          right: -120,

          filter: "blur(90px)",
        }}
      />

      <Container maxWidth="xl">
        {/* TOP TITLE */}
        <Box
          sx={{
            textAlign: "center",

            mb: {
              xs: 2.5,
              md: 3,
            },
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
                "rgba(255,255,255,0.08)",

              border:
                "1px solid rgba(255,255,255,0.12)",

              mb: 1.2,
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
              Why Businesses Choose Us
            </Typography>
          </Box>

          {/* HEADING */}
          <Typography
            sx={{
              color: "#ffffff",

              textAlign: "center",

              fontWeight: 900,

              lineHeight: 1.08,

              letterSpacing: "-0.8px",

              mb: 0.8,

              fontSize: {
                xs: "22px",
                md: "34px",
              },
            }}
          >
            One Partner.{" "}
            <Box
              component="span"
              sx={{
                color: "#8BC53F",
              }}
            >
              All Solutions.
            </Box>
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.76)",

              maxWidth: "620px",

              mx: "auto",

              lineHeight: 1.7,

              fontSize: {
                xs: "11.5px",
                md: "13px",
              },
            }}
          >
            Centralized networking,
            surveillance, automation and
            enterprise technology solutions
            under one roof.
          </Typography>
        </Box>

        {/* DESKTOP VIEW */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "grid",
            },

            gridTemplateColumns:
              "1fr 1fr 1fr",

            borderTop:
              "1px solid rgba(255,255,255,0.16)",

            borderLeft:
              "1px solid rgba(255,255,255,0.16)",

            borderRadius: "10px",

            overflow: "hidden",

            backdropFilter: "blur(12px)",
          }}
        >
          {features.map((item, index) => (
            <Box
              key={index}
              sx={{
                minHeight: "205px",

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",

                textAlign: "center",

                px: 2.2,

                py: 2.5,

                borderRight:
                  "1px solid rgba(255,255,255,0.16)",

                borderBottom:
                  "1px solid rgba(255,255,255,0.16)",

                transition: "0.35s",

                "&:hover": {
                  background:
                    "rgba(255,255,255,0.04)",

                  transform:
                    "translateY(-3px)",
                },
              }}
            >
              {/* ICON */}
              <Box
                sx={{
                  width: 62,

                  height: 62,

                  borderRadius: "50%",

                  background:
                    "rgba(255,255,255,0.08)",

                  backdropFilter: "blur(10px)",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  color: "#ffffff",

                  mb: 1.5,

                  "& svg": {
                    fontSize: 34,
                  },
                }}
              >
                {item.icon}
              </Box>

              {/* TITLE */}
              <Typography
                sx={{
                  color: "#ffffff",

                  fontWeight: 800,

                  lineHeight: 1.35,

                  textTransform: "uppercase",

                  fontSize: "15px",

                  mb: 0.9,
                }}
              >
                {item.title}
              </Typography>

              {/* DESC */}
              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.70)",

                  lineHeight: 1.65,

                  maxWidth: "250px",

                  fontSize: "12px",
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* MOBILE VIEW */}
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1.08}
            centeredSlides={true}
            spaceBetween={16}
            loop={true}
          >
            {features.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    minHeight: "220px",

                    borderRadius: "24px",

                    background:
                      "rgba(255,255,255,0.08)",

                    backdropFilter: "blur(14px)",

                    border:
                      "1px solid rgba(255,255,255,0.14)",

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    justifyContent: "center",

                    textAlign: "center",

                    px: 2.5,

                    py: 3,
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 62,

                      height: 62,

                      borderRadius: "50%",

                      background:
                        "rgba(255,255,255,0.10)",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      color: "#ffffff",

                      mb: 1.6,

                      "& svg": {
                        fontSize: 34,
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography
                    sx={{
                      color: "#ffffff",

                      fontWeight: 800,

                      lineHeight: 1.35,

                      textTransform:
                        "uppercase",

                      fontSize: "16px",

                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    sx={{
                      color:
                        "rgba(255,255,255,0.74)",

                      lineHeight: 1.7,

                      fontSize: "12px",
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}