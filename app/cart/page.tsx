"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  Box, Container, Typography, Button, IconButton,
  Divider, TextField,
} from "@mui/material";
import AddRoundedIcon                from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon             from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon      from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackRoundedIcon          from "@mui/icons-material/ArrowBackRounded";
import LocalShippingOutlinedIcon     from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon          from "@mui/icons-material/VerifiedOutlined";
import ReceiptLongOutlinedIcon       from "@mui/icons-material/ReceiptLongOutlined";
import AssignmentReturnOutlinedIcon  from "@mui/icons-material/AssignmentReturnOutlined";
import LocalOfferOutlinedIcon        from "@mui/icons-material/LocalOfferOutlined";
import CheckCircleRoundedIcon        from "@mui/icons-material/CheckCircleRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import LockOutlinedIcon              from "@mui/icons-material/LockOutlined";
import {
  getCart, onCartChange, cartTotal,
  updateQuantity, removeFromCart, clearCart, CartItem,
} from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";

const FREE_SHIPPING = 1000;

// ─── Design tokens (matched to checkout / product detail pages) ───────────
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
  redBorder:   "#fecaca",
  blue:        "#1a5fb4",
  blueLight:   "#eff6ff",
  blueBorder:  "#bfdbfe",
  green:       "#16a34a",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
};

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

if (typeof document !== "undefined" && !document.getElementById("cart-font")) {
  const s = document.createElement("style");
  s.id = "cart-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    * { box-sizing: border-box; }
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

// Same icon set as checkout's trust strip, for visual continuity
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

const EMPTY_PERKS = [
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />,    label: "Free Delivery",  sub: "Orders ₹1000+",  color: C.blue,    bg: C.blueLight },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />,         label: "2 Yr Warranty",  sub: "Official",       color: "#6D28D9", bg: "#F5F3FF"   },
  { icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />,      label: "GST Invoice",    sub: "Included",      color: C.green,   bg: C.greenLight },
  { icon: <AssignmentReturnOutlinedIcon sx={{ fontSize: 16 }} />, label: "7-Day Returns",  sub: "Hassle-free",   color: "#d97706", bg: "#fff7ed"   },
];

export default function CartPage() {
  const router = useRouter();
  const [items,   setItems]   = useState<CartItem[]>([]);
  const [coupon,  setCoupon]  = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
    const unsub = onCartChange(() => setItems(getCart()));
    return unsub;
  }, []);

  if (!mounted) return null;

  const subtotal   = cartTotal(items);
  const discount   = applied === "NETWORK10" ? Math.round(subtotal * 0.1) : 0;
  const shipping   = subtotal >= FREE_SHIPPING ? 0 : 99;
  const grandTotal = subtotal - discount + shipping;
  const toFree     = Math.max(0, FREE_SHIPPING - subtotal);
  const totalQty   = items.reduce((s, i) => s + i.quantity, 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NETWORK10") setApplied("NETWORK10");
  };

  // ── Step bar (matches checkout's step indicator) ─────────────────────────
  const StepBar = (
    <Box sx={{ background: C.surface, borderBottom: `1px solid ${C.border}`, px: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: 960, mx: "auto", height: 54 }}>
        {[
          { label: "Cart", active: true },
          { label: "Checkout" },
          { label: "Confirmation" },
        ].map((s, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: 3.5 }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: "50%",
              border: "1.5px solid",
              borderColor: s.active ? C.heading : C.border,
              background: s.active ? C.heading : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: s.active ? "#fff" : C.textMuted, fontFamily: sans }}>
                {i + 1}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: sans, color: s.active ? C.heading : C.textMuted }}>
              {s.label}
            </Typography>
            {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  /* ══════════════════════════════════════════════════════════════════════
     EMPTY STATE
  ══════════════════════════════════════════════════════════════════════ */
  if (items.length === 0) {
    return (
      <>
        <Header />
        {StepBar}
        <Box sx={{ background: C.pageBg, minHeight: "82vh", display: "flex", alignItems: "center", py: { xs: 6, md: 10 }, fontFamily: sans }}>
          <Container maxWidth="sm">
            <Box sx={{ ...sectionSx, textAlign: "center", px: { xs: 4, md: 7 }, py: { xs: 6, md: 8 } }}>
              <Box sx={{
                width: 96, height: 96, borderRadius: "50%",
                background: C.blueLight, border: `2px solid ${C.blueBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 3,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 42, color: C.blue }} />
              </Box>

              <Typography sx={{ fontSize: { xs: "22px", md: "26px" }, fontWeight: 800, color: C.heading, mb: 1, fontFamily: sans, letterSpacing: "-0.5px" }}>
                Your cart is empty
              </Typography>
              <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 4, lineHeight: 1.8, maxWidth: 300, mx: "auto", fontFamily: sans }}>
                Looks like you haven't added anything yet. Explore our collection and find something you'll love.
              </Typography>

              <Button
                onClick={() => router.push("/products")}
                sx={{
                  background: C.heading, color: "#fff",
                  borderRadius: "11px", px: 4.5, py: 1.5,
                  fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "14px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  "&:hover": { background: "#222", boxShadow: "0 6px 20px rgba(0,0,0,0.22)" },
                }}
              >
                Browse Products
              </Button>

              <Divider sx={{ borderColor: C.borderLight, my: 4 }}>
                <Typography sx={{ fontSize: "10px", color: C.textMuted, fontWeight: 700, px: 2, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: sans }}>
                  Why shop with us
                </Typography>
              </Divider>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1.5 }}>
                {EMPTY_PERKS.map((p, i) => (
                  <Box key={i} sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    p: "13px 15px", border: `1px solid ${C.borderLight}`,
                    borderRadius: "10px", background: C.surfaceWarm,
                    transition: "all .15s",
                    "&:hover": { borderColor: C.heading },
                  }}>
                    <Box sx={{
                      width: 34, height: 34, borderRadius: "9px", flexShrink: 0,
                      background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", color: p.color,
                    }}>
                      {p.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.heading, fontFamily: sans }}>{p.label}</Typography>
                      <Typography sx={{ fontSize: "10px", color: C.textSub, mt: "2px", fontFamily: sans }}>{p.sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════
     FILLED CART
  ══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <Header />
      {StepBar}
      <Box sx={{ background: C.pageBg, minHeight: "100vh", pt: 3, pb: 8, fontFamily: sans }}>
        <Container maxWidth="lg">

          {/* Breadcrumb */}
          <Box sx={{ ...sectionSx, display: "flex", alignItems: "center", gap: 0.8, px: 2.5, py: 1.3, mb: 2, flexWrap: "wrap" }}>
            <Button
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "12px !important" }} />}
              onClick={() => router.push("/products")}
              sx={{ textTransform: "none", fontWeight: 600, fontFamily: sans, color: C.blue, fontSize: "13px", px: 0.5, py: 0, minWidth: 0, lineHeight: 1, "&:hover": { background: "transparent" } }}
            >
              Products
            </Button>
            <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.textMuted }} />
            <Typography sx={{ fontSize: "13px", color: C.text, fontWeight: 500, fontFamily: sans, lineHeight: 1 }}>Cart</Typography>
            <Box sx={{
              display: "inline-flex", alignItems: "center", width: "fit-content",
              background: C.surfaceGray, border: `1px solid ${C.border}`, color: C.textSub,
              fontWeight: 700, fontFamily: sans, fontSize: "10px", px: 1.1, py: 0.35,
              borderRadius: "20px", whiteSpace: "nowrap", letterSpacing: ".3px", ml: 0.3,
            }}>
              {totalQty} item{totalQty !== 1 ? "s" : ""}
            </Box>
          </Box>

          {/* Shipping progress */}
          {toFree > 0 ? (
            <Box sx={{ ...sectionSx, px: 3, py: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", flexShrink: 0, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LocalShippingOutlinedIcon sx={{ color: C.blue, fontSize: 20 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: sans, color: C.heading, mb: 1 }}>
                  Add <Box component="span" sx={{ color: C.blue, fontWeight: 800 }}>₹{toFree.toLocaleString("en-IN")}</Box> more for{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>FREE delivery</Box>
                </Typography>
                <Box sx={{ height: 5, borderRadius: "4px", background: C.borderLight, overflow: "hidden" }}>
                  <Box sx={{
                    height: "100%", borderRadius: "4px",
                    background: `linear-gradient(90deg, ${C.blue}, #2563eb)`,
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`,
                    transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
                  }} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "14px", px: 3, py: 1.6, mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckCircleRoundedIcon sx={{ color: C.green, fontSize: 20 }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                You've unlocked FREE delivery!
              </Typography>
            </Box>
          )}

          {/* Main layout */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 340px" }, gap: 2.5, alignItems: "flex-start" }}>

            {/* ── LEFT — ITEMS ── */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, px: 0.5 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: 700, color: C.heading, fontFamily: sans, letterSpacing: "-0.2px" }}>
                  Your Items
                </Typography>
                <Button
                  size="small" onClick={clearCart}
                  sx={{ textTransform: "none", color: C.red, fontWeight: 600, fontFamily: sans, fontSize: "12px", borderRadius: "8px", px: 1.5, "&:hover": { background: C.redLight } }}
                >
                  Clear all
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {items.map((item) => {
                  const disc = item.price > item.salePrice
                    ? Math.round(((item.price - item.salePrice) / item.price) * 100) : 0;
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex", ...sectionSx,
                        transition: "box-shadow .2s ease, border-color .2s ease",
                        "&:hover": { boxShadow: "0 4px 22px rgba(0,0,0,0.08)", borderColor: C.heading },
                      }}
                    >
                      {/* Image panel */}
                      <Box
                        onClick={() => router.push(`/products/${item.id}`)}
                        sx={{
                          width: { xs: 104, md: 140 }, flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          p: 2.2, cursor: "pointer",
                          background: C.surfaceGray, borderRight: `1px solid ${C.border}`,
                          position: "relative",
                        }}
                      >
                        {disc > 0 && (
                          <Box sx={{
                            position: "absolute", top: 10, left: 10,
                            background: C.surface, border: `1.5px solid ${C.red}`,
                            color: C.red, fontWeight: 700, fontFamily: sans,
                            fontSize: "9px", px: 0.8, py: 0.3, borderRadius: "6px",
                          }}>
                            {disc}% OFF
                          </Box>
                        )}
                        <img src={proxyImage(item.image)} alt={item.name} style={{ width: 84, height: 84, objectFit: "contain" }} />
                      </Box>

                      {/* Info panel */}
                      <Box sx={{ flex: 1, minWidth: 0, p: { xs: "16px 18px", md: "18px 22px" }, display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "1px", mb: 0.5, fontFamily: sans }}>
                          {item.brand}
                        </Typography>

                        <Typography
                          onClick={() => router.push(`/products/${item.id}`)}
                          sx={{
                            fontFamily: sans, fontWeight: 600, fontSize: { xs: "13px", md: "13.5px" },
                            color: C.heading, lineHeight: 1.45, mb: 1.3, cursor: "pointer",
                            "&:hover": { color: C.blue },
                            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}
                        >
                          {item.name}
                        </Typography>

                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.1} mb={1.5}>
                          <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: { xs: "18px", md: "20px" }, color: C.heading, letterSpacing: "-0.5px" }}>
                            ₹{item.salePrice.toLocaleString("en-IN")}
                          </Typography>
                          {disc > 0 && (
                            <>
                              <Typography sx={{ fontFamily: sans, fontSize: "12px", textDecoration: "line-through", color: C.textMuted }}>
                                ₹{item.price.toLocaleString("en-IN")}
                              </Typography>
                              <Box sx={{ background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "5px", px: 0.9, py: 0.2 }}>
                                <Typography sx={{ fontSize: "10px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                                  {disc}% off
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>

                        <Divider sx={{ borderColor: C.borderLight, mb: 1.6 }} />

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
                          {/* Qty stepper */}
                          <Box sx={{
                            display: "inline-flex", alignItems: "center",
                            border: `1.5px solid ${C.border}`, borderRadius: "9px",
                            overflow: "hidden", background: C.surface, width: "fit-content",
                          }}>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              sx={{ borderRadius: 0, width: 32, height: 32, color: C.textSub, "&:hover": { background: C.surfaceGray, color: C.heading } }}
                            >
                              <RemoveRoundedIcon sx={{ fontSize: 13 }} />
                            </IconButton>
                            <Typography sx={{
                              px: 1.5, fontFamily: sans, fontWeight: 700, fontSize: "13px", color: C.heading,
                              minWidth: 34, textAlign: "center",
                              borderLeft: `1.5px solid ${C.border}`, borderRight: `1.5px solid ${C.border}`,
                              lineHeight: "32px",
                            }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ borderRadius: 0, width: 32, height: 32, color: C.textSub, "&:hover": { background: C.surfaceGray, color: C.heading } }}
                            >
                              <AddRoundedIcon sx={{ fontSize: 13 }} />
                            </IconButton>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography sx={{ fontFamily: sans, fontSize: "9px", color: C.textMuted, mb: 0.3, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase" }}>
                                Item total
                              </Typography>
                              <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: "15px", color: C.heading, letterSpacing: "-0.3px" }}>
                                ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => removeFromCart(item.id)}
                              sx={{
                                color: C.textMuted, border: `1.5px solid ${C.border}`,
                                borderRadius: "9px", width: 32, height: 32, background: C.surface,
                                "&:hover": { color: C.red, background: C.redLight, borderColor: C.redBorder },
                              }}
                            >
                              <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Trust badges */}
              <Box sx={{ ...sectionSx, mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: "22px", py: "16px", borderBottom: `1px solid ${C.borderLight}`, background: C.surfaceWarm }}>
                  <VerifiedOutlinedIcon sx={{ fontSize: 18, color: C.blue }} />
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Our promises</Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(4,1fr)" }, p: "18px 20px", gap: 1.4 }}>
                  {TRUST.map((t, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                      <Box sx={{
                        width: 34, height: 34, borderRadius: "50%", background: t.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
                      }}>
                        {t.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.heading, fontFamily: sans, lineHeight: 1.25 }}>
                          {t.label}
                        </Typography>
                        <Typography sx={{ fontSize: "10px", color: C.textSub, fontFamily: sans, lineHeight: 1.25 }}>
                          {t.sub}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* ── RIGHT — SUMMARY ── */}
            <Box sx={{ position: { md: "sticky" }, top: { md: 20 }, alignSelf: "flex-start", width: "100%" }}>

              {/* Coupon card */}
              <Box sx={{ ...sectionSx, p: "18px 20px", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: 1.8 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LocalOfferOutlinedIcon sx={{ color: C.blue, fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ fontFamily: sans, fontWeight: 700, fontSize: "13.5px", color: C.heading }}>
                    Apply coupon
                  </Typography>
                </Box>

                {applied ? (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "8px", px: 1.5, py: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <CheckCircleRoundedIcon sx={{ color: C.green, fontSize: 14 }} />
                      <Typography sx={{ fontFamily: sans, fontSize: "12px", fontWeight: 700, color: C.green }}>
                        {applied} — 10% off applied!
                      </Typography>
                    </Box>
                    <Button size="small" onClick={() => { setApplied(null); setCoupon(""); }}
                      sx={{ color: C.red, fontWeight: 700, fontFamily: sans, fontSize: "11px", textTransform: "none", minWidth: 0, p: 0 }}>
                      Remove
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      size="small" placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px", fontSize: "12px", fontFamily: sans,
                          "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
                          "&:hover fieldset": { borderColor: C.heading },
                          "&.Mui-focused fieldset": { borderColor: C.heading },
                        },
                      }}
                    />
                    <Button
                      onClick={applyCoupon}
                      sx={{
                        background: C.surfaceGray, border: `1.5px solid ${C.border}`,
                        borderRadius: "8px", fontWeight: 700, fontSize: "12px",
                        textTransform: "none", color: C.heading, px: 1.6, flexShrink: 0, fontFamily: sans,
                        "&:hover": { background: C.heading, color: "#fff", borderColor: C.heading },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                )}

                <Typography sx={{ fontFamily: sans, fontSize: "11px", color: C.textMuted, mt: 1.4 }}>
                  Try code{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: C.blue, background: C.blueLight, px: 0.8, py: 0.15, borderRadius: "5px", fontSize: "10.5px" }}>
                    NETWORK10
                  </Box>
                  {" "}for 10% off
                </Typography>
              </Box>

              {/* Order summary card */}
              <Box sx={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

                <Box sx={{
                  background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)",
                  px: 2.5, py: 2, display: "flex", alignItems: "center", gap: 1.2,
                }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "9px",
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 17, color: "#fff" }} />
                  </Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#fff", fontFamily: sans, letterSpacing: "-0.2px" }}>
                    Order summary
                  </Typography>
                </Box>

                <Box sx={{ px: 2.5, py: 2 }}>
                  {[
                    { label: `Subtotal (${totalQty} item${totalQty !== 1 ? "s" : ""})`, value: `₹${subtotal.toLocaleString("en-IN")}`, color: C.heading },
                    ...(discount > 0 ? [{ label: "Coupon discount", value: `−₹${discount.toLocaleString("en-IN")}`, color: C.green }] : []),
                    { label: "Delivery", value: shipping === 0 ? "FREE" : `₹${shipping}`, color: shipping === 0 ? C.green : C.heading },
                    { label: "Tax", value: "Included", color: C.heading },
                  ].map((row, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.1 }}>
                      <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans }}>{row.value}</Typography>
                    </Box>
                  ))}

                  <Divider sx={{ borderColor: C.borderLight, my: 1.5 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Total payable</Typography>
                    <Typography sx={{ fontSize: "22px", fontWeight: 800, color: C.heading, letterSpacing: "-.5px", fontFamily: sans }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "10px", color: C.textMuted, textAlign: "right", mb: 2, fontFamily: sans }}>
                    Inclusive of all taxes &amp; charges
                  </Typography>

                  <Button
                    fullWidth
                    onClick={() => router.push("/checkout")}
                    sx={{
                      height: 50, borderRadius: "11px",
                      background: C.heading, color: "#fff",
                      fontWeight: 700, fontSize: "15px", fontFamily: sans,
                      textTransform: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                      display: "flex", alignItems: "center", gap: 1,
                      "&:hover": { background: "#222", boxShadow: "0 6px 20px rgba(0,0,0,0.22)" },
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 15 }} />
                    Proceed to checkout · ₹{grandTotal.toLocaleString("en-IN")}
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, mt: 1.5 }}>
                    <VerifiedOutlinedIcon sx={{ fontSize: 12, color: C.blue }} />
                    <Typography sx={{ fontSize: "10px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>
                      100% secure · GST invoice available
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", borderTop: `1px solid ${C.borderLight}` }}>
                  {TRUST.map((t, i) => (
                    <Box key={i} sx={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 0.5, py: 1.4, px: 0.5,
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
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}