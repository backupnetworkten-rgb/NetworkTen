"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Divider
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AdminLayout from "@/components/admin/AdminLayout";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("adminLoggedIn");
    if (!admin) {
      router.push("/admin/login");
    }
  }, [router]);

  const stats = [
    { title: "Products", value: "25" },
    { title: "Leads", value: "58" },
    { title: "Orders", value: "12" },
    { title: "Requests", value: "7" }
  ];

  const activities = [
    { title: "New Product Added", time: "2 min ago" },
    { title: "Lead Submitted", time: "15 min ago" },
    { title: "Customer Enquiry Received", time: "32 min ago" },
    { title: "Video Request Received", time: "1 hour ago" }
  ];

  return (
    <AdminLayout title="Overview">
      {/* WELCOME */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "18px",
          background: "linear-gradient(135deg,#08142e 0%,#102048 100%)",
          color: "#fff"
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#8BC53F",
            mb: 0.5
          }}
        >
          Welcome Back
        </Typography>

        <Typography sx={{ fontSize: "26px", fontWeight: 900, mb: 1 }}>
          NetworkTen Dashboard
        </Typography>

        <Typography sx={{ opacity: 0.8, fontSize: "13px" }}>
          Manage products, enquiries, requests and website operations from one place.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Chip
            label="System Active"
            size="small"
            sx={{
              background: "rgba(139,197,63,.15)",
              color: "#8BC53F",
              fontWeight: 700
            }}
          />
        </Box>
      </Paper>

      {/* STATS */}
      <Grid container spacing={2}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "1px solid #edf1f7",
                transition: ".25s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                }
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#667085", mb: 0.5 }}>
                {item.title}
              </Typography>

              <Typography sx={{ fontSize: "30px", fontWeight: 900, color: "#102048", lineHeight: 1.1 }}>
                {item.value}
              </Typography>

              <Typography sx={{ fontSize: "11px", color: "#8BC53F", mt: 1 }}>
                +12% this month
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* ACTIVITY */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "18px", border: "1px solid #edf1f7" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 900, color: "#102048", mb: 2 }}>
              Recent Activity
            </Typography>

            {activities.map((activity, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5
                  }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                    {activity.title}
                  </Typography>

                  <Typography sx={{ fontSize: "12px", color: "#667085" }}>
                    {activity.time}
                  </Typography>
                </Box>

                {index !== activities.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* QUICK ACTIONS */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "18px", border: "1px solid #edf1f7" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 900, color: "#102048", mb: 2 }}>
              Quick Actions
            </Typography>

            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => router.push("/admin/products")}
                sx={{
                  height: "44px",
                  borderRadius: "10px",
                  background: "#102048",
                  textTransform: "none",
                  fontWeight: 700
                }}
              >
                Manage Products
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ height: "44px", borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
              >
                View Leads
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ height: "44px", borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
              >
                View Requests
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}