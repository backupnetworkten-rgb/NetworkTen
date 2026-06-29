"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { changePassword } from "@/services/userService";
import PanelHeader from "./PanelHeader";

type ShowState = { current: boolean; next: boolean; confirm: boolean };

export default function SecuritySection() {
  const [show, setShow] = useState<ShowState>({ current: false, next: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const toggle = (field: keyof ShowState) =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  const update = async () => {
    setError("");
    setSuccess(false);

    if (!current) { setError("Enter your current password."); return; }
    if (password.length < 6) { setError("New password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    try {
      setLoading(true);
      await changePassword(current, password);
      setSuccess(true);
      setCurrent("");
      setPassword("");
      setConfirm("");
    } catch (err: any) {
      console.error(err);
      setError(
        err.code === "auth/wrong-password"
          ? "Current password is incorrect."
          : err.message || "Unable to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  const visibilityBtn = (field: keyof ShowState) => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => toggle(field)}
        edge="end"
        sx={{ color: "#8A91A8", "&:hover": { color: "#2A52BE" }, mr: -0.5 }}
      >
        {show[field]
          ? <VisibilityOffRoundedIcon sx={{ fontSize: 19 }} />
          : <VisibilityRoundedIcon sx={{ fontSize: 19 }} />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 3, md: 4 }, borderRadius: "28px", border: "1px solid #E7E9F0", background: "#fff" }}
    >
      <PanelHeader
        icon={ShieldRoundedIcon}
        eyebrow="Security"
        title="Password"
        subtitle="Keep your account secure with a strong password"
      />

      <Divider sx={{ my: 3.5, borderColor: "#F0F1F6" }} />

      {/* Tip strip */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: "14px 18px",
          borderRadius: "14px",
          background: "rgba(42,82,190,0.05)",
          border: "1px solid rgba(42,82,190,0.12)",
          mb: 3,
        }}
      >
        <LockRoundedIcon sx={{ color: "#2A52BE", fontSize: 18, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 13, color: "#3D4A72" }}>
          Use at least 6 characters. A mix of letters, numbers and symbols makes a stronger password.
        </Typography>
      </Box>

      <Collapse in={success}>
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: "12px", fontSize: 13.5 }}>
          Password updated successfully.
        </Alert>
      </Collapse>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: "12px", fontSize: 13.5 }}>
          {error}
        </Alert>
      </Collapse>

      <Box display="grid" gap={2.5} maxWidth={460}>
        {/* Current password */}
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#5B6178", mb: 0.75, ml: 0.5 }}>
            Current password
          </Typography>
          <TextField
            fullWidth
            type={show.current ? "text" : "password"}
            placeholder="Enter current password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ fontSize: 18, color: "#8A91A8" }} />
                </InputAdornment>
              ),
              endAdornment: visibilityBtn("current"),
            }}
            sx={fieldSx}
          />
        </Box>

        <Divider sx={{ borderColor: "#F0F1F6" }} />

        {/* New password */}
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#5B6178", mb: 0.75, ml: 0.5 }}>
            New password
          </Typography>
          <TextField
            fullWidth
            type={show.next ? "text" : "password"}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ endAdornment: visibilityBtn("next") }}
            sx={fieldSx}
          />
        </Box>

        {/* Confirm password */}
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#5B6178", mb: 0.75, ml: 0.5 }}>
            Confirm new password
          </Typography>
          <TextField
            fullWidth
            type={show.confirm ? "text" : "password"}
            placeholder="Re-enter new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            InputProps={{ endAdornment: visibilityBtn("confirm") }}
            sx={fieldSx}
          />
        </Box>

        {/* Strength bar */}
        {password.length > 0 && <StrengthBar password={password} />}

        <Button
          variant="contained"
          disabled={loading}
          onClick={update}
          startIcon={
            loading
              ? <CircularProgress size={17} color="inherit" />
              : <ShieldRoundedIcon />
          }
          sx={{
            mt: 0.5,
            height: "50px",
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 14.5,
            background: "linear-gradient(135deg,#0A1130,#1B2B57)",
            boxShadow: "0 6px 20px rgba(10,17,48,0.18)",
            "&:hover": {
              background: "linear-gradient(135deg,#0A1130,#26397A)",
              boxShadow: "0 8px 24px rgba(10,17,48,0.26)",
            },
            "&.Mui-disabled": { opacity: 0.65 },
          }}
        >
          {loading ? "Updating…" : "Change password"}
        </Button>
      </Box>
    </Paper>
  );
}

function StrengthBar({ password }: { password: string }) {
  const score = getStrength(password);
  const labels = ["Too short", "Weak", "Fair", "Strong", "Very strong"];
  const colors = ["#E74C3C", "#E67E22", "#F1C40F", "#27AE60", "#1B8A4C"];

  return (
    <Box>
      <Box display="flex" gap={0.5} mb={0.75}>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 4,
              borderRadius: 4,
              background: i < score ? colors[score] : "#E7E9F0",
              transition: "background 0.3s",
            }}
          />
        ))}
      </Box>
      <Typography sx={{ fontSize: 12, color: colors[score], fontWeight: 600 }}>
        {labels[score]}
      </Typography>
    </Box>
  );
}

function getStrength(pw: string): number {
  if (pw.length < 6) return 0;
  let score = 1;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#FAFBFD",
    fontSize: 14.5,
    "& fieldset": { borderColor: "#E4E6EF" },
    "&:hover fieldset": { borderColor: "#2A52BE" },
    "&.Mui-focused fieldset": { borderColor: "#2A52BE" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#2A52BE" },
};