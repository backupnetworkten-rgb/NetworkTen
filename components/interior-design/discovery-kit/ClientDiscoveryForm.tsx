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
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  generateClientDiscoveryPdf,
  saveClientDiscoverySubmission,
} from "@/services/clientDiscoveryService";

import {
  initialClientDiscoveryForm,
} from "@/types/interior-design";

import type {
  ClientDiscoveryFormData,
} from "@/types/interior-design";

import {
  DISCOVERY_CONFIGURATIONS,
  DISCOVERY_DESIGN_STYLES,
  DISCOVERY_LIGHTING_OPTIONS,
  DISCOVERY_MAINTENANCE_OPTIONS,
  DISCOVERY_MOOD_OPTIONS,
  DISCOVERY_PRIORITIES,
  DISCOVERY_PROJECT_STATUSES,
  DISCOVERY_PROPERTY_TYPES,
} from "@/data/clientDiscovery";

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
          "1px solid #e5eaf0",
        background: "#fff",
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

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
  },
};

export default function ClientDiscoveryForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<ClientDiscoveryFormData>(
      initialClientDiscoveryForm
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  function updateField<
    K extends keyof ClientDiscoveryFormData
  >(
    field: K,
    value: ClientDiscoveryFormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function toggleArrayValue(
    field:
      | "designStyles"
      | "topPriorities",
    value: string
  ) {
    setForm((previous) => {
      const current =
        previous[field];

      const exists =
        current.includes(value);

      return {
        ...previous,
        [field]: exists
          ? current.filter(
              (item) => item !== value
            )
          : [...current, value],
      };
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

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

    if (
      form.topPriorities.length === 0
    ) {
      setError(
        "Please select at least one project priority."
      );
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setSubmitting(true);

    try {
      await saveClientDiscoverySubmission(
        form
      );

      const pdf =
        await generateClientDiscoveryPdf(
          form
        );

      const url =
        URL.createObjectURL(pdf);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `Network-Ten-Client-Discovery-${form.fullName
          .trim()
          .replace(
            /\s+/g,
            "-"
          )}.pdf`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      router.push(
        "/interior-design/kits/discovery/success"
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your Client Discovery Kit."
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
                letterSpacing:
                  "0.25em",
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
              Client Discovery Kit
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 720,
                color:
                  "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
              }}
            >
              This discovery form helps our
              interior design team understand
              your lifestyle, project goals,
              design preferences, room
              requirements and expectations.
            </Typography>
          </Box>

          <Button
            onClick={logout}
            startIcon={
              <LogoutIcon />
            }
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor:
                "rgba(255,255,255,0.3)",
              borderRadius: 2.5,
              fontWeight: 700,
              "&:hover": {
                borderColor:
                  "#8BC53F",
                bgcolor:
                  "rgba(139,197,63,0.08)",
              },
            }}
          >
            Sign Out
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 3,
          }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>

          {/* 01 */}

          <FormSection
            number="01"
            title="Client & Project Details"
            description="Tell us about you and the property we will be designing."
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
                  onChange={(e) =>
                    updateField(
                      "fullName",
                      e.target.value
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
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
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
                  label="Phone Number"
                  value={
                    form.phone
                  }
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value
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
                  label="City"
                  value={
                    form.city
                  }
                  onChange={(e) =>
                    updateField(
                      "city",
                      e.target.value
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
                  label="Project Name"
                  placeholder="Example: Our Dream Home"
                  value={
                    form.projectName
                  }
                  onChange={(e) =>
                    updateField(
                      "projectName",
                      e.target.value
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
                <FormControl
                  fullWidth
                  required
                >
                  <InputLabel>
                    Property Type
                  </InputLabel>

                  <Select
                    label="Property Type"
                    value={
                      form.propertyType
                    }
                    onChange={(e) =>
                      updateField(
                        "propertyType",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_PROPERTY_TYPES.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Total Area"
                  placeholder="Example: 1450 sq.ft."
                  value={
                    form.totalArea
                  }
                  onChange={(e) =>
                    updateField(
                      "totalArea",
                      e.target.value
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
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Configuration
                  </InputLabel>

                  <Select
                    label="Configuration"
                    value={
                      form.configuration
                    }
                    onChange={(e) =>
                      updateField(
                        "configuration",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_CONFIGURATIONS.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Property Status
                  </InputLabel>

                  <Select
                    label="Property Status"
                    value={
                      form.propertyStatus
                    }
                    onChange={(e) =>
                      updateField(
                        "propertyStatus",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_PROJECT_STATUSES.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
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
                  label="Possession Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.possessionDate
                  }
                  onChange={(e) =>
                    updateField(
                      "possessionDate",
                      e.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* 02 */}

          <FormSection
            number="02"
            title="Project Vision & Goals"
            description="Help us understand what you want your space to become."
          >
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                required
                multiline
                minRows={4}
                label="What is your vision for this project?"
                value={
                  form.projectVision
                }
                onChange={(e) =>
                  updateField(
                    "projectVision",
                    e.target.value
                  )
                }
                sx={inputSx}
              />

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Describe your dream space"
                value={
                  form.dreamSpace
                }
                onChange={(e) =>
                  updateField(
                    "dreamSpace",
                    e.target.value
                  )
                }
                sx={inputSx}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="What problems do you want the design to solve?"
                placeholder="Storage, layout, lighting, privacy, clutter, etc."
                value={
                  form.problemsToSolve
                }
                onChange={(e) =>
                  updateField(
                    "problemsToSolve",
                    e.target.value
                  )
                }
                sx={inputSx}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Must-have features"
                placeholder="Wardrobe, home theatre, study, island kitchen, smart home, etc."
                value={
                  form.mustHaveFeatures
                }
                onChange={(e) =>
                  updateField(
                    "mustHaveFeatures",
                    e.target.value
                  )
                }
                sx={inputSx}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Inspiration / Reference Links"
                placeholder="Pinterest, Instagram, Houzz or other references"
                value={
                  form.inspirationReferences
                }
                onChange={(e) =>
                  updateField(
                    "inspirationReferences",
                    e.target.value
                  )
                }
                sx={inputSx}
              />
            </Stack>
          </FormSection>

          {/* 03 */}

          <FormSection
            number="03"
            title="Lifestyle & Functional Requirements"
            description="Understanding how you use your home helps us design it around you."
          >
            <Grid
              container
              spacing={2.5}
            >
              {[
                [
                  "familyMembers",
                  "How many family members?",
                ],
                [
                  "elderlyMembers",
                  "Elderly Members",
                ],
                [
                  "children",
                  "Children / Age Groups",
                ],
                [
                  "pets",
                  "Pets",
                ],
                [
                  "workFromHome",
                  "Work From Home Requirements",
                ],
                [
                  "entertaining",
                  "How often do you entertain guests?",
                ],
              ].map(
                ([field, label]) => (
                  <Grid
                    key={field}
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      label={label}
                      value={
                        form[
                          field as keyof ClientDiscoveryFormData
                        ] as string
                      }
                      onChange={(e) =>
                        updateField(
                          field as keyof ClientDiscoveryFormData,
                          e.target.value as never
                        )
                      }
                      sx={inputSx}
                    />
                  </Grid>
                )
              )}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Tell us about your lifestyle"
                  placeholder="Daily routines, hobbies, work style, social life, cooking habits, relaxation, etc."
                  value={
                    form.lifestyleDescription
                  }
                  onChange={(e) =>
                    updateField(
                      "lifestyleDescription",
                      e.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* 04 */}

          <FormSection
            number="04"
            title="Design Preferences"
            description="Select the visual direction that best represents your taste."
          >
            <Box>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: 800,
                  color: "#102048",
                }}
              >
                Preferred Design Styles *
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
              >
                {DISCOVERY_DESIGN_STYLES.map(
                  (style) => {
                    const selected =
                      form.designStyles.includes(
                        style
                      );

                    return (
                      <Chip
                        key={style}
                        label={style}
                        clickable
                        onClick={() =>
                          toggleArrayValue(
                            "designStyles",
                            style
                          )
                        }
                        sx={{
                          borderRadius: 2,
                          fontWeight: 700,
                          background:
                            selected
                              ? "#102048"
                              : "#f5f7fa",
                          color:
                            selected
                              ? "#8BC53F"
                              : "#475569",
                          border:
                            selected
                              ? "1px solid #102048"
                              : "1px solid #e2e8f0",
                        }}
                      />
                    );
                  }
                )}
              </Stack>
            </Box>

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
                  label="Colours You Love"
                  placeholder="Beige, white, green, wood tones..."
                  value={
                    form.colorsLove
                  }
                  onChange={(e) =>
                    updateField(
                      "colorsLove",
                      e.target.value
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
                  label="Colours You Want to Avoid"
                  value={
                    form.colorsAvoid
                  }
                  onChange={(e) =>
                    updateField(
                      "colorsAvoid",
                      e.target.value
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
                  label="Material Preferences"
                  placeholder="Wood, marble, fluted panels, glass, metal..."
                  value={
                    form.materialsPreference
                  }
                  onChange={(e) =>
                    updateField(
                      "materialsPreference",
                      e.target.value
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
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Lighting Preference
                  </InputLabel>

                  <Select
                    label="Lighting Preference"
                    value={
                      form.lightingPreference
                    }
                    onChange={(e) =>
                      updateField(
                        "lightingPreference",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_LIGHTING_OPTIONS.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Overall Mood
                  </InputLabel>

                  <Select
                    label="Overall Mood"
                    value={
                      form.overallMood
                    }
                    onChange={(e) =>
                      updateField(
                        "overallMood",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_MOOD_OPTIONS.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </FormSection>

          {/* 05 */}

          <FormSection
            number="05"
            title="Room-by-Room Requirements"
            description="Describe what you need from each important space."
          >
            <Stack spacing={2.5}>
              {[
                [
                  "livingRoom",
                  "Living Room Requirements",
                ],
                [
                  "masterBedroom",
                  "Master Bedroom Requirements",
                ],
                [
                  "bedroom2",
                  "Bedroom 2 Requirements",
                ],
                [
                  "bedroom3",
                  "Bedroom 3 Requirements",
                ],
                [
                  "kitchen",
                  "Kitchen Requirements",
                ],
                [
                  "diningArea",
                  "Dining Area Requirements",
                ],
                [
                  "bathroom",
                  "Bathroom Requirements",
                ],
                [
                  "balcony",
                  "Balcony Requirements",
                ],
                [
                  "studyRoom",
                  "Study / Home Office Requirements",
                ],
                [
                  "poojaRoom",
                  "Pooja Room Requirements",
                ],
                [
                  "otherRooms",
                  "Other Room Requirements",
                ],
              ].map(
                ([field, label]) => (
                  <TextField
                    key={field}
                    fullWidth
                    multiline
                    minRows={2}
                    label={label}
                    value={
                      form[
                        field as keyof ClientDiscoveryFormData
                      ] as string
                    }
                    onChange={(e) =>
                      updateField(
                        field as keyof ClientDiscoveryFormData,
                        e.target.value as never
                      )
                    }
                    sx={inputSx}
                  />
                )
              )}
            </Stack>
          </FormSection>

          {/* 06 */}

          <FormSection
            number="06"
            title="Budget, Timeline & Expectations"
            description="The more clearly we understand your expectations, the better we can plan your project."
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
                  placeholder="Example: ₹15–20 Lakhs"
                  value={
                    form.totalBudget
                  }
                  onChange={(e) =>
                    updateField(
                      "totalBudget",
                      e.target.value
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.preferredStartDate
                  }
                  onChange={(e) =>
                    updateField(
                      "preferredStartDate",
                      e.target.value
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
                  label="Target Completion Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    form.targetCompletionDate
                  }
                  onChange={(e) =>
                    updateField(
                      "targetCompletionDate",
                      e.target.value
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
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Maintenance Preference
                  </InputLabel>

                  <Select
                    label="Maintenance Preference"
                    value={
                      form.maintenancePreference
                    }
                    onChange={(e) =>
                      updateField(
                        "maintenancePreference",
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {DISCOVERY_MAINTENANCE_OPTIONS.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#102048",
                    mb: 1.5,
                  }}
                >
                  What matters most to you? *
                </Typography>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={1}
                >
                  {DISCOVERY_PRIORITIES.map(
                    (priority) => {
                      const selected =
                        form.topPriorities.includes(
                          priority
                        );

                      return (
                        <FormControlLabel
                          key={priority}
                          control={
                            <Checkbox
                              checked={
                                selected
                              }
                              onChange={() =>
                                toggleArrayValue(
                                  "topPriorities",
                                  priority
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
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >
                              {priority}
                            </Typography>
                          }
                        />
                      );
                    }
                  )}
                </Stack>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Who will be involved in design decisions?"
                  placeholder="Husband & Wife, Family, Business Partners..."
                  value={
                    form.decisionMakers
                  }
                  onChange={(e) =>
                    updateField(
                      "decisionMakers",
                      e.target.value
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
                  label="Anything else you want us to know?"
                  value={
                    form.additionalNotes
                  }
                  onChange={(e) =>
                    updateField(
                      "additionalNotes",
                      e.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* SUBMIT */}

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
                    and a Client Discovery PDF
                    will be generated.
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
                  : "Submit & Generate Discovery PDF"}
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