"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
  Button,
} from "@mui/material";

import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PartnersSection from "../../components/partners/PartnersSection";
import PillarsSection from "../../components/pillars/PillarsSection";
import InstallationSupportSection from "../../components/install/InstallationSupportSection";

import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg,#08142e 0%,#102048 100%)",
          pt: { xs: 5, md: 6 },
          pb: { xs: 4, md: 5 },
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(139,197,63,0.12)",
            top: -120,
            right: -120,
            filter: "blur(110px)",
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            {/* TAG */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 0.7,
                borderRadius: "40px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                mb: 1.6,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontSize: "10px",
                }}
              >
                About NetworkTen
              </Typography>
            </Box>

            {/* HEADING */}
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-1px",
                mb: 1.5,
                fontSize: { xs: "30px", md: "52px" },
              }}
            >
              Smart Business
              <Box component="span" sx={{ color: "#8BC53F", ml: 1 }}>
                Solutions
              </Box>
            </Typography>

            {/* TEXT */}
            <Typography
              sx={{
                color: "rgba(255,255,255,0.70)",
                maxWidth: "720px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: { xs: "13px", md: "14px" },
                mb: 2.5,
              }}
            >
              Premium networking, surveillance, automation and smart office
              solutions designed for modern businesses and commercial
              environments.
            </Typography>

            {/* BUTTONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.2,
                flexWrap: "wrap",
              }}
            >
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg,#8BC53F,#74ab35)",
                    borderRadius: "50px",
                    px: 3.5,
                    py: 1.1,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "13px",
                    boxShadow: "0 12px 24px rgba(139,197,63,0.22)",
                    transition: "0.3s",
                    "&:hover": {
                      background: "#74ab35",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Link>

              <Link href="/solutions" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    px: 3.5,
                    py: 1.1,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "13px",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.16)",
                    "&:hover": {
                      borderColor: "#8BC53F",
                      background: "rgba(139,197,63,0.06)",
                    },
                  }}
                >
                  Explore Solutions
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ABOUT SECTION */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#fff" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "stretch",
            }}
          >
            {/* IMAGE — matches height of text column, premium framed look */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "auto", md: "100%" },
                aspectRatio: { xs: "4 / 3", md: "auto" },
                minHeight: { md: 460 },
              }}
            >
              {/* decorative offset border frame for a premium layered look */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: -12, md: -16 },
                  left: { xs: -12, md: -16 },
                  right: { xs: 12, md: 16 },
                  bottom: { xs: 12, md: 16 },
                  borderRadius: "26px",
                  border: "2px solid rgba(139,197,63,0.35)",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  borderRadius: "26px",
                  overflow: "hidden",
                  background: "#08142e",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 28px 60px rgba(8,20,46,0.20)",
                  border: "1px solid rgba(8,20,46,0.06)",
                  zIndex: 1,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                  alt="NetworkTen smart business technology"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* top gradient so the logo stays legible */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: "30%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* NETWORK TEN watermark — top right */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 14, md: 18 },
                    right: { xs: 14, md: 18 },
                    zIndex: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      fontSize: { xs: "12px", md: "14px" },
                      textShadow: "0 2px 6px rgba(0,0,0,.6)",
                    }}
                  >
                    NETWORK
                    <Box component="span" sx={{ color: "#8BC53F", ml: 0.5 }}>
                      TEN
                    </Box>
                  </Typography>
                </Box>

                {/* bottom gradient for legibility behind the badge */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "45%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(8,20,46,.55) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </Box>

              {/* PREMIUM "10+" FLOATING BADGE — anchored at bottom of image, slightly overlapping */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 16, md: -20 },
                  bottom: { xs: -18, md: -24 },
                  zIndex: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.4,
                  px: { xs: 2.2, md: 2.6 },
                  py: { xs: 1.4, md: 1.7 },
                  borderRadius: "20px",
                  background: "#fff",
                  boxShadow:
                    "0 20px 45px rgba(8,20,46,0.22), 0 2px 6px rgba(8,20,46,0.10)",
                  border: "1px solid rgba(8,20,46,0.06)",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 40, md: 46 },
                    height: { xs: 40, md: 46 },
                    flexShrink: 0,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg,#8BC53F,#74ab35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 20px rgba(139,197,63,0.30)",
                  }}
                >
                  <WorkspacePremiumRoundedIcon
                    sx={{ fontSize: { xs: 20, md: 24 }, color: "#fff" }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#102048",
                      fontWeight: 900,
                      lineHeight: 1,
                      fontSize: { xs: "22px", md: "26px" },
                    }}
                  >
                    10
                    <Box component="span" sx={{ color: "#8BC53F" }}>
                      +
                    </Box>
                  </Typography>
                  <Typography
                    sx={{
                      color: "#667085",
                      fontWeight: 700,
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      fontSize: { xs: "8.5px", md: "9.5px" },
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Years Experience
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* CONTENT */}
            <Box>
              <Typography
                sx={{
                  color: "#8BC53F",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontSize: "11px",
                  mb: 1.2,
                }}
              >
                Who We Are
              </Typography>

              <Typography
                sx={{
                  color: "#102048",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  mb: 2,
                  fontSize: { xs: "32px", md: "48px" },
                }}
              >
                Smart Technology
                <br />
                For Modern Businesses
              </Typography>

              <Typography
                sx={{
                  color: "#102048",
                  fontWeight: 700,
                  lineHeight: 1.9,
                  mb: 2,
                  fontSize: { xs: "14px", md: "15px" },
                }}
              >
                NetworkTen delivers network hardware, solutions, and consultancy, along with audio-video setups for conference rooms and auditoriums. We specialize in surveillance, automation, wireless devices, and custom software development streamlining daily business operations.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  lineHeight: 1.95,
                  mb: 2,
                  fontSize: { xs: "13px", md: "14px" },
                }}
              >
                We focus on building reliable, secure and future-ready
                technology environments with modern infrastructure,
                intelligent connectivity and professional execution.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  lineHeight: 1.95,
                  mb: 2,
                  fontSize: { xs: "13px", md: "14px" },
                }}
              >
                From smart surveillance and automation systems to
                enterprise-grade networking and conferencing, our team
                ensures every solution is designed with precision,
                performance and long-term reliability.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  lineHeight: 1.95,
                  fontSize: { xs: "13px", md: "14px" },
                }}
              >
                Our commitment to quality, innovation and customer
                satisfaction helps businesses create smarter, safer and more
                connected workspaces.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* PILLARS */}
      <PillarsSection />

      {/* PARTNERS SECTION */}
      <PartnersSection />

      <InstallationSupportSection />

      {/* PROJECTS / YOUTUBE */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: "linear-gradient(180deg,#ffffff,#f8fbff)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                color: "#8BC53F",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontSize: "11px",
                mb: 1,
              }}
            >
              Our Projects
            </Typography>

            <Typography
              sx={{
                color: "#102048",
                fontWeight: 900,
                lineHeight: 1.05,
                mb: 1,
                fontSize: { xs: "28px", md: "44px" },
              }}
            >
              Explore Our
              <Box component="span" sx={{ color: "#8BC53F", ml: 1 }}>
                Project Showcase
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#667085",
                lineHeight: 1.8,
                fontSize: { xs: "13px", md: "14px" },
                maxWidth: "650px",
                mx: "auto",
              }}
            >
              Discover our networking, surveillance and enterprise technology
              implementations.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 2.5,
            }}
          >
            {["GYZtK4wMw1U", "8hSERUUCl3c", "8c0WRZDnp4g"].map(
              (video, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "28px",
                    height: { xs: 230, md: 250 },
                    boxShadow: "0 20px 45px rgba(0,0,0,.06)",
                    transition: ".4s",
                    "&:hover": { transform: "translateY(-6px)" },
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video}`}
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </Box>
              )
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              component="a"
              href="https://youtube.com/@networkten7284"
              target="_blank"
              startIcon={<PlayCircleRoundedIcon />}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg,#8BC53F,#74ab35)",
                borderRadius: "50px",
                px: 4,
                py: 1.1,
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "none",
                boxShadow: "0 12px 25px rgba(139,197,63,.20)",
                "&:hover": { background: "#74ab35" },
              }}
            >
              View More Projects
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}