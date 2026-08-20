"use client";

import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const packages = [
  {
    number: "01",
    title: "DESIGN",
    price: "₹150 – ₹250 / sq ft",
    features: [
      "Design concept and mood boards",
      "2D floor plan and space planning",
      "Material and colour palette selection",
      "BOQ and vendor recommendations",
      "No site visits or execution management",
    ],
  },
  {
    number: "02",
    title: "DESIGN PLUS",
    price: "₹300 – ₹400 / sq ft",
    features: [
      "Everything included in Package 01",
      "3D renders",
      "Detailed working drawings",
      "1 revision round",
      "Vendor coordination support",
    ],
  },
  {
    number: "03",
    title: "DESIGN & SUPERVISION",
    price: "₹400 – ₹550 / sq ft",
    features: [
      "Everything included in Package 01 & 02",
      "Unlimited 3D revision until approval",
      "Site visits during execution",
      "Progress reports and photo updates",
      "Quality checks at key milestones",
    ],
  },
  {
    number: "04",
    title: "TURNKEY SOLUTION",
    price: "₹600 – ₹1,200 / sq ft",
    features: [
      "Full end-to-end design and execution management",
      "Drawings, BOQ and specifications",
      "Procurement and vendor management",
      "Weekly site visits and quality control",
      "Styling, photography and final handover",
    ],
  },
];

export default function ServicePackages() {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 8,
          md: 12,
        },
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="xl">

        <Box
          sx={{
            maxWidth: 750,
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
            CHOOSE YOUR SERVICE
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
            Interior Design Packages
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#64748b",
              lineHeight: 1.8,
            }}
          >
            Choose the level of service that best matches
            your project requirements.
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{ mt: 6 }}
        >
          {packages.map((pkg) => (
            <Grid
              key={pkg.number}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: {
                    xs: 3,
                    md: 4,
                  },
                  borderRadius: 4,
                  border:
                    "1px solid #e5eaf0",
                  bgcolor: "#fff",
                  boxShadow:
                    "0 8px 30px rgba(16,32,72,0.05)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    boxShadow:
                      "0 20px 50px rgba(16,32,72,0.10)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#8BC53F",
                        fontWeight: 900,
                      }}
                    >
                      PACKAGE {pkg.number}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#102048",
                      }}
                    >
                      {pkg.title}
                    </Typography>
                  </Box>

                  <Chip
                    label={pkg.price}
                    sx={{
                      bgcolor: "#f0f7e9",
                      color: "#4d761e",
                      fontWeight: 800,
                    }}
                  />
                </Box>

                <Box sx={{ mt: 3 }}>
                  {pkg.features.map(
                    (feature) => (
                      <Box
                        key={feature}
                        sx={{
                          display: "flex",
                          gap: 1.2,
                          mb: 1.5,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{
                            fontSize: 20,
                            color: "#8BC53F",
                            mt: 0.2,
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.6,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}