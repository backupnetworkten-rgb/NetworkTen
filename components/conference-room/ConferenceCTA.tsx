"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function ConferenceCTA() {
  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        background: "#f7f8fa",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: "25px", md: "38px" },
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 8 },
            border: "1px solid rgba(255,255,255,.06)",
            background:
              "linear-gradient(135deg,#07152f 0%,#0a2542 55%,#073b39 100%)",
            boxShadow: "0 50px 100px rgba(6,20,43,.35)",
          }}
        >
          {/* primary glow */}
          <Box
            sx={{
              position: "absolute",
              width: 500,
              height: 500,
              right: -180,
              top: -220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(64,228,168,.3),transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* secondary glow, bottom-left, adds depth */}
          <Box
            sx={{
              position: "absolute",
              width: 360,
              height: 360,
              left: -140,
              bottom: -180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(56,120,255,.16),transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* subtle grid texture */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.4,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 75% 20%, black 20%, transparent 75%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: 850,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#65e7b2",
                  boxShadow: "0 0 8px rgba(101,231,178,.8)",
                }}
              />
              <Typography
                sx={{
                  color: "#65e7b2",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".15em",
                }}
              >
                READY TO BUILD?
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 2,
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: 36, md: 58 },
                lineHeight: 1.03,
                letterSpacing: "-.045em",
              }}
            >
              Let's build a room
              <br />
              your team loves to use.
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                color: "rgba(255,255,255,.65)",
                fontSize: 16,
                lineHeight: 1.75,
                maxWidth: 650,
              }}
            >
              Tell us about your space and we'll help you design the
              right conference solution for your business.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                href="/contact"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 54,
                  px: 3,
                  borderRadius: "14px",
                  background: "#fff",
                  color: "#07152f",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: 15,
                  boxShadow: "0 14px 35px rgba(0,0,0,.2)",
                  transition: "transform .2s ease, box-shadow .2s ease",
                  "&:hover": {
                    background: "#edf5f2",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 42px rgba(0,0,0,.28)",
                  },
                }}
              >
                Request a Consultation
              </Button>

              <Button
                href="tel:+919999999999"
                variant="outlined"
                startIcon={<PhoneRoundedIcon />}
                sx={{
                  minHeight: 54,
                  px: 3,
                  borderRadius: "14px",
                  borderColor: "rgba(255,255,255,.25)",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  backgroundColor: "rgba(255,255,255,.04)",
                  backdropFilter: "blur(8px)",
                  transition: "border-color .2s ease, background-color .2s ease, transform .2s ease",
                  "&:hover": {
                    borderColor: "#fff",
                    background: "rgba(255,255,255,.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Talk to Our Team
              </Button>
            </Stack>

            {/* contact info strip */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.5, sm: 4 }}
              sx={{
                mt: { xs: 4.5, md: 5.5 },
                pt: { xs: 3.5, md: 4 },
                borderTop: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <MailOutlineRoundedIcon
                  sx={{ fontSize: 18, color: "#65e7b2" }}
                />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.75)",
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  info@networkten.in
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneRoundedIcon sx={{ fontSize: 18, color: "#65e7b2" }} />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.75)",
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  +91 8687878755
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeRoundedIcon
                  sx={{ fontSize: 18, color: "#65e7b2" }}
                />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.75)",
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  Response within 24 hours
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}