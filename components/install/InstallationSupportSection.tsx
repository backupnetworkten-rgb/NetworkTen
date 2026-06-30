// app/components/about/InstallationSupportSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, Container, Chip } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

const installationPoints = [
  "Excellence on best practices based Installation",
  "Analytical mindset of the team to make the things in effective manner.",
];

const maintenancePoints = [
  "Excellence on best practices based Support",
  "Comprehensive repository of products & excellence in reusable components",
  "Maintenance services for a large multiple companies",
  "Easy rollout process",
  "End To End Implementation for multiple Companies",
];

function ChecklistGroup({
  title,
  items,
  icon,
  flex,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  flex?: number;
}) {
  return (
    <Box
      sx={{
        flex: flex || 1,
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #edf1f7",
        boxShadow: "0 10px 30px rgba(8,20,46,0.05)",
        p: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 16px 40px rgba(8,20,46,0.09)",
          transform: "translateY(-3px)",
          borderColor: "rgba(139,197,63,0.3)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "13px",
            background: "linear-gradient(135deg, #8BC53F, #6da82f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 8px 18px rgba(139,197,63,0.25)",
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            color: "#102048",
            fontWeight: 900,
            fontSize: { xs: "18px", md: "20px" },
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 1.15 }}>
        {items.map((point, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(139,197,63,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                mt: "2px",
              }}
            >
              <CheckRoundedIcon sx={{ color: "#6da82f", fontSize: 13 }} />
            </Box>
            <Typography
              sx={{ color: "#475467", fontSize: { xs: "13.5px", md: "14px" }, lineHeight: 1.6 }}
            >
              {point}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function InstallationSupportSection() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5, lg: 8 } }}>
        {/* HEADER */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Chip
            label="What We Deliver"
            sx={{
              background: "rgba(139,197,63,0.10)",
              color: "#6da82f",
              fontWeight: 800,
              fontSize: "11px",
              letterSpacing: "1px",
              mb: 1.5,
              height: "26px",
            }}
          />
          <Typography
            sx={{
              color: "#08142e",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              fontSize: { xs: "26px", md: "36px" },
              maxWidth: "640px",
            }}
          >
            Installation, Maintenance &{" "}
            <Box component="span" sx={{ color: "#8BC53F" }}>
              Ongoing Support
            </Box>
          </Typography>
        </Box>

        {/* CONTENT — stretch so both columns share the same height */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
            gap: { xs: 2.5, md: 4 },
            alignItems: "stretch",
          }}
        >
          {/* LEFT: CHECKLIST CARDS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, md: 3 },
              height: "100%",
            }}
          >
            <ChecklistGroup
              title="Installation"
              items={installationPoints}
              icon={<BuildRoundedIcon sx={{ fontSize: 22 }} />}
              flex={0.75}
            />
            <ChecklistGroup
              title="Maintenance & Support (M&S)"
              items={maintenancePoints}
              icon={<SupportAgentRoundedIcon sx={{ fontSize: 22 }} />}
              flex={1.25}
            />
          </Box>

          {/* RIGHT: IMAGE PANEL — fills full height to match left column */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #f3fbf2 0%, #eef9f6 50%, #eef6fb 100%)",
              border: "1px solid #edf1f7",
              boxShadow: "0 16px 44px rgba(8,20,46,0.07)",
              height: { xs: 300, sm: 420, md: "100%" },
              minHeight: { md: 480 },
            }}
          >
            {/* Decorative corner glow for a premium feel */}
            <Box
              sx={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(139,197,63,0.12)",
                top: -90,
                right: -90,
                filter: "blur(70px)",
              }}
            />
            <Image
              src="/images/about/service-tree.png"
              alt="NetworkTen Installation & Maintenance Services"
              fill
              style={{ objectFit: "contain", padding: "28px" }}
              priority
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}