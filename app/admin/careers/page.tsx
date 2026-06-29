"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Badge,
  Select,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  JobOpening,
  JobApplication,
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} from "@/lib/careerService";

const emptyJobForm = {
  title: "",
  location: "",
  type: "Full Time",
  experience: "",
  description: "",
};

const statusColors: Record<string, string> = {
  New: "#8BC53F",
  Reviewed: "#3b82f6",
  Shortlisted: "#f59e0b",
  Rejected: "#ef4444",
};

export default function AdminCareersPage() {
  const [tab, setTab] = useState(0);

  // jobs state
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);
  const [savingJob, setSavingJob] = useState(false);

  // applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);

  const [snack, setSnack] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({
    open: false,
    msg: "",
    severity: "success",
  });

  const loadJobs = async () => {
    setJobsLoading(true);
    try {
      setJobs(await getAllJobs());
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to load job openings", severity: "error" });
    } finally {
      setJobsLoading(false);
    }
  };

  const loadApplications = async () => {
    setAppsLoading(true);
    try {
      setApplications(await getAllApplications());
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to load applications", severity: "error" });
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  const newApplicationsCount = applications.filter((a) => a.status === "New").length;

  // ---- Job handlers ----
  const openAddJob = () => {
    setEditingJobId(null);
    setJobForm(emptyJobForm);
    setJobDialogOpen(true);
  };

  const openEditJob = (job: JobOpening) => {
    setEditingJobId(job.id!);
    setJobForm({
      title: job.title,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description || "",
    });
    setJobDialogOpen(true);
  };

  const handleJobSubmit = async () => {
    if (!jobForm.title || !jobForm.location || !jobForm.experience) {
      setSnack({ open: true, msg: "Please fill in all required fields", severity: "error" });
      return;
    }
    setSavingJob(true);
    try {
      if (editingJobId) {
        await updateJob(editingJobId, jobForm);
        setSnack({ open: true, msg: "Job updated", severity: "success" });
      } else {
        await addJob(jobForm);
        setSnack({ open: true, msg: "Job published", severity: "success" });
      }
      setJobDialogOpen(false);
      loadJobs();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Something went wrong", severity: "error" });
    } finally {
      setSavingJob(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Remove this job opening?")) return;
    try {
      await deleteJob(id);
      setSnack({ open: true, msg: "Job removed", severity: "success" });
      loadJobs();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to remove job", severity: "error" });
    }
  };

  // ---- Application handlers ----
  const handleStatusChange = async (id: string, status: JobApplication["status"]) => {
    try {
      await updateApplicationStatus(id, status);
      loadApplications();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to update status", severity: "error" });
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      setSnack({ open: true, msg: "Application deleted", severity: "success" });
      loadApplications();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to delete", severity: "error" });
    }
  };

  return (
    <AdminLayout title="Careers">
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": { background: "#8BC53F", height: "3px" },
        }}
      >
        <Tab
          label="Job Openings"
          sx={{ textTransform: "none", fontWeight: 700, fontSize: "13.5px" }}
        />
        <Tab
          label={
            <Badge badgeContent={newApplicationsCount} color="error">
              <Box sx={{ pr: newApplicationsCount > 0 ? 1.5 : 0 }}>Applications</Box>
            </Badge>
          }
          sx={{ textTransform: "none", fontWeight: 700, fontSize: "13.5px" }}
        />
      </Tabs>

      {/* ===== JOB OPENINGS TAB ===== */}
      {tab === 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography sx={{ color: "#667085", fontSize: "14px" }}>
              {jobs.length} open position{jobs.length !== 1 ? "s" : ""}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={openAddJob}
              sx={{
                background: "#102048",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                "&:hover": { background: "#08142e" },
              }}
            >
              Add Job Opening
            </Button>
          </Box>

          {jobsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#8BC53F" }} />
            </Box>
          ) : jobs.length === 0 ? (
            <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: "18px", border: "1px solid #edf1f7" }}>
              <Typography sx={{ fontWeight: 700, color: "#102048", mb: 1 }}>No job openings yet</Typography>
              <Typography sx={{ color: "#667085", fontSize: "13px" }}>
                Click &quot;Add Job Opening&quot; to post your first role.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {jobs.map((job) => (
                <Paper
                  key={job.id}
                  elevation={0}
                  sx={{
                    p: 2.4,
                    borderRadius: "16px",
                    border: "1px solid #edf1f7",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px" }}>
                      {job.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5, mt: 0.6, flexWrap: "wrap" }}>
                      <Chip label={job.location} size="small" sx={{ fontSize: "11px", height: "22px" }} />
                      <Chip label={job.type} size="small" sx={{ fontSize: "11px", height: "22px" }} />
                      <Chip label={job.experience} size="small" sx={{ fontSize: "11px", height: "22px" }} />
                    </Box>
                  </Box>
                  <IconButton onClick={() => openEditJob(job)} sx={{ background: "#f5f7fb" }}>
                    <EditRoundedIcon sx={{ fontSize: 18, color: "#102048" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteJob(job.id!)} sx={{ background: "#fef2f2" }}>
                    <DeleteRoundedIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          )}
        </>
      )}

      {/* ===== APPLICATIONS TAB ===== */}
      {tab === 1 && (
        <>
          {appsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#8BC53F" }} />
            </Box>
          ) : applications.length === 0 ? (
            <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: "18px", border: "1px solid #edf1f7" }}>
              <Typography sx={{ fontWeight: 700, color: "#102048", mb: 1 }}>No applications yet</Typography>
              <Typography sx={{ color: "#667085", fontSize: "13px" }}>
                Submissions from the careers page will show up here.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {applications.map((app) => (
                <Paper
                  key={app.id}
                  elevation={0}
                  sx={{ p: 2.4, borderRadius: "16px", border: "1px solid #edf1f7" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, mb: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px" }}>
                        {app.name}
                      </Typography>
                      <Typography sx={{ color: "#8BC53F", fontSize: "12px", fontWeight: 700, mt: 0.3 }}>
                        Applying for: {app.position}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleDeleteApplication(app.id!)} sx={{ background: "#fef2f2" }}>
                      <DeleteRoundedIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                      <EmailRoundedIcon sx={{ fontSize: 15, color: "#667085" }} />
                      <Typography sx={{ fontSize: "12.5px", color: "#475467" }}>{app.email}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                      <PhoneRoundedIcon sx={{ fontSize: 15, color: "#667085" }} />
                      <Typography sx={{ fontSize: "12.5px", color: "#475467" }}>{app.phone}</Typography>
                    </Box>
                  </Box>

                  {app.message && (
                    <Typography sx={{ fontSize: "13px", color: "#667085", lineHeight: 1.7, mb: 1.5 }}>
                      {app.message}
                    </Typography>
                  )}

                  <Select
                    size="small"
                    value={app.status || "New"}
                    onChange={(e) => handleStatusChange(app.id!, e.target.value as JobApplication["status"])}
                    sx={{
                      borderRadius: "8px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      height: "34px",
                      color: statusColors[app.status || "New"],
                    }}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Reviewed">Reviewed</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </Paper>
              ))}
            </Box>
          )}
        </>
      )}

      {/* JOB FORM DIALOG */}
      <Dialog open={jobDialogOpen} onClose={() => setJobDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800, color: "#102048" }}>
          {editingJobId ? "Edit Job Opening" : "Add Job Opening"}
        </DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField
            label="Job Title"
            value={jobForm.title}
            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Location"
            value={jobForm.location}
            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
            fullWidth
            placeholder="e.g. New Delhi, Remote"
          />
          <TextField
            select
            label="Job Type"
            value={jobForm.type}
            onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
            fullWidth
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <TextField
            label="Experience Required"
            value={jobForm.experience}
            onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
            fullWidth
            placeholder="e.g. 2+ Years, Fresher / Experienced"
          />
          <TextField
            label="Description (optional)"
            value={jobForm.description}
            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
            fullWidth
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setJobDialogOpen(false)} sx={{ textTransform: "none", fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleJobSubmit}
            disabled={savingJob}
            sx={{
              background: "#8BC53F",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              "&:hover": { background: "#74ab35" },
            }}
          >
            {savingJob ? "Saving..." : editingJobId ? "Update" : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}