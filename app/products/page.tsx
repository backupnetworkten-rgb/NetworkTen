"use client";

import { useEffect, useState, useRef } from "react";
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
  Tooltip,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
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
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#102048" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#102048",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#102048" },
};

const CART_BAR_DURATION = 10000; // 10 seconds
const PAGE_SIZE = 16; // show this many before "View All"

// ── Bulk order popup timing ──
const BULK_POPUP_FIRST_DELAY = 5000;   // show first popup 5s after page load
const BULK_POPUP_REPEAT_EVERY = 25000; // then repeat every 25s
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

  // ── Bulk order / IT products popup (non-blocking — page stays fully usable) ──
  const [bulkMounted, setBulkMounted] = useState(false);
  const [bulkVisible, setBulkVisible] = useState(false);
  const bulkFirstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bulkIntervalTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bulkHideAnimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
      if (progressRAF.current) cancelAnimationFrame(progressRAF.current);
    };
  }, []);

  // ── Bulk popup: open at 5s, then re-open every 25s. No backdrop — page stays interactive. ──
  const openBulkPopup = () => {
    if (bulkHideAnimTimer.current) clearTimeout(bulkHideAnimTimer.current);
    setBulkMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setBulkVisible(true)));
  };

  const closeBulkPopup = () => {
    setBulkVisible(false);
    bulkHideAnimTimer.current = setTimeout(() => setBulkMounted(false), 350);
  };

  useEffect(() => {
    bulkFirstTimer.current = setTimeout(() => {
      openBulkPopup();
      bulkIntervalTimer.current = setInterval(() => {
        openBulkPopup();
      }, BULK_POPUP_REPEAT_EVERY);
    }, BULK_POPUP_FIRST_DELAY);

    return () => {
      if (bulkFirstTimer.current) clearTimeout(bulkFirstTimer.current);
      if (bulkIntervalTimer.current) clearInterval(bulkIntervalTimer.current);
      if (bulkHideAnimTimer.current) clearTimeout(bulkHideAnimTimer.current);
    };
  }, []);

  const handleBulkCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${BULK_ORDER_PHONE}`;
    }
  };

  const handleGoToContact = () => {
    closeBulkPopup();
    router.push("/contact");
  };

  // Reset "View All" expansion whenever filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, sort]);

  const showCartBar = (product: CartBarProduct) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (unmountTimer.current) clearTimeout(unmountTimer.current);

    setCartBarProduct(product);
    setCartBarMounted(true);
    setCartBarProgress(false);

    requestAnimationFrame(() => {
      setCartBarVisible(true);
      requestAnimationFrame(() => setCartBarProgress(true));
    });

    hideTimer.current = setTimeout(() => {
      setCartBarVisible(false);
      unmountTimer.current = setTimeout(() => setCartBarMounted(false), 400);
    }, CART_BAR_DURATION);
  };

  const dismissCartBar = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
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
          background: "linear-gradient(180deg,#f5f8fd 0%,#eef3fb 100%)",
          minHeight: "100vh",
          pt: 4,
          pb: cartBarMounted ? 14 : 8,
          transition: "padding-bottom 0.3s",
        }}
      >
        <Container maxWidth="xl">
          {/* HERO */}
          <Box sx={{ textAlign: "center", maxWidth: "700px", mx: "auto", mb: 4 }}>
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
                color: "#102048",
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
                  border: "1px solid rgba(16,32,72,.07)",
                  boxShadow: "0 12px 36px rgba(16,32,72,.06)",
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
                          <SortRoundedIcon sx={{ fontSize: 16, color: "#102048" }} />
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
                  <TuneRoundedIcon sx={{ fontSize: 16, color: "#102048" }} />
                  <Typography sx={{ fontSize: "12px", fontWeight: 800, color: "#102048", letterSpacing: "0.4px" }}>
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
                            background: "#102048",
                            "&:hover": { background: "#0d1a3a" },
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
              </Box>
            </Grid>

            {/* ── RIGHT CONTENT ── */}
            <Grid size={{ xs: 12, md: 9 }}>
              {!loading && (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, px: 0.5 }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#667085" }}>
                    Showing {visibleProducts.length} of {filteredProducts.length} products
                  </Typography>
                  <Chip
                    label={`${filteredProducts.length} Total`}
                    sx={{
                      borderRadius: "50px",
                      fontWeight: 800,
                      fontSize: "11px",
                      background: "#102048",
                      color: "#fff",
                    }}
                  />
                </Box>
              )}

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                  <CircularProgress sx={{ color: "#102048" }} />
                </Box>
              ) : filteredProducts.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <Typography sx={{ fontSize: "40px", mb: 1.5 }}>🔍</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: "20px", color: "#102048", mb: 1 }}>
                    No Products Found
                  </Typography>
                  <Typography sx={{ color: "#98A2B3", fontSize: "13px" }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={1.75}>
                    {visibleProducts.map((product: any) => {
                      const discount =
                        product.price > product.salePrice
                          ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                          : 0;

                      return (
                        <Grid key={product.id} size={{ xs: 6, sm: 4, md: 4, lg: 3 }}>
                          <Card
                            sx={{
                              height: "100%",
                              borderRadius: "14px",
                              overflow: "hidden",
                              background: "#fff",
                              border: "1px solid rgba(16,32,72,.06)",
                              boxShadow: "0 3px 14px rgba(0,0,0,.04)",
                              transition: "all .25s ease",
                              display: "flex",
                              flexDirection: "column",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 14px 32px rgba(16,32,72,.1)",
                              },
                            }}
                          >
                            {/* Image */}
                            <Box
                              sx={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                              onClick={() => router.push(`/products/${product.id}`)}
                            >
                              <CardMedia
                                component="img"
                                height="140"
                                image={proxyImage(product.image || "")}
                                alt={product.name}
                                sx={{
                                  objectFit: "cover",
                                  transition: "transform .35s ease",
                                  "&:hover": { transform: "scale(1.05)" },
                                }}
                              />

                              {discount > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    background: "#8BC53F",
                                    px: 1,
                                    py: 0.3,
                                    borderRadius: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.4,
                                    color: "#fff",
                                    fontWeight: 800,
                                    fontSize: "10px",
                                    boxShadow: "0 3px 10px rgba(139,197,63,0.4)",
                                  }}
                                >
                                  <LocalOfferRoundedIcon sx={{ fontSize: 10 }} />
                                  {discount}%
                                </Box>
                              )}

                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  background: "rgba(255,255,255,0.9)",
                                  backdropFilter: "blur(8px)",
                                  px: 0.8,
                                  py: 0.3,
                                  borderRadius: "8px",
                                  fontSize: "9px",
                                  fontWeight: 800,
                                  color: product.stock > 0 ? "#16a34a" : "#ef4444",
                                }}
                              >
                                {product.stock > 0 ? "IN STOCK" : "OUT"}
                              </Box>
                            </Box>

                            <CardContent sx={{ p: 1.5, flex: 1, display: "flex", flexDirection: "column" }}>
                              <Typography
                                sx={{
                                  fontSize: "10px",
                                  color: "#8BC53F",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.6px",
                                  mb: 0.3,
                                }}
                              >
                                {product.brand}
                              </Typography>

                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "13px",
                                  color: "#102048",
                                  mb: 0.5,
                                  lineHeight: 1.25,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {product.name}
                              </Typography>

                              {/* Rating summary */}
                              <Box sx={{ mb: 0.9 }}>
                                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={13} />
                              </Box>

                              <Box sx={{ mt: "auto" }}>
                                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.7, mb: 1 }}>
                                  <Typography sx={{ fontSize: "16px", fontWeight: 900, color: "#102048", lineHeight: 1 }}>
                                    ₹{product.salePrice?.toLocaleString("en-IN")}
                                  </Typography>
                                  {product.price > product.salePrice && (
                                    <Typography sx={{ fontSize: "11px", textDecoration: "line-through", color: "#98A2B3" }}>
                                      ₹{product.price?.toLocaleString("en-IN")}
                                    </Typography>
                                  )}
                                </Box>

                                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.7 }}>
                                  <Button
                                    variant="outlined"
                                    onClick={() => router.push(`/products/${product.id}`)}
                                    sx={{
                                      minWidth: 0,
                                      height: 34,
                                      borderRadius: "9px",
                                      fontWeight: 700,
                                      textTransform: "none",
                                      fontSize: "11px",
                                      borderColor: "rgba(16,32,72,.2)",
                                      color: "#102048",
                                      "&:hover": { borderColor: "#102048", background: "rgba(16,32,72,.04)" },
                                    }}
                                  >
                                    <VisibilityRoundedIcon sx={{ fontSize: 14, mr: 0.4 }} />
                                    View
                                  </Button>

                                  <Button
                                    variant="contained"
                                    disabled={product.stock === 0}
                                    onClick={() => handleAddToCart(product)}
                                    sx={{
                                      minWidth: 0,
                                      height: 34,
                                      borderRadius: "9px",
                                      background: "linear-gradient(135deg,#102048,#1e3a6e)",
                                      fontWeight: 700,
                                      textTransform: "none",
                                      fontSize: "11px",
                                      boxShadow: "0 3px 10px rgba(16,32,72,.25)",
                                      "&:hover": { background: "linear-gradient(135deg,#0d1a3a,#152e5a)" },
                                      "&:disabled": { background: "#e5e8ef", color: "#98A2B3", boxShadow: "none" },
                                    }}
                                  >
                                    <ShoppingCartRoundedIcon sx={{ fontSize: 14, mr: 0.4 }} />
                                    Add
                                  </Button>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* ── VIEW ALL ── */}
                  {hasMore && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                      <Button
                        onClick={() => setVisibleCount(filteredProducts.length)}
                        endIcon={<ExpandMoreRoundedIcon />}
                        sx={{
                          height: 46,
                          px: 3.5,
                          borderRadius: "12px",
                          fontWeight: 800,
                          fontSize: "13px",
                          textTransform: "none",
                          background: "#fff",
                          color: "#102048",
                          border: "1.5px solid #102048",
                          "&:hover": { background: "#102048", color: "#fff" },
                        }}
                      >
                        View All ({filteredProducts.length - visibleCount} more)
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          COMPACT PREMIUM "BULK ORDER / IT PRODUCTS" FLOATING POPUP
          - No dark backdrop: page underneath stays fully visible & usable
          - First shows 5s after load, then repeats every 25s
          - Small, tight, professional card — scrollable body if needed
      ══════════════════════════════════════════════════════════════ */}
      {bulkMounted && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 2500,
            right: { xs: "50%", sm: 20 },
            bottom: { xs: 16, sm: 20 },
            transform: {
              xs: `translateX(50%) translateY(${bulkVisible ? "0" : "16px"})`,
              sm: `translateY(${bulkVisible ? "0" : "16px"})`,
            },
            opacity: bulkVisible ? 1 : 0,
            transition: "opacity .3s ease, transform .3s cubic-bezier(.16,1,.3,1)",
            pointerEvents: bulkVisible ? "auto" : "none",
            width: { xs: "88vw", sm: 300 },
            maxWidth: 300,
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 18px 44px rgba(4,10,30,0.24), 0 3px 10px rgba(4,10,30,0.08)",
              border: "1px solid rgba(16,32,72,0.07)",
            }}
          >
            {/* Compact header — single row, icon + title + close */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #0c1938 0%, #102048 55%, #16305f 100%)",
                px: 1.8,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.1,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 15% 15%, rgba(139,197,63,0.16) 0%, transparent 45%)",
                }}
              />
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "rgba(139,197,63,0.18)",
                  border: "1px solid rgba(139,197,63,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Inventory2RoundedIcon sx={{ fontSize: 17, color: "#8BC53F" }} />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1, position: "relative" }}>
                <Typography
                  sx={{
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.9px",
                    textTransform: "uppercase",
                    color: "#8BC53F",
                    lineHeight: 1.2,
                  }}
                >
                  Bulk &amp; IT Orders
                </Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 800, color: "#fff", lineHeight: 1.25, mt: "1px" }}>
                  Special Pricing Available
                </Typography>
              </Box>

              <IconButton
                onClick={closeBulkPopup}
                aria-label="Close"
                size="small"
                sx={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.85)",
                  position: "relative",
                  "&:hover": { background: "rgba(255,255,255,0.22)", color: "#fff" },
                }}
              >
                <CloseRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>

            {/* Compact scrollable body */}
            <Box
              sx={{
                px: 1.8,
                py: 1.6,
                maxHeight: { xs: "38vh", sm: 150 },
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: 5 },
                "&::-webkit-scrollbar-thumb": { background: "#dfe3ea", borderRadius: 10 },
              }}
            >
              <Typography sx={{ fontSize: "11.5px", color: "#5b6478", lineHeight: 1.6, mb: 1.2 }}>
                Switches, CCTV, access control, video conferencing &amp; more — priced specially for bulk &amp; corporate orders.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 0.9,
                  alignItems: "flex-start",
                  background: "#f5f8fd",
                  border: "1px solid rgba(16,32,72,0.08)",
                  borderRadius: "10px",
                  px: 1.3,
                  py: 1,
                }}
              >
                <ChatRoundedIcon sx={{ fontSize: 15, color: "#102048", mt: 0.1, flexShrink: 0 }} />
                <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#102048", lineHeight: 1.5 }}>
                  Text us for any IT products or bulk order.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(16,32,72,0.07)" }} />

            {/* Compact CTA row: Contact Us + small call icon */}
            <Box sx={{ px: 1.8, py: 1.5, display: "flex", alignItems: "center", gap: 0.9 }}>
              <Button
                fullWidth
                onClick={handleGoToContact}
                startIcon={<SupportAgentRoundedIcon sx={{ fontSize: 15 }} />}
                sx={{
                  height: 38,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #102048, #1e3a6e)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "12px",
                  textTransform: "none",
                  boxShadow: "0 6px 16px rgba(16,32,72,0.25)",
                  "&:hover": { background: "linear-gradient(135deg, #0d1a3a, #152e5a)" },
                }}
              >
                Contact Us
              </Button>

              <Tooltip title={`Call ${BULK_ORDER_PHONE}`} arrow>
                <IconButton
                  onClick={handleBulkCall}
                  aria-label="Call us"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #8BC53F, #6fa62f)",
                    color: "#fff",
                    boxShadow: "0 6px 16px rgba(139,197,63,0.3)",
                    "&:hover": { background: "linear-gradient(135deg, #7ab332, #5f9328)" },
                  }}
                >
                  <CallRoundedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}

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
          <Box sx={{ height: "3px", background: "rgba(16,32,72,0.15)", overflow: "hidden" }}>
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
              background: "linear-gradient(135deg, #0c1938 0%, #102048 55%, #16305f 100%)",
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
                        border: "2px solid #102048",
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
                      color: "#102048",
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