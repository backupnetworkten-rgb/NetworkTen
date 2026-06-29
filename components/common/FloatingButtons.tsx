"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Fab,
  Zoom,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // WHATSAPP PREFILL MESSAGE
  const whatsappMessage =
    "Hello NetworkTen,%0A%0AI would like to know more about your IT infrastructure, networking, surveillance and automation solutions.%0A%0APlease connect with me regarding your services.%0A%0AThank you.";

  return (
    <>
      {/* FLOATING BUTTONS */}
      <Box
        sx={{
          position: "fixed",

          bottom: {
            xs: 26,
            md: 34,
          },

          right: {
            xs: 18,
            md: 24,
          },

          zIndex: 9999,

          display: "flex",

          flexDirection: "column",

          alignItems: "center",

          gap: 2,
        }}
      >
        {/* WHATSAPP */}
        <Fab
          component="a"
          href={`https://wa.me/918687878755?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            background:
              "linear-gradient(135deg, #25D366, #1ebe5d)",

            color: "#ffffff",

            width: 60,

            height: 60,

            boxShadow:
              "0 14px 34px rgba(37,211,102,0.35)",

            transition: "0.35s",

            animation:
              "pulse 2.4s infinite",

            "&:hover": {
              transform:
                "translateY(-5px) scale(1.06)",

              background:
                "linear-gradient(135deg, #22c55e, #16a34a)",
            },

            "@keyframes pulse": {
              "0%": {
                boxShadow:
                  "0 0 0 0 rgba(37,211,102,0.45)",
              },

              "70%": {
                boxShadow:
                  "0 0 0 18px rgba(37,211,102,0)",
              },

              "100%": {
                boxShadow:
                  "0 0 0 0 rgba(37,211,102,0)",
              },
            },
          }}
        >
          <WhatsAppIcon
            sx={{
              fontSize: 31,
            }}
          />
        </Fab>

        {/* SCROLL TOP */}
        <Zoom in={showScroll}>
          <Fab
            onClick={scrollToTop}
            sx={{
              width: 52,

              height: 52,

              borderRadius: "16px",

              background:
                "rgba(11,23,54,0.96)",

              color: "#ffffff",

              backdropFilter: "blur(12px)",

              boxShadow:
                "0 12px 28px rgba(0,0,0,0.18)",

              transition: "0.35s",

              "&:hover": {
                transform:
                  "translateY(-4px)",

                background:
                  "rgba(16,32,72,1)",
              },
            }}
          >
            <KeyboardArrowUpIcon
              sx={{
                fontSize: 28,
              }}
            />
          </Fab>
        </Zoom>
      </Box>
    </>
  );
}