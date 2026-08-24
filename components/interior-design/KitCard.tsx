"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { InteriorKit } from "@/types/interior-design";

interface KitCardProps {
  kit: InteriorKit;
  onOpen?: () => void;
}

export default function KitCard({
  kit,
  onOpen,
}: KitCardProps) {
  const available = kit.available;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        borderRadius: 4,

        border: "1px solid",

        borderColor: available
          ? "#dce8ca"
          : "#e5e7eb",

        bgcolor: available
          ? "#ffffff"
          : "#f7f7f7",

        opacity: available ? 1 : 0.75,

        transition:
          "transform .3s ease, box-shadow .3s ease, border-color .3s ease",

        "&:hover": available
          ? {
              transform: "translateY(-5px)",

              boxShadow:
                "0 18px 40px rgba(16,32,72,0.10)",

              borderColor:
                "#8BC53F",
            }
          : {},
      }}
    >
      <CardContent
        sx={{
          flex: 1,

          display: "flex",
          flexDirection: "column",

          p: {
            xs: 2.5,
            sm: 3,
          },

          "&:last-child": {
            pb: {
              xs: 2.5,
              sm: 3,
            },
          },
        }}
      >
        {/* =====================================
            TOP ROW
        ===================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",

            minHeight: 58,
          }}
        >
          {/* KIT NUMBER */}

          <Box
            sx={{
              width: 58,
              height: 58,

              flexShrink: 0,

              borderRadius: 3,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: available
                ? "#102048"
                : "#e2e5e8",

              color: available
                ? "#8BC53F"
                : "#737980",

              fontWeight: 900,

              fontSize: "1.15rem",
            }}
          >
            {kit.number}
          </Box>

          {/* STATUS */}

          {!available && (
            <Box
              sx={{
                width: 38,
                height: 38,

                flexShrink: 0,

                borderRadius: "50%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                bgcolor: "#e9eaec",
                color: "#687078",
              }}
            >
              <LockIcon
                fontSize="small"
              />
            </Box>
          )}

          {available && (
            <Chip
              icon={
                <CheckCircleIcon
                  sx={{
                    color:
                      "#6da82e !important",
                  }}
                />
              }
              label="Available"
              size="small"
              sx={{
                bgcolor: "#eff8e8",

                color: "#557d2a",

                fontWeight: 700,

                height: 30,

                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          )}
        </Box>

        {/* =====================================
            TITLE
        ===================================== */}

        <Typography
          variant="h6"
          sx={{
            mt: 3,

            fontWeight: 800,

            color: "#102048",

            fontSize: {
              xs: "1.25rem",
              sm: "1.4rem",
            },

            lineHeight: 1.3,

            /*
             * Keep the title area consistent.
             * This prevents a one-line title
             * from moving everything upward.
             */
            minHeight: {
              xs: 33,
              sm: 37,
            },

            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {kit.title}
        </Typography>

        {/* =====================================
            DESCRIPTION
        ===================================== */}

        <Typography
          sx={{
            mt: 1.25,

            color: "#64748b",

            fontSize: "0.9rem",

            lineHeight: 1.65,

            /*
             * This is the important part.
             *
             * It consumes the remaining space,
             * therefore the button stays at the
             * same vertical position on every card.
             */
            flexGrow: 1,
          }}
        >
          {kit.description}
        </Typography>

        {/* =====================================
            ACTION AREA
        ===================================== */}

        <Box
          sx={{
            mt: 2.5,

            minHeight: 48,

            display: "flex",
            alignItems: "stretch",
          }}
        >
          {available ? (
            <Button
              onClick={onOpen}
              fullWidth
              variant="contained"
              endIcon={
                <ArrowForwardIcon />
              }
              sx={{
                minHeight: 48,

                height: 48,

                px: 2,

                bgcolor: "#102048",

                borderRadius: 2.5,

                fontWeight: 800,

                fontSize: {
                  xs: "0.78rem",
                  sm: "0.84rem",
                },

                lineHeight: 1.25,

                textAlign: "center",

                whiteSpace: "normal",

                "& .MuiButton-endIcon": {
                  ml: 1,

                  flexShrink: 0,
                },

                "&:hover": {
                  bgcolor: "#8BC53F",

                  color: "#102048",
                },
              }}
            >
              Open {kit.title}
            </Button>
          ) : (
            <Box
              sx={{
                width: "100%",

                height: 48,

                px: 2,

                borderRadius: 2.5,

                bgcolor: "#eceeef",

                display: "flex",

                justifyContent:
                  "center",

                alignItems: "center",

                gap: 1,
              }}
            >
              <LockIcon
                sx={{
                  fontSize: 17,
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,

                  color: "#687078",

                  textAlign: "center",

                  lineHeight: 1.25,
                }}
              >
                Available after authorization
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}