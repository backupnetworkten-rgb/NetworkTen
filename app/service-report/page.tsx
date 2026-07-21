"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  Fade,
  Chip,
  Stack,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import {
  AppUser,
  verifyLogin,
  getSecurityQuestion,
  resetPassword,
  getSession,
  setSession,
  clearSession,
} from "@/lib/authCredentials";
import {
  subscribeServiceReports,
  createServiceReport,
  updateServiceReport,
  deleteServiceReport,
} from "@/services/serviceReportService";
import { ServiceReport } from "@/types/serviceReport";
import { generateServiceReportPDF } from "@/lib/generateServiceReportPDF";
import InitialReportForm from "@/components/service-report/InitialReportForm";
import ShareLinkDialog from "@/components/service-report/ShareLinkDialog";
import ServiceReportList from "@/components/service-report/ServiceReportList";
import DeleteConfirmDialog from "@/components/service-report/DeleteConfirmDialog";

function getInitial(name: string): string {
  return name?.charAt(0)?.toUpperCase() || "U";
}

/* ==================================================================
   Brand Wordmark
================================================================== */
function BrandMark({
  size = 40,
  variant = "dark",
  showText = true,
}: {
  size?: number;
  variant?: "dark" | "light";
  showText?: boolean;
}) {
  const isDark = variant === "dark";
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #8BC53F 0%, #3F6FE0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: isDark
            ? "0 4px 14px rgba(0,0,0,0.28)"
            : "0 4px 12px rgba(63,111,224,0.22)",
        }}
      >
        <HubRoundedIcon sx={{ color: "#fff", fontSize: size * 0.52 }} />
      </Box>
      {showText && (
        <Box sx={{ lineHeight: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: size * 0.34,
              letterSpacing: 0.2,
              lineHeight: 1.1,
              color: isDark ? "#fff" : "#08142e",
              whiteSpace: "nowrap",
            }}
          >
            Network<Box component="span" sx={{ color: "#8BC53F" }}>Ten</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: size * 0.19,
              fontWeight: 600,
              color: isDark ? "#8BC53F" : "#6ea82c",
              letterSpacing: 0.2,
            }}
          >
            connecting hopes...
          </Typography>
        </Box>
      )}
    </Box>
  );
}

/* ==================================================================
   Custom illustration
================================================================== */
function TechnicianIllustration() {
  return (
    <svg
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 190, height: "auto" }}
    >
      <defs>
        <linearGradient id="circleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f7ff" />
        </linearGradient>
      </defs>
      <circle cx="210" cy="210" r="200" fill="url(#circleGrad)" />
      <circle cx="210" cy="210" r="150" fill="#ffffff" fillOpacity="0.06" />
      <circle cx="70" cy="330" r="26" fill="#ffffff" fillOpacity="0.12" />
      <circle cx="360" cy="90" r="18" fill="#ffffff" fillOpacity="0.14" />
      <circle cx="350" cy="330" r="10" fill="#ffffff" fillOpacity="0.2" />
      <rect x="120" y="90" width="180" height="230" rx="18" fill="url(#cardGrad)" />
      <rect x="150" y="76" width="120" height="30" rx="10" fill="#8BC53F" />
      <rect x="165" y="86" width="90" height="10" rx="5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="148" cy="140" r="9" fill="#8BC53F" />
      <path d="M144 140l3 4 7-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="134" width="95" height="10" rx="5" fill="#dfe6f0" />
      <circle cx="148" cy="176" r="9" fill="#8BC53F" />
      <path d="M144 176l3 4 7-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="170" width="80" height="10" rx="5" fill="#dfe6f0" />
      <circle cx="148" cy="212" r="9" fill="#3F6FE0" />
      <path d="M144 212l3 4 7-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="206" width="95" height="10" rx="5" fill="#dfe6f0" />
      <circle cx="148" cy="248" r="9" fill="#eef1f6" stroke="#c7cfdb" strokeWidth="1.5" />
      <rect x="168" y="242" width="70" height="10" rx="5" fill="#eef1f6" />
      <rect x="140" y="278" width="140" height="26" rx="13" fill="#fff7e6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${159 + i * 26} 285 l2.6 5.3 5.8 0.8 -4.2 4.1 1 5.8 -5.2 -2.7 -5.2 2.7 1 -5.8 -4.2 -4.1 5.8 -0.8 z`}
          fill="#F0A202"
        />
      ))}
      <circle cx="300" cy="300" r="34" fill="#08142e" />
      <path
        d="M290 292l16 16m-4-24a10 10 0 1 0-14 14l-16 16 6 6 16-16a10 10 0 0 0 12-16z"
        stroke="#8BC53F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==================================================================
   Branding panel (desktop / tablet only)
