"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import Image from "next/image";

import "swiper/css";

const customers = [
  {
    name: "Customer 1",
    logo: "/customers/abhinav.png",
  },

  {
    name: "Customer 2",
    logo: "/customers/cognito.png",
  },

  {
    name: "Customer 3",
    logo: "/customers/db-group.png",
  },

  {
    name: "Customer 4",
    logo: "/customers/Delhi.png",
  },

  {
    name: "Customer 5",
    logo: "/customers/dps_logo.jpg",
  },

  {
    name: "Customer 6",
    logo: "/customers/fitvilla.jpg",
  },

  {
    name: "Customer 7",
    logo: "/customers/garnet.png",
  },

  {
    name: "Customer 8",
    logo: "/customers/Geological.png",
  },

  {
    name: "Customer 9",
    logo: "/customers/IIT.jpg",
  },

  {
    name: "Customer 10",
    logo: "/customers/lotus.jfif",
  },

  {
    name: "Customer 11",
    logo: "/customers/Namaskar.avif",
  },

  {
    name: "Customer 12",
    logo: "/customers/regent.webp",
  },

  {
    name: "Customer 13",
    logo: "/customers/yashoda.png",
  },
];

export default function CustomersSection() {
  return (
    <Box
      sx={{
        py: {
          xs: 3,
          md: 4,
        },

        position: "relative",

        overflow: "hidden",

        background:
          "linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)",
      }}
    >
      {/* GLOW EFFECT */}
      <Box
        sx={{
          position: "absolute",

          width: 350,

          height: 350,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.10)",

          top: -150,

          left: -120,

          filter: "blur(90px)",
        }}
      />

      <Container maxWidth="xl">
        {/* HEADER */}

        <Box
          sx={{
            textAlign: "center",

            mb: 3,
          }}
        >
          {/* TAG */}

          <Box
            sx={{
              display: "inline-flex",

              alignItems: "center",

              gap: 0.6,

              px: 1.5,

              py: 0.5,

              borderRadius: "50px",

              background:
                "rgba(139,197,63,0.12)",

              border:
                "1px solid rgba(139,197,63,0.18)",

              mb: 1,
            }}
          >
            <GroupsRoundedIcon
              sx={{
                color: "#8BC53F",

                fontSize: 14,
              }}
            />

            <Typography
              sx={{
                color: "#8BC53F",

                fontWeight: 700,

                fontSize: "9px",

                letterSpacing: "1px",

                textTransform:
                  "uppercase",
              }}
            >
              Trusted Customers
            </Typography>
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              color: "#08142e",

              fontWeight: 900,

              lineHeight: 1.05,

              mb: 1,

              fontSize: {
                xs: "24px",
                md: "34px",
              },
            }}
          >
            Trusted By
            <Box
              component="span"
              sx={{
                color: "#8BC53F",

                ml: 1,
              }}
            >
              Businesses
            </Box>
          </Typography>

          {/* SUBTITLE */}

          <Typography
            sx={{
              color: "#667085",

              maxWidth: "620px",

              mx: "auto",

              lineHeight: 1.6,

              fontSize: {
                xs: "11px",
                md: "13px",
              },
            }}
          >
            Organizations, schools,
            hospitals and enterprises
            trust NetworkTen for smart
            networking and technology
            solutions.
          </Typography>
        </Box>

        {/* LOGO SLIDER */}

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,

            disableOnInteraction: false,
          }}
          speed={2300}
          loop={true}
          allowTouchMove={false}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },

            600: {
              slidesPerView: 3,
            },

            900: {
              slidesPerView: 4,
            },

            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {customers.map(
            (
              customer,
              index
            ) => (
              <SwiperSlide
                key={index}
              >
                <Box
                  sx={{
                    height: {
                      xs: 90,
                      md: 110,
                    },

                    display: "flex",

                    alignItems: "center",

                    justifyContent:
                      "center",

                    transition: "0.35s",

                    "&:hover": {
                      transform:
                        "scale(1.05)",
                    },
                  }}
                >
                  <Image
                    src={
                      customer.logo
                    }
                    alt={
                      customer.name
                    }
                    width={200}
                    height={90}
                    style={{
                      width: "100%",

                      maxWidth:
                        "160px",

                      height:
                        "70px",

                      objectFit:
                        "contain",
                    }}
                  />
                </Box>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Container>
    </Box>
  );
}