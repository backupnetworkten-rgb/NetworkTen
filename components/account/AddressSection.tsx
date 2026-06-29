"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { saveAddress, updateAddress, deleteAddress } from "@/services/userService";
import { Address, UserData } from "@/types/user";
import PanelHeader from "./PanelHeader";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const emptyForm: Address = {
  id: "",
  tag: "Home",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pin: "",
};

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Home:  { bg: "rgba(42,82,190,0.10)",  color: "#2A52BE" },
  Work:  { bg: "rgba(22,160,133,0.10)", color: "#16A085" },
  Other: { bg: "rgba(120,90,190,0.10)", color: "#785ABE" },
};

export default function AddressSection({ user }: { user: UserData | null }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Address>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; severity: "success" | "error" } | null>(null);
  const [formError, setFormError] = useState("");

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setOpen(true);
  };

  const openEdit = (a: Address) => {
    setEditingId(a.id);
    setForm(a);
    setFormError("");
    setOpen(true);
  };

  const save = async () => {
    setFormError("");
    if (!form.name.trim() || !form.line1.trim() || !form.city.trim() || !form.pin.trim()) {
      setFormError("Please fill in name, address line 1, city, and PIN code.");
      return;
    }
    try {
      setSaving(true);
      if (editingId) {
        await updateAddress(editingId, form);
      } else {
        await saveAddress({ ...form, id: Date.now().toString() });
      }
      setOpen(false);
      setToast({ msg: "Address saved successfully", severity: "success" });
    } catch (err: any) {
      setToast({ msg: err.message || "Unable to save address", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteAddress(id);
      setToast({ msg: "Address removed", severity: "success" });
    } catch (err: any) {
      setToast({ msg: err.message || "Unable to remove address", severity: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const addresses = user?.addresses || [];

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 3, md: 4 }, borderRadius: "28px", border: "1px solid #E7E9F0", background: "#fff" }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2
        }}>
        <PanelHeader
          icon={LocationOnRoundedIcon}
          eyebrow="Delivery"
          title="Addresses"
          subtitle="Where we deliver your orders"
        />
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={openAdd}
          sx={{
            flexShrink: 0,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13.5,
            px: 2.25,
            py: 1.1,
            background: "linear-gradient(135deg,#0A1130,#1B2B57)",
            boxShadow: "0 4px 14px rgba(10,17,48,0.18)",
            "&:hover": {
              background: "linear-gradient(135deg,#0A1130,#26397A)",
              boxShadow: "0 6px 18px rgba(10,17,48,0.26)",
            },
          }}
        >
          Add new
        </Button>
      </Box>
      <Divider sx={{ my: 3.5, borderColor: "#F0F1F6" }} />
      {/* Empty state */}
      {addresses.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 7,
            border: "1.5px dashed #E0E3ED",
            borderRadius: "20px",
            color: "#8A91A8",
          }}
        >
          <LocationOnRoundedIcon sx={{ fontSize: 34, mb: 1.25, color: "#C2CBED" }} />
          <Typography sx={{ fontWeight: 600, fontSize: 14.5, color: "#8A91A8" }}>
            No addresses saved yet
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#B0B6C8", mt: 0.5 }}>
            Add your first delivery address to get started.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          {addresses.map((a) => {
            const tagStyle = TAG_COLORS[a.tag] || TAG_COLORS["Other"];
            return (
              <Paper
                key={a.id}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "18px",
                  border: "1px solid #E7E9F0",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  "&:hover": { boxShadow: "0 8px 28px rgba(10,17,48,0.07)", borderColor: "#D2D7E8" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1
                  }}>
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0
                    }}>
                    <Chip
                      label={a.tag}
                      size="small"
                      sx={{
                        mb: 1.25,
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        background: tagStyle.bg,
                        color: tagStyle.color,
                        borderRadius: "7px",
                        height: 22,
                      }}
                    />
                    <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: "#11162B" }}>
                      {a.name}
                    </Typography>
                    <Typography sx={{ color: "#5B6178", fontSize: 13.5, mt: 0.25 }}>
                      {[a.line1, a.line2].filter(Boolean).join(", ")}
                    </Typography>
                    <Typography sx={{ color: "#5B6178", fontSize: 13.5 }}>
                      {[a.city, a.state, a.pin].filter(Boolean).join(", ")}
                    </Typography>
                    {a.phone && (
                      <Typography sx={{ color: "#8A91A8", fontSize: 13, mt: 0.5 }}>
                        {a.phone}
                      </Typography>
                    )}
                  </Box>

                  <Stack direction="row" spacing={0.25} sx={{
                    flexShrink: 0
                  }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => openEdit(a)}
                        sx={{
                          color: "#5B6178",
                          borderRadius: "9px",
                          "&:hover": { color: "#2A52BE", background: "rgba(42,82,190,0.08)" },
                        }}
                      >
                        <EditRoundedIcon sx={{ fontSize: 17 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        disabled={deletingId === a.id}
                        onClick={() => remove(a.id)}
                        sx={{
                          color: "#5B6178",
                          borderRadius: "9px",
                          "&:hover": { color: "#C8553D", background: "rgba(200,85,61,0.08)" },
                        }}
                      >
                        {deletingId === a.id ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}
      {/* Premium Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            boxShadow: "0 24px 60px rgba(10,17,48,0.18)",
            overflow: "hidden",
          },
        }}
      >
        {/* Dialog dark header */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#0A1130 0%,#1B2B57 100%)",
            px: 3.5,
            py: 2.75,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5
            }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocationOnRoundedIcon sx={{ color: "#7EA8FF", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>
                {editingId ? "Edit address" : "Add a new address"}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                {editingId ? "Update your saved address" : "Save a delivery address"}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: "rgba(255,255,255,0.6)",
              borderRadius: "10px",
              "&:hover": { color: "#fff", background: "rgba(255,255,255,0.08)" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3.5, py: 3 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: "12px", fontSize: 13.5 }}>
              {formError}
            </Alert>
          )}

          <Box
            sx={{
              display: "grid",
              gap: 2
            }}>
            <TextField
              select
              fullWidth
              label="Address label"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value as Address["tag"] })}
              sx={dialogFieldSx}
            >
              <MenuItem value="Home">🏠 Home</MenuItem>
              <MenuItem value="Work">💼 Work</MenuItem>
              <MenuItem value="Other">📍 Other</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2
              }}>
              <TextField
                fullWidth
                label="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={dialogFieldSx}
              />
              <TextField
                fullWidth
                label="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                sx={dialogFieldSx}
              />
            </Box>

            <TextField
              fullWidth
              label="Address line 1"
              placeholder="Street, flat/house no."
              value={form.line1}
              onChange={(e) => setForm({ ...form, line1: e.target.value })}
              sx={dialogFieldSx}
            />

            <TextField
              fullWidth
              label="Address line 2 (optional)"
              placeholder="Landmark, area…"
              value={form.line2}
              onChange={(e) => setForm({ ...form, line2: e.target.value })}
              sx={dialogFieldSx}
            />

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 120px" }
              }}>
              <TextField
                fullWidth
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                sx={dialogFieldSx}
              />
              <TextField
                fullWidth
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                sx={dialogFieldSx}
              />
              <TextField
                fullWidth
                label="PIN code"
                value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                sx={{ ...dialogFieldSx, gridColumn: { xs: "span 2", sm: "auto" } }}
              />
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={saving}
            onClick={save}
            startIcon={saving ? <CircularProgress size={17} color="inherit" /> : undefined}
            sx={{
              mt: 3,
              height: "52px",
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14.5,
              background: "linear-gradient(135deg,#0A1130,#1B2B57)",
              boxShadow: "0 6px 20px rgba(10,17,48,0.18)",
              "&:hover": {
                background: "linear-gradient(135deg,#0A1130,#26397A)",
                boxShadow: "0 8px 24px rgba(10,17,48,0.26)",
              },
              "&.Mui-disabled": { opacity: 0.65 },
            }}
          >
            {saving ? "Saving…" : editingId ? "Update address" : "Save address"}
          </Button>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={!!toast}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)} sx={{ borderRadius: "14px" }}>
          {toast?.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

const dialogFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#FAFBFD",
    fontSize: 14,
    "& fieldset": { borderColor: "#E4E6EF" },
    "&:hover fieldset": { borderColor: "#2A52BE" },
    "&.Mui-focused fieldset": { borderColor: "#2A52BE" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#2A52BE" },
};