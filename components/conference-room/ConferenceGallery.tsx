"use client";

import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const projects = [
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    title: "Executive Boardroom",
    category: "Corporate",
    size: "large",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    title: "Modern Meeting Room",
    category: "Collaboration",
    size: "normal",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    title: "Video Conference Setup",
    category: "Video Conferencing",
    size: "normal",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
    title: "Premium Presentation Room",
    category: "AV Integration",
    size: "large",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    title: "Smart Meeting Space",
    category: "Smart Automation",
    size: "normal",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=900&q=80",
    title: "Enterprise Conference Room",
    category: "Enterprise",
    size: "normal",
  },
];

export default function ConferenceGallery() {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 9, md: 14 },
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* soft decorative backdrop */}
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: -160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(16,168,117,.06),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 3,
            mb: { xs: 5, md: 7 },
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.75}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10a875",
                }}
              />
              <Typography
                sx={{
                  color: "#10a875",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".16em",
                }}
              >
                OUR WORK
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 1.5,
                fontSize: { xs: 36, md: 55 },
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-.045em",
              }}
            >
              Rooms we've
              <br />
              <Box component="span" sx={{ color: "#10a875" }}>
                brought to life.
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              maxWidth: 340,
              color: "#667085",
              fontSize: 15,
              lineHeight: 1.75,
              pb: 1,
            }}
          >
            A selection of recent installations across corporate,
            enterprise and hybrid collaboration environments.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {projects.map((project, index) => (
            <Grid
              key={project.title}
              size={{
                xs: 12,
                sm: 6,
                md: project.size === "large" ? 6 : 3,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: {
                    xs: 300,
                    sm: 340,
                    md: project.size === "large" ? 440 : 340,
                  },
                  width: "100%",
                  borderRadius: "22px",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#e8ecf0",
                  boxShadow: "0 1px 2px rgba(7,21,47,.04)",
                  transition: "box-shadow .35s ease",

                  "& img": {
                    transition:
                      "transform .7s cubic-bezier(.2,.8,.2,1)",
                  },

                  "&:hover": {
                    boxShadow: "0 30px 60px rgba(7,21,47,.16)",
                  },

                  "&:hover img": {
                    transform: "scale(1.07)",
                  },

                  "&:hover .project-overlay": {
                    opacity: 1,
                  },

                  "&:hover .project-content": {
                    transform: "translateY(0)",
                  },

                  "&:hover .project-cta": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* index number, top-left */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.75}
                  sx={{
                    position: "absolute",
                    top: 18,
                    left: 20,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: "999px",
                    backgroundColor: "rgba(6,20,43,.4)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                </Stack>

                {/* view project pill, top-right, appears on hover (desktop) */}
                <Box
                  className="project-cta"
                  sx={{
                    position: "absolute",
                    top: 18,
                    right: 20,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    color: "#07152f",
                    opacity: 0,
                    transform: "translateY(-6px)",
                    transition:
                      "opacity .3s ease, transform .3s ease",
                    boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                  }}
                >
                  <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
                </Box>

                <Box
                  className="project-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: { xs: 1, md: 0 },
                    transition: "opacity .35s ease",
                    background:
                      "linear-gradient(180deg,transparent 35%,rgba(0,0,0,.82))",
                  }}
                />

                <Box
                  className="project-content"
                  sx={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: 22,
                    color: "#fff",
                    transform: {
                      xs: "translateY(0)",
                      md: "translateY(12px)",
                    },
                    transition: "transform .35s ease",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: ".13em",
                      color: "#7cf0bc",
                    }}
                  >
                    {project.category}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.8,
                      fontSize: 20,
                      fontWeight: 750,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}