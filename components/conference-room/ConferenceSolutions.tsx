"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import CastRoundedIcon from "@mui/icons-material/CastRounded";
import SettingsRemoteRoundedIcon from "@mui/icons-material/SettingsRemoteRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";

const solutions = [
  {
    number: "01",
    icon: <VideocamRoundedIcon />,
    title: "Video Conferencing",
    description:
      "Crystal-clear video collaboration for Microsoft Teams, Zoom, Google Meet and other platforms.",
    gradient: "linear-gradient(135deg,#10a875,#0dbb80)",
  },
  {
    number: "02",
    icon: <MicRoundedIcon />,
    title: "Professional Audio",
    description:
      "Advanced microphones, speakers and DSP solutions designed for natural conversations.",
    gradient: "linear-gradient(135deg,#3878ff,#5b93ff)",
  },
  {
    number: "03",
    icon: <TvRoundedIcon />,
    title: "Display Solutions",
    description:
      "Large professional displays, LED walls and interactive screens for powerful presentations.",
    gradient: "linear-gradient(135deg,#a855f7,#c084fc)",
  },
  {
    number: "04",
    icon: <CastRoundedIcon />,
    title: "Wireless Presentation",
    description:
      "Share your screen instantly without cables, adapters or complicated setup.",
    gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)",
  },
  {
    number: "05",
    icon: <SettingsRemoteRoundedIcon />,
    title: "Room Control",
    description:
      "Control displays, lighting, blinds, audio and conferencing from one simple interface.",
    gradient: "linear-gradient(135deg,#ec4899,#f472b6)",
  },
  {
    number: "06",
    icon: <LanRoundedIcon />,
    title: "Network Integration",
    description:
      "Reliable network infrastructure designed to support demanding collaboration environments.",
    gradient: "linear-gradient(135deg,#0891b2,#22d3ee)",
  },
];

export default function ConferenceSolutions() {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 9, md: 14 },
        background: "#f7f8fa",
        overflow: "hidden",
      }}
    >
      {/* decorative background accents */}
      <Box
        sx={{
          position: "absolute",
          top: -180,
          right: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(16,168,117,.07),transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(rgba(7,21,47,.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 55% 40% at 85% 0%, black 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 3,
            maxWidth: "100%",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ maxWidth: 780 }}>
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                color: "#10a875",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: ".16em",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10a875",
                }}
              />
              EVERYTHING CONNECTED
            </Box>

            <Typography
              sx={{
                mt: 2,
                fontSize: { xs: 35, md: 54 },
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-.045em",
              }}
            >
              Every detail works
              <br />
              <Box component="span" sx={{ color: "#10a875" }}>
                together.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                color: "#667085",
                fontSize: 17,
                lineHeight: 1.75,
                maxWidth: 620,
              }}
            >
              From the camera on the table to the display on the wall,
              we integrate every component into one professional meeting
              experience.
            </Typography>
          </Box>

          {/* running count, premium detail */}
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: 13,
              fontWeight: 700,
              color: "#a2a9b5",
              letterSpacing: ".08em",
              whiteSpace: "nowrap",
              pb: 1,
            }}
          >
            06 CORE CAPABILITIES
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {solutions.map((solution) => (
            <Grid
              key={solution.number}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  minHeight: 280,
                  p: { xs: 3, md: 4 },
                  borderRadius: "24px",
                  background: "#fff",
                  border: "1px solid #e9edf2",
                  transition: "all .35s cubic-bezier(.2,.8,.2,1)",
                  overflow: "hidden",

                  "&:before": {
                    content: '""',
                    position: "absolute",
                    width: 140,
                    height: 140,
                    right: -70,
                    bottom: -70,
                    borderRadius: "50%",
                    background: "rgba(16,168,117,.07)",
                    transition: "all .35s ease",
                  },

                  // top accent line that reveals on hover
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: solution.gradient,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
                  },

                  "&:hover": {
                    transform: "translateY(-7px)",
                    borderColor: "rgba(16,168,117,.3)",
                    boxShadow: "0 25px 60px rgba(7,21,47,.10)",
                  },

                  "&:hover:before": {
                    transform: "scale(2)",
                  },

                  "&:hover:after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    right: 27,
                    fontSize: 12,
                    color: "#c3c9d3",
                    fontWeight: 800,
                    letterSpacing: ".05em",
                  }}
                >
                  {solution.number}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    width: 58,
                    height: 58,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "17px",
                    color: "#fff",
                    background: solution.gradient,
                    mb: 4,
                    boxShadow: "0 12px 24px rgba(7,21,47,.16)",
                  }}
                >
                  {solution.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {solution.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    color: "#717b8d",
                    lineHeight: 1.7,
                    fontSize: 14.5,
                    maxWidth: 330,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {solution.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}