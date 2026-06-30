"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Container,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const solutions = [
  {
    title: "BANKING & RETAILS",
    image:
      "https://plus.unsplash.com/premium_photo-1769842895659-724d64bbafd7?w=600&auto=format&fit=crop&q=60",
    description:
      "Advanced surveillance, networking and automation solutions for secure banking and retail operations.",
    products: [
      "CCTV Surveillance Systems",
      "Biometric Attendance",
      "Access Control Systems",
      "Fire Alarm Solutions",
      "Networking Infrastructure",
      "Video Door Phones",
      "Enterprise WiFi Solutions",
      "Public Address Systems",
      "Digital Signage Displays",
      "Data Security Solutions",
    ],
  },
  {
    title: "EDUCATION",
    image:
      "https://images.unsplash.com/photo-1681164315051-add1906a9b07?w=600&auto=format&fit=crop&q=60",
    description:
      "Smart digital infrastructure solutions designed for modern education campuses and institutions.",
    products: [
      "Smart Classroom Solutions",
      "Interactive Flat Panels",
      "Projectors & Audio Visual",
      "Campus Networking",
      "PA Systems",
      "Biometric Attendance",
      "Digital Learning Setup",
      "CCTV Monitoring",
      "Conference Room Setup",
      "Server & Storage Solutions",
    ],
  },
  {
    title: "HEALTHCARE & PHARMA",
    image:
      "https://plus.unsplash.com/premium_photo-1681842931981-12ecdd712705?w=600&auto=format&fit=crop&q=60",
    description:
      "Reliable enterprise infrastructure and security systems for hospitals and healthcare industries.",
    products: [
      "Hospital Surveillance Systems",
      "Server Infrastructure",
      "Access Control Systems",
      "Enterprise WiFi",
      "Communication Systems",
      "Fire Alarm Systems",
      "Video Conferencing",
      "Nurse Calling Systems",
      "Data Center Solutions",
      "Storage & Backup Solutions",
    ],
  },
  {
    title: "HOSPITALITY",
    image:
      "https://images.squarespace-cdn.com/content/v1/5512c58de4b07319c3fed0c7/1767016852691-G7N558EQZDHKL58CXQW3/2-99SUSHI.jpg",
    description:
      "Premium hospitality automation and guest experience solutions powered by modern technologies.",
    products: [
      "Hotel Automation Systems",
      "Guest WiFi Solutions",
      "Digital Door Locks",
      "Audio Visual Setup",
      "CCTV Security Systems",
      "Smart Room Controls",
      "Video Door Phones",
      "Conference Hall Setup",
      "Public Address Systems",
      "Reception Networking",
    ],
  },
  {
    title: "RETAIL & OFFICE",
    image:
      "https://images.unsplash.com/photo-1774494168068-0f716c3aafcf?w=600&auto=format&fit=crop&q=60",
    description:
      "Modern workplace technologies for productivity, collaboration and enterprise security.",
    products: [
      "Office Networking Solutions",
      "Conference Room Setup",
      "Video Conferencing",
      "Attendance Systems",
      "Office Furniture",
      "CCTV Surveillance",
      "Access Control",
      "Structured Cabling",
      "Audio Visual Systems",
      "Server & Storage Solutions",
    ],
  },
  {
    title: "HOME | VILLA | FARMHOUSE",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop",
    description:
      "Luxury automation, entertainment and surveillance systems for modern smart living.",
    products: [
      "Home Automation",
      "Smart Security Systems",
      "Wireless Surveillance",
      "Gate Automation",
      "Video Door Phones",
      "Smart Lighting Control",
      "Home Theatre Solutions",
      "WiFi Networking",
      "Motion Sensors",
      "Smart Access Control",
    ],
  },
];

