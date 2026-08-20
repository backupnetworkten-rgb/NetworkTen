"use client";

import React, {
  FormEvent,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase/client";

import {
  generateWelcomeKitPdf,
  saveWelcomeKitSubmission,
} from "@/services/welcomeKitService";

import {
  WelcomeKitFormData,
} from "@/types/interior-design";

/* =========================================================
   DESIGN STYLES
========================================================= */

const designStyles = [
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
        border: "1px solid #e5eaf0",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* SECTION HEADER */}

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                minWidth: 48,
                width: 48,
                height: 48,
                borderRadius: 2.5,
                backgroundColor: "#102048",
                color: "#8BC53F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              {number}
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
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
                  borderRadius: 2,
                  backgroundColor: "#8BC53F",
                }}
              />
            </Box>
          </Box>

          {description && (
            <Typography
              sx={{
                mt: 2,
                color: "#64748b",
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* SECTION CONTENT */}

        {children}
      </Box>
    </Paper>
  );
}

/* =========================================================
   TWO COLUMN LAYOUT
========================================================= */

function TwoColumnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2.5,
      }}
    >
      {children}
    </Box>
  );
}

/* =========================================================
   THREE COLUMN LAYOUT
========================================================= */

function ThreeColumnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 1.5,
      }}
    >
      {children}
    </Box>
  );
}

/* =========================================================
   FIELD WRAPPER
========================================================= */

function FullWidthField({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        gridColumn: {
          xs: "auto",
          md: "1 / -1",
        },
      }}
    >
      {children}
    </Box>
  );
}

