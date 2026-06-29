"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  Box, Container, Typography, Button,
  CircularProgress, IconButton, Snackbar, Alert, Radio,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { getProductById, getProducts } from "@/services/productService";
import { addToCart } from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";

// ─── Design tokens ────────────────────────────────────────────────────────────
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
  whatsapp:    "#25d366",
  twitter:     "#1da1f2",
  facebook:    "#1877f2",
  razorBlue:   "#2563eb",
};

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

if (typeof document !== "undefined" && !document.getElementById("pdp-font")) {
  const s = document.createElement("style");
  s.id = "pdp-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    * { box-sizing: border-box; }
  `;
  document.head.appendChild(s);
}

// ─── Bulk tiers ───────────────────────────────────────────────────────────────
const BULK = [
  { qty: 1,  label: "Buy 1",   save: 0,  badge: "Popular" },
  { qty: 3,  label: "Buy 3",   save: 2,  badge: null },
  { qty: 10, label: "Buy 10+", save: 5,  badge: null },
  { qty: 20, label: "Buy 20+", save: 7,  badge: null },
  { qty: 30, label: "Buy 30+", save: 11, badge: null },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const BADGES = [
  {
    label: "Lower Price", sub: "Than Amazon", bg: "#1a3a5c",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <text x="14" y="19" textAnchor="middle" fontSize="18" fontWeight="900" fill="#f5c518" fontFamily="Georgia,serif">₹</text>
      </svg>
    ),
  },
  {
    label: "Free Shipping", sub: "Above ₹1000", bg: "#dbeafe",
    icon: (
      <svg width="34" height="24" viewBox="0 0 40 24" fill="none">
        <rect x="1" y="3" width="21" height="14" rx="2" fill="#2563eb"/>
        <path d="M22 7h6l4 7v4H22V7z" fill="#1d4ed8"/>
        <circle cx="7" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
        <circle cx="29" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
        <rect x="3" y="8" width="11" height="2" rx="1" fill="#93c5fd"/>
        <rect x="3" y="12" width="7" height="2" rx="1" fill="#93c5fd"/>
      </svg>
    ),
  },
  {
    label: "Official", sub: "2 Yrs Warranty", bg: "#eef3ff",
    icon: (
      <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
        <path d="M13 1L1 6v9c0 6 4.5 11.5 12 13 7.5-1.5 12-7 12-13V6L13 1z" fill="#1a5fb4"/>
        <text x="13" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">2 YR</text>
      </svg>
    ),
  },
  {
    label: "GST Invoice", sub: "Included", bg: "#f0fdf4",
    icon: (
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <rect x="1" y="1" width="18" height="22" rx="2" fill="#16a34a"/>
        <rect x="4" y="4" width="11" height="2" rx="1" fill="#bbf7d0"/>
        <rect x="4" y="8" width="8" height="1.5" rx="1" fill="#bbf7d0"/>
        <rect x="4" y="12" width="9" height="1.5" rx="1" fill="#bbf7d0"/>
        <rect x="4" y="16" width="6" height="1.5" rx="1" fill="#bbf7d0"/>
        <circle cx="17" cy="22" r="6" fill="#15803d" stroke="#fff" strokeWidth="1.5"/>
        <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Easy Returns", sub: "7 Days", bg: "#fff7ed",
    icon: (
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" fill="#d97706"/>
        <path d="M7 11h10M7 15h7" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 2c3.5 2 5 5.5 5 8.5s-1.5 6.5-5 8.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M23 3l4-2.5-1.5 5.5z" fill="#f59e0b"/>
      </svg>
    ),
  },
  {
    label: "COD Available", sub: "₹1000–₹9999", bg: "#eff6ff",
    icon: (
      <svg width="34" height="24" viewBox="0 0 36 24" fill="none">
        <rect x="1" y="2" width="34" height="20" rx="4" fill="#0284c7"/>
        <rect x="1" y="10" width="34" height="6" fill="#0369a1"/>
        <text x="18" y="9" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Arial" letterSpacing="1">COD</text>
        <rect x="4" y="16" width="7" height="3" rx="1.5" fill="#7dd3fc"/>
        <rect x="25" y="16" width="7" height="3" rx="1.5" fill="#38bdf8"/>
      </svg>
    ),
  },
];

const calcUnit = (base: number, pct: number) => Math.round(base * (1 - pct / 100));

export default function ProductDetailPage() {
  const { id }      = useParams();
  const router      = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

  const [product,   setProduct]   = useState<any>(null);
  const [related,   setRelated]   = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [selBulk,   setSelBulk]   = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [snackbar,  setSnackbar]  = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data: any = await getProductById(id as string);
        setProduct(data);
        setActiveImg(0);
        if (data) {
          const all = await getProducts();
          setRelated(all.filter((p: any) => p.category === data.category && p.id !== id).slice(0, 12));
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const discount = product?.price > product?.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
  const savePct  = BULK[selBulk]?.save ?? 0;
  const perUnit  = product ? calcUnit(product.salePrice, savePct) : 0;
  const total    = perUnit * BULK[selBulk].qty;
  const allImgs: string[] = product?.images?.length > 0
    ? product.images : product?.image ? [product.image] : [];

  const getShareUrl  = () => typeof window !== "undefined" ? window.location.href : "";
  const getShareText = () => `Check out ${product?.name} at Rs. ${perUnit.toLocaleString("en-IN")}`;

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(getShareText() + " " + getShareUrl())}`, "_blank");
  const shareTwitter  = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`, "_blank");
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`, "_blank");

  const addCart = () => {
    if (!product) return;
    addToCart({ id: product.id, name: product.name, brand: product.brand, image: product.image, price: product.price, salePrice: product.salePrice, quantity: BULK[selBulk].qty, stock: product.stock });
    setSnackbar({ open: true, message: "Added to cart!", severity: "success" });
  };

  const buyNow=()=>{

const user=
localStorage.getItem(
"user"
);

if(!user){

localStorage.setItem(
"redirectAfterLogin",
"/checkout"
);

router.push(
"/login"
);

return;

}

addToCart({

id:product.id,

name:product.name,

brand:product.brand,

image:product.image,

price:product.price,

salePrice:
product.salePrice,

quantity:
BULK[selBulk].qty,

stock:
product.stock

});

router.push(
"/checkout"
);

};

  const scrollCarousel = (d: "left" | "right") =>
    carouselRef.current?.scrollBy({ left: d === "left" ? -220 : 220, behavior: "smooth" });

  if (loading) return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          background: C.pageBg
        }}>
        <CircularProgress sx={{ color: C.razorBlue }} />
      </Box>
      <Footer />
    </>
  );

  if (!product) return (
    <>
      <Header />
      <Box
        sx={{
          textAlign: "center",
          py: 16,
          background: C.pageBg,
          minHeight: "70vh"
        }}>
        <Typography sx={{
          fontSize: "48px"
        }}>😕</Typography>
        <Typography
          color={C.heading}
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            mt: 1,
            fontFamily: sans
          }}>Product Not Found</Typography>
        <Button onClick={() => router.push("/products")} sx={{ mt: 2, textTransform: "none", color: C.blue, fontWeight: 700, fontFamily: sans }}>
          ← Back to Products
        </Button>
      </Box>
      <Footer />
    </>
  );

  const descText = product.description ? String(product.description).trim() : "";
  const tabs = ["description", ...(product.specifications?.length > 0 ? ["specifications"] : [])];

  return (
    <>
      <Header />
      <Box sx={{ background: C.pageBg, minHeight: "100vh", pt: 2.5, pb: 10, fontFamily: sans }}>
        <Container maxWidth="lg">

          {/* ── BREADCRUMB ───────────────────────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 2,
              background: C.surface,
              px: 2.5,
              py: 1.2,
              borderRadius: "10px",
              border: `1px solid ${C.border}`
            }}>
            <Button
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "13px !important" }} />}
              onClick={() => router.push("/products")}
              sx={{ textTransform: "none", fontWeight: 600, color: C.blue, fontSize: "13px", fontFamily: sans, px: 0.5, py: 0, minWidth: 0, "&:hover": { background: "transparent" } }}>
              Products
            </Button>
            <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.textMuted }} />
            <Typography sx={{ fontSize: "13px", color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: sans }}>
              {product.name}
            </Typography>
          </Box>

          {/* ── MAIN CARD ────────────────────────────────────────────────── */}
          <Box sx={{
            display: "flex", flexDirection: { xs: "column", md: "row" },
            background: C.surface, borderRadius: "18px",
            border: `1px solid ${C.border}`,
            boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
            overflow: "hidden", mb: 2,
          }}>

            {/* ══════════ LEFT — Image + Description ══════════ */}
            <Box sx={{
              width: { xs: "100%", md: "50%" },
              flexShrink: 0,
              borderRight: { md: `1px solid ${C.border}` },
              display: "flex", flexDirection: "column",
              background: C.surface,
            }}>
              {/* Image viewer */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, flex: "0 0 auto" }}>

                {/* Desktop thumbnail strip */}
                {allImgs.length > 1 && (
                  <Box sx={{
                    display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: "6px",
                    p: "12px 8px", borderRight: `1px solid ${C.border}`,
                    overflowY: "auto", maxHeight: 520, background: C.surface,
                    "&::-webkit-scrollbar": { width: 2 },
                    "&::-webkit-scrollbar-thumb": { background: C.border },
                  }}>
                    {allImgs.map((img, i) => (
                      <Box key={i} onClick={() => setActiveImg(i)} sx={{
                        width: 60, height: 60, flexShrink: 0,
                        borderRadius: "8px", overflow: "hidden", cursor: "pointer",
                        border: "2px solid",
                        borderColor: activeImg === i ? C.heading : C.border,
                        background: C.surfaceGray,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        p: "4px", transition: "border-color 0.15s",
                        "&:hover": { borderColor: C.heading },
                      }}>
                        <img src={proxyImage(img)} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Main image */}
                <Box sx={{ flex: 1, position: "relative", background: "#fff" }}>
                  {allImgs.length > 1 && (
                    <Box sx={{
                      position: "absolute", top: 10, right: 10, zIndex: 5,
                      background: "rgba(0,0,0,0.5)", color: "#fff",
                      fontSize: "11px", fontWeight: 600, fontFamily: sans,
                      px: 1.4, py: 0.4, borderRadius: "20px",
                    }}>
                      {activeImg + 1} / {allImgs.length}
                    </Box>
                  )}

                  <Box sx={{ position: "relative", paddingTop: "100%", background: "#fff" }}>
                    <Box sx={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden",
                    }}>
                      <img
                        key={allImgs[activeImg]}
                        src={proxyImage(allImgs[activeImg] || "")}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </Box>

                    {allImgs.length > 1 && (
                      <>
                        <IconButton
                          onClick={() => setActiveImg((p) => (p - 1 + allImgs.length) % allImgs.length)}
                          sx={{
                            position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.95)", width: 34, height: 34,
                            border: `1px solid ${C.border}`, zIndex: 3,
                            "&:hover": { background: "#fff", borderColor: C.heading },
                          }}>
                          <ChevronLeftRoundedIcon sx={{ fontSize: 17, color: C.heading }} />
                        </IconButton>
                        <IconButton
                          onClick={() => setActiveImg((p) => (p + 1) % allImgs.length)}
                          sx={{
                            position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.95)", width: 34, height: 34,
                            border: `1px solid ${C.border}`, zIndex: 3,
                            "&:hover": { background: "#fff", borderColor: C.heading },
                          }}>
                          <ChevronRightRoundedIcon sx={{ fontSize: 17, color: C.heading }} />
                        </IconButton>
                      </>
                    )}
                  </Box>

                  {/* Mobile thumbnails */}
                  {allImgs.length > 1 && (
                    <Box sx={{
                      display: { xs: "flex", sm: "none" }, gap: "6px",
                      p: "10px 12px", borderTop: `1px solid ${C.border}`,
                      overflowX: "auto", background: C.surface,
                      "&::-webkit-scrollbar": { height: 0 },
                    }}>
                      {allImgs.map((img, i) => (
                        <Box key={i} onClick={() => setActiveImg(i)} sx={{
                          width: 52, height: 52, flexShrink: 0, borderRadius: "6px",
                          overflow: "hidden", cursor: "pointer",
                          border: `2px solid ${activeImg === i ? C.heading : C.border}`,
                          background: C.surfaceGray,
                          display: "flex", alignItems: "center", justifyContent: "center", p: "3px",
                        }}>
                          <img src={proxyImage(img)} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>

              {/* ── Description / Specs tabs ── */}
              <Box sx={{ borderTop: `1px solid ${C.border}`, flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", background: C.surface, flexShrink: 0 }}>
                  {tabs.map((tab) => (
                    <Box key={tab} onClick={() => setActiveTab(tab as any)} sx={{
                      px: 3, py: 1.6, cursor: "pointer",
                      borderBottom: "2.5px solid",
                      borderColor: activeTab === tab ? C.heading : "transparent",
                      transition: "border-color 0.15s",
                    }}>
                      <Typography sx={{
                        fontSize: "13.5px", fontWeight: activeTab === tab ? 700 : 500,
                        color: activeTab === tab ? C.heading : C.textMuted,
                        textTransform: "capitalize", fontFamily: sans,
                      }}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {activeTab === "description" && (
                  <Box sx={{ p: "20px 22px", flex: 1, overflowY: "auto" }}>
                    {descText ? (
                      <Typography sx={{ fontSize: "13.5px", color: C.text, lineHeight: 1.9, whiteSpace: "pre-line", fontFamily: sans }}>
                        {descText}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: "13px", color: C.textMuted, fontStyle: "italic", py: 4, textAlign: "center", fontFamily: sans }}>
                        No description available.
                      </Typography>
                    )}
                  </Box>
                )}

                {activeTab === "specifications" && product.specifications?.length > 0 && (
                  <Box sx={{ flex: 1, overflowY: "auto" }}>
                    {product.specifications.map((spec: any, i: number) => (
                      <Box key={i} sx={{
                        display: "flex", alignItems: "flex-start",
                        py: 1.4, px: "22px",
                        background: i % 2 === 0 ? C.surfaceWarm : C.surface,
                        borderBottom: i < product.specifications.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      }}>
                        <Typography sx={{ fontSize: "13px", color: C.textSub, fontWeight: 500, width: "38%", flexShrink: 0, pr: 2, lineHeight: 1.8, fontFamily: sans }}>
                          {spec.key}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: C.heading, fontWeight: 600, flex: 1, lineHeight: 1.8, fontFamily: sans }}>
                          {spec.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>

            {/* ══════════ RIGHT — Info + Purchase ══════════ */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ p: { xs: "22px 18px", md: "28px 30px" }, display: "flex", flexDirection: "column", height: "100%" }}>

                {/* Brand + SKU */}
                <Typography sx={{
                  fontSize: "11px", fontWeight: 600, color: C.textMuted,
                  fontFamily: sans, mb: 0.7, letterSpacing: "0.8px", textTransform: "uppercase",
                }}>
                  {product.brand}
                  {product.sku && (
                    <span style={{ marginLeft: 10, fontWeight: 400, textTransform: "none", letterSpacing: 0, color: C.textMuted }}>
                      SKU: {product.sku}
                    </span>
                  )}
                </Typography>

                {/* Product name */}
                <Typography sx={{
                  fontSize: { xs: "18px", md: "21px" }, fontWeight: 700, color: C.heading,
                  lineHeight: 1.3, mb: 2, fontFamily: sans, letterSpacing: "-0.4px",
                }}>
                  {product.name}
                </Typography>

                <Box sx={{ height: "1px", background: C.border, mb: 2.5 }} />

                {/* Price */}
                <Box sx={{
                  mb: 2.5
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1.5,
                      flexWrap: "wrap"
                    }}>
                    <Typography sx={{
                      fontSize: { xs: "28px", md: "32px" }, fontWeight: 800, color: C.heading,
                      fontFamily: sans, lineHeight: 1, letterSpacing: "-1px", fontVariantNumeric: "tabular-nums",
                    }}>
                      Rs. {perUnit.toLocaleString("en-IN")}
                    </Typography>
                    {discount > 0 && (
                      <Typography sx={{ fontSize: "15px", textDecoration: "line-through", color: C.textMuted, fontFamily: sans, fontWeight: 400 }}>
                        Rs. {Number(product.price).toLocaleString("en-IN")}
                      </Typography>
                    )}
                    {discount > 0 && (
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          background: "transparent",
                          border: `1.5px solid ${C.red}`,
                          borderRadius: "6px",
                          px: 1.1,
                          py: 0.4
                        }}>
                        <LocalOfferOutlinedIcon sx={{ fontSize: 11, color: C.red }} />
                        <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: C.red, fontFamily: sans }}>
                          {discount}% off
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans, mt: 0.7 }}>
                    Inclusive of all taxes · Free delivery above ₹1000
                  </Typography>
                </Box>

                {/* ── Trust Badges ── */}
                <Box sx={{ border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", mb: 2.5 }}>
                  <Box sx={{ display: "flex", overflowX: "auto", "&::-webkit-scrollbar": { height: 0 } }}>
                    {BADGES.map((b, i) => (
                      <Box key={i} sx={{
                        flex: "1 0 72px", display: "flex", flexDirection: "column",
                        alignItems: "center", gap: 0.3, p: "12px 5px 10px",
                        borderRight: i < BADGES.length - 1 ? `1px solid ${C.border}` : "none",
                        textAlign: "center",
                      }}>
                        <Box sx={{
                          width: 44, height: 44, borderRadius: "50%", background: b.bg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          mb: 0.5, boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
                        }}>
                          {b.icon}
                        </Box>
                        <Typography sx={{ fontSize: "10px", fontWeight: 700, color: C.heading, fontFamily: sans, lineHeight: 1.3 }}>
                          {b.label}
                        </Typography>
                        <Typography sx={{ fontSize: "9px", color: C.textSub, fontFamily: sans, lineHeight: 1.3 }}>
                          {b.sub}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ background: "#f0f5ff", px: 2, py: 1.2, display: "flex", alignItems: "center", gap: 2, borderTop: `1px solid ${C.blueBorder}` }}>
                    <Typography sx={{ fontSize: "11px", color: C.textSub, lineHeight: 1.7, fontFamily: sans, flex: 1 }}>
                      Fast shipping at extra cost. Same-day dispatch available in Bangalore.
                      COD available on orders ₹1000–₹9999, fee applies.
                    </Typography>
                    <Box sx={{ flexShrink: 0, background: C.blue, borderRadius: "7px", px: 1.2, py: 0.8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "10px", fontWeight: 800, color: "#fff", letterSpacing: "1.5px", fontFamily: sans }}>COD</Typography>
                      <Typography sx={{ fontSize: "8px", color: "#bfdbfe", fontFamily: sans }}>₹1000–₹9999</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* ── Buy more, save more ── */}
                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans, mb: 1.2, letterSpacing: "-0.1px" }}>
                  Buy more, save more
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "7px", mb: 2.5 }}>
                  {BULK.map((tier, i) => {
                    const fp      = calcUnit(product.salePrice, tier.save);
                    const tot     = fp * tier.qty;
                    const origTot = product.salePrice * tier.qty;
                    const isSel   = selBulk === i;
                    return (
                      <Box key={i} onClick={() => setSelBulk(i)} sx={{
                        display: "flex", alignItems: "center",
                        border: `1.5px solid ${isSel ? C.heading : C.border}`,
                        borderRadius: "10px", px: 1.8, py: 1.1,
                        cursor: "pointer", background: isSel ? "#f9f9f9" : C.surface,
                        transition: "all 0.15s",
                        "&:hover": { borderColor: C.heading, background: "#f9f9f9" },
                        position: "relative",
                      }}>
                        {tier.badge && (
                          <Box sx={{
                            position: "absolute", top: -9, right: 10,
                            background: C.heading, color: "#fff",
                            fontSize: "9px", fontWeight: 700, px: 1, py: 0.25,
                            borderRadius: "4px", fontFamily: sans,
                          }}>
                            {tier.badge}
                          </Box>
                        )}
                        <Radio checked={isSel} size="small" sx={{ p: 0, mr: 1.2, color: C.border, "&.Mui-checked": { color: C.heading } }} />
                        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: C.heading, fontFamily: sans, mr: 1.2 }}>
                          {tier.label}
                        </Typography>
                        {tier.save > 0 ? (
                          <Box sx={{ background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: "5px", px: 0.9, py: 0.2 }}>
                            <Typography sx={{ fontSize: "10px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                              Save {tier.save}%
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ background: C.surfaceGray, borderRadius: "5px", px: 0.9, py: 0.2 }}>
                            <Typography sx={{ fontSize: "10px", color: C.textMuted, fontFamily: sans }}>No Savings</Typography>
                          </Box>
                        )}
                        <Box sx={{ ml: "auto", textAlign: "right" }}>
                          {tier.save > 0 && (
                            <Typography sx={{ fontSize: "11px", textDecoration: "line-through", color: C.textMuted, fontFamily: sans }}>
                              Rs. {origTot.toLocaleString("en-IN")}
                            </Typography>
                          )}
                          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, fontFamily: sans, fontVariantNumeric: "tabular-nums" }}>
                            Rs. {tot.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    borderTop: `1px solid ${C.border}`,
                    pt: 2
                  }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, color: C.textSub, fontFamily: sans }}>Total</Typography>
                  <Typography sx={{ fontSize: "22px", fontWeight: 800, color: C.heading, fontFamily: sans, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.5px" }}>
                    Rs. {total.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                {/* CTA Buttons */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mb: 3 }}>
                  <Button
                    startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: "17px !important" }} />}
                    disabled={product.stock === 0}
                    onClick={addCart}
                    fullWidth
                    variant="outlined"
                    sx={{
                      height: 50, borderRadius: "11px", fontWeight: 600, fontSize: "14px",
                      textTransform: "none", fontFamily: sans,
                      borderColor: C.border, color: C.heading, borderWidth: "1.5px",
                      letterSpacing: "-0.1px",
                      "&:hover": { borderColor: C.heading, background: "#f5f5f5", borderWidth: "1.5px" },
                      "&:disabled": { background: C.surfaceGray, color: C.textMuted, borderColor: C.border },
                    }}>
                    {product.stock === 0 ? "Out of Stock" : "Add to cart"}
                  </Button>
                  <Button
                    disabled={product.stock === 0}
                    onClick={buyNow}
                    fullWidth
                    sx={{
                      height: 50, borderRadius: "11px", fontWeight: 700, fontSize: "14px",
                      textTransform: "none", fontFamily: sans,
                      background: C.heading, color: "#fff",
                      letterSpacing: "-0.1px",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                      "&:hover": { background: "#222", boxShadow: "0 6px 20px rgba(0,0,0,0.22)" },
                      "&:disabled": { background: C.surfaceGray, color: C.textMuted, boxShadow: "none" },
                    }}>
                    Buy it now
                  </Button>
                </Box>

                {/* ══ Razorpay Money Back Promise — Premium Card ══ */}
                <Box sx={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid #c7d7f5",
                  boxShadow: "0 2px 16px rgba(37,99,235,0.08)",
                  mb: 3,
                }}>
                  {/* Card header — deep blue gradient */}
                  <Box sx={{
                    background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)",
                    px: 2.5, py: 2,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    {/* Left: shield + title */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                      }}>
                      <Box sx={{
                        width: 38, height: 38, borderRadius: "10px",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 1.5L2 4.5V10C2 14.1 5.5 17.5 10 19c4.5-1.5 8-4.9 8-9V4.5L10 1.5z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                          <path d="M10 1.5L2 4.5V10C2 14.1 5.5 17.5 10 19c4.5-1.5 8-4.9 8-9V4.5L10 1.5z" fill="white" fillOpacity="0.12"/>
                          <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#fff", fontFamily: sans, lineHeight: 1.2, letterSpacing: "-0.2px" }}>
                          Money Back Promise
                        </Typography>
                        <Typography sx={{ fontSize: "10.5px", color: "rgba(255,255,255,0.65)", fontFamily: sans, fontWeight: 400, mt: 0.2 }}>
                          Buyer protection on every order
                        </Typography>
                      </Box>
                    </Box>

                    {/* Right: Razorpay badge */}
                    <Box sx={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      borderRadius: "8px", px: 1.2, py: 0.7,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 0.2,
                    }}>
                      <Typography sx={{ fontSize: "7px", color: "rgba(255,255,255,0.55)", fontFamily: sans, letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 500 }}>
                        powered by
                      </Typography>
                      <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#fff", fontFamily: sans, letterSpacing: "0.5px" }}>
                        Razorpay
                      </Typography>
                    </Box>
                  </Box>

                  {/* Promise rows */}
                  <Box sx={{ background: "#fff" }}>
                    {[
                      {
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="8" stroke="#2563eb" strokeWidth="1.5"/>
                            <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ),
                        label: "100% refund",
                        desc: "on non-delivery or defects",
                      },
                      {
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M15 9A6 6 0 1 1 3.5 6M3 3v3h3" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ),
                        label: "7-day easy returns",
                        desc: "no questions asked",
                      },
                      {
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="3" y="8" width="12" height="8" rx="2" stroke="#2563eb" strokeWidth="1.5"/>
                            <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="9" cy="12" r="1.2" fill="#2563eb"/>
                          </svg>
                        ),
                        label: "Secure & encrypted",
                        desc: "payments via Razorpay",
                      },
                    ].map((item, i, arr) => (
                      <Box key={i} sx={{
                        display: "flex", alignItems: "center", gap: 2,
                        px: 2.5, py: 1.6,
                        borderBottom: i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none",
                        transition: "background 0.12s",
                        "&:hover": { background: "#fafbff" },
                      }}>
                        {/* Icon bubble */}
                        <Box sx={{
                          width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                          background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                          border: "1px solid #bfdbfe",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 1px 4px rgba(37,99,235,0.1)",
                        }}>
                          {item.icon}
                        </Box>
                        {/* Text */}
                        <Box>
                          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#1e3a8a", fontFamily: sans, lineHeight: 1.3 }}>
                            {item.label}
                          </Typography>
                          <Typography sx={{ fontSize: "11.5px", color: C.textSub, fontFamily: sans, lineHeight: 1.4, mt: 0.2 }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* ── Share — icon only with extra spacing ── */}
                <Box sx={{ borderTop: `1px solid ${C.border}`, pt: 3, mt: "auto" }}>
                  <Typography sx={{
                    fontSize: "10px", fontWeight: 600, color: C.textMuted,
                    fontFamily: sans, mb: 2, textTransform: "uppercase", letterSpacing: "1.2px",
                  }}>
                    Share this product
                  </Typography>
                  <Box
                    sx={{
                    display:"flex",
                    alignItems:"center",
                    gap:"14px",
                    mt:1,
                    flexWrap:"wrap"
                    }}
                  >
                    <IconButton
                      onClick={shareWhatsApp}
                      aria-label="Share on WhatsApp"
                      sx={{
                        width: 48, height: 48, borderRadius: "14px",mx:0.4,
                        background: "#f0fdf4", color: C.whatsapp,
                        border: "1.5px solid #bbf7d0",
                        "&:hover": {
                          background: "#dcfce7", borderColor: C.whatsapp,
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 16px rgba(37,211,102,0.22)",
                        },
                        transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
                      }}>
                      <WhatsAppIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <IconButton
                      onClick={shareTwitter}
                      aria-label="Share on Twitter"
                      sx={{
                        width: 42, height: 42, borderRadius: "11px",
                        background: "#eff8ff", color: C.twitter,
                        border: "1.5px solid #bae6fd",
                        "&:hover": {
                          background: "#e0f2fe", borderColor: C.twitter,
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 16px rgba(29,161,242,0.22)",
                        },
                        transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
                      }}>
                      <TwitterIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <IconButton
                      onClick={shareFacebook}
                      aria-label="Share on Facebook"
                      sx={{
                        width: 42, height: 42, borderRadius: "11px",
                        background: "#eff6ff", color: C.facebook,
                        border: "1.5px solid #bfdbfe",
                        "&:hover": {
                          background: "#dbeafe", borderColor: C.facebook,
                          transform: "translateY(-3px) scale(1.06)",
                          boxShadow: "0 6px 16px rgba(24,119,242,0.22)",
                        },
                        transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
                      }}>
                      <FacebookIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </Box>
                </Box>

              </Box>
            </Box>
          </Box>

          {/* ── "Buy direct" banner ──────────────────────────────────────── */}
          <Box sx={{
            background: C.surface, borderRadius: "14px",
            border: `1px solid ${C.border}`,
            textAlign: "center", py: { xs: 5, md: 6 }, px: 4, mb: 2,
          }}>
            <Typography sx={{ fontSize: "12px", color: C.textMuted, fontFamily: sans, mb: 0.8 }}>
              GST Invoice available, just mail back with details to order confirmation mail.
            </Typography>
            <Typography sx={{ fontSize: { xs: "20px", md: "28px" }, fontWeight: 800, color: C.heading, fontFamily: sans, mb: 0.5, letterSpacing: "-0.5px" }}>
              Buy direct from official {product.brand} India
            </Typography>
            <Typography sx={{ fontSize: "14px", color: C.textSub, fontFamily: sans }}>
              GST Invoice, Warranty, authenticity, faster support
            </Typography>
          </Box>

          {/* ── YOU MAY ALSO LIKE ────────────────────────────────────────── */}
          {related.length > 0 && (
            <Box sx={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, p: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2.5
                }}>
                <Typography sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700, color: C.heading, fontFamily: sans, letterSpacing: "-0.3px" }}>
                  You may also like
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.8
                  }}>
                  {(["left", "right"] as const).map((dir) => (
                    <IconButton key={dir} onClick={() => scrollCarousel(dir)}
                      sx={{
                        width: 34, height: 34, borderRadius: "8px",
                        border: `1px solid ${C.border}`, background: C.surface, color: C.heading,
                        "&:hover": { background: C.surfaceGray },
                      }}>
                      {dir === "left"
                        ? <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
                        : <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                  ))}
                </Box>
              </Box>

              <Box ref={carouselRef} sx={{
                display: "flex", overflowX: "auto",
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { height: 0 },
              }}>
                {related.map((item: any, idx: number) => {
                  const rD   = item.price > item.salePrice
                    ? Math.round(((item.price - item.salePrice) / item.price) * 100) : 0;
                  const rImg = item.images?.[0] || item.image || "";
                  return (
                    <Box key={item.id} onClick={() => router.push(`/products/${item.id}`)} sx={{
                      minWidth: 190, maxWidth: 190, flexShrink: 0, scrollSnapAlign: "start",
                      cursor: "pointer",
                      borderRight: idx < related.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      p: "16px 12px",
                      transition: "background 0.14s",
                      "&:hover": { background: C.surfaceWarm },
                      display: "flex", flexDirection: "column",
                    }}>
                      <Box sx={{
                        width: "100%", height: 150,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        mb: 1.2, position: "relative",
                        background: C.surfaceGray, borderRadius: "8px", overflow: "hidden",
                      }}>
                        <img src={proxyImage(rImg)} alt={item.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                        {rD > 0 && (
                          <Box sx={{
                            position: "absolute", top: 6, left: 6,
                            background: C.red, color: "#fff", fontWeight: 700, fontSize: "10px",
                            fontFamily: sans, px: 0.7, py: 0.25, borderRadius: "4px",
                            display: "flex", alignItems: "center", gap: 0.3,
                          }}>
                            <LocalOfferOutlinedIcon sx={{ fontSize: 9 }} /> {rD}% off
                          </Box>
                        )}
                      </Box>
                      <Typography sx={{ fontSize: "10px", color: C.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.3, fontFamily: sans }}>
                        {item.brand}
                      </Typography>
                      <Typography sx={{
                        fontWeight: 500, fontSize: "12px", color: C.text, lineHeight: 1.5, mb: 0.8, fontFamily: sans,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                        overflow: "hidden", minHeight: "36px",
                      }}>
                        {item.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 0.7,
                          mb: 1.2,
                          flexWrap: "wrap"
                        }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "14px", color: C.heading, fontVariantNumeric: "tabular-nums", fontFamily: sans }}>
                          Rs. {Number(item.salePrice).toLocaleString("en-IN")}
                        </Typography>
                        {item.price > item.salePrice && (
                          <Typography sx={{ fontSize: "11px", textDecoration: "line-through", color: C.textMuted, fontFamily: sans }}>
                            Rs. {Number(item.price).toLocaleString("en-IN")}
                          </Typography>
                        )}
                      </Box>
                      <Button fullWidth variant="outlined" size="small" sx={{
                        height: 32, borderRadius: "7px", textTransform: "none",
                        fontWeight: 600, fontSize: "11px", fontFamily: sans,
                        borderColor: C.border, color: C.textSub,
                        "&:hover": { borderColor: C.heading, color: C.heading, background: "transparent" },
                        mt: "auto",
                      }}>
                        View Product
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: "10px", fontWeight: 700, fontFamily: sans, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}