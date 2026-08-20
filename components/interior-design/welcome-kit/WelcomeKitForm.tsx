"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import {
  auth,
} from "@/lib/firebase/client";

import {
  generateWelcomeKitPdf,
  saveWelcomeKitSubmission,
} from "@/services/welcomeKitService";

import {
  WelcomeKitFormData,
} from "@/types/interior-design";

const styles = [
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

interface SectionProps {
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
}: SectionProps) {
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
          "1px solid #e5eaf0",
      }}
    >
      <Stack spacing={3}>

        <Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              sx={{
                minWidth: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: "#102048",
                color: "#8BC53F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
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
                lineHeight: 1.7,
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

  function toggleStyle(style: string) {
    setForm((previous) => {
      const exists =
        previous.designStyles.includes(
          style
        );

      return {
        ...previous,
        designStyles: exists
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await saveWelcomeKitSubmission(
        form
      );

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

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      router.push(
        "/interior-design/kits/welcome?success=true"
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit your Welcome Kit."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function logout() {
    await signOut(auth);

    router.push(
      "/interior-design"
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 2,
          md: 4,
        },
      }}
    >

      {/* HEADER */}

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: {
            xs: 3,
            md: 5,
          },
          borderRadius: 4,
          color: "#fff",
          background:
            "linear-gradient(135deg, #08111f, #102048)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
        >
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
                fontSize: {
                  xs: "2rem",
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
              design team can understand your
              project, lifestyle and preferences.
            </Typography>
          </Box>

          <Button
            onClick={logout}
            startIcon={<LogoutIcon />}
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor:
                "rgba(255,255,255,0.3)",
              borderRadius: 2.5,
              fontWeight: 700,
              "&:hover": {
                borderColor: "#8BC53F",
                bgcolor:
                  "rgba(139,197,63,0.08)",
              },
            }}
          >
            Sign Out
          </Button>
        </Stack>
      </Paper>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>

          {/* 01 */}

          <FormSection
            number="01"
            title="Personal Details"
          >
            <Grid container spacing={2.5}>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

            </Grid>
          </FormSection>

          {/* 02 */}

          <FormSection
            number="02"
            title="Your Property"
          >
            <Grid container spacing={2.5}>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  SelectProps={{
                    native: true,
                  }}
                  label="Property Type"
                  value={form.propertyType}
                  onChange={(event) =>
                    updateField(
                      "propertyType",
                      event.target.value
                    )
                  }
                >
                  <option value="" />
                  <option value="Apartment">
                    Apartment
                  </option>
                  <option value="Villa">
                    Villa
                  </option>
                  <option value="Independent House">
                    Independent House
                  </option>
                  <option value="Penthouse">
                    Penthouse
                  </option>
                  <option value="Office">
                    Office
                  </option>
                  <option value="Commercial">
                    Commercial
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Total Area"
                  placeholder="Example: 1800 sq.ft."
                  value={form.totalArea}
                  onChange={(event) =>
                    updateField(
                      "totalArea",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Configuration"
                  placeholder="Example: 3 BHK"
                  value={form.configuration}
                  onChange={(event) =>
                    updateField(
                      "configuration",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  SelectProps={{
                    native: true,
                  }}
                  label="Property Status"
                  value={form.propertyStatus}
                  onChange={(event) =>
                    updateField(
                      "propertyStatus",
                      event.target.value
                    )
                  }
                >
                  <option value="" />
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

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Possession / Start Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.possessionDate
                  }
                  onChange={(event) =>
                    updateField(
                      "possessionDate",
                      event.target.value
                    )
                  }
                />
              </Grid>

            </Grid>
          </FormSection>

          {/* 03 */}

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

              <Grid container spacing={1.2}>
                {styles.map((style) => {
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
                          cursor: "pointer",
                          p: 1.5,
                          borderRadius: 2.5,
                          border: "1px solid",
                          borderColor:
                            selected
                              ? "#8BC53F"
                              : "#e0e5eb",
                          bgcolor:
                            selected
                              ? "#f0f8e9"
                              : "#fff",
                          transition:
                            "all .2s ease",
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
                              }}
                            >
                              {style}
                            </Typography>
                          }
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Tell us about your dream space"
              value={form.dreamSpace}
              onChange={(event) =>
                updateField(
                  "dreamSpace",
                  event.target.value
                )
              }
            />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Colours You Love"
                  value={form.colorsLove}
                  onChange={(event) =>
                    updateField(
                      "colorsLove",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Colours to Avoid"
                  value={form.colorsAvoid}
                  onChange={(event) =>
                    updateField(
                      "colorsAvoid",
                      event.target.value
                    )
                  }
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* 04 */}

          <FormSection
            number="04"
            title="Room-by-Room Requirements"
          >
            <Stack spacing={2.5}>

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Living Room"
                value={form.livingRoom}
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
                value={form.masterBedroom}
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
                value={form.kitchen}
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
                value={form.diningArea}
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
                value={form.otherRooms}
                onChange={(event) =>
                  updateField(
                    "otherRooms",
                    event.target.value
                  )
                }
              />

            </Stack>
          </FormSection>

          {/* 05 */}

          <FormSection
            number="05"
            title="Budget & Timeline"
          >
            <Grid container spacing={2.5}>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Total Budget"
                  placeholder="Example: ₹25,00,000"
                  value={form.totalBudget}
                  onChange={(event) =>
                    updateField(
                      "totalBudget",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Preferred Start Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.preferredStartDate
                  }
                  onChange={(event) =>
                    updateField(
                      "preferredStartDate",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Target Completion Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.targetCompletionDate
                  }
                  onChange={(event) =>
                    updateField(
                      "targetCompletionDate",
                      event.target.value
                    )
                  }
                />
              </Grid>

            </Grid>
          </FormSection>

          {/* 06 */}

          <FormSection
            number="06"
            title="Lifestyle & Additional Information"
          >
            <Grid container spacing={2.5}>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Children / Ages"
                  value={form.children}
                  onChange={(event) =>
                    updateField(
                      "children",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Pets"
                  value={form.pets}
                  onChange={(event) =>
                    updateField(
                      "pets",
                      event.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
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
              </Grid>

              <Grid size={{ xs: 12 }}>
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
              </Grid>

            </Grid>
          </FormSection>

          {/* SUBMIT */}

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

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              borderRadius: 4,
              bgcolor: "#102048",
              color: "#fff",
            }}
          >
            <Stack spacing={2.5}>

              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                <CheckCircleIcon
                  sx={{
                    color: "#8BC53F",
                    fontSize: 30,
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
                    Your information will be
                    securely saved to your
                    Network Ten client record
                    and a personalized Welcome
                    Kit PDF will be generated.
                  </Typography>
                </Box>
              </Stack>

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
                  bgcolor: "#8BC53F",
                  color: "#102048",
                  fontWeight: 900,
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
              >
                {submitting
                  ? "Submitting & Generating PDF..."
                  : "Submit & Generate Welcome Kit PDF"}
              </Button>

            </Stack>
          </Paper>

          <Box
            sx={{
              textAlign: "center",
              pb: 5,
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() =>
                router.push(
                  "/interior-design"
                )
              }
              sx={{
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              Back to Network Ten
            </Button>
          </Box>

        </Stack>
      </Box>
    </Container>
  );
}