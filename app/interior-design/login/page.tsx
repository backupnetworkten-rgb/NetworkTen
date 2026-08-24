"use client";

import {
  FormEvent,
  Suspense,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { auth } from "@/lib/firebase/client";

/* =========================================================
   KIT TYPES
========================================================= */

type KitId =
  | "welcome-kit"
  | "client-discovery-kit"
  | "client-contract-kit"
  | "e-design-contract-kit";

interface KitConfig {
  id: KitId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  redirect: string;
}

/* =========================================================
   KIT CONFIGURATION
========================================================= */

const KIT_CONFIGS: Record<
  KitId,
  KitConfig
> = {
  /* =======================================================
     01 — WELCOME KIT
  ======================================================= */

  "welcome-kit": {
    id: "welcome-kit",

    number: "01",

    title: "Welcome Kit",

    shortTitle: "Welcome",

    description:
      "Begin your Network Ten interior design journey by sharing your basic project, lifestyle and design information.",

    redirect:
      "/interior-design/kits/welcome",
  },

  /* =======================================================
     02 — CLIENT DISCOVERY KIT
  ======================================================= */

  "client-discovery-kit": {
    id: "client-discovery-kit",

    number: "02",

    title: "Client Discovery Kit",

    shortTitle: "Discovery",

    description:
      "Help our interior design team understand your lifestyle, project goals, design preferences and requirements.",

    redirect:
      "/interior-design/kits/discovery",
  },

  /* =======================================================
     03 — CLIENT CONTRACT KIT
  ======================================================= */

  "client-contract-kit": {
    id: "client-contract-kit",

    number: "03",

    title: "Client Contract Kit",

    shortTitle: "Contract",

    description:
      "Review your project scope, deliverables, fees, responsibilities and contract acceptance information.",

    redirect:
      "/interior-design/kits/contract",
  },

  /* =======================================================
     04 — E-DESIGN CONTRACT KIT
  ======================================================= */

  "e-design-contract-kit": {
    id: "e-design-contract-kit",

    number: "04",

    title: "E-Design Contract Kit",

    shortTitle: "E-Design",

    description:
      "Review your E-Design agreement, digital deliverables, communication process, payment terms, responsibilities and project conditions.",

    redirect:
      "/interior-design/kits/e-design",
  },
};

/* =========================================================
   KIT VALIDATION
========================================================= */

function isValidKit(
  value: string | null
): value is KitId {
  return (
    value === "welcome-kit" ||
    value === "client-discovery-kit" ||
    value === "client-contract-kit" ||
    value === "e-design-contract-kit"
  );
}

/* =========================================================
   LOGIN CONTENT
========================================================= */

function InteriorDesignLoginContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  /* =======================================================
     GET SELECTED KIT FROM URL
  ======================================================= */

  const selectedKitParam =
    searchParams.get("kit");

  /*
   * If no kit is supplied,
   * Welcome Kit is used as the default.
   *
   * If a valid kit is supplied,
   * that kit is used.
   */

  const selectedKit: KitId =
    isValidKit(selectedKitParam)
      ? selectedKitParam
      : "welcome-kit";

  const kit =
    KIT_CONFIGS[selectedKit];

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOGIN
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const cleanEmail =
      email.trim();

    if (!cleanEmail) {
      setError(
        "Please enter your email address."
      );

      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );

      return;
    }

    setLoading(true);

    try {
      /* =================================================
         FIREBASE LOGIN
      ================================================= */

      await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      /* =================================================
         IMPORTANT:
         REDIRECT ACCORDING TO SELECTED KIT
      ================================================= */

      console.log(
        "Authenticated user:",
        cleanEmail
      );

      console.log(
        "Selected kit:",
        selectedKit
      );

      console.log(
        "Redirecting to:",
        kit.redirect
      );

      router.replace(
        kit.redirect
      );
    } catch (firebaseError: any) {
      console.error(
        "Network Ten login error:",
        firebaseError
      );

      let message =
        "Unable to sign in. Please check your email and password.";

      switch (
        firebaseError?.code
      ) {
        case "auth/invalid-credential":
          message =
            "Invalid email or password. Please try again.";
          break;

        case "auth/invalid-email":
          message =
            "Please enter a valid email address.";
          break;

        case "auth/user-not-found":
          message =
            "No account was found with this email address.";
          break;

        case "auth/wrong-password":
          message =
            "The password you entered is incorrect.";
          break;

        case "auth/too-many-requests":
          message =
            "Too many unsuccessful attempts. Please try again later.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        case "auth/user-disabled":
          message =
            "This account has been disabled. Please contact Network Ten.";
          break;

        default:
          message =
            "Unable to sign in. Please contact Network Ten.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function handleBack() {
    router.push(
      "/interior-design"
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #f5f7fb 0%, #eef2f7 50%, #f8fafc 100%)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        py: {
          xs: 3,
          md: 6,
        },

        px: {
          xs: 2,
          md: 3,
        },

        position: "relative",

        overflow: "hidden",
      }}
    >

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <Box
        sx={{
          position: "absolute",

          width: 420,
          height: 420,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.08)",

          top: -180,
          right: -120,

          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",

          width: 360,
          height: 360,

          borderRadius: "50%",

          background:
            "rgba(16,32,72,0.05)",

          bottom: -160,
          left: -120,

          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* ===================================================
            BACK BUTTON
        =================================================== */}

        <Button
          onClick={handleBack}
          startIcon={
            <ArrowBackRoundedIcon />
          }
          sx={{
            mb: 2.5,

            color: "#64748b",

            fontWeight: 700,

            "&:hover": {
              bgcolor:
                "rgba(16,32,72,0.05)",
            },
          }}
        >
          Back to Client Kits
        </Button>

        {/* ===================================================
            MAIN CARD
        =================================================== */}

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",

            borderRadius: 5,

            border:
              "1px solid #e4e9f0",

            background: "#fff",

            boxShadow:
              "0 25px 70px rgba(16,32,72,0.10)",
          }}
        >

          <Box
            sx={{
              display: {
                xs: "block",
                md: "grid",
              },

              gridTemplateColumns:
                "0.9fr 1.1fr",
            }}
          >

            {/* =================================================
                LEFT BRAND PANEL
            ================================================= */}

            <Box
              sx={{
                p: {
                  xs: 3,
                  md: 4.5,
                },

                color: "#fff",

                background:
                  "linear-gradient(145deg, #08111f 0%, #102048 65%, #182d57 100%)",

                minHeight: {
                  xs: "auto",
                  md: 600,
                },

                display: "flex",

                flexDirection: "column",

                justifyContent:
                  "space-between",

                position: "relative",

                overflow: "hidden",
              }}
            >

              {/* Decorative circles */}

              <Box
                sx={{
                  position: "absolute",

                  width: 230,
                  height: 230,

                  borderRadius: "50%",

                  border:
                    "1px solid rgba(139,197,63,0.15)",

                  right: -90,
                  top: -70,
                }}
              />

              <Box
                sx={{
                  position: "absolute",

                  width: 150,
                  height: 150,

                  borderRadius: "50%",

                  border:
                    "1px solid rgba(255,255,255,0.07)",

                  left: -80,
                  bottom: 70,
                }}
              />

              {/* Brand */}

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#8BC53F",

                    fontWeight: 900,

                    fontSize: "13px",

                    letterSpacing:
                      "0.24em",
                  }}
                >
                  NETWORK TEN
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    color:
                      "rgba(255,255,255,0.6)",

                    fontSize: "12px",

                    letterSpacing:
                      "0.05em",
                  }}
                >
                  connecting hopes...
                </Typography>
              </Box>

              {/* Main content */}

              <Box
                sx={{
                  position: "relative",

                  zIndex: 1,

                  mt: {
                    xs: 4,
                    md: 0,
                  },
                }}
              >
                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,0.55)",

                    fontSize: "12px",

                    fontWeight: 800,

                    letterSpacing:
                      "0.15em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  Interior Design Portal
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    mt: 1.5,

                    fontWeight: 900,

                    lineHeight: 1.1,

                    fontSize: {
                      xs: "2rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Your project.
                  <br />
                  Your space.
                  <br />

                  <Box
                    component="span"
                    sx={{
                      color: "#8BC53F",
                    }}
                  >
                    Your journey.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: 2.5,

                    color:
                      "rgba(255,255,255,0.7)",

                    lineHeight: 1.8,

                    fontSize: "14px",
                  }}
                >
                  Access your personalized
                  Network Ten interior design
                  documents securely through
                  the client portal.
                </Typography>
              </Box>

              {/* Security */}

              <Box
                sx={{
                  position: "relative",

                  zIndex: 1,

                  mt: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1.2,

                    color:
                      "rgba(255,255,255,0.65)",
                  }}
                >
                  <LockRoundedIcon
                    sx={{
                      fontSize: 17,

                      color: "#8BC53F",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Secure client access
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* =================================================
                RIGHT LOGIN PANEL
            ================================================= */}

            <Box
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
              }}
            >

              {/* =================================================
                  SELECTED KIT
              ================================================= */}

              <Box
                sx={{
                  p: 2,

                  borderRadius: 3,

                  background:
                    "linear-gradient(135deg, #f7faf3, #f1f7e9)",

                  border:
                    "1px solid rgba(139,197,63,0.22)",

                  display: "flex",

                  alignItems: "center",

                  gap: 1.5,

                  mb: 3,
                }}
              >

                <Box
                  sx={{
                    width: 46,
                    height: 46,

                    flexShrink: 0,

                    borderRadius: 2.5,

                    bgcolor: "#102048",

                    color: "#8BC53F",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    fontWeight: 900,

                    fontSize: "13px",
                  }}
                >
                  {kit.number}
                </Box>

                <Box
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "11px",

                      color: "#64748b",

                      fontWeight: 700,

                      textTransform:
                        "uppercase",

                      letterSpacing:
                        "0.08em",
                    }}
                  >
                    Selected Kit
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.2,

                      color: "#102048",

                      fontWeight: 900,

                      fontSize: "15px",
                    }}
                  >
                    {kit.title}
                  </Typography>
                </Box>

                <CheckCircleRoundedIcon
                  sx={{
                    ml: "auto",

                    color: "#8BC53F",

                    fontSize: 22,
                  }}
                />

              </Box>

              {/* =================================================
                  HEADING
              ================================================= */}

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#102048",

                    fontWeight: 900,

                    fontSize: {
                      xs: "1.8rem",
                      md: "2.15rem",
                    },
                  }}
                >
                  Welcome back
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    color: "#64748b",

                    fontSize: "14px",

                    lineHeight: 1.7,
                  }}
                >
                  Sign in to continue with{" "}

                  <Box
                    component="span"
                    sx={{
                      color: "#102048",

                      fontWeight: 800,
                    }}
                  >
                    {kit.title}
                  </Box>
                  .
                </Typography>
              </Box>

              <Divider
                sx={{
                  my: 3,
                }}
              />

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2.5,

                    borderRadius: 2.5,

                    fontSize: "13px",
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* =================================================
                  LOGIN FORM
              ================================================= */}

              <Box
                component="form"
                onSubmit={handleSubmit}
              >
                <Stack spacing={2.3}>

                  {/* EMAIL */}

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    autoComplete="email"
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root":
                        {
                          borderRadius: 2.5,

                          bgcolor:
                            "#f8fafc",

                          "&:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor:
                                "#102048",
                            },

                          "&.Mui-focused":
                            {
                              bgcolor:
                                "#fff",

                              boxShadow:
                                "0 0 0 3px rgba(16,32,72,0.06)",
                            },

                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor:
                                "#102048",

                              borderWidth:
                                "2px",
                            },
                        },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color:
                            "#102048",
                        },
                    }}
                  />

                  {/* PASSWORD */}

                  <TextField
                    fullWidth
                    required
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete="current-password"
                    disabled={loading}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() =>
                                setShowPassword(
                                  (previous) =>
                                    !previous
                                )
                              }
                              disabled={loading}
                              aria-label={
                                showPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showPassword ? (
                                <VisibilityOffRoundedIcon />
                              ) : (
                                <VisibilityRoundedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root":
                        {
                          borderRadius: 2.5,

                          bgcolor:
                            "#f8fafc",

                          "&:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor:
                                "#102048",
                            },

                          "&.Mui-focused":
                            {
                              bgcolor:
                                "#fff",

                              boxShadow:
                                "0 0 0 3px rgba(16,32,72,0.06)",
                            },

                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor:
                                "#102048",

                              borderWidth:
                                "2px",
                            },
                        },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color:
                            "#102048",
                        },
                    }}
                  />

                  {/* =================================================
                      LOGIN BUTTON
                  ================================================= */}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress
                          size={18}
                          sx={{
                            color:
                              "#102048",
                          }}
                        />
                      ) : (
                        <LoginRoundedIcon />
                      )
                    }
                    sx={{
                      mt: 0.5,

                      minHeight: 54,

                      borderRadius: 2.5,

                      bgcolor: "#8BC53F",

                      color: "#102048",

                      fontWeight: 900,

                      fontSize: "14px",

                      boxShadow:
                        "0 10px 25px rgba(139,197,63,0.22)",

                      "&:hover": {
                        bgcolor: "#102048",

                        color: "#fff",

                        boxShadow:
                          "0 12px 28px rgba(16,32,72,0.18)",
                      },

                      "&.Mui-disabled": {
                        bgcolor:
                          "#dce8cc",

                        color:
                          "#657255",
                      },
                    }}
                  >
                    {loading
                      ? "Signing In..."
                      : `Continue to ${kit.shortTitle}`}
                  </Button>

                </Stack>
              </Box>

              {/* =================================================
                  KIT INFORMATION
              ================================================= */}

              <Box
                sx={{
                  mt: 3,

                  p: 2.2,

                  borderRadius: 3,

                  bgcolor: "#f8fafc",

                  border:
                    "1px solid #e8edf3",
                }}
              >
                <Typography
                  sx={{
                    color: "#102048",

                    fontWeight: 800,

                    fontSize: "12px",
                  }}
                >
                  About this kit
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,

                    color: "#64748b",

                    fontSize: "12px",

                    lineHeight: 1.7,
                  }}
                >
                  {kit.description}
                </Typography>
              </Box>

              {/* =================================================
                  SECURITY NOTE
              ================================================= */}

              <Box
                sx={{
                  mt: 3,

                  display: "flex",

                  alignItems: "flex-start",

                  gap: 1.2,
                }}
              >
                <LockRoundedIcon
                  sx={{
                    fontSize: 18,

                    color: "#8BC53F",

                    mt: 0.1,
                  }}
                />

                <Typography
                  sx={{
                    color: "#94a3b8",

                    fontSize: "11px",

                    lineHeight: 1.6,
                  }}
                >
                  Your client information is
                  accessed through your
                  authenticated Network Ten
                  account.
                </Typography>
              </Box>

              {/* =================================================
                  CHANGE KIT
              ================================================= */}

              <Button
                onClick={handleBack}
                fullWidth
                endIcon={
                  <ArrowForwardRoundedIcon />
                }
                sx={{
                  mt: 3,

                  color: "#64748b",

                  fontWeight: 700,

                  fontSize: "12px",

                  "&:hover": {
                    bgcolor:
                      "#f8fafc",

                    color: "#102048",
                  },
                }}
              >
                Choose a different kit
              </Button>

            </Box>
          </Box>
        </Paper>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <Typography
          align="center"
          sx={{
            mt: 3,

            color: "#94a3b8",

            fontSize: "11px",
          }}
        >
          © {new Date().getFullYear()} Network Ten
          {" · "}
          Interior Design Client Portal
        </Typography>

      </Container>
    </Box>
  );
}

/* =========================================================
   PAGE WRAPPER

   useSearchParams() must remain inside Suspense
========================================================= */

export default function InteriorDesignLoginPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "100vh",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            bgcolor: "#f7f9fc",
          }}
        >
          <CircularProgress
            sx={{
              color: "#8BC53F",
            }}
          />
        </Box>
      }
    >
      <InteriorDesignLoginContent />
    </Suspense>
  );
}