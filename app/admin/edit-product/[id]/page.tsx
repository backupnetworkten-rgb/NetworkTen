"use client";

import { useEffect, useState } from "react";
import {
  Box, Grid, Paper, Typography, TextField, Button,
  MenuItem, CircularProgress, IconButton, Fade,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateProduct } from "@/services/productService";
import AdminLayout from "@/components/admin/AdminLayout";
import { proxyImage } from "@/lib/proxyImage";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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

interface ImageEntry { url: string; loaded: boolean; error: boolean; }
interface SpecEntry { key: string; value: string; }

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState<any>({
    name: "", description: "", price: "", salePrice: "",
    category: "", brand: "", stock: "",
  });

  const [images, setImages] = useState<ImageEntry[]>([
    { url: "", loaded: false, error: false },
  ]);

  const [specs, setSpecs] = useState<SpecEntry[]>([
    { key: "", value: "" },
  ]);

  // ── LOAD PRODUCT ──
  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, "products", id as string);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data: any = { id: snap.id, ...snap.data() };
          setProduct({
            id: data.id,
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            salePrice: data.salePrice || "",
            category: data.category || "",
            brand: data.brand || "",
            stock: data.stock || "",
          });

          // Load images array — fall back to single image field
          const existingImages: ImageEntry[] =
            data.images && data.images.length > 0
              ? data.images.map((url: string) => ({ url, loaded: false, error: false }))
              : data.image
              ? [{ url: data.image, loaded: false, error: false }]
              : [{ url: "", loaded: false, error: false }];
          setImages(existingImages);

          // Load specs
          const existingSpecs: SpecEntry[] =
            data.specifications && data.specifications.length > 0
              ? data.specifications
              : [{ key: "", value: "" }];
          setSpecs(existingSpecs);
        }
      } catch (error) {
        console.log(error);
        alert("Unable to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  // ── IMAGE HANDLERS ──
  const addImageRow = () =>
    setImages((prev) => [...prev, { url: "", loaded: false, error: false }]);

  const removeImageRow = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleImageUrlChange = (i: number, val: string) =>
    setImages((prev) =>
      prev.map((img, idx) =>
        idx === i ? { ...img, url: val, loaded: false, error: false } : img
      )
    );

  const setImageState = (i: number, loaded: boolean, error: boolean) =>
    setImages((prev) =>
      prev.map((img, idx) => idx === i ? { ...img, loaded, error } : img)
    );

  // ── SPEC HANDLERS ──
  const addSpecRow = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);

  const removeSpecRow = (i: number) =>
    setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  const handleSpecChange = (i: number, field: "key" | "value", val: string) =>
    setSpecs((prev) =>
      prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s)
    );

  const handleUpdate = async () => {
    if (!product.name.trim()) { alert("Please enter a Product Name"); return; }
    if (!images[0].url.trim()) { alert("Please enter at least one image URL"); return; }

    const validImages = images.filter((img) => img.url.trim()).map((img) => img.url.trim());
    const validSpecs = specs.filter((s) => s.key.trim() && s.value.trim());

    try {
      setSaving(true);
      await updateProduct(product.id, {
        ...product,
        price: Number(product.price),
        salePrice: Number(product.salePrice),
        stock: Number(product.stock),
        image: validImages[0],
        images: validImages,
        specifications: validSpecs,
      });
      alert("Product Updated Successfully");
      router.push("/admin/manage-products");
    } catch (error) {
      console.log(error);
      alert("Unable to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress sx={{ color: "#102048" }} />
        </Box>
      </AdminLayout>
    );
  }

  const discount =
    Number(product.price) > Number(product.salePrice)
      ? Math.round(((Number(product.price) - Number(product.salePrice)) / Number(product.price)) * 100)
      : 0;

  return (
    <AdminLayout title="Edit Product">

      {/* ── HEADER ── */}
      <Box sx={{
        p: "22px 28px", mb: 3, borderRadius: "20px",
        background: "linear-gradient(135deg,#0d1b3e,#102048,#1a3060)",
        color: "#fff", display: "flex", alignItems: "center",
        justifyContent: "space-between", boxShadow: "0 8px 32px rgba(16,32,72,0.25)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => router.push("/admin/manage-products")}
            sx={{ color: "rgba(255,255,255,0.7)", textTransform: "none", fontWeight: 700, borderRadius: "12px", "&:hover": { background: "rgba(255,255,255,0.08)", color: "#fff" } }}
          >
            Back
          </Button>
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: 900, lineHeight: 1.2 }}>Edit Product</Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.6 }}>{product.name}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <SaveRoundedIcon />}
          disabled={saving}
          onClick={handleUpdate}
          sx={{
            height: 44, borderRadius: "12px", textTransform: "none", fontWeight: 800,
            fontSize: "14px", background: "#8BC53F", color: "#fff",
            boxShadow: "0 4px 16px rgba(139,197,63,0.4)",
            "&:hover": { background: "#7ab535" },
            "&.Mui-disabled": { background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" },
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* ── LEFT COLUMN ── */}
        <Grid item xs={12} lg={8}>

          {/* Basic Info */}
          <Paper elevation={0} sx={cardSx}>
            <SectionHeader
              icon={<Box sx={{ width: 18, height: 18, borderRadius: "4px", background: "#fff" }} />}
              title="Basic Information"
              sub="Edit the core product details"
            />
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField fullWidth label="Product Name *" name="name" value={product.name} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Brand" name="brand" value={product.brand} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Category" name="category" value={product.category} onChange={handleChange} sx={inputSx}>
                  {CATEGORIES.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Original Price (₹)" name="price" type="number" value={product.price} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Sale Price (₹)" name="salePrice" type="number" value={product.salePrice} onChange={handleChange} sx={inputSx} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Stock Quantity" name="stock" type="number" value={product.stock} onChange={handleChange} sx={inputSx} />
              </Grid>
              {discount > 0 && (
                <Grid item xs={12}>
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
              sub="First image is the main display image — add more for the gallery"
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
                  value={img.url}
                  onChange={(e) => handleImageUrlChange(i, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  helperText="Paste a direct image link"
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
                        Paste a URL above to preview
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
                            background: "rgba(22,163,74,0.9)", color: "#fff",
                            borderRadius: "8px", px: 1.2, py: 0.4,
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
              sub="Technical specs like ports, speed, dimensions, weight etc."
              color="linear-gradient(135deg,#6366f1,#4f46e5)"
            />

            {specs.map((spec, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "flex-start" }}>
                <TextField
                  fullWidth label="Spec Name" placeholder="e.g. Ports"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(i, "key", e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                <TextField
                  fullWidth label="Value" placeholder="e.g. 24"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                {i > 0 && (
                  <IconButton onClick={() => removeSpecRow(i)} sx={{ mt: 1, color: "#ef4444", flexShrink: 0 }}>
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
              Detailed description of features and use cases
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
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #e8edf5", background: "#fff", boxShadow: "0 2px 12px rgba(16,32,72,0.04)", position: "sticky", top: "90px" }}>

            <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px", mb: 0.5 }}>Live Preview</Typography>
            <Typography sx={{ fontSize: "12px", color: "#98A2B3", mb: 2.5 }}>How your product will appear</Typography>

            {/* Main image preview */}
            <Box sx={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e8edf5", mb: 2 }}>
              <Box sx={{ height: 200, background: "#f0f4fa", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {images[0].url && !images[0].error && images[0].loaded ? (
                  <img src={proxyImage(images[0].url)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <Box textAlign="center" sx={{ opacity: 0.4 }}>
                    <AddPhotoAlternateRoundedIcon sx={{ fontSize: 40, color: "#94a3b8" }} />
                    <Typography sx={{ fontSize: "11px", color: "#94a3b8", mt: 0.5 }}>
                      {images[0].error ? "Invalid URL" : "No image"}
                    </Typography>
                  </Box>
                )}
                {discount > 0 && (
                  <Box sx={{ position: "absolute", top: 10, left: 10, background: "#8BC53F", color: "#fff", fontWeight: 800, fontSize: "11px", px: 1.2, py: 0.4, borderRadius: "20px" }}>
                    {discount}% OFF
                  </Box>
                )}
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
            </Box>

            {/* Product info preview */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: "10px", color: "#8BC53F", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", mb: 0.3 }}>
                {product.brand || "Brand"}
              </Typography>
              <Typography sx={{ fontWeight: 900, fontSize: "14px", color: "#102048", lineHeight: 1.3, mb: 0.8 }}>
                {product.name || "Product Name"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
                <Typography sx={{ fontSize: "20px", fontWeight: 900, color: "#102048" }}>
                  ₹{Number(product.salePrice || 0).toLocaleString("en-IN")}
                </Typography>
                {discount > 0 && (
                  <Typography sx={{ fontSize: "12px", textDecoration: "line-through", color: "#98A2B3" }}>
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Specs preview */}
            {specs.some((s) => s.key && s.value) && (
              <Box sx={{ mb: 2, background: "#f8fafc", borderRadius: "12px", p: 1.5 }}>
                <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#102048", mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>
                  Specifications
                </Typography>
                {specs.filter((s) => s.key && s.value).map((s, i) => (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 0.5, borderBottom: "1px solid #e8edf5" }}>
                    <Typography sx={{ fontSize: "12px", color: "#667085", fontWeight: 600 }}>{s.key}</Typography>
                    <Typography sx={{ fontSize: "12px", color: "#102048", fontWeight: 700 }}>{s.value}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Save button */}
            <Button
              fullWidth variant="contained" disabled={saving} onClick={handleUpdate}
              startIcon={saving ? <CircularProgress size={18} sx={{ color: "rgba(255,255,255,0.7)" }} /> : <SaveRoundedIcon />}
              sx={{
                height: "52px", borderRadius: "14px",
                background: "linear-gradient(135deg,#102048,#1a3060)",
                textTransform: "none", fontWeight: 800, fontSize: "15px",
                boxShadow: "0 8px 24px rgba(16,32,72,0.28)",
                "&:hover": { background: "linear-gradient(135deg,#0d1a3a,#152e5a)" },
                "&.Mui-disabled": { background: "#c8d3e8", color: "#fff" },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>

          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}