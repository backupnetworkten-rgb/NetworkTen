"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

export default function ShareLinkDialog({
  open,
  link,
  onClose,
}: {
  open: boolean;
  link: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable — user can select & copy manually */
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: "18px", m: 2 } } }}
    >
      <DialogContent sx={{ p: 3, textAlign: "center" }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "13px",
            background: "rgba(139,197,63,0.12)",
            color: "#4b7a1f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 1.5,
          }}
        >
          <LinkRoundedIcon fontSize="small" />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#08142e", mb: 0.5 }}>
          Report saved — share this link
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "13px", mb: 2 }}>
          Send this link to the engineer or customer so they can complete the
          rest of the report and sign off.
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={link}
          slotProps={{ input: { readOnly: true } }}
          sx={{ mb: 1.5, "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#fbfcfd" } }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleCopy}
          startIcon={copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
          sx={{
            background: copied ? "#8BC53F" : "#08142e",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            py: 1,
            "&:hover": { background: copied ? "#74ab35" : "#0d1c3f" },
          }}
        >
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button fullWidth onClick={onClose} sx={{ color: "#667085", textTransform: "none", fontWeight: 600 }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}