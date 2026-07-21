"use client";

import React, { useEffect, useRef } from "react";
import { Paper, Box, Typography, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Module-level component — must NOT be redefined inside a parent's
 * function body, or React remounts the whole subtree (and every
 * TextField loses focus) on each keystroke.
 */
export function Section({
  title,
  icon,
  accentColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.75, sm: 3 },
        borderRadius: "16px",
        border: "1px solid #eef0f4",
        borderLeft: `5px solid ${accentColor}`,
        mb: { xs: 2, sm: 3 },
        background: "#ffffff",
        boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
        transition: "box-shadow 0.2s ease",
        overflow: "hidden",
        "&:hover": { boxShadow: "0 4px 14px rgba(16, 24, 40, 0.08)" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5, flexWrap: "wrap" }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            minWidth: 34,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${accentColor}1A`,
            color: accentColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            color: "#08142e",
            fontSize: { xs: "0.92rem", sm: "1.08rem" },
            letterSpacing: "0.2px",
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2.5, mt: 1.5 }} />
      <Grid container spacing={{ xs: 1.75, sm: 2.5 }}>
        {children}
      </Grid>
    </Paper>
  );
}

export function SignaturePad({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const hasContent = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = value;
      hasContent.current = true;
    } else {
      hasContent.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawing.current = true;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#08142e";
    ctx.lineTo(x, y);
    ctx.stroke();
    hasContent.current = true;
  };

  const endDraw = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas && hasContent.current) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    hasContent.current = false;
    onChange("");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        borderColor: "#d7dce3",
        p: 1.25,
        background: "#fff",
      }}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        style={{
          width: "100%",
          height: "180px",
          touchAction: "none",
          cursor: "crosshair",
          borderRadius: "8px",
          background:
            "repeating-linear-gradient(0deg, #fff, #fff 39px, #eef1f6 40px)",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "#98a2b3" }}>
          Sign above using mouse or touch
        </Typography>
        <Tooltip title="Clear signature">
          <IconButton size="small" onClick={clearPad}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}

export const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fbfcfd",
    "&.Mui-focused": {
      background: "#ffffff",
    },
  },
};

export const dateSlotProps = {
  inputLabel: { shrink: true },
};

export const ACCENTS = {
  reportInfo: "#3F6FE0",
  customer: "#8BC53F",
  engineer: "#F0A202",
  call: "#E4572E",
  equipment: "#6A4C93",
  summary: "#17A398",
  feedback: "#D7263D",
};