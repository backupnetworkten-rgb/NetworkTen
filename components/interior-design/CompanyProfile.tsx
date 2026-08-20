"use client";

import {
  Box,
  Button,
  Container,
  Paper,
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
        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 7fr) minmax(0, 5fr)",
            },
            gap: {
              xs: 5,
              md: 8,
            },
            alignItems: "center",
          }}
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* BRAND */}

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

              {/* TITLE */}

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
                  m: 0,
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

              {/* DESCRIPTION */}

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
                Welcome to Network Ten Interior Design.
                This secure client portal gives approved
                clients access to project resources,
                consultation forms and project
                documentation.
              </Typography>

              {/* BUTTONS */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: 2,
                  mt: 1,
                }}
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
                    minHeight: 50,

                    "&:hover": {
                      bgcolor: "#fff",
                      color: "#102048",
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
                    minHeight: 50,

                    "&:hover": {
                      borderColor: "#8BC53F",
                      bgcolor:
                        "rgba(139,197,63,0.08)",
                    },
                  }}
                >
                  Our Process
                </Button>
              </Box>
            </Box>
          </Box>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

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
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* BRAND */}

            <Typography
              variant="overline"
              sx={{
                color: "#8BC53F",
                fontWeight: 800,
                letterSpacing: "0.18em",
              }}
            >
              NETWORK TEN
            </Typography>

            {/* HEADING */}

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 800,
                lineHeight: 1.2,
                fontSize: {
                  xs: "1.8rem",
                  md: "2.2rem",
                },
              }}
            >
              Designing spaces that work for you.
            </Typography>

            {/* DESCRIPTION */}

            <Typography
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
              }}
            >
              Every successful project begins with
              understanding your requirements,
              lifestyle, budget and vision.
            </Typography>

            {/* =================================================
                SERVICES
            ================================================== */}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                },
                gap: 1.5,
                mt: 3,
              }}
            >
              {services.map((service) => (
                <Box
                  key={service.title}
                  sx={{
                    p: 2,
                    minHeight: 110,
                    borderRadius: 3,
                    background:
                      "rgba(255,255,255,0.07)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    transition:
                      "all 0.25s ease",

                    "&:hover": {
                      background:
                        "rgba(139,197,63,0.10)",
                      borderColor:
                        "rgba(139,197,63,0.35)",
                      transform:
                        "translateY(-3px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "#8BC53F",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {service.icon}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}