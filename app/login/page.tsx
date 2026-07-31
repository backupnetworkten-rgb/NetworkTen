"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { sendOTP, verifyOTP, loginWithGoogle } from "@/services/authService";
import { saveSession } from "@/services/sessionManager";

import {
  Box,
  Typography,
  TextField,
  Button,
  Fade,
  Snackbar,
  Alert,
  Slide,
  SlideProps,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import GoogleIcon from "@mui/icons-material/Google";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

// ---- Type system: classic serif display, clean sans body, mono for utility tags ----
const display = Fraunces({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

// ---- Palette ----
const NAVY = "#122340";
const NAVY_SOFT = "#3D4A63";
const EMERALD = "#1F5E45";
const EMERALD_DARK = "#164733";
const BRASS = "#B08D57";
const IVORY = "#FBF9F4";
const CARD = "#FFFFFF";
const LINE = "#E7E2D6";

// ---- Toast types ----
type ToastSeverity = "success" | "error" | "info" | "warning";
interface ToastMessage {
  key: number;
  message: string;
  severity: ToastSeverity;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

// ---- Logo ----
function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="NetworkTen"
      width={220}
      height={56}
      priority
      style={{ width: "auto", height: "52px", objectFit: "contain" }}
    />
  );
}

export default function LoginPage() {
  const [showOtpField, setShowOtpField] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ---- Toast queue state ----
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const router = useRouter();

  const showToast = (message: string, severity: ToastSeverity = "success") => {
    setToastQueue((prev) => [...prev, { key: Date.now(), message, severity }]);
  };

  // Process queue: show next toast once current one is fully closed
  useEffect(() => {
    if (toastQueue.length && !currentToast) {
      setCurrentToast(toastQueue[0]);
      setToastQueue((prev) => prev.slice(1));
      setToastOpen(true);
    } else if (toastQueue.length && currentToast && toastOpen) {
      setToastOpen(false);
    }
  }, [toastQueue, currentToast, toastOpen]);

  const closeToast = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  const handleToastExited = () => setCurrentToast(null);

  const goBackToPhone = () => {
    setShowOtpField(false);
    setOtp("");
  };

  const redirectAfterAuth = () => {
    const redirect = localStorage.getItem("redirectAfterLogin");
    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = "/";
    }
  };

  const handlePhoneAuth = async () => {
    try {
      setLoading(true);

      if (!showOtpField) {
        if (!phone.trim()) {
          showToast("Please enter your phone number", "warning");
          return;
        }
        await sendOTP(phone.trim());
        setShowOtpField(true);
        showToast("OTP sent successfully", "success");
      } else {
        if (!otp.trim()) {
          showToast("Please enter the OTP", "warning");
          return;
        }

        const result = await verifyOTP(otp.trim());

        saveSession({
          name: result?.user?.phoneNumber || phone.trim(),
          phone: result?.user?.phoneNumber || phone.trim(),
          loginType: "phone",
        });

        showToast("Login successful", "success");
        setTimeout(redirectAfterAuth, 900);
      }
    } catch (error: any) {
      console.log(error);
      showToast(error?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await loginWithGoogle();

      saveSession({
        name: result.user.displayName,
        email: result.user.email,
        loginType: "google",
      });

      showToast("Login successful", "success");
      setTimeout(redirectAfterAuth, 900);
    } catch (error: any) {
      console.log(error);
      showToast(error?.message || "Google sign-in failed", "error");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        className={body.className}
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${IVORY} 0%, #F3EFE5 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1.5,
          py: 2.5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* AMBIENT ACCENT */}
        <Box
          sx={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "rgba(31,94,69,0.06)",
            top: -110,
            right: -110,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(176,141,87,0.08)",
            bottom: -90,
            left: -90,
          }}
        />

        {/* MAIN CARD */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.95fr 1fr" },
            borderRadius: "18px",
            overflow: "hidden",
            background: CARD,
            border: `1px solid ${LINE}`,
            boxShadow: "0 24px 60px rgba(18,35,64,0.10)",
          }}
        >
          {/* LEFT — BRAND / IMAGE PANEL */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: "220px", md: "540px" },
              display: "flex",
              alignItems: "flex-end",
              p: { xs: 2.5, md: 3.5 },
              overflow: "hidden",
              background: NAVY,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop"
              alt="NetworkTen"
              fill
              priority
              style={{ objectFit: "cover", opacity: 0.5 }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(176,141,87,0.35) 1px, transparent 1.5px)",
                backgroundSize: "28px 28px",
                opacity: 0.3,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, ${NAVY} 0%, rgba(18,35,64,0.55) 55%, rgba(18,35,64,0.25) 100%)`,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.9,
                  mb: 1.8,
                  pb: 0.6,
                  borderBottom: `1px solid rgba(176,141,87,0.55)`,
                }}
              >
                <VerifiedUserRoundedIcon sx={{ fontSize: 13, color: BRASS }} />
                <Typography
                  className={mono.className}
                  sx={{ fontSize: "10px", color: BRASS, letterSpacing: "1.4px", textTransform: "uppercase" }}
                >
                  Secure Access Portal
                </Typography>
              </Box>

              <Typography
                className={display.className}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  lineHeight: 1.12,
                  mb: 1.4,
                  fontSize: { xs: "28px", md: "40px" },
                  letterSpacing: "-0.3px",
                }}
              >
                Access your<br />control panel
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.68)",
                  lineHeight: 1.7,
                  maxWidth: "300px",
                  fontSize: "12.5px",
                }}
              >
                Premium networking, surveillance and automation infrastructure for modern businesses.
              </Typography>

              <Box sx={{ display: "flex", gap: 2.6, mt: 3.2 }}>
                {[
                  ["256-bit", "Encryption"],
                  ["24/7", "Monitoring"],
                  ["99.9%", "Uptime"],
                ].map(([stat, label]) => (
                  <Box key={label}>
                    <Typography className={display.className} sx={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>
                      {stat}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", letterSpacing: "0.3px" }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* RIGHT — FORM */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 3.5 },
              background: CARD,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, mb: 3 }}>
              <Logo />
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", maxWidth: "320px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6, minHeight: 32 }}>
                  {showOtpField && (
                    <Box
                      onClick={goBackToPhone}
                      sx={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: NAVY_SOFT,
                        border: `1px solid ${LINE}`,
                        borderRadius: "8px",
                        mr: 0.5,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        "&:hover": { borderColor: EMERALD, color: EMERALD_DARK },
                      }}
                    >
                      <ArrowBackRoundedIcon fontSize="small" />
                    </Box>
                  )}
                  <Typography
                    className={display.className}
                    sx={{
                      color: NAVY,
                      fontWeight: 600,
                      lineHeight: 1.1,
                      fontSize: { xs: "23px", md: "27px" },
                    }}
                  >
                    {showOtpField ? "Verify your number" : "Welcome back"}
                  </Typography>
                </Box>

                <Typography sx={{ color: NAVY_SOFT, lineHeight: 1.6, mb: 2.6, fontSize: "12.5px" }}>
                  {showOtpField
                    ? `Enter the 6-digit code sent to ${phone}`
                    : "Enter your phone number to get a one-time code."}
                </Typography>

                {/* ---- PHONE + OTP FLOW — PRIMARY ---- */}
                <Box sx={{ display: "grid", gap: 1.3 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    disabled={showOtpField}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <Box sx={{ display: "flex", alignItems: "center", color: NAVY_SOFT, mr: 0.8 }}>
                            <PhoneIphoneRoundedIcon sx={{ fontSize: 18 }} />
                          </Box>
                        ),
                      },
                    }}
                    sx={fieldSx}
                  />

                  <Fade in={showOtpField} unmountOnExit>
                    <TextField
                      fullWidth
                      label="6-digit OTP"
                      variant="outlined"
                      size="small"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      sx={{
                        ...fieldSx,
                        "& .MuiOutlinedInput-input": {
                          letterSpacing: "6px",
                          fontWeight: 700,
                          textAlign: "center",
                        },
                      }}
                    />
                  </Fade>

                  <Button
                    variant="contained"
                    onClick={handlePhoneAuth}
                    disabled={loading}
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={primaryBtnSx}
                  >
                    {loading ? "Please wait..." : showOtpField ? "Verify & Continue" : "Send OTP"}
                  </Button>

                  {showOtpField && (
                    <Typography
                      onClick={goBackToPhone}
                      sx={{
                        textAlign: "center",
                        color: EMERALD_DARK,
                        fontWeight: 600,
                        fontSize: "11.5px",
                        cursor: "pointer",
                        mt: -0.4,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Didn't get it? Change number or resend
                    </Typography>
                  )}

                  <div id="recaptcha-container" />
                </Box>

                {/* ---- GOOGLE — SECONDARY, BELOW DIVIDER ---- */}
                <Fade in={!showOtpField} unmountOnExit>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, my: 2.2 }}>
                      <Box sx={{ flex: 1, height: "1px", background: LINE }} />
                      <Typography className={mono.className} sx={{ color: "#B7B2A2", fontSize: "10px", letterSpacing: "1px" }}>
                        OR
                      </Typography>
                      <Box sx={{ flex: 1, height: "1px", background: LINE }} />
                    </Box>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleGoogleLogin}
                      disabled={googleLoading}
                      startIcon={<GoogleIcon />}
                      sx={{
                        borderRadius: "50px",
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "13px",
                        borderColor: LINE,
                        color: NAVY,
                        background: "#FCFBF8",
                        "&:hover": {
                          borderColor: EMERALD,
                          background: "rgba(31,94,69,0.05)",
                        },
                      }}
                    >
                      {googleLoading ? "Please wait..." : "Continue with Google"}
                    </Button>
                  </Box>
                </Fade>

                {/* TRUST LINE */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.7,
                    mt: 2.8,
                    pt: 1.8,
                    borderTop: `1px solid ${LINE}`,
                  }}
                >
                  <ShieldRoundedIcon sx={{ fontSize: 14, color: EMERALD_DARK }} />
                  <Typography sx={{ color: NAVY, fontWeight: 600, fontSize: "11px", textAlign: "center", lineHeight: 1.6 }}>
                    No passwords. No spam. Just a secure, one-tap sign in.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />

      {/* ---- TOAST / SNACKBAR (queued, professional) ---- */}
      <Snackbar
        key={currentToast?.key}
        open={toastOpen}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        slots={{ transition: SlideTransition }}
        slotProps={{ transition: { onExited: handleToastExited } }}
        sx={{ mt: { xs: 1, md: 1.5 } }}
      >
        <Alert
          onClose={closeToast}
          severity={currentToast?.severity}
          variant="filled"
          action={
            <Box
              onClick={closeToast}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer", ml: 0.5 }}
            >
              <CloseRoundedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
            </Box>
          }
          sx={{
            width: "100%",
            minWidth: 280,
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "13px",
            alignItems: "center",
            boxShadow: "0 12px 30px rgba(18,35,64,0.18)",
            "& .MuiAlert-icon": { alignItems: "center" },
            ...(currentToast?.severity === "success" && {
              background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`,
            }),
            ...(currentToast?.severity === "warning" && {
              background: `linear-gradient(135deg, ${BRASS}, #8C6C3D)`,
            }),
          }}
        >
          {currentToast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// Shared field styling — light, warm-white, emerald focus ring
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    background: "#FCFBF8",
    borderRadius: "10px",
    color: NAVY,
    "& fieldset": { borderColor: LINE },
    "&:hover fieldset": { borderColor: "#C9C2AC" },
    "&.Mui-focused fieldset": { borderColor: EMERALD },
  },
  "& .MuiInputLabel-root": { color: NAVY_SOFT },
  "& .MuiInputLabel-root.Mui-focused": { color: EMERALD_DARK },
};

const primaryBtnSx = {
  mt: 0.3,
  background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`,
  borderRadius: "50px",
  py: 1.2,
  fontWeight: 700,
  textTransform: "none",
  fontSize: "13.5px",
  boxShadow: "0 8px 22px rgba(31,94,69,0.22)",
  "&:hover": { background: `linear-gradient(135deg, #266E52, ${EMERALD_DARK})` },
  "&.Mui-disabled": { background: "#D8D4C6", color: "#fff" },
};