"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter
} from "next/navigation";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const menuItems = [
  {
    label: "Overview",
    icon: <DashboardRoundedIcon />,
    path: "/admin/dashboard"
  },
  {
    label: "Products",
    icon: <Inventory2RoundedIcon />,
    path: "/admin/products"
  },
  {
    label: "Manage Products",
    icon: <Inventory2RoundedIcon />,
    path: "/admin/manage-products"
  },
  {
    label: "Blogs",
    icon: <ArticleRoundedIcon />,
    path: "/admin/blogs"
  },
  {
    label: "Careers",
    icon: <WorkOutlineRoundedIcon />,
    path: "/admin/careers"
  },
  {
    label: "Settings",
    icon: <SettingsRoundedIcon />,
    path: "/admin/settings"
  }
];

// External link — opens in a new tab, kept separate from internal routes
const externalLink = {
  label: "External Portal",
  sublabel: "networkten Portal",
  icon: <OpenInNewRoundedIcon />,
  href: "https://networktenatt.web.app/admin/login"
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "linear-gradient(180deg,#08142e 0%,#0d1b3d 100%)",
        borderRight: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1200
      }}
    >
      {/* LOGO */}
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: "#8BC53F",
              color: "#08142e",
              fontWeight: 900,
              fontSize: "18px"
            }}
          >
            N
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "18px",
                color: "#fff",
                lineHeight: 1
              }}
            >
              NetworkTen
            </Typography>

            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(255,255,255,.55)",
                mt: 0.5
              }}
            >
              Admin Panel
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.08)" }} />

      {/* ADMIN */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
          Administrator
        </Typography>

        <Typography sx={{ fontSize: "11px", color: "rgba(255,255,255,.5)", mt: 0.5 }}>
          Full Access
        </Typography>
      </Box>

      {/* MENU */}
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link key={item.path} href={item.path} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  height: "44px",
                  borderRadius: "12px",
                  mb: 0.8,
                  background: active ? "#8BC53F" : "transparent",
                  color: active ? "#08142e" : "#fff",
                  transition: ".25s",
                  "&:hover": {
                    background: active ? "#8BC53F" : "rgba(255,255,255,.08)"
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "34px",
                    color: active ? "#08142e" : "#fff",
                    "& svg": { fontSize: "20px" }
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontSize: "13px", fontWeight: 700 }
                    }
                  }}
                />
              </ListItemButton>
            </Link>
          );
        })}

        {/* EXTERNAL LINK — opens in new tab, never replaces the admin session */}
        <Box
          component="a"
          href={externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", display: "block", mt: 1 }}
        >
          <ListItemButton
            sx={{
              height: "44px",
              borderRadius: "12px",
              mb: 0.8,
              color: "#fff",
              background: "rgba(255,255,255,.04)",
              border: "1px dashed rgba(255,255,255,.12)",
              "&:hover": {
                background: "rgba(255,255,255,.08)"
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "34px",
                color: "#8BC53F",
                "& svg": { fontSize: "18px" }
              }}
            >
              {externalLink.icon}
            </ListItemIcon>

            <ListItemText
              primary={externalLink.label}
              secondary={externalLink.sublabel}
              slotProps={{
                primary: {
                  sx: { fontSize: "13px", fontWeight: 700 }
                },
                secondary: {
                  sx: { fontSize: "10.5px", color: "rgba(255,255,255,.45)" }
                }
              }}
            />
          </ListItemButton>
        </Box>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* FOOTER */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,.08)", mb: 2 }} />

        <Typography
          sx={{
            fontSize: "11px",
            color: "rgba(255,255,255,.45)",
            mb: 1.5,
            textAlign: "center"
          }}
        >
          Version 1.0
        </Typography>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            height: "44px",
            borderRadius: "12px",
            background: "rgba(255,255,255,.06)",
            color: "#fff",
            "&:hover": { background: "#ef4444" }
          }}
        >
          <ListItemIcon sx={{ minWidth: "34px", color: "#fff" }}>
            <LogoutRoundedIcon sx={{ fontSize: "20px" }} />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            slotProps={{
              primary: { sx: { fontWeight: 700, fontSize: "13px" } }
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}