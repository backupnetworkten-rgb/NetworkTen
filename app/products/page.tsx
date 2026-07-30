"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Header from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { getProducts } from "@/services/productService";
import { proxyImage } from "@/lib/proxyImage";
import { addToCart } from "@/lib/cartStore";
import RatingStars from "@/components/review/RatingStars";

import { useRouter } from "next/navigation";

const filterSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#fff",
    fontSize: "13px",
    fontWeight: 500,
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0B1730" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0B1730",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0B1730" },
};

const CART_BAR_DURATION = 10000; // 10 seconds
const PAGE_SIZE = 16; // products shown initially and per infinite-scroll load
const ADD_TO_CART_COOLDOWN = 800; // ms — prevents double-fire from rapid/duplicate clicks
const LOAD_MORE_DELAY = 400; // ms — small delay so the loader is visible & feels natural

const BULK_ORDER_PHONE = "8687878755";

const CATEGORIES = [
  "All",
  "Network Product",
  "CCTV Camera",
  "Video Conferencing Device",
  "Access Control",
  "Solar Camera",
  "Mini Desktop",
  "All in One Desktop",
  "Display Monitor (Touch / Non Touch)",
];

type CartBarProduct = {
  id: string;
  name: string;
  brand: string;
  image: string;
  salePrice: number;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const router = useRouter();

  // ── "Added to cart" premium bottom popup bar ──
  const [cartBarMounted, setCartBarMounted] = useState(false);
  const [cartBarVisible, setCartBarVisible] = useState(false);
  const [cartBarProduct, setCartBarProduct] = useState<CartBarProduct | null>(null);
  const [cartBarProgress, setCartBarProgress] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRAF = useRef<number | null>(null);

  // Guards against the same "Add" click firing twice (double-bound events,
  // duplicate product ids from the API, fast double taps on mobile, etc.)
  const lastAddRef = useRef<{ id: string; time: number } | null>(null);

  // ── Bulk order / IT products card — permanent sidebar card, dismissible for the session ──
  const [bulkCardVisible, setBulkCardVisible] = useState(true);

  // ── Infinite scroll sentinel ──
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
      if (progressRAF.current) cancelAnimationFrame(progressRAF.current);
      if (loadMoreTimer.current) clearTimeout(loadMoreTimer.current);
    };
  }, []);

  const handleBulkCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${BULK_ORDER_PHONE}`;
    }
  };

  const handleGoToContact = () => {
    router.push("/contact");
  };

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, sort]);

  const showCartBar = (product: CartBarProduct) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    if (unmountTimer.current) {
      clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    }
    if (progressRAF.current) {
      cancelAnimationFrame(progressRAF.current);
      progressRAF.current = null;
    }

    setCartBarProduct(product);
    setCartBarMounted(true);
    setCartBarProgress(false);

    progressRAF.current = requestAnimationFrame(() => {
      setCartBarVisible(true);
      progressRAF.current = requestAnimationFrame(() => setCartBarProgress(true));
    });

    hideTimer.current = setTimeout(() => {
      setCartBarVisible(false);
      unmountTimer.current = setTimeout(() => setCartBarMounted(false), 400);
    }, CART_BAR_DURATION);
  };

  const dismissCartBar = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    if (unmountTimer.current) {
      clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    }
    setCartBarVisible(false);
    unmountTimer.current = setTimeout(() => setCartBarMounted(false), 400);
  };

  const filteredProducts = products
    .filter((item: any) => category === "All" || item.category === category)
    .filter((item: any) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sort === "low") return a.salePrice - b.salePrice;
      if (sort === "high") return b.salePrice - a.salePrice;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

  // ── Infinite scroll: observe sentinel, auto-load next batch ──
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    loadMoreTimer.current = setTimeout(() => {
      setVisibleCount((c) => c + PAGE_SIZE);
      setLoadingMore(false);
    }, LOAD_MORE_DELAY);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px 0px" } // start loading a bit before it's fully in view
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  // Count products per category (based on search only, so counts stay meaningful)
  const categoryCounts: Record<string, number> = { All: products.filter((p: any) => p.name?.toLowerCase().includes(search.toLowerCase())).length };
  CATEGORIES.slice(1).forEach((cat) => {
    categoryCounts[cat] = products.filter(
      (p: any) => p.category === cat && p.name?.toLowerCase().includes(search.toLowerCase())
    ).length;
  });

  // ── Add to cart handler ──────────────────────────────────────────────
  const handleAddToCart = (product: any) => {
    if (!product || product.stock === 0) return;

    const now = Date.now();
    if (
      lastAddRef.current &&
      lastAddRef.current.id === product.id &&
      now - lastAddRef.current.time < ADD_TO_CART_COOLDOWN
    ) {
      return;
    }
    lastAddRef.current = { id: product.id, time: now };

    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      salePrice: product.salePrice,
      quantity: 1,
      stock: product.stock,
    });
    setSnackbar({ open: true, message: `${product.name} added to cart!`, severity: "success" });
    showCartBar({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      salePrice: product.salePrice,
      price: product.price,
    });
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          background: "linear-gradient(180deg,#f6f8fc 0%,#eef2f9 100%)",
          minHeight: "100vh",
          pt: 4,
          pb: cartBarMounted ? 14 : 8,
          transition: "padding-bottom 0.3s",
        }}
      >
        <Container maxWidth="xl">
          {/* HERO */}
          <Box sx={{ textAlign: "center", maxWidth: "700px", mx: "auto", mb: 4, px: 2 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                background: "#eef8de",
                border: "1px solid #c9e89a",
                borderRadius: "50px",
                px: 2,
                py: 0.5,
                mb: 1.5,
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#8BC53F" }} />
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#5a8a1f",
                }}
              >
                NetworkTen Store
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "26px", md: "36px" },
                fontWeight: 900,
                color: "#0B1730",
                lineHeight: 1.1,
                mb: 1,
              }}
            >
              Products
            </Typography>

            <Typography sx={{ color: "#667085", fontSize: "14px", lineHeight: 1.6 }}>
              Premium networking, security and enterprise technology for modern businesses.
            </Typography>
          </Box>

          {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
          <Grid container spacing={2.5}>
            {/* ── LEFT VERTICAL SIDEBAR ── */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "18px",
                  border: "1px solid rgba(11,23,48,.07)",
                  boxShadow: "0 12px 36px rgba(11,23,48,.06)",
                  p: 2,
                  position: { md: "sticky" },
                  top: { md: 90 },
                }}
              >
                {/* Search */}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon sx={{ fontSize: 18, color: "#98A2B3" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      height: "42px",
                      borderRadius: "10px",
                      background: "#f7f9fc",
                      fontSize: "13px",
                    },
                  }}
                />

                {/* Sort */}
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  sx={{ ...filterSx, mb: 2.5 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SortRoundedIcon sx={{ fontSize: 16, color: "#0B1730" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  <MenuItem value="latest">Latest First</MenuItem>
                  <MenuItem value="low">Price: Low to High</MenuItem>
                  <MenuItem value="high">Price: High to Low</MenuItem>
                </TextField>

                <Divider sx={{ mb: 1.5 }} />

                {/* Category heading */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1, px: 0.5 }}>
                  <TuneRoundedIcon sx={{ fontSize: 16, color: "#0B1730" }} />
                  <Typography sx={{ fontSize: "12px", fontWeight: 800, color: "#0B1730", letterSpacing: "0.4px" }}>
                    CATEGORIES
                  </Typography>
                </Box>

                {/* Vertical category list */}
                <List disablePadding>
                  {CATEGORIES.map((cat) => {
                    const active = category === cat;
                    return (
                      <ListItemButton
                        key={cat}
                        selected={active}
                        onClick={() => setCategory(cat)}
                        sx={{
                          borderRadius: "10px",
                          mb: 0.5,
                          py: 0.7,
                          px: 1.2,
                          "&.Mui-selected": {
                            background: "#0B1730",
                            "&:hover": { background: "#0a1428" },
                          },
                        }}
                      >
                        <ListItemText
                          primary={cat}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: "12.5px",
                                fontWeight: active ? 700 : 500,
                                color: active ? "#fff" : "#344054",
                                lineHeight: 1.3,
                              },
                            },
                          }}
                        />
                        <Chip
                          label={categoryCounts[cat] ?? 0}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "10px",
                            fontWeight: 700,
                            background: active ? "rgba(255,255,255,0.15)" : "#f0f4fa",
                            color: active ? "#fff" : "#667085",
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>

                {/* ══════════════════════════════════════════════════════
                    PREMIUM "BULK & IT ORDERS" CARD
                ══════════════════════════════════════════════════════ */}
                {bulkCardVisible && (
                  <Box
                    sx={{
                      mt: 2.5,
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "linear-gradient(160deg, #0a1428 0%, #0B1730 60%, #142850 100%)",
                      boxShadow: "0 14px 32px rgba(11,23,48,0.22)",
                      border: "1px solid rgba(139,197,63,0.18)",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "radial-gradient(circle at 85% 0%, rgba(139,197,63,0.20) 0%, transparent 55%)",
                        pointerEvents: "none",
                      }}
                    />

                    <IconButton
                      onClick={() => setBulkCardVisible(false)}
                      aria-label="Dismiss"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 22,
                        height: 22,
                        zIndex: 1,
                        background: "rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.75)",
                        "&:hover": { background: "rgba(255,255,255,0.2)", color: "#fff" },
                      }}
                    >
                      <CloseRoundedIcon sx={{ fontSize: 13 }} />
                    </IconButton>

                    <Box sx={{ position: "relative", p: 2.2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.6 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, rgba(139,197,63,0.28), rgba(139,197,63,0.12))",
                            border: "1px solid rgba(139,197,63,0.45)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: "0 4px 12px rgba(139,197,63,0.18)",
                          }}
                        >
                          <Inventory2RoundedIcon sx={{ fontSize: 17, color: "#8BC53F" }} />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "12.5px",
                            fontWeight: 900,
                            letterSpacing: "0.8px",
                            textTransform: "uppercase",
                            color: "#8BC53F",
                          }}
                        >
                          Bulk &amp; IT Orders
                        </Typography>
                      </Box>

                      <Typography
                        sx={{ fontSize: "14px", fontWeight: 800, color: "#fff", lineHeight: 1.35, mb: 0.8 }}
                      >
                        Special pricing for corporate &amp; bulk orders
                      </Typography>

                      <Typography
                        sx={{ fontSize: "11.5px", color: "rgba(255,255,255,0.62)", lineHeight: 1.6, mb: 1.8 }}
                      >
                        You can text us for any kind of IT Products or bulk order.
                      </Typography>

                      <Button
                        fullWidth
                        onClick={handleGoToContact}
                        startIcon={<SupportAgentRoundedIcon sx={{ fontSize: 15 }} />}
                        sx={{
                          height: 38,
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #ffffff, #f3f5f9)",
                          color: "#0B1730",
                          fontWeight: 800,
                          fontSize: "12px",
                          textTransform: "none",
                          mb: 1,
                          boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
                          "&:hover": { background: "#ffffff" },
                        }}
                      >
                        Contact Us
                      </Button>

                      <Button
                        fullWidth
                        onClick={handleBulkCall}
                        startIcon={<CallRoundedIcon sx={{ fontSize: 15 }} />}
                        sx={{
                          height: 38,
                          borderRadius: "10px",
                          background: "rgba(139,197,63,0.14)",
                          border: "1px solid rgba(139,197,63,0.4)",
                          color: "#8BC53F",
                          fontWeight: 800,
                          fontSize: "12px",
                          textTransform: "none",
                          "&:hover": { background: "rgba(139,197,63,0.22)" },
                        }}
                      >
                        Call {BULK_ORDER_PHONE}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* ── RIGHT CONTENT ── */}
            <Grid size={{ xs: 12, md: 9 }}>
              {!loading && (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, px: 0.5, flexWrap: "wrap", gap: 1 }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#667085" }}>
                    Showing {visibleProducts.length} of {filteredProducts.length} products
                  </Typography>
                  <Chip
                    label={`${filteredProducts.length} Total`}
                    sx={{
                      borderRadius: "50px",
                      fontWeight: 800,
                      fontSize: "11px",
                      background: "#0B1730",
                      color: "#fff",
                    }}
                  />
                </Box>
              )}

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                  <CircularProgress sx={{ color: "#0B1730" }} />
                </Box>
              ) : filteredProducts.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <Typography sx={{ fontSize: "40px", mb: 1.5 }}>🔍</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: "20px", color: "#0B1730", mb: 1 }}>
                    No Products Found
                  </Typography>
                  <Typography sx={{ color: "#98A2B3", fontSize: "13px" }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={{ xs: 1.75, sm: 2, md: 2.5 }}>
                    {visibleProducts.map((product: any) => {
                      const discount =
                        product.price > product.salePrice
                          ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                          : 0;
                      const reviewCount = product.reviewCount ?? product.reviewsCount ?? product.reviews?.length ?? 0;

                      return (
                        <Grid key={product.id} size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
                          <Card
                            onClick={() => router.push(`/products/${product.id}`)}
                            sx={{
                              height: "100%",
                              borderRadius: { xs: "16px", sm: "18px", md: "20px" },
                              overflow: "hidden",
                              background: "#fff",
                              border: "1px solid rgba(11,23,48,.08)",
                              boxShadow: "0 3px 14px rgba(11,23,48,.05)",
                              transition: "all .3s ease",
                              display: "flex",
                              flexDirection: "column",
                              cursor: "pointer",
                              position: "relative",
                              "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 22px 44px rgba(11,23,48,.15)",
                                borderColor: "rgba(139,197,63,0.35)",
                              },
                              "&:hover .add-to-cart-btn": {
                                background: "linear-gradient(135deg,#8BC53F,#6fa62f)",
                              },
                            }}
                          >
                            {/* Image — transparent background, no visible box/frame */}
                            <Box
                              sx={{
                                position: "relative",
                                overflow: "hidden",
                                background: "transparent",
                                height: { xs: 150, sm: 190, md: 220 },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: { xs: 1.2, sm: 1.8, md: 2.2 },
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={proxyImage(product.image || "")}
                                alt={product.name}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  transition: "transform .35s ease",
                                }}
                              />

                              {discount > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: { xs: 8, sm: 12 },
                                    left: { xs: 8, sm: 12 },
                                    background: "#8BC53F",
                                    px: 1.1,
                                    py: 0.35,
                                    borderRadius: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.4,
                                    color: "#fff",
                                    fontWeight: 800,
                                    fontSize: { xs: "9.5px", sm: "11px" },
                                    boxShadow: "0 3px 10px rgba(139,197,63,0.4)",
                                  }}
                                >
                                  <LocalOfferRoundedIcon sx={{ fontSize: { xs: 9, sm: 11 } }} />
                                  {discount}% OFF
                                </Box>
                              )}

                              <Box
                                sx={{
                                  position: "absolute",
                                  top: { xs: 8, sm: 12 },
                                  right: { xs: 8, sm: 12 },
                                  background: "rgba(255,255,255,0.94)",
                                  backdropFilter: "blur(8px)",
                                  px: 1,
                                  py: 0.32,
                                  borderRadius: "8px",
                                  fontSize: { xs: "8.5px", sm: "10px" },
                                  fontWeight: 800,
                                  letterSpacing: "0.3px",
                                  color: product.stock > 0 ? "#16a34a" : "#ef4444",
                                }}
                              >
                                {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                              </Box>
                            </Box>

                            {/* Divider between image and content — subtle premium separator */}
                            <Box
                              sx={{
                                height: "1px",
                                mx: 2,
                                background:
                                  "linear-gradient(90deg, transparent 0%, rgba(11,23,48,.12) 20%, rgba(139,197,63,.35) 50%, rgba(11,23,48,.12) 80%, transparent 100%)",
                              }}
                            />

                            <CardContent
                              sx={{
                                p: { xs: 1.5, sm: 1.8, md: 2.2 },
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                "&:last-child": { pb: { xs: 1.5, sm: 1.8, md: 2.2 } },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: { xs: "9.5px", sm: "10.5px" },
                                  color: "#6fa62f",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.6px",
                                  mb: 0.4,
                                }}
                              >
                                {product.brand}
                              </Typography>

                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: { xs: "12.5px", sm: "14px", md: "15px" },
                                  color: "#0B1730",
                                  mb: 0.7,
                                  lineHeight: 1.3,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  minHeight: { xs: "32px", sm: "36px", md: "39px" },
                                }}
                              >
                                {product.name}
                              </Typography>

                              {/* Rating summary — only rendered when there's something to show */}
                              {(product.rating > 0 || reviewCount > 0) && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1, flexWrap: "wrap" }}>
                                  <RatingStars rating={product.rating} reviewCount={reviewCount} size={13} />
                                </Box>
                              )}

                              <Box sx={{ mt: "auto" }}>
                                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mb: 1.2 }}>
                                  <Typography
                                    sx={{
                                      fontSize: { xs: "15.5px", sm: "17.5px", md: "19px" },
                                      fontWeight: 900,
                                      color: "#0B1730",
                                      lineHeight: 1,
                                    }}
                                  >
                                    ₹{product.salePrice?.toLocaleString("en-IN")}
                                  </Typography>
                                  {product.price > product.salePrice && (
                                    <Typography
                                      sx={{
                                        fontSize: { xs: "10.5px", sm: "12px" },
                                        textDecoration: "line-through",
                                        color: "#98A2B3",
                                      }}
                                    >
                                      ₹{product.price?.toLocaleString("en-IN")}
                                    </Typography>
                                  )}
                                </Box>

                                <Button
                                  className="add-to-cart-btn"
                                  fullWidth
                                  variant="contained"
                                  disabled={product.stock === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                  }}
                                  sx={{
                                    height: { xs: 36, sm: 40, md: 42 },
                                    borderRadius: "11px",
                                    background: "linear-gradient(135deg,#0B1730,#1e3a6e)",
                                    fontWeight: 800,
                                    textTransform: "none",
                                    fontSize: { xs: "11.5px", sm: "12.5px", md: "13px" },
                                    letterSpacing: "0.2px",
                                    boxShadow: "0 6px 16px rgba(11,23,48,.28)",
                                    transition: "background .25s ease, box-shadow .25s ease",
                                    "&:hover": {
                                      background: "linear-gradient(135deg,#6fa62f,#5a8a25)",
                                      boxShadow: "0 8px 20px rgba(139,197,63,.35)",
                                    },
                                    "&:disabled": { background: "#e5e8ef", color: "#98A2B3", boxShadow: "none" },
                                  }}
                                >
                                  <ShoppingCartRoundedIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.7 }} />
                                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* ── INFINITE SCROLL SENTINEL ── */}
                  {hasMore && (
                    <Box
                      ref={sentinelRef}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 5,
                        gap: 1.2,
                      }}
                    >
                      <CircularProgress size={22} sx={{ color: "#0B1730" }} />
                      <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#98A2B3" }}>
                        Loading more products...
                      </Typography>
                    </Box>
                  )}

                  {/* End of list message */}
                  {!hasMore && filteredProducts.length > PAGE_SIZE && (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#98A2B3" }}>
                        You've reached the end — {filteredProducts.length} products shown
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          PREMIUM "ADDED TO CART" STICKY BOTTOM BAR
      ══════════════════════════════════════════════════════════════ */}
      {cartBarMounted && cartBarProduct && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
            transform: cartBarVisible ? "translateY(0)" : "translateY(110%)",
            transition: "transform 0.4s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <Box sx={{ height: "3px", background: "rgba(11,23,48,0.15)", overflow: "hidden" }}>
            <Box
              sx={{
                height: "100%",
                background: "linear-gradient(90deg, #8BC53F, #6fa62f)",
                width: cartBarProgress ? "0%" : "100%",
                transition: cartBarProgress ? `width ${CART_BAR_DURATION}ms linear` : "none",
              }}
            />
          </Box>

          <Box
            sx={{
              background: "linear-gradient(135deg, #0a1428 0%, #0B1730 55%, #142850 100%)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 -12px 40px rgba(4,10,30,0.35)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: 1.5, sm: 2.5 },
                  py: { xs: 1.5, sm: 1.8 },
                  px: { xs: 0.5, md: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.4, sm: 1.8 }, minWidth: 0, flex: 1 }}>
                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: { xs: 46, sm: 54 },
                        height: { xs: 46, sm: 54 },
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        p: "6px",
                      }}
                    >
                      <img
                        src={proxyImage(cartBarProduct.image || "")}
                        alt={cartBarProduct.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -4,
                        right: -4,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#8BC53F",
                        border: "2px solid #0B1730",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(139,197,63,0.5)",
                      }}
                    >
                      <CheckRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
                    </Box>
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#8BC53F",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        mb: "2px",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Added to cart
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "12.5px", sm: "13.5px" },
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.35,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: { xs: 150, sm: 320, md: 460 },
                      }}
                    >
                      {cartBarProduct.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mt: "2px" }}>
                      <Typography sx={{ fontSize: "13px", fontWeight: 800, color: "#fff" }}>
                        ₹{cartBarProduct.salePrice.toLocaleString("en-IN")}
                      </Typography>
                      {cartBarProduct.price > cartBarProduct.salePrice && (
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.45)",
                            textDecoration: "line-through",
                            display: { xs: "none", sm: "inline" },
                          }}
                        >
                          ₹{cartBarProduct.price.toLocaleString("en-IN")}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.8, sm: 1.2 }, flexShrink: 0 }}>
                  <Button
                    onClick={() => router.push("/cart")}
                    endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: "16px !important" }} />}
                    sx={{
                      height: { xs: 40, sm: 44 },
                      borderRadius: "11px",
                      fontWeight: 800,
                      fontSize: { xs: "12.5px", sm: "13.5px" },
                      textTransform: "none",
                      background: "linear-gradient(135deg, #ffffff, #f3f5f9)",
                      color: "#0B1730",
                      px: { xs: 2, sm: 2.8 },
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                      whiteSpace: "nowrap",
                      "&:hover": { background: "#ffffff", boxShadow: "0 6px 18px rgba(0,0,0,0.3)" },
                    }}
                  >
                    View Cart
                  </Button>
                  <IconButton
                    onClick={dismissCartBar}
                    aria-label="Dismiss"
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      "&:hover": { color: "#fff", background: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    <CloseRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: "10px", fontWeight: 700, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}