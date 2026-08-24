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
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const searchParams =
    useSearchParams();

  /*
   * Determine which kit the client
   * selected before coming to login.
   *
   * Examples:
   *
   * ?kit=welcome-kit
   *
   * ?kit=client-discovery-kit
   */

  const selectedKit =
    searchParams.get("kit");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * Human-readable kit name
   */

  const kitTitle =
    selectedKit ===
    "client-discovery-kit"
      ? "Client Discovery Kit"
      : "Welcome Kit";

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      /*
       * IMPORTANT:
       *
       * Redirect according to the kit
       * selected before login.
       */

      if (
        selectedKit ===
        "client-discovery-kit"
      ) {
        router.push(
          "/interior-design/kits/discovery"
        );
      } else {
        router.push(
          "/interior-design/kits/welcome"
        );
      }

    } catch (error: any) {
      console.error(
        "Network Ten login error:",
        error
      );

      switch (error?.code) {
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
   * Return to the Client Kits section.
   */

  function handleBack() {
    router.push(
      "/interior-design#client-kits"
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background:
          "radial-gradient(circle at 20% 20%, rgba(139,197,63,0.10), transparent 30%), linear-gradient(135deg, #08111f 0%, #102048 60%, #182d57 100%)",

        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },

            borderRadius: 5,

            boxShadow:
              "0 30px 80px rgba(0,0,0,0.25)",
          }}
        >
          <Stack spacing={3}>

            {/* HEADER */}

            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mx: "auto",

                  width: 64,
                  height: 64,

                  borderRadius: 3,

                  bgcolor: "#102048",
                  color: "#8BC53F",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  boxShadow:
                    "0 15px 30px rgba(16,32,72,0.18)",
                }}
              >
                <LockIcon
                  sx={{
                    fontSize: 30,
                  }}
                />
              </Box>

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

              <Typography
                variant="h4"
                sx={{
                  mt: 1,

                  fontWeight: 800,

                  color: "#102048",
                }}
              >
                Client Portal
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  color: "#64748b",

                  lineHeight: 1.7,
                }}
              >
                Sign in to access your
                authorized{" "}
                {kitTitle}.
              </Typography>
            </Box>

            {/* SELECTED KIT */}

            <Box
              sx={{
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
                  fontSize: 10,

                  fontWeight: 900,

                  color: "#6da82e",

                  letterSpacing:
                    "0.15em",

                  textTransform:
                    "uppercase",
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

            {/* ERROR */}

            {error && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {/* LOGIN FORM */}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2.5}>

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
                />

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
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"

                  disabled={loading}

                  sx={{
                    py: 1.5,

                    borderRadius: 2.5,

                    bgcolor: "#102048",

                    fontWeight: 800,

                    fontSize: "1rem",

                    "&:hover": {
                      bgcolor:
                        "#8BC53F",
                      color:
                        "#102048",
                    },

                    "&.Mui-disabled": {
                      bgcolor:
                        "#cbd5e1",
                      color:
                        "#64748b",
                    },
                  }}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </Button>

              </Stack>
            </Box>

            {/* BACK */}

            <Button
              startIcon={
                <ArrowBackIcon />
              }

              onClick={handleBack}

              sx={{
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              Back to Client Kits
            </Button>

          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}