"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import StarIcon from "@mui/icons-material/Star";
import {
  ServiceReport,
  emptyServiceReport,
  NATURE_OF_CALL_OPTIONS,
  EQUIPMENT_STATUS_OPTIONS,
  STATUS_AFTER_SERVICE_OPTIONS,
  CUSTOMER_RATING_OPTIONS,
} from "@/types/serviceReport";

interface Props {
  open: boolean;
  initialData?: ServiceReport | null;
  onClose: () => void;
  onSave: (data: ServiceReport) => Promise<void>;
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

/**
 * IMPORTANT: This must stay a module-level (top-level) component, NOT be
 * defined inside ServiceReportForm. If it's declared inside the parent
 * function body, a brand new function reference is created on every
 * re-render, which makes React treat it as a totally different component
 * type and remount its entire subtree (including every TextField) on each
 * keystroke — that's what was causing focus to jump after one character.
 */
function Section({
  title,
  icon,
  accentColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: "16px",
        border: "1px solid #eef0f4",
        borderLeft: `5px solid ${accentColor}`,
        mb: { xs: 2, sm: 3 },
        background: "#ffffff",
        boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 14px rgba(16, 24, 40, 0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            minWidth: 34,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${accentColor}1A`,
            color: accentColor,
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            color: "#08142e",
            fontSize: { xs: "0.98rem", sm: "1.08rem" },
            letterSpacing: "0.2px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2.5, mt: 1.5 }} />
      <Grid container spacing={2.5}>
        {children}
      </Grid>
    </Paper>
  );
}

function SignaturePad({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const hasContent = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = value;
      hasContent.current = true;
    } else {
      hasContent.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawing.current = true;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#08142e";
    ctx.lineTo(x, y);
    ctx.stroke();
    hasContent.current = true;
  };

  const endDraw = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas && hasContent.current) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    hasContent.current = false;
    onChange("");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        borderColor: "#d7dce3",
        p: 1.25,
        background: "#fff",
      }}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        style={{
          width: "100%",
          height: "180px",
          touchAction: "none",
          cursor: "crosshair",
          borderRadius: "8px",
          background:
            "repeating-linear-gradient(0deg, #fff, #fff 39px, #eef1f6 40px)",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "#98a2b3" }}>
          Sign above using mouse or touch
        </Typography>
        <Tooltip title="Clear signature">
          <IconButton size="small" onClick={clearPad}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fbfcfd",
    "&.Mui-focused": {
      background: "#ffffff",
    },
  },
};

const dateSlotProps = {
  inputLabel: { shrink: true },
};

// Accent color per section — gives the form a colorful, premium feel
// without leaning on MUI's default palette everywhere.
const ACCENTS = {
  reportInfo: "#3F6FE0",
  customer: "#8BC53F",
  engineer: "#F0A202",
  call: "#E4572E",
  equipment: "#6A4C93",
  summary: "#17A398",
  feedback: "#D7263D",
};

export default function ServiceReportForm({
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

  const handleSignatureChange = (dataUrl: string) => {
    setForm((prev) => ({ ...prev, customerSignature: dataUrl }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(form);
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
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : "18px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #08142e 0%, #16294f 100%)",
          color: "#fff",
          py: { xs: 1.75, sm: 2.25 },
        }}
      >
        {initialData ? "Edit Service Report" : "New Service Report"}
        <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background:
            "linear-gradient(180deg, #f6f8fb 0%, #fbfbfd 220px, #fbfbfd 100%)",
          pt: 3,
          px: { xs: 1.75, sm: 3 },
        }}
      >
        {/* Report Info */}
        <Section
          title="Report Info"
          icon={<DescriptionIcon fontSize="small" />}
          accentColor={ACCENTS.reportInfo}
        >
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
        </Section>

        {/* Customer Details */}
        <Section
          title="Customer Details"
          icon={<PersonIcon fontSize="small" />}
          accentColor={ACCENTS.customer}
        >
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
              label="Location"
              fullWidth
              sx={fieldSx}
              value={form.address}
              onChange={handleChange("address")}
            />
          </Grid>
        </Section>

        {/* Engineer Details */}
        <Section
          title="Engineer Details"
          icon={<EngineeringIcon fontSize="small" />}
          accentColor={ACCENTS.engineer}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Engineer Name(s)"
              fullWidth
              sx={fieldSx}
              value={form.engineerNames}
              onChange={handleChange("engineerNames")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Mobile No."
              fullWidth
              sx={fieldSx}
              value={form.engineerMobile}
              onChange={handleChange("engineerMobile")}
            />
          </Grid>
        </Section>

        {/* Call Details */}
        <Section
          title="Call Details"
          icon={<PhoneInTalkIcon fontSize="small" />}
          accentColor={ACCENTS.call}
        >
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

        {/* Equipment Details */}
        <Section
          title="Equipment Details"
          icon={<Inventory2Icon fontSize="small" />}
          accentColor={ACCENTS.equipment}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Equipment Type"
              fullWidth
              sx={fieldSx}
              value={form.equipmentType}
              onChange={handleChange("equipmentType")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Serial No."
              fullWidth
              sx={fieldSx}
              value={form.serialNo}
              onChange={handleChange("serialNo")}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Product Details"
              fullWidth
              multiline
              minRows={2}
              sx={fieldSx}
              value={form.equipmentsDetails}
              onChange={handleChange("equipmentsDetails")}
            />
          </Grid>
        </Section>

        {/* Service Summary */}
        <Section
          title="Service Summary"
          icon={<AssignmentTurnedInIcon fontSize="small" />}
          accentColor={ACCENTS.summary}
        >
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

        {/* Customer Feedback */}
        <Section
          title="Customer Feedback"
          icon={<StarIcon fontSize="small" />}
          accentColor={ACCENTS.feedback}
        >
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
              label="Phone / Fax"
              fullWidth
              sx={fieldSx}
              value={form.customerRepPhone}
              onChange={handleChange("customerRepPhone")}
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

          {/* Customer Signature */}
          <Grid size={12}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#344054", mb: 1 }}
            >
              Customer Signature
            </Typography>
            <SignaturePad
              value={form.customerSignature}
              onChange={handleSignatureChange}
            />
          </Grid>
        </Section>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          borderTop: "1px solid #eef1f6",
          background: "#fff",
          position: { xs: "sticky", sm: "static" },
          bottom: 0,
        }}
      >
        <Button
          onClick={onClose}
          sx={{ color: "#667085", textTransform: "none", fontWeight: 600 }}
        >
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
          {saving ? "Saving..." : "Save Report"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}