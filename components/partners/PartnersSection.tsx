
"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const partners = [
  { name: "Hikvision", logo: "/partners/hikvi.png" },
  { name: "Dell", logo: "/partners/dell.png" },
  { name: "Cisco", logo: "/partners/cisco.png" },
  { name: "D-Link", logo: "/partners/d-link.png" },
  { name: "AnexGate", logo: "/partners/anex.png" },
  { name: "Cyberroam", logo: "/partners/cyber.png" },
  { name: "Sonicwall", logo: "/partners/sonicwall.png" },
  { name: "Epson", logo: "/partners/epson.png" },
  { name: "Canon", logo: "/partners/canon.png" },
  { name: "Poly", logo: "/partners/poly.png" },
  { name: "CP Plus", logo: "/partners/cp.png" },
  { name: "Fortinet", logo: "/partners/fort.png" },
  { name: "Sophos", logo: "/partners/sophos.png" },
  { name: "Webex", logo: "/partners/webex.png" },
  { name: "Aruba", logo: "/partners/aruba.png" },
  { name: "Panasonic", logo: "/partners/panasonic.png" },
  { name: "Cambium", logo: "/partners/cambium.png" },
  { name: "Onap", logo: "/partners/onap.png" },
  { name: "Logitech", logo: "/partners/logitech.png" },
  { name: "Quantam", logo: "/partners/quantam.png" },
  { name: "Grandstream", logo: "/partners/grand.png" },
  { name: "Honeywell", logo: "/partners/Honeywell.png" },
  { name: "Matrix", logo: "/partners/matrix.png" },
  { name: "Yealink", logo: "/partners/Yealink.png" },
  { name: "BENQ", logo: "/partners/BenQ.png" },
  { name: "BOSCH", logo: "/partners/Bosch.png" },
  { name: "Zoapi", logo: "/partners/Zoapi.png" },
  { name: "Yamaha", logo: "/partners/Yamaha.png" },
  { name: "Ahuja", logo: "/partners/Ahuja.png" },
  { name: "LG", logo: "/partners/LG.png" },
  { name: "StudioMaster", logo: "/partners/Studiomaster.png" },
  { name: "Sony", logo: "/partners/Sony.png" },
  { name: "Samsung", logo: "/partners/Samsung.png" },
  { name: "HP", logo: "/partners/HP.png" },
  { name: "GreenGate", logo: "/partners/Green Gate.png" },
];

export default function PartnersSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 3, sm: 4, md: 5 },
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 55%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Premium heading matching the 4 Pillars section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2.2,
              py: 0.7,
              mb: 1.4,
              borderRadius: "50px",
              backgroundColor: "rgba(132, 204, 22, 0.09)",
              border: "1px solid rgba(132, 204, 22, 0.20)",
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "#84CC16",
                fontSize: { xs: "9px", sm: "11px" },
                fontWeight: 800,
                letterSpacing: { xs: "1.8px", md: "2.5px" },
                textTransform: "uppercase",
                lineHeight: 1.5,
              }}
            >
              Our Trusted Partners
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: "27px",
                sm: "34px",
                md: "44px",
              },
              fontWeight: 800,
              color: "#0B1736",
              lineHeight: 1.15,
              letterSpacing: "-1.2px",
            }}
          >
            Brands That Trust{" "}
            <Box
              component="span"
              sx={{
                color: "#84CC16",
                display: "inline",
              }}
            >
              Us
            </Box>
          </Typography>

          <Typography
            component="p"
            sx={{
              mt: 1,
              color: "#52617A",
              fontSize: { xs: "12px", sm: "14px" },
              lineHeight: 1.7,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Technology partnerships built on trust, innovation and
            reliable enterprise solutions.
          </Typography>

          {/* Lime-green accent matching NetworkTen's 4 Pillars */}
          <Box
            sx={{
              width: 58,
              height: 4,
              borderRadius: "10px",
              backgroundColor: "#84CC16",
              mx: "auto",
              mt: 1.7,
            }}
          />
        </Box>

        {/* Partner logos carousel */}
        <Swiper
          modules={[Autoplay]}
          loop={partners.length > 5}
          speed={800}
          autoplay={{
            delay: 2200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          slidesPerView={1.5}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}
          style={{
            width: "100%",
            padding: "5px 0 8px",
          }}
        >
          {partners.map((partner, index) => {
            // Hikvision through Grandstream: original enlarged size.
            // Honeywell through GreenGate: 50% smaller.
            const isFirstGroup = index < 21;

            return (
              <SwiperSlide
                key={partner.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0,
                    m: 0,
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    sx={{
                      display: "block",
                      width: isFirstGroup ? "320px" : "160px",
                      height: isFirstGroup ? "140px" : "70px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      mixBlendMode: "multiply",
                      opacity: 0.95,
                      flexShrink: 0,
                      transition:
                        "opacity 0.25s ease, transform 0.25s ease",
                      "&:hover": {
                        opacity: 1,
                        transform: "scale(1.04)",
                      },
                    }}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </Box>
  );
}
