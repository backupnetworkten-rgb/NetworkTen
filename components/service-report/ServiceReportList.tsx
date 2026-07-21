"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Snackbar,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { ServiceReport } from "@/types/serviceReport";

interface Props {
  reports: ServiceReport[];
  canManage: boolean;
  onEdit: (report: ServiceReport) => void;
  onDelete: (report: ServiceReport) => void;
  onDownload: (report: ServiceReport) => void;
}

const ratingColor: Record<string, string> = {
  "Extremely Satisfied": "#8BC53F",
  Satisfied: "#4C9AFF",
  Dissatisfied: "#F59E0B",
  Annoyed: "#EF4444",
};

export default function ServiceReportList({
  reports,
  canManage,
  onEdit,
  onDelete,
  onDownload,
}: Props) {
  const [copiedMsg, setCopiedMsg] = useState(false);

  const handleCopyLink = async (r: ServiceReport) => {
    const link = `${window.location.origin}/service-report/fill/${r.shareToken}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedMsg(true);
    } catch {
      /* ignore */
    }
  };

  if (reports.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography sx={{ color: "#667085" }}>
          No service reports yet. Click &quot;New Service Report&quot; to add one.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 950 }}>
        <TableHead>
          <TableRow sx={{ "& th": { fontWeight: 800, color: "#08142e", borderBottom: "2px solid #eef2f7" } }}>
            <TableCell>CSR No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Engineer(s)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell sx={{ fontWeight: 700 }}>{r.csrNo || "-"}</TableCell>
              <TableCell>{r.date}</TableCell>
              <TableCell>{r.customerName}</TableCell>
              <TableCell>{r.engineerNames}</TableCell>
              <TableCell>
                {r.status === "completed" ? (
                  <Chip
                    label="Completed"
                    size="small"
                    sx={{ fontWeight: 600, background: "rgba(139,197,63,0.12)", color: "#4b7a1f" }}
                  />
                ) : (
                  <Chip
                    label="Pending Completion"
                    size="small"
                    sx={{ fontWeight: 600, background: "rgba(240,162,2,0.12)", color: "#8a5c00" }}
                  />
                )}
              </TableCell>
              <TableCell>
                {r.status === "completed" ? (
                  <Chip
                    label={r.customerRating}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      color: "#fff",
                      background: ratingColor[r.customerRating] || "#667085",
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: "12px", color: "#98a2b3" }}>—</Typography>
                )}
              </TableCell>
              <TableCell align="right">
                {r.status === "completed" ? (
                  <Tooltip title="Download PDF">
                    <IconButton onClick={() => onDownload(r)} sx={{ color: "#08142e" }}>
                      <PictureAsPdfRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Copy fill-in link">
                    <IconButton onClick={() => handleCopyLink(r)} sx={{ color: "#3F6FE0" }}>
                      <LinkRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {canManage && (
                  <>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => onEdit(r)} sx={{ color: "#8BC53F" }}>
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => onDelete(r)} sx={{ color: "#EF4444" }}>
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={copiedMsg}
        autoHideDuration={2000}
        onClose={() => setCopiedMsg(false)}
        message="Link copied to clipboard"
      />
    </Box>
  );
}