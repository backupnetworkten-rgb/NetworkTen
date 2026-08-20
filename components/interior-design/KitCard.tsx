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
        borderRadius: 4,
        border: "1px solid",
        borderColor: available
          ? "#dce8ca"
          : "#e5e7eb",
        bgcolor: available
          ? "#fff"
          : "#f7f7f7",
        opacity: available ? 1 : 0.75,
        transition: "all .3s ease",
        "&:hover": available
          ? {
              transform:
                "translateY(-7px)",
              boxShadow:
                "0 20px 45px rgba(16,32,72,0.10)",
              borderColor:
                "#8BC53F",
            }
          : {},
      }}
    >
      <CardContent
        sx={{
          p: 3.5,
          "&:last-child": {
            pb: 3.5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
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

          {!available && (
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#e9eaec",
                color: "#687078",
              }}
            >
              <LockIcon fontSize="small" />
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
              }}
            />
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontWeight: 800,
            color: "#102048",
          }}
        >
          {kit.title}
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            minHeight: 82,
            color: "#64748b",
            fontSize: "0.9rem",
            lineHeight: 1.7,
          }}
        >
          {kit.description}
        </Typography>

        {available ? (
          <Button
            onClick={onOpen}
            fullWidth
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 3,
              bgcolor: "#102048",
              borderRadius: 2.5,
              py: 1.2,
              fontWeight: 800,
              "&:hover": {
                bgcolor: "#8BC53F",
                color: "#102048",
              },
            }}
          >
            Open Welcome Kit
          </Button>
        ) : (
          <Box
            sx={{
              mt: 3,
              py: 1.2,
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
            <LockIcon sx={{ fontSize: 17 }} />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "#687078",
              }}
            >
              Available after authorization
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}