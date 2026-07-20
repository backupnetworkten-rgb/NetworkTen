"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import {
  signupUser,
  loginUser,
  sendOTP,
  verifyOTP,
  loginWithGoogle,
} from "@/services/authService";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Collapse,
  Fade,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import GoogleIcon from "@mui/icons-material/Google";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

// ---- Type system: classic serif display, clean sans body, mono for utility tags ----
const display = Fraunces({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type Method = "email" | "phone" | null;

// ---- Palette ----
const NAVY = "#122340";
const NAVY_SOFT = "#3D4A63";
const EMERALD = "#1F5E45";
const EMERALD_DARK = "#164733";
const BRASS = "#B08D57";
const IVORY = "#FBF9F4";
const CARD = "#FFFFFF";
const LINE = "#E7E2D6";

// ---- Logo ----
// Reads from /public/images/logo.png -> served at "/images/logo.png".
// Sized up for a more premium presence on the light form panel.
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
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [method, setMethod] = useState<Method>(null);
  const [showOtpField, setShowOtpField] = useState(false);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Returning to the method picker (or switching methods) always clears
  // OTP state, so a stale "showOtpField=true" can't cause a Verify click
  // before a fresh OTP was ever sent.
  const selectMethod = (m: Method) => {
    setMethod(m);
    setShowOtpField(false);
    setOtp("");
  };

  const goBack = () => {
    setMethod(null);
    setShowOtpField(false);
    setOtp("");
  };

  const handleAuth = async () => {
    try {
      setLoading(true);

      if (isSignup) {
        if (!name || !email || !password) {
          alert("Please fill all fields");
          return;
        }

        await signupUser(name, email, password);
        alert("Account created successfully");
        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // EMAIL LOGIN
        if (method === "email") {
          const user = await loginUser(email, password);

          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user?.user?.displayName || email.split("@")[0],
              email: user?.user?.email,
              loginType: "email",
            })
          );

          alert("Login Successful");

          const redirect = localStorage.getItem("redirectAfterLogin");

          if (redirect) {
            localStorage.removeItem("redirectAfterLogin");
            router.push(redirect);
          } else {
            router.push("/");
          }
        }

        // PHONE LOGIN
        else if (method === "phone") {
          if (!phone.trim()) {
            alert("Please enter your phone number");
            return;
          }

          if (!showOtpField) {
            await sendOTP(phone.trim());
            setShowOtpField(true);
            alert("OTP Sent");
          } else {
            if (!otp.trim()) {
              alert("Please enter the OTP");
              return;
            }

            const result = await verifyOTP(otp.trim());

            // Persist user info so Navbar can pick it up
            // (phone auth has no displayName/email, so we
            // fall back to the phone number for "name")
            localStorage.setItem(
              "user",
              JSON.stringify({
                name: result?.user?.phoneNumber || phone.trim(),
                phone: result?.user?.phoneNumber || phone.trim(),
                loginType: "phone",
              })
            );

            alert("Login Successful");

            const redirect = localStorage.getItem("redirectAfterLogin");

            if (redirect) {
              localStorage.removeItem("redirectAfterLogin");
              window.location.href = redirect;
            } else {
              window.location.href = "/";
            }
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN HANDLER — fires immediately, no intermediate form
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await loginWithGoogle();

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          loginType: "google",
        })
      );

      alert("Login Successful");

      const redirect = localStorage.getItem("redirectAfterLogin");

      if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const methodMeta = {
    email: { icon: <MailRoundedIcon sx={{ fontSize: 20 }} />, label: "Continue with Email" },
    phone: { icon: <PhoneIphoneRoundedIcon sx={{ fontSize: 20 }} />, label: "Continue with Phone" },
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
              src={
                isSignup
                  ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop"
              }
              alt="NetworkTen"
              fill
              priority
              style={{ objectFit: "cover", opacity: 0.5 }}
            />

            {/* Fine node-grid, quiet and structural rather than glowing */}
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

            {/* CONTENT */}
            <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
              {/* Eyebrow — brass hairline tag, classic finance/legal register */}
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
                {isSignup ? (
                  <>Provision your<br />account</>
                ) : (
                  <>Access your<br />control panel</>
                )}
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
            {/* LOGO — top of the right panel, premium size */}
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, mb: 3 }}>
              <Logo />
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", maxWidth: "320px" }}>
                {/* HEADER ROW — back arrow appears once a method is chosen */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6, minHeight: 32 }}>
                  {!isSignup && method && (
                    <IconButton
                      size="small"
                      onClick={goBack}
                      sx={{
                        color: NAVY_SOFT,
                        border: `1px solid ${LINE}`,
                        borderRadius: "8px",
                        mr: 0.5,
                      }}
                    >
                      <ArrowBackRoundedIcon fontSize="small" />
                    </IconButton>
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
                    {isSignup
                      ? "Create account"
                      : method
                      ? methodMeta[method].label.replace("Continue with ", "")
                      : "Welcome back"}
                  </Typography>
                </Box>

                <Typography sx={{ color: NAVY_SOFT, lineHeight: 1.6, mb: 2.4, fontSize: "12.5px" }}>
                  {isSignup
                    ? "Set up your premium account in under a minute."
                    : method
                    ? "Enter your details to continue."
                    : "Choose how you'd like to sign in."}
                </Typography>

                {/* ---- METHOD PICKER (login only, before a method is chosen) ---- */}
                <Collapse in={!isSignup && !method} unmountOnExit>
                  <Box sx={{ display: "grid", gap: 1.1 }}>
                    {(["email", "phone"] as const).map((m) => (
                      <Box
                        key={m}
                        onClick={() => selectMethod(m)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.4,
                          px: 1.8,
                          py: 1.4,
                          borderRadius: "12px",
                          border: `1px solid ${LINE}`,
                          background: "#FCFBF8",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          "&:hover": {
                            background: "rgba(31,94,69,0.05)",
                            borderColor: EMERALD,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "9px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(31,94,69,0.09)",
                            color: EMERALD,
                          }}
                        >
                          {methodMeta[m].icon}
                        </Box>
                        <Typography sx={{ color: NAVY, fontWeight: 600, fontSize: "13.5px", flex: 1 }}>
                          {methodMeta[m].label}
                        </Typography>
                        <ChevronRightRoundedIcon sx={{ color: "#B7B2A2", fontSize: 18 }} />
                      </Box>
                    ))}

                    {/* Divider */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, my: 0.5 }}>
                      <Box sx={{ flex: 1, height: "1px", background: LINE }} />
                      <Typography className={mono.className} sx={{ color: "#B7B2A2", fontSize: "10px" }}>
                        OR
                      </Typography>
                      <Box sx={{ flex: 1, height: "1px", background: LINE }} />
                    </Box>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      startIcon={<GoogleIcon />}
                      sx={{
                        borderRadius: "50px",
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "13px",
                        borderColor: LINE,
                        color: NAVY,
                        "&:hover": { borderColor: EMERALD, background: "rgba(31,94,69,0.04)" },
                      }}
                    >
                      {loading ? "Please wait..." : "Continue with Google"}
                    </Button>
                  </Box>
                </Collapse>

                {/* ---- EMAIL LOGIN FORM ---- */}
                <Collapse in={!isSignup && method === "email"} unmountOnExit>
                  <Box sx={{ display: "grid", gap: 1.3 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={fieldSx}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      size="small"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                size="small"
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ color: NAVY_SOFT }}
                              >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <Button variant="contained" onClick={handleAuth} disabled={loading} endIcon={<ArrowForwardRoundedIcon />} sx={primaryBtnSx}>
                      {loading ? "Please wait..." : "Login"}
                    </Button>
                  </Box>
                </Collapse>

                {/* ---- PHONE LOGIN FORM ---- */}
                <Collapse in={!isSignup && method === "phone"} unmountOnExit>
                  <Box sx={{ display: "grid", gap: 1.3 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      size="small"
                      placeholder="9876543210"
                      disabled={showOtpField}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={fieldSx}
                    />

                    <Fade in={showOtpField} unmountOnExit>
                      <TextField
                        fullWidth
                        label="Enter OTP"
                        variant="outlined"
                        size="small"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={fieldSx}
                      />
                    </Fade>

                    <Button variant="contained" onClick={handleAuth} disabled={loading} endIcon={<ArrowForwardRoundedIcon />} sx={primaryBtnSx}>
                      {loading ? "Please wait..." : showOtpField ? "Verify & Login" : "Send OTP"}
                    </Button>

                    <div id="recaptcha-container" />
                  </Box>
                </Collapse>

                {/* ---- SIGNUP FORM ---- */}
                <Collapse in={isSignup} unmountOnExit>
                  <Box sx={{ display: "grid", gap: 1.3 }}>
                    <TextField fullWidth label="Full Name" size="small" value={name} onChange={(e) => setName(e.target.value)} sx={fieldSx} />
                    <TextField fullWidth label="Email Address" size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={fieldSx} />
                    <TextField
                      fullWidth
                      label="Password"
                      size="small"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={fieldSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton edge="end" size="small" onClick={() => setShowPassword(!showPassword)} sx={{ color: NAVY_SOFT }}>
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <TextField fullWidth label="Confirm Password" size="small" type={showPassword ? "text" : "password"} sx={fieldSx} />
                    <Button variant="contained" onClick={handleAuth} disabled={loading} endIcon={<ArrowForwardRoundedIcon />} sx={primaryBtnSx}>
                      {loading ? "Please wait..." : "Create Account"}
                    </Button>
                  </Box>
                </Collapse>

                {/* SWITCH */}
                <Box sx={{ mt: 2.4, textAlign: "center" }}>
                  <Typography sx={{ color: NAVY_SOFT, fontSize: "12px" }}>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <Box
                      component="span"
                      onClick={() => {
                        setIsSignup(!isSignup);
                        setMethod(null);
                      }}
                      sx={{ color: EMERALD_DARK, fontWeight: 700, ml: 0.8, cursor: "pointer" }}
                    >
                      {isSignup ? "Sign In" : "Sign Up"}
                    </Box>
                  </Typography>
                </Box>

                {/* TRUST LINE — replaces the Firebase note, dark and clearly visible */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.7,
                    mt: 2,
                    pt: 1.6,
                    borderTop: `1px solid ${LINE}`,
                  }}
                >
                  <VerifiedUserRoundedIcon sx={{ fontSize: 14, color: EMERALD_DARK }} />
                  <Typography sx={{ color: NAVY, fontWeight: 600, fontSize: "11px", textAlign: "center", lineHeight: 1.6 }}>
                    Your data is protected with enterprise-grade encryption
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
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
  py: 1.15,
  fontWeight: 700,
  textTransform: "none",
  fontSize: "13px",
  boxShadow: "0 8px 22px rgba(31,94,69,0.22)",
  "&:hover": { background: `linear-gradient(135deg, #266E52, ${EMERALD_DARK})` },
  "&.Mui-disabled": { background: "#D8D4C6", color: "#fff" },
};