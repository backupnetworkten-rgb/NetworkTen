"use client";

import React, { useState } from "react";
import { Grid, TextField, MenuItem, Typography, Button, Box } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import StarIcon from "@mui/icons-material/Star";
import {
  ServiceReport,
  EQUIPMENT_STATUS_OPTIONS,
  STATUS_AFTER_SERVICE_OPTIONS,
  CUSTOMER_RATING_OPTIONS,
} from "@/types/serviceReport";
import { Section, SignaturePad, fieldSx, dateSlotProps, ACCENTS } from "./FormPieces";

interface Props {
  report: ServiceReport;
  onSubmit: (partB: Partial<ServiceReport>) => Promise<void>;
}

export default function CompletionForm({ report, onSubmit }: Props) {
  const [form, setForm] = useState({
    equipmentStatus: report.equipmentStatus || "Working",
    equipmentsDetails: report.equipmentsDetails || "",
    engineerRemarks: report.engineerRemarks || "",
    statusAfterService: report.statusAfterService || "Complete",
    defectsFoundOnInspection: report.defectsFoundOnInspection || "",
    startOfService: report.startOfService || "",
    endOfService: report.endOfService || "",
    customerRating: report.customerRating || "Satisfied",
    customerFeedbackRemarks: report.customerFeedbackRemarks || "",
    customerRepName: report.customerRepName || "",
    customerRepDesignation: report.customerRepDesignation || "",
    customerRepPhone: report.customerRepPhone || "",
    customerRepEmail: report.customerRepEmail || "",
    signatureDate: report.signatureDate || new Date().toISOString().slice(0, 10),
    signaturePlace: report.signaturePlace || "",
    customerSignature: report.customerSignature || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    setError("");
    if (!form.customerSignature) {
      setError("Please add the customer signature before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
      setDone(true);
    } catch {
      setError("Something went wrong while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "18px", color: "#08142e", mb: 1 }}>
          Thank you — report submitted
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "13.5px" }}>
          The service report has been completed. You can close this page now.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Section title="Equipment Status" icon={<Inventory2Icon fontSize="small" />} accentColor={ACCENTS.equipment}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Equipment Status"
            fullWidth
            sx={fieldSx}
            value={form.equipmentStatus}
            onChange={handleChange("equipmentStatus")}
          >
            {EQUIPMENT_STATUS_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} />
        <Grid size={12}>
          <TextField
            label="Equipment / Work Details"
            fullWidth
            multiline
            minRows={2}
            sx={fieldSx}
            value={form.equipmentsDetails}
            onChange={handleChange("equipmentsDetails")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Start of Service"
            type="time"
            fullWidth
            sx={fieldSx}
            slotProps={dateSlotProps}
            value={form.startOfService}
            onChange={handleChange("startOfService")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="End of Service"
            type="time"
            fullWidth
            sx={fieldSx}
            slotProps={dateSlotProps}
            value={form.endOfService}
            onChange={handleChange("endOfService")}
          />
        </Grid>
      </Section>

      <Section title="Service Summary" icon={<AssignmentTurnedInIcon fontSize="small" />} accentColor={ACCENTS.summary}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Engineer's Remarks"
            fullWidth
            multiline
            minRows={3}
            sx={fieldSx}
            value={form.engineerRemarks}
            onChange={handleChange("engineerRemarks")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Status after Service"
            fullWidth
            sx={fieldSx}
            value={form.statusAfterService}
            onChange={handleChange("statusAfterService")}
          >
            {STATUS_AFTER_SERVICE_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={12}>
          <TextField
            label="Defects Found on Inspection"
            fullWidth
            sx={fieldSx}
            value={form.defectsFoundOnInspection}
            onChange={handleChange("defectsFoundOnInspection")}
          />
        </Grid>
      </Section>

      <Section title="Customer Feedback" icon={<StarIcon fontSize="small" />} accentColor={ACCENTS.feedback}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Customer Rating"
            fullWidth
            sx={fieldSx}
            value={form.customerRating}
            onChange={handleChange("customerRating")}
          >
            {CUSTOMER_RATING_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Feedback Remarks"
            fullWidth
            sx={fieldSx}
            value={form.customerFeedbackRemarks}
            onChange={handleChange("customerFeedbackRemarks")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Customer Rep. Name"
            fullWidth
            sx={fieldSx}
            value={form.customerRepName}
            onChange={handleChange("customerRepName")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Designation"
            fullWidth
            sx={fieldSx}
            value={form.customerRepDesignation}
            onChange={handleChange("customerRepDesignation")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone"
            fullWidth
            sx={fieldSx}
            value={form.customerRepPhone}
            onChange={handleChange("customerRepPhone")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            fullWidth
            sx={fieldSx}
            value={form.customerRepEmail}
            onChange={handleChange("customerRepEmail")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Signature Date"
            type="date"
            fullWidth
            sx={fieldSx}
            slotProps={dateSlotProps}
            value={form.signatureDate}
            onChange={handleChange("signatureDate")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Place"
            fullWidth
            sx={fieldSx}
            value={form.signaturePlace}
            onChange={handleChange("signaturePlace")}
          />
        </Grid>
        <Grid size={12}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#344054", mb: 1 }}>
            Customer Signature
          </Typography>
          <SignaturePad
            value={form.customerSignature}
            onChange={(v) => setForm((p) => ({ ...p, customerSignature: v }))}
          />
        </Grid>
      </Section>

      {error && (
        <Typography sx={{ color: "#EF4444", fontSize: "13px", fontWeight: 600, mb: 1.5 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        disabled={submitting}
        onClick={handleSubmit}
        sx={{
          background: "linear-gradient(135deg, #8BC53F 0%, #6ea82c 100%)",
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "10px",
          py: 1.3,
          fontSize: "14px",
          boxShadow: "0 6px 16px rgba(139,197,63,0.35)",
        }}
      >
        {submitting ? "Submitting..." : "Submit Report"}
      </Button>
    </Box>
  );
}