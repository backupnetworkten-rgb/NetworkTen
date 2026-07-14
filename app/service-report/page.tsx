"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, TextField, InputAdornment } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  subscribeServiceReports,
  createServiceReport,
  updateServiceReport,
  deleteServiceReport,
} from "@/services/serviceReportService";
import { ServiceReport } from "@/types/serviceReport";
import { generateServiceReportPDF } from "@/lib/generateServiceReportPDF";
import ServiceReportForm from "@/components/service-report/ServiceReportForm";
import ServiceReportList from "@/components/service-report/ServiceReportList";
import DeleteConfirmDialog from "@/components/service-report/DeleteConfirmDialog";

export default function ServiceReportPage() {
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceReport | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<ServiceReport | null>(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    const unsubReports = subscribeServiceReports(setReports);
    return () => {
      unsubAuth();
      unsubReports();
    };
  }, []);

  const canManage = !!user; // only signed-in admins can create/edit/delete

  const filtered = reports.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.csrNo?.toLowerCase().includes(term) ||
      r.customerName?.toLowerCase().includes(term) ||
      r.engineerNames?.toLowerCase().includes(term)
    );
  });

  const handleSave = async (data: ServiceReport) => {
    if (editing?.id) {
      const { id, createdAt, updatedAt, ...rest } = data;
      await updateServiceReport(editing.id, rest);
    } else {
      const { id, createdAt, updatedAt, ...rest } = data;
      await createServiceReport(rest);
    }
    setEditing(null);
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteServiceReport(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <Box sx={{ background: "#f6faff", minHeight: "80vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "22px", md: "28px" }, color: "#08142e" }}>
              Customer Service Reports
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: "13px" }}>
              Create, manage and download service reports as PDF.
            </Typography>
          </Box>

          {canManage && (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
              sx={{
                background: "#8BC53F",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "40px",
                px: 3,
                "&:hover": { background: "#74ab35" },
              }}
            >
              New Service Report
            </Button>
          )}
        </Box>

        <TextField
          placeholder="Search by CSR No, Customer or Engineer..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            background: "#fff",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#98a2b3" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ background: "#fff", borderRadius: "18px", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", p: { xs: 1, md: 2 } }}>
          <ServiceReportList
            reports={filtered}
            canManage={canManage}
            onEdit={(r) => {
              setEditing(r);
              setFormOpen(true);
            }}
            onDelete={(r) => setDeleteTarget(r)}
            onDownload={(r) => generateServiceReportPDF(r)}
          />
        </Box>

        {!canManage && (
          <Typography sx={{ mt: 2, fontSize: "12px", color: "#98a2b3" }}>
            Sign in as an admin to create, edit or delete reports.
          </Typography>
        )}
      </Container>

      <ServiceReportForm
        open={formOpen}
        initialData={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        existingCsrNumbers={reports.map((r) => r.csrNo)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        csrNo={deleteTarget?.csrNo}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}