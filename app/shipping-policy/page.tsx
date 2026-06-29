"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";

import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import Image from "next/image";

const shippingCards = [
  {
    icon:
      <LocalShippingRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Reliable Shipping",

    text:
      "Safe and secure deliveries across India using trusted courier partners.",
  },

  {
    icon:
      <AccessTimeFilledRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Fast Delivery",

    text:
      "Estimated delivery within 3-7 business days depending on location.",
  },

  {
    icon:
      <Inventory2RoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Order Processing",

    text:
      "Orders are processed within 24-48 working hours after confirmation.",
  },

  {
    icon:
      <VerifiedRoundedIcon
        sx={{
          fontSize: 30,
        }}
      />,

    title:
      "Secure Packaging",

    text:
      "Products are carefully packed for maximum safety during transit.",
  },
];

const policySections = [
  {
    title:
      "Shipping Coverage",

    text:
      "NetworkTen currently provides shipping services across major cities and regions within India. Delivery availability may vary depending on courier serviceability in specific areas.",
  },

  {
    title:
      "Processing Time",

    text:
      "Orders are generally processed within 24-48 business hours after successful order confirmation and payment verification.",
  },

  {
    title:
      "Delivery Timeline",

    text:
      "Estimated delivery timelines usually range between 3-7 business days depending on location, courier operations and logistics conditions.",
  },

  {
    title:
      "Courier Handling",

    text:
      "We use reliable logistics and courier partners to ensure safe transportation and timely delivery of all eligible products.",
  },

  {
    title:
      "Damaged Packages",

    text:
      "Customers are advised to inspect packages upon delivery. If any damage or tampering is noticed, please contact our support team immediately.",
  },

  {
    title:
      "Shipping Charges",

    text:
      "Shipping charges may vary depending on order size, location and product category. Applicable charges are communicated during order confirmation.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
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
                Shipping Policy
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
              Shipping &
              <Box
                component="span"
                sx={{
                  color: "#8BC53F",

                  ml: 1,
                }}
              >
                Delivery
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
              Learn more about our
              delivery process, shipping
              timelines and order
              fulfillment policies for
              NetworkTen products and
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
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
              alt="Shipping"
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
                Fast & Secure
                Deliveries
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
                Reliable packaging,
                trusted courier handling
                and secure delivery for
                all eligible products.
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
            {shippingCards.map(
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
            {policySections.map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    mb:
                      index !==
                      policySections.length -
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
                    policySections.length -
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