// components/orders/OrdersHeader.tsx
"use client";

import { Box, Typography } from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const sans = "'Inter','DM Sans',system-ui,sans-serif";

export default function OrdersHeader({ totalOrders }: { totalOrders: number }) {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        background: "linear-gradient(135deg,#08142e 0%,#0f2248 60%,#1a3a6e 100%)",
        p: { xs: "28px 24px", md: "40px 48px" },
        mb: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative circles */}
      {[200, 320, 420].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            top: "50%", right: -size / 3,
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "10px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: "#7eb3ff" }} />
        </Box>
        <Typography sx={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
          textTransform: "uppercase", color: "#7eb3ff", fontFamily: sans,
        }}>
          My Orders
        </Typography>
      </Box>

      <Typography sx={{
        fontSize: { xs: "32px", md: "48px" }, fontWeight: 900,
        color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1,
        fontFamily: sans, mb: 1,
      }}>
        Orders &amp; Tracking
      </Typography>

      <Typography sx={{
        fontSize: "14px", color: "rgba(255,255,255,0.55)",
        fontFamily: sans, mb: 3,
      }}>
        Track all your purchases and download invoices
      </Typography>

      {/* stat pill */}
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
        <Box sx={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "12px", px: 2.5, py: 1.2,
          display: "flex", alignItems: "center", gap: 1,
        }}>
          <Box sx={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 6px #4ade80",
          }} />
          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#fff", fontFamily: sans }}>
            {totalOrders} order{totalOrders !== 1 ? "s" : ""} placed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}