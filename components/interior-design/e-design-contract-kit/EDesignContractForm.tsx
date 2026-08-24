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
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase/client";

import {
  generateEDesignContractPdf,
  saveEDesignContractSubmission,
} from "@/services/eDesignContractService";

import {
  EDesignContractFormData,
  initialEDesignContractForm,
} from "@/types/interior-design";

import {
  E_DESIGN_COMMUNICATION_METHODS,
  E_DESIGN_DELIVERABLES,
  E_DESIGN_PAYMENT_OPTIONS,
  E_DESIGN_PROPERTY_TYPES,
  E_DESIGN_SERVICE_LEVELS,
} from "@/data/eDesignContract";

import EDesignSection from "./EDesignSection";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,

    backgroundColor: "#fff",

    "&.Mui-focused": {
      boxShadow:
        "0 0 0 3px rgba(139,197,63,0.10)",
    },
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#102048",
  },
};

export default function EDesignContractForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<EDesignContractFormData>(
      initialEDesignContractForm
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  function updateField<
    K extends keyof EDesignContractFormData
  >(
    field: K,
    value: EDesignContractFormData[K]
  ) {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!form.clientName.trim()) {
      setError(
        "Please enter the client's full name."
      );
      return;
    }

    if (!form.clientEmail.trim()) {
      setError(
        "Please enter the client's email address."
      );
      return;
    }

    if (!form.projectName.trim()) {
      setError(
        "Please enter the project name."
      );
      return;
    }

    if (!form.serviceLevel) {
      setError(
        "Please select the E-Design service level."
      );
      return;
    }

    if (!form.deliverables.trim()) {
      setError(
        "Please specify the E-Design deliverables."
      );
      return;
    }

    if (!form.clientAccepted) {
      setError(
        "The client must confirm acceptance before the E-Design contract can be generated."
      );
      return;
    }

    if (!form.clientSignature.trim()) {
      setError(
        "Please enter the client's signature/name."
      );
      return;
    }

    if (!form.acceptanceDate) {
      setError(
        "Please select the acceptance date."
      );
      return;
    }

    setSubmitting(true);

    try {
      await saveEDesignContractSubmission(
        form
      );

      const pdf =
        await generateEDesignContractPdf(
          form
        );

      const url =
        URL.createObjectURL(pdf);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `Network-Ten-E-Design-Contract-${form.clientName
          .trim()
          .replace(/\s+/g, "-")}.pdf`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      router.push(
        "/interior-design/kits/e-design/success"
      );
    } catch (submissionError) {
      console.error(
        submissionError
      );

      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to generate the E-Design Contract."
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
    <Box
      sx={{
        minHeight: "100vh",

        bgcolor: "#f7f9fc",

        py: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* =================================================
            HERO
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

            color: "#fff",

            background:
              "linear-gradient(135deg, #08111f 0%, #102048 65%, #182d57 100%)",

            position: "relative",

            overflow: "hidden",

            boxShadow:
              "0 20px 50px rgba(16,32,72,0.15)",
          }}
        >
          <Box
            sx={{
              position: "relative",

              zIndex: 1,

              display: "flex",

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              justifyContent:
                "space-between",

              gap: 3,
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
                E-Design Contract Kit
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,

                  maxWidth: 760,

                  color:
                    "rgba(255,255,255,0.72)",

                  lineHeight: 1.7,
                }}
              >
                Define your digital interior design
                service, deliverables, communication
                process, responsibilities and agreed
                project terms.
              </Typography>
            </Box>

            <Box
              sx={{
                width: 64,

                height: 64,

                borderRadius: 3,

                bgcolor:
                  "rgba(139,197,63,0.12)",

                color: "#8BC53F",

                display: "flex",

                alignItems: "center",

                justifyContent:
                  "center",

                flexShrink: 0,
              }}
            >
              <DesignServicesIcon
                sx={{
                  fontSize: 32,
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* ERROR */}

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
          <Box
            sx={{
              display: "flex",

              flexDirection:
                "column",

              gap: 3,
            }}
          >

            {/* =================================================
                01 CLIENT
            ================================================= */}

            <EDesignSection
              number="01"
              title="Client & Project Details"
              description="Identify the client and the E-Design project."
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
                    label="Client Full Name"
                    value={
                      form.clientName
                    }
                    onChange={(event) =>
                      updateField(
                        "clientName",
                        event.target.value
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
                    label="Client Email"
                    value={
                      form.clientEmail
                    }
                    onChange={(event) =>
                      updateField(
                        "clientEmail",
                        event.target.value
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
                    label="Client Phone"
                    value={
                      form.clientPhone
                    }
                    onChange={(event) =>
                      updateField(
                        "clientPhone",
                        event.target.value
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
                  <FormControl fullWidth>
                    <InputLabel>
                      Property Type
                    </InputLabel>

                    <Select
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
                      sx={{
                        borderRadius: 2.5,
                      }}
                    >
                      {E_DESIGN_PROPERTY_TYPES.map(
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
                  <TextField
                    fullWidth
                    label="Client Address"
                    value={
                      form.clientAddress
                    }
                    onChange={(event) =>
                      updateField(
                        "clientAddress",
                        event.target.value
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
                    label="Project Name"
                    value={
                      form.projectName
                    }
                    onChange={(event) =>
                      updateField(
                        "projectName",
                        event.target.value
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
                    label="Project Address"
                    value={
                      form.projectAddress
                    }
                    onChange={(event) =>
                      updateField(
                        "projectAddress",
                        event.target.value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </EDesignSection>

            {/* =================================================
                02 PROJECT
            ================================================= */}

            <EDesignSection
              number="02"
              title="E-Design Project Scope"
              description="Define the project and spaces covered by the digital design service."
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
                  label="Project Description"
                  placeholder="Describe the property, design goals and overall project..."
                  value={
                    form.projectDescription
                  }
                  onChange={(event) =>
                    updateField(
                      "projectDescription",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Rooms / Areas Included"
                  placeholder="Example: Living room, master bedroom and dining area"
                  value={
                    form.roomsIncluded
                  }
                  onChange={(event) =>
                    updateField(
                      "roomsIncluded",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <FormControl fullWidth required>
                  <InputLabel>
                    E-Design Service Level
                  </InputLabel>

                  <Select
                    label="E-Design Service Level"
                    value={
                      form.serviceLevel
                    }
                    onChange={(event) =>
                      updateField(
                        "serviceLevel",
                        event.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {E_DESIGN_SERVICE_LEVELS.map(
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
              </Box>
            </EDesignSection>

            {/* =================================================
                03 DELIVERABLES
            ================================================= */}

            <EDesignSection
              number="03"
              title="Digital Deliverables"
              description="Record exactly what will be delivered as part of the E-Design service."
            >
              <TextField
                fullWidth
                required
                multiline
                minRows={6}
                label="E-Design Deliverables"
                placeholder={`Example:
• Mood board
• Furniture layout
• Colour palette
• Material recommendations
• Product suggestions
• 3D visualisations`}
                value={
                  form.deliverables
                }
                onChange={(event) =>
                  updateField(
                    "deliverables",
                    event.target.value
                  )
                }
                sx={inputSx}
              />

              <Box
                sx={{
                  mt: 2,

                  display: "flex",

                  flexWrap: "wrap",

                  gap: 1,
                }}
              >
                {E_DESIGN_DELIVERABLES.map(
                  (item) => (
                    <Box
                      key={item}
                      sx={{
                        px: 1.5,

                        py: 0.8,

                        borderRadius: 2,

                        bgcolor:
                          "#f1f5f9",

                        color:
                          "#475569",

                        fontSize:
                          "12px",

                        fontWeight: 700,
                      }}
                    >
                      {item}
                    </Box>
                  )
                )}
              </Box>
            </EDesignSection>

            {/* =================================================
                04 PROCESS
            ================================================= */}

            <EDesignSection
              number="04"
              title="Design Process & Communication"
              description="Document how the E-Design service will be delivered and how the client and Network Ten will communicate."
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
                  minRows={5}
                  label="Design Process"
                  placeholder="Describe consultation, design development, presentation, feedback and final delivery..."
                  value={
                    form.designProcess
                  }
                  onChange={(event) =>
                    updateField(
                      "designProcess",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <FormControl fullWidth>
                  <InputLabel>
                    Primary Communication Method
                  </InputLabel>

                  <Select
                    label="Primary Communication Method"
                    value={
                      form.communicationMethod
                    }
                    onChange={(event) =>
                      updateField(
                        "communicationMethod",
                        event.target.value
                      )
                    }
                    sx={{
                      borderRadius: 2.5,
                    }}
                  >
                    {E_DESIGN_COMMUNICATION_METHODS.map(
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

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Client-Provided Measurements / Information"
                  placeholder="Record what measurements, photographs, floor plans or other information the client must provide..."
                  value={
                    form.clientProvidedMeasurements
                  }
                  onChange={(event) =>
                    updateField(
                      "clientProvidedMeasurements",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Box>
            </EDesignSection>

            {/* =================================================
                05 TIMELINE
            ================================================= */}

            <EDesignSection
              number="05"
              title="Timeline & Revisions"
              description="Set expectations for project dates and revision rounds."
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
                    type="date"
                    label="Expected Start Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={
                      form.expectedStartDate
                    }
                    onChange={(event) =>
                      updateField(
                        "expectedStartDate",
                        event.target.value
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
                    label="Expected Completion Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={
                      form.expectedCompletionDate
                    }
                    onChange={(event) =>
                      updateField(
                        "expectedCompletionDate",
                        event.target.value
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
                    minRows={4}
                    label="Revision Policy"
                    placeholder="Specify included revision rounds and how additional revisions are handled..."
                    value={
                      form.revisionPolicy
                    }
                    onChange={(event) =>
                      updateField(
                        "revisionPolicy",
                        event.target.value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </EDesignSection>

            {/* =================================================
                06 FEES
            ================================================= */}

            <EDesignSection
              number="06"
              title="Fees & Payment"
              description="Enter the approved E-Design commercial terms."
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
                    label="Total E-Design Fee"
                    placeholder="₹"
                    value={
                      form.totalFee
                    }
                    onChange={(event) =>
                      updateField(
                        "totalFee",
                        event.target.value
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
                  <FormControl fullWidth>
                    <InputLabel>
                      Payment Terms
                    </InputLabel>

                    <Select
                      label="Payment Terms"
                      value={
                        form.paymentTerms
                      }
                      onChange={(event) =>
                        updateField(
                          "paymentTerms",
                          event.target.value
                        )
                      }
                      sx={{
                        borderRadius: 2.5,
                      }}
                    >
                      {E_DESIGN_PAYMENT_OPTIONS.map(
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
            </EDesignSection>

            {/* =================================================
                07 RESPONSIBILITIES
            ================================================= */}

            <EDesignSection
              number="07"
              title="Responsibilities & Exclusions"
              description="Clearly document what each party is responsible for."
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
                  minRows={5}
                  label="Client Responsibilities"
                  placeholder="Timely information, measurements, photographs, approvals, payments, feedback, etc."
                  value={
                    form.clientResponsibilities
                  }
                  onChange={(event) =>
                    updateField(
                      "clientResponsibilities",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  label="Network Ten Responsibilities"
                  placeholder="Agreed design services, digital deliverables, communication and presentation..."
                  value={
                    form.networkTenResponsibilities
                  }
                  onChange={(event) =>
                    updateField(
                      "networkTenResponsibilities",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Exclusions"
                  placeholder="Services or items not included in the E-Design package..."
                  value={
                    form.exclusions
                  }
                  onChange={(event) =>
                    updateField(
                      "exclusions",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Box>
            </EDesignSection>

            {/* =================================================
                08 TERMS
            ================================================= */}

            <EDesignSection
              number="08"
              title="E-Design Terms"
              description="Enter the approved terms applicable to this E-Design engagement."
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
                  label="Intellectual Property Terms"
                  value={
                    form.intellectualPropertyTerms
                  }
                  onChange={(event) =>
                    updateField(
                      "intellectualPropertyTerms",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Confidentiality Terms"
                  value={
                    form.confidentialityTerms
                  }
                  onChange={(event) =>
                    updateField(
                      "confidentialityTerms",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Cancellation / Termination Terms"
                  value={
                    form.cancellationTerms
                  }
                  onChange={(event) =>
                    updateField(
                      "cancellationTerms",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Additional Notes"
                  value={
                    form.additionalNotes
                  }
                  onChange={(event) =>
                    updateField(
                      "additionalNotes",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />
              </Box>
            </EDesignSection>

            {/* =================================================
                09 ACCEPTANCE
            ================================================= */}

            <EDesignSection
              number="09"
              title="Client Acceptance"
              description="Review the entered information before generating the E-Design Contract."
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,

                  borderRadius: 3,

                  bgcolor:
                    "rgba(139,197,63,0.07)",

                  border:
                    "1px solid rgba(139,197,63,0.2)",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        form.clientAccepted
                      }
                      onChange={(event) =>
                        updateField(
                          "clientAccepted",
                          event.target.checked
                        )
                      }
                      sx={{
                        color: "#8BC53F",

                        "&.Mui-checked": {
                          color:
                            "#6da82e",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: "#102048",

                        fontWeight: 700,
                      }}
                    >
                      I confirm that I have
                      reviewed the information
                      entered above and agree to
                      proceed with the E-Design
                      contract document based on
                      the approved project terms.
                    </Typography>
                  }
                />
              </Paper>

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
                    label="Client Signature / Full Name"
                    value={
                      form.clientSignature
                    }
                    onChange={(event) =>
                      updateField(
                        "clientSignature",
                        event.target.value
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
                    type="date"
                    label="Acceptance Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={
                      form.acceptanceDate
                    }
                    onChange={(event) =>
                      updateField(
                        "acceptanceDate",
                        event.target.value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </EDesignSection>

            {/* =================================================
                GENERATE
            ================================================= */}

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

                boxShadow:
                  "0 18px 45px rgba(16,32,72,0.15)",
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
                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "flex-start",

                    gap: 2,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: "#8BC53F",

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
                      E-Design contract ready?
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,

                        color:
                          "rgba(255,255,255,0.7)",

                        lineHeight: 1.7,
                      }}
                    >
                      Once submitted, your
                      completed E-Design Contract
                      will be generated as a
                      professional PDF.
                    </Typography>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={submitting}
                  startIcon={
                    <DownloadIcon />
                  }
                  sx={{
                    minHeight: 52,

                    borderRadius: 2.5,

                    bgcolor: "#8BC53F",

                    color: "#102048",

                    fontWeight: 900,

                    "&:hover": {
                      bgcolor: "#fff",
                    },

                    "&.Mui-disabled": {
                      bgcolor:
                        "rgba(139,197,63,0.5)",
                    },
                  }}
                >
                  {submitting
                    ? "Saving & Generating PDF..."
                    : "Accept & Generate E-Design Contract"}
                </Button>
              </Box>
            </Paper>

            {/* ACTIONS */}

            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                flexWrap: "wrap",

                gap: 2,

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
                Back to Client Kits
              </Button>

              <Button
                startIcon={
                  <LogoutIcon />
                }
                onClick={logout}
                sx={{
                  color: "#64748b",

                  fontWeight: 700,
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}