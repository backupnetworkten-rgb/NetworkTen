"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function GoogleReviews() {
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        py: {
          xs: 5,
          md: 7,
        },

        background:
          "linear-gradient(to bottom, #ffffff, #f7fbff)",

        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* BACKGROUND GLOW */}
      <Box
        sx={{
          position: "absolute",

          width: 320,

          height: 320,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.08)",

          top: -120,

          right: -120,

          filter: "blur(100px)",
        }}
      />

      <Container maxWidth="xl">
        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",

            mb: 4,
          }}
        >
          {/* TAG */}
          <Box
            sx={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent:
                "center",

              px: 2,

              py: 0.8,

              borderRadius:
                "40px",

              background:
                "rgba(139,197,63,0.10)",

              border:
                "1px solid rgba(139,197,63,0.18)",

              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                color: "#8BC53F",

                fontWeight: 700,

                letterSpacing:
                  "1.5px",

                textTransform:
                  "uppercase",

                fontSize: "11px",
              }}
            >
              Google Reviews
            </Typography>
          </Box>

          {/* TITLE */}
          <Typography
            sx={{
              color: "#102048",

              fontWeight: 900,

              lineHeight: 1.05,

              mb: 1,

              fontSize: {
                xs: "28px",
                md: "46px",
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

              maxWidth: "760px",

              mx: "auto",

              lineHeight: 1.8,

              fontSize: {
                xs: "13px",
                md: "15px",
              },
            }}
          >
            Real customer experiences and
            trusted enterprise networking,
            automation and surveillance
            solutions delivered by
            NetworkTen.
          </Typography>
        </Box>

        {/* REVIEW CARD */}
        <Box
          sx={{
            position: "relative",

            borderRadius: "30px",

            overflow: "hidden",

            background:
              "linear-gradient(180deg, #ffffff, #fbfdff)",

            border:
              "1px solid rgba(8,20,46,0.05)",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.06)",

            p: {
              xs: 1,
              md: 2,
            },

            minHeight: 300,
          }}
        >
          {/* INNER GLOW */}
          <Box
            sx={{
              position: "absolute",

              width: 260,

              height: 260,

              borderRadius: "50%",

              background:
                "rgba(139,197,63,0.10)",

              top: -120,

              right: -120,

              filter: "blur(90px)",
            }}
          />

          {/* ELFSIGHT */}
          <div
            className="elfsight-app-6cf93c0f-666a-4598-b8ba-52109f5f72fc"
            data-elfsight-app-lazy
          ></div>
        </Box>
      </Container>
    </Box>
  );
}