"use client";

import React, { useRef, useState } from "react";
import { Box, Typography, Container, Button, IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";

const videos = [
  { video: "/videos/Video1.mp4" },
  { video: "/videos/Video2.mp4" },
  { video: "/videos/Video3.mp4" },
];

export default function VideosSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState([false, false, false]);

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      const updated = [...playing];
      updated[index] = true;
      setPlaying(updated);
    } else {
      video.pause();
      const updated = [...playing];
      updated[index] = false;
      setPlaying(updated);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #08142e 0%, #102048 100%)",
      }}
    >
      {/* PREMIUM GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(139,197,63,0.10)",
          top: -140,
          right: -120,
          filter: "blur(110px)",
        }}
      />

      <Container maxWidth="xl">
        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: 2.5 }}>
          {/* TAG */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.6,
              px: 1.4,
              py: 0.45,
              borderRadius: "40px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              mb: 0.9,
            }}
          >
            <YouTubeIcon sx={{ color: "#ff0000", fontSize: 14 }} />
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Latest Videos
            </Typography>
          </Box>

          {/* TITLE */}
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 900,
              lineHeight: 1.08,
              mb: 0.6,
              fontSize: { xs: "22px", md: "32px" },
            }}
          >
            Watch Our
            <Box component="span" sx={{ color: "#8BC53F", ml: 1 }}>
              Latest Projects
            </Box>
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.68)",
              maxWidth: "620px",
              mx: "auto",
              lineHeight: 1.7,
              fontSize: { xs: "10px", md: "12px" },
            }}
          >
            Explore premium networking, conference and enterprise infrastructure solutions.
          </Typography>
        </Box>

        {/* VIDEO GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          {videos.map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: "26px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                transition: "0.35s",
                "&:hover": { transform: "translateY(-4px)" },
                "&:hover .pauseBtn": { opacity: 1 },
              }}
            >
              {/* VIDEO */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 220, md: 260 },
                  background: "#000",
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    background: "#000",
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* PLAY BUTTON */}
                {!playing[index] && (
                  <IconButton
                    onClick={() => handlePlayPause(index)}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 74,
                      height: 74,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.26)",
                        transform: "translate(-50%, -50%) scale(1.08)",
                      },
                      transition: "0.35s",
                    }}
                  >
                    <PlayArrowRoundedIcon sx={{ color: "#ffffff", fontSize: 48 }} />
                  </IconButton>
                )}

                {/* PAUSE BUTTON */}
                {playing[index] && (
                  <IconButton
                    className="pauseBtn"
                    onClick={() => handlePlayPause(index)}
                    sx={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 42,
                      height: 42,
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      opacity: 0,
                      transition: "0.3s",
                      "&:hover": { background: "rgba(0,0,0,0.65)" },
                    }}
                  >
                    <PauseRoundedIcon sx={{ color: "#ffffff", fontSize: 24 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* BUTTON */}
        <Box sx={{ textAlign: "center", mt: 2.5 }}>
          <Button
            component="a"
            href="https://www.youtube.com/@networkten7284"
            target="_blank"
            variant="contained"
            startIcon={<YouTubeIcon />}
            sx={{
              background: "linear-gradient(135deg, #ff0000, #cc0000)",
              color: "#ffffff",
              borderRadius: "40px",
              px: 3.5,
              py: 1,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "13px",
              boxShadow: "0 10px 24px rgba(255,0,0,0.26)",
              "&:hover": {
                background: "linear-gradient(135deg, #e60000, #b80000)",
                transform: "translateY(-2px)",
              },
              transition: "0.35s",
            }}
          >
            View More Videos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}