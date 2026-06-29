"use client";

import React, { useState } from "react";

import {
  Box,
  Typography,
  Container,
  Card,
  Dialog,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

const certificates = [
  {
    title: "Hikvision Partner",

    image:
      "/certifications/hikvision.png",

    pdf:
      "/certifications/hikvision.pdf",

    subtitle:
      "Authorized System Integrator",
  },

  {
    title: "ISO Certified",

    image:
      "/certifications/iso.png",

    pdf:
      "/certifications/ISO Certificate Network Ten.pdf",

    subtitle:
      "Quality Management",
  },

  {
    title: "Hikvision Installer Partner",

    image:
      "/certifications/hik.png",

    pdf:
      "/certifications/iso2.pdf",

    subtitle:
      "Information Security",
  },

  {
    title: "Honeywell Partner",

    image:
      "/certifications/honeywell.png",

    pdf:
      "/certifications/Honeywell-Partner-Certificate (1).pdf",

    subtitle:
      "Certified Integrator",
  },

  {
    title: "PRAMA Partner",

    image:
      "/certifications/prama.png",

    pdf:
      "/certifications/Network Ten PRAMA.pdf",

    subtitle:
      "Installation Partner",
  },

  {
    title: "AirPro Certificate",

    image:
      "/certifications/air.png",

    pdf:
      "/certifications/Air Pro -Certificate.pdf",

    subtitle:
      "Value Added Reseller",
  },

  {
    title: "K7 Security",

    image:
      "/certifications/k7.png",

    pdf:
      "/certifications/k7 certification.pdf",

    subtitle:
      "Security Partner",
  },

  {
    title: "Udyam Registered",

    image:
      "/certifications/udhyog.png",

    pdf:
      "/certifications/Udyog.pdf",

    subtitle:
      "Govt Registered Enterprise",
  },
];

export default function CertificationSection() {
  const [open, setOpen] =
    useState(false);

  const [selectedPdf, setSelectedPdf] =
    useState("");

  const openCertificate = (pdf) => {
    setSelectedPdf(pdf);

    setOpen(true);
  };

  const closeCertificate = () => {
    setOpen(false);

    setSelectedPdf("");
  };

  return (
    <>
      <Box
        sx={{
          py: {
            xs: 4,
            md: 5,
          },

          background:
            "linear-gradient(to bottom, #f8fbff, #eef5ff)",

          overflow: "hidden",

          position: "relative",
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",

            width: 260,

            height: 260,

            borderRadius: "50%",

            background:
              "rgba(139,197,63,0.10)",

            top: -100,

            right: -80,

            filter: "blur(80px)",
          }}
        />

        <Container maxWidth="xl">
          {/* HEADING */}
          <Box
            sx={{
              textAlign: "center",

              mb: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            {/* TAG */}
            <Box
              sx={{
                display: "inline-flex",

                alignItems: "center",

                justifyContent: "center",

                px: 1.5,

                py: 0.55,

                borderRadius: "40px",

                background:
                  "rgba(139,197,63,0.10)",

                border:
                  "1px solid rgba(139,197,63,0.16)",

                mb: 1.1,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",

                  fontWeight: 700,

                  fontSize: "9px",

                  letterSpacing: "1.2px",

                  textTransform:
                    "uppercase",
                }}
              >
                Trusted Certifications
              </Typography>
            </Box>

            {/* TITLE */}
            <Typography
              sx={{
                color: "#08142e",

                fontWeight: 900,

                lineHeight: 1.08,

                letterSpacing: "-0.5px",

                mb: 0.7,

                fontSize: {
                  xs: "22px",
                  md: "32px",
                },
              }}
            >
              Certified &
              <Box
                component="span"
                sx={{
                  color: "#8BC53F",

                  ml: 1,
                }}
              >
                Trusted
              </Box>
            </Typography>

            {/* SUBTITLE */}
            <Typography
              sx={{
                color: "#667085",

                maxWidth: "560px",

                mx: "auto",

                lineHeight: 1.65,

                fontSize: {
                  xs: "11px",
                  md: "12px",
                },
              }}
            >
              Industry-recognized
              certifications ensuring
              enterprise quality,
              security and reliability.
            </Typography>
          </Box>

          {/* SLIDER */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={18}
            breakpoints={{
              0: {
                slidesPerView: 1.08,
              },

              600: {
                slidesPerView: 2,
              },

              900: {
                slidesPerView: 2.4,
              },

              1200: {
                slidesPerView: 3.2,
              },
            }}
          >
            {certificates.map(
              (item, index) => (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      borderRadius:
                        "24px",

                      overflow: "hidden",

                      background:
                        "rgba(255,255,255,0.78)",

                      backdropFilter:
                        "blur(14px)",

                      border:
                        "1px solid rgba(15,23,42,0.06)",

                      boxShadow:
                        "0 12px 28px rgba(0,0,0,0.06)",

                      transition:
                        "0.4s",

                      cursor:
                        "pointer",

                      position:
                        "relative",

                      "&:hover": {
                        transform:
                          "translateY(-6px)",

                        boxShadow:
                          "0 18px 40px rgba(0,0,0,0.10)",
                      },

                      "&:hover img": {
                        transform:
                          "scale(1.03)",
                      },

                      "&:hover .viewOverlay":
                        {
                          opacity: 1,
                        },
                    }}
                  >
                    {/* IMAGE SECTION */}
                    <Box
                      sx={{
                        position:
                          "relative",

                        p: 1.2,
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          width: "100%",

                          height: {
                            xs: 200,
                            md: 220,
                          },

                          objectFit:
                            "cover",

                          borderRadius:
                            "18px",

                          transition:
                            "0.5s",

                          border:
                            "1px solid rgba(15,23,42,0.08)",
                        }}
                      />

                      {/* VIEW BUTTON */}
                      <Box
                        className="viewOverlay"
                        onClick={() =>
                          openCertificate(
                            item.pdf
                          )
                        }
                        sx={{
                          position:
                            "absolute",

                          bottom: 22,

                          right: 22,

                          opacity: 0,

                          transition:
                            "0.35s",
                        }}
                      >
                        <Box
                          sx={{
                            width: 46,

                            height: 46,

                            borderRadius:
                              "50%",

                            background:
                              "#8BC53F",

                            display:
                              "flex",

                            alignItems:
                              "center",

                            justifyContent:
                              "center",

                            boxShadow:
                              "0 10px 24px rgba(139,197,63,0.35)",

                            transition:
                              "0.3s",

                            "&:hover": {
                              transform:
                                "scale(1.08)",
                            },
                          }}
                        >
                          <VisibilityRoundedIcon
                            sx={{
                              color:
                                "#fff",

                              fontSize: 22,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* CONTENT */}
                    <Box
                      sx={{
                        px: 2,

                        pb: 2.2,

                        pt: 0.4,
                      }}
                    >
                      {/* VERIFIED ICON */}
                      <Box
                        sx={{
                          width: 42,

                          height: 42,

                          borderRadius:
                            "50%",

                          background:
                            "rgba(139,197,63,0.12)",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          color:
                            "#8BC53F",

                          mb: 1.1,

                          "& svg": {
                            fontSize: 22,
                          },
                        }}
                      >
                        <VerifiedRoundedIcon />
                      </Box>

                      {/* TITLE */}
                      <Typography
                        sx={{
                          color:
                            "#08142e",

                          fontWeight: 800,

                          lineHeight: 1.3,

                          fontSize:
                            "16px",

                          mb: 0.4,
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* SUBTITLE */}
                      <Typography
                        sx={{
                          color:
                            "#667085",

                          lineHeight:
                            1.6,

                          fontSize:
                            "11px",
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Card>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </Container>
      </Box>

      {/* PDF POPUP */}
      <Dialog
        open={open}
        onClose={closeCertificate}
        fullWidth
        maxWidth="lg"
      >
        {/* CLOSE BUTTON */}
        <IconButton
          onClick={closeCertificate}
          sx={{
            position: "absolute",

            top: 10,

            right: 10,

            zIndex: 10,

            background:
              "#ffffff",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.08)",

            "&:hover": {
              background:
                "#f3f4f6",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* PDF VIEW */}
        <Box
          sx={{
            width: "100%",

            height: {
              xs: "80vh",
              md: "92vh",
            },

            background:
              "#f8fafc",
          }}
        >
          <iframe
            src={selectedPdf}
            width="100%"
            height="100%"
            style={{
              border: "none",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}