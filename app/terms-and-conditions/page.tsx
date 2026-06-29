"use client";

import React from "react";

import Head from "next/head";

import Image from "next/image";

import {
  Box,
  Typography,
  Container,
  Chip,
  Divider,
} from "@mui/material";

import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

const sections = [
  {
    title:
      "1. General Terms",

    points: [
      "By accessing or using NetworkTen services, products or website, users agree to comply with these Terms & Conditions.",

      "NetworkTen reserves the right to update, modify or revise terms without prior notice.",

      "Continued use of our website or services indicates acceptance of updated terms.",
    ],
  },

  {
    title:
      "2. Products & Services",

    points: [
      "NetworkTen provides networking, surveillance, automation, conferencing and technology related products and solutions.",

      "Product availability, pricing and specifications may change without prior notice.",

      "Images shown on the website are for representation purposes and actual products may vary slightly.",
    ],
  },

  {
    title:
      "3. Pricing & Payments",

    points: [
      "All pricing displayed on the platform is subject to applicable taxes and service charges.",

      "Orders will be processed only after successful payment confirmation.",

      "NetworkTen reserves the right to cancel suspicious or unauthorized transactions.",
    ],
  },

  {
    title:
      "4. Delivery & Shipping",

    points: [
      "Products are shipped using trusted delivery partners including Delivery.in and other courier services.",

      "Estimated delivery timelines generally range between 3 to 7 business days depending on location and product availability.",

      "Remote or special service areas may require additional delivery time.",

      "Customers will receive shipment tracking details after dispatch confirmation.",

      "NetworkTen is not responsible for delays caused by courier partners, natural events or unforeseen circumstances.",
    ],
  },

  {
    title:
      "5. Warranty Policy",

    points: [
      "Selected products may include a standard 1-year warranty unless otherwise specified.",

      "Warranty covers manufacturing defects only and does not cover physical damage, misuse, water damage or unauthorized repairs.",

      "For warranty claims, one side courier/shipping charges will be paid by the customer and the return courier charges from our side will be covered by NetworkTen.",

      "Warranty service timelines may vary depending on product category and inspection process.",
    ],
  },

  {
    title:
      "6. Returns & Replacement",

    points: [
      "Replacement requests must be raised within the applicable replacement period after delivery.",

      "Products must be returned in original condition with accessories, packaging and invoice.",

      "NetworkTen reserves the right to inspect returned products before approving replacement or service requests.",
    ],
  },

  {
    title:
      "7. Customer Responsibilities",

    points: [
      "Customers are responsible for providing accurate contact, delivery and billing information.",

      "Improper installation, misuse or unauthorized modifications may void warranty eligibility.",

      "Customers should ensure safe usage and maintenance of purchased products and services.",
    ],
  },

  {
    title:
      "8. Intellectual Property",

    points: [
      "All website content including logos, branding, graphics, designs and materials belong to NetworkTen.",

      "Unauthorized copying, distribution or commercial use of website content is prohibited without written permission.",
    ],
  },

  {
    title:
      "9. Limitation Of Liability",

    points: [
      "NetworkTen shall not be liable for indirect, incidental or consequential damages arising from use of products or services.",

      "Liability shall be limited to the value of the purchased product or service where applicable.",
    ],
  },

  {
    title:
      "10. Policy Updates",

    points: [
      "NetworkTen may update Terms & Conditions periodically to reflect operational or legal changes.",

      "Updated policies will be published on this page with immediate effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>
          Terms & Conditions |
          NetworkTen
        </title>

        <meta
          name="description"
          content="Read the official Terms & Conditions of NetworkTen regarding products, services, warranty, shipping and customer policies."
        />
      </Head>

      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",

          minHeight: {
            xs: "280px",
            md: "360px",
          },

          display: "flex",

          alignItems: "center",

          overflow: "hidden",
        }}
      >
        {/* BANNER IMAGE */}
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1800&auto=format&fit=crop"
          alt="Terms and Conditions"
          fill
          priority
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
              "linear-gradient(to right, rgba(6,16,31,0.96), rgba(16,32,72,0.76))",
          }}
        />

        {/* CONTENT */}
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",

            zIndex: 2,
          }}
        >
          <Chip
            icon={
              <GavelRoundedIcon />
            }
            label="Terms & Policies"
            sx={{
              background:
                "rgba(139,197,63,0.14)",

              color: "#8BC53F",

              fontWeight: 700,

              mb: 2,

              height: "30px",

              fontSize: "11px",

              border:
                "1px solid rgba(139,197,63,0.18)",

              "& .MuiChip-icon":
                {
                  color:
                    "#8BC53F",
                },
            }}
          />

          <Typography
            sx={{
              color: "#fff",

              fontWeight: 900,

              lineHeight: 1,

              mb: 1.4,

              letterSpacing:
                "-1px",

              fontSize: {
                xs: "34px",
                md: "58px",
              },
            }}
          >
            Terms &
            <br />
            Conditions
          </Typography>

          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.72)",

              maxWidth: "700px",

              lineHeight: 1.9,

              fontSize: {
                xs: "14px",
                md: "15px",
              },
            }}
          >
            Read the official terms,
            delivery policies, warranty
            information and service
            conditions applicable to
            NetworkTen products and
            solutions.
          </Typography>
        </Container>
      </Box>

      {/* MAIN SECTION */}
      <Box
        sx={{
          background: "#f7f9fc",

          py: {
            xs: 4,
            md: 5,
          },

          px: 2,
        }}
      >
        <Container maxWidth="lg">
          {/* MAIN CARD */}
          <Box
            sx={{
              background: "#fff",

              borderRadius:
                "24px",

              border:
                "1px solid #edf1f7",

              overflow:
                "hidden",

              boxShadow:
                "0 10px 34px rgba(0,0,0,0.04)",
            }}
          >
            {/* INTRO */}
            <Box
              sx={{
                p: {
                  xs: 2.5,
                  md: 3.5,
                },

                pb: 2.4,
              }}
            >
              <Typography
                sx={{
                  color: "#102048",

                  fontWeight: 900,

                  mb: 1.2,

                  lineHeight: 1.1,

                  letterSpacing:
                    "-0.5px",

                  fontSize: {
                    xs: "28px",
                    md: "40px",
                  },
                }}
              >
                Important Information
              </Typography>

              <Typography
                sx={{
                  color: "#667085",

                  lineHeight: 1.9,

                  fontSize: {
                    xs: "14px",
                    md: "15px",
                  },
                }}
              >
                These Terms &
                Conditions govern the use
                of NetworkTen products,
                services and website.
                Customers are advised to
                carefully review all terms
                regarding warranty,
                delivery, payments and
                service policies before
                placing orders or using
                our services.
              </Typography>
            </Box>

            <Divider />

            {/* POLICY CONTENT */}
            <Box
              sx={{
                p: {
                  xs: 2.3,
                  md: 3.5,
                },

                display: "grid",

                gap: 2,
              }}
            >
              {sections.map(
                (
                  section,
                  index
                ) => (
                  <Box
                    key={index}
                    sx={{
                      background:
                        "#fbfcfe",

                      border:
                        "1px solid #edf1f7",

                      borderRadius:
                        "20px",

                      p: {
                        xs: 2.2,
                        md: 2.6,
                      },

                      transition:
                        "0.3s",

                      "&:hover":
                        {
                          transform:
                            "translateY(-2px)",

                          boxShadow:
                            "0 10px 24px rgba(0,0,0,0.05)",
                        },
                    }}
                  >
                    {/* TITLE */}
                    <Typography
                      sx={{
                        color:
                          "#102048",

                        fontWeight:
                          800,

                        mb: 1.4,

                        lineHeight:
                          1.2,

                        fontSize:
                          {
                            xs: "22px",
                            md: "28px",
                          },
                      }}
                    >
                      {
                        section.title
                      }
                    </Typography>

                    {/* POINTS */}
                    <Box
                      component="ul"
                      sx={{
                        pl: 2.3,

                        m: 0,
                      }}
                    >
                      {section.points.map(
                        (
                          point,
                          idx
                        ) => (
                          <Typography
                            key={idx}
                            component="li"
                            sx={{
                              color:
                                "#667085",

                              lineHeight:
                                1.9,

                              mb: 1,

                              fontSize:
                                "14px",
                            }}
                          >
                            {point}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>
                )
              )}

              {/* CONTACT CARD */}
              <Box
                sx={{
                  mt: 1,

                  background:
                    "linear-gradient(135deg,#08142e 0%,#102048 100%)",

                  borderRadius:
                    "22px",

                  p: {
                    xs: 2.5,
                    md: 3,
                  },

                  position:
                    "relative",

                  overflow:
                    "hidden",
                }}
              >
                {/* GLOW */}
                <Box
                  sx={{
                    position:
                      "absolute",

                    width: 220,

                    height: 220,

                    borderRadius:
                      "50%",

                    background:
                      "rgba(139,197,63,0.12)",

                    top: -80,

                    right: -60,

                    filter:
                      "blur(90px)",
                  }}
                />

                <Typography
                  sx={{
                    color: "#fff",

                    fontWeight: 900,

                    mb: 1,

                    position:
                      "relative",

                    zIndex: 2,

                    fontSize: {
                      xs: "24px",
                      md: "30px",
                    },
                  }}
                >
                  Need Assistance?
                </Typography>

                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,0.72)",

                    lineHeight: 1.9,

                    position:
                      "relative",

                    zIndex: 2,

                    fontSize: "14px",
                  }}
                >
                  For questions related to
                  orders, delivery,
                  warranty or customer
                  support, please contact
                  NetworkTen through our
                  official contact page or
                  email us at
                  info@networkten.in.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}