/* =========================================================
   MAIN COMPONENT
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
     TOGGLE DESIGN STYLE
  ======================================================= */

  function toggleStyle(style: string) {
    setForm((previous) => {
      const exists =
        previous.designStyles.includes(style);

      return {
        ...previous,

        designStyles: exists
          ? previous.designStyles.filter(
              (item) => item !== style
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
    setSubmitting(true);

    try {
      /* SAVE TO FIREBASE */

      await saveWelcomeKitSubmission(form);

      /* GENERATE PDF */

      const pdf =
        await generateWelcomeKitPdf(form);

      /* DOWNLOAD PDF */

      const url =
        URL.createObjectURL(pdf);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      const safeName =
        form.fullName
          .trim()
          .replace(/\s+/g, "-")
          .replace(
            /[^a-zA-Z0-9-_]/g,
            ""
          );

      anchor.download =
        `Network-Ten-Welcome-Kit-${safeName || "Client"}.pdf`;

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      /* SUCCESS PAGE */

      router.push(
        "/interior-design/kits/welcome?success=true"
      );
    } catch (submitError) {
      console.error(
        "Welcome Kit submission error:",
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
    try {
      await signOut(auth);

      router.push(
        "/interior-design"
      );
    } catch (logoutError) {
      console.error(
        "Logout error:",
        logoutError
      );

      setError(
        "Unable to sign out. Please try again."
      );
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        py: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* =================================================
            HEADER
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #08111f 0%, #102048 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 3,
              justifyContent:
                "space-between",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
            }}
          >
            {/* HEADER CONTENT */}

            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "#8BC53F",
                  fontWeight: 900,
                  letterSpacing: "0.25em",
                }}
              >
                NETWORK TEN
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.8rem",
                  },
                }}
              >
                Client Welcome Kit
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  maxWidth: 700,
                  color:
                    "rgba(255,255,255,0.72)",
                  lineHeight: 1.7,
                }}
              >
                Please complete the following
                information so our interior
                design team can understand
                your project, lifestyle and
                preferences.
              </Typography>
            </Box>

            {/* LOGOUT */}

            <Button
              onClick={logout}
              startIcon={
                <LogoutIcon />
              }
              variant="outlined"
              sx={{
                color: "#ffffff",
                borderColor:
                  "rgba(255,255,255,0.3)",
                borderRadius: 2.5,
                fontWeight: 700,
                whiteSpace: "nowrap",

                "&:hover": {
                  borderColor:
                    "#8BC53F",
                  backgroundColor:
                    "rgba(139,197,63,0.08)",
                },
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>

        {/* =================================================
            FORM
        ================================================= */}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >

            {/* =================================================
                SECTION 01
            ================================================= */}

            <FormSection
              number="01"
              title="Personal Details"
            >
              <TwoColumnLayout>

                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField(
                      "fullName",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email Address"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  required
                  label="Phone / WhatsApp"
                  value={form.phone}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  required
                  label="City / Location"
                  value={form.city}
                  onChange={(event) =>
                    updateField(
                      "city",
                      event.target.value
                    )
                  }
                />

              </TwoColumnLayout>
            </FormSection>

            {/* =================================================
                SECTION 02
            ================================================= */}

            <FormSection
              number="02"
              title="Your Property"
            >
              <TwoColumnLayout>

                {/* PROPERTY TYPE */}

                <TextField
                  fullWidth
                  select
                  label="Property Type"
                  value={
                    form.propertyType
                  }
                  onChange={(event) =>
                    updateField(
                      "propertyType",
                      event.target.value
                    )
                  }
                >
                  <MenuItem value="">
                    Select property type
                  </MenuItem>

                  <MenuItem value="Apartment">
                    Apartment
                  </MenuItem>

                  <MenuItem value="Villa">
                    Villa
                  </MenuItem>

                  <MenuItem value="Independent House">
                    Independent House
                  </MenuItem>

                  <MenuItem value="Penthouse">
                    Penthouse
                  </MenuItem>

                  <MenuItem value="Office">
                    Office
                  </MenuItem>

                  <MenuItem value="Commercial">
                    Commercial
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>
                </TextField>

                {/* TOTAL AREA */}

                <TextField
                  fullWidth
                  label="Total Area"
                  placeholder="Example: 1800 sq.ft."
                  value={
                    form.totalArea
                  }
                  onChange={(event) =>
                    updateField(
                      "totalArea",
                      event.target.value
                    )
                  }
                />

                {/* CONFIGURATION */}

                <TextField
                  fullWidth
                  label="Configuration"
                  placeholder="Example: 3 BHK"
                  value={
                    form.configuration
                  }
                  onChange={(event) =>
                    updateField(
                      "configuration",
                      event.target.value
                    )
                  }
                />

                {/* PROPERTY STATUS */}

                <TextField
                  fullWidth
                  select
                  label="Property Status"
                  value={
                    form.propertyStatus
                  }
                  onChange={(event) =>
                    updateField(
                      "propertyStatus",
                      event.target.value
                    )
                  }
                >
                  <MenuItem value="">
                    Select property status
                  </MenuItem>

                  <MenuItem value="New Construction">
                    New Construction
                  </MenuItem>

                  <MenuItem value="Under Construction">
                    Under Construction
                  </MenuItem>

                  <MenuItem value="Ready to Move">
                    Ready to Move
                  </MenuItem>

                  <MenuItem value="Renovation">
                    Renovation
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>
                </TextField>

                {/* POSSESSION */}

                <TextField
                  fullWidth
                  type="date"
                  label="Possession / Start Date"
                  value={
                    form.possessionDate
                  }
                  onChange={(event) =>
                    updateField(
                      "possessionDate",
                      event.target.value
                    )
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

              </TwoColumnLayout>
            </FormSection>

            {/* =================================================
                SECTION 03
            ================================================= */}

            <FormSection
              number="03"
              title="Design Style Preferences"
            >

              <Box>

                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#102048",
                  }}
                >
                  Which interior styles best
                  describe what you like?
                </Typography>

                <ThreeColumnLayout>

                  {designStyles.map(
                    (style) => {
                      const selected =
                        form.designStyles.includes(
                          style
                        );

                      return (
                        <Box
                          key={style}
                          onClick={() =>
                            toggleStyle(
                              style
                            )
                          }
                          sx={{
                            cursor:
                              "pointer",
                            p: 1.5,
                            borderRadius: 2.5,
                            border:
                              "1px solid",
                            borderColor:
                              selected
                                ? "#8BC53F"
                                : "#e0e5eb",
                            backgroundColor:
                              selected
                                ? "#f0f8e9"
                                : "#ffffff",
                            transition:
                              "all 0.2s ease",

                            "&:hover": {
                              borderColor:
                                "#8BC53F",
                              backgroundColor:
                                "#f7fbf2",
                            },
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              m: 0,
                              width:
                                "100%",
                            }}
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
                                    "#8BC53F",

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
                                variant="body2"
                                sx={{
                                  fontWeight:
                                    selected
                                      ? 700
                                      : 500,
                                  color:
                                    "#102048",
                                }}
                              >
                                {style}
                              </Typography>
                            }
                          />
                        </Box>
                      );
                    }
                  )}

                </ThreeColumnLayout>

              </Box>

              {/* DREAM SPACE */}

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Tell us about your dream space"
                value={
                  form.dreamSpace
                }
                onChange={(event) =>
                  updateField(
                    "dreamSpace",
                    event.target.value
                  )
                }
              />

              {/* COLORS */}

              <TwoColumnLayout>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Colours You Love"
                  value={
                    form.colorsLove
                  }
                  onChange={(event) =>
                    updateField(
                      "colorsLove",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Colours to Avoid"
                  value={
                    form.colorsAvoid
                  }
                  onChange={(event) =>
                    updateField(
                      "colorsAvoid",
                      event.target.value
                    )
                  }
                />

              </TwoColumnLayout>

            </FormSection>

            {/* =================================================
                SECTION 04
            ================================================= */}

            <FormSection
              number="04"
              title="Room-by-Room Requirements"
            >

              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 2.5,
                }}
              >

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Living Room"
                  value={
                    form.livingRoom
                  }
                  onChange={(event) =>
                    updateField(
                      "livingRoom",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Master Bedroom"
                  value={
                    form.masterBedroom
                  }
                  onChange={(event) =>
                    updateField(
                      "masterBedroom",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Kitchen"
                  value={
                    form.kitchen
                  }
                  onChange={(event) =>
                    updateField(
                      "kitchen",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Dining Area"
                  value={
                    form.diningArea
                  }
                  onChange={(event) =>
                    updateField(
                      "diningArea",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Other Rooms"
                  value={
                    form.otherRooms
                  }
                  onChange={(event) =>
                    updateField(
                      "otherRooms",
                      event.target.value
                    )
                  }
                />

              </Box>

            </FormSection>

            {/* =================================================
                SECTION 05
            ================================================= */}

            <FormSection
              number="05"
              title="Budget & Timeline"
            >

              <TwoColumnLayout>

                <TextField
                  fullWidth
                  label="Total Budget"
                  placeholder="Example: ₹25,00,000"
                  value={
                    form.totalBudget
                  }
                  onChange={(event) =>
                    updateField(
                      "totalBudget",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  label="Design Fee Budget"
                  value={
                    form.designFeeBudget
                  }
                  onChange={(event) =>
                    updateField(
                      "designFeeBudget",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  type="date"
                  label="Preferred Start Date"
                  value={
                    form.preferredStartDate
                  }
                  onChange={(event) =>
                    updateField(
                      "preferredStartDate",
                      event.target.value
                    )
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="Target Completion Date"
                  value={
                    form.targetCompletionDate
                  }
                  onChange={(event) =>
                    updateField(
                      "targetCompletionDate",
                      event.target.value
                    )
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

              </TwoColumnLayout>

            </FormSection>

            {/* =================================================
                SECTION 06
            ================================================= */}

            <FormSection
              number="06"
              title="Lifestyle & Additional Information"
            >

              <TwoColumnLayout>

                <TextField
                  fullWidth
                  label="Number of Family Members"
                  value={
                    form.familyMembers
                  }
                  onChange={(event) =>
                    updateField(
                      "familyMembers",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  label="Elderly Family Members"
                  value={
                    form.elderlyMembers
                  }
                  onChange={(event) =>
                    updateField(
                      "elderlyMembers",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  label="Children / Ages"
                  value={
                    form.children
                  }
                  onChange={(event) =>
                    updateField(
                      "children",
                      event.target.value
                    )
                  }
                />

                <TextField
                  fullWidth
                  label="Pets"
                  value={
                    form.pets
                  }
                  onChange={(event) =>
                    updateField(
                      "pets",
                      event.target.value
                    )
                  }
                />

                <FullWidthField>
                  <TextField
                    fullWidth
                    label="Work From Home Requirements"
                    value={
                      form.workFromHome
                    }
                    onChange={(event) =>
                      updateField(
                        "workFromHome",
                        event.target.value
                      )
                    }
                  />
                </FullWidthField>

                <FullWidthField>
                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Anything Else"
                    value={
                      form.additionalNotes
                    }
                    onChange={(event) =>
                      updateField(
                        "additionalNotes",
                        event.target.value
                      )
                    }
                  />
                </FullWidthField>

              </TwoColumnLayout>

            </FormSection>

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

            {/* =================================================
                SUBMIT CARD
            ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
                borderRadius: 4,
                backgroundColor:
                  "#102048",
                color: "#ffffff",
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 2.5,
                }}
              >

                {/* SUBMIT INFORMATION */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      "row",
                    alignItems:
                      "flex-start",
                    gap: 2,
                  }}
                >

                  <CheckCircleIcon
                    sx={{
                      color:
                        "#8BC53F",
                      fontSize: 30,
                      flexShrink: 0,
                    }}
                  />

                  <Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Ready to submit?
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,
                        color:
                          "rgba(255,255,255,0.7)",
                        lineHeight: 1.7,
                      }}
                    >
                      Your information will
                      be securely saved to
                      your Network Ten
                      client record and a
                      personalized Welcome
                      Kit PDF will be
                      generated.
                    </Typography>

                  </Box>

                </Box>

                {/* SUBMIT BUTTON */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={submitting}
                  startIcon={
                    <DownloadIcon />
                  }
                  sx={{
                    py: 1.6,
                    borderRadius: 2.5,
                    backgroundColor:
                      "#8BC53F",
                    color: "#102048",
                    fontWeight: 900,
                    fontSize:
                      "0.95rem",

                    "&:hover": {
                      backgroundColor:
                        "#ffffff",
                      color:
                        "#102048",
                    },

                    "&.Mui-disabled": {
                      backgroundColor:
                        "#64748b",
                      color:
                        "#dbe2ea",
                    },
                  }}
                >
                  {submitting
                    ? "Submitting & Generating PDF..."
                    : "Submit & Generate Welcome Kit PDF"}
                </Button>

              </Box>

            </Paper>

            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <Box
              sx={{
                textAlign: "center",
                pb: 5,
              }}
            >
              <Button
                type="button"
                startIcon={
                  <ArrowBackIcon />
                }
                onClick={() =>
                  router.push(
                    "/interior-design"
                  )
                }
                sx={{
                  color: "#64748b",
                  fontWeight: 700,

                  "&:hover": {
                    color: "#102048",
                    backgroundColor:
                      "rgba(16,32,72,0.04)",
                  },
                }}
              >
                Back to Network Ten
              </Button>
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}