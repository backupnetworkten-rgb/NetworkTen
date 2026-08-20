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

import { useRouter } from "next/navigation";

export default function InteriorDesignLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      router.push(
        "/interior-design/kits/welcome"
      );
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #08111f 0%, #102048 60%, #182d57 100%)",
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
                  letterSpacing: "0.25em",
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
                Sign in to access your authorized
                interior design kit.
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

              </Stack>
            </Box>

            {/* BACK BUTTON */}

            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() =>
                router.push(
                  "/interior-design"
                )
              }
              sx={{
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              Back to Network Ten
            </Button>

          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}