"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Box } from "@mui/material";

const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
  "/images/banner4.png",
  "/images/banner5.png",
  "/images/banner6.png",
  "/images/banner7.png",
];

export default function HeroSlider() {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: {
                  xs: "220px",
                  sm: "320px",
                  md: "500px",
                  lg: "650px",
                },
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "#ffffff",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}