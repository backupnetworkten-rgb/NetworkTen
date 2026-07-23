"use client";

import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

const C = {
  surface:     "#ffffff",
  surfaceWarm: "#fafafa",
  border:      "#e8e8e8",
  borderLight: "#f0f0f0",
  heading:     "#0a0a0a",
  textSub:     "#555555",
  textMuted:   "#999999",
};

interface InstagramFeedProps {
  handle: string;      // your Instagram username, WITHOUT the @ symbol
  widgetSrc: string;   // your SnapWidget embed src URL, e.g. "https://snapwidget.com/embed/1234567"
}

export default function InstagramFeed({ handle, widgetSrc }: InstagramFeedProps) {
  return (
    <Box
      sx={{
        background: C.surface,
        borderRadius: "18px",
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.05)",
        overflow: "hidden",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          py: "18px",
          borderBottom: `1px solid ${C.borderLight}`,
          background: C.surfaceWarm,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "11px",
              background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(221,42,123,0.25)",
            }}
          >
            <InstagramIcon sx={{ color: "#fff", fontSize: 21 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "15.5px",
                fontWeight: 700,
                color: C.heading,
                fontFamily: sans,
                lineHeight: 1.25,
                letterSpacing: "-0.2px",
              }}
            >
              Follow us on Instagram
            </Typography>
            <Typography sx={{ fontSize: "12px", color: C.textSub, fontFamily: sans, mt: 0.2 }}>
              @{handle}
            </Typography>
          </Box>
        </Box>

        <IconButton
          component="a"
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit @${handle} on Instagram`}
          sx={{
            border: `1.5px solid ${C.border}`,
            borderRadius: "9px",
            width: 38,
            height: 38,
            color: C.heading,
            transition: "all .15s",
            "&:hover": {
              background: "#fdf2f8",
              borderColor: "#dd2a7b",
              color: "#dd2a7b",
            },
          }}
        >
          <ArrowOutwardRoundedIcon sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>

      {/* SnapWidget embed — fixed height with overflow hidden, tuned to your
          3-column layout. Adjust the 480 values below if it feels slightly
          too tall (leftover blank space) or too short (bottom row clipped). */}
      <Box sx={{ px: "24px", py: "22px" }}>
        <Box sx={{ maxHeight: 480, overflow: "hidden", borderRadius: "10px" }}>
          <iframe
            src={widgetSrc}
            className="snapwidget-widget"
            frameBorder="0"
            scrolling="no"
            style={{ border: "none", overflow: "hidden", width: "100%", display: "block" }}
            height="480"
            title="Instagram feed"
          />
        </Box>
      </Box>
    </Box>
  );
}