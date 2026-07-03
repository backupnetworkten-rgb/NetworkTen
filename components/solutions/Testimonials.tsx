"use client";

import React from "react";
import { Box, Container, Typography, Avatar, Rating } from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Nitesh Sharma",
    role: "Operations Head",
    company: "Banking Sector Client",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    quote:
      "NetworkTen handled our branch-wide CCTV and networking rollout with zero disruption to daily operations. Professional from survey to sign-off.",
  },
  {
    name: "Poonam",
    role: "Facility Manager",
    company: "Education Campus",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    quote:
      "Our smart classroom and campus networking upgrade was delivered on time and on budget. Their support team is genuinely responsive.",
  },
  {
    name: "Rupesh",
    role: "IT Director",
    company: "Healthcare Group",
    avatar: "https://i.pravatar.cc/100?img=51",
    rating: 5,
    quote:
      "Reliable infrastructure that hasn't given us a single major issue since installation. The AMC support has been excellent.",
  },
  {
    name: "Rashmi",
    role: "General Manager",
    company: "Hospitality Chain",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    quote:
      "From guest WiFi to smart room controls, the entire automation setup elevated our guest experience significantly.",
  },
  {
    name: "Rahul",
    role: "Admin Head",
    company: "Corporate Office",
    avatar: "https://i.pravatar.cc/100?img=60",
    rating: 5,
    quote:
      "Structured cabling and conferencing setup across three floors, completed faster than we expected. Highly recommend their team.",
  },
  {
    name: "Pallavi",
    role: "Homeowner",
    company: "Residential Client",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    quote:
      "Complete home automation and security setup for our farmhouse. Clean installation and the app just works reliably.",
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "#fff",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(139,197,63,.1)",
              border: "1px solid rgba(139,197,63,.28)",
              borderRadius: "16px",
              px: 1.3,
              py: "4px",
              mb: 1.8,
            }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: "#6fa52e",
              }}
            />
            <Typography
              sx={{
                color: "#5c9128",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              Client Feedback
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#0c1a2e",
              fontWeight: 800,
              fontSize: { xs: 22, md: 30 },
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
              mb: 1,
            }}
          >
            Trusted By{" "}
            <Box component="span" sx={{ color: "#6fa52e" }}>
              Businesses Like Yours
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(12,26,46,.6)",
              fontSize: 13,
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.65,
            }}
          >
            Real feedback from clients across banking, education, healthcare,
            hospitality and enterprise offices.
          </Typography>
        </Box>

        {/* Testimonial grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {testimonials.map((t) => (
            <Box
              key={t.name}
              sx={{
                position: "relative",
                p: 2.75,
                borderRadius: "16px",
                background: "#f6f8fb",
                border: "1px solid rgba(12,26,46,.06)",
                transition: "all .2s",
                "&:hover": {
                  borderColor: "rgba(139,197,63,.3)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 24px rgba(12,26,46,.06)",
                },
              }}
            >
              <FormatQuoteRoundedIcon
                sx={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  fontSize: 28,
                  color: "rgba(111,165,46,.15)",
                }}
              />

              <Rating
                value={t.rating}
                readOnly
                size="small"
                sx={{
                  mb: 1.4,
                  color: "#6fa52e",
                  fontSize: 16,
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(12,26,46,.15)",
                  },
                }}
              />

              <Typography
                sx={{
                  color: "rgba(12,26,46,.72)",
                  fontSize: 12.5,
                  lineHeight: 1.7,
                  mb: 2.2,
                  minHeight: { sm: 84 },
                }}
              >
                "{t.quote}"
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{
                    width: 38,
                    height: 38,
                    border: "1.5px solid #fff",
                    boxShadow: "0 2px 8px rgba(12,26,46,.1)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#0c1a2e",
                      fontWeight: 800,
                      fontSize: 12.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(12,26,46,.5)",
                      fontSize: 11,
                      lineHeight: 1.3,
                    }}
                  >
                    {t.role} · {t.company}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}