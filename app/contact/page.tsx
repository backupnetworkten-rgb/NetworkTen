"use client";

import React, {
  useRef,
  useState,
} from "react";

import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import Link from "next/link";

import CallRoundedIcon from "@mui/icons-material/CallRounded";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const sendEmail = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_5pihald",
        "template_yvpmymr",
        formRef.current!,
        "KzFKcKsxL-7bNGn4M"
      );

      setOpen(true);

      formRef.current?.reset();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom, #f8fbff, #ffffff)",

        minHeight: "100vh",

        overflow: "hidden",
      }}
    >
      {/* HERO */}
      <Box
        sx={{
          position: "relative",

          height: {
            xs: 190,
            md: 240,
          },

          overflow: "hidden",
        }}
      >
        {/* CONTACT THEME IMAGE */}
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop"
          alt="contact"
          sx={{
            width: "100%",
            height: "100%",

            objectFit: "cover",
          }}
        />

        {/* OVERLAY */}
        <Box
          sx={{
            position: "absolute",

            inset: 0,

            background:
              "linear-gradient(to right, rgba(8,20,46,0.95), rgba(8,20,46,0.65))",
          }}
        />

        {/* CONTENT */}
        <Container
          maxWidth="xl"
          sx={{
            position: "absolute",

            inset: 0,

            display: "flex",

            flexDirection: "column",

            justifyContent:
              "center",
          }}
        >
          {/* BACK */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",

                alignItems: "center",

                gap: 0.6,

                px: 1.4,

                py: 0.6,

                borderRadius: "40px",

                background:
                  "rgba(255,255,255,0.10)",

                backdropFilter:
                  "blur(12px)",

                border:
                  "1px solid rgba(255,255,255,0.12)",

                color: "#ffffff",

                mb: 1.4,

                transition: "0.3s",

                "&:hover": {
                  background:
                    "rgba(255,255,255,0.16)",
                },
              }}
            >
              <ArrowBackRoundedIcon
                sx={{
                  fontSize: 16,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 600,
                }}
              >
                Back To Home
              </Typography>
            </Box>
          </Link>

          {/* TITLE */}
          <Typography
            sx={{
              color: "#ffffff",

              fontWeight: 900,

              lineHeight: 1.02,

              letterSpacing:
                "-1px",

              fontSize: {
                xs: "32px",
                md: "52px",
              },
            }}
          >
            Contact
            <Box
              component="span"
              sx={{
                color: "#8BC53F",

                ml: 1,
              }}
            >
              NetworkTen
            </Box>
          </Typography>

          {/* SUBTITLE */}
          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.74)",

              mt: 1,

              maxWidth: "620px",

              lineHeight: 1.8,

              fontSize: {
                xs: "11px",
                md: "13px",
              },
            }}
          >
            Let's discuss your networking,
            surveillance, automation and
            enterprise infrastructure
            requirements with our expert
            team.
          </Typography>
        </Container>
      </Box>

      {/* MAIN */}
      <Container
        maxWidth="xl"
        sx={{
          mt: {
            xs: -2,
            md: -3,
          },

          position: "relative",

          zIndex: 5,

          pb: 0,
        }}
      >
        {/* GRID */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "0.78fr 1.22fr",
            },

            gap: 2,

            alignItems: "stretch",
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #08142e, #102048)",

              borderRadius: "30px",

              p: {
                xs: 2.2,
                md: 2.5,
              },

              color: "#fff",

              position: "relative",

              overflow: "hidden",

              boxShadow:
                "0 18px 40px rgba(8,20,46,0.16)",

              height: "100%",
            }}
          >
            {/* GLOW */}
            <Box
              sx={{
                position: "absolute",

                width: 240,

                height: 240,

                borderRadius: "50%",

                background:
                  "rgba(139,197,63,0.12)",

                top: -100,

                right: -100,

                filter: "blur(90px)",
              }}
            />

            {/* TITLE */}
            <Typography
              sx={{
                fontWeight: 900,

                lineHeight: 1.08,

                mb: 1.8,

                position: "relative",

                zIndex: 2,

                fontSize: {
                  xs: "24px",
                  md: "30px",
                },
              }}
            >
              Get In Touch
            </Typography>

            {/* CONTACT ITEMS */}
            {[
              {
                icon:
                  <CallRoundedIcon />,

                title: "Phone",

                value:
                  "+91 8687878755",
              },

              {
                icon:
                  <EmailRoundedIcon />,

                title: "Email",

                value:
                  "info@networkten.in",
              },

              {
                icon:
                  <LocationOnRoundedIcon />,

                title: "Address",

                value:
                  "Chanakya Place, E3 / 37D, Uttam Nagar, New Delhi - 110059",
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",

                  gap: 1.2,

                  alignItems:
                    "flex-start",

                  background:
                    "rgba(255,255,255,0.06)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  backdropFilter:
                    "blur(12px)",

                  borderRadius:
                    "18px",

                  p: 1.4,

                  mb: 1.2,

                  position:
                    "relative",

                  zIndex: 2,
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: 44,

                    height: 44,

                    borderRadius:
                      "14px",

                    background:
                      "rgba(139,197,63,0.18)",

                    color: "#8BC53F",

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>

                {/* CONTENT */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,

                      fontSize:
                        "14px",

                      mb: 0.2,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color:
                        "rgba(255,255,255,0.72)",

                      lineHeight:
                        1.55,

                      fontSize:
                        "11.5px",
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* DIVIDER */}
            <Divider
              sx={{
                borderColor:
                  "rgba(255,255,255,0.08)",

                my: 1.8,
              }}
            />

            {/* EXTRA PREMIUM CONTENT */}
            <Box
              sx={{
                display: "grid",

                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  gap: 1,

                  alignItems:
                    "center",
                }}
              >
                <VerifiedRoundedIcon
                  sx={{
                    color: "#8BC53F",

                    fontSize: 20,
                  }}
                />

                <Typography
                  sx={{
                    fontSize:
                      "12px",

                    color:
                      "rgba(255,255,255,0.75)",
                  }}
                >
                  Trusted Enterprise IT
                  Solutions Provider
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",

                  gap: 1,

                  alignItems:
                    "center",
                }}
              >
                <AccessTimeFilledRoundedIcon
                  sx={{
                    color: "#8BC53F",

                    fontSize: 20,
                  }}
                />

                <Typography
                  sx={{
                    fontSize:
                      "12px",

                    color:
                      "rgba(255,255,255,0.75)",
                  }}
                >
                  Monday - Saturday |
                  10:00 AM - 7:00 PM
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* FORM */}
          <Box
            component="form"
            ref={formRef}
            onSubmit={sendEmail}
            sx={{
              background:
                "linear-gradient(180deg, #ffffff, #fbfdff)",

              borderRadius: "30px",

              p: {
                xs: 2.2,
                md: 2.6,
              },

              boxShadow:
                "0 18px 40px rgba(0,0,0,0.05)",

              border:
                "1px solid rgba(8,20,46,0.05)",

              position: "relative",

              overflow: "hidden",
            }}
          >
            {/* LIGHT */}
            <Box
              sx={{
                position: "absolute",

                width: 220,

                height: 220,

                borderRadius: "50%",

                background:
                  "rgba(139,197,63,0.08)",

                top: -100,

                right: -100,

                filter: "blur(80px)",
              }}
            />

            <Typography
              sx={{
                color: "#08142e",

                fontWeight: 800,

                mb: 1.8,

                position: "relative",

                zIndex: 2,

                fontSize: {
                  xs: "22px",
                  md: "28px",
                },
              }}
            >
              Send Message
            </Typography>

            <Box
              sx={{
                display: "grid",

                gap: 1.4,

                position: "relative",

                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                size="small"
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                size="small"
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                size="small"
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                name="message"
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background:
                    "linear-gradient(135deg, #8BC53F, #74ab35)",

                  borderRadius:
                    "40px",

                  py: 1.1,

                  fontWeight: 700,

                  textTransform:
                    "none",

                  fontSize: "13px",

                  boxShadow:
                    "0 10px 24px rgba(139,197,63,0.25)",

                  transition: "0.3s",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #74ab35, #66982f)",

                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* MAP */}
        <Box
          sx={{
            mt: 2,

            position: "relative",

            borderRadius: "30px",

            overflow: "hidden",

            height: {
              xs: "250px",
              md: "320px",
            },

            boxShadow:
              "0 18px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* ADDRESS CARD */}
          <Box
            sx={{
              position: "absolute",

              top: 18,

              left: 18,

              zIndex: 5,

              background:
                "rgba(255,255,255,0.94)",

              backdropFilter:
                "blur(12px)",

              borderRadius: "18px",

              p: 1.5,

              maxWidth: "320px",

              boxShadow:
                "0 10px 25px rgba(0,0,0,0.10)",
            }}
          >
            <Typography
              sx={{
                color: "#08142e",

                fontWeight: 800,

                mb: 0.5,

                fontSize: "14px",
              }}
            >
              NetworkTen Office
            </Typography>

            <Typography
              sx={{
                color: "#667085",

                lineHeight: 1.6,

                fontSize: "12px",

                mb: 1.2,
              }}
            >
              Chanakya Place, E3 / 37D,
              Uttam Nagar, New Delhi -
              110059
            </Typography>

            <Button
              component="a"
              href="https://www.google.com/maps/search/Network+Ten/@28.6130264,77.0784194,17z?hl=en&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              variant="contained"
              size="small"
              sx={{
                background:
                  "#08142e",

                borderRadius:
                  "30px",

                textTransform:
                  "none",

                fontWeight: 700,

                px: 1.8,

                fontSize: "11px",

                "&:hover": {
                  background:
                    "#102048",
                },
              }}
            >
              Open In Google Maps
            </Button>
          </Box>

          {/* MAP */}
          <iframe
            src="https://maps.google.com/maps?q=28.6130264,77.0784194&z=16&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
            }}
            loading="lazy"
          />
        </Box>

        {/* SUCCESS */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity="success"
            variant="filled"
          >
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}