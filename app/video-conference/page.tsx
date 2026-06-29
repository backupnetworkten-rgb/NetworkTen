"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import VideoConferenceForm from "../../components/videoConference/VideoConferenceForm";

import { conferenceBenefits } from "../../components/videoConference/conferenceData";

import Image from "next/image";

export default function VideoConferencePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",

          overflow: "hidden",

          background:
            "linear-gradient(135deg,#040b16 0%,#08142e 50%,#102048 100%)",

          pt: {
            xs: 7,
            md: 8,
          },

          pb: {
            xs: 6,
            md: 7,
          },
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",

            width: 380,

            height: 380,

            borderRadius: "50%",

            background:
              "rgba(139,197,63,0.12)",

            top: -160,

            right: -120,

            filter: "blur(120px)",
          }}
        />

        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",

              zIndex: 2,

              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "#8BC53F",

                fontWeight: 700,

                textTransform:
                  "uppercase",

                letterSpacing:
                  "1.5px",

                fontSize: "11px",

                mb: 1.5,
              }}
            >
              Video Conference
            </Typography>

            <Typography
              sx={{
                color: "#fff",

                fontWeight: 900,

                lineHeight: 1,

                mb: 2,

                fontSize: {
                  xs: "36px",
                  md: "58px",
                },
              }}
            >
              Schedule A
              <Box
                component="span"
                sx={{
                  color: "#8BC53F",

                  ml: 1,
                }}
              >
                Meeting
              </Box>
            </Typography>

            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.72)",

                maxWidth: "720px",

                mx: "auto",

                lineHeight: 1.9,

                fontSize: {
                  xs: "13px",
                  md: "14px",
                },
              }}
            >
              Connect with our experts
              for networking,
              surveillance and business
              infrastructure discussions.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* MAIN SECTION */}
      <Box
        sx={{
          py: {
            xs: 5,
            md: 6,
          },

          background:
            "linear-gradient(to bottom,#f8fbff,#ffffff)",
        }}
      >
        <Container maxWidth="lg">
          {/* IMAGE */}
          <Box
            sx={{
              position: "relative",

              overflow: "hidden",

              borderRadius: "28px",

              mb: 4,

              minHeight: {
                xs: 220,
                md: 360,
              },

              boxShadow:
                "0 20px 45px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
              alt="Video Conference"
              fill
              style={{
                objectFit: "cover",
              }}
            />

            {/* OVERLAY */}
            <Box
              sx={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(to right,rgba(4,11,22,0.82),rgba(16,32,72,0.42))",
              }}
            />

            {/* CONTENT */}
            <Box
              sx={{
                position: "absolute",

                left: {
                  xs: 24,
                  md: 40,
                },

                bottom: {
                  xs: 24,
                  md: 40,
                },

                maxWidth: "540px",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",

                  fontWeight: 900,

                  lineHeight: 1.08,

                  mb: 1.2,

                  fontSize: {
                    xs: "28px",
                    md: "42px",
                  },
                }}
              >
                Connect With
                Our Experts
              </Typography>

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.74)",

                  lineHeight: 1.8,

                  fontSize: {
                    xs: "13px",
                    md: "14px",
                  },
                }}
              >
                Schedule a quick video
                consultation for business
                networking, surveillance,
                automation and technology
                solutions.
              </Typography>
            </Box>
          </Box>

          {/* CONTENT */}
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "0.9fr 1.1fr",
              },

              gap: 3,

              alignItems: "start",
            }}
          >
            {/* BENEFITS */}
            <Box
              sx={{
                background: "#fff",

                borderRadius: "28px",

                p: {
                  xs: 3,
                  md: 4,
                },

                border:
                  "1px solid rgba(8,20,46,0.05)",

                boxShadow:
                  "0 18px 45px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                sx={{
                  color: "#102048",

                  fontWeight: 800,

                  mb: 3,

                  fontSize: {
                    xs: "24px",
                    md: "30px",
                  },
                }}
              >
                Why Schedule
                A Meeting?
              </Typography>

              {conferenceBenefits.map(
                (item, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb:
                        index !==
                        conferenceBenefits.length -
                          1
                          ? 2.5
                          : 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          "#102048",

                        fontWeight:
                          700,

                        mb: 0.7,

                        fontSize:
                          "16px",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          "#667085",

                        lineHeight:
                          1.9,

                        fontSize:
                          "13px",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                )
              )}
            </Box>

            {/* FORM */}
            <VideoConferenceForm />
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}