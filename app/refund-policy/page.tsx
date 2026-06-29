"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";

import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

import AssignmentReturnRoundedIcon from "@mui/icons-material/AssignmentReturnRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import Image from "next/image";

const refundCards = [
  {
    icon:
      <CurrencyExchangeRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Easy Refund Process",

    text:
      "Simple and transparent refund handling for eligible products and services.",
  },

  {
    icon:
      <VerifiedUserRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Secure Transactions",

    text:
      "Refunds are processed safely using the original payment method wherever applicable.",
  },

  {
    icon:
      <AccessTimeFilledRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Quick Processing",

    text:
      "Approved refunds are generally processed within 5-10 business days.",
  },

  {
    icon:
      <AssignmentReturnRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Support Assistance",

    text:
      "Our support team assists customers throughout the refund and return process.",
  },
];

const refundSections = [
  {
    title:
      "Refund Eligibility",

    text:
      "Refund requests may be considered for eligible products or services subject to verification, product condition and approval from the NetworkTen support team.",
  },

  {
    title:
      "Return Conditions",

    text:
      "Products must be returned in original condition with proper packaging, accessories and proof of purchase wherever applicable.",
  },

  {
    title:
      "Non-Refundable Services",

    text:
      "Installation charges, customized services, consultation fees and certain digital or special-order products may not be eligible for refunds.",
  },

  {
    title:
      "Refund Processing Time",

    text:
      "Once approved, refunds are generally processed within 5-10 business days depending on banking and payment gateway timelines.",
  },

  {
    title:
      "Damaged or Incorrect Orders",

    text:
      "If customers receive damaged, defective or incorrect products, they should contact our support team immediately for assistance and resolution.",
  },

  {
    title:
      "Cancellation Policy",

    text:
      "Orders may only be cancelled before dispatch or service execution. Cancellation requests after shipment or installation may not be accepted.",
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",

          overflow: "hidden",

          background:
            "linear-gradient(135deg,#040b16 0%,#08142e 50%,#102048 100%)",

          pt: {
            xs: 7,
            md: 8,
          },

          pb: {
            xs: 6,
            md: 7,
          },
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",

            width: 380,

            height: 380,

            borderRadius: "50%",

            background:
              "rgba(139,197,63,0.12)",

            top: -160,

            right: -120,

            filter: "blur(120px)",
          }}
        />

        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",

              zIndex: 2,

              textAlign: "center",
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

                py: 0.7,

                borderRadius: "40px",

                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                backdropFilter:
                  "blur(10px)",

                mb: 1.8,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",

                  fontWeight: 700,

                  fontSize: "11px",

                  textTransform:
                    "uppercase",

                  letterSpacing:
                    "1.5px",
                }}
              >
                Refund Policy
              </Typography>
            </Box>

            {/* HEADING */}
            <Typography
              sx={{
                color: "#fff",

                fontWeight: 900,

                lineHeight: 1,

                letterSpacing:
                  "-1px",

                mb: 1.5,

                fontSize: {
                  xs: "34px",
                  md: "56px",
                },
              }}
            >
              Refund &
              <Box
                component="span"
                sx={{
                  color: "#8BC53F",

                  ml: 1,
                }}
              >
                Returns
              </Box>
            </Typography>

            {/* TEXT */}
            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.72)",

                maxWidth: "700px",

                mx: "auto",

                lineHeight: 1.9,

                fontSize: {
                  xs: "13px",
                  md: "14px",
                },
              }}
            >
              Learn more about our refund,
              cancellation and return policies
              for NetworkTen products and
              services.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* MAIN SECTION */}
      <Box
        sx={{
          py: {
            xs: 5,
            md: 6,
          },

          background:
            "linear-gradient(to bottom,#f8fbff,#ffffff)",
        }}
      >
        <Container maxWidth="lg">
          {/* BANNER IMAGE */}
          <Box
            sx={{
              position: "relative",

              overflow: "hidden",

              borderRadius: "26px",

              mb: 4,

              minHeight: {
                xs: 220,
                md: 340,
              },

              boxShadow:
                "0 20px 45px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop"
              alt="Refund Policy"
              fill
              style={{
                objectFit: "cover",
              }}
            />

            {/* OVERLAY */}
            <Box
              sx={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(to right,rgba(4,11,22,0.82),rgba(16,32,72,0.42))",
              }}
            />

            {/* CONTENT */}
            <Box
              sx={{
                position: "absolute",

                left: {
                  xs: 22,
                  md: 40,
                },

                bottom: {
                  xs: 22,
                  md: 40,
                },

                maxWidth: "520px",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",

                  fontWeight: 900,

                  lineHeight: 1.08,

                  mb: 1.2,

                  fontSize: {
                    xs: "26px",
                    md: "42px",
                  },
                }}
              >
                Simple & Transparent
                Refunds
              </Typography>

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.74)",

                  lineHeight: 1.8,

                  fontSize: {
                    xs: "13px",
                    md: "14px",
                  },
                }}
              >
                Reliable refund handling,
                secure payment processing
                and dedicated customer
                support for eligible orders.
              </Typography>
            </Box>
          </Box>

          {/* CARDS */}
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(4,1fr)",
              },

              gap: 2.2,

              mb: 4,
            }}
          >
            {refundCards.map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    background:
                      "#fff",

                    borderRadius:
                      "22px",

                    p: 2.5,

                    border:
                      "1px solid rgba(8,20,46,0.05)",

                    boxShadow:
                      "0 14px 35px rgba(0,0,0,0.05)",

                    transition:
                      "0.35s",

                    "&:hover": {
                      transform:
                        "translateY(-5px)",

                      boxShadow:
                        "0 20px 45px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 58,

                      height: 58,

                      borderRadius:
                        "18px",

                      background:
                        "rgba(139,197,63,0.12)",

                      color: "#8BC53F",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      mb: 1.8,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography
                    sx={{
                      color: "#102048",

                      fontWeight: 800,

                      mb: 1,

                      fontSize: "16px",
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* TEXT */}
                  <Typography
                    sx={{
                      color: "#667085",

                      lineHeight: 1.8,

                      fontSize: "13px",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              )
            )}
          </Box>

          {/* POLICY CONTENT */}
          <Box
            sx={{
              background: "#fff",

              borderRadius: "28px",

              p: {
                xs: 3,
                md: 4,
              },

              border:
                "1px solid rgba(8,20,46,0.05)",

              boxShadow:
                "0 18px 45px rgba(0,0,0,0.05)",
            }}
          >
            {refundSections.map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    mb:
                      index !==
                      refundSections.length -
                        1
                        ? 3
                        : 0,
                  }}
                >
                  {/* TITLE */}
                  <Typography
                    sx={{
                      color: "#102048",

                      fontWeight: 800,

                      mb: 1,

                      fontSize: {
                        xs: "22px",
                        md: "26px",
                      },
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* TEXT */}
                  <Typography
                    sx={{
                      color: "#667085",

                      lineHeight: 1.95,

                      fontSize: {
                        xs: "14px",
                        md: "15px",
                      },
                    }}
                  >
                    {item.text}
                  </Typography>

                  {index !==
                    refundSections.length -
                      1 && (
                    <Divider
                      sx={{
                        mt: 2.5,
                      }}
                    />
                  )}
                </Box>
              )
            )}
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}