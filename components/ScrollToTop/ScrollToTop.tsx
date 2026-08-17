"use client";

import React, { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={showScroll}>
      <Fab
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: { xs: 26, md: 34 },
          right: { xs: 18, md: 24 },
          zIndex: 9999,

          width: 52,
          height: 52,
          borderRadius: "16px",

          background: "rgba(11,23,54,0.96)",
          color: "#ffffff",
          backdropFilter: "blur(12px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.18)",

          transition: "0.35s",

          "&:hover": {
            transform: "translateY(-4px)",
            background: "rgba(16,32,72,1)",
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 28 }} />
      </Fab>
    </Zoom>
  );
}