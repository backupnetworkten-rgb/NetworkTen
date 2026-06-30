"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const GRID_TILES = [
  {
    src: "/images/solutions/cctv.png",
    title: "Enterprise CCTV",
    desc: "AI Surveillance & Monitoring",
    icon: SecurityRoundedIcon,
  },
  {
    src: "/images/solutions/networking.png",
    title: "Wireless Networking",
    desc: "High Speed WiFi Infrastructure",
    icon: WifiRoundedIcon,
  },
  {
    src: "/images/solutions/access.png",
    title: "Access Control",
    desc: "Smart Authentication Systems",
    icon: LockRoundedIcon,
  },
  {
    src: "/images/solutions/conferencing.png",
    title: "Video Conferencing",
    desc: "Seamless Collaboration Solutions",
    icon: GroupsRoundedIcon,
  },
];

const WIDE_TILE = {
  src: "/images/solutions/cabling.png",
  title: "Certified Installation",
  desc: "Professional Site Deployment",
  icon: VerifiedUserRoundedIcon,
};

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f6f8fb",
        color: "#0c1a2e",
        pt: { xs: 7, md: 9 },
        pb: { xs: 7, md: 8 },
      }}
    >
      {/* Dot grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(12,26,46,.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Top-right glow */}
      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          right: -100,
          top: -140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,197,63,.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom-left glow */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          left: -80,
          bottom: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,197,63,.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1.05fr" },
            gap: { xs: 4, lg: 5 },
            alignItems: "center",
          }}
        >
          {/* ── LEFT ── */}
          <Box>
            {/* Pill badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "rgba(139,197,63,.1)",
                border: "1px solid rgba(139,197,63,.3)",
                borderRadius: "20px",
                px: 1.5,
                py: "5px",
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#6fa52e",
                  boxShadow: "0 0 6px rgba(111,165,46,.8)",
                }}
              />
              <Typography sx={{ color: "#5c9128", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase" }}>
                Enterprise Solutions
              </Typography>
            </Box>

            {/* Heading */}
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 30, md: 42 },
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                mb: 2,
              }}
            >
              Smart Infrastructure
              <br />
              For Modern{" "}
              <Box component="span" sx={{ color: "#6fa52e" }}>
                Businesses
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                color: "rgba(12,26,46,.6)",
                fontSize: 14.5,
                lineHeight: 1.75,
                maxWidth: 460,
                mb: 4,
              }}
            >
              NetworkTen delivers enterprise networking, surveillance, access control,
              structured cabling, video conferencing and automation — built for offices,
              industries and commercial environments.
            </Typography>

            {/* CTAs */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.75}>
              <Button
                component={Link}
                href="/products"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  height: 50,
                  px: "22px",
                  borderRadius: "14px",
                  background: "#6fa52e",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                  textTransform: "none",
                  boxShadow: "0 4px 18px rgba(111,165,46,.28)",
                  transition: "all .2s",
                  "&:hover": {
                    background: "#5c8c24",
                    boxShadow: "0 6px 22px rgba(111,165,46,.36)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Explore Products
              </Button>

              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                sx={{
                  height: 50,
                  px: "22px",
                  borderRadius: "14px",
                  color: "#0c1a2e",
                  borderColor: "rgba(12,26,46,.18)",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 13.5,
                  transition: "all .2s",
                  "&:hover": {
                    borderColor: "rgba(12,26,46,.32)",
                    background: "rgba(12,26,46,.03)",
                  },
                }}
              >
                Contact Experts
              </Button>
            </Stack>
          </Box>

          {/* ── RIGHT: Premium image collage panel ── */}
          <Box
            sx={{
              position: "relative",
              background: "#fff",
              border: "1.5px solid #0c1a2e",
              borderRadius: "22px",
              p: { xs: 1.25, sm: 1.5 },
              boxShadow: "0 20px 50px rgba(12,26,46,.1)",
            }}
          >
            {/* 2x2 grid of equal tiles */}
            <Box
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: { xs: 1, sm: 1.25 },
              }}
            >
              {GRID_TILES.map((tile) => {
                const Icon = tile.icon;
                return (
                  <Box
                    key={tile.title}
                    sx={{
                      position: "relative",
                      height: { xs: 120, sm: 140, md: 152 },
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid rgba(12,26,46,.15)",
                    }}
                  >
                    <Image
                      src={tile.src}
                      alt={tile.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 900px) 45vw, 22vw"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(7,17,31,0) 35%, rgba(7,17,31,.88) 100%)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "7px",
                          bgcolor: "rgba(255,255,255,.12)",
                          backdropFilter: "blur(6px)",
                          border: "1px solid rgba(255,255,255,.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 13, color: "#8BC53F" }} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: { xs: 10.5, sm: 11.5 },
                            fontWeight: 800,
                            color: "#fff",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {tile.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: 8.5, sm: 9.5 },
                            color: "rgba(255,255,255,.6)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {tile.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Wide tile below the 2x2 grid */}
            <Box
              sx={{
                position: "relative",
                mt: { xs: 1, sm: 1.25 },
                height: { xs: 86, sm: 96, md: 104 },
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(12,26,46,.15)",
              }}
            >
              <Image
                src={WIDE_TILE.src}
                alt={WIDE_TILE.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 90vw, 45vw"
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(7,17,31,.82) 30%, rgba(7,17,31,.18) 100%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 14,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.1,
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "9px",
                    bgcolor: "rgba(255,255,255,.12)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <WIDE_TILE.icon sx={{ fontSize: 16, color: "#8BC53F" }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
                    {WIDE_TILE.title}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>
                    {WIDE_TILE.desc}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}