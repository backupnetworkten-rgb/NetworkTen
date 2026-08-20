"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const stages = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Consultation, site analysis, project briefing and understanding your lifestyle, needs and preferences.",
  },
  {
    number: "02",
    title: "Concept Development",
    description:
      "Mood boards, colour palettes, materials and initial 3D concepts are developed for approval.",
  },
  {
    number: "03",
    title: "Design Development",
    description:
      "Technical drawings, plans, elevations, BOQ and detailed specifications are developed.",
  },
  {
    number: "04",
    title: "Pre-Execution Planning",
    description:
      "Vendor coordination, material selection, procurement support and project scheduling.",
  },
  {
    number: "05",
    title: "Execution & Site Management",
    description:
      "Quality control, progress monitoring and coordination during project execution.",
  },
  {
    number: "06",
    title: "Completion & Handover",
    description:
      "Final styling, inspection, documentation and project handover.",
  },
];

export default function DesignProcess() {
  return (
    <Box
      id="design-process"
      component="section"
      sx={{
        bgcolor: "#f7f9fc",
        py: {
          xs: 8,
          md: 12,
        },
      }}
    >
      <Container maxWidth="xl">

        <Box
          sx={{
            maxWidth: 800,
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
            NETWORK TEN
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
            Our 6-Stage Design Process
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#64748b",
              lineHeight: 1.8,
            }}
          >
            A structured process helps us maintain clarity,
            communication and quality from consultation to
            handover.
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{ mt: 6 }}
        >
          {stages.map((stage) => (
            <Grid
              key={stage.number}
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: 3.5,
                  bgcolor: "#fff",
                  borderRadius: 4,
                  border:
                    "1px solid #e5eaf0",
                  transition:
                    "all .3s ease",
                  "&:hover": {
                    transform:
                      "translateY(-6px)",
                    boxShadow:
                      "0 18px 45px rgba(16,32,72,0.10)",
                    borderColor:
                      "#8BC53F",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "#8BC53F",
                    fontWeight: 900,
                    fontSize: "2.5rem",
                  }}
                >
                  {stage.number}
                </Typography>

                <Box
                  sx={{
                    width: 45,
                    height: 4,
                    bgcolor: "#8BC53F",
                    borderRadius: 2,
                    my: 2,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    color: "#102048",
                    fontWeight: 800,
                  }}
                >
                  {stage.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    color: "#64748b",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                  }}
                >
                  {stage.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}