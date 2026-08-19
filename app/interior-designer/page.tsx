"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  Container,
  Typography,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const documents = [
  {
    number: "01",
    title: "Client Welcome Kit",
    shortTitle: "Welcome",
    description:
      "Introduce your studio, explain your design process and collect essential client and property information.",
    icon: DescriptionOutlinedIcon,
    route: "/interior-designer/welcome-kit",
    tag: "CLIENT ONBOARDING",
  },
  {
    number: "02",
    title: "Client Discovery Kit",
    shortTitle: "Discovery",
    description:
      "Capture detailed lifestyle, room, furniture, lighting, style and functional requirements from your client.",
    icon: SearchOutlinedIcon,
    route: "/interior-designer/discovery-kit",
    tag: "REQUIREMENTS",
  },
  {
    number: "03",
    title: "Client Contract Kit",
    shortTitle: "Contract",
    description:
      "Prepare professional agreements covering scope, packages, fees, payment schedules and project terms.",
    icon: GavelOutlinedIcon,
    route: "/interior-designer/client-contract",
    tag: "AGREEMENT",
  },
  {
    number: "04",
    title: "E-Design Contract Kit",
    shortTitle: "E-Design",
    description:
      "Create remote interior design agreements with deliverables, payment terms, acceptance and invoice details.",
    icon: DesignServicesOutlinedIcon,
    route: "/interior-designer/e-design-contract",
    tag: "REMOTE DESIGN",
  },
];

export default function InteriorDesignerDashboard() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #f4f6f8 48%, #ffffff 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        {/* =========================================================
            TOP HEADER
        ========================================================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            justifyContent: "space-between",
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            {/* Small label */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.2,
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 2,
                  background: "#9b7b36",
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2.2,
                  color: "#9b7b36",
                }}
              >
                INTERIOR DESIGN STUDIO
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 30,
                  sm: 36,
                  md: 44,
                },
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                color: "#172033",
              }}
            >
              Client Documentation
            </Typography>

            <Typography
              sx={{
                mt: 1.2,
                maxWidth: 650,
                color: "#718096",
                fontSize: {
                  xs: 14,
                  md: 15,
                },
                lineHeight: 1.7,
              }}
            >
              A professional workspace to manage client onboarding,
              discovery, agreements and e-design documentation.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              // Connect this later to the New Client workflow.
            }}
            sx={{
              minHeight: 48,
              px: 2.5,
              borderRadius: "10px",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 700,
              background: "#172033",
              boxShadow: "0 8px 20px rgba(23, 32, 51, 0.16)",
              "&:hover": {
                background: "#26334d",
                boxShadow: "0 10px 24px rgba(23, 32, 51, 0.22)",
              },
            }}
          >
            New Client
          </Button>
        </Box>

        {/* =========================================================
            PREMIUM OVERVIEW PANEL
        ========================================================= */}

        <Card
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            mb: 4,
            borderRadius: "20px",
            border: "1px solid #e6e9ed",
            background:
              "linear-gradient(135deg, #172033 0%, #202d45 55%, #293853 100%)",
            boxShadow: "0 18px 45px rgba(23, 32, 51, 0.13)",
          }}
        >
          {/* Decorative circle */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              right: -100,
              top: -150,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              right: 30,
              bottom: -170,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              justifyContent: "space-between",
              gap: 4,
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <AutoAwesomeRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: "#d8bd79",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.8,
                    color: "#d8bd79",
                  }}
                >
                  DOCUMENT WORKSPACE
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: {
                    xs: 23,
                    md: 27,
                  },
                  fontWeight: 750,
                  letterSpacing: "-0.5px",
                }}
              >
                Everything your client journey needs.
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  maxWidth: 650,
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                Select a document kit to begin. Forms, saved client
                information, document previews and PDF generation will be
                connected in the next stages.
              </Typography>
            </Box>

            {/* Document counter */}
            <Box
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 150,
                },
                textAlign: {
                  xs: "left",
                  md: "right",
                },
                borderLeft: {
                  xs: "none",
                  md: "1px solid rgba(255,255,255,0.12)",
                },
                pl: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: 48,
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: "-2px",
                }}
              >
                04
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                DOCUMENT KITS
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* =========================================================
            SECTION TITLE
        ========================================================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 21,
                fontWeight: 800,
                color: "#172033",
              }}
            >
              Document Kits
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#8a94a6",
              }}
            >
              Choose a workflow to continue
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            DOCUMENT GRID
        ========================================================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {documents.map((document) => {
            const Icon = document.icon;

            return (
              <Card
                key={document.number}
                elevation={0}
                onClick={() => router.push(document.route)}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 275,
                  cursor: "pointer",
                  borderRadius: "18px",
                  border: "1px solid #e6e9ee",
                  background: "#ffffff",
                  transition:
                    "transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#d4d9e0",
                    boxShadow:
                      "0 18px 45px rgba(23, 32, 51, 0.10)",
                  },
                  "&:hover .document-arrow": {
                    transform: "translateX(4px)",
                  },
                  "&:hover .document-icon": {
                    background: "#172033",
                    color: "#ffffff",
                  },
                }}
              >
                {/* Number */}
                <Typography
                  sx={{
                    position: "absolute",
                    right: 22,
                    top: 18,
                    fontSize: 56,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#f1f3f5",
                    userSelect: "none",
                  }}
                >
                  {document.number}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    p: {
                      xs: 3,
                      md: 3.5,
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="document-icon"
                    sx={{
                      width: 54,
                      height: 54,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "14px",
                      background: "#f3f5f7",
                      color: "#172033",
                      transition:
                        "background 250ms ease, color 250ms ease",
                    }}
                  >
                    <Icon sx={{ fontSize: 27 }} />
                  </Box>

                  {/* Tag */}
                  <Typography
                    sx={{
                      mt: 2.8,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.3,
                      color: "#9b7b36",
                    }}
                  >
                    {document.tag}
                  </Typography>

                  {/* Title */}
                  <Typography
                    sx={{
                      mt: 0.8,
                      fontSize: {
                        xs: 21,
                        md: 22,
                      },
                      fontWeight: 800,
                      color: "#172033",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {document.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      mt: 1.2,
                      maxWidth: 520,
                      minHeight: 66,
                      fontSize: 13.5,
                      lineHeight: 1.7,
                      color: "#718096",
                    }}
                  >
                    {document.description}
                  </Typography>

                  {/* Bottom action */}
                  <Box
                    sx={{
                      mt: 2.5,
                      pt: 2,
                      borderTop: "1px solid #edf0f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 750,
                        color: "#172033",
                      }}
                    >
                      Open workspace
                    </Typography>

                    <ArrowForwardRoundedIcon
                      className="document-arrow"
                      sx={{
                        fontSize: 19,
                        color: "#9b7b36",
                        transition: "transform 200ms ease",
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>

        {/* =========================================================
            FUTURE WORKFLOW
        ========================================================= */}

        <Box
          sx={{
            mt: 4,
            p: {
              xs: 2.5,
              md: 3,
            },
            borderRadius: "16px",
            border: "1px dashed #d9dee5",
            background: "rgba(255,255,255,0.65)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 750,
                  color: "#344054",
                }}
              >
                Document workflow
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12.5,
                  color: "#8a94a6",
                }}
              >
                Fill → Review → Save → Generate PDF → Share
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9b7b36",
                letterSpacing: 0.5,
              }}
            >
              COMING IN NEXT STEPS
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}