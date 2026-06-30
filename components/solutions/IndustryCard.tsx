"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

interface IndustryCardProps {
  industry?: {
    id: number;
    title: string;
    description: string;
    image: string;
    icon: any;
    solutions: number;
  };
}

export default function IndustryCard({
  industry,
}: IndustryCardProps) {

  // Prevent crash if no data is passed
  if (!industry) {
    return null;
  }

  // Fallback icon
  const Icon = industry.icon || BusinessRoundedIcon;

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "28px",
        border: "1px solid #edf1f7",
        background: "#fff",
        transition: ".35s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 25px 60px rgba(16,32,72,.10)",
        },
      }}
    >
      {/* IMAGE */}

      <Box
        sx={{
          position: "relative",
          height: 230,
          overflow: "hidden",
        }}
      >
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          style={{
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(8,20,46,.75),transparent)",
          }}
        />

        <Chip
          label={`${industry.solutions}+ Solutions`}
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#8BC53F",
            color: "#08142e",
            fontWeight: 700,
          }}
        />
      </Box>

      {/* CONTENT */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: 62,
            height: 62,
            borderRadius: "18px",
            background: "rgba(139,197,63,.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Icon
            sx={{
              fontSize: 34,
              color: "#102048",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: 900,
            fontSize: 24,
            color: "#102048",
            mb: 1.5,
          }}
        >
          {industry.title}
        </Typography>

        <Typography
          sx={{
            color: "#667085",
            lineHeight: 1.8,
            flexGrow: 1,
            mb: 3,
            fontSize: 14,
          }}
        >
          {industry.description}
        </Typography>

        <Button
          component={Link}
          href="/contact"
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            height: 50,
            borderRadius: "16px",
            background: "#102048",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              background: "#08142e",
            },
          }}
        >
          Talk To Our Expert
        </Button>
      </Box>
    </Paper>
  );
}