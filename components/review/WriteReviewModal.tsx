"use client";
import { useState } from "react";
import {
  Dialog, DialogContent, Box, Typography, IconButton, TextField, Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { proxyImage } from "@/lib/proxyImage";
import { addReview } from "@/services/reviewService";

const GREEN = "#0f9d78";

export default function WriteReviewModal({
  open, onClose, productId, productName, productImage, onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productImage?: string;
  onSubmitted?: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setStep(1); setRating(0); setHoverRating(0);
    setName(""); setContent(""); setError(""); setSubmitting(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const pickRating = (r: number) => { setRating(r); setStep(2); };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await addReview(productId, { name, rating, content });
      onSubmitted?.();
      handleClose();
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
    >
      <DialogContent sx={{ p: "28px 26px", position: "relative" }}>
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 10, right: 10 }}>
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>

        {step === 1 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", mb: 0.8 }}>
              How would you rate this product?
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#667085", mb: 3 }}>
              We would love it if you would share a bit about your experience.
            </Typography>

            {productImage && (
              <Box sx={{
                width: 140, height: 140, mx: "auto", mb: 3, borderRadius: "10px",
                overflow: "hidden", border: "1px solid #eee", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <img src={proxyImage(productImage)} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
            )}

            <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#1a1a1a", mb: 2 }}>
              {productName}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 0.5 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <IconButton key={i} onClick={() => pickRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  sx={{ p: 0.3 }}>
                  {i <= (hoverRating || rating)
                    ? <StarRoundedIcon sx={{ fontSize: 40, color: GREEN }} />
                    : <StarBorderRoundedIcon sx={{ fontSize: 40, color: GREEN }} />}
                </IconButton>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
              <Typography sx={{ fontSize: "12px", color: "#98A2B3" }}>Poor</Typography>
              <Typography sx={{ fontSize: "12px", color: "#98A2B3" }}>Great</Typography>
            </Box>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => setStep(1)}
              sx={{ textTransform: "none", color: "#667085", fontWeight: 600, mb: 1, pl: 0 }}>
              Back
            </Button>

            <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", mb: 1.5 }}>
              {productName}
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5, mb: 2.5 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                i <= rating
                  ? <StarRoundedIcon key={i} sx={{ fontSize: 26, color: GREEN }} />
                  : <StarBorderRoundedIcon key={i} sx={{ fontSize: 26, color: GREEN }} />
              ))}
            </Box>

            <TextField
              fullWidth
              size="small"
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", mb: 0.8 }}>
              Review content (Required)
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder="Start writing here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 1.5, "& .MuiOutlinedInput-root": { background: "#fafafa" } }}
            />

            {error && (
              <Typography sx={{ fontSize: "12px", color: "#dc2626", mb: 1.5 }}>{error}</Typography>
            )}

            <Typography sx={{ fontSize: "11px", color: "#98A2B3", mb: 2.5, lineHeight: 1.6 }}>
              We'll only contact you about your review if necessary. By submitting your review,
              you agree to our terms and conditions and privacy policy.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                sx={{
                  height: 42, px: 3, borderRadius: "10px", textTransform: "none",
                  fontWeight: 700, fontSize: "13px", background: GREEN, color: "#fff",
                  "&:hover": { background: "#0c7f63" },
                }}>
                {submitting ? "Submitting..." : "Submit review"}
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}