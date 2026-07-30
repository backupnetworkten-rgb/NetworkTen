"use client";

import { useState } from "react";
import { Box, Dialog, Typography, Button, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";
const REVIEW_LINK = "https://g.page/r/Cf2lvqy3MPuJEBM/review";

export default function GoogleReviewBadge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Floating vertical tab ── */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 0,
          top: "42%",
          transform: "translateY(-50%)",
          zIndex: 1200,
          background: "#0a0a0a",
          color: "#fff",
          borderRadius: "10px 0 0 10px",
          px: 1.1,
          py: 1.8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.6,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "#1a1a1a",
            px: 1.3,
          },
        }}
      >
        <StarRoundedIcon sx={{ fontSize: 18, color: "#facc15" }} />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: sans,
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "1px",
          }}
        >
          Reviews
        </Typography>
      </Box>

      {/* ── Popup ── */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "18px",
              overflow: "hidden",
              fontFamily: sans,
            },
          },
        }}
      >
        <Box sx={{ position: "relative", p: "32px 28px 28px" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              color: "#999",
              "&:hover": { background: "#f5f5f5" },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {/* Google icon */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#f5f5f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.4 0-13.8 4.2-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5c-2 1.4-4.6 2.3-7.5 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.9 39.6 16.4 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C39.4 37 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"/>
            </svg>
          </Box>

          {/* Stars */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.3, mb: 1.5 }}>
            {[...Array(5)].map((_, i) => (
              <StarRoundedIcon key={i} sx={{ fontSize: 22, color: "#facc15" }} />
            ))}
          </Box>

          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#0a0a0a",
              textAlign: "center",
              fontFamily: sans,
              mb: 0.7,
            }}
          >
            Enjoying your experience?
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#666",
              textAlign: "center",
              fontFamily: sans,
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            We'd love to hear your feedback. Leave us a quick review on Google
            — it only takes a minute and really helps us out!
          </Typography>

          <Button
            component="a"
            href={REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{
              height: 48,
              borderRadius: "11px",
              background: "#0a0a0a",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              fontFamily: sans,
              "&:hover": { background: "#222" },
            }}
          >
            Write a Google Review
          </Button>

          <Button
            onClick={() => setOpen(false)}
            fullWidth
            sx={{
              mt: 1,
              height: 40,
              borderRadius: "11px",
              color: "#999",
              fontWeight: 600,
              fontSize: "13px",
              textTransform: "none",
              fontFamily: sans,
              "&:hover": { background: "#f5f5f5" },
            }}
          >
            Maybe later
          </Button>
        </Box>
      </Dialog>
    </>
  );
}