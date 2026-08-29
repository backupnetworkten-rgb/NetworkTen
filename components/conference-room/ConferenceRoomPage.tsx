"use client";

import { useRef } from "react";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

import ConferenceHero from "./ConferenceHero";
import ConferenceSolutions from "./ConferenceSolutions";
import ConferenceShowcase from "./ConferenceShowcase";
import ConferenceGallery from "./ConferenceGallery";
import ConferenceProcess from "./ConferenceProcess";
import ConferenceTrust from "./ConferenceTrust";
import ConferenceCTA from "./ConferenceCTA";

export default function ConferenceRoomPage() {
  const solutionsRef = useRef<HTMLDivElement>(null);

  const scrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f7f8fa",
        color: "#07152f",
      }}
    >
      {/* HERO */}
      <ConferenceHero onExplore={scrollToSolutions} />

      {/* INTRO */}
      <Box
        component="section"
        sx={{
          position: "relative",
          py: { xs: 8, sm: 10, md: 14 },
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        {/* faint decorative backdrop */}
        <Box
          sx={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(16,168,117,.06),transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1fr) minmax(0, 1fr)",
              },
              gap: { xs: 5, md: 8, lg: 10 },
              alignItems: "center",
            }}
          >
            {/* CONTENT */}

            <Box>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  minHeight: 34,
                  borderRadius: "999px",
                  backgroundColor: "rgba(16,168,117,0.09)",
                  color: "#07966b",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#10a875",
                  }}
                />
                SMART CONFERENCE SPACES
              </Box>

              <Typography
                component="h2"
                sx={{
                  mt: 2.5,
                  fontSize: { xs: 34, sm: 42, md: 48, lg: 54 },
                  lineHeight: 1.06,
                  fontWeight: 800,
                  letterSpacing: "-0.045em",
                }}
              >
                Meetings that feel{" "}
                <Box component="span" sx={{ color: "#10a875" }}>
                  effortless.
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 620,
                  color: "#667085",
                  fontSize: { xs: 15, sm: 16, md: 18 },
                  lineHeight: 1.8,
                }}
              >
                We design and integrate premium conference
                rooms that combine video conferencing,
                crystal-clear audio, professional displays,
                wireless presentation and intelligent room
                control into one seamless experience.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  mt: 4,
                  alignItems: { xs: "stretch", sm: "center" },
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={scrollToSolutions}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    minHeight: 52,
                    px: 3,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#0dbb80,#73c83d)",
                    boxShadow: "0 14px 35px rgba(16,168,117,.20)",
                    transition: "transform .2s ease, box-shadow .2s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg,#099b6c,#61b632)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 18px 42px rgba(16,168,117,.28)",
                    },
                  }}
                >
                  Explore Solutions
                </Button>

                <Button
                  component="a"
                  href="#project-video"
                  variant="outlined"
                  startIcon={<PlayArrowRoundedIcon />}
                  sx={{
                    minHeight: 52,
                    px: 3,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#07152f",
                    borderColor: "#d9dee7",
                    transition: "border-color .2s ease, background-color .2s ease",
                    "&:hover": {
                      borderColor: "#10a875",
                      backgroundColor: "rgba(16,168,117,.04)",
                    },
                  }}
                >
                  Watch Our Work
                </Button>
              </Stack>

              {/* MINI STATS ROW — adds premium credibility touch */}
              <Stack
                direction="row"
                spacing={{ xs: 3, md: 4 }}
                sx={{
                  mt: { xs: 5, md: 6 },
                  pt: { xs: 3, md: 3.5 },
                  borderTop: "1px solid #eef0f3",
                }}
              >
                {[
                  { value: "250+", label: "Rooms Delivered" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "24/7", label: "Support Coverage" },
                ].map((stat) => (
                  <Box key={stat.label}>
                    <Typography
                      sx={{
                        fontSize: { xs: 20, md: 24 },
                        fontWeight: 800,
                        color: "#07152f",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.25,
                        fontSize: { xs: 11.5, md: 12.5 },
                        color: "#8a94a6",
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* IMAGE */}

            <Box
              sx={{
                position: "relative",
                width: "100%",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: { xs: "20px", md: "30px" },
                  boxShadow: "0 30px 80px rgba(7,21,47,.14)",
                }}
              >
                <Box
                  component="img"
                  // TODO: replace with your own project photo
                  src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=80"
                  alt="Premium conference room"
                  loading="lazy"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: { xs: 340, sm: 420, md: 520 },
                    objectFit: "cover",
                    transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
                    "&:hover": {
                      transform: "scale(1.04)",
                    },
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,transparent 35%,rgba(0,0,0,.68))",
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 20, md: 30 },
                    right: { xs: 20, md: 30 },
                    bottom: { xs: 20, md: 30 },
                    color: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      color: "#8df2c4",
                    }}
                  >
                    DESIGNED FOR BUSINESS
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: { xs: 21, md: 29 },
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}
                  >
                    One room. Complete experience.
                  </Typography>
                </Box>
              </Box>

              {/* FLOATING VIDEO-PREVIEW CARD — overlaps bottom-left of image */}
              <Box
                component="a"
                href="#project-video"
                sx={{
                  position: "absolute",
                  left: { xs: 16, md: -28 },
                  bottom: { xs: -20, md: -28 },
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  pr: 2.5,
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  boxShadow: "0 20px 45px rgba(7,21,47,.18)",
                  textDecoration: "none",
                  transition: "transform .2s ease, box-shadow .2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 24px 55px rgba(7,21,47,.22)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg,#0dbb80,#73c83d)",
                    color: "#fff",
                  }}
                >
                  <VideocamRoundedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: "#07152f",
                      lineHeight: 1.2,
                    }}
                  >
                    Watch Project Reel
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#8a94a6",
                      fontWeight: 600,
                    }}
                  >
                    2 min walkthrough
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* SOLUTIONS */}

      <Box
        ref={solutionsRef}
        component="section"
        sx={{
          scrollMarginTop: "100px",
        }}
      >
        <ConferenceSolutions />
      </Box>

      {/* VIDEO */}

      <ConferenceShowcase />

      {/* GALLERY */}

      <ConferenceGallery />

      {/* PROCESS */}

      <ConferenceProcess />

      {/* TRUST */}

      <ConferenceTrust />

      {/* CTA */}

      <ConferenceCTA />

      {/* WHATSAPP */}

      <Box
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 22, md: 26 },
          bottom: { xs: 16, sm: 22, md: 26 },
          zIndex: 1000,
        }}
      >
        {/* pulse ring */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: "rgba(37,211,102,.55)",
            animation: "wa-pulse 2.2s ease-out infinite",
            "@keyframes wa-pulse": {
              "0%": { transform: "scale(1)", opacity: 0.6 },
              "100%": { transform: "scale(1.8)", opacity: 0 },
            },
          }}
        />

        <Box
          component="a"
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          sx={{
            position: "relative",
            width: { xs: 54, sm: 58 },
            height: { xs: 54, sm: 58 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#25D366",
            color: "#fff",
            boxShadow: "0 14px 35px rgba(37,211,102,.35)",
            textDecoration: "none",
            transition: "transform .25s ease, box-shadow .25s ease",
            "&:hover": {
              transform: "translateY(-4px) scale(1.04)",
              boxShadow: "0 20px 45px rgba(37,211,102,.45)",
            },
          }}
        >
          <WhatsAppIcon />
        </Box>
      </Box>
    </Box>
  );
}