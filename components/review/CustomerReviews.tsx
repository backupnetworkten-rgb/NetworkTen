"use client";
import { useEffect, useState } from "react";
import {
  Box, Typography, Button, IconButton, Avatar, Menu, MenuItem, CircularProgress,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import { getReviews, Review } from "@/services/reviewService";
import WriteReviewModal from "./WriteReviewModal";

const GREEN = "#0f9d78";
const GREEN_DARK = "#0a6b52";

export default function CustomerReviews({
  productId, productName, productImage, rating = 0, reviewCount = 0, onReviewAdded,
}: {
  productId: string;
  productName: string;
  productImage?: string;
  rating?: number;
  reviewCount?: number;
  onReviewAdded?: () => void;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState<"newest" | "highest" | "lowest">("newest");
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getReviews(productId);
      setReviews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [productId]);

  const handleSubmitted = () => {
    load();
    onReviewAdded?.();
  };

  const visible = reviews
    .filter((r) => (filterStar ? r.rating === filterStar : true))
    .sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    });

  const formatDate = (ts: any) => {
    if (!ts?.seconds) return "";
    return new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <Box sx={{
      borderRadius: "16px", overflow: "hidden",
      border: "1px solid #dcece5",
      boxShadow: "0 2px 16px rgba(6,78,59,0.05)",
      background: "#fff",
    }}>
      {/* ── Compact header ── */}
      <Box sx={{
        background: `linear-gradient(120deg, ${GREEN_DARK} 0%, ${GREEN} 100%)`,
        px: { xs: 2, md: 2.8 }, py: 1.8,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 1.5,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <RateReviewRoundedIcon sx={{ fontSize: 19, color: "#fff" }} />
          <Typography sx={{ fontSize: "15.5px", fontWeight: 800, color: "#fff", letterSpacing: "-0.2px" }}>
            Customer Reviews
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Button
            onClick={() => setModalOpen(true)}
            sx={{
              height: 34, px: 1.8, borderRadius: "8px", textTransform: "none",
              fontWeight: 700, fontSize: "12.5px", background: "#fff", color: GREEN_DARK,
              "&:hover": { background: "#f3fbf8" },
            }}>
            Write a review
          </Button>
          <IconButton onClick={(e) => setFilterAnchor(e.currentTarget)}
            sx={{
              width: 34, height: 34, borderRadius: "8px",
              background: "rgba(255,255,255,0.16)", color: "#fff",
              "&:hover": { background: "rgba(255,255,255,0.26)" },
            }}>
            <FilterAltOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Menu anchorEl={filterAnchor} open={!!filterAnchor} onClose={() => setFilterAnchor(null)}>
            <MenuItem onClick={() => { setFilterStar(null); setFilterAnchor(null); }}>All ratings</MenuItem>
            {[5, 4, 3, 2, 1].map((s) => (
              <MenuItem key={s} onClick={() => { setFilterStar(s); setFilterAnchor(null); }}>
                {s} star
              </MenuItem>
            ))}
          </Menu>
          <IconButton onClick={(e) => setSortAnchor(e.currentTarget)}
            sx={{
              width: 34, height: 34, borderRadius: "8px",
              background: "rgba(255,255,255,0.16)", color: "#fff",
              "&:hover": { background: "rgba(255,255,255,0.26)" },
            }}>
            <SwapVertRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Menu anchorEl={sortAnchor} open={!!sortAnchor} onClose={() => setSortAnchor(null)}>
            <MenuItem onClick={() => { setSort("newest"); setSortAnchor(null); }}>Newest first</MenuItem>
            <MenuItem onClick={() => { setSort("highest"); setSortAnchor(null); }}>Highest rating</MenuItem>
            <MenuItem onClick={() => { setSort("lowest"); setSortAnchor(null); }}>Lowest rating</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* ── Compact stats row ── */}
      <Box sx={{
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 2, md: 3 },
        px: { xs: 2, md: 2.8 }, py: 1.8,
        borderBottom: "1px solid #eef6f3", background: "#fafffc",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>
          <Typography sx={{ fontSize: "28px", fontWeight: 900, color: "#0a0a0a", lineHeight: 1 }}>
            {rating.toFixed(1)}
          </Typography>
          <Box>
            <Box sx={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((i) =>
                i <= Math.round(rating)
                  ? <StarRoundedIcon key={i} sx={{ fontSize: 15, color: GREEN }} />
                  : <StarBorderRoundedIcon key={i} sx={{ fontSize: 15, color: GREEN }} />
              )}
            </Box>
            <Typography sx={{ fontSize: "11px", color: "#667085", fontWeight: 600 }}>
              {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>

        {reviewCount > 0 && (
          <Box sx={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 0.35 }}>
            {distribution.map((d) => (
              <Box key={d.star} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Typography sx={{ fontSize: "10.5px", color: "#98A2B3", width: 30, fontWeight: 600 }}>
                  {d.star}★
                </Typography>
                <Box sx={{ flex: 1, height: 5, borderRadius: "5px", background: "#eef2ee", overflow: "hidden" }}>
                  <Box sx={{ width: `${d.pct}%`, height: "100%", background: GREEN, borderRadius: "5px", transition: "width 0.4s" }} />
                </Box>
                <Typography sx={{ fontSize: "10px", color: "#98A2B3", width: 16, textAlign: "right" }}>
                  {d.count}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* ── Review list / empty state ── */}
      <Box sx={{ px: { xs: 2, md: 2.8 }, py: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={22} sx={{ color: GREEN }} />
          </Box>
        ) : visible.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 3.5 }}>
            <Box sx={{
              width: 46, height: 46, borderRadius: "50%", mx: "auto", mb: 1.2,
              background: "linear-gradient(135deg, #eafbf4, #d7f4e8)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <StarRoundedIcon sx={{ fontSize: 22, color: GREEN }} />
            </Box>
            <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: "#0a0a0a", mb: 0.3 }}>
              No reviews yet
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#98A2B3", mb: 1.8 }}>
              Be the first to share your experience.
            </Typography>
            <Button
              onClick={() => setModalOpen(true)}
              sx={{
                height: 36, px: 2.4, borderRadius: "8px", textTransform: "none",
                fontWeight: 700, fontSize: "12.5px", background: GREEN, color: "#fff",
                "&:hover": { background: "#0c7f63" },
              }}>
              Write a review
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
            {visible.map((r) => (
              <Box key={r.id} sx={{
                border: "1px solid #eef2ee", borderRadius: "12px",
                p: 1.8,
                background: "#fff",
                transition: "box-shadow 0.15s, border-color 0.15s",
                "&:hover": { boxShadow: "0 3px 14px rgba(6,78,59,0.06)", borderColor: "#d7ece3" },
              }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5, mb: 0.6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{
                      width: 30, height: 30, fontSize: "12px", fontWeight: 700,
                      background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`, color: "#fff",
                    }}>
                      {r.name?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "12.5px", color: "#0a0a0a", lineHeight: 1.3 }}>
                        {r.name}
                      </Typography>
                      <Typography sx={{ fontSize: "10.5px", color: "#98A2B3" }}>
                        {formatDate(r.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexShrink: 0 }}>
                    {[1, 2, 3, 4, 5].map((i) =>
                      i <= r.rating
                        ? <StarRoundedIcon key={i} sx={{ fontSize: 14, color: GREEN }} />
                        : <StarBorderRoundedIcon key={i} sx={{ fontSize: 14, color: GREEN }} />
                    )}
                  </Box>
                </Box>
                <Typography sx={{ fontSize: "12.5px", color: "#1a1a1a", lineHeight: 1.65, ml: { xs: 0, sm: "40px" } }}>
                  {r.content}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <WriteReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productId={productId}
        productName={productName}
        productImage={productImage}
        onSubmitted={handleSubmitted}
      />
    </Box>
  );
}