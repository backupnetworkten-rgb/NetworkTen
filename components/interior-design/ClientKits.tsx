"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import { interiorKits } from "@/data/interiorKits";
import KitCard from "./KitCard";

export default function ClientKits() {
  const router = useRouter();

  function handleOpenKit(kitId: string) {
    const loginUrl =
      `/interior-design/login?kit=${encodeURIComponent(
        kitId
      )}`;

    console.log("Opening kit:", kitId);
    console.log("Login URL:", loginUrl);

    router.push(loginUrl);
  }

  return (
    <Box
      id="client-kits"
      component="section"
      sx={{
        py: {
          xs: 8,
          md: 12,
        },

        bgcolor: "#f7f9fc",
      }}
    >
      <Container maxWidth="xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <Box
          sx={{
            maxWidth: 850,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#6da82e",
              fontWeight: 800,
              letterSpacing: "0.25em",
            }}
          >
            SECURE CLIENT PORTAL
          </Typography>

          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontWeight: 800,
              color: "#102048",

              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Client Kits
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#64748b",
              lineHeight: 1.8,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            Access your Network Ten interior
            design documents and complete each
            stage of your project securely.
          </Typography>
        </Box>

        {/* =====================================================
            KIT CARDS
        ===================================================== */}

        <Grid
          container
          spacing={3}
          sx={{
            mt: 6,
          }}
        >
          {interiorKits.map((kit) => (
            <Grid
              key={kit.id}
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <KitCard
                kit={kit}
                onOpen={() =>
                  handleOpenKit(kit.id)
                }
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}