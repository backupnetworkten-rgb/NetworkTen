
import Image from "next/image";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
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
      "A thoughtfully planned institutional interior project designed around functionality, professional aesthetics and efficient space utilisation. The project highlights a refined conference environment, contemporary materials, carefully balanced lighting and comfortable spaces that support professional interactions.",
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
      "A contemporary interior design project bringing together elegant finishes, thoughtful space planning and a welcoming professional atmosphere. The design direction combines warm textures, modern furniture, natural elements and carefully balanced lighting to create a refined interior experience.",
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
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "flex-end",
            },
            gap: 3,
            mb: { xs: 4, md: 5 },
          }}
        >
          {/* Heading */}
          <Box sx={{ maxWidth: 650 }}>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
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
                  color: "#26834B",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                Our Portfolio
              </Typography>
            </Box>

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
              Spaces That{" "}
              <Box
                component="span"
                sx={{ color: "#26834B" }}
              >
                Inspire.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 570,
                color: "#727B74",
                fontSize: { xs: 14, md: 15 },
                lineHeight: 1.9,
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

        {/* PROJECT GRID */}
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
                  boxShadow:
                    "0 18px 45px rgba(26, 53, 32, 0.09)",
                },

                "&:hover .project-image": {
                  transform: "scale(1.045)",
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
                      "linear-gradient(180deg, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.42) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* CATEGORY LABEL */}
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
                    borderRadius: "6px",
                    "& .MuiChip-label": {
                      px: 1.5,
                    },
                  }}
                />

                {/* IMAGE FOOTER */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    left: 20,
                    right: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 2,
                    }}
                  >
                    PROJECT / {project.id}
                  </Typography>

                  <NorthEast
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 23,
                    }}
                  />
                </Box>
              </Box>

              {/* PROJECT DETAILS */}
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  "&:last-child": {
                    pb: { xs: 2.5, md: 3 },
                  },
                }}
              >
                {/* LOCATION */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    mb: 1.5,
                  }}
                >
                  <LocationOnOutlined
                    sx={{
                      fontSize: 18,
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
                </Box>

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
                      fontSize: {
                        xs: 21,
                        md: 24,
                      },
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
                    color: "#788078",
                    fontSize: 13,
                    lineHeight: 1.9,
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
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
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
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* BOTTOM STATEMENT */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            px: { xs: 2, md: 4 },
            py: 2.5,
            borderRadius: "10px",
            bgcolor: "#EEF3ED",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
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
            Thoughtful spaces. Meaningful experiences.
            Lasting impressions.
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
