"use client";

import React, {
  useState,
} from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";

import { sendWhatsAppMessage } from "../../lib/whatsapp";

export default function VideoConferenceForm() {
  const [formData, setFormData] =
    useState({
      name: "",

      phone: "",

      email: "",

      requirement: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    sendWhatsAppMessage(
      formData.name,
      formData.phone,
      formData.email,
      formData.requirement
    );

    alert(
      "Request submitted successfully!"
    );

    setFormData({
      name: "",

      phone: "",

      email: "",

      requirement: "",
    });
  };

  return (
    <Box
      sx={{
        background: "#fff",

        borderRadius: "28px",

        p: {
          xs: 3,
          md: 4,
        },

        border:
          "1px solid rgba(8,20,46,0.05)",

        boxShadow:
          "0 18px 45px rgba(0,0,0,0.05)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 1.2,

          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 54,

            height: 54,

            borderRadius:
              "18px",

            background:
              "rgba(139,197,63,0.12)",

            color: "#8BC53F",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          <VideoCallRoundedIcon
            sx={{
              fontSize: 30,
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#102048",

              fontWeight: 800,

              fontSize: {
                xs: "24px",
                md: "30px",
              },
            }}
          >
            Request Video Conference
          </Typography>

          <Typography
            sx={{
              color: "#667085",

              fontSize: "13px",
            }}
          >
            Fill the form and our team
            will connect with you.
          </Typography>
        </Box>
      </Box>

      {/* FORM */}
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },

            gap: 2,

            mb: 2,
          }}
        >
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </Box>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          sx={{
            mb: 2,
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Requirement"
          name="requirement"
          required
          value={
            formData.requirement
          }
          onChange={handleChange}
          sx={{
            mb: 3,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background:
              "#102048",

            borderRadius: "14px",

            py: 1.4,

            fontWeight: 700,

            textTransform:
              "none",

            fontSize: "15px",

            "&:hover": {
              background:
                "#08142e",
            },
          }}
        >
          Submit Request
        </Button>
      </Box>
    </Box>
  );
}