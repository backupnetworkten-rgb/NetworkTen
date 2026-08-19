"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

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

const SLIDE_DURATION = 5000;

export default function HeroSlider() {
  const [progress, setProgress] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  useEffect(() => {
    setProgress(0);

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const percentage = Math.min(
        (elapsed / SLIDE_DURATION) * 100,
        100
      );

      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [slideKey]);

  const handleSlideChange = () => {
    setProgress(0);
    setSlideKey((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* HERO SLIDER */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={handleSlideChange}
        speed={600}
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

      {/* ================================
          5 SECOND PROGRESS INDICATOR
          ================================ */}
      <Box
        sx={{
          position: "absolute",

          bottom: {
            xs: "10px",
            sm: "14px",
            md: "20px",
          },

          right: {
            xs: "10px",
            sm: "16px",
            md: "24px",
          },

          width: {
            xs: "38px",
            sm: "44px",
            md: "50px",
          },

          height: {
            xs: "38px",
            sm: "44px",
            md: "50px",
          },

          borderRadius: "50%",

          zIndex: 50,

          /* Strong background so indicator is visible
             on both dark and bright banners */
          backgroundColor: "rgba(0, 0, 0, 0.72)",

          border: "2px solid rgba(255,255,255,0.75)",

          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          boxShadow:
            "0 3px 12px rgba(0,0,0,0.45), 0 0 8px rgba(154,205,50,0.25)",
        }}
      >
        {/* SVG PROGRESS RING */}
        <Box
          component="svg"
          viewBox="0 0 50 50"
          sx={{
            position: "absolute",
            inset: 0,

            width: "100%",
            height: "100%",

            transform: "rotate(-90deg)",
          }}
        >
          {/* OUTER WHITE RING */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
          />

          {/* GREEN PROGRESS RING */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#9ACD32"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="125.66"
            strokeDashoffset={
              125.66 - (125.66 * progress) / 100
            }
            style={{
              transition: "stroke-dashoffset 30ms linear",
              filter:
                "drop-shadow(0 0 3px rgba(154,205,50,0.9))",
            }}
          />
        </Box>

        {/* CENTER DOT */}
        <Box
          sx={{
            width: {
              xs: "7px",
              sm: "8px",
              md: "9px",
            },

            height: {
              xs: "7px",
              sm: "8px",
              md: "9px",
            },

            borderRadius: "50%",

            backgroundColor: "#ffffff",

            zIndex: 5,

            boxShadow:
              "0 0 5px rgba(255,255,255,0.9)",
          }}
        />
      </Box>
    </Box>
  );
}