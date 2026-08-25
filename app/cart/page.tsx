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
import EditNoteRoundedIcon           from "@mui/icons-material/EditNoteRounded";
import {
  getCart, onCartChange, cartTotal,
  updateQuantity, removeFromCart, clearCart, CartItem,
} from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";

const FREE_SHIPPING = 1000;

/* ─── Design tokens — now matched to the redesigned checkout page:
   indigo primary, emerald success, amber accents. ───────────────────── */
const C = {
  pageBg:      "#f3f5f9",
  surface:     "#ffffff",
  surfaceWarm: "#f9fafc",
  surfaceGray: "#eef0f5",
  border:      "#e2e5ec",
  borderLight: "#edeff4",

  ink:      "#0c1230",
  text:     "#1b2033",
  textSub:  "#5b6072",
  textMuted:"#98a0af",

  primary:      "#3730a3",
  primarySoft:  "#4f46e5",
  primaryLight: "#eef0fe",
  primaryBorder:"#c9cdf6",
  primaryDeep:  "#241d70",

  emerald:      "#0f9d58",
  emeraldLight: "#e9f9ef",
  emeraldBorder:"#bfe8cf",

  amber:      "#b45309",
  amberLight: "#fff6ea",
  amberBorder:"#f0dcae",

  red:      "#e11d48",
  redLight: "#fdeef2",
  redBorder:"#f8c9d3",
};

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

const PAGE_PX = { xs: 1.5, sm: 2.5, md: 4, lg: 5.5, xl: 7 };

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
  background: "rgba(255,255,255,0.98)",
  border: `1px solid ${C.border}`,
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(12,18,48,0.03), 0 16px 40px rgba(12,18,48,0.055)",
};

const TRUST = [
  { label: "Free Delivery", sub: "Above ₹1000", bg: "#e7e9fc",
    icon: (
      <svg width="22" height="16" viewBox="0 0 40 24" fill="none">
        <rect x="1" y="3" width="21" height="14" rx="2" fill="#4338ca"/>
        <path d="M22 7h6l4 7v4H22V7z" fill="#3730a3"/>
        <circle cx="7" cy="20" r="3" fill="#241d70" stroke="#e7e9fc" strokeWidth="1.5"/>
        <circle cx="29" cy="20" r="3" fill="#241d70" stroke="#e7e9fc" strokeWidth="1.5"/>
      </svg>
    ) },
  { label: "1 Yr Warranty", sub: "Official", bg: "#eef0fe",
    icon: (
      <svg width="16" height="20" viewBox="0 0 26 30" fill="none">
        <path d="M13 1L1 6v9c0 6 4.5 11.5 12 13 7.5-1.5 12-7 12-13V6L13 1z" fill="#4f46e5"/>
        <text x="13" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">1 YR</text>
      </svg>
    ) },
  { label: "GST Invoice", sub: "Included", bg: "#e9f9ef",
    icon: (
      <svg width="15" height="18" viewBox="0 0 24 28" fill="none">
        <rect x="1" y="1" width="18" height="22" rx="2" fill="#0f9d58"/>
        <rect x="4" y="4" width="11" height="2" rx="1" fill="#bfe8cf"/>
        <rect x="4" y="8" width="8" height="1.5" rx="1" fill="#bfe8cf"/>
        <circle cx="17" cy="22" r="6" fill="#0c7d47" stroke="#fff" strokeWidth="1.5"/>
        <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
  { label: "7-Day Return", sub: "Easy & Free", bg: "#fff6ea",
    icon: (
      <svg width="20" height="17" viewBox="0 0 30 26" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" fill="#b45309"/>
        <path d="M7 11h10M7 15h7" stroke="#fde9c8" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 2c3.5 2 5 5.5 5 8.5s-1.5 6.5-5 8.5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M23 3l4-2.5-1.5 5.5z" fill="#d97706"/>
      </svg>
    ) },
];

const EMPTY_PERKS = [
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />,    label: "Free Delivery",  sub: "Orders ₹1000+",  color: C.primary, bg: C.primaryLight },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />,         label: "1 Yr Warranty",  sub: "Official",       color: "#6D28D9", bg: "#F5F3FF"      },
  { icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />,      label: "GST Invoice",    sub: "Included",       color: C.emerald, bg: C.emeraldLight },
  { icon: <AssignmentReturnOutlinedIcon sx={{ fontSize: 16 }} />, label: "7-Day Returns",  sub: "Hassle-free",    color: C.amber,   bg: C.amberLight   },
];