// ── Individual Card ──────────────────────────────────────────────────────────
function SolutionCard({ item, onHoverChange }) {
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    setHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
      onHoverChange(false);
    }, 180);
  };

  return (
    <Card
      sx={{
        position: "relative",
        height: 480,
        borderRadius: "26px",
        overflow: "hidden",
        background: "#000",
        boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
        transition: "transform 0.45s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.7s",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          display: "block",
        }}
      />

      {/* BASE GRADIENT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.15))",
          pointerEvents: "none",
        }}
      />

      {/* ── DEFAULT FRONT CONTENT (title + description + Read More button) ── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2.5,
          transition: "opacity 0.35s, transform 0.35s",
          opacity: hovered ? 0 : 1,
          transform: hovered ? "translateY(16px)" : "translateY(0)",
          pointerEvents: hovered ? "none" : "auto",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 900,
            lineHeight: 1.2,
            fontSize: { xs: "18px", md: "21px" },
            mb: 0.8,
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.65,
            fontSize: "12px",
            mb: 1.4,
          }}
        >
          {item.description}
        </Typography>

        {/* READ MORE BUTTON — hovering THIS triggers the overlay */}
        <Button
          variant="outlined"
          size="small"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            color: "#8BC53F",
            borderColor: "rgba(139,197,63,0.6)",
            borderRadius: "40px",
            px: 2,
            py: 0.6,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "11.5px",
            backdropFilter: "blur(4px)",
            cursor: "pointer",
            "&:hover": {
              borderColor: "#8BC53F",
              background: "rgba(139,197,63,0.10)",
            },
          }}
        >
          Read More ↓
        </Button>
      </Box>

      {/* ── HOVER OVERLAY (full details — shown when hovered) ── */}
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "absolute",
          inset: 0,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.98) 60%, rgba(0,0,0,0.72))",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s, transform 0.4s",
          pointerEvents: hovered ? "auto" : "none",
          overflowY: "auto",
        }}
      >
        {/* TOP: title + description */}
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              lineHeight: 1.2,
              mb: 1,
              fontSize: { xs: "18px", md: "21px" },
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              fontSize: "12px",
              mb: 1.8,
            }}
          >
            {item.description}
          </Typography>
        </Box>

        {/* BOTTOM: product list + button */}
        <Box>
          <Box sx={{ mb: 2 }}>
            {item.products.map((product) => (
              <Box
                key={product}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  mb: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#8BC53F",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    color: "#d1d5db",
                    fontSize: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  {product}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            sx={{
              background: "#8BC53F",
              borderRadius: "40px",
              px: 2.5,
              py: 0.9,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "12px",
              boxShadow: "0 8px 18px rgba(139,197,63,0.22)",
              "&:hover": { background: "#74ab35" },
            }}
          >
            Explore Solutions
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function SolutionsSection() {
  const swiperRef = useRef(null);

  const handleCardHoverChange = (isHovered) => {
    if (!swiperRef.current) return;
    if (isHovered) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 5 },
        background: "linear-gradient(to bottom, #ffffff, #f6faff)",
      }}
    >
      <Container maxWidth="xl">
        {/* HEADING */}
        <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 3 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1.8,
              py: 0.6,
              borderRadius: "40px",
              background: "rgba(139,197,63,0.10)",
              border: "1px solid rgba(139,197,63,0.18)",
              mb: 1.3,
            }}
          >
            <Typography
              sx={{
                color: "#8BC53F",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "1.3px",
                textTransform: "uppercase",
              }}
            >
              Industry Expertise
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#08142e",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.6px",
              mb: 0.8,
              fontSize: { xs: "22px", md: "34px" },
            }}
          >
            Smart Technology
            <Box component="span" sx={{ color: "#8BC53F", ml: 1 }}>
              For Every Industry
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              maxWidth: "620px",
              mx: "auto",
              lineHeight: 1.7,
              fontSize: { xs: "11.5px", md: "13px" },
            }}
          >
            Enterprise-grade networking, surveillance, automation and IT
            infrastructure solutions tailored for modern industries.
          </Typography>
        </Box>

        {/* SLIDER */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.08 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 2.2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {solutions.map((item, index) => (
            <SwiperSlide key={index}>
              <SolutionCard
                item={item}
                onHoverChange={handleCardHoverChange}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}