"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ConstructionIcon from "@mui/icons-material/Construction";

const services = [
  {
    icon: <DesignServicesIcon />,
    title: "Interior Design",
  },
  {
    icon: <ArchitectureIcon />,
    title: "Space Planning",
  },
  {
    icon: <HomeWorkIcon />,
    title: "Material Guidance",
  },
  {
    icon: <ConstructionIcon />,
    title: "Project Support",
  },
];

export default function CompanyProfile() {
  return (
    <Box
      component="section"
      sx={{
        background:
          "linear-gradient(135deg, #08111f 0%, #102048 55%, #182d57 100%)",
        color: "#fff",
        py: {
          xs: 8,
          md: 12,
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{
            xs: 5,
            md: 8,
          }}
          alignItems="center"
        >
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>

              <Typography
                variant="overline"
                sx={{
                  color: "#8BC53F",
                  fontWeight: 800,
                  letterSpacing: "0.25em",
                }}
              >
                NETWORK TEN
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2.6rem",
                    sm: "3.5rem",
                    md: "4.5rem",
                  },
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Interior Design
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "#8BC53F",
                  }}
                >
                  Client Portal
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: 700,
                  color: "rgba(255,255,255,0.75)",
                  fontSize: {
                    xs: "1rem",
                    md: "1.15rem",
                  },
                  lineHeight: 1.8,
                }}
              >
                Welcome to Network Ten Interior Design. This
                secure client portal gives approved clients
                access to project resources, consultation forms
                and project documentation.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Button
                  href="#client-kits"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#8BC53F",
                    color: "#102048",
                    px: 3,
                    py: 1.4,
                    borderRadius: 3,
                    fontWeight: 800,
                    "&:hover": {
                      bgcolor: "#fff",
                    },
                  }}
                >
                  Explore Client Kits
                </Button>

                <Button
                  href="#design-process"
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor:
                      "rgba(255,255,255,0.35)",
                    px: 3,
                    py: 1.4,
                    borderRadius: 3,
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: "#8BC53F",
                      bgcolor:
                        "rgba(139,197,63,0.08)",
                    },
                  }}
                >
                  Our Process
                </Button>
              </Stack>

            </Stack>
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
                borderRadius: 5,
                background:
                  "rgba(255,255,255,0.07)",
                border:
                  "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#8BC53F",
                  fontWeight: 800,
                }}
              >
                NETWORK TEN
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Designing spaces that work for you.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                }}
              >
                Every successful project begins with understanding
                your requirements, lifestyle, budget and vision.
              </Typography>

              <Grid
                container
                spacing={1.5}
                sx={{ mt: 2 }}
              >
                {services.map((service) => (
                  <Grid
                    key={service.title}
                    size={{ xs: 6 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        minHeight: 110,
                        borderRadius: 3,
                        background:
                          "rgba(255,255,255,0.07)",
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          color: "#8BC53F",
                          mb: 1,
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}