================================================================== */
function BrandPanel() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        p: { md: 4, lg: 5, xl: 6 },
        overflow: "hidden",
        background: "linear-gradient(155deg, #08142e 0%, #142449 45%, #1c3363 100%)",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,197,63,0.28) 0%, transparent 70%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -90,
          left: -50,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(63,111,224,0.25) 0%, transparent 70%)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Button
          onClick={() => router.push("/")}
          startIcon={<ArrowBackRoundedIcon fontSize="small" />}
          sx={{
            color: "#fff",
            background: "rgba(255,255,255,0.08)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "12.5px",
            borderRadius: "9px",
            px: 1.75,
            py: 0.6,
            mb: { md: 3, lg: 4 },
            border: "1px solid rgba(255,255,255,0.15)",
            "&:hover": { background: "rgba(255,255,255,0.16)" },
          }}
        >
          Back to Home
        </Button>

        <Box sx={{ mb: { md: 3.5, lg: 4.5 } }}>
          <BrandMark size={44} variant="dark" />
        </Box>

        <Typography sx={{ fontWeight: 900, fontSize: { md: "23px", lg: "27px" }, lineHeight: 1.25, mb: 1.5 }}>
          Manage every service
          <br /> report in one place
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", maxWidth: 340, mb: 3.5 }}>
          Track visits, engineer feedback and equipment status — export a
          polished PDF report in seconds.
        </Typography>

        <Stack spacing={1.5}>
          {[
            { icon: <AssignmentTurnedInRoundedIcon fontSize="small" />, text: "Structured, consistent reports" },
            { icon: <ShieldRoundedIcon fontSize="small" />, text: "Secure, access-controlled dashboard" },
            { icon: <VerifiedUserRoundedIcon fontSize="small" />, text: "Trusted by field engineering teams" },
          ].map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8BC53F",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Typography sx={{ fontSize: "12.5px", color: "rgba(255,255,255,0.85)" }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", mt: 2 }}>
        <TechnicianIllustration />
      </Box>
    </Box>
  );
}

/* ==================================================================
   Forgot Password Dialog
================================================================== */
function ForgotPasswordDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const resetAll = () => {
    setStep(0);
    setUsername("");
    setQuestion("");
    setAnswer("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPw(false);
    setError("");
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const handleFindUser = () => {
    setError("");
    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }
    const q = getSecurityQuestion(username);
    if (!q) {
      setError("No account found with this username.");
      return;
    }
    setQuestion(q);
    setStep(1);
  };

  const handleVerifyAnswer = () => {
    setError("");
    if (!answer.trim()) {
      setError("Please answer the security question.");
      return;
    }
    setStep(2);
  };

  const handleResetPassword = () => {
    setError("");
    if (newPassword.length < 4) {
      setError("Password should be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const ok = resetPassword(username, answer, newPassword);
    if (!ok) {
      setError("Your security answer was incorrect.");
      setStep(1);
      return;
    }
    setStep(3);
  };

  const stepLabels = ["Identify", "Verify", "New Password"];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: "18px", overflow: "hidden", m: { xs: 2, sm: 3 } } } }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #08142e 0%, #16294f 100%)",
          color: "#fff",
          px: { xs: 2, sm: 2.5 },
          pt: 2.5,
          pb: step < 3 ? 2.5 : 2,
          position: "relative",
        }}
      >
        {step > 0 && step < 3 && (
          <IconButton
            onClick={() => {
              setError("");
              setStep((s) => s - 1);
            }}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "#fff",
              background: "rgba(255,255,255,0.08)",
              "&:hover": { background: "rgba(255,255,255,0.16)" },
            }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </IconButton>
        )}

        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(139,197,63,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1,
            }}
          >
            <KeyRoundedIcon sx={{ color: "#8BC53F" }} fontSize="small" />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "15.5px" }}>
            {step === 3 ? "All set!" : "Reset your password"}
          </Typography>
          {step < 3 && (
            <Typography sx={{ fontSize: "11.5px", color: "rgba(255,255,255,0.6)", mt: 0.25 }}>
              Step {step + 1} of 3 — {stepLabels[step]}
            </Typography>
          )}
        </Box>

        {step < 3 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 1.5 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  height: 3.5,
                  width: 28,
                  borderRadius: "3px",
                  background: i <= step ? "#8BC53F" : "rgba(255,255,255,0.18)",
                  transition: "background 0.25s ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1.75, borderRadius: "10px", py: 0.25 }}>
            {error}
          </Alert>
        )}

        {step === 3 ? (
          <Fade in>
            <Box sx={{ textAlign: "center", py: 1 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 46, color: "#8BC53F", mb: 1 }} />
              <Typography sx={{ fontWeight: 700, color: "#08142e", mb: 0.5, fontSize: "14.5px" }}>
                Password updated successfully
              </Typography>
              <Typography sx={{ color: "#667085", fontSize: "12.5px", mb: 2.25 }}>
                You can now sign in using your new password.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={handleClose}
                sx={{
                  background: "#8BC53F",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1,
                  "&:hover": { background: "#74ab35" },
                }}
              >
                Back to Sign In
              </Button>
            </Box>
          </Fade>
        ) : step === 0 ? (
          <Fade in>
            <Box>
              <Typography sx={{ fontSize: "12.5px", color: "#667085", mb: 1.75 }}>
                Enter your username and we'll find your account.
              </Typography>
              <TextField
                label="Username"
                fullWidth
                autoFocus
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFindUser()}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon fontSize="small" sx={{ color: "#98a2b3" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleFindUser}
                sx={{
                  background: "#8BC53F",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1,
                  "&:hover": { background: "#74ab35" },
                }}
              >
                Continue
              </Button>
            </Box>
          </Fade>
        ) : step === 1 ? (
          <Fade in>
            <Box>
              <Chip
                label="Security question"
                size="small"
                sx={{ mb: 1.25, fontWeight: 700, background: "rgba(139,197,63,0.12)", color: "#4b7a1f" }}
              />
              <Typography sx={{ fontWeight: 700, color: "#08142e", mb: 1.75, fontSize: "13.5px" }}>
                {question}
              </Typography>
              <TextField
                label="Your Answer"
                fullWidth
                autoFocus
                size="small"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyAnswer()}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleVerifyAnswer}
                sx={{
                  background: "#8BC53F",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1,
                  "&:hover": { background: "#74ab35" },
                }}
              >
                Continue
              </Button>
            </Box>
          </Fade>
        ) : (
          <Fade in>
            <Box>
              <TextField
                label="New Password"
                type={showPw ? "text" : "password"}
                fullWidth
                autoFocus
                size="small"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 1.5, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon fontSize="small" sx={{ color: "#98a2b3" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPw((s) => !s)}>
                          {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Confirm New Password"
                type={showPw ? "text" : "password"}
                fullWidth
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon fontSize="small" sx={{ color: "#98a2b3" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleResetPassword}
                sx={{
                  background: "#8BC53F",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1,
                  "&:hover": { background: "#74ab35" },
                }}
              >
                Reset Password
              </Button>
            </Box>
          </Fade>
        )}

        {step === 0 && (
          <Button
            fullWidth
            onClick={handleClose}
            startIcon={<ArrowBackRoundedIcon fontSize="small" />}
            sx={{ mt: 1, color: "#667085", textTransform: "none", fontWeight: 600, fontSize: "12.5px" }}
          >
            Back to Sign In
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ==================================================================
   Login Page
================================================================== */
function ServiceReportLogin({ onLoggedIn }: { onLoggedIn: (user: AppUser) => void }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const user = verifyLogin(username, password);
    if (!user) {
      setError("Incorrect username or password.");
      return;
    }
    setSession(user);
    onLoggedIn(user);
  };

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", background: "#f6faff" }}>
      <BrandPanel />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, sm: 4, md: 5 },
          py: { xs: 2.5, sm: 3 },
          minWidth: 0,
        }}
      >
        <Box sx={{ display: { xs: "flex", md: "none" }, mb: { xs: 1.5, sm: 2 } }}>
          <Button
            onClick={() => router.push("/")}
            startIcon={<ArrowBackRoundedIcon fontSize="small" />}
            sx={{
              color: "#344054",
              background: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "12.5px",
              borderRadius: "9px",
              px: 1.75,
              py: 0.6,
              border: "1px solid #eef0f4",
              boxShadow: "0 2px 8px rgba(16,24,40,0.06)",
              "&:hover": { background: "#f6faff" },
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ display: { xs: "flex", md: "none" }, mb: 3 }}>
            <BrandMark size={40} variant="light" />
          </Box>

          <Paper
            elevation={0}
            component="form"
            onSubmit={handleLogin}
            sx={{
              width: "100%",
              maxWidth: 380,
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              border: "1px solid #eef0f4",
              boxShadow: "0 12px 36px rgba(16,24,40,0.09)",
              background: "#fff",
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(139,197,63,0.12)",
                color: "#4b7a1f",
                mb: 2,
                mx: { xs: "auto", sm: 0 },
              }}
            >
              <LockRoundedIcon fontSize="small" />
            </Box>

            <Typography sx={{ fontWeight: 900, fontSize: "21px", color: "#08142e", mb: 0.4, textAlign: { xs: "center", sm: "left" } }}>
              Welcome back
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: "13px", mb: 2.5, textAlign: { xs: "center", sm: "left" } }}>
              Sign in to view and manage service reports.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 1.75, borderRadius: "10px", py: 0.25 }}>
                {error}
              </Alert>
            )}

            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#344054", mb: 0.5 }}>
              Username
            </Typography>
            <TextField
              placeholder="Enter your username"
              type="text"
              fullWidth
              autoFocus
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 1.75, "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#fbfcfd" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon fontSize="small" sx={{ color: "#98a2b3" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#344054", mb: 0.5 }}>
              Password
            </Typography>
            <TextField
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 0.75, "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#fbfcfd" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon fontSize="small" sx={{ color: "#98a2b3" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2.25 }}>
              <Button
                onClick={() => setForgotOpen(true)}
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#3F6FE0",
                  fontWeight: 600,
                  fontSize: "12px",
                  p: 0,
                  minWidth: 0,
                  "&:hover": { background: "transparent", textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #8BC53F 0%, #6ea82c 100%)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                py: 1.15,
                fontSize: "14px",
                boxShadow: "0 6px 16px rgba(139,197,63,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #7cb436 0%, #5f9425 100%)" },
              }}
            >
              Sign In
            </Button>

            <Typography sx={{ textAlign: "center", fontSize: "11px", color: "#98a2b3", mt: 2.25 }}>
              Protected access · Authorized personnel only
            </Typography>
          </Paper>
        </Box>
      </Box>

      <ForgotPasswordDialog open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </Box>
  );
}
/* ==================================================================
   Top Bar
================================================================== */
function DashboardTopBar({ displayName, onLogout }: { displayName: string; onLogout: () => void }) {
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        py: 1.25,
        mb: 3,
        borderRadius: "14px",
        border: "1px solid #eef0f4",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2.5 }, minWidth: 0 }}>
        <IconButton
          onClick={() => router.push("/")}
          sx={{
            color: "#344054",
            background: "#f6faff",
            border: "1px solid #eef0f4",
            borderRadius: "10px",
            width: 38,
            height: 38,
            flexShrink: 0,
            "&:hover": { background: "#eef4ff" },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            pl: { sm: 1.5 },
            borderLeft: "1px solid #eef0f4",
          }}
        >
          <BrandMark size={46} variant="light" />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            minWidth: 0,
            pl: { xs: 0, sm: 2.5 },
            borderLeft: { xs: "none", sm: "1px solid #eef0f4" },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #8BC53F 0%, #6ea82c 100%)",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {getInitial(displayName)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "13.5px",
                color: "#08142e",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: 130, sm: 200 },
              }}
            >
              {displayName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <Typography sx={{ fontSize: "11px", color: "#667085" }}>Logged in</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Button
        onClick={onLogout}
        startIcon={<LogoutRoundedIcon fontSize="small" />}
        sx={{
          color: "#EF4444",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "12.5px",
          borderRadius: "10px",
          px: 2,
          py: 0.7,
          border: "1px solid #fde2e2",
          background: "#fff7f7",
          flexShrink: 0,
          "&:hover": { background: "#fee2e2", border: "1px solid #fca5a5" },
        }}
      >
        Logout
      </Button>
    </Paper>
  );
}

/* ==================================================================
   Main Page
================================================================== */
export default function ServiceReportPage() {
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<AppUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceReport | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceReport | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  useEffect(() => {
    const existing = getSession();
    setUser(existing);
    setCheckingSession(false);
  }, []);

  useEffect(() => {
    if (!user) {
      setReports([]);
      return;
    }
    const unsubReports = subscribeServiceReports(setReports);
    return () => unsubReports();
  }, [user]);

  const canManage = !!user;

  const filtered = reports.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.csrNo?.toLowerCase().includes(term) ||
      r.customerName?.toLowerCase().includes(term) ||
      r.engineerNames?.toLowerCase().includes(term)
    );
  });

  const handleSave = async (data: Omit<ServiceReport, "id" | "createdAt" | "updatedAt">) => {
    if (editing?.id) {
      // status/shareToken are already part of `data` since it comes from the
      // existing report — updateServiceReport just overwrites Part A fields.
      await updateServiceReport(editing.id, data);
    } else {
      const { status, shareToken, ...rest } = data;
      const token = await createServiceReport(rest);
      setShareLink(`${window.location.origin}/service-report/fill/${token}`);
    }
    setEditing(null);
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteServiceReport(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
  };

  if (checkingSession) {
    return <Box sx={{ minHeight: "100dvh" }} />;
  }

  if (!user) {
    return <ServiceReportLogin onLoggedIn={setUser} />;
  }

  return (
    <Box sx={{ background: "#f6faff", minHeight: "80vh", py: { xs: 3, sm: 4, md: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
        <DashboardTopBar displayName={user.displayName} onLogout={handleLogout} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "20px", sm: "24px", md: "28px" }, color: "#08142e" }}>
              Customer Service Reports
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: "13px" }}>
              Create a report, share the link, and download the PDF once it's completed.
            </Typography>
          </Box>

          {canManage && (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
              fullWidth={false}
              sx={{
                background: "linear-gradient(135deg, #8BC53F 0%, #6ea82c 100%)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "40px",
                px: 3,
                py: 1,
                boxShadow: "0 6px 16px rgba(139,197,63,0.3)",
                width: { xs: "100%", md: "auto" },
                "&:hover": { background: "linear-gradient(135deg, #7cb436 0%, #5f9425 100%)" },
              }}
            >
              New Service Report
            </Button>
          )}
        </Box>

        <TextField
          placeholder="Search by CSR No, Customer or Engineer..."
          fullWidth
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            background: "#fff",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#98a2b3" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box
          sx={{
            background: "#fff",
            borderRadius: { xs: "14px", md: "18px" },
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            p: { xs: 1, md: 2 },
            overflowX: "auto",
          }}
        >
          <ServiceReportList
            reports={filtered}
            canManage={canManage}
            onEdit={(r) => {
              setEditing(r);
              setFormOpen(true);
            }}
            onDelete={(r) => setDeleteTarget(r)}
            onDownload={(r) => generateServiceReportPDF(r)}
          />
        </Box>
      </Container>

      <InitialReportForm
        open={formOpen}
        initialData={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        existingCsrNumbers={reports.map((r) => r.csrNo)}
      />

      <ShareLinkDialog
        open={!!shareLink}
        link={shareLink || ""}
        onClose={() => setShareLink(null)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        csrNo={deleteTarget?.csrNo}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}