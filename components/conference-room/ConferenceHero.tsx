
"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface ConferenceHeroProps {
  onExplore: () => void;
}

const benefits = [
  {
    title: "Smart AV Integration",
    description: "Audio, video and displays",
  },
  {
    title: "Complete Installation",
    description: "Planning to deployment",
  },
  {
    title: "Reliable Support",
    description: "Assistance when you need it",
  },
];

const features = [
  "Video Conferencing",
  "Professional AV",
  "Room Integration",
];

export default function ConferenceHero({
  onExplore,
}: ConferenceHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const projectVideoRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleSeeProjects = () => {
    projectVideoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleVideoMetadata = (
    event: SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;

    if (video.duration > 0 && Number.isFinite(video.duration)) {
      try {
        video.currentTime = Math.min(1.5, video.duration / 2);
      } catch {
        // Keep the browser's default starting position if seeking fails.
      }
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        isolation: "isolate",
        width: "100%",
        minHeight: { xs: "auto", md: "min(790px, calc(100vh - 80px))" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "#fff",
        background:
          "linear-gradient(115deg, #071327 0%, #0a1c35 58%, #081b29 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: 600,
          height: 600,
          top: -300,
          right: -100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(57,218,158,.15), transparent 70%)",
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: 550,
          height: 550,
          bottom: -360,
          left: -180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(54,109,235,.13), transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* SUBTLE BACKGROUND DETAIL */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          opacity: 0.09,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage:
            "linear-gradient(90deg, black, transparent 95%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2.5, sm: 4, md: 5, lg: 7 },
          py: { xs: 7, sm: 8, md: 7, lg: 8 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "minmax(0, 1.16fr) minmax(0, .84fr)",
            },
            alignItems: "center",
            columnGap: { xs: 0, md: 5, lg: 7 },
            rowGap: { xs: 5, md: 0 },
          }}
        >
          {/* LEFT CONTENT: USE THE AVAILABLE WIDTH */}
          <Box
            sx={{
              minWidth: 0,
              width: "100%",
              maxWidth: 730,
              justifySelf: "start",
            }}
          >
            {/* EYEBROW */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.85,
                borderRadius: "50px",
                border: "1px solid rgba(91,230,174,.25)",
                background: "rgba(44,191,133,.08)",
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  flexShrink: 0,
                  borderRadius: "50%",
                  background: "#5ce4a6",
                  boxShadow: "0 0 12px rgba(92,228,166,.6)",
                }}
              />

              <Typography
                component="span"
                sx={{
                  fontSize: { xs: 10, sm: 11 },
                  fontWeight: 800,
                  letterSpacing: ".13em",
                  color: "#b5f8d9",
                }}
              >
                CONFERENCE ROOM SOLUTIONS
              </Typography>
            </Box>

            {/* LARGE, CLEAN HEADLINE */}
            <Typography
              component="h1"
              sx={{
                mt: { xs: 3, md: 3.5 },
                mb: 0,
                fontSize: {
                  xs: "clamp(43px, 10vw, 58px)",
                  sm: "clamp(58px, 6.3vw, 76px)",
                  md: "clamp(53px, 4.5vw, 68px)",
                  lg: "clamp(65px, 4.7vw, 80px)",
                },
                lineHeight: { xs: 1.06, md: 1.04 },
                fontWeight: 800,
                letterSpacing: "-.058em",
                color: "#fff",
                overflowWrap: "break-word",
              }}
            >
              Smarter meetings.
              <Box
                component="span"
                sx={{
                  display: "block",
                  mt: 0.4,
                  pb: 0.5,
                  color: "#74e9b7",
                  background:
                    "linear-gradient(100deg, #d8ffed 0%, #70e6b4 75%, #50d69d 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Better spaces.
              </Box>
            </Typography>

            {/* HEADLINE SUPPORTING TEXT */}
            <Typography
              sx={{
                mt: 2.5,
                maxWidth: 590,
                fontSize: { xs: 15, sm: 16, md: 16.5 },
                lineHeight: 1.85,
                color: "rgba(231,240,255,.74)",
                fontWeight: 400,
              }}
            >
              Create a workplace that brings people, ideas and
              technology together. From professional audio and
              video conferencing to complete AV integration,
              we help make every meeting work better.
            </Typography>

            {/* PRIMARY ACTIONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                mt: 3.5,
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <Button
                type="button"
                onClick={onExplore}
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 53,
                  px: 2.6,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: 13.5,
                  fontWeight: 800,
                  color: "#06251b",
                  background:
                    "linear-gradient(135deg, #c1ffe4, #59dfa6)",
                  boxShadow: "0 10px 28px rgba(60,215,155,.17)",
                  transition: "all .2s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #ddffef, #7beaba)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 32px rgba(60,215,155,.24)",
                  },
                }}
              >
                Design My Conference Room
              </Button>

              <Button
                type="button"
                onClick={handleSeeProjects}
                variant="outlined"
                startIcon={<PlayArrowRoundedIcon />}
                sx={{
                  minHeight: 53,
                  px: 2.4,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#f5f8ff",
                  borderColor: "rgba(255,255,255,.22)",
                  background: "rgba(255,255,255,.035)",
                  transition: "all .2s ease",
                  "&:hover": {
                    borderColor: "#6cebb5",
                    background: "rgba(72,215,158,.09)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                See Our Projects
              </Button>
            </Stack>

            {/* BENEFITS: THREE CLEAN COLUMNS */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: { xs: 2, sm: 1.5, lg: 2 },
                mt: { xs: 4, md: 5 },
                pt: 3,
                borderTop: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {benefits.map((benefit) => (
                <Box
                  key={benefit.title}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.1,
                    minWidth: 0,
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      mt: 0.15,
                      fontSize: 18,
                      flexShrink: 0,
                      color: "#62e5ac",
                    }}
                  />

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "#f5f8ff",
                        fontSize: 11.5,
                        fontWeight: 750,
                        lineHeight: 1.5,
                      }}
                    >
                      {benefit.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.35,
                        color: "rgba(220,233,250,.56)",
                        fontSize: 10.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* RIGHT CONTENT: COMPACT PROJECT VIDEO */}
          <Box
            ref={projectVideoRef}
            id="project-video"
            sx={{
              minWidth: 0,
              width: "100%",
              maxWidth: { xs: "100%", md: 390, lg: 425 },
              justifySelf: { xs: "stretch", md: "end" },
              scrollMarginTop: "110px",
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,.12)",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.025) 55%, rgba(88,229,175,.12))",
                boxShadow: "0 25px 65px rgba(0,0,0,.3)",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "16px",
                  background: "#071326",
                }}
              >
                {/* VIDEO CARD HEADER */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    background:
                      "linear-gradient(110deg, #142943, #09182b)",
                    borderBottom:
                      "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#69e8b4",
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: ".13em",
                      }}
                    >
                      PROJECT SHOWCASE
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.4,
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      Latest Installation
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.7,
                      px: 1,
                      py: 0.6,
                      borderRadius: "50px",
                      border: "1px solid rgba(92,230,173,.2)",
                      background: "rgba(64,207,151,.08)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#5ce5a7",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 8.5,
                        fontWeight: 800,
                        color: "#a9f5d3",
                      }}
                    >
                      VIDEO TOUR
                    </Typography>
                  </Box>
                </Box>

                {/* VIDEO PLAYER */}
                <Box
                  component="video"
                  ref={videoRef}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={handleVideoMetadata}
                  onSeeked={() => setVideoReady(true)}
                  aria-label="Executive boardroom installation video"
                  sx={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    objectFit: "cover",
                    backgroundColor: "#111c2b",
                  }}
                >
                  <source
                    src="/conference/videos/conference-hero.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </Box>

                {/* VIDEO INFORMATION */}
                <Box sx={{ px: 2, py: 1.8 }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "-.02em",
                    }}
                  >
                    Executive Boardroom
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.6,
                      color: "rgba(226,238,255,.64)",
                      fontSize: 12,
                      lineHeight: 1.75,
                    }}
                  >
                    Professional AV integration and intelligent
                    conference room technology.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.8,
                      mt: 1.5,
                    }}
                  >
                    {features.map((feature) => (
                      <Box
                        key={feature}
                        sx={{
                          px: 1,
                          py: 0.65,
                          borderRadius: "7px",
                          border:
                            "1px solid rgba(255,255,255,.09)",
                          background: "rgba(255,255,255,.035)",
                          color: "rgba(239,246,255,.8)",
                          fontSize: 9.5,
                          fontWeight: 650,
                        }}
                      >
                        {feature}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.8,
                mt: 1.5,
              }}
            >
              <CheckCircleRoundedIcon
                sx={{ color: "#5bdfa4", fontSize: 15 }}
              />

              <Typography
                sx={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "rgba(228,240,255,.58)",
                }}
              >
                Integrated solutions. Thoughtful execution.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
