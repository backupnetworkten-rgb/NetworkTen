"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";

export default function EDesignSuccessPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        bgcolor: "#f7f9fc",

        px: 2,
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

            boxShadow:
              "0 20px 60px rgba(16,32,72,0.08)",
          }}
        >
          <Box
            sx={{
              width: 78,

              height: 78,

              mx: "auto",

              borderRadius: "50%",

              bgcolor: "#eff8e8",

              color: "#6da82e",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 46,
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              mt: 3,

              fontWeight: 800,

              color: "#102048",
            }}
          >
            E-Design Contract Generated
          </Typography>

          <Typography
            sx={{
              mt: 2,

              color: "#64748b",

              lineHeight: 1.8,
            }}
          >
            Your Network Ten E-Design Contract
            PDF has been generated successfully.
            Please keep a copy of the document
            for your records.
          </Typography>

          <Button
            startIcon={
              <ArrowBackIcon />
            }
            variant="contained"
            onClick={() =>
              router.push(
                "/interior-design"
              )
            }
            sx={{
              mt: 4,

              bgcolor: "#102048",

              borderRadius: 2.5,

              py: 1.3,

              px: 3,

              fontWeight: 800,

              "&:hover": {
                bgcolor: "#8BC53F",

                color: "#102048",
              },
            }}
          >
            Back to Client Kits
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}