const ORDER_NOTE_KEY = "nt_order_note";

export default function CartPage() {
  const router = useRouter();
  const [items,   setItems]   = useState<CartItem[]>([]);
  const [coupon,  setCoupon]  = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [note,    setNote]    = useState("");

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
    const unsub = onCartChange(() => setItems(getCart()));

    try {
      const savedNote = localStorage.getItem(ORDER_NOTE_KEY) || "";
      setNote(savedNote);
    } catch {
      /* localStorage unavailable — ignore */
    }

    return unsub;
  }, []);

  if (!mounted) return null;

  const subtotal   = cartTotal(items);
  const discount   = applied === "NETWORK10" ? Math.round(subtotal * 0.1) : 0;
  const shipping   = subtotal >= FREE_SHIPPING ? 0 : 99;
  const grandTotal = subtotal - discount + shipping;
  const toFree     = Math.max(0, FREE_SHIPPING - subtotal);
  const totalQty   = items.reduce((s, i) => s + i.quantity, 0);

  // Single source of truth for "keep shopping" navigation — used by every
  // continue-shopping / browse-products entry point on this page.
  const goToProducts = () => router.push("/products");

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NETWORK10") setApplied("NETWORK10");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    try {
      localStorage.setItem(ORDER_NOTE_KEY, value);
    } catch {
      /* localStorage unavailable — ignore */
    }
  };

  const handleProceedToCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  const StepBar = (
    <Box sx={{ background: C.surface, borderBottom: `1px solid ${C.border}`, px: PAGE_PX, position: "relative",
      "&::before": {
        content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${C.primary}, ${C.primarySoft}, ${C.emerald})`,
      },
    }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: 56 }}>
        {[
          { label: "Cart", active: true },
          { label: "Checkout" },
          { label: "Confirmation" },
        ].map((s, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.9, mr: 3.5 }}>
            <Box sx={{
              width: 23, height: 23, borderRadius: "50%",
              border: "1.5px solid",
              borderColor: s.active ? C.primary : C.border,
              background: s.active ? `linear-gradient(135deg, ${C.primary}, ${C.primarySoft})` : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              boxShadow: s.active ? "0 2px 6px rgba(55,48,163,0.28)" : "none",
            }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: s.active ? "#fff" : C.textMuted, fontFamily: sans }}>
                {i + 1}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "12.5px", fontWeight: 600, fontFamily: sans, color: s.active ? C.ink : C.textMuted, letterSpacing: "-0.1px" }}>
              {s.label}
            </Typography>
            {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 1.2 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  /* ══════════════════════════════════ EMPTY STATE ══════════════════════════════════ */
  if (items.length === 0) {
    return (
      <>
        <Header />
        {StepBar}
        <Box sx={{ background: `linear-gradient(180deg, ${C.pageBg} 0%, #eceef3 100%)`, minHeight: "82vh", display: "flex", alignItems: "center", py: { xs: 6, md: 10 }, px: PAGE_PX, fontFamily: sans }}>
          <Box sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
            <Box sx={{ ...sectionSx, textAlign: "center", px: { xs: 4, md: 7 }, py: { xs: 6, md: 8 }, position: "relative" }}>
              <Box sx={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${C.primary}, ${C.primarySoft}, ${C.emerald})`,
              }} />
              <Box sx={{
                width: 96, height: 96, borderRadius: "50%",
                background: C.primaryLight, border: `2px solid ${C.primaryBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 3,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 42, color: C.primary }} />
              </Box>

              <Typography sx={{ fontSize: { xs: "22px", md: "26px" }, fontWeight: 800, color: C.ink, mb: 1, fontFamily: sans, letterSpacing: "-0.5px" }}>
                Your cart is empty
              </Typography>
              <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 4, lineHeight: 1.8, maxWidth: 300, mx: "auto", fontFamily: sans }}>
                Looks like you haven't added anything yet. Explore our collection and find something you'll love.
              </Typography>

              <Button
                onClick={goToProducts}
                sx={{
                  background: `linear-gradient(135deg, ${C.primary}, ${C.primarySoft})`, color: "#fff",
                  borderRadius: "11px", px: 4.5, py: 1.5,
                  fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "14px",
                  boxShadow: "0 4px 14px rgba(55,48,163,0.28)",
                  "&:hover": { opacity: 0.92, boxShadow: "0 6px 20px rgba(55,48,163,0.34)" },
                }}
              >
                Continue shopping
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
                    "&:hover": { borderColor: C.primary },
                  }}>
                    <Box sx={{
                      width: 34, height: 34, borderRadius: "9px", flexShrink: 0,
                      background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", color: p.color,
                    }}>
                      {p.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.ink, fontFamily: sans }}>{p.label}</Typography>
                      <Typography sx={{ fontSize: "10px", color: C.textSub, mt: "2px", fontFamily: sans }}>{p.sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </>
    );
  }

  /* ══════════════════════════════════ FILLED CART ══════════════════════════════════ */
  return (
    <>
      <Header />
      {StepBar}
      <Box sx={{ background: `radial-gradient(circle at 12% 0%, rgba(79,70,229,0.055), transparent 28%), linear-gradient(180deg, #f7f8fb 0%, ${C.pageBg} 45%, #eceef3 100%)`, minHeight: "100vh", pt: { xs: 2, md: 3.5 }, pb: 10, fontFamily: sans }}>
        <Container maxWidth={false} sx={{ px: PAGE_PX }}>

          {/* Breadcrumb */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 0.5, py: 1.2, mb: 2.5, flexWrap: "wrap" }}>
            <Button
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "14px !important" }} />}
              onClick={goToProducts}
              sx={{ textTransform: "none", fontWeight: 600, fontFamily: sans, color: C.primary, fontSize: "14.5px", px: 0.5, py: 0, minWidth: 0, lineHeight: 1, "&:hover": { background: "transparent", opacity: 0.8 } }}
            >
              Products
            </Button>
            <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16, color: C.textMuted }} />
            <Typography sx={{ fontSize: "14.5px", color: C.text, fontWeight: 500, fontFamily: sans, lineHeight: 1 }}>Cart</Typography>
            <Box sx={{
              display: "inline-flex", alignItems: "center", width: "fit-content",
              background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, color: C.primary,
              fontWeight: 700, fontFamily: sans, fontSize: "11.5px", px: 1.2, py: 0.4,
              borderRadius: "20px", whiteSpace: "nowrap", letterSpacing: ".3px", ml: 0.3,
            }}>
              {totalQty} item{totalQty !== 1 ? "s" : ""}
            </Box>
          </Box>

          {/* Shipping progress */}
          {toFree > 0 ? (
            <Box sx={{ ...sectionSx, px: 3, py: 2.2, mb: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", flexShrink: 0, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LocalShippingOutlinedIcon sx={{ color: C.primary, fontSize: 20 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: sans, color: C.ink, mb: 1 }}>
                  Add <Box component="span" sx={{ color: C.primary, fontWeight: 800 }}>₹{toFree.toLocaleString("en-IN")}</Box> more for{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>FREE delivery</Box>
                </Typography>
                <Box sx={{ height: 5, borderRadius: "4px", background: C.borderLight, overflow: "hidden" }}>
                  <Box sx={{
                    height: "100%", borderRadius: "4px",
                    background: `linear-gradient(90deg, ${C.primary}, ${C.primarySoft})`,
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`,
                    transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
                  }} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ background: "transparent", px: 1.5, py: 1.8, mb: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckCircleRoundedIcon sx={{ color: C.emerald, fontSize: 22 }} />
              <Typography sx={{ fontSize: "14.5px", fontWeight: 700, color: C.emerald, fontFamily: sans }}>
                You've unlocked FREE delivery!
              </Typography>
            </Box>
          )}

          {/* Main layout */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0,1fr) 380px", lg: "minmax(0,1fr) 410px", xl: "minmax(0,1fr) 430px" },
            gap: { xs: 2, md: 3, lg: 3.5 },
            alignItems: "start",
          }}>

            {/* ── LEFT — ITEMS ── */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: 1.4, px: { xs: 0.25, md: 0.5 } }}>
                <Typography sx={{ fontSize: "16px", fontWeight: 800, color: C.ink, fontFamily: sans, letterSpacing: "-0.3px" }}>
                  Your Items
                </Typography>
                <Button
                  size="small" onClick={clearCart}
                  sx={{ textTransform: "none", color: C.red, fontWeight: 600, fontFamily: sans, fontSize: "12px", borderRadius: "8px", px: 1.5, "&:hover": { background: C.redLight } }}
                >
                  Clear all
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.35 }}>
                {items.map((item) => {
                  const disc = item.price > item.salePrice
                    ? Math.round(((item.price - item.salePrice) / item.price) * 100) : 0;
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: "grid", gridTemplateColumns: { xs: "1fr", sm: "138px minmax(0,1fr)" }, ...sectionSx,
                        transition: "box-shadow .2s ease, border-color .2s ease, transform .2s ease",
                        "&:hover": { boxShadow: "0 12px 34px rgba(12,18,48,0.10)", borderColor: C.primary },
                      }}
                    >
                      {/* Image panel */}
                      <Box
                        onClick={() => router.push(`/products/${item.id}`)}
                        sx={{
                          width: "100%", minHeight: { xs: 122, sm: 168 },
                          display: "flex", alignItems: "center", justifyContent: "center",
                          p: { xs: 1.5, sm: 2 }, cursor: "pointer",
                          background: "linear-gradient(145deg, #f7f8fb 0%, #eef0f5 100%)",
                          borderRight: { xs: "none", sm: `1px solid ${C.border}` },
                          borderBottom: { xs: `1px solid ${C.border}`, sm: "none" },
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
                        <img src={proxyImage(item.image)} alt={item.name} style={{ width: 100, height: 100, objectFit: "contain", filter: "drop-shadow(0 8px 14px rgba(12,18,48,0.10))" }} />
                      </Box>
                      {/* Info panel */}
                      <Box sx={{ flex: 1, minWidth: 0, p: { xs: "16px", md: "20px 22px" }, display: "flex", flexDirection: "column", minWidth: 0 }}>
                        <Typography sx={{ fontSize: "9.5px", fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "1px", mb: 0.6, fontFamily: sans }}>
                          {item.brand}
                        </Typography>

                        <Typography
                          onClick={() => router.push(`/products/${item.id}`)}
                          sx={{
                            fontFamily: sans, fontWeight: 600, fontSize: { xs: "13px", md: "13.5px" },
                            color: C.ink, lineHeight: 1.45, mb: 1.4, cursor: "pointer",
                            "&:hover": { color: C.primary },
                            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}
                        >
                          {item.name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.1, mb: 1.6 }}>
                          <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: { xs: "19px", md: "21px" }, color: C.ink, letterSpacing: "-0.6px" }}>
                            ₹{item.salePrice.toLocaleString("en-IN")}
                          </Typography>
                          {disc > 0 && (
                            <>
                              <Typography sx={{ fontFamily: sans, fontSize: "12px", textDecoration: "line-through", color: C.textMuted }}>
                                ₹{item.price.toLocaleString("en-IN")}
                              </Typography>
                              <Box sx={{ background: C.emeraldLight, border: `1px solid ${C.emeraldBorder}`, borderRadius: "5px", px: 0.9, py: 0.2 }}>
                                <Typography sx={{ fontSize: "10px", fontWeight: 700, color: C.emerald, fontFamily: sans }}>
                                  {disc}% off
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>

                        <Divider sx={{ borderColor: C.borderLight, mb: 1.8 }} />

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5, mt: "auto" }}>
                          <Box sx={{
                            display: "inline-flex", alignItems: "center",
                            border: `1px solid ${C.border}`, borderRadius: "11px",
                            overflow: "hidden", background: C.surface, width: "fit-content",
                          }}>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              sx={{ borderRadius: 0, width: 34, height: 34, color: C.textSub, "&:hover": { background: C.primaryLight, color: C.primary } }}
                            >
                              <RemoveRoundedIcon sx={{ fontSize: 13 }} />
                            </IconButton>
                            <Typography sx={{
                              px: 1.5, fontFamily: sans, fontWeight: 700, fontSize: "13px", color: C.ink,
                              minWidth: 34, textAlign: "center",
                              borderLeft: `1.5px solid ${C.border}`, borderRight: `1.5px solid ${C.border}`,
                              lineHeight: "34px",
                            }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ borderRadius: 0, width: 34, height: 34, color: C.textSub, "&:hover": { background: C.primaryLight, color: C.primary } }}
                            >
                              <AddRoundedIcon sx={{ fontSize: 13 }} />
                            </IconButton>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography sx={{ fontFamily: sans, fontSize: "9px", color: C.textMuted, mb: 0.3, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase" }}>
                                Item total
                              </Typography>
                              <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: "15px", color: C.ink, letterSpacing: "-0.3px" }}>
                                ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => removeFromCart(item.id)}
                              sx={{
                                color: C.textMuted, border: `1.5px solid ${C.border}`,
                                borderRadius: "10px", width: 34, height: 34, background: C.surface,
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

              {/* Continue shopping link under the item list */}
              <Box sx={{ mt: 2, px: 0.5 }}>
                <Button
                  startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "14px !important" }} />}
                  onClick={goToProducts}
                  sx={{ textTransform: "none", fontWeight: 600, fontFamily: sans, color: C.primary, fontSize: "13px", px: 0, minWidth: 0, "&:hover": { background: "transparent", opacity: 0.8 } }}
                >
                  Continue shopping
                </Button>
              </Box>

              {/* Trust badges */}
              <Box sx={{ ...sectionSx, mt: 2.2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: { xs: 2, md: 2.4 }, py: { xs: 1.7, md: 1.9 }, borderBottom: `1px solid ${C.borderLight}`, background: C.surfaceWarm }}>
                  <VerifiedOutlinedIcon sx={{ fontSize: 18, color: C.primary }} />
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>Our promises</Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(4,1fr)" }, p: { xs: "16px", md: "19px 20px" }, gap: { xs: 1.3, md: 1.8 } }}>
                  {TRUST.map((t, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                      <Box sx={{
                        width: 36, height: 36, borderRadius: "50%", background: t.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, boxShadow: "0 1px 6px rgba(12,18,48,0.08)",
                      }}>
                        {t.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.ink, fontFamily: sans, lineHeight: 1.25 }}>
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
              <Box sx={{ ...sectionSx, p: { xs: 2, md: 2.25 }, mb: 1.75 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: 1.8 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LocalOfferOutlinedIcon sx={{ color: C.primary, fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ fontFamily: sans, fontWeight: 700, fontSize: "13.5px", color: C.ink }}>
                    Apply coupon
                  </Typography>
                </Box>

                {applied ? (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.emeraldLight, border: `1px solid ${C.emeraldBorder}`, borderRadius: "9px", px: 1.5, py: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <CheckCircleRoundedIcon sx={{ color: C.emerald, fontSize: 14 }} />
                      <Typography sx={{ fontFamily: sans, fontSize: "12px", fontWeight: 700, color: C.emerald }}>
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
                          borderRadius: "9px", fontSize: "12px", fontFamily: sans,
                          "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
                          "&:hover fieldset": { borderColor: C.primary },
                          "&.Mui-focused fieldset": { borderColor: C.primary },
                        },
                      }}
                    />
                    <Button
                      onClick={applyCoupon}
                      sx={{
                        background: C.surfaceGray, border: `1.5px solid ${C.border}`,
                        borderRadius: "9px", fontWeight: 700, fontSize: "12px",
                        textTransform: "none", color: C.ink, px: 1.6, flexShrink: 0, fontFamily: sans,
                        "&:hover": { background: C.primary, color: "#fff", borderColor: C.primary },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Order summary card */}
              <Box sx={{ background: "rgba(255,255,255,0.99)", border: `1px solid ${C.border}`, borderRadius: "22px", overflow: "hidden", boxShadow: "0 4px 10px rgba(12,18,48,0.035), 0 22px 50px rgba(12,18,48,0.10)" }}>

                <Box sx={{
                  background: "linear-gradient(135deg, #0c1230 0%, #241d70 55%, #3730a3 100%)",
                  px: { xs: 2.2, md: 2.6 }, py: { xs: 2, md: 2.25 }, display: "flex", alignItems: "center", gap: 1.2,
                }}>
                  <Box sx={{
                    width: 34, height: 34, borderRadius: "10px",
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 17, color: "#fff" }} />
                  </Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#fff", fontFamily: sans, letterSpacing: "-0.2px" }}>
                    Order summary
                  </Typography>
                </Box>

                <Box sx={{ px: { xs: 2.2, md: 2.6 }, py: { xs: 2.2, md: 2.5 } }}>
                  {[
                    { label: `Subtotal (${totalQty} item${totalQty !== 1 ? "s" : ""})`, value: `₹${subtotal.toLocaleString("en-IN")}`, color: C.ink },
                    ...(discount > 0 ? [{ label: "Coupon discount", value: `−₹${discount.toLocaleString("en-IN")}`, color: C.emerald }] : []),
                    { label: "Delivery", value: shipping === 0 ? "FREE" : `₹${shipping}`, color: shipping === 0 ? C.emerald : C.ink },
                    { label: "Tax", value: "Included", color: C.ink },
                  ].map((row, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                      <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans }}>{row.value}</Typography>
                    </Box>
                  ))}

                  <Divider sx={{ borderColor: C.borderLight, my: 1.8 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>Total payable</Typography>
                    <Typography sx={{ fontSize: "23px", fontWeight: 800, color: C.ink, letterSpacing: "-.5px", fontFamily: sans }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "10px", color: C.textMuted, textAlign: "right", mb: 2.4, fontFamily: sans }}>
                    Inclusive of all taxes &amp; charges
                  </Typography>

                  <Button
                    fullWidth
                    onClick={handleProceedToCheckout}
                    sx={{
                      height: 54, borderRadius: "13px",
                      background: "linear-gradient(135deg, #0c1230 0%, #3730a3 100%)", color: "#fff",
                      fontWeight: 700, fontSize: "15px", fontFamily: sans,
                      textTransform: "none", boxShadow: "0 8px 22px rgba(12,18,48,0.24), 0 0 0 1px rgba(79,70,229,0.28)",
                      display: "flex", alignItems: "center", gap: 1,
                      "&:hover": { boxShadow: "0 10px 30px rgba(12,18,48,0.32), 0 0 0 1px rgba(79,70,229,0.48)" },
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 15 }} />
                    Proceed to checkout · ₹{grandTotal.toLocaleString("en-IN")}
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, mt: 1.8 }}>
                    <VerifiedOutlinedIcon sx={{ fontSize: 12, color: C.primary }} />
                    <Typography sx={{ fontSize: "10px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>
                      100% secure · GST invoice available
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", borderTop: `1px solid ${C.borderLight}` }}>
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
                        boxShadow: "0 1px 5px rgba(12,18,48,0.08)",
                      }}>
                        {t.icon}
                      </Box>
                      <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.ink, lineHeight: 1.2, fontFamily: sans }}>
                        {t.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Order note */}
          <Box sx={{ ...sectionSx, mt: 2.2, p: { xs: 2, md: 2.25 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: 1.6 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <EditNoteRoundedIcon sx={{ color: C.primary, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: sans, fontWeight: 700, fontSize: "13.5px", color: C.ink }}>
                  Add a note for your order
                </Typography>
                <Typography sx={{ fontFamily: sans, fontSize: "11px", color: C.textMuted, mt: 0.1 }}>
                  Optional — included in your order confirmation email &amp; WhatsApp message
                </Typography>
              </Box>
            </Box>
            <TextField
              fullWidth
              multiline
              minRows={2}
              size="small"
              placeholder="E.g. Please deliver after 6 PM, leave at the gate, gift wrap, etc."
              value={note}
              onChange={handleNoteChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9px", fontSize: "13px", fontFamily: sans,
                  "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
                  "&:hover fieldset": { borderColor: C.primary },
                  "&.Mui-focused fieldset": { borderColor: C.primary, boxShadow: "0 0 0 3px rgba(55,48,163,.08)" },
                },
              }}
            />
          </Box>

        </Container>
      </Box>
      <Footer />
    </>
  );
}