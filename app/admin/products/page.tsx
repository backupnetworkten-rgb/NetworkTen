"use client";

import { useState } from "react";
import {
  Box, Grid, Paper, Typography, TextField, Button,
  MenuItem, Chip, Divider, Avatar, CircularProgress,
  Fade, IconButton,
} from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AdminLayout from "@/components/admin/AdminLayout";
import { addProduct } from "@/services/productService";
import { proxyImage } from "@/lib/proxyImage";

const CATEGORIES = [
  "Network Product", "CCTV Camera", "Video Conferencing Device",
  "Access Control", "Solar Camera", "Mini Desktop",
  "All in One Desktop", "Display Monitor (Touch / Non Touch)",
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px", background: "#f8fafc", fontSize: "14px", fontWeight: 500, transition: "all 0.2s",
    "&:hover": { background: "#f0f4ff" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#102048" },
    "&.Mui-focused": { background: "#fff" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#102048", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { fontSize: "14px" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#102048", fontWeight: 600 },
};

const cardSx = {
  p: 3, borderRadius: "20px", border: "1px solid #e8edf5",
  background: "#fff", boxShadow: "0 2px 12px rgba(16,32,72,0.04)", mb: 3,
};

const SectionHeader = ({ icon, title, sub, color = "linear-gradient(135deg,#102048,#1a3060)" }: any) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
    <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px", lineHeight: 1 }}>{title}</Typography>
      <Typography sx={{ fontSize: "12px", color: "#98A2B3", mt: 0.3 }}>{sub}</Typography>
    </Box>
  </Box>
);

interface ImageEntry { url: string; loaded: boolean; error: boolean; input: string; }
interface SpecEntry { key: string; value: string; }

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "", description: "", price: "", salePrice: "",
    category: "Network Product", brand: "", stock: "",
  });

  // Multiple images
  const [images, setImages] = useState<ImageEntry[]>([
    { url: "", loaded: false, error: false, input: "" },
  ]);

  // Specifications
  const [specs, setSpecs] = useState<SpecEntry[]>([
    { key: "", value: "" },
  ]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ── IMAGE HANDLERS ──
  const addImageRow = () =>
    setImages((prev) => [...prev, { url: "", loaded: false, error: false, input: "" }]);

  const removeImageRow = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleImageInput = (i: number, val: string) =>
    setImages((prev) => prev.map((img, idx) => idx === i ? { ...img, input: val } : img));

  const commitImageUrl = (i: number) => {
    const url = images[i].input.trim();
    if (!url) return;
    setImages((prev) =>
      prev.map((img, idx) =>
        idx === i ? { ...img, url, loaded: false, error: false } : img
      )
    );
  };

  const handleImageKeyDown = (i: number, e: any) => {
    if (e.key === "Enter") commitImageUrl(i);
  };

  const setImageState = (i: number, loaded: boolean, error: boolean) =>
    setImages((prev) =>
      prev.map((img, idx) => idx === i ? { ...img, loaded, error } : img)
    );

  // ── SPEC HANDLERS ──
  const addSpecRow = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);

  const removeSpecRow = (i: number) => setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  const handleSpecChange = (i: number, field: "key" | "value", val: string) =>
    setSpecs((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const discount =
    product.price && product.salePrice && Number(product.price) > Number(product.salePrice)
      ? Math.round(((Number(product.price) - Number(product.salePrice)) / Number(product.price)) * 100)
      : 0;

  const primaryImage = images[0];

  const handleSubmit = async () => {
    if (!product.name.trim()) { alert("Please enter a Product Name"); return; }
    if (!images[0].url.trim()) { alert("Please enter at least one Product Image URL"); return; }

    const validImages = images.filter((img) => img.url.trim()).map((img) => img.url.trim());
    const validSpecs = specs.filter((s) => s.key.trim() && s.value.trim());

    try {
      setLoading(true);
      await addProduct({
        ...product,
        price: Number(product.price || 0),
        salePrice: Number(product.salePrice || 0),
        stock: Number(product.stock || 0),
        image: validImages[0],
        images: validImages,
        specifications: validSpecs,
        featured: true,
        status: "active",
        createdAt: Date.now(),
      });
      alert("Product Added Successfully");
      setProduct({ name: "", description: "", price: "", salePrice: "", category: "Network Product", brand: "", stock: "" });
      setImages([{ url: "", loaded: false, error: false, input: "" }]);
      setSpecs([{ key: "", value: "" }]);
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Products">
      {/* ── HEADER ── */}
      <Box sx={{
        p: "22px 28px", mb: 3, borderRadius: "20px",
        background: "linear-gradient(135deg, #0d1b3e 0%, #102048 60%, #1a3060 100%)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 8px 32px rgba(16,32,72,0.25)", position: "relative", overflow: "hidden",
        "&::after": { content: '""', position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(139,197,63,0.08)", pointerEvents: "none" },
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, zIndex: 1 }}>
          <Avatar sx={{ background: "rgba(139,197,63,0.2)", border: "1px solid rgba(139,197,63,0.3)", width: 52, height: 52 }}>
            <InventoryRoundedIcon sx={{ color: "#8BC53F" }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "22px", fontWeight: 900, lineHeight: 1.2 }}>Product Management</Typography>
            <Typography sx={{ fontSize: "13px", opacity: 0.6, mt: 0.3 }}>Add and manage products for your store</Typography>
          </Box>
        </Box>
        <Box sx={{ zIndex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", px: 2.5, py: 1.2, textAlign: "center", display: { xs: "none", md: "block" } }}>
          <Typography sx={{ fontSize: "11px", opacity: 0.6, fontWeight: 600, letterSpacing: 1 }}>STATUS</Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: 800, color: "#8BC53F" }}>● Active Store</Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {/* ── LEFT COLUMN ── */}
        <Grid
          size={{
            xs: 12,
            lg: 8
          }}>

          {/* Basic Info */}
          <Paper elevation={0} sx={cardSx}>
            <SectionHeader
              icon={<InventoryRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />}
              title="Basic Information"
              sub="Fill in the core product details"
            />
            <Grid container spacing={2.5}>
              <Grid size={12}>
                <TextField fullWidth label="Product Name *" name="name" value={product.name} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <TextField fullWidth label="Brand" name="brand" value={product.brand} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <TextField select fullWidth label="Category" name="category" value={product.category} onChange={handleChange} sx={inputSx}>
                  {CATEGORIES.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}>
                <TextField fullWidth label="Original Price (₹)" name="price" type="number" value={product.price} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}>
                <TextField fullWidth label="Sale Price (₹)" name="salePrice" type="number" value={product.salePrice} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}>
                <TextField fullWidth label="Stock Quantity" name="stock" type="number" value={product.stock} onChange={handleChange} sx={inputSx} />
              </Grid>
              {discount > 0 && (
                <Grid size={12}>
                  <Fade in>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", px: 2, py: 0.8 }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "#16a34a" }} />
                      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>
                        {discount}% discount — customers save ₹{Number(product.price) - Number(product.salePrice)}
                      </Typography>
                    </Box>
                  </Fade>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* ── MULTIPLE IMAGES ── */}
          <Paper elevation={0} sx={cardSx}>
            <SectionHeader
              icon={<AddPhotoAlternateRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />}
              title="Product Images"
              sub="Add multiple image URLs — first image is the main display image"
              color="linear-gradient(135deg,#8BC53F,#6da832)"
            />

            {images.map((img, i) => (
              <Box key={i} sx={{ mb: 3, pb: 3, borderBottom: i < images.length - 1 ? "1px solid #f0f4fa" : "none" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Box sx={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: i === 0 ? "#102048" : "#e8edf5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Typography sx={{ fontSize: "11px", fontWeight: 800, color: i === 0 ? "#fff" : "#98A2B3" }}>
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#102048" }}>
                    {i === 0 ? "Main Image *" : `Additional Image ${i + 1}`}
                  </Typography>
                  {i > 0 && (
                    <IconButton size="small" onClick={() => removeImageRow(i)} sx={{ ml: "auto", color: "#ef4444" }}>
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <TextField
                  fullWidth
                  label={i === 0 ? "Main Image URL *" : `Image ${i + 1} URL`}
                  value={img.input}
                  onChange={(e) => handleImageInput(i, e.target.value)}
                  onBlur={() => commitImageUrl(i)}
                  onKeyDown={(e) => handleImageKeyDown(i, e)}
                  placeholder="https://example.com/image.jpg"
                  helperText="Press Enter or click outside to preview"
                  sx={inputSx}
                />

                {/* Preview */}
                <Box sx={{ mt: 1.5 }}>
                  {!img.url && (
                    <Box sx={{
                      height: 140, borderRadius: "14px", border: "2px dashed #e2e8f0",
                      background: "#f8fafc", display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 0.8,
                    }}>
                      <AddPhotoAlternateRoundedIcon sx={{ fontSize: 32, color: "#c8d3e8" }} />
                      <Typography sx={{ fontSize: "12px", color: "#b0bcd4", fontWeight: 600 }}>
                        Paste URL above and press Enter
                      </Typography>
                    </Box>
                  )}

                  {img.url && (
                    <Box sx={{ position: "relative" }}>
                      {!img.loaded && !img.error && (
                        <Box sx={{
                          height: 140, borderRadius: "14px",
                          background: "linear-gradient(90deg,#f0f4fa 25%,#e2e8f0 50%,#f0f4fa 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          "@keyframes shimmer": { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <CircularProgress size={24} sx={{ color: "#102048", opacity: 0.3 }} />
                        </Box>
                      )}

                      {img.error && (
                        <Fade in>
                          <Box sx={{
                            height: 140, borderRadius: "14px", background: "#fff5f5",
                            border: "2px solid #fecaca", display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 0.8,
                          }}>
                            <BrokenImageRoundedIcon sx={{ fontSize: 32, color: "#f87171" }} />
                            <Typography sx={{ fontSize: "12px", color: "#ef4444", fontWeight: 700 }}>
                              Could not load image
                            </Typography>
                          </Box>
                        </Fade>
                      )}

                      <img
                        key={img.url}
                        src={proxyImage(img.url)}
                        alt={`Product image ${i + 1}`}
                        onLoad={() => setImageState(i, true, false)}
                        onError={() => setImageState(i, false, true)}
                        style={{
                          display: img.loaded ? "block" : "none",
                          width: "100%", height: "140px",
                          objectFit: "cover", borderRadius: "14px",
                          border: "1px solid #e8edf5",
                        }}
                      />

                      {img.loaded && (
                        <Fade in>
                          <Box sx={{
                            position: "absolute", bottom: 8, right: 8,
                            background: "rgba(22,163,74,0.9)", backdropFilter: "blur(8px)",
                            color: "#fff", borderRadius: "8px", px: 1.2, py: 0.4,
                            fontSize: "10px", fontWeight: 800,
                            display: "flex", alignItems: "center", gap: 0.5,
                          }}>
                            <CheckCircleRoundedIcon sx={{ fontSize: 12 }} />
                            Loaded
                          </Box>
                        </Fade>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}

            <Button
              startIcon={<AddRoundedIcon />}
              onClick={addImageRow}
              sx={{
                borderRadius: "12px", textTransform: "none", fontWeight: 700,
                fontSize: "13px", color: "#102048", border: "1.5px dashed #c8d3e8",
                px: 3, py: 1, "&:hover": { background: "#f0f4fa", borderColor: "#102048" },
              }}
            >
              Add Another Image
            </Button>
          </Paper>

          {/* ── SPECIFICATIONS ── */}
          <Paper elevation={0} sx={cardSx}>
            <SectionHeader
              icon={<TuneRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />}
              title="Specifications"
              sub="Add technical specs like ports, speed, dimensions etc."
              color="linear-gradient(135deg,#6366f1,#4f46e5)"
            />

            {specs.map((spec, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "flex-start" }}>
                <TextField
                  fullWidth
                  label="Spec Name"
                  placeholder="e.g. Ports"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(i, "key", e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                <TextField
                  fullWidth
                  label="Value"
                  placeholder="e.g. 24"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                {i > 0 && (
                  <IconButton
                    onClick={() => removeSpecRow(i)}
                    sx={{ mt: 1, color: "#ef4444", flexShrink: 0 }}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                )}
              </Box>
            ))}

            <Button
              startIcon={<AddRoundedIcon />}
              onClick={addSpecRow}
              sx={{
                borderRadius: "12px", textTransform: "none", fontWeight: 700,
                fontSize: "13px", color: "#6366f1", border: "1.5px dashed #c7d2fe",
                px: 3, py: 1, "&:hover": { background: "#eef2ff", borderColor: "#6366f1" },
              }}
            >
              Add Specification
            </Button>
          </Paper>

          {/* ── DESCRIPTION ── */}
          <Paper elevation={0} sx={{ ...cardSx, mb: 0 }}>
            <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px", mb: 0.5 }}>
              Product Description
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#98A2B3", mb: 2.5 }}>
              Write a detailed description of features and use cases
            </Typography>
            <TextField
              fullWidth multiline rows={6}
              label="Description" name="description"
              value={product.description} onChange={handleChange}
              sx={inputSx}
            />
          </Paper>

        </Grid>

        {/* ── RIGHT COLUMN: PREVIEW ── */}
        <Grid
          size={{
            xs: 12,
            lg: 4
          }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #e8edf5", background: "#fff", boxShadow: "0 2px 12px rgba(16,32,72,0.04)", position: "sticky", top: "90px" }}>

            <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px", mb: 0.5 }}>Live Preview</Typography>
            <Typography sx={{ fontSize: "12px", color: "#98A2B3", mb: 2.5 }}>How your product will look in the store</Typography>

            {/* Mini card */}
            <Box sx={{ borderRadius: "18px", overflow: "hidden", border: "1px solid #e8edf5", boxShadow: "0 8px 32px rgba(16,32,72,0.08)", mb: 3 }}>

              {/* Image area with thumbnails */}
              <Box sx={{ position: "relative", height: 200, background: "linear-gradient(145deg,#f0f4fa,#e8eef8)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {primaryImage.url && !primaryImage.error && primaryImage.loaded ? (
                  <img src={proxyImage(primaryImage.url)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      opacity: 0.4
                    }}>
                    <AddPhotoAlternateRoundedIcon sx={{ fontSize: 40, color: "#94a3b8" }} />
                    <Typography sx={{ fontSize: "11px", color: "#94a3b8", mt: 0.5 }}>
                      {primaryImage.error ? "Invalid URL" : "No image"}
                    </Typography>
                  </Box>
                )}
                {discount > 0 && (
                  <Box sx={{ position: "absolute", top: 10, left: 10, background: "#8BC53F", color: "#fff", fontWeight: 800, fontSize: "11px", px: 1.2, py: 0.4, borderRadius: "20px" }}>
                    {discount}% OFF
                  </Box>
                )}
                <Box sx={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", color: Number(product.stock) > 0 ? "#16a34a" : "#ef4444", fontWeight: 800, fontSize: "10px", px: 1, py: 0.3, borderRadius: "8px" }}>
                  {Number(product.stock) > 0 ? "IN STOCK" : "OUT OF STOCK"}
                </Box>
              </Box>

              {/* Thumbnail strip */}
              {images.filter((img) => img.loaded).length > 1 && (
                <Box sx={{ display: "flex", gap: 1, p: 1.5, background: "#f8fafc", overflowX: "auto" }}>
                  {images.filter((img) => img.loaded).map((img, i) => (
                    <Box key={i} sx={{ width: 48, height: 48, borderRadius: "8px", overflow: "hidden", border: "2px solid", borderColor: i === 0 ? "#102048" : "#e8edf5", flexShrink: 0 }}>
                      <img src={proxyImage(img.url)} alt={`thumb ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                  ))}
                </Box>
              )}

              {/* Card body */}
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: "10px", color: "#8BC53F", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", mb: 0.5 }}>
                  {product.brand || "Brand"}
                </Typography>
                <Typography sx={{ fontWeight: 900, fontSize: "14px", color: "#102048", lineHeight: 1.3, mb: 0.8 }}>
                  {product.name || "Product Name"}
                </Typography>
                <Chip label={product.category} size="small" sx={{ fontSize: "10px", fontWeight: 700, height: 20, background: "#f0f4fa", color: "#102048", borderRadius: "6px", mb: 1.5 }} />
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
                  <Typography sx={{ fontSize: "20px", fontWeight: 900, color: "#102048" }}>
                    ₹{Number(product.salePrice || 0).toLocaleString("en-IN")}
                  </Typography>
                  {product.price && product.salePrice && Number(product.price) > Number(product.salePrice) && (
                    <Typography sx={{ fontSize: "12px", textDecoration: "line-through", color: "#98A2B3" }}>
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                  <Box sx={{ height: 34, borderRadius: "10px", border: "1.5px solid rgba(16,32,72,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#102048" }}>View</Typography>
                  </Box>
                  <Box sx={{ height: 34, borderRadius: "10px", background: "linear-gradient(135deg,#102048,#1a3060)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Add to Cart</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            {/* Specs preview */}
            {specs.some((s) => s.key && s.value) && (
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#102048", mb: 1.5, textTransform: "uppercase", letterSpacing: 1 }}>
                  Specs Preview
                </Typography>
                {specs.filter((s) => s.key && s.value).map((s, i) => (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 0.6, borderBottom: "1px solid #f0f4fa" }}>
                    <Typography sx={{ fontSize: "12px", color: "#667085", fontWeight: 600 }}>{s.key}</Typography>
                    <Typography sx={{ fontSize: "12px", color: "#102048", fontWeight: 700 }}>{s.value}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Completion check */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#102048", mb: 1.5, textTransform: "uppercase", letterSpacing: 1 }}>
                Completion Check
              </Typography>
              {[
                { label: "Product name", done: !!product.name.trim() },
                { label: "Main image", done: !!images[0].url && images[0].loaded },
                { label: "Price set", done: !!product.price },
                { label: "Stock added", done: !!product.stock },
                { label: "Specifications", done: specs.some((s) => s.key && s.value) },
                { label: "Description", done: !!product.description.trim() },
              ].map((item) => (
                <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "#16a34a" : "#e8edf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                    {item.done && <CheckCircleRoundedIcon sx={{ fontSize: 14, color: "#fff" }} />}
                  </Box>
                  <Typography sx={{ fontSize: "13px", color: item.done ? "#102048" : "#98A2B3", fontWeight: item.done ? 600 : 400, transition: "all 0.2s" }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Save button */}
            <Button
              fullWidth variant="contained" disabled={loading} onClick={handleSubmit}
              startIcon={loading ? <CircularProgress size={18} sx={{ color: "rgba(255,255,255,0.7)" }} /> : <CheckCircleRoundedIcon />}
              sx={{
                height: "52px", borderRadius: "14px",
                background: "linear-gradient(135deg,#102048 0%,#1a3060 100%)",
                textTransform: "none", fontWeight: 800, fontSize: "15px",
                boxShadow: "0 8px 24px rgba(16,32,72,0.28)", transition: "all 0.2s",
                "&:hover": { background: "linear-gradient(135deg,#0d1a3a,#152e5a)", boxShadow: "0 12px 32px rgba(16,32,72,0.38)", transform: "translateY(-1px)" },
                "&:active": { transform: "translateY(0)" },
                "&.Mui-disabled": { background: "#c8d3e8", color: "#fff" },
              }}
            >
              {loading ? "Saving Product..." : "Save Product"}
            </Button>

          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}