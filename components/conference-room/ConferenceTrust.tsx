"use client";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

const trustItems = [
  {
    icon: <EngineeringRoundedIcon />,
    title: "Professional Installation",
    text: "Complete installation and configuration by experienced technicians.",
    gradient: "linear-gradient(135deg,#10a875,#0dbb80)",
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: "Quality Equipment",
    text: "Reliable professional-grade products selected for your requirements.",
    gradient: "linear-gradient(135deg,#3878ff,#5b93ff)",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Dedicated Support",
    text: "Support doesn't stop when the installation is complete.",
    gradient: "linear-gradient(135deg,#a855f7,#c084fc)",
  },
  {
    icon: <WorkspacePremiumRoundedIcon />,
    title: "End-to-End Solution",
    text: "One team for design, products, integration, installation and support.",
    gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)",
  },
];

const stats = [
  { value: "250+", label: "Rooms Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "24/7", label: "Support Coverage" },
];

export default function ConferenceTrust() {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 9, md: 13 },
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* decorative backdrop */}
      <Box
        sx={{
          position: "absolute",
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: 640,
          height: 320,
          background:
            "radial-gradient(circle,rgba(16,168,117,.06),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 760,
            mx: "auto",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "#10a875",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".16em",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#10a875",
              }}
            />
            WHY NETWORK TEN
          </Box>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 35, md: 52 },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-.045em",
            }}
          >
            Technology is easy.
            <br />
            <Box component="span" sx={{ color: "#10a875" }}>
              Getting it right isn't.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              color: "#707a8b",
              lineHeight: 1.75,
              fontSize: 16,
            }}
          >
            We combine products, technology and real-world installation
            experience to deliver conference environments that simply work.
          </Typography>
        </Box>

        {/* TRUST CARDS — plain CSS grid, no MUI Grid dependency */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
          }}
        >
          {trustItems.map((item) => (
            <Box
              key={item.title}
              sx={{
                position: "relative",
                textAlign: "center",
                px: 3,
                py: 4.5,
                borderRadius: "22px",
                border: "1px solid #e9edf2",
                backgroundColor: "#fff",
                transition: "all .35s cubic-bezier(.2,.8,.2,1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "rgba(16,168,117,.3)",
                  boxShadow: "0 25px 55px rgba(7,21,47,.10)",
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "18px",
                  color: "#fff",
                  background: item.gradient,
                  boxShadow: "0 12px 24px rgba(7,21,47,.14)",
                }}
              >
                {item.icon}
              </Box>

              <Typography
                sx={{
                  mt: 3,
                  fontWeight: 800,
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#788294",
                  fontSize: 13.5,
                  lineHeight: 1.7,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* STATS BAR — premium credibility strip */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            borderRadius: "24px",
            background: "linear-gradient(135deg,#06142c,#0b2043)",
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(4, 1fr)",
            },
            gap: { xs: 3, md: 2 },
            boxShadow: "0 30px 70px rgba(6,20,43,.25)",
          }}
        >
          {stats.map((stat, i) => (
            <Box
              key={stat.label}
              sx={{
                textAlign: "center",
                borderRight: {
                  xs: "none",
                  sm:
                    i !== stats.length - 1
                      ? "1px solid rgba(255,255,255,.12)"
                      : "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 26, md: 34 },
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg,#fff,#8df2c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: { xs: 11.5, md: 12.5 },
                  color: "rgba(255,255,255,.6)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}