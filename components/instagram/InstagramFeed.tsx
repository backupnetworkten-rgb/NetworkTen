"use client";

import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

const C = {
  surface: "#ffffff",
  border: "#e8e8e8",
  heading: "#0a0a0a",
  textSub: "#555555",
};

interface InstagramFeedProps {
  handle: string;      // your Instagram username, WITHOUT the @ symbol
  widgetSrc: string;   // the SnapWidget embed src URL, e.g. "https://snapwidget.com/embed/1234567"
  height?: number;      // widget height in px, default 420
}

export default function InstagramFeed({ handle, widgetSrc, height = 420 }: InstagramFeedProps) {
  return (
    <Box
      sx={{
        background: C.surface,
        borderRadius: "14px",
        border: `1px solid ${C.border}`,
        p: "24px",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InstagramIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: C.heading,
                fontFamily: sans,
                lineHeight: 1.2,
              }}
            >
              Follow us on Instagram
            </Typography>
            <Typography sx={{ fontSize: "12px", color: C.textSub, fontFamily: sans }}>
              @{handle}
            </Typography>
          </Box>
        </Box>

        <IconButton
          component="a"
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            width: 36,
            height: 36,
            "&:hover": { background: "#fdf2f8" },
          }}
        >
          <InstagramIcon sx={{ fontSize: 18, color: "#dd2a7b" }} />
        </IconButton>
      </Box>

      {/* SnapWidget embed */}
      <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <iframe
  src={widgetSrc}
  className="snapwidget-widget"
  allowtransparency="true"
  frameBorder="0"
  scrolling="no"
  style={{ border: "none", overflow: "hidden", width: "100%", display: "block" }}
  height={height}
  title="Instagram feed"
/>
      </Box>
    </Box>
  );
}