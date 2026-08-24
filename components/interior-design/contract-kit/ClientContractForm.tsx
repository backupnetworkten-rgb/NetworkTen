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
import GavelIcon from "@mui/icons-material/Gavel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase/client";

import {
  generateClientContractPdf,
  saveClientContractSubmission,
} from "@/services/clientContractService";

import {
  ClientContractFormData,
  initialClientContractForm,
} from "@/types/interior-design";

import {
  CONTRACT_PAYMENT_SCHEDULES,
  CONTRACT_PROPERTY_TYPES,
  CONTRACT_SERVICE_LEVELS,
} from "@/data/clientContract";

import ContractSection from "./ContractSection";

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

export default function ClientContractForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<ClientContractFormData>(
      initialClientContractForm
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  function updateField<
    K extends keyof ClientContractFormData
  >(
    field: K,
    value: ClientContractFormData[K]
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

    if (!form.scopeOfWork.trim()) {
      setError(
        "Please define the project scope."
      );
      return;
    }

    if (!form.serviceLevel) {
      setError(
        "Please select the service level."
      );
      return;
    }

    if (!form.clientAccepted) {
      setError(
        "The client must confirm acceptance before the contract can be generated."
      );
      return;
    }

    if (!form.clientSignature.trim()) {
      setError(
        "Please enter the client's signature/name."
      );
      return;
    }

    setSubmitting(true);

    try {
      await saveClientContractSubmission(
        form
      );

      const pdf =
        await generateClientContractPdf(
          form
        );

      const url =
        URL.createObjectURL(pdf);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `Network-Ten-Client-Contract-${form.clientName
          .trim()
          .replace(/\s+/g, "-")}.pdf`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      router.push(
        "/interior-design/kits/contract/success"
      );
    } catch (submissionError) {
      console.error(
        submissionError
      );

      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to generate the Client Contract Kit."
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
                Client Contract Kit
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
                Review the project scope,
                service level, deliverables,
                commercial terms,
                responsibilities and
                acceptance details before
                generating your contract document.
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
                justifyContent: "center",

                flexShrink: 0,
              }}
            >
              <GavelIcon
                sx={{
                  fontSize: 32,
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* =================================================
            ERROR
        ================================================= */}

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
                01 CLIENT
            ================================================= */}

            <ContractSection
              number="01"
              title="Client & Project Details"
              description="Identify the contracting parties and project."
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
                    required
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
                      {CONTRACT_PROPERTY_TYPES.map(
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
            </ContractSection>

            {/* =================================================
                02 SCOPE
            ================================================= */}

            <ContractSection
              number="02"
              title="Scope of Services"
              description="Define exactly what Network Ten is engaged to provide."
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <TextField
                  fullWidth
                  required
                  multiline
                  minRows={5}
                  label="Scope of Work"
                  placeholder="Describe the agreed interior design services..."
                  value={
                    form.scopeOfWork
                  }
                  onChange={(event) =>
                    updateField(
                      "scopeOfWork",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Included Spaces"
                  placeholder="Living room, bedrooms, kitchen, dining, etc."
                  value={
                    form.includedSpaces
                  }
                  onChange={(event) =>
                    updateField(
                      "includedSpaces",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Deliverables"
                  placeholder="Concepts, layouts, 3D views, drawings, material schedules, etc."
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

                <FormControl fullWidth required>
                  <InputLabel>
                    Level of Service
                  </InputLabel>

                  <Select
                    label="Level of Service"
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
                    {CONTRACT_SERVICE_LEVELS.map(
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
            </ContractSection>

            {/* =================================================
                03 FEES
            ================================================= */}

            <ContractSection
              number="03"
              title="Fees & Payment Terms"
              description="Record the commercial terms agreed for this project."
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
                    label="Total Project Fee"
                    placeholder="₹"
                    value={
                      form.totalProjectFee
                    }
                    onChange={(event) =>
                      updateField(
                        "totalProjectFee",
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
                    label="Design Fee"
                    placeholder="₹"
                    value={
                      form.designFee
                    }
                    onChange={(event) =>
                      updateField(
                        "designFee",
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
                  <FormControl fullWidth>
                    <InputLabel>
                      Payment Schedule
                    </InputLabel>

                    <Select
                      label="Payment Schedule"
                      value={
                        form.paymentSchedule
                      }
                      onChange={(event) =>
                        updateField(
                          "paymentSchedule",
                          event.target.value
                        )
                      }
                      sx={{
                        borderRadius: 2.5,
                      }}
                    >
                      {CONTRACT_PAYMENT_SCHEDULES.map(
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
            </ContractSection>

            {/* =================================================
                04 TIMELINE
            ================================================= */}

            <ContractSection
              number="04"
              title="Timeline & Revisions"
              description="Record the agreed project timeline and revision framework."
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
                    label="Estimated Start Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={
                      form.estimatedStartDate
                    }
                    onChange={(event) =>
                      updateField(
                        "estimatedStartDate",
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
                    label="Estimated Completion Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={
                      form.estimatedCompletionDate
                    }
                    onChange={(event) =>
                      updateField(
                        "estimatedCompletionDate",
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
                    label="Included Revisions"
                    placeholder="Example: 2 revision rounds"
                    value={
                      form.includedRevisions
                    }
                    onChange={(event) =>
                      updateField(
                        "includedRevisions",
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
                    label="Additional Revision Fee"
                    placeholder="As agreed"
                    value={
                      form.additionalRevisionFee
                    }
                    onChange={(event) =>
                      updateField(
                        "additionalRevisionFee",
                        event.target.value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </ContractSection>

            {/* =================================================
                05 RESPONSIBILITIES
            ================================================= */}

            <ContractSection
              number="05"
              title="Responsibilities"
              description="Clearly document the responsibilities of both parties."
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  label="Client Responsibilities"
                  placeholder="Approvals, access, information, timely decisions, payments, etc."
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
                  placeholder="Design services, agreed deliverables, communication, coordination, etc."
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
                  placeholder="Items specifically excluded from this agreement..."
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
            </ContractSection>

            {/* =================================================
                06 TERMS
            ================================================= */}

            <ContractSection
              number="06"
              title="Project Terms"
              description="Enter the approved contractual terms for this specific project."
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
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
                  label="Dispute Resolution Terms"
                  value={
                    form.disputeResolutionTerms
                  }
                  onChange={(event) =>
                    updateField(
                      "disputeResolutionTerms",
                      event.target.value
                    )
                  }
                  sx={inputSx}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Additional Contract Notes"
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
            </ContractSection>

            {/* =================================================
                07 ACCEPTANCE
            ================================================= */}

            <ContractSection
              number="07"
              title="Client Acceptance"
              description="The client should review the final information before the document is generated."
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
                          color: "#6da82e",
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
                      proceed with the contract
                      document based on the
                      approved project terms.
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
                    type="date"
                    required
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
            </ContractSection>

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

                bgcolor: "#102048",

                color: "#fff",

                boxShadow:
                  "0 18px 45px rgba(16,32,72,0.15)",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  flexDirection: "column",

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
                      Contract ready?
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,

                        color:
                          "rgba(255,255,255,0.7)",

                        lineHeight: 1.7,
                      }}
                    >
                      Once submitted, the
                      completed contract document
                      will be generated as a PDF.
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
                    ? "Saving & Generating Contract..."
                    : "Accept & Generate Contract PDF"}
                </Button>
              </Box>
            </Paper>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

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