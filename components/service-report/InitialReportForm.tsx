"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { ServiceReport, emptyServiceReport, NATURE_OF_CALL_OPTIONS } from "@/types/serviceReport";
import { Section, fieldSx, dateSlotProps, ACCENTS } from "./FormPieces";

interface Props {
  open: boolean;
  initialData?: ServiceReport | null;
  onClose: () => void;
  onSave: (data: Omit<ServiceReport, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  existingCsrNumbers?: string[];
}

function generateCsrNo(existing: string[] = []): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const existingSet = new Set(existing.filter(Boolean));

  let seq = 1;
  let candidate = `CSR-${datePart}-${String(seq).padStart(4, "0")}`;
  while (existingSet.has(candidate)) {
    seq += 1;
    candidate = `CSR-${datePart}-${String(seq).padStart(4, "0")}`;
  }
  return candidate;
}

export default function InitialReportForm({
  open,
  initialData,
  onClose,
  onSave,
  existingCsrNumbers = [],
}: Props) {
  const [form, setForm] = useState<ServiceReport>(emptyServiceReport);
  const [saving, setSaving] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else if (open) {
      setForm({
        ...emptyServiceReport,
        csrNo: generateCsrNo(existingCsrNumbers),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, open]);

  const handleChange =
    (field: keyof ServiceReport) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleRegenerateCsr = () => {
    setForm((prev) => ({ ...prev, csrNo: generateCsrNo(existingCsrNumbers) }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const { id, createdAt, updatedAt, ...rest } = form;
      await onSave(rest);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : "18px",
            width: fullScreen ? "100%" : undefined,
            height: fullScreen ? "100%" : undefined,
            maxHeight: fullScreen ? "100%" : "90vh",
            m: fullScreen ? 0 : 4,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1rem", sm: "1.25rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          background: "linear-gradient(135deg, #08142e 0%, #16294f 100%)",
          color: "#fff",
          py: { xs: 1.5, sm: 2.25 },
          px: { xs: 2, sm: 3 },
          flexShrink: 0,
        }}
      >
        <Box component="span" sx={{ wordBreak: "break-word" }}>
          {initialData ? "Edit Service Report" : "New Service Report"}
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "#fff", flexShrink: 0 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background: "linear-gradient(180deg, #f6f8fb 0%, #fbfbfd 220px, #fbfbfd 100%)",
          pt: 3,
          px: { xs: 1.5, sm: 3 },
          pb: { xs: 3, sm: 3 },
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Report Info */}
        <Section title="Report Info" icon={<DescriptionIcon fontSize="small" />} accentColor={ACCENTS.reportInfo}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="CSR No."
              fullWidth
              sx={fieldSx}
              value={form.csrNo}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <Tooltip title="Generate a new CSR No.">
                      <IconButton size="small" onClick={handleRegenerateCsr}>
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ),
                },
              }}
              helperText="Auto-generated and unique — click the icon to regenerate"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              sx={fieldSx}
              slotProps={dateSlotProps}
              value={form.date}
              onChange={handleChange("date")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Event Date"
              type="date"
              fullWidth
              sx={fieldSx}
              slotProps={dateSlotProps}
              value={form.eventDateTime}
              onChange={handleChange("eventDateTime")}
            />
          </Grid>
        </Section>

        {/* Customer Details */}
        <Section title="Customer Details" icon={<PersonIcon fontSize="small" />} accentColor={ACCENTS.customer}>
          <Grid size={12}>
            <TextField
              label="Customer Name"
              fullWidth
              sx={fieldSx}
              value={form.customerName}
              onChange={handleChange("customerName")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Address"
              fullWidth
              sx={fieldSx}
              value={form.address}
              onChange={handleChange("address")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="City"
              fullWidth
              sx={fieldSx}
              value={form.city}
              onChange={handleChange("city")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="State"
              fullWidth
              sx={fieldSx}
              value={form.state}
              onChange={handleChange("state")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Zip Code"
              fullWidth
              sx={fieldSx}
              value={form.zipCode}
              onChange={handleChange("zipCode")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Location of Installation"
              fullWidth
              sx={fieldSx}
              value={form.locationOfInstallation}
              onChange={handleChange("locationOfInstallation")}
            />
          </Grid>
        </Section>

        {/* Engineer Details */}
        <Section title="Engineer Details" icon={<EngineeringIcon fontSize="small" />} accentColor={ACCENTS.engineer}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Engineer Name(s)"
              fullWidth
              sx={fieldSx}
              value={form.engineerNames}
              onChange={handleChange("engineerNames")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Mobile No."
              fullWidth
              sx={fieldSx}
              value={form.engineerMobile}
              onChange={handleChange("engineerMobile")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Engineer Email"
              fullWidth
              sx={fieldSx}
              value={form.engineerEmail}
              onChange={handleChange("engineerEmail")}
            />
          </Grid>
        </Section>

        {/* Call Details */}
        <Section title="Call Details" icon={<PhoneInTalkIcon fontSize="small" />} accentColor={ACCENTS.call}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Nature of Call"
              fullWidth
              sx={fieldSx}
              value={form.natureOfCall}
              onChange={handleChange("natureOfCall")}
            >
              {NATURE_OF_CALL_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Instruction From"
              fullWidth
              sx={fieldSx}
              value={form.instructionFrom}
              onChange={handleChange("instructionFrom")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Nature of Problem"
              fullWidth
              sx={fieldSx}
              value={form.natureOfProblem}
              onChange={handleChange("natureOfProblem")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Detail Problem Reported"
              fullWidth
              multiline
              minRows={3}
              sx={fieldSx}
              value={form.detailProblemReported}
              onChange={handleChange("detailProblemReported")}
            />
          </Grid>
        </Section>

        {/* Equipment (as reported at intake) */}
        <Section title="Equipment (as reported)" icon={<Inventory2Icon fontSize="small" />} accentColor={ACCENTS.equipment}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Equipment Type"
              fullWidth
              sx={fieldSx}
              value={form.equipmentType}
              onChange={handleChange("equipmentType")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Make"
              fullWidth
              sx={fieldSx}
              value={form.make}
              onChange={handleChange("make")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Model"
              fullWidth
              sx={fieldSx}
              value={form.model}
              onChange={handleChange("model")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Serial No."
              fullWidth
              sx={fieldSx}
              value={form.serialNo}
              onChange={handleChange("serialNo")}
            />
          </Grid>
        </Section>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 1.5, sm: 2.5 },
          borderTop: "1px solid #eef1f6",
          background: "#fff",
          flexShrink: 0,
          gap: 1,
          pb: { xs: "calc(12px + env(safe-area-inset-bottom))", sm: 2.5 },
        }}
      >
        <Button onClick={onClose} sx={{ color: "#667085", textTransform: "none", fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={saving}
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(135deg, #8BC53F 0%, #6ea82c 100%)",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            boxShadow: "0 2px 8px rgba(139, 197, 63, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #7cb436 0%, #5f9425 100%)",
            },
          }}
        >
          {saving ? "Saving..." : initialData ? "Save Changes" : "Save & Generate Link"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}