"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Chip, Fade } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

interface Industry {
  id: string;
  title: string;
  image: string;
  description: string;
  products: string[];
}

const industries: Industry[] = [
  {
    id: "banking",
    title: "Banking & Retail",
    image:
      "https://plus.unsplash.com/premium_photo-1769842895659-724d64bbafd7?w=900&auto=format&fit=crop&q=60",
    description:
      "Advanced surveillance, networking and automation solutions engineered for secure banking and high-footfall retail operations.",
    products: [
      "High End CCTV Camera",
      "Wifi Zone",
      "Access Control and Biometric",
      "Fire Alarm Solutions",
      "Mobile Boosters",
      "Mobile NVR, Camera and GPS",
      "Billing Desktops and Thermal Printers",
      "Solar Panel",
      "Digital Lock",
      "Public Address Audio System",
      "Telephone Exchange EPABX",
    ],
  },
  {
    id: "education",
    title: "Education",
    image:
      "https://images.unsplash.com/photo-1681164315051-add1906a9b07?w=900&auto=format&fit=crop&q=60",
    description:
      "Smart digital infrastructure designed for modern education campuses — from smart classrooms to campus-wide connectivity.",
    products: [
      "Smart Classes and Labs",
      "CCTV Camera",
      "Fire Alarm",
      "Buses Camera and GPS",
      "Servers",
      "Networking Equipments",
      "Billing Desktop and Printers",
      "IT Equipments",
      "Video Wall | Active LED Wall | Video Standys | Projectors",
      "Classroom Furniture and Chairs",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Pharma",
    image:
      "https://plus.unsplash.com/premium_photo-1681842931981-12ecdd712705?w=900&auto=format&fit=crop&q=60",
    description:
      "Reliable enterprise infrastructure and security systems built for the uptime and compliance demands of hospitals and pharma facilities.",
    products: [
      "High End CCTV Camera",
      "Access Control and Biometric",
      "Online Ups",
      "Solar Panel",
      "Conference Room and Auditorium Solution",
      "Billing Desktop and Printers",
      "Digital Lock",
      "Public Address Audio System",
      "Telephone Exchange EPABX",
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    image:
      "https://images.squarespace-cdn.com/content/v1/5512c58de4b07319c3fed0c7/1767016852691-G7N558EQZDHKL58CXQW3/2-99SUSHI.jpg",
    description:
      "Premium hospitality automation and guest experience solutions powered by modern, reliable technology.",
    products: [
      "High End CCTV Camera",
      "Fire Alarm",
      "Wifi Zone",
      "Network Equipments",
      "Servers",
      "Solar Panel",
      "Vehicle Camera and GPS",
      "Lockers",
      "Metal Detector Gate",
      "Telephone Exchange EPABX",
    ],
  },
  {
    id: "office",
    title: "Retail & Office",
    image:
      "https://images.unsplash.com/photo-1774494168068-0f716c3aafcf?w=900&auto=format&fit=crop&q=60",
    description:
      "Modern workplace technologies engineered for productivity, seamless collaboration and enterprise-grade security.",
    products: [
      "High End CCTV Camera",
      "Fire Alarm",
      "Wifi Zone",
      "Online Ups",
      "Billing Desktop and Thermal Printers",
      "Servers",
      "Solar Panel",
      "IT Equipments",
      "Lockers",
      "Public Address Audio System",
      "Metal Detector Gate",
      "Telephone Exchnage EPABX",
      "Conference Room and Auditorium Solution"
    ],
  },
  {
    id: "home",
    title: "Home | Villa | Farmhouse",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop",
    description:
      "Luxury automation, entertainment and surveillance systems built for modern smart living.",
    products: [
      "High End CCTV Camera",
      "Fire Alarm",
      "Wifi Zone",
      "Boundary Wall Wireless Solution",
      "Mobile Boosters",
      "Video Door Phone | Digital Lock",
      "Home Automation",
      "Intruders Automation Security Equipments",
      "Personal Home Theatre",
      "Lockers",
    ],
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle background glow */}
      <Box
        sx={{
          position: "absolute",
          width: 480,
          height: 480,
          left: -160,
          top: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,197,63,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
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
            <Typography
              sx={{
                color: "#5c9128",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "1.8px",
                textTransform: "uppercase",
              }}
            >
              Industry Expertise
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#0c1a2e",
              fontWeight: 800,
              fontSize: { xs: 26, md: 38 },
              lineHeight: 1.15,
              letterSpacing: "-1px",
              mb: 1.5,
            }}
          >
            Solutions Tailored For{" "}
            <Box component="span" sx={{ color: "#6fa52e" }}>
              Every Industry
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(12,26,46,.6)",
              fontSize: 14.5,
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Enterprise-grade networking, surveillance, automation and IT
            infrastructure — engineered around how each industry actually works.
          </Typography>
        </Box>

        {/* Main layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          {/* LEFT: Tab list */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              overflowX: { xs: "auto", md: "visible" },
              gap: 1,
              pb: { xs: 1, md: 0 },
            }}
          >
            {industries.map((item, index) => {
              const isActive = index === active;
              return (
                <Box
                  key={item.id}
                  onClick={() => setActive(index)}
                  sx={{
                    cursor: "pointer",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.6,
                    borderRadius: "14px",
                    border: isActive
                      ? "1.5px solid #6fa52e"
                      : "1.5px solid rgba(12,26,46,.08)",
                    background: isActive
                      ? "rgba(139,197,63,.08)"
                      : "transparent",
                    transition: "all .25s",
                    minWidth: { xs: 200, md: "auto" },
                    "&:hover": {
                      borderColor: isActive
                        ? "#6fa52e"
                        : "rgba(12,26,46,.2)",
                      background: isActive
                        ? "rgba(139,197,63,.1)"
                        : "rgba(12,26,46,.02)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: isActive ? "#6fa52e" : "rgba(12,26,46,.35)",
                      minWidth: 20,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? "#0c1a2e" : "rgba(12,26,46,.7)",
                      whiteSpace: { xs: "nowrap", md: "normal" },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* RIGHT: Content panel */}
          <Fade in key={current.id} timeout={400}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                borderRadius: "26px",
                overflow: "hidden",
                border: "1px solid rgba(12,26,46,.08)",
                boxShadow: "0 20px 50px rgba(12,26,46,.08)",
              }}
            >
              {/* Image — fixed height, locked, never stretches */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 240, sm: 380, md: 420 },
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={current.image}
                  alt={current.title}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7,17,31,0) 50%, rgba(7,17,31,.5) 100%)",
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    left: 20,
                    bottom: 18,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 19,
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  {current.title}
                </Typography>
              </Box>

              {/* Text content */}
              <Box
                sx={{
                  p: { xs: 3, md: 4.5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "#f6f8fb",
                }}
              >
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    color: "#0c1a2e",
                    fontWeight: 800,
                    fontSize: { sm: 22, md: 26 },
                    mb: 1.5,
                  }}
                >
                  {current.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(12,26,46,.65)",
                    fontSize: 13.5,
                    lineHeight: 1.75,
                    mb: 3,
                  }}
                >
                  {current.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3.5,
                  }}
                >
                  {current.products.map((product) => (
                    <Chip
                      key={product}
                      label={product}
                      size="small"
                      sx={{
                        bgcolor: "#fff",
                        border: "1px solid rgba(12,26,46,.1)",
                        color: "#0c1a2e",
                        fontSize: 11.5,
                        fontWeight: 600,
                        height: 28,
                      }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    color: "#6fa52e",
                    fontWeight: 800,
                    fontSize: 13.5,
                    cursor: "pointer",
                    width: "fit-content",
                    "&:hover": { gap: 1.3 },
                    transition: "gap .2s",
                  }}
                >
                  Explore Solutions <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}