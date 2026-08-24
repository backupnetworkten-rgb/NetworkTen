"use client";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

interface EDesignSectionProps {
  number: string;

  title: string;

  description?: string;

  children: React.ReactNode;
}

export default function EDesignSection({
  number,
  title,
  description,
  children,
}: EDesignSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2.5,
          sm: 4,
        },

        borderRadius: 4,

        border:
          "1px solid #e5eaf0",

        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",

          flexDirection:
            "column",

          gap: 3,
        }}
      >
        {/* HEADER */}

        <Box>
          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,

                height: 48,

                flexShrink: 0,

                borderRadius: 2.5,

                bgcolor: "#102048",

                color: "#8BC53F",

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                fontWeight: 900,
              }}
            >
              {number}
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,

                  color: "#102048",
                }}
              >
                {title}
              </Typography>

              <Box
                sx={{
                  mt: 0.7,

                  width: 38,

                  height: 3,

                  borderRadius: 2,

                  bgcolor: "#8BC53F",
                }}
              />
            </Box>
          </Box>

          {description && (
            <Typography
              sx={{
                mt: 2,

                color: "#64748b",

                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {children}
      </Box>
    </Paper>
  );
}