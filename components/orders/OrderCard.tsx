// components/orders/OrderCard.tsx
"use client";

import { useState } from "react";
import {
  Box, Typography, Divider, Chip, Collapse, Button,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon   from "@mui/icons-material/KeyboardArrowUpRounded";
import LocalShippingOutlinedIcon    from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlinedIcon      from "@mui/icons-material/CheckCircleOutlined";
import HomeOutlinedIcon             from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeOutlinedIcon    from "@mui/icons-material/CurrencyRupeeOutlined";
import QrCode2OutlinedIcon          from "@mui/icons-material/QrCode2Outlined";
import DownloadOutlinedIcon         from "@mui/icons-material/DownloadOutlined";
import { Order } from "@/lib/orderStore";
import { proxyImage } from "@/lib/proxyImage";

const sans = "'Inter','DM Sans',system-ui,sans-serif";

const C = {
  surface:     "#ffffff",
  surfaceWarm: "#fafafa",
  surfaceGray: "#f2f2f2",
  border:      "#e8e8e8",
  borderLight: "#f0f0f0",
  heading:     "#0a0a0a",
  textSub:     "#555555",
  textMuted:   "#999999",
  blue:        "#1a5fb4",
  blueLight:   "#eff6ff",
  blueBorder:  "#bfdbfe",
  green:       "#16a34a",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function fmtDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const sm = s.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const em = e.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return `${sm} – ${em}`;
}

// Derive a simple status from dates
function getStatus(order: Order): "Delivered" | "Out for Delivery" | "In Transit" | "Confirmed" {
  const now = new Date();
  const start = new Date(order.estimatedDeliveryStart);
  const end   = new Date(order.estimatedDeliveryEnd);
  if (now > end)   return "Delivered";
  if (now >= start) return "Out for Delivery";
  return "In Transit";
}

const STATUS_CONFIG = {
  "Delivered":       { color: C.green,    bg: C.greenLight,  border: C.greenBorder,  dot: "#4ade80" },
  "Out for Delivery":{ color: "#b45309",  bg: "#fffbeb",     border: "#fde68a",      dot: "#f59e0b" },
  "In Transit":      { color: C.blue,     bg: C.blueLight,   border: C.blueBorder,   dot: "#60a5fa" },
  "Confirmed":       { color: C.blue,     bg: C.blueLight,   border: C.blueBorder,   dot: "#60a5fa" },
};

export default function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(order);
  const sc     = STATUS_CONFIG[status];

  // Delivery progress 0–3
  const progress =
    status === "Confirmed"        ? 1 :
    status === "In Transit"       ? 2 :
    status === "Out for Delivery" ? 2 :
    3;

  const steps = ["Order Confirmed", "In Transit", "Delivered"];

  return (
    <Box sx={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: "18px",
      overflow: "hidden",
      mb: 2,
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      transition: "box-shadow .2s",
      "&:hover": { boxShadow: "0 4px 24px rgba(0,0,0,0.09)" },
    }}>

      {/* ── Header row ── */}
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2.5, md: 3.5 }, py: 2.5,
        background: C.surfaceWarm,
        borderBottom: `1px solid ${C.borderLight}`,
        flexWrap: "wrap", gap: 1.5,
      }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.4 }}>
            <Typography sx={{
              fontSize: "17px", fontWeight: 800,
              color: C.heading, fontFamily: sans, letterSpacing: "-0.3px",
            }}>
              #{order.orderId}
            </Typography>
            {/* Status chip */}
            <Box sx={{
              display: "inline-flex", alignItems: "center", gap: 0.6,
              background: sc.bg, border: `1px solid ${sc.border}`,
              borderRadius: "20px", px: 1.2, py: 0.35,
            }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot,
                boxShadow: `0 0 5px ${sc.dot}` }} />
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: sc.color, fontFamily: sans }}>
                {status}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: "12px", color: C.textMuted, fontFamily: sans }}>
            Placed on {fmtDate(order.placedAt)} · {order.totalQty} item{order.totalQty !== 1 ? "s" : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>Total paid</Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: 800, color: C.heading, letterSpacing: "-0.5px", fontFamily: sans }}>
              ₹{order.grandTotal.toLocaleString("en-IN")}
            </Typography>
          </Box>
          <Box
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: 36, height: 36, borderRadius: "10px",
              border: `1.5px solid ${C.border}`,
              background: C.surface, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .15s",
              "&:hover": { background: C.heading, borderColor: C.heading, color: "#fff" },
            }}
          >
            {expanded
              ? <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
              : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
            }
          </Box>
        </Box>
      </Box>

      {/* ── Items preview (always visible, first 2) ── */}
      <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        {order.items.slice(0, 3).map((item) => (
          <Box key={item.id} sx={{
            width: 56, height: 56, borderRadius: "10px",
            background: C.surfaceGray, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            p: 0.8, flexShrink: 0,
          }}>
            <img
              src={proxyImage(item.image)}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        ))}
        {order.items.length > 3 && (
          <Box sx={{
            width: 56, height: 56, borderRadius: "10px",
            background: C.surfaceGray, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: C.textSub, fontFamily: sans }}>
              +{order.items.length - 3}
            </Typography>
          </Box>
        )}

        {/* delivery window pill */}
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 0.8,
            background: C.blueLight, border: `1px solid ${C.blueBorder}`,
            borderRadius: "10px", px: 1.5, py: 0.8,
          }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: C.blue }} />
            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: C.blue, fontFamily: sans }}>
              Est. {fmtDateRange(order.estimatedDeliveryStart, order.estimatedDeliveryEnd)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Expanded details ── */}
      <Collapse in={expanded}>
        <Divider sx={{ borderColor: C.borderLight }} />

        {/* Tracking bar */}
        <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2.5 }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textMuted,
            textTransform: "uppercase", letterSpacing: "1px", mb: 2, fontFamily: sans }}>
            Tracking
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            {steps.map((step, i) => {
              const done   = i < progress;
              const active = i === progress - 1;
              return (
                <Box key={i} sx={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.6 }}>
                    <Box sx={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: done ? C.heading : C.surfaceGray,
                      border: `2px solid ${done ? C.heading : C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: active ? "0 0 0 4px rgba(10,10,10,0.08)" : "none",
                      transition: "all .2s",
                    }}>
                      <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: done ? "#fff" : C.textMuted }} />
                    </Box>
                    <Typography sx={{
                      fontSize: "10px", fontWeight: done ? 700 : 500,
                      color: done ? C.heading : C.textMuted, fontFamily: sans,
                      whiteSpace: "nowrap",
                    }}>
                      {step}
                    </Typography>
                  </Box>
                  {i < steps.length - 1 && (
                    <Box sx={{
                      flex: 1, height: "2px", mx: 1, mb: 2.5,
                      background: i < progress - 1 ? C.heading : C.border,
                      borderRadius: "2px", transition: "all .2s",
                    }} />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Divider sx={{ borderColor: C.borderLight }} />

        {/* All items */}
        <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2.5 }}>
          <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textMuted,
            textTransform: "uppercase", letterSpacing: "1px", mb: 2, fontFamily: sans }}>
            Items ordered
          </Typography>
          {order.items.map((item, idx) => (
            <Box key={item.id} sx={{
              display: "flex", alignItems: "center", gap: 2,
              py: 1.5,
              borderBottom: idx < order.items.length - 1 ? `1px solid ${C.borderLight}` : "none",
            }}>
              <Box sx={{
                width: 60, height: 60, borderRadius: "10px",
                background: C.surfaceGray, border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                p: 1, flexShrink: 0,
              }}>
                <img
                  src={proxyImage(item.image)}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 700, color: C.blue,
                  textTransform: "uppercase", letterSpacing: "0.8px", mb: 0.3, fontFamily: sans }}>
                  {item.brand}
                </Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, color: C.heading,
                  lineHeight: 1.3, fontFamily: sans,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: C.textMuted, mt: 0.3, fontFamily: sans }}>
                  Qty: {item.quantity}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading,
                flexShrink: 0, fontFamily: sans }}>
                ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: C.borderLight }} />

        {/* Bottom row: address + price breakdown + invoice */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 0,
        }}>
          {/* Address */}
          <Box sx={{
            px: { xs: 2.5, md: 3.5 }, py: 2.5,
            borderRight: { md: `1px solid ${C.borderLight}` },
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
              <HomeOutlinedIcon sx={{ fontSize: 14, color: C.textMuted }} />
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: "1px", fontFamily: sans }}>
                Delivery address
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, mb: 0.3, fontFamily: sans }}>
              {order.address.name}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.7, fontFamily: sans }}>
              {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}<br />
              {order.address.phone}
            </Typography>
            <Box sx={{
              mt: 1, display: "inline-flex", alignItems: "center", gap: 0.5,
              background: C.surfaceGray, borderRadius: "6px",
              px: 1, py: 0.3, fontSize: "10px", fontWeight: 700,
              color: C.textSub, fontFamily: sans, textTransform: "uppercase",
            }}>
              {order.address.tag}
            </Box>
          </Box>

          {/* Price breakdown */}
          <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
              {order.paymentMethod === "upi"
                ? <QrCode2OutlinedIcon sx={{ fontSize: 14, color: C.textMuted }} />
                : <CurrencyRupeeOutlinedIcon sx={{ fontSize: 14, color: C.textMuted }} />
              }
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: "1px", fontFamily: sans }}>
                Payment · {order.paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}
              </Typography>
            </Box>
            {[
              { label: "Subtotal",  value: `₹${order.subtotal.toLocaleString("en-IN")}` },
              ...(order.discount > 0 ? [{ label: "Discount", value: `−₹${order.discount.toLocaleString("en-IN")}`, green: true }] : []),
              { label: "Shipping",  value: order.shipping === 0 ? "FREE" : `₹${order.shipping}`, green: order.shipping === 0 },
            ].map((row: any, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography sx={{ fontSize: "12px", color: C.textMuted, fontFamily: sans }}>{row.label}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 600,
                  color: row.green ? C.green : C.heading, fontFamily: sans }}>{row.value}</Typography>
              </Box>
            ))}
            <Divider sx={{ borderColor: C.borderLight, my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Total</Typography>
              <Typography sx={{ fontSize: "15px", fontWeight: 800, color: C.heading, fontFamily: sans }}>
                ₹{order.grandTotal.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {/* Invoice button */}
            <Button
              fullWidth
              startIcon={<DownloadOutlinedIcon sx={{ fontSize: 15 }} />}
              onClick={() => window.print()}
              sx={{
                mt: 2, height: 40, borderRadius: "9px",
                border: `1.5px solid ${C.border}`,
                background: C.surface, color: C.heading,
                fontWeight: 700, fontSize: "12px", fontFamily: sans,
                textTransform: "none",
                "&:hover": { background: C.heading, color: "#fff", borderColor: C.heading },
                transition: "all .15s",
              }}
            >
              Download Invoice
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}