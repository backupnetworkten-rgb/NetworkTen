"use client";

import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { UserData } from "@/types/user";

export type AccountSection = "profile" | "addresses" | "security";

const NAV_ITEMS: {
  key: AccountSection;
  label: string;
  icon: typeof PersonRoundedIcon;
}[] = [
  { key: "profile", label: "Profile", icon: PersonRoundedIcon },
  { key: "addresses", label: "Addresses", icon: LocationOnRoundedIcon },
  { key: "security", label: "Security", icon: ShieldRoundedIcon },
];

export default function AccountSidebar({
  user,
  active,
  onChange,
}: {
  user: UserData | null;
  active: AccountSection;
  onChange: (section: AccountSection) => void;
}) {
  return (
    <Box
      sx={{
        position: { md: "sticky" },
        top: { md: 24 },
        alignSelf: "flex-start",
        borderRadius: "28px",
        background: "linear-gradient(160deg, #0A1130 0%, #1B2B57 100%)",
        p: "28px 24px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* User info */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          src={user?.photoURL}
          sx={{
            width: 52,
            height: 52,
            fontWeight: 700,
            fontSize: 20,
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            border: "2px solid rgba(94,138,255,0.45)",
            flexShrink: 0,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>
        <Box sx={{ overflow: "hidden", minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 700, fontSize: 14.5, color: "#fff" }}>
            {user?.name || "Your account"}
          </Typography>
          <Typography
            noWrap
            sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", mt: 0.2 }}
          >
            {user?.email || user?.phone || "—"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2.5 }} />

      {/* Nav */}
      <Stack
        direction={{ xs: "row", md: "column" }}
        spacing={0.5}
        sx={{ overflowX: { xs: "auto", md: "visible" }, pb: { xs: 0.5, md: 0 } }}
      >
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <Button
              key={key}
              onClick={() => onChange(key)}
              startIcon={
                <Icon
                  sx={{
                    fontSize: "18px !important",
                    color: isActive ? "#7EA8FF" : "rgba(255,255,255,0.55)",
                  }}
                />
              }
              sx={{
                justifyContent: "flex-start",
                flexShrink: 0,
                px: 2,
                py: 1.25,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13.5,
                color: isActive ? "#CBD9FF" : "rgba(255,255,255,0.65)",
                background: isActive ? "rgba(94,138,255,0.14)" : "transparent",
                borderLeft: {
                  md: isActive ? "3px solid #5E8AFF" : "3px solid transparent",
                },
                transition: "all 0.18s ease",
                "&:hover": { background: "rgba(255,255,255,0.07)", color: "#fff" },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}