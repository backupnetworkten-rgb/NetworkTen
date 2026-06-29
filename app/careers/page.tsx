"use client";

import React, { useEffect, useRef, useState } from "react";

import Head from "next/head";

import Image from "next/image";

import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import { JobOpening, getAllJobs, submitApplication } from "@/lib/careerService";

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  useEffect(() => {
    getAllJobs()
      .then(setJobs)
      .catch((err) => console.error("Failed to load jobs:", err))
      .finally(() => setJobsLoading(false));
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyClick = (jobTitle: string) => {
    setForm((prev) => ({ ...prev, position: jobTitle }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.position) {
      setSnack({ open: true, msg: "Please fill in name, email, phone and position.", severity: "error" });
      return;
    }

    setSubmitting(true);
    try {
      await submitApplication(form);
      setSnack({ open: true, msg: "Application submitted successfully.", severity: "success" });
      setForm({ name: "", email: "", phone: "", position: "", message: "" });
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Something went wrong. Please try again.", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Careers | NetworkTen</title>

        <meta
          name="description"
          content="Join NetworkTen and build your career in smart networking, surveillance and business technology solutions."
        />
      </Head>

      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "340px", md: "420px" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop"
          alt="Careers Banner"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(8,20,46,0.94), rgba(8,20,46,0.74))",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: "1180px", width: "100%", mx: "auto", px: 2 }}>
          <Chip
            label="Join NetworkTen"
            sx={{
              background: "rgba(139,197,63,0.16)",
              color: "#8BC53F",
              fontWeight: 700,
              mb: 2,
              fontSize: "11px",
              height: "28px",
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              lineHeight: 1.02,
              mb: 1.8,
              maxWidth: "700px",
              letterSpacing: "-1px",
              fontSize: { xs: "34px", md: "58px" },
            }}
          >
            Careers At
            <br />
            NetworkTen
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.74)",
              lineHeight: 1.85,
              maxWidth: "620px",
              fontSize: { xs: "14px", md: "15px" },
            }}
          >
            Build your future with modern networking, surveillance and smart
            technology solutions.
          </Typography>
        </Box>
      </Box>

      {/* MAIN SECTION */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: 2, background: "#f7f9fc" }}>
        <Box
          sx={{
            maxWidth: "1180px",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 370px" },
            gap: 2,
          }}
        >
          {/* LEFT SIDE — JOB LISTINGS */}
          <Box sx={{ display: "grid", gap: 1.8 }}>
            {jobsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#8BC53F" }} />
              </Box>
            ) : jobs.length === 0 ? (
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #edf1f7",
                  p: 5,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#102048", fontWeight: 800, fontSize: "18px", mb: 1 }}>
                  No open positions right now
                </Typography>
                <Typography sx={{ color: "#667085", fontSize: "13px" }}>
                  We're not actively hiring at the moment, but feel free to send a general
                  application below and we'll reach out when something opens up.
                </Typography>
              </Box>
            ) : (
              jobs.map((job) => (
                <Box
                  key={job.id}
                  sx={{
                    background: "#fff",
                    borderRadius: "20px",
                    p: { xs: 2.2, md: 2.6 },
                    border: "1px solid #edf1f7",
                    transition: "0.3s",
                    boxShadow: "0 8px 26px rgba(0,0,0,0.04)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 16px 34px rgba(0,0,0,0.07)",
                    },
                  }}
                >
                  {/* TOP */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 1.7,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#102048",
                          fontWeight: 900,
                          mb: 0.7,
                          fontSize: { xs: "21px", md: "26px" },
                        }}
                      >
                        {job.title}
                      </Typography>

                      {job.description ? (
                        <Typography
                          sx={{ color: "#667085", lineHeight: 1.8, maxWidth: "650px", fontSize: "13px" }}
                        >
                          {job.description}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{ color: "#667085", lineHeight: 1.8, maxWidth: "650px", fontSize: "13px" }}
                        >
                          Join our growing technology team and work on premium networking,
                          security and business solutions.
                        </Typography>
                      )}
                    </Box>

                    {/* APPLY BUTTON — now functional */}
                    <Button
                      variant="contained"
                      startIcon={<WorkOutlineRoundedIcon />}
                      onClick={() => handleApplyClick(job.title)}
                      sx={{
                        background: "#102048",
                        borderRadius: "50px",
                        px: 2.6,
                        py: 1,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "13px",
                        minWidth: "auto",
                        boxShadow: "0 10px 22px rgba(16,32,72,0.14)",
                        "&:hover": { background: "#08142e" },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>

                  <Divider sx={{ mb: 1.8 }} />

                  {/* DETAILS */}
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                      <LocationOnRoundedIcon sx={{ fontSize: 17, color: "#8BC53F" }} />
                      <Typography sx={{ color: "#667085", fontSize: "12px", fontWeight: 600 }}>
                        {job.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                      <BusinessCenterRoundedIcon sx={{ fontSize: 17, color: "#8BC53F" }} />
                      <Typography sx={{ color: "#667085", fontSize: "12px", fontWeight: 600 }}>
                        {job.type}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                      <AccessTimeRoundedIcon sx={{ fontSize: 17, color: "#8BC53F" }} />
                      <Typography sx={{ color: "#667085", fontSize: "12px", fontWeight: 600 }}>
                        {job.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* RIGHT FORM */}
          <Box
            ref={formRef}
            sx={{
              background: "#fff",
              borderRadius: "22px",
              p: { xs: 2.2, md: 2.6 },
              border: "1px solid #edf1f7",
              boxShadow: "0 8px 26px rgba(0,0,0,0.04)",
              height: "fit-content",
              position: "sticky",
              top: 92,
            }}
          >
            <Typography
              sx={{ color: "#102048", fontWeight: 900, mb: 1, fontSize: { xs: "26px", md: "32px" } }}
            >
              Apply Now
            </Typography>

            <Typography sx={{ color: "#667085", lineHeight: 1.75, mb: 2.5, fontSize: "13px" }}>
              Submit your details and we will contact you when recruitment is active.
            </Typography>

            <Box sx={{ display: "grid", gap: 1.7 }}>
              <TextField
                label="Full Name"
                fullWidth
                size="small"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                label="Email Address"
                fullWidth
                size="small"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                label="Phone Number"
                fullWidth
                size="small"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <TextField
                select
                label="Select Position"
                fullWidth
                size="small"
                name="position"
                value={form.position}
                onChange={handleChange}
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.title}>
                    {job.title}
                  </MenuItem>
                ))}
                <MenuItem value="General Application">General Application</MenuItem>
              </TextField>

              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                size="small"
                name="message"
                value={form.message}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                endIcon={<SendRoundedIcon />}
                onClick={handleSubmit}
                disabled={submitting}
                sx={{
                  background: "#8BC53F",
                  borderRadius: "50px",
                  py: 1.2,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: "13px",
                  boxShadow: "0 10px 24px rgba(139,197,63,0.20)",
                  "&:hover": { background: "#74ab35" },
                }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* FEEDBACK */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>

      <Footer />
    </>
  );
}