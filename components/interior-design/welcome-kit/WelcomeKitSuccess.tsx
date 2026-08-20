"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";

export default function WelcomeKitSuccess() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 4,
              md: 6,
            },
            borderRadius: 5,
            textAlign: "center",
            border:
              "1px solid #e5eaf0",
          }}
        >
          <Stack
            spacing={2}
            alignItems="center"
          >

            <Box
              sx={{
                width: 85,
                height: 85,
                borderRadius: "50%",
                bgcolor: "#eff8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 52,
                  color: "#6da82e",
                }}
              />
            </Box>

            <Typography
              variant="overline"
              sx={{
                mt: 2,
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
                fontWeight: 800,
                color: "#102048",
              }}
            >
              Welcome Kit Submitted
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
              }}
            >
              Thank you for completing your
              Network Ten Interior Design
              Welcome Kit.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
              }}
            >
              Your personalized PDF has been
              generated and downloaded.
            </Typography>

            <Button
              variant="contained"
              startIcon={
                <ArrowBackIcon />
              }
              onClick={() =>
                router.push(
                  "/interior-design"
                )
              }
              sx={{
                mt: 2,
                px: 3,
                py: 1.3,
                borderRadius: 2.5,
                bgcolor: "#102048",
                fontWeight: 800,
                "&:hover": {
                  bgcolor: "#8BC53F",
                  color: "#102048",
                },
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