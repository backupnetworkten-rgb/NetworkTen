"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase/client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function InteriorDesignLoginPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  /*
   * -------------------------------------------------------
   * SELECTED KIT
   * -------------------------------------------------------
   *
   * Examples:
   *
   * /interior-design/login?kit=welcome-kit
   *
   * /interior-design/login?kit=client-discovery-kit
   */

  const selectedKit =
    searchParams.get("kit") ||
    "welcome-kit";

  /*
   * -------------------------------------------------------
   * KIT INFORMATION
   * -------------------------------------------------------
   */

  const isDiscoveryKit =
    selectedKit ===
    "client-discovery-kit";

  const kitTitle = isDiscoveryKit
    ? "Client Discovery Kit"
    : "Welcome Kit";

  /*
   * -------------------------------------------------------
   * STATE
   * -------------------------------------------------------
   */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * -------------------------------------------------------
   * LOGIN
   * -------------------------------------------------------
   */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
       * Firebase Authentication
       */

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      /*
       * ---------------------------------------------------
       * IMPORTANT ROUTING
       * ---------------------------------------------------
       *
       * Send the client to the kit they selected.
       */

      if (isDiscoveryKit) {
        router.replace(
          "/interior-design/kits/discovery"
        );
      } else {
        router.replace(
          "/interior-design/kits/welcome"
        );
      }
    } catch (error: unknown) {
      console.error(
        "Network Ten login error:",
        error
      );

      const firebaseError =
        error as {
          code?: string;
        };

      switch (
        firebaseError?.code
      ) {
        case "auth/invalid-credential":

        case "auth/wrong-password":

        case "auth/user-not-found":
          setError(
            "Invalid email or password."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many unsuccessful attempts. Please try again later."
          );
          break;

        case "auth/user-disabled":
          setError(
            "This client account has been disabled. Please contact Network Ten."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection and try again."
          );
          break;

        default:
          setError(
            "Unable to sign in. Please contact Network Ten."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  /*
   * -------------------------------------------------------
   * BACK
   * -------------------------------------------------------
   */

  function handleBack() {
    router.push(
      "/interior-design#client-kits"
    );
  }

  /*
   * -------------------------------------------------------
   * UI
   * -------------------------------------------------------
   */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        position: "relative",

        overflow: "hidden",

        px: 2,

        py: 6,

        background:
          "linear-gradient(135deg, #08111f 0%, #102048 60%, #182d57 100%)",

        "&::before": {
          content: '""',

          position: "absolute",

          width: 500,
          height: 500,

          borderRadius: "50%",

          border:
            "1px solid rgba(139,197,63,0.12)",

          top: -250,
          right: -200,
        },

        "&::after": {
          content: '""',

          position: "absolute",

          width: 400,
          height: 400,

          borderRadius: "50%",

          border:
            "1px solid rgba(255,255,255,0.06)",

          bottom: -220,
          left: -200,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },

            borderRadius: 5,

            background:
              "rgba(255,255,255,0.98)",

            boxShadow:
              "0 30px 80px rgba(0,0,0,0.28)",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <Box
            sx={{
              textAlign: "center",
            }}
          >
            {/* ICON */}

            <Box
              sx={{
                mx: "auto",

                width: 70,
                height: 70,

                borderRadius: 3.5,

                bgcolor: "#102048",

                color: "#8BC53F",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                boxShadow:
                  "0 12px 30px rgba(16,32,72,0.18)",
              }}
            >
              <LockIcon
                sx={{
                  fontSize: 32,
                }}
              />
            </Box>

            {/* BRAND */}

            <Typography
              variant="overline"
              sx={{
                display: "block",

                mt: 3,

                color: "#6da82e",

                fontWeight: 900,

                letterSpacing:
                  "0.25em",
              }}
            >
              NETWORK TEN
            </Typography>

            {/* TITLE */}

            <Typography
              variant="h4"
              sx={{
                mt: 1,

                fontWeight: 800,

                color: "#102048",

                fontSize: {
                  xs: "1.8rem",
                  sm: "2.1rem",
                },
              }}
            >
              Client Portal
            </Typography>

            <Typography
              sx={{
                mt: 1.2,

                color: "#64748b",

                lineHeight: 1.7,

                maxWidth: 430,

                mx: "auto",
              }}
            >
              Sign in to access your
              authorized Network Ten
              interior design kit.
            </Typography>
          </Box>

          {/* =================================================
              SELECTED KIT
          ================================================= */}

          <Box
            sx={{
              mt: 3,

              p: 2,

              borderRadius: 3,

              bgcolor:
                "rgba(139,197,63,0.08)",

              border:
                "1px solid rgba(139,197,63,0.20)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.68rem",

                fontWeight: 900,

                letterSpacing:
                  "0.15em",

                textTransform:
                  "uppercase",

                color: "#6da82e",
              }}
            >
              Accessing
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontWeight: 800,

                color: "#102048",
              }}
            >
              {kitTitle}
            </Typography>
          </Box>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 3,

                borderRadius: 2.5,
              }}
            >
              {error}
            </Alert>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,

              display: "flex",

              flexDirection: "column",

              gap: 2.5,
            }}
          >
            {/* EMAIL */}

            <TextField
              fullWidth
              required
              type="email"
              label="Email Address"
              placeholder="client@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    borderRadius: 2.5,
                  },
              }}
            />

            {/* PASSWORD */}

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    borderRadius: 2.5,
                  },
              }}
            />

            {/* LOGIN */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={
                <LoginIcon />
              }
              sx={{
                minHeight: 52,

                borderRadius: 2.5,

                bgcolor: "#102048",

                color: "#fff",

                fontWeight: 800,

                fontSize: "0.95rem",

                boxShadow:
                  "0 10px 25px rgba(16,32,72,0.18)",

                "&:hover": {
                  bgcolor: "#8BC53F",

                  color: "#102048",
                },

                "&.Mui-disabled": {
                  bgcolor: "#cbd5e1",

                  color: "#64748b",
                },
              }}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </Button>
          </Box>

          {/* =================================================
              BACK
          ================================================= */}

          <Box
            sx={{
              mt: 3,

              display: "flex",

              justifyContent: "center",
            }}
          >
            <Button
              startIcon={
                <ArrowBackIcon />
              }
              onClick={handleBack}
              sx={{
                color: "#64748b",

                fontWeight: 700,

                borderRadius: 2,

                "&:hover": {
                  color: "#102048",

                  bgcolor:
                    "rgba(16,32,72,0.04)",
                },
              }}
            >
              Back to Client Kits
            </Button>
          </Box>

          {/* =================================================
              FOOTER
          ================================================= */}

          <Typography
            sx={{
              mt: 3,

              textAlign: "center",

              fontSize: "0.75rem",

              color: "#94a3b8",
            }}
          >
            Secure Client Access · Network Ten
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}