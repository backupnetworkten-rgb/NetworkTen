import { ElementType } from "react";
import { Box, Typography } from "@mui/material";

export default function PanelHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: ElementType;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box display="flex" alignItems="flex-start" gap={2}>
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "13px",
          background: "rgba(42,82,190,0.09)",
          border: "1px solid rgba(42,82,190,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: "#2A52BE", fontSize: 21 }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "#2A52BE",
            textTransform: "uppercase",
            mb: 0.25,
          }}
        >
          {eyebrow}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#11162B", lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "#8A91A8", mt: 0.4 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}