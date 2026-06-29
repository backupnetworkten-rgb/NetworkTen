"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { updateUserProfile } from "@/services/userService";
import { UserData } from "@/types/user";
import PanelHeader from "./PanelHeader";

const MAX_MB = 5;

export default function ProfileSection({ user }: { user: UserData | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    severity: "success" | "error";
  } | null>(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      photoURL: user?.photoURL || "",
    });
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (!file.type.startsWith("image/")) {
      setToast({ msg: "Please choose a JPG or PNG image.", severity: "error" });
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setToast({ msg: `Image must be under ${MAX_MB} MB.`, severity: "error" });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const uid = user?.uid ?? `anon_${Date.now()}`;
      const storageRef = ref(storage, `profiles/${uid}/${Date.now()}_${file.name}`);
      const task = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => {
            setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
          },
          reject,
          resolve
        );
      });

      const url = await getDownloadURL(storageRef);
      setForm((prev) => ({ ...prev, photoURL: url }));
      await updateUserProfile({ photoURL: url });
      setToast({ msg: "Profile photo updated successfully.", severity: "success" });
    } catch (err) {
      console.error("Upload error:", err);
      setToast({
        msg: "Upload failed. Please check Firebase Storage rules.",
        severity: "error",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const save = async () => {
    if (!form.name.trim()) {
      setToast({ msg: "Full name is required.", severity: "error" });
      return;
    }
    try {
      setSaving(true);
      await updateUserProfile({
        name: form.name,
        phone: form.phone,
        photoURL: form.photoURL,
      });
      setToast({ msg: "Profile updated successfully.", severity: "success" });
    } catch (err: any) {
      setToast({ msg: err.message || "Unable to update profile.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "28px",
        border: "1px solid #E7E9F0",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ── Top header area ── */}
      <Box sx={{ px: { xs: 3, md: 5 }, pt: { xs: 3, md: 4.5 }, pb: 3 }}>
        <PanelHeader
          icon={PersonRoundedIcon}
          eyebrow="Personal Info"
          title="Profile"
          subtitle="Manage your photo and personal details"
        />
      </Box>
      <Divider sx={{ borderColor: "#F0F1F6" }} />
      {/* ── Avatar card ── */}
      <Box sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2.5, md: 3.5 },
            p: { xs: "18px 20px", md: "22px 28px" },
            borderRadius: "20px",
            background: "linear-gradient(135deg, #F4F6FF 0%, #EEF1FB 100%)",
            border: "1px solid #E2E6F3",
          }}
        >
          {/* Avatar with camera overlay */}
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <Avatar
              src={form.photoURL || undefined}
              sx={{
                width: { xs: 72, md: 84 },
                height: { xs: 72, md: 84 },
                fontSize: { xs: 26, md: 30 },
                fontWeight: 800,
                background: "linear-gradient(135deg, #0A1130 0%, #2A52BE 100%)",
                color: "#fff",
                border: "3px solid #fff",
                boxShadow: "0 4px 18px rgba(42,82,190,0.28)",
              }}
            >
              {!form.photoURL && (form.name?.charAt(0)?.toUpperCase() || "U")}
            </Avatar>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Tooltip title="Change photo" placement="bottom">
              <IconButton
                onClick={() => !uploading && fileInputRef.current?.click()}
                disabled={uploading}
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -4,
                  width: 30,
                  height: 30,
                  background: "#fff",
                  border: "1.5px solid #DDE2F0",
                  boxShadow: "0 3px 12px rgba(10,17,48,0.15)",
                  "&:hover": {
                    background: "#EEF1FB",
                    borderColor: "#2A52BE",
                  },
                  "&.Mui-disabled": { opacity: 0.6 },
                }}
              >
                {uploading ? (
                  <CircularProgress size={12} thickness={5} sx={{ color: "#2A52BE" }} />
                ) : (
                  <PhotoCameraRoundedIcon sx={{ fontSize: 14, color: "#1B2B57" }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Info beside avatar */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 15, md: 16.5 },
                color: "#11162B",
                mb: 0.3,
              }}
            >
              {form.name || "Add your name"}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "#8A91A8" }}>
              {uploading
                ? `Uploading ${progress}%…`
                : `JPG or PNG · max ${MAX_MB} MB`}
            </Typography>

            {/* Progress bar while uploading */}
            {uploading && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mt: 1.25,
                  height: 4,
                  borderRadius: 4,
                  background: "rgba(42,82,190,0.15)",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(90deg, #2A52BE, #5E8AFF)",
                    borderRadius: 4,
                  },
                }}
              />
            )}

            {!uploading && (
              <Button
                size="small"
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  mt: 1.25,
                  px: 2,
                  py: 0.5,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "8px",
                  color: "#2A52BE",
                  background: "rgba(42,82,190,0.1)",
                  "&:hover": { background: "rgba(42,82,190,0.18)" },
                }}
              >
                Upload new photo
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "#F0F1F6", mx: { xs: 3, md: 5 } }} />
      {/* ── Form fields ── */}
      <Box
        sx={{
          px: { xs: 3, md: 5 },
          pt: 4,
          pb: { xs: 4, md: 5 },
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#8A91A8",
            textTransform: "uppercase",
            mb: 3,
          }}
        >
          Personal details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3
          }}>
          {/* Full name */}
          <TextField
            fullWidth
            label="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1.25, display: "flex", alignItems: "center" }}>
                    <BadgeRoundedIcon sx={{ fontSize: 18, color: "#8A91A8" }} />
                  </Box>
                ),
              }
            }}
          />

          {/* Email — disabled */}
          <TextField
            fullWidth
            disabled
            label="Email address"
            value={form.email}
            helperText="Email is linked to your sign-in and cannot be changed here."
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1.25, display: "flex", alignItems: "center" }}>
                    <EmailRoundedIcon sx={{ fontSize: 18, color: "#C0C5D6" }} />
                  </Box>
                ),
              }
            }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1.25, display: "flex", alignItems: "center" }}>
                    <PhoneRoundedIcon sx={{ fontSize: 18, color: "#8A91A8" }} />
                  </Box>
                ),
              }
            }}
          />

          {/* Save button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              pt: 1,
            }}
          >
            <Button
              variant="contained"
              disabled={saving}
              onClick={save}
              startIcon={
                saving ? (
                  <CircularProgress size={17} color="inherit" />
                ) : (
                  <SaveRoundedIcon />
                )
              }
              sx={{
                height: "52px",
                px: 5,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14.5,
                background: "linear-gradient(135deg, #0A1130, #1B2B57)",
                boxShadow: "0 6px 22px rgba(10,17,48,0.2)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0A1130, #26397A)",
                  boxShadow: "0 8px 28px rgba(10,17,48,0.28)",
                },
                "&.Mui-disabled": { opacity: 0.6 },
              }}
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Toast */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast?.severity}
          onClose={() => setToast(null)}
          sx={{ borderRadius: "14px", fontWeight: 500 }}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#FAFBFD",
    fontSize: 14.5,
    "& fieldset": { borderColor: "#E4E6EF" },
    "&:hover fieldset": { borderColor: "#A0AECF" },
    "&.Mui-focused fieldset": { borderColor: "#2A52BE", borderWidth: "1.5px" },
    "&.Mui-disabled": {
      background: "#F5F6FA",
      "& fieldset": { borderColor: "#ECEEF5" },
    },
  },
  "& .MuiInputLabel-root": { fontSize: 14, color: "#8A91A8" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#2A52BE" },
  "& .MuiFormHelperText-root": { fontSize: 12, mt: 0.75, color: "#A0A8BE" },
};