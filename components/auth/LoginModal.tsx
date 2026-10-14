"use client";

import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import GoogleIcon from "@mui/icons-material/Google";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { sendOTP, verifyOTP, loginWithGoogle } from "@/services/authService";
import { saveSession } from "@/services/sessionManager";

const NAVY = "#122340";
const NAVY_SOFT = "#3D4A63";
const EMERALD = "#1F5E45";
const EMERALD_DARK = "#164733";
const LINE = "#E7E2D6";

interface LoginModalProps {
  open: boolean;
  onSuccess: () => void;
  onBack?: () => void;
  backLabel?: string;
}

export default function LoginModal({
  open,
  onSuccess,
  onBack,
  backLabel = "Go back",
}: LoginModalProps) {
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Tell the Navbar (and anything else listening) that the session changed
  const announceLogin = () => {
    try {
      window.dispatchEvent(new Event("nt-auth-changed"));
    } catch {
      /* ignore */
    }
  };

  const handlePhone = async () => {
    setError("");
    try {
      setLoading(true);
      if (!showOtp) {
        if (!phone.trim()) return setError("Please enter your phone number");
        await sendOTP(phone.trim());
        setShowOtp(true);
      } else {
        if (!otp.trim()) return setError("Please enter the OTP");
        const result = await verifyOTP(otp.trim());
        saveSession({
          name: result?.user?.phoneNumber || phone.trim(),
          phone: result?.user?.phoneNumber || phone.trim(),
          loginType: "phone",
        });
        announceLogin();
        onSuccess();
      }
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      setGoogleLoading(true);
      const result = await loginWithGoogle();
      saveSession({
        name: result.user.displayName,
        email: result.user.email,
        loginType: "google",
      });
      announceLogin();
      onSuccess();
    } catch (e: any) {
      setError(e?.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const backToPhone = () => {
    setShowOtp(false);
    setOtp("");
    setError("");
  };

    return (
    <Dialog
      open={open}
      onClose={() => {}} // blocks Esc and outside-click: user must log in or go back
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: { sx: { borderRadius: "18px", p: { xs: 2.5, sm: 3.5 } } },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
        {showOtp && (
          <Box
            onClick={backToPhone}
            sx={{
              width: 32, height: 32, display: "flex", alignItems: "center",
              justifyContent: "center", color: NAVY_SOFT,
              border: `1px solid ${LINE}`, borderRadius: "8px", cursor: "pointer",
              "&:hover": { borderColor: EMERALD, color: EMERALD_DARK },
            }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </Box>
        )}
        <Typography sx={{ color: NAVY, fontWeight: 700, fontSize: "24px", lineHeight: 1.15 }}>
          {showOtp ? "Verify your number" : "Login to continue"}
        </Typography>
      </Box>

      <Typography sx={{ color: NAVY_SOFT, fontSize: "13px", mb: 2.4, lineHeight: 1.6 }}>
        {showOtp
          ? `Enter the 6-digit code sent to ${phone}`
          : "Please log in to view product details, pricing and place orders."}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 1.6, borderRadius: "10px", fontSize: "12.5px" }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "grid", gap: 1.4 }}>
        <TextField
          fullWidth
          size="small"
          label="Phone Number"
          disabled={showOtp}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <Box sx={{ display: "flex", color: NAVY_SOFT, mr: 0.8 }}>
                  <PhoneIphoneRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              ),
            },
          }}
        />

        {showOtp && (
          <TextField
            fullWidth
            size="small"
            label="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ "& .MuiOutlinedInput-input": { letterSpacing: "6px", fontWeight: 700, textAlign: "center" } }}
          />
        )}

        <Button
          variant="contained"
          onClick={handlePhone}
          disabled={loading}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`,
            borderRadius: "50px", py: 1.2, fontWeight: 700, textTransform: "none",
            "&:hover": { background: `linear-gradient(135deg, #266E52, ${EMERALD_DARK})` },
          }}
        >
          {loading ? "Please wait..." : showOtp ? "Verify & Continue" : "Send OTP"}
        </Button>

        {/* reCAPTCHA mounts here (authService looks for this id) */}
        <div id="recaptcha-container" />
      </Box>

      {!showOtp && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, my: 2 }}>
            <Box sx={{ flex: 1, height: "1px", background: LINE }} />
            <Typography sx={{ color: "#B7B2A2", fontSize: "10px", letterSpacing: "1px" }}>OR</Typography>
            <Box sx={{ flex: 1, height: "1px", background: LINE }} />
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogle}
            disabled={googleLoading}
            startIcon={<GoogleIcon />}
            sx={{
              borderRadius: "50px", py: 1.2, textTransform: "none", fontWeight: 600,
              borderColor: LINE, color: NAVY,
              "&:hover": { borderColor: EMERALD, background: "rgba(31,94,69,0.05)" },
            }}
          >
            {googleLoading ? "Please wait..." : "Continue with Google"}
          </Button>
        </>
      )}

      {onBack && (
        <Button
          onClick={onBack}
          sx={{ mt: 1.5, textTransform: "none", color: NAVY_SOFT, fontWeight: 600, fontSize: "12.5px" }}
        >
          ← {backLabel}
        </Button>
      )}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.7, mt: 1.5, pt: 1.5, borderTop: `1px solid ${LINE}` }}>
        <ShieldRoundedIcon sx={{ fontSize: 14, color: EMERALD_DARK }} />
        <Typography sx={{ color: NAVY, fontWeight: 600, fontSize: "11px" }}>
          No passwords. No spam. Just a secure, one-tap sign in.
        </Typography>
      </Box>
    </Dialog>
  );
}
