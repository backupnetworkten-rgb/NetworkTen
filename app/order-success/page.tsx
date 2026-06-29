"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Divider, Snackbar, Alert, CircularProgress } from "@mui/material";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon              from "@mui/icons-material/LockOutlined";
import VerifiedOutlinedIcon          from "@mui/icons-material/VerifiedOutlined";
import LocalShippingOutlinedIcon     from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleRoundedIcon        from "@mui/icons-material/CheckCircleRounded";
import ContentCopyRoundedIcon        from "@mui/icons-material/ContentCopyRounded";
import HomeOutlinedIcon              from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon          from "@mui/icons-material/BusinessOutlined";
import QrCode2OutlinedIcon           from "@mui/icons-material/QrCode2Outlined";
import CurrencyRupeeOutlinedIcon     from "@mui/icons-material/CurrencyRupeeOutlined";
import PrintOutlinedIcon             from "@mui/icons-material/PrintOutlined";
import StorefrontOutlinedIcon        from "@mui/icons-material/StorefrontOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { proxyImage } from "@/lib/proxyImage";
import { fetchUserOrders, getLocalOrders, type Order } from "@/lib/orderStore";

// ─── Design tokens (matched to checkout / cart / product pages) ───────────
const C = {
  pageBg:      "#f5f5f7",
  surface:     "#ffffff",
  surfaceWarm: "#fafafa",
  surfaceGray: "#f2f2f2",
  border:      "#e8e8e8",
  borderLight: "#f0f0f0",
  heading:     "#0a0a0a",
  text:        "#1a1a1a",
  textSub:     "#555555",
  textMuted:   "#999999",
  red:         "#dc2626",
  redLight:    "#fef2f2",
  blue:        "#1a5fb4",
  blueLight:   "#eff6ff",
  blueBorder:  "#bfdbfe",
  green:       "#16a34a",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
};

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

if (typeof document !== "undefined" && !document.getElementById("order-success-font")) {
  const s = document.createElement("style");
  s.id = "order-success-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    * { box-sizing: border-box; }
    @keyframes ringPop {
      0%   { transform: scale(0.6); opacity: 0; }
      60%  { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes checkDraw {
      from { stroke-dashoffset: 36; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes ringEcho {
      0%   { transform: scale(1); opacity: 0.35; }
      100% { transform: scale(1.55); opacity: 0; }
    }
    .order-success-ring { animation: ringPop 0.55s cubic-bezier(.2,1.4,.4,1) both; }
    .order-success-check { animation: checkDraw 0.45s 0.35s ease forwards; stroke-dasharray: 36; stroke-dashoffset: 36; }
    .order-success-echo { animation: ringEcho 1.4s ease-out 0.1s 1; }
    @media print {
      .no-print { display: none !important; }
    }
  `;
  document.head.appendChild(s);
}

const sectionSx = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
};

const headerSx = {
  display: "flex", alignItems: "center", gap: 1.2,
  px: "22px", py: "16px",
  borderBottom: `1px solid ${C.borderLight}`,
  background: C.surfaceWarm,
};

const TRUST = [
  { label: "Free Delivery", sub: "Above ₹1000", bg: "#dbeafe",
    icon: (
      <svg width="22" height="16" viewBox="0 0 40 24" fill="none">
        <rect x="1" y="3" width="21" height="14" rx="2" fill="#2563eb"/>
        <path d="M22 7h6l4 7v4H22V7z" fill="#1d4ed8"/>
        <circle cx="7" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
        <circle cx="29" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
      </svg>
    ) },
  { label: "2 Yr Warranty", sub: "Official", bg: "#eef3ff",
    icon: (
      <svg width="16" height="20" viewBox="0 0 26 30" fill="none">
        <path d="M13 1L1 6v9c0 6 4.5 11.5 12 13 7.5-1.5 12-7 12-13V6L13 1z" fill="#1a5fb4"/>
        <text x="13" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">2 YR</text>
      </svg>
    ) },
  { label: "GST Invoice", sub: "Included", bg: "#f0fdf4",
    icon: (
      <svg width="15" height="18" viewBox="0 0 24 28" fill="none">
        <rect x="1" y="1" width="18" height="22" rx="2" fill="#16a34a"/>
        <rect x="4" y="4" width="11" height="2" rx="1" fill="#bbf7d0"/>
        <rect x="4" y="8" width="8" height="1.5" rx="1" fill="#bbf7d0"/>
        <circle cx="17" cy="22" r="6" fill="#15803d" stroke="#fff" strokeWidth="1.5"/>
        <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
  { label: "7-Day Return", sub: "Easy & Free", bg: "#fff7ed",
    icon: (
      <svg width="20" height="17" viewBox="0 0 30 26" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" fill="#d97706"/>
        <path d="M7 11h10M7 15h7" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 2c3.5 2 5 5.5 5 8.5s-1.5 6.5-5 8.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M23 3l4-2.5-1.5 5.5z" fill="#f59e0b"/>
      </svg>
    ) },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order,   setOrder]   = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    setMounted(true);
    let active = true;

    (async () => {
      try {
        const orders = await fetchUserOrders();
        if (active) setOrder(orders[0] ?? null);
      } catch {
        // fetchUserOrders already falls back to local storage internally,
        // but guard against any unexpected throw
        if (active) setOrder(getLocalOrders()[0] ?? null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, []);

  if (!mounted) return null;

  const copyOrderId = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.orderId);
      setSnackbar(true);
    } catch {
      /* clipboard unavailable — ignore silently */
    }
  };

  // ── Top bar ────────────────────────────────────────────────────────────
  const TopBar = (
    <Box className="no-print" sx={{
      background: C.heading, px: 4, py: 1.9,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Typography sx={{ fontFamily: sans, fontSize: "19px", color: "#fff", fontWeight: 800, letterSpacing: "-0.4px" }}>
        Network<span style={{ color: "#5b9bf0" }}>Ten</span>
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 14, color: C.green }} />
        <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,.6)", fontWeight: 500, fontFamily: sans }}>
          Order Confirmed
        </Typography>
      </Box>
    </Box>
  );

  // ── Step bar (all 3 steps done) ──────────────────────────────────────────
  const StepBar = (
    <Box className="no-print" sx={{ background: C.surface, borderBottom: `1px solid ${C.border}`, px: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: 960, mx: "auto", height: 54 }}>
        {["Cart", "Checkout", "Confirmation"].map((label, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: 3.5 }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: "50%",
              border: `1.5px solid ${C.green}`, background: C.green,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
            </Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: sans, color: C.green }}>
              {label}
            </Typography>
            {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  // ══════════════════════════════════════════════════════════════════════
  // LOADING STATE — fetching from Firestore / local storage
  // ══════════════════════════════════════════════════════════════════════
  if (loading) {
    return (
      <>
        {TopBar}
        {StepBar}
        <Box sx={{
          background: C.pageBg, minHeight: "78vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: sans,
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={32} sx={{ color: C.heading }} />
            <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>
              Loading your order…
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // FALLBACK — no order found (direct visit / storage cleared / new user)
  // ══════════════════════════════════════════════════════════════════════
  if (!order) {
    return (
      <>
        {TopBar}
        {StepBar}
        <Box sx={{ background: C.pageBg, minHeight: "78vh", display: "flex", alignItems: "center", py: { xs: 6, md: 10 }, fontFamily: sans }}>
          <Container maxWidth="sm">
            <Box sx={{ ...sectionSx, textAlign: "center", px: { xs: 4, md: 7 }, py: { xs: 6, md: 8 } }}>
              <Box sx={{
                width: 88, height: 88, borderRadius: "50%",
                background: C.surfaceGray, border: `2px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 3,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 38, color: C.textMuted }} />
              </Box>
              <Typography sx={{ fontSize: "20px", fontWeight: 800, color: C.heading, mb: 1, fontFamily: sans }}>
                No recent order found
              </Typography>
              <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 4, lineHeight: 1.8, fontFamily: sans }}>
                We couldn't find an order to display. If you just placed one, try checking your email for confirmation.
              </Typography>
              <Button
                onClick={() => router.push("/products")}
                sx={{
                  background: C.heading, color: "#fff", borderRadius: "11px", px: 4.5, py: 1.5,
                  fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "14px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  "&:hover": { background: "#222" },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // SUCCESS STATE
  // ══════════════════════════════════════════════════════════════════════
  return (
    <>
      {TopBar}
      {StepBar}

      <Box sx={{ background: C.pageBg, minHeight: "100vh", pb: 8, fontFamily: sans }}>
        <Container maxWidth="lg">

          {/* ── Hero success card ───────────────────────────────────── */}
          <Box sx={{ ...sectionSx, textAlign: "center", px: { xs: 3, md: 6 }, py: { xs: 5, md: 6 }, mt: 3, mb: 2.5 }}>

            {/* Animated checkmark */}
            <Box sx={{ position: "relative", width: 84, height: 84, mx: "auto", mb: 3 }}>
              <Box className="order-success-echo" sx={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: `2px solid ${C.green}`,
              }} />
              <Box className="order-success-ring" sx={{
                width: 84, height: 84, borderRadius: "50%",
                background: C.greenLight, border: `2px solid ${C.greenBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" fill={C.green} />
                  <path
                    className="order-success-check"
                    d="M12 20.5l5.5 5.5L29 14"
                    stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  />
                </svg>
              </Box>
            </Box>

            <Typography sx={{ fontSize: { xs: "22px", md: "27px" }, fontWeight: 800, color: C.heading, mb: 1, fontFamily: sans, letterSpacing: "-0.4px" }}>
              Order placed successfully!
            </Typography>
            <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 3, fontFamily: sans }}>
              Thank you for shopping with NetworkTen. A confirmation has been sent to your registered email.
            </Typography>

            {/* Order ID + delivery estimate pills */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, justifyContent: "center" }}>
              <Box
                onClick={copyOrderId}
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  background: C.surfaceGray, border: `1px solid ${C.border}`,
                  borderRadius: "10px", px: 1.8, py: 1, cursor: "pointer",
                  transition: "all .15s",
                  "&:hover": { borderColor: C.heading },
                }}
              >
                <Typography sx={{ fontSize: "11px", color: C.textMuted, fontWeight: 600, fontFamily: sans }}>
                  Order ID
                </Typography>
                <Typography sx={{ fontSize: "12.5px", color: C.heading, fontWeight: 800, fontFamily: sans, letterSpacing: "0.3px" }}>
                  {order.orderId}
                </Typography>
                <ContentCopyRoundedIcon sx={{ fontSize: 13, color: C.textMuted }} />
              </Box>

              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 1,
                background: C.blueLight, border: `1px solid ${C.blueBorder}`,
                borderRadius: "10px", px: 1.8, py: 1,
              }}>
                <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: C.blue }} />
                <Typography sx={{ fontSize: "12.5px", color: C.blue, fontWeight: 700, fontFamily: sans }}>
                  Arriving {formatDate(order.estimatedDeliveryStart)} – {formatDate(order.estimatedDeliveryEnd)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Main grid ──────────────────────────────────────────── */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 340px" }, gap: 2.5 }}>

            {/* LEFT — Items ordered */}
            <Box sx={sectionSx}>
              <Box sx={headerSx}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 18, color: C.blue }} />
                <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                  Items ordered ({order.totalQty})
                </Typography>
              </Box>
              <Box sx={{ px: "22px" }}>
                {order.items.map((item, idx) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex", alignItems: "center", gap: 2,
                      py: 2,
                      borderBottom: idx < order.items.length - 1 ? `1px solid ${C.borderLight}` : "none",
                    }}
                  >
                    <Box sx={{
                      width: 64, height: 64, borderRadius: "10px",
                      background: C.surfaceGray, border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, p: 1,
                    }}>
                      <img
                        src={proxyImage(item.image)}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "1px", mb: 0.3, fontFamily: sans }}>
                        {item.brand}
                      </Typography>
                      <Typography sx={{
                        fontSize: "13px", fontWeight: 600, color: C.heading, lineHeight: 1.4,
                        fontFamily: sans,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: "11.5px", color: C.textMuted, mt: 0.4, fontFamily: sans }}>
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, flexShrink: 0, fontFamily: sans }}>
                      ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Action buttons */}
              <Box className="no-print" sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, px: "22px", py: "20px", borderTop: `1px solid ${C.borderLight}`, background: C.surfaceWarm }}>
                <Button
                  startIcon={<StorefrontOutlinedIcon sx={{ fontSize: 16 }} />}
                  onClick={() => router.push("/products")}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                    height: 44, borderRadius: "10px", fontWeight: 700, fontSize: "13px",
                    fontFamily: sans, textTransform: "none",
                    background: C.heading, color: "#fff", px: 2.5,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                    "&:hover": { background: "#222" },
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  startIcon={<PrintOutlinedIcon sx={{ fontSize: 16 }} />}
                  onClick={() => window.print()}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                    height: 44, borderRadius: "10px", fontWeight: 700, fontSize: "13px",
                    fontFamily: sans, textTransform: "none",
                    border: `1.5px solid ${C.border}`, color: C.heading, px: 2.5,
                    "&:hover": { borderColor: C.heading, background: C.surfaceGray },
                  }}
                >
                  Print Receipt
                </Button>
              </Box>
            </Box>

            {/* RIGHT — Delivery + payment + totals */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Delivery address */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 17, color: C.blue }} />
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Delivery address
                  </Typography>
                </Box>
                <Box sx={{ p: "18px 20px" }}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.5,
                    background: C.surfaceGray, color: C.textSub,
                    fontSize: "9px", fontWeight: 700, px: 0.9, py: 0.3,
                    borderRadius: "4px", textTransform: "uppercase", letterSpacing: ".5px",
                    mb: 0.8, fontFamily: sans,
                  }}>
                    {order.address.tag === "Home"
                      ? <HomeOutlinedIcon sx={{ fontSize: 10 }} />
                      : <BusinessOutlinedIcon sx={{ fontSize: 10 }} />}
                    {order.address.tag || "Address"}
                  </Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, mb: 0.4, fontFamily: sans }}>
                    {order.address.name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.65, fontFamily: sans }}>
                    {order.address.line1}
                    {order.address.line2 ? <><br />{order.address.line2}</> : null}
                    <br />{order.address.phone}
                  </Typography>
                </Box>
              </Box>

              {/* Payment method */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  {order.paymentMethod === "upi"
                    ? <QrCode2OutlinedIcon sx={{ fontSize: 17, color: C.blue }} />
                    : <CurrencyRupeeOutlinedIcon sx={{ fontSize: 17, color: C.blue }} />}
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Payment method
                  </Typography>
                </Box>
                <Box sx={{ p: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: 600, color: C.heading, fontFamily: sans }}>
                    {order.paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}
                  </Typography>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.5,
                    background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                    borderRadius: "20px", px: 1.2, py: 0.4,
                  }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 12, color: C.green }} />
                    <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                      {order.paymentMethod === "upi" ? "Paid" : "Confirmed"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Totals */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 17, color: C.blue }} />
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Order total
                  </Typography>
                </Box>
                <Box sx={{ px: "20px", py: "18px" }}>
                  {[
                    { label: `Subtotal (${order.totalQty} item${order.totalQty !== 1 ? "s" : ""})`, value: `₹${order.subtotal.toLocaleString("en-IN")}`, color: C.heading },
                    ...(order.discount > 0 ? [{ label: "Coupon discount", value: `−₹${order.discount.toLocaleString("en-IN")}`, color: C.green }] : []),
                    { label: "Delivery", value: order.shipping === 0 ? "FREE" : `₹${order.shipping}`, color: order.shipping === 0 ? C.green : C.heading },
                    { label: "Tax", value: "Included", color: C.heading },
                  ].map((row, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.1 }}>
                      <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans }}>{row.value}</Typography>
                    </Box>
                  ))}

                  <Divider sx={{ borderColor: C.borderLight, my: 1.5 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Total paid</Typography>
                    <Typography sx={{ fontSize: "20px", fontWeight: 800, color: C.heading, letterSpacing: "-.5px", fontFamily: sans }}>
                      ₹{order.grandTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Reassurance */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, py: 0.5 }}>
                <LockOutlinedIcon sx={{ fontSize: 12, color: C.textMuted }} />
                <Typography sx={{ fontSize: "10.5px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>
                  100% secure · SSL encrypted
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Trust strip ─────────────────────────────────────────── */}
          <Box sx={{ ...sectionSx, display: "flex", mt: 2.5 }}>
            {TRUST.map((t, i) => (
              <Box key={i} sx={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: 0.5, py: 1.6, px: 0.5,
                borderRight: i < TRUST.length - 1 ? `1px solid ${C.borderLight}` : "none",
                textAlign: "center",
              }}>
                <Box sx={{
                  width: 30, height: 30, borderRadius: "50%", background: t.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
                }}>
                  {t.icon}
                </Box>
                <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.heading, lineHeight: 1.2, fontFamily: sans }}>
                  {t.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={2200}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        className="no-print"
      >
        <Alert severity="success" sx={{ borderRadius: "10px", fontWeight: 700, fontFamily: sans, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
          Order ID copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}