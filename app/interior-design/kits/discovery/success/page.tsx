"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useRouter } from "next/navigation";

export default function DiscoverySuccessPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#f8fafc,#ffffff)",
        display: "flex",
        alignItems: "center",
        py: 5,
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
          <Box
            sx={{
              width: 82,
              height: 82,
              mx: "auto",
              borderRadius: "50%",
              bgcolor:
                "rgba(139,197,63,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 52,
                color: "#8BC53F",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              mt: 3,
              fontWeight: 900,
              color: "#102048",
            }}
          >
            Discovery Kit Submitted
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#64748b",
              lineHeight: 1.8,
            }}
          >
            Thank you for completing your
            Client Discovery Kit. Your
            information has been securely
            submitted to Network Ten.
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: "#64748b",
              fontSize: 14,
            }}
          >
            Your Client Discovery PDF has
            also been generated and downloaded.
          </Typography>

          <Stack
            spacing={1.5}
            sx={{
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                router.push(
                  "/interior-design"
                )
              }
              sx={{
                py: 1.4,
                borderRadius: 2.5,
                bgcolor: "#102048",
                fontWeight: 800,
                "&:hover": {
                  bgcolor: "#172d5b",
                },
              }}
            >
              Back to Client Dashboard
            </Button>

            <Button
              startIcon={
                <ArrowBackRoundedIcon />
              }
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