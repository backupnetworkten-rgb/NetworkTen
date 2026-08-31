"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase/client";

import {
  generateWelcomeKitPdf,
  saveWelcomeKitSubmission,
} from "@/services/welcomeKitService";

import type {
  WelcomeKitFormData,
} from "@/types/interior-design";

import {
  WELCOME_CONFIGURATIONS,
  WELCOME_PROPERTY_TYPES,
  createInitialRoomRequirements,
  getWelcomeKitRooms,
} from "@/data/welcomeKitRooms";

/* =========================================================
   DESIGN STYLES
========================================================= */

const DESIGN_STYLES = [
  "Modern Minimalist",
  "Contemporary",
  "Japandi / Wabi-Sabi",
  "Mid-Century Modern",
  "Industrial",
  "Transitional",
  "Maximalist / Eclectic",
  "Classic / Traditional",
  "Other",
];

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: WelcomeKitFormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",

  propertyType: "",
  totalArea: "",
  configuration: "",
  propertyStatus: "",
  possessionDate: "",

  designStyles: [],
  dreamSpace: "",
  colorsLove: "",
  colorsAvoid: "",

  roomRequirements: {},

  /*
   * Legacy compatibility fields.
   */
  livingRoom: "",
  masterBedroom: "",
  kitchen: "",
  diningArea: "",
  otherRooms: "",

  totalBudget: "",
  designFeeBudget: "",
  preferredStartDate: "",
  targetCompletionDate: "",

  familyMembers: "",
  elderlyMembers: "",
  children: "",
  pets: "",
  workFromHome: "",
  additionalNotes: "",
};

/* =========================================================
   FORM SECTION
========================================================= */

interface FormSectionProps {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2.5,
          sm: 4,
        },

        borderRadius: 4,

        border:
          "1px solid #e4e9ef",

        bgcolor: "#fff",

        boxShadow:
          "0 10px 35px rgba(16,32,72,0.035)",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,

                flexShrink: 0,

                borderRadius: 2.5,

                bgcolor: "#102048",

                color: "#8BC53F",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                fontWeight: 900,

                fontSize: "13px",
              }}
            >
              {number}
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: "#102048",
                }}
              >
                {title}
              </Typography>

              <Box
                sx={{
                  mt: 0.7,

                  width: 38,
                  height: 3,

                  borderRadius: 10,

                  bgcolor: "#8BC53F",
                }}
              />
            </Box>
          </Stack>

          {description && (
            <Typography
              sx={{
                mt: 2,

                color: "#64748b",

                lineHeight: 1.75,

                fontSize: "14px",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {children}
      </Stack>
    </Paper>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,

    backgroundColor: "#fbfcfd",

    transition:
      "all .2s ease",

    "&:hover": {
      backgroundColor: "#fff",
    },

    "&.Mui-focused": {
      backgroundColor: "#fff",

      boxShadow:
        "0 0 0 3px rgba(139,197,63,.10)",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#8BC53F",
        borderWidth: 2,
      },
  },

  "& .MuiInputLabel-root.Mui-focused":
    {
      color: "#6da82e",
    },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function WelcomeKitForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<WelcomeKitFormData>(
      initialForm
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     CURRENT ROOMS
  ======================================================= */

  const rooms = useMemo(() => {
    if (!form.propertyType) {
      return [];
    }

    return getWelcomeKitRooms(
      form.propertyType,
      form.configuration
    );
  }, [
    form.propertyType,
    form.configuration,
  ]);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  function updateField<
    K extends keyof WelcomeKitFormData
  >(
    field: K,
    value: WelcomeKitFormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =======================================================
     UPDATE ROOM REQUIREMENT
  ======================================================= */

  function updateRoomRequirement(
    roomId: string,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,

      roomRequirements: {
        ...previous.roomRequirements,

        [roomId]: value,
      },
    }));
  }

  /* =======================================================
     PROPERTY TYPE CHANGE
  ======================================================= */

  function handlePropertyTypeChange(
    propertyType: string
  ) {
    const configurationOptions =
      WELCOME_CONFIGURATIONS[
        propertyType as keyof typeof WELCOME_CONFIGURATIONS
      ] ?? [];

    const firstConfiguration =
      configurationOptions[0]?.value ?? "";

    const newRooms =
      propertyType
        ? getWelcomeKitRooms(
            propertyType,
            firstConfiguration
          )
        : [];

    setForm((previous) => ({
      ...previous,

      propertyType,

      configuration:
        firstConfiguration,

      roomRequirements:
        createInitialRoomRequirements(
          newRooms
        ),

      /*
       * Reset old compatibility fields.
       */
      livingRoom: "",
      masterBedroom: "",
      kitchen: "",
      diningArea: "",
      otherRooms: "",
    }));
  }

  /* =======================================================
     CONFIGURATION CHANGE
  ======================================================= */

  function handleConfigurationChange(
    configuration: string
  ) {
    const newRooms =
      getWelcomeKitRooms(
        form.propertyType,
        configuration
      );

    setForm((previous) => {
      const previousRequirements =
        previous.roomRequirements;

      const nextRequirements =
        createInitialRoomRequirements(
          newRooms
        );

      /*
       * Preserve matching rooms when
       * configuration changes.
       */
      newRooms.forEach((room) => {
        if (
          previousRequirements[
            room.id
          ] !== undefined
        ) {
          nextRequirements[
            room.id
          ] =
            previousRequirements[
              room.id
            ];
        }
      });

      return {
        ...previous,

        configuration,

        roomRequirements:
          nextRequirements,
      };
    });
  }

  /* =======================================================
     KEEP LEGACY PDF FIELDS IN SYNC
  ======================================================= */

  useEffect(() => {
    const requirements =
      form.roomRequirements;

    setForm((previous) => {
      const next = {
        ...previous,

        livingRoom:
          requirements[
            "living-room"
          ] ?? "",

        masterBedroom:
          requirements[
            "master-bedroom"
          ] ?? "",

        kitchen:
          requirements[
            "kitchen"
          ] ?? "",

        diningArea:
          requirements[
            "dining-area"
          ] ?? "",

        otherRooms:
          Object.entries(
            requirements
          )
            .filter(
              ([key]) =>
                ![
                  "living-room",
                  "master-bedroom",
                  "kitchen",
                  "dining-area",
                ].includes(key)
            )
            .map(
              ([key, value]) =>
                value
                  ? `${key}: ${value}`
                  : ""
            )
            .filter(Boolean)
            .join("\n\n"),
      };

      /*
       * Prevent unnecessary state update.
       */
      if (
        next.livingRoom ===
          previous.livingRoom &&
        next.masterBedroom ===
          previous.masterBedroom &&
        next.kitchen ===
          previous.kitchen &&
        next.diningArea ===
          previous.diningArea &&
        next.otherRooms ===
          previous.otherRooms
      ) {
        return previous;
      }

      return next;
    });
  }, [
    form.roomRequirements,
  ]);

  /* =======================================================
     DESIGN STYLE TOGGLE
  ======================================================= */

  function toggleStyle(
    style: string
  ) {
    setForm((previous) => {
      const selected =
        previous.designStyles.includes(
          style
        );

      return {
        ...previous,

        designStyles: selected
          ? previous.designStyles.filter(
              (item) =>
                item !== style
            )
          : [
              ...previous.designStyles,
              style,
            ],
      };
    });
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!form.fullName.trim()) {
      setError(
        "Please enter your full name."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (!form.propertyType) {
      setError(
        "Please select your property type."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (!form.configuration) {
      setError(
        "Please select your property configuration."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (
      form.designStyles.length === 0
    ) {
      setError(
        "Please select at least one preferred design style."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSubmitting(true);

    try {
      /*
       * Save form.
       */
      await saveWelcomeKitSubmission(
        form
      );

      /*
       * Generate PDF.
       */
      const pdf =
        await generateWelcomeKitPdf(
          form
        );

      const url =
        URL.createObjectURL(pdf);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `Network-Ten-Welcome-Kit-${form.fullName
          .trim()
          .replace(/\s+/g, "-")}.pdf`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      router.push(
        "/interior-design/kits/welcome?success=true"
      );
    } catch (submitError) {
      console.error(
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your Welcome Kit."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =======================================================
     LOGOUT
  ======================================================= */

  async function logout() {
    await signOut(auth);

    router.push(
      "/interior-design"
    );
  }

  /* =======================================================
     CURRENT CONFIG OPTIONS
  ======================================================= */

  const configurationOptions =
    form.propertyType
      ? WELCOME_CONFIGURATIONS[
          form.propertyType as keyof typeof WELCOME_CONFIGURATIONS
        ] ?? []
      : [];

  /* =======================================================
     UI
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        bgcolor: "#f5f7fa",

        py: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Container
        maxWidth="lg"
      >
        <Stack spacing={3}>

          {/* =================================================
              HEADER
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 5,
              },

              borderRadius: 5,

              color: "#fff",

              position: "relative",

              overflow: "hidden",

              background:
                "linear-gradient(135deg, #07101d 0%, #102048 60%, #182d57 100%)",

              boxShadow:
                "0 20px 55px rgba(16,32,72,.15)",
            }}
          >
            {/* Decorative glow */}

            <Box
              sx={{
                position:
                  "absolute",

                width: 320,
                height: 320,

                borderRadius:
                  "50%",

                background:
                  "rgba(139,197,63,.10)",

                filter:
                  "blur(70px)",

                right: -130,
                top: -150,
              }}
            />

            <Box
              sx={{
                position:
                  "relative",

                zIndex: 1,
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={3}
                sx={{
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },

                  justifyContent:
                    "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color:
                        "#8BC53F",

                      fontSize:
                        "11px",

                      fontWeight: 900,

                      letterSpacing:
                        "0.25em",
                    }}
                  >
                    NETWORK TEN
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,

                      fontWeight: 900,

                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },

                      lineHeight: 1,
                    }}
                  >
                    Client Welcome Kit
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,

                      maxWidth: 650,

                      color:
                        "rgba(255,255,255,.68)",

                      lineHeight: 1.75,

                      fontSize:
                        "14px",
                    }}
                  >
                    Tell us about your
                    space, lifestyle and
                    design vision. Your
                    requirements will
                    automatically adapt to
                    the property you select.
                  </Typography>
                </Box>

                <Button
                  onClick={
                    logout
                  }
                  startIcon={
                    <LogoutRoundedIcon />
                  }
                  variant="outlined"
                  sx={{
                    color: "#fff",

                    borderColor:
                      "rgba(255,255,255,.25)",

                    borderRadius:
                      "50px",

                    fontWeight: 800,

                    px: 2.5,

                    "&:hover": {
                      borderColor:
                        "#8BC53F",

                      bgcolor:
                        "rgba(139,197,63,.08)",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            </Box>
          </Paper>

          {/* =================================================
              PROGRESS / PROPERTY SUMMARY
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: 2,

              borderRadius: 3,

              border:
                "1px solid #e5eaf0",

              bgcolor: "#fff",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,

                  borderRadius: 2,

                  bgcolor:
                    "#f0f8e8",

                  color:
                    "#6da82e",

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <HomeWorkRoundedIcon />
              </Box>

              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    color:
                      "#102048",

                    fontWeight: 900,

                    fontSize:
                      "13px",
                  }}
                >
                  {form.propertyType
                    ? `${form.propertyType}${
                        form.configuration
                          ? ` · ${form.configuration}`
                          : ""
                      }`
                    : "Select your property"}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,

                    color:
                      "#94a3b8",

                    fontSize:
                      "11px",
                  }}
                >
                  Your room requirements
                  update automatically
                  based on your selection.
                </Typography>
              </Box>

              {rooms.length > 0 && (
                <Box
                  sx={{
                    px: 1.5,

                    py: 0.7,

                    borderRadius:
                      "50px",

                    bgcolor:
                      "#f1f7e9",

                    color:
                      "#557d2a",

                    fontSize:
                      "11px",

                    fontWeight: 900,
                  }}
                >
                  {rooms.length} spaces
                </Box>
              )}
            </Stack>
          </Paper>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: 3,
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={
              handleSubmit
            }
          >
            <Stack spacing={3}>

              {/* =================================================
                  01 PERSONAL DETAILS
              ================================================= */}

              <FormSection
                number="01"
                title="Personal Details"
                description="Tell us who we are designing for."
              >
                <Grid
                  container
                  spacing={2.5}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      value={
                        form.fullName
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "fullName",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      value={
                        form.email
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "email",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      label="Phone / WhatsApp"
                      value={
                        form.phone
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "phone",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      label="City / Location"
                      value={
                        form.city
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "city",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* =================================================
                  02 PROPERTY
              ================================================= */}

              <FormSection
                number="02"
                title="Your Property"
                description="Select your property type first. We will then show the appropriate configuration and room requirements."
              >
                <Grid
                  container
                  spacing={2.5}
                >

                  {/* PROPERTY TYPE */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      select
                      label="Property Type"
                      value={
                        form.propertyType
                      }
                      onChange={(
                        event
                      ) =>
                        handlePropertyTypeChange(
                          event.target.value
                        )
                      }
                      slotProps={{
                        select: {
                          native: true,
                        },
                      }}
                      sx={inputSx}
                    >
                      <option value="">
                        Select property type
                      </option>

                      {WELCOME_PROPERTY_TYPES.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        )
                      )}
                    </TextField>
                  </Grid>

                  {/* CONFIGURATION */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      select
                      disabled={
                        !form.propertyType
                      }
                      label="Property Configuration"
                      value={
                        form.configuration
                      }
                      onChange={(
                        event
                      ) =>
                        handleConfigurationChange(
                          event.target.value
                        )
                      }
                      slotProps={{
                        select: {
                          native: true,
                        },
                      }}
                      sx={inputSx}
                    >
                      <option value="">
                        Select configuration
                      </option>

                      {configurationOptions.map(
                        (option) => (
                          <option
                            key={
                              option.value
                            }
                            value={
                              option.value
                            }
                          >
                            {option.label}
                          </option>
                        )
                      )}
                    </TextField>
                  </Grid>

                  {/* AREA */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Total Area"
                      placeholder="Example: 1800 sq.ft."
                      value={
                        form.totalArea
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "totalArea",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  {/* STATUS */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      label="Property Status"
                      value={
                        form.propertyStatus
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "propertyStatus",
                          event.target
                            .value
                        )
                      }
                      slotProps={{
                        select: {
                          native: true,
                        },
                      }}
                      sx={inputSx}
                    >
                      <option value="">
                        Select status
                      </option>

                      <option value="New Construction">
                        New Construction
                      </option>

                      <option value="Under Construction">
                        Under Construction
                      </option>

                      <option value="Ready to Move">
                        Ready to Move
                      </option>

                      <option value="Renovation">
                        Renovation
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </TextField>
                  </Grid>

                  {/* DATE */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      type="date"
                      label="Possession / Start Date"
                      value={
                        form.possessionDate
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "possessionDate",
                          event.target
                            .value
                        )
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      sx={inputSx}
                    />
                  </Grid>

                </Grid>
              </FormSection>

              {/* =================================================
                  03 DESIGN STYLE
              ================================================= */}

              <FormSection
                number="03"
                title="Design Style & Vision"
                description="Help us understand the aesthetic direction you prefer."
              >
                <Box>
                  <Typography
                    sx={{
                      mb: 2,

                      color:
                        "#102048",

                      fontWeight: 800,

                      fontSize:
                        "14px",
                    }}
                  >
                    Which styles best describe
                    what you like?
                  </Typography>

                  <Grid
                    container
                    spacing={1.3}
                  >
                    {DESIGN_STYLES.map(
                      (style) => {
                        const selected =
                          form.designStyles.includes(
                            style
                          );

                        return (
                          <Grid
                            key={style}
                            size={{
                              xs: 12,
                              sm: 6,
                              md: 4,
                            }}
                          >
                            <Box
                              onClick={() =>
                                toggleStyle(
                                  style
                                )
                              }
                              sx={{
                                p: 1.3,

                                borderRadius:
                                  2.5,

                                border:
                                  "1px solid",

                                borderColor:
                                  selected
                                    ? "#8BC53F"
                                    : "#e1e6ec",

                                bgcolor:
                                  selected
                                    ? "#f1f8e9"
                                    : "#fff",

                                cursor:
                                  "pointer",

                                transition:
                                  "all .2s ease",

                                "&:hover":
                                  {
                                    borderColor:
                                      "#8BC53F",

                                    transform:
                                      "translateY(-1px)",
                                  },
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      selected
                                    }
                                    onChange={() =>
                                      toggleStyle(
                                        style
                                      )
                                    }
                                    sx={{
                                      color:
                                        "#cbd5e1",

                                      "&.Mui-checked":
                                        {
                                          color:
                                            "#8BC53F",
                                        },
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      fontSize:
                                        "13px",

                                      fontWeight:
                                        selected
                                          ? 800
                                          : 500,
                                    }}
                                  >
                                    {style}
                                  </Typography>
                                }
                              />
                            </Box>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Tell us about your dream space"
                  value={
                    form.dreamSpace
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "dreamSpace",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <Grid
                  container
                  spacing={2.5}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Colours You Love"
                      value={
                        form.colorsLove
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "colorsLove",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Colours to Avoid"
                      value={
                        form.colorsAvoid
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "colorsAvoid",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* =================================================
                  04 DYNAMIC ROOMS
              ================================================= */}

              <FormSection
                number="04"
                title="Room-by-Room Requirements"
                description={
                  form.propertyType
                    ? `We have prepared ${
                        rooms.length
                      } relevant spaces for your ${
                        form.propertyType
                      }${
                        form.configuration
                          ? ` · ${form.configuration}`
                          : ""
                      }.`
                    : "Select your property type and configuration above to generate the appropriate room list."
                }
              >
                {!form.propertyType ? (
                  <Box
                    sx={{
                      p: 5,

                      borderRadius: 4,

                      border:
                        "1px dashed #cbd5e1",

                      bgcolor:
                        "#f8fafc",

                      textAlign:
                        "center",
                    }}
                  >
                    <HomeWorkRoundedIcon
                      sx={{
                        fontSize: 42,

                        color:
                          "#8BC53F",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 2,

                        color:
                          "#102048",

                        fontWeight: 900,
                      }}
                    >
                      Select your property
                      first
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,

                        color:
                          "#64748b",

                        fontSize:
                          "13px",
                      }}
                    >
                      Your room list will
                      automatically be
                      customized for your
                      property.
                    </Typography>
                  </Box>
                ) : (
                  <Stack
                    spacing={2.5}
                  >
                    {rooms.map(
                      (
                        room,
                        index
                      ) => (
                        <Paper
                          key={
                            room.id
                          }
                          elevation={
                            0
                          }
                          sx={{
                            p: {
                              xs: 2,
                              md: 3,
                            },

                            borderRadius:
                              3,

                            border:
                              "1px solid #e6ebf0",

                            bgcolor:
                              "#fbfcfd",

                            transition:
                              "all .25s ease",

                            "&:focus-within":
                              {
                                borderColor:
                                  "#8BC53F",

                                bgcolor:
                                  "#fff",

                                boxShadow:
                                  "0 10px 30px rgba(16,32,72,.05)",
                              },
                          }}
                        >
                          <Stack
                            spacing={
                              1.5
                            }
                          >
                            <Stack
                              direction="row"
                              spacing={
                                1.5
                              }
                              sx={{
                                alignItems:
                                  "center",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 38,
                                  height: 38,

                                  flexShrink: 0,

                                  borderRadius:
                                    2,

                                  bgcolor:
                                    "#102048",

                                  color:
                                    "#8BC53F",

                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  justifyContent:
                                    "center",

                                  fontWeight:
                                    900,

                                  fontSize:
                                    "11px",
                                }}
                              >
                                {String(
                                  index +
                                    1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </Box>

                              <Box
                                sx={{
                                  flex: 1,
                                }}
                              >
                                <Typography
                                  sx={{
                                    color:
                                      "#102048",

                                    fontWeight:
                                      900,

                                    fontSize:
                                      "15px",
                                  }}
                                >
                                  {
                                    room.title
                                  }
                                </Typography>

                                <Typography
                                  sx={{
                                    mt: 0.3,

                                    color:
                                      "#94a3b8",

                                    fontSize:
                                      "11px",
                                  }}
                                >
                                  {
                                    room.description
                                  }
                                </Typography>
                              </Box>

                              <MeetingRoomRoundedIcon
                                sx={{
                                  color:
                                    "#8BC53F",

                                  display:
                                    {
                                      xs: "none",
                                      sm: "block",
                                    },
                                }}
                              />
                            </Stack>

                            <TextField
                              fullWidth
                              multiline
                              minRows={
                                3
                              }
                              label={`Requirements for ${room.title}`}
                              placeholder={
                                room.placeholder
                              }
                              value={
                                form
                                  .roomRequirements[
                                  room.id
                                ] ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateRoomRequirement(
                                  room.id,
                                  event
                                    .target
                                    .value
                                )
                              }
                              sx={
                                inputSx
                              }
                            />
                          </Stack>
                        </Paper>
                      )
                    )}
                  </Stack>
                )}
              </FormSection>

              {/* =================================================
                  05 BUDGET
              ================================================= */}

              <FormSection
                number="05"
                title="Budget & Timeline"
                description="This helps our team understand the scale and planning requirements of your project."
              >
                <Grid
                  container
                  spacing={2.5}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Total Project Budget"
                      placeholder="Example: ₹25,00,000"
                      value={
                        form.totalBudget
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "totalBudget",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Design Fee Budget"
                      value={
                        form.designFeeBudget
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "designFeeBudget",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      type="date"
                      label="Preferred Start Date"
                      value={
                        form.preferredStartDate
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "preferredStartDate",
                          event.target
                            .value
                        )
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      type="date"
                      label="Target Completion Date"
                      value={
                        form.targetCompletionDate
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "targetCompletionDate",
                          event.target
                            .value
                        )
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* =================================================
                  06 LIFESTYLE
              ================================================= */}

              <FormSection
                number="06"
                title="Lifestyle & Additional Information"
                description="A few additional details help us design a space that works for your everyday life."
              >
                <Grid
                  container
                  spacing={2.5}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Number of Family Members"
                      value={
                        form.familyMembers
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "familyMembers",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Elderly Family Members"
                      value={
                        form.elderlyMembers
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "elderlyMembers",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Children / Ages"
                      value={
                        form.children
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "children",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Pets"
                      value={
                        form.pets
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "pets",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Work From Home Requirements"
                      value={
                        form.workFromHome
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "workFromHome",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      label="Anything Else You Want Us To Know?"
                      value={
                        form.additionalNotes
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "additionalNotes",
                          event.target
                            .value
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 3,
                    md: 4,
                  },

                  borderRadius: 4,

                  bgcolor:
                    "#102048",

                  color: "#fff",
                }}
              >
                <Stack
                  spacing={2.5}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems:
                        "flex-start",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        color:
                          "#8BC53F",

                        fontSize:
                          30,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight:
                            900,
                        }}
                      >
                        Ready to submit?
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.8,

                          color:
                            "rgba(255,255,255,.68)",

                          lineHeight:
                            1.7,

                          fontSize:
                            "13px",
                        }}
                      >
                        Your information will
                        be securely saved and
                        your personalized
                        Network Ten Welcome Kit
                        PDF will be generated.
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider
                    sx={{
                      borderColor:
                        "rgba(255,255,255,.1)",
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={
                      submitting
                    }
                    startIcon={
                      <DownloadRoundedIcon />
                    }
                    sx={{
                      minHeight: 56,

                      borderRadius:
                        2.5,

                      bgcolor:
                        "#8BC53F",

                      color:
                        "#102048",

                      fontWeight:
                        900,

                      "&:hover": {
                        bgcolor:
                          "#fff",
                      },

                      "&.Mui-disabled":
                        {
                          bgcolor:
                            "#d9e5ca",

                          color:
                            "#64748b",
                        },
                    }}
                  >
                    {submitting
                      ? "Submitting & Generating PDF..."
                      : "Submit & Generate Welcome Kit PDF"}
                  </Button>
                </Stack>
              </Paper>

              {/* =================================================
                  BACK
              ================================================= */}

              <Box
                sx={{
                  textAlign:
                    "center",

                  pb: 5,
                }}
              >
                <Button
                  startIcon={
                    <ArrowBackRoundedIcon />
                  }
                  onClick={() =>
                    router.push(
                      "/interior-design"
                    )
                  }
                  sx={{
                    color:
                      "#64748b",

                    fontWeight:
                      700,
                  }}
                >
                  Back to Network Ten
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}