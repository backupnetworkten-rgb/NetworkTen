"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  csrNo?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmDialog({ open, csrNo, onClose, onConfirm }: Props) {
  const [deleting, setDeleting] = React.useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 800 }}>Delete Service Report</DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "#475467" }}>
          Are you sure you want to delete report{" "}
          <strong>{csrNo || "this report"}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "#667085" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={deleting}
          onClick={handleConfirm}
          sx={{ fontWeight: 700, textTransform: "none", borderRadius: "10px" }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}