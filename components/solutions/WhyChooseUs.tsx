"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

const features = [
  {
    icon: EngineeringRoundedIcon,
    title: "Certified Engineers",
    desc: "In-house certified teams handling design, installation and commissioning end-to-end.",
  },
  {
    icon: BoltRoundedIcon,
    title: "Rapid Deployment",
    desc: "Streamlined execution with minimal downtime for your business operations.",
  },
  {
    icon: WorkspacePremiumRoundedIcon,
    title: "Enterprise Grade",
    desc: "Only certified hardware sourced from trusted global brands.",
  },
  {
    icon: SupportAgentRoundedIcon,
    title: "24/7 Support",
    desc: "Dedicated post-installation support and AMC plans included.",
  },
];

const stats = [
  { value: "700+", label: "Projects Delivered" },
  { value: "12+", label: "Years Experience" },
  { value: "200+", label: "Enterprise Clients" },
  { value: "24/7", label: "Support" },
];

export default function WhyChooseUs() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* single subtle glow */}
      <Box
        sx={{
          position: "absolute",
          width: 340,
          height: 340,
          right: -120,
          top: -100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,32,72,.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
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
                bgcolor: "#8BC53F",
              }}
            />
            <Typography
              sx={{
                color: "#8BC53F",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              Why NetworkTen
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#102048",
              fontWeight: 800,
              fontSize: { xs: 22, md: 30 },
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
              mb: 1,
            }}
          >
            Built On Reliability, Delivered With{" "}
            <Box component="span" sx={{ color: "#8BC53F" }}>
              Precision
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#667085",
              fontSize: 13,
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.65,
            }}
          >
            From planning to post-installation support, every engagement is
            handled with enterprise-grade rigor.
          </Typography>
        </Box>

        {/* Feature grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 1.75,
            mb: { xs: 4, md: 5 },
          }}
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Box
                key={f.title}
                sx={{
                  p: 2.25,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#102048,#0c1a2e)",
                  border: "1px solid rgba(255,255,255,.07)",
                  boxShadow: "0 14px 30px rgba(16,32,72,.16)",
                  transition: "all .2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(139,197,63,.35)",
                    boxShadow: "0 18px 36px rgba(16,32,72,.22)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "rgba(139,197,63,.14)",
                    border: "1px solid rgba(139,197,63,.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  <Icon sx={{ fontSize: 17, color: "#8BC53F" }} />
                </Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13.5,
                    mb: 0.6,
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.6)",
                    fontSize: 11.5,
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Stats strip */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 0 },
            borderRadius: "16px",
            border: "1px solid rgba(16,32,72,.08)",
            background: "linear-gradient(135deg,#102048,#0c1a2e)",
            py: { xs: 2.5, md: 3 },
            boxShadow: "0 14px 30px rgba(16,32,72,.14)",
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={s.label}
              sx={{
                textAlign: "center",
                borderRight: {
                  xs: "none",
                  md:
                    i !== stats.length - 1
                      ? "1px solid rgba(255,255,255,.1)"
                      : "none",
                },
                px: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",
                  fontWeight: 800,
                  fontSize: { xs: 20, md: 24 },
                  letterSpacing: "-0.6px",
                  mb: 0.3,
                }}
              >
                {s.value}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,.65)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.2px",
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}