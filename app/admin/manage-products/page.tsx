"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProducts, deleteProduct } from "@/services/productService";
import { proxyImage } from "@/lib/proxyImage";

export default function ManageProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteId, setDeleteId] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
      alert("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.category))];
  }, [products]);

  const filtered = products.filter((item) => {
    const searchMatch = (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch = category === "All" || item.category === category;
    return searchMatch && categoryMatch;
  });

  const totalProducts = products.length;
  const totalCategories = categories.length - 1;
  const activeProducts = products.filter((item) => item.stock > 0).length;

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setDeleteId("");
      loadProducts();
    } catch (error) {
      alert("Unable to delete");
    }
  };

  return (
    <AdminLayout title="Manage Products">
      {/* ── STATS ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: "Total Products", value: totalProducts, icon: <Inventory2RoundedIcon /> },
          { title: "Categories", value: totalCategories, icon: <CategoryRoundedIcon /> },
          { title: "In Stock", value: activeProducts, icon: <SellRoundedIcon /> },
        ].map((item, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              md: 4
            }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "18px",
                background: "linear-gradient(135deg,#08142e,#102048)",
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <Box>
                 <Typography sx={{ opacity: 0.6, fontSize: "12px" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: 900,
                      lineHeight: 1.2
                    }}>
                    {item.value}
                  </Typography>
                </Box>
                <Avatar sx={{ width: 46, height: 46, background: "rgba(255,255,255,.10)" }}>
                  {item.icon}
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* ── FILTERS ── */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: "18px" }}>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 8
            }}>
            <TextField
              fullWidth
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "14px",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }
              }}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <TextField
              select
              fullWidth
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "14px",
                },
              }}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item} sx={{ fontSize: "13px" }}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => router.push("/admin/products")}
              sx={{
                height: "40px",
                background: "#102048",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* ── PRODUCT GRID ── */}
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10
          }}>
          <CircularProgress sx={{ color: "#102048" }} />
        </Box>
      ) : filtered.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10
          }}>
          <Typography sx={{
            fontSize: "40px"
          }}>🔍</Typography>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "18px",
              color: "#102048",
              mt: 1
            }}>
            No Products Found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((item) => {
            const discount =
              item.price > item.salePrice
                ? Math.round(((item.price - item.salePrice) / item.price) * 100)
                : 0;

            return (
              <Grid
                key={item.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3
                }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e8edf5",
                    transition: ".3s",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 32px rgba(16,32,72,0.10)",
                    },
                  }}
                >
                  {/* ── IMAGE — compact fixed height ── */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 160,
                      background: "#f0f4fa",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={proxyImage(item.image || "")}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Discount badge */}
                    {discount > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          background: "#8BC53F",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "10px",
                          px: 1,
                          py: 0.3,
                          borderRadius: "20px",
                        }}
                      >
                        {discount}% OFF
                      </Box>
                    )}

                    {/* Stock badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(6px)",
                        color: item.stock > 0 ? "#16a34a" : "#ef4444",
                        fontWeight: 800,
                        fontSize: "9px",
                        px: 1,
                        py: 0.3,
                        borderRadius: "8px",
                      }}
                    >
                      {item.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </Box>
                  </Box>

                  {/* ── CARD BODY — compact ── */}
                  <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>

                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        width: "fit-content",
                        fontSize: "9px",
                        fontWeight: 700,
                        height: 20,
                        background: "#f0f4fa",
                        color: "#102048",
                        borderRadius: "6px",
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "13px",
                        color: "#102048",
                        lineHeight: 1.3,
                        mb: 0.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#8BC53F",
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                      {item.brand}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 0.8,
                        mb: 0.5
                      }}>
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "16px",
                          color: "#102048"
                        }}>
                        ₹{Number(item.salePrice).toLocaleString("en-IN")}
                      </Typography>
                      {item.price > item.salePrice && (
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "#98A2B3",
                            textDecoration: "line-through"
                          }}>
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#667085",
                        mb: 1.5
                      }}>
                      Stock: <strong>{item.stock}</strong>
                    </Typography>

                    {/* ── BUTTONS ── */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: "auto"
                      }}>
                      <Button
                        fullWidth
                        size="small"
                        startIcon={<EditRoundedIcon sx={{ fontSize: "14px !important" }} />}
                        variant="outlined"
                        onClick={() => router.push(`/admin/edit-product/${item.id}`)}
                        sx={{
                          height: 34,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "12px",
                          borderColor: "rgba(16,32,72,.2)",
                          color: "#102048",
                          "&:hover": { borderColor: "#102048" },
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        fullWidth
                        size="small"
                        startIcon={<DeleteRoundedIcon sx={{ fontSize: "14px !important" }} />}
                        color="error"
                        variant="contained"
                        onClick={() => setDeleteId(item.id)}
                        sx={{
                          height: 34,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "12px",
                          boxShadow: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
      {/* ── DELETE DIALOG ── */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId("")}
        PaperProps={{ sx: { borderRadius: "18px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#102048" }}>
          Delete Product
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#667085"
            }}>
            Are you sure you want to remove this product permanently?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteId("")}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: "#667085",
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}