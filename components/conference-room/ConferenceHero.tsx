"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

interface ConferenceHeroProps {
  onExplore: () => void;
}

export default function ConferenceHero({
  onExplore,
}: ConferenceHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: {
          xs: "82vh",
          sm: "86vh",
          md: "calc(100vh - 94px)",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#06142c",
      }}
    >
      {/* BACKGROUND VIDEO */}

      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        // TODO: replace with your own poster still
        poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: {
            xs: 0.38,
            md: 0.55,
          },
        }}
      >
        <source
          src="/conference/videos/conference-hero.mp4"
          type="video/mp4"
        />
      </Box>

      {/* SUBTLE GRID TEXTURE */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 30% 30%, black 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* DARK OVERLAY */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              90deg,
              rgba(4,14,33,.97) 0%,
              rgba(4,14,33,.86) 38%,
              rgba(4,14,33,.5) 72%,
              rgba(4,14,33,.3) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4,14,33,.15),
              rgba(4,14,33,.78)
            )
          `,
        }}
      />

      {/* GREEN LIGHT */}

      <Box
        sx={{
          position: "absolute",
          width: { xs: 280, sm: 420, md: 620 },
          height: { xs: 280, sm: 420, md: 620 },
          right: { xs: -150, md: -200 },
          top: { xs: -110, md: -200 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(40,203,137,.28),transparent 68%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* SECONDARY BLUE LIGHT — adds depth/balance */}

      <Box
        sx={{
          position: "absolute",
          width: { xs: 240, sm: 340, md: 480 },
          height: { xs: 240, sm: 340, md: 480 },
          left: { xs: -140, md: -160 },
          bottom: { xs: -120, md: -160 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(56,120,255,.18),transparent 70%)",
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            py: { xs: 10, sm: 12, md: 14, lg: 16 },
          }}
        >
          {/* LABEL */}

          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              minHeight: 34,
              px: 1.5,
              borderRadius: "999px",
              color: "#b9ffe3",
              backgroundColor: "rgba(24,190,130,.13)",
              border: "1px solid rgba(130,255,210,.2)",
              backdropFilter: "blur(12px)",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: ".12em",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#4de0a2",
                boxShadow: "0 0 8px rgba(77,224,162,.9)",
              }}
            />
            CONFERENCE ROOM SOLUTIONS
          </Box>

          {/* HEADING */}

          <Typography
            component="h1"
            sx={{
              mt: 3,
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: 43, sm: 56, md: 72, lg: 88 },
              lineHeight: { xs: 1.02, md: 0.98 },
              letterSpacing: "-.055em",
              maxWidth: 850,
            }}
          >
            The room
            <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg,#fff,#72e8bd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              becomes smarter.
            </Box>
          </Typography>

          {/* DESCRIPTION */}

          <Typography
            sx={{
              mt: { xs: 2.5, md: 3.5 },
              width: "100%",
              maxWidth: 680,
              color: "rgba(255,255,255,.72)",
              fontSize: { xs: 15, sm: 16, md: 19 },
              lineHeight: 1.75,
            }}
          >
            Transform your meeting space into a premium
            communication environment with intelligent
            video conferencing, immersive displays,
            professional audio and seamless room control.
          </Typography>

          {/* ACTIONS */}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: { xs: 3.5, md: 4.5 },
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            <Button
              type="button"
              variant="contained"
              onClick={onExplore}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                minHeight: 56,
                px: { xs: 2.5, sm: 3.5 },
                borderRadius: "15px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: 15,
                color: "#06152b",
                background: "linear-gradient(135deg,#a5f7d5,#49d99d)",
                boxShadow: "0 15px 40px rgba(54,224,158,.22)",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": {
                  background: "linear-gradient(135deg,#8deec8,#35c88d)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 18px 45px rgba(54,224,158,.28)",
                },
              }}
            >
              Design My Conference Room
            </Button>

            <Button
              component="a"
              href="#project-video"
              variant="outlined"
              startIcon={<PlayCircleOutlineRoundedIcon />}
              sx={{
                minHeight: 56,
                px: { xs: 2.5, sm: 3.5 },
                borderRadius: "15px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 15,
                color: "#fff",
                border: "1px solid rgba(255,255,255,.25)",
                backgroundColor: "rgba(255,255,255,.06)",
                backdropFilter: "blur(12px)",
                transition: "transform .2s ease, background-color .2s ease",
                "&:hover": {
                  borderColor: "rgba(255,255,255,.55)",
                  backgroundColor: "rgba(255,255,255,.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              See Our Projects
            </Button>
          </Stack>

          {/* TRUST POINTS */}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 2, md: 3 },
              mt: { xs: 4.5, md: 6 },
            }}
          >
            {[
              "Professional AV Integration",
              "End-to-End Installation",
              "After-Sales Support",
            ].map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "rgba(255,255,255,.68)",
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#4de0a2",
                    boxShadow: "0 0 12px rgba(77,224,162,.8)",
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: 11.5, sm: 12.5, md: 13 },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* FLOATING PREVIEW CARD — decorative, only shows on larger screens */}

      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          right: { md: 48, lg: 90 },
          bottom: { md: 64, lg: 90 },
          display: { xs: "none", lg: "block" },
          width: 260,
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.15)",
          boxShadow: "0 30px 70px rgba(0,0,0,.45)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          component="img"
          // TODO: replace with a real project photo
          src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80"
          alt="Conference room preview"
          sx={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            px: 2,
            py: 1.5,
            backgroundColor: "rgba(6,20,43,.9)",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Latest Install
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,.6)",
              fontSize: 11.5,
              mt: 0.25,
            }}
          >
            Executive boardroom, 40-seat capacity
          </Typography>
        </Box>
      </Box>

      {/* SCROLL INDICATOR */}

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 25,
          transform: "translateX(-50%)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          color: "rgba(255,255,255,.45)",
          zIndex: 3,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: 10,
            letterSpacing: ".2em",
            fontWeight: 700,
          }}
        >
          SCROLL
        </Typography>
        <Box
          sx={{
            width: "1px",
            height: 40,
            background: "linear-gradient(#fff,transparent)",
          }}
        />
      </Box>
    </Box>
  );
}