"use client";

import { useState } from "react";

import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const videos = [
  {
    id: "boardroom",
    title: "Executive Boardroom — 40 Seats",
    duration: "2:14",
    // TODO: replace with your own project video
    src: "https://storage.googleapis.com/coverr-main/mp4/Boardroom.mp4",
    // TODO: replace with your own poster still
    poster:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "huddle",
    title: "Huddle Room — Video Collaboration",
    duration: "1:48",
    // TODO: replace with your own project video
    src: "https://storage.googleapis.com/coverr-main/mp4/Team-Meeting.mp4",
    // TODO: replace with your own poster still
    poster:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "training",
    title: "Training Room — Display Wall",
    duration: "2:37",
    // TODO: replace with your own project video
    src: "https://storage.googleapis.com/coverr-main/mp4/Office-Presentation.mp4",
    // TODO: replace with your own poster still
    poster:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function ConferenceShowcase() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const activeVideo =
    videos.find((v) => v.id === activeId) ?? videos[0];

  return (
    <Box
      id="project-video"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        background: "#06142c",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <Box
        sx={{
          position: "absolute",
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          background:
            "radial-gradient(circle,rgba(94,230,173,.10),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 5,
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
              sx={{
                color: "#5ee6ad",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: ".16em",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#5ee6ad",
                  boxShadow: "0 0 8px rgba(94,230,173,.8)",
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".16em",
                  color: "inherit",
                }}
              >
                SEE IT IN ACTION
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 1.5,
                color: "#fff",
                fontSize: { xs: 35, md: 52 },
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-.04em",
              }}
            >
              We don't just design rooms.
              <br />
              <Box component="span" sx={{ color: "#62e7b0" }}>
                We build experiences.
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "rgba(255,255,255,.55)",
              maxWidth: 390,
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            See how our conference room solutions transform ordinary
            meeting spaces into intelligent collaboration environments.
          </Typography>
        </Box>

        {/* VIDEO FRAME */}
        <Box
          sx={{
            position: "relative",
            borderRadius: { xs: "24px", md: "34px" },
            p: "1px",
            background:
              "linear-gradient(135deg,rgba(94,230,173,.4),rgba(255,255,255,.08) 40%,rgba(94,230,173,.15))",
            boxShadow: "0 40px 100px rgba(0,0,0,.5)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: "23px", md: "33px" },
              background: "#000",
            }}
          >
            <Box
              key={activeVideo.id}
              component="video"
              controls
              playsInline
              poster={activeVideo.poster}
              sx={{
                width: "100%",
                display: "block",
                maxHeight: 700,
                objectFit: "cover",
                background: "#000",
              }}
            >
              <source src={activeVideo.src} type="video/mp4" />
            </Box>

            {/* top gradient for badge legibility */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 120,
                background:
                  "linear-gradient(180deg,rgba(0,0,0,.55),transparent)",
                pointerEvents: "none",
              }}
            />

            {/* duration badge, top-left */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
              sx={{
                position: "absolute",
                top: { xs: 16, md: 24 },
                left: { xs: 16, md: 24 },
                px: 1.5,
                py: 0.75,
                borderRadius: "999px",
                backgroundColor: "rgba(0,0,0,.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,.15)",
              }}
            >
              <FiberManualRecordRoundedIcon
                sx={{ fontSize: 9, color: "#ff5f57" }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".04em",
                }}
              >
                PROJECT REEL · {activeVideo.duration}
              </Typography>
            </Stack>

            {/* central play icon, decorative */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 84 },
                  height: { xs: 64, md: 84 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#07152f",
                  background: "linear-gradient(135deg,#fff,#d9fbec)",
                  boxShadow: "0 20px 50px rgba(0,0,0,.4)",
                }}
              >
                <PlayArrowRoundedIcon
                  sx={{ fontSize: { xs: 30, md: 40 } }}
                />
              </Box>
            </Box>

            {/* bottom-left caption chip */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: 16, md: 24 },
                bottom: { xs: 16, md: 24 },
                px: 2,
                py: 1,
                borderRadius: "12px",
                backgroundColor: "rgba(6,20,43,.55)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,.12)",
              }}
            >
              <Typography
                sx={{
                  color: "#8df2c4",
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: ".1em",
                }}
              >
                FEATURED INSTALL
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  mt: 0.25,
                }}
              >
                {activeVideo.title}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* THUMBNAIL SELECTOR ROW */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 3 }}
        >
          {videos.map((video) => {
            const isActive = video.id === activeId;
            return (
              <Box
                key={video.id}
                component="button"
                type="button"
                onClick={() => setActiveId(video.id)}
                sx={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  pr: 2,
                  borderRadius: "14px",
                  border: isActive
                    ? "1px solid rgba(94,230,173,.55)"
                    : "1px solid rgba(255,255,255,.1)",
                  backgroundColor: isActive
                    ? "rgba(94,230,173,.09)"
                    : "rgba(255,255,255,.03)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all .25s ease",
                  "&:hover": {
                    borderColor: "rgba(94,230,173,.4)",
                    backgroundColor: "rgba(94,230,173,.06)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    flexShrink: 0,
                    width: 64,
                    height: 44,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={video.poster}
                    alt={video.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,.25)",
                    }}
                  >
                    <PlayArrowRoundedIcon
                      sx={{ fontSize: 18, color: "#fff" }}
                    />
                  </Box>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: isActive ? "#8df2c4" : "#fff",
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "rgba(255,255,255,.5)",
                      fontWeight: 600,
                    }}
                  >
                    {video.duration}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}