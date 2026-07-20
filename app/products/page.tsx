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
import { getProducts } from "@/services/productService";
import { proxyImage } from "@/lib/proxyImage";
import { addToCart } from "@/lib/cartStore";

import { useRouter } from "next/navigation";

const filterSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#fff",
    fontSize: "14px",
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
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const router = useRouter();

  // ── "Added to cart" premium bottom popup bar ──
  const [cartBarMounted, setCartBarMounted] = useState(false);
  const [cartBarVisible, setCartBarVisible] = useState(false);
  const [cartBarProduct, setCartBarProduct] = useState<CartBarProduct | null>(null);
  const [cartBarProgress, setCartBarProgress] = useState(false); // controls the countdown bar width
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRAF = useRef<number | null>(null);

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

  const showCartBar = (product: CartBarProduct) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (unmountTimer.current) clearTimeout(unmountTimer.current);

    setCartBarProduct(product);
    setCartBarMounted(true);
    setCartBarProgress(false);

    // Next tick: slide in + start the countdown bar animating from 100% -> 0%
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
          pt: 5,
          pb: cartBarMounted ? 16 : 10,
          transition: "padding-bottom 0.3s",
        }}
      >
        <Container maxWidth="xl">

          {/* HERO */}
          <Box sx={{ textAlign: "center", maxWidth: "700px", mx: "auto", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                background: "#eef8de",
                border: "1px solid #c9e89a",
                borderRadius: "50px",
                px: 2,
                py: 0.6,
                mb: 2,
              }}
            >
              <Box
                sx={{ width: 6, height: 6, borderRadius: "50%", background: "#8BC53F" }}
              />
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
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 900,
                color: "#102048",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Products{" "}
              <Box component="span" sx={{ color: "#8BC53F" }}>
              </Box>
            </Typography>

            <Typography sx={{ color: "#667085", fontSize: "15px", lineHeight: 1.8 }}>
              Premium networking, security and enterprise technology for modern businesses.
            </Typography>

            {!loading && (
              <Chip
                label={`${filteredProducts.length} of ${products.length} Products`}
                sx={{
                  mt: 2.5,
                  borderRadius: "50px",
                  fontWeight: 800,
                  fontSize: "12px",
                  background: "#102048",
                  color: "#fff",
                }}
              />
            )}
          </Box>

          {/* FILTERS */}
          <Box
            sx={{
              mb: 5,
              background: "#fff",
              borderRadius: "24px",
              p: 2.5,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
              gap: 2,
              border: "1px solid rgba(16,32,72,.07)",
              boxShadow: "0 16px 48px rgba(16,32,72,.07)",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchRoundedIcon sx={{ mr: 1, color: "#98A2B3" }} />
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "54px",
                  borderRadius: "14px",
                  background: "#fff",
                },
              }}
            />

            <TextField
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={filterSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TuneRoundedIcon sx={{ color: "#102048" }} />
                    </InputAdornment>
                  ),
                }
              }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Network Product">Network Product</MenuItem>
              <MenuItem value="CCTV Camera">CCTV Camera</MenuItem>
              <MenuItem value="Video Conferencing Device">Video Conferencing Device</MenuItem>
              <MenuItem value="Access Control">Access Control</MenuItem>
              <MenuItem value="Solar Camera">Solar Camera</MenuItem>
              <MenuItem value="Mini Desktop">Mini Desktop</MenuItem>
              <MenuItem value="All in One Desktop">All in One Desktop</MenuItem>
              <MenuItem value="Display Monitor (Touch / Non Touch)">Display Monitor (Touch / Non Touch)</MenuItem>
            </TextField>

            <TextField
              select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={filterSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortRoundedIcon sx={{ color: "#102048" }} />
                    </InputAdornment>
                  ),
                }
              }}
            >
              <MenuItem value="latest">Latest First</MenuItem>
              <MenuItem value="low">Price: Low to High</MenuItem>
              <MenuItem value="high">Price: High to Low</MenuItem>
            </TextField>
          </Box>

          {/* CONTENT */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
              <CircularProgress sx={{ color: "#102048" }} />
            </Box>
          ) : filteredProducts.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 12
              }}>
              <Typography sx={{ fontSize: "48px", mb: 2 }}>🔍</Typography>
              <Typography
                sx={{ fontWeight: 900, fontSize: "22px", color: "#102048", mb: 1 }}
              >
                No Products Found
              </Typography>
              <Typography sx={{ color: "#98A2B3", fontSize: "14px" }}>
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {filteredProducts.map((product: any) => {
                const discount =
                  product.price > product.salePrice
                    ? Math.round(
                        ((product.price - product.salePrice) / product.price) * 100
                      )
                    : 0;

                return (
                  <Grid
                    key={product.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "20px",
                        overflow: "hidden",
                        background: "#fff",
                        border: "1px solid rgba(16,32,72,.06)",
                        boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                        transition: "all .3s ease",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 48px rgba(16,32,72,.12)",
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
                          height="210"
                          image={proxyImage(product.image || "")}
                          alt={product.name}
                          sx={{
                            objectFit: "cover",
                            transition: "transform .4s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        />

                        {discount > 0 && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              background: "#8BC53F",
                              px: 1.2,
                              py: 0.5,
                              borderRadius: "30px",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: "11px",
                              boxShadow: "0 4px 12px rgba(139,197,63,0.4)",
                            }}
                          >
                            <LocalOfferRoundedIcon sx={{ fontSize: 12 }} />
                            {discount}% OFF
                          </Box>
                        )}

                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(255,255,255,0.9)",
                            backdropFilter: "blur(8px)",
                            px: 1,
                            py: 0.4,
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: 800,
                            color: product.stock > 0 ? "#16a34a" : "#ef4444",
                          }}
                        >
                          {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                        </Box>
                      </Box>

                      <CardContent
                        sx={{
                          p: 2.5,
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "#8BC53F",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                            mb: 0.5,
                          }}
                        >
                          {product.brand}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: "16px",
                            color: "#102048",
                            mb: 0.5,
                            lineHeight: 1.3,
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Chip
                          label={product.category}
                          size="small"
                          sx={{
                            width: "fit-content",
                            fontSize: "10px",
                            fontWeight: 700,
                            background: "#f0f4fa",
                            color: "#102048",
                            borderRadius: "8px",
                            mb: 2,
                          }}
                        />

                        <Box sx={{ mt: "auto" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "24px",
                                fontWeight: 900,
                                color: "#102048",
                                lineHeight: 1,
                              }}
                            >
                              ₹{product.salePrice?.toLocaleString("en-IN")}
                            </Typography>

                            {product.price > product.salePrice && (
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  textDecoration: "line-through",
                                  color: "#98A2B3",
                                }}
                              >
                                ₹{product.price?.toLocaleString("en-IN")}
                              </Typography>
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 1,
                            }}
                          >
                            <Button
                              variant="outlined"
                              startIcon={<VisibilityRoundedIcon />}
                              onClick={() => router.push(`/products/${product.id}`)}
                              sx={{
                                height: 42,
                                borderRadius: "12px",
                                fontWeight: 700,
                                textTransform: "none",
                                fontSize: "13px",
                                borderColor: "rgba(16,32,72,.2)",
                                color: "#102048",
                                "&:hover": {
                                  borderColor: "#102048",
                                  background: "rgba(16,32,72,.04)",
                                },
                              }}
                            >
                              View
                            </Button>

                            <Button
                              variant="contained"
                              startIcon={<ShoppingCartRoundedIcon />}
                              disabled={product.stock === 0}
                              onClick={() => handleAddToCart(product)}
                              sx={{
                                height: 42,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg,#102048,#1e3a6e)",
                                fontWeight: 700,
                                textTransform: "none",
                                fontSize: "13px",
                                boxShadow: "0 4px 14px rgba(16,32,72,.25)",
                                "&:hover": {
                                  background: "linear-gradient(135deg,#0d1a3a,#152e5a)",
                                },
                                "&:disabled": {
                                  background: "#e5e8ef",
                                  color: "#98A2B3",
                                  boxShadow: "none",
                                },
                              }}
                            >
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
          )}

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
          {/* Countdown progress line */}
          <Box sx={{ height: "3px", background: "rgba(16,32,72,0.15)", overflow: "hidden" }}>
            <Box
              sx={{
                height: "100%",
                background: "linear-gradient(90deg, #8BC53F, #6fa62f)",
                width: cartBarProgress ? "0%" : "100%",
                transition: cartBarProgress
                  ? `width ${CART_BAR_DURATION}ms linear`
                  : "none",
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
                {/* ── Left: thumbnail + confirmation + product info ── */}
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.4, sm: 1.8 }, minWidth: 0, flex: 1 }}>
                  {/* Product thumbnail with success badge */}
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

                  {/* Text block */}
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

                {/* ── Right: actions ── */}
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
                      "&:hover": {
                        background: "#ffffff",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                      },
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