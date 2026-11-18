
"use client";

import Image from "next/image";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import {
  LocationOnOutlined,
  ArrowOutward,
  NorthEast,
} from "@mui/icons-material";

const projects = [
  {
    id: "01",
    title: "Intelligence Bureau",
    location: "Dehradun, Uttarakhand",
    category: "Government Project",
    image: "/images/interior-design/projects/intelligence-bureau.png",
    description:
      "A professional institutional interior project focused on creating an organised, functional and refined working environment. The design direction highlights a sophisticated conference space, balanced materials, contemporary detailing and a comfortable setting for professional interactions.",
    features: [
      "Conference Space",
      "Professional Interiors",
      "Functional Planning",
    ],
  },
  {
    id: "02",
    title: "Motibagh",
    location: "Delhi, India",
    category: "Interior Design Project",
    image: "/images/interior-design/projects/motibagh-delhi.png",
    description:
      "A contemporary interior design project bringing together elegant finishes, thoughtful space planning and a welcoming professional atmosphere. The visual approach combines warm textures, modern furniture and carefully balanced lighting to create a refined interior experience.",
    features: [
      "Modern Interiors",
      "Space Planning",
      "Contemporary Design",
    ],
  },
];

export default function OurProjects() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: "#F8F9F6",
        py: { xs: 6, sm: 7, md: 9 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">

        {/* SECTION HEADER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 3,
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ maxWidth: 650 }}>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 2,
                  bgcolor: "#26834B",
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 3,
                  color: "#26834B",
                  textTransform: "uppercase",
                }}
              >
                Our Portfolio
              </Typography>
            </Stack>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: 34,
                  sm: 42,
                  md: 50,
                },
                fontWeight: 800,
                color: "#17251B",
                letterSpacing: "-1.8px",
                lineHeight: 1.15,
              }}
            >
              Spaces That
              <Box
                component="span"
                sx={{
                  color: "#26834B",
                  ml: 1,
                }}
              >
                Inspire.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#727B74",
                fontSize: { xs: 14, md: 15 },
                lineHeight: 1.9,
                maxWidth: 570,
              }}
            >
              Every space tells a story. Explore our selected projects
              showcasing thoughtful interior planning, refined aesthetics
              and a commitment to creating functional and inspiring
              environments.
            </Typography>
          </Box>

          {/* PROJECT COUNT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              pb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 38,
                fontWeight: 800,
                color: "#26834B",
                letterSpacing: "-2px",
              }}
            >
              02
            </Typography>

            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#26362A",
                  letterSpacing: 1.5,
                }}
              >
                FEATURED PROJECTS
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#899089",
                  mt: 0.5,
                }}
              >
                Selected Portfolio
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* PROJECT CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: { xs: 3, md: 3.5 },
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                border: "1px solid #E9EDE8",
                transition: "all 0.4s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 18px 45px rgba(26, 53, 32, 0.09)",
                },

                "&:hover .project-image": {
                  transform: "scale(1.045)",
                },

                "&:hover .project-number": {
                  color: "#26834B",
                },

                "&:hover .project-arrow": {
                  bgcolor: "#26834B",
                  color: "#FFFFFF",
                  borderColor: "#26834B",
                },
              }}
            >
              {/* PROJECT IMAGE */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  bgcolor: "#EDEFEA",
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} interior project`}
                  fill
                  priority={project.id === "01"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="project-image"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.7s ease",
                  }}
                />

                {/* IMAGE OVERLAY */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.03) 40%, rgba(0,0,0,0.42) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* CATEGORY */}
                <Chip
                  label={project.category}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    height: 32,
                    bgcolor: "rgba(255,255,255,0.95)",
                    color: "#246B3E",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: 0.3,
                    borderRadius: "6px",
                    "& .MuiChip-label": {
                      px: 1.5,
                    },
                  }}
                />

                {/* PROJECT NUMBER */}
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    left: 20,
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  PROJECT / {project.id}
                </Typography>

                <NorthEast
                  sx={{
                    position: "absolute",
                    right: 20,
                    bottom: 15,
                    color: "#FFFFFF",
                    fontSize: 23,
                  }}
                />
              </Box>

              {/* PROJECT INFORMATION */}
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  "&:last-child": {
                    pb: { xs: 2.5, md: 3 },
                  },
                }}
              >
                {/* LOCATION */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.8}
                  sx={{ mb: 1.5 }}
                >
                  <LocationOnOutlined
                    sx={{
                      fontSize: 17,
                      color: "#26834B",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#7B847D",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {project.location}
                  </Typography>
                </Stack>

                {/* TITLE AND ARROW */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: 21, md: 24 },
                      fontWeight: 800,
                      color: "#1C2B20",
                      letterSpacing: "-0.6px",
                    }}
                  >
                    {project.title}
                  </Typography>

                  <IconButton
                    className="project-arrow"
                    aria-label={`Explore ${project.title}`}
                    sx={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      border: "1px solid #E4E9E3",
                      color: "#26392B",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowOutward fontSize="small" />
                  </IconButton>
                </Box>

                {/* DESCRIPTION */}
                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: 13,
                    lineHeight: 1.9,
                    color: "#788078",
                  }}
                >
                  {project.description}
                </Typography>

                <Divider
                  sx={{
                    my: 2.5,
                    borderColor: "#EDF0EC",
                  }}
                />

                    {/* PROJECT FEATURES */}
                    <Stack
                    direction="row"
                    useFlexGap
                    spacing={1}
                    sx={{
                        flexWrap: "wrap",
                        rowGap: 1,
                        columnGap: 1,
                    }}
                    >
                    {project.features.map((feature) => (
                        <Box
                        key={feature}
                        sx={{
                            px: 1.5,
                            py: 0.8,
                            borderRadius: "5px",
                            bgcolor: "#F3F7F2",
                            color: "#52705A",
                            fontSize: 10,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                        }}
                        >
                        {feature}
                        </Box>
                    ))}
                    </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* BOTTOM SECTION */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            px: { xs: 2, md: 4 },
            py: 2.5,
            borderRadius: "10px",
            bgcolor: "#EEF3ED",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              color: "#405344",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.7,
            }}
          >
            Thoughtful spaces. Meaningful experiences. Lasting impressions.
          </Typography>

          <Typography
            sx={{
              color: "#26834B",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            DESIGNED WITH PURPOSE
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
