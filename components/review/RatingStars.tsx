"use client";
import { Box, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

const GREEN = "#0f9d78";

export default function RatingStars({
  rating = 0,
  reviewCount = 0,
  size = 16,
  showCount = true,
  color = GREEN,
}: {
  rating?: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
  color?: string;
}) {
  if (!reviewCount) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
      <Box sx={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((i) =>
          i <= Math.round(rating) ? (
            <StarRoundedIcon key={i} sx={{ fontSize: size, color }} />
          ) : (
            <StarBorderRoundedIcon key={i} sx={{ fontSize: size, color }} />
          )
        )}
      </Box>
      {showCount && (
        <Typography sx={{ fontSize: size * 0.7, color: "#667085", fontWeight: 600 }}>
          {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </Typography>
      )}
    </Box>
  );
}