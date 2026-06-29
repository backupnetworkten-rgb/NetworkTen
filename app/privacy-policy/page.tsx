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

import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

const sections = [
  {
    title:
      "Information We Collect",

    points: [
      "We may collect personal information such as name, email address, phone number, company details and service enquiries submitted through our website or communication channels.",

      "Technical information including browser type, IP address, device information, operating system and website interaction data may be collected automatically for analytics and performance improvement.",

      "Customer communication records may be stored for support, service management and operational purposes.",
    ],
  },

  {
    title:
      "How We Use Information",

    points: [
      "To provide networking, surveillance, automation and smart technology related services.",

      "To respond to enquiries, quotations, support requests and customer communication.",

      "To improve website functionality, customer experience and operational efficiency.",

      "To communicate important updates, maintenance notifications, promotional information and service announcements.",

      "To maintain internal business records and improve service quality.",
    ],
  },

  {
    title:
      "Customer Data Protection",

    points: [
      "NetworkTen follows industry-standard security practices and modern technologies to safeguard customer information.",

      "Access to customer information is restricted only to authorized personnel and operational teams.",

      "Reasonable security measures are implemented to prevent unauthorized access, disclosure, misuse or modification of information.",

      "While we strive to protect all customer data, internet-based systems cannot guarantee complete security against all threats.",
    ],
  },

  {
    title:
      "Cookies & Tracking Technologies",

    points: [
      "Our website may use cookies and similar technologies to improve user experience and website functionality.",

      "Cookies help us understand visitor preferences, improve performance and optimize website services.",

      "Analytics platforms may collect anonymous traffic and behavioural information for performance monitoring.",

      "Users can disable cookies through browser settings if preferred.",
    ],
  },

  {
    title:
      "Third-Party Integrations",

    points: [
      "Our website may integrate third-party services including Google Maps, analytics tools, review platforms, social media integrations and communication services.",

      "Third-party platforms may process limited technical data according to their own privacy policies.",

      "NetworkTen is not responsible for privacy practices or policies of external third-party websites and services.",
    ],
  },

  {
    title:
      "Communication & Notifications",

    points: [
      "Customers may receive service updates, notifications, support responses or business communication based on interactions with our platform.",

      "Marketing or promotional communication may be sent occasionally regarding products, solutions or services.",

      "Users may request removal from marketing communications at any time.",
    ],
  },

  {
    title:
      "Data Retention",

    points: [
      "Customer information may be retained for operational, legal, security and service-related purposes.",

      "Information is retained only for as long as necessary to fulfill business or regulatory requirements.",

      "Certain records may be maintained for audit, support or compliance purposes.",
    ],
  },

  {
    title:
      "User Rights & Responsibilities",

    points: [
      "Users may contact NetworkTen regarding questions about their information or privacy concerns.",

      "Users are responsible for ensuring submitted information is accurate and updated.",

      "Unauthorized use of our website or services may result in restricted access or legal action where applicable.",
    ],
  },

  {
    title:
      "Policy Updates",

    points: [
      "This Privacy Policy may be updated periodically to reflect operational, technological or legal changes.",

      "Updated versions will be published on this page with immediate effect upon posting.",

      "Continued use of our website and services after updates indicates acceptance of revised policies.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>
          Privacy Policy |
          NetworkTen
        </title>

        <meta
          name="description"
          content="Official Privacy Policy of NetworkTen regarding customer information, security practices, cookies, data protection and website usage."
        />
      </Head>

      <Navbar />

      {/* HERO */}
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
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1800&auto=format&fit=crop"
          alt="Privacy Policy"
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
              <GppGoodRoundedIcon />
            }
            label="Privacy & Security"
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
            Privacy Policy
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
            Learn how NetworkTen
            protects, manages and uses
            customer information while
            delivering premium networking,
            surveillance and business
            technology solutions.
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
                Commitment To Privacy
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
                At NetworkTen, customer
                trust and information
                security remain our
                priority. This Privacy
                Policy explains how
                customer information is
                collected, processed,
                stored and protected while
                using our website,
                products and services.
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
                  Contact Us
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
                  privacy, security or
                  customer information,
                  please contact
                  NetworkTen at
                  info@networkten.in or
                  reach our support team
                  through the official
                  contact page.
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