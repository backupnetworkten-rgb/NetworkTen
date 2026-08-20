import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AccessDeniedPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f7f9fc",
        px: 2,
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
            border: "1px solid #e5eaf0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* LOCK ICON */}

            <Box
              sx={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                bgcolor: "#fff1f1",
                color: "#d32f2f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <LockIcon
                sx={{
                  fontSize: 35,
                }}
              />
            </Box>

            {/* BRAND */}

            <Typography
              variant="overline"
              sx={{
                color: "#6da82e",
                fontWeight: 900,
                letterSpacing: "0.2em",
                mt: 1,
              }}
            >
              NETWORK TEN
            </Typography>

            {/* TITLE */}

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#102048",
                mt: 0.5,
              }}
            >
              Access Restricted
            </Typography>

            {/* DESCRIPTION */}

            <Typography
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
                maxWidth: 480,
                mt: 1,
              }}
            >
              Your account does not currently
              have access to the Network Ten
              Interior Design Client Portal.
            </Typography>

            {/* SECONDARY DESCRIPTION */}

            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                maxWidth: 440,
                mt: 0.5,
              }}
            >
              Please contact Network Ten if you
              believe you should have access.
            </Typography>

            {/* BACK BUTTON */}

            <Button
              href="/interior-design"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                width: "100%",
                mt: 2,
                bgcolor: "#102048",
                color: "#ffffff",
                borderRadius: 2.5,
                px: 3,
                py: 1.5,
                fontWeight: 800,
                fontSize: "0.95rem",
                textTransform: "uppercase",

                "&:hover": {
                  bgcolor: "#8BC53F",
                  color: "#102048",
                },
              }}
            >
              Back to Company Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}