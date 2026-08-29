"use client";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const projects = [
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=80",
    title: "Executive Boardroom",
    category: "Corporate",
    area: "hero",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1000&q=80",
    title: "Premium Presentation Room",
    category: "AV Integration",
    area: "tall",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    title: "Modern Meeting Room",
    category: "Collaboration",
    area: "small1",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    title: "Video Conference Setup",
    category: "Video Conferencing",
    area: "small2",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    title: "Smart Meeting Space",
    category: "Smart Automation",
    area: "small3",
  },
  {
    // TODO: replace with your own project photo
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1400&q=80",
    title: "Enterprise Conference Room",
    category: "Enterprise",
    area: "wide",
  },
];

type Project = (typeof projects)[number];

function ProjectTile({
  project,
  index,
  minHeight,
}: {
  project: Project;
  index: number;
  minHeight: number;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        minHeight,
        width: "100%",
        borderRadius: "22px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#e8ecf0",
        boxShadow: "0 1px 2px rgba(7,21,47,.04)",
        transition: "box-shadow .35s ease",

        "& img": {
          transition: "transform .7s cubic-bezier(.2,.8,.2,1)",
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

      {/* index badge, top-left */}
      <Box
        sx={{
          position: "absolute",
          top: 18,
          left: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          py: 0.5,
          borderRadius: "999px",
          backgroundColor: "rgba(6,20,43,.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </Box>

      {/* view arrow, appears on hover */}
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
          transition: "opacity .3s ease, transform .3s ease",
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
          transform: { xs: "translateY(0)", md: "translateY(12px)" },
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
  );
}

export default function ConferenceGallery() {
  const [hero, tall, small1, small2, small3, wide] = projects;

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0.75,
              }}
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
            </Box>

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

        {/* BENTO GRID — plain CSS grid, no MUI Grid/Stack dependency */}
        <Box
          sx={{
            display: "grid",
            gap: 2.5,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.3fr 0.85fr 0.85fr",
            },
            gridTemplateAreas: {
              xs: `
                "hero"
                "tall"
                "small1"
                "small2"
                "small3"
                "wide"
              `,
              sm: `
                "hero hero"
                "tall small1"
                "tall small2"
                "wide wide"
                "small3 small3"
              `,
              md: `
                "hero hero tall"
                "small1 small2 tall"
                "wide wide wide"
              `,
            },
            gridAutoRows: { xs: "auto", md: "170px" },
          }}
        >
          <Box sx={{ gridArea: "hero" }}>
            <ProjectTile project={hero} index={0} minHeight={320} />
          </Box>
          <Box sx={{ gridArea: "tall" }}>
            <ProjectTile project={tall} index={1} minHeight={320} />
          </Box>
          <Box sx={{ gridArea: "small1" }}>
            <ProjectTile project={small1} index={2} minHeight={260} />
          </Box>
          <Box sx={{ gridArea: "small2" }}>
            <ProjectTile project={small2} index={3} minHeight={260} />
          </Box>
          <Box sx={{ gridArea: "small3" }}>
            <ProjectTile project={small3} index={4} minHeight={260} />
          </Box>
          <Box sx={{ gridArea: "wide" }}>
            <ProjectTile project={wide} index={5} minHeight={260} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}