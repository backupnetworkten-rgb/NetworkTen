"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ============================================================
   BRAND CONFIGURATION
============================================================ */

const BRAND = {
  name: "NetworkTen",
  subtitle: "Interior Design & Project Solutions",

  /*
   IMPORTANT:
   Put your actual NetworkTen logo here.

   Example:
   public/images/networkten-logo.png
  */
  logo: "/images/logo.png",

  website: "https://www.networkten.in",

  /*
   Replace these with your exact social profiles.
   I am leaving them as configurable values rather than
   inventing social URLs that were not supplied in the PDF.
  */
  instagram: "https://www.instagram.com/",
  whatsapp: "https://wa.me/",
  email: "info@networkten.in",
  phone: "+91 8687878755",
};

/* ============================================================
   FORM TYPE
============================================================ */

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;

  propertyType: string;
  totalArea: string;
  configuration: string;
  propertyStatus: string;
  possessionDate: string;

  designStyles: string[];
  dreamSpace: string;
  coloursLove: string;
  coloursAvoid: string;

  livingRoom: string;
  masterBedroom: string;
  kitchen: string;
  diningArea: string;
  otherRooms: string;

  totalBudget: string;
  designFeeBudget: string;
  preferredStartDate: string;
  targetCompletionDate: string;

  familyMembers: string;
  elderlyMembers: string;
  children: string;
  pets: string;
  workFromHome: string;
  anythingElse: string;
};

const initialForm: FormData = {
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
  coloursLove: "",
  coloursAvoid: "",

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
  anythingElse: "",
};

/* ============================================================
   STEPS
============================================================ */

const steps = [
  {
    number: "01",
    title: "Personal Details",
    short: "About You",
    description: "Your basic contact information",
    icon: DescriptionOutlinedIcon,
  },
  {
    number: "02",
    title: "Your Property",
    short: "Property",
    description: "Information about your space",
    icon: HomeWorkOutlinedIcon,
  },
  {
    number: "03",
    title: "Design Preferences",
    short: "Your Style",
    description: "Your aesthetic preferences",
    icon: PaletteOutlinedIcon,
  },
  {
    number: "04",
    title: "Room Requirements",
    short: "Rooms",
    description: "Requirements for each room",
    icon: MeetingRoomOutlinedIcon,
  },
  {
    number: "05",
    title: "Budget & Timeline",
    short: "Planning",
    description: "Budget and project timeline",
    icon: CalendarMonthOutlinedIcon,
  },
  {
    number: "06",
    title: "Lifestyle Information",
    short: "Lifestyle",
    description: "How you live in the space",
    icon: FamilyRestroomOutlinedIcon,
  },
];

/* ============================================================
   DESIGN STYLES
============================================================ */

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

/* ============================================================
   FAQ
============================================================ */

const faqs = [
  {
    question: "How long will my project take?",
    answer:
      "A typical 2BHK project takes approximately 3–4 months from design to handover. 3–4BHK with full execution runs approximately 5–7 months. Timelines depend on complexity, procurement and decision speed.",
  },
  {
    question: "What if I want to change something mid-project?",
    answer:
      "Minor adjustments are part of the process. Significant changes after concept approval may incur additional fees. Changes are documented through a Change Order.",
  },
  {
    question: "Can I source my own furniture or materials?",
    answer:
      "Absolutely. Client-sourced items can be incorporated when dimensions and specifications are shared early.",
  },
  {
    question: "Is GST applicable on your fees?",
    answer:
      "Yes. GST at 18% is applicable on design service fees and billed separately.",
  },
  {
    question: "Do you work on projects outside your city?",
    answer:
      "Yes. Remote projects can be handled through virtual design packages. Site-supervised projects may require travel.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Bank transfer, UPI and cheque are accepted. Work begins after the required advance payment.",
  },
];

/* ============================================================
   FORM FIELD
============================================================ */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <Box>
      <Typography className="field-label">
        {label}
      </Typography>

      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        size="small"
        className="premium-field"
      />
    </Box>
  );
}

/* ============================================================
   SELECT FIELD
============================================================ */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <Box>
      <Typography className="field-label">
        {label}
      </Typography>

      <Select
        fullWidth
        size="small"
        value={value}
        displayEmpty
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="premium-select"
      >
        <MenuItem value="">
          <span style={{ color: "#98a2b3" }}>
            Select {label}
          </span>
        </MenuItem>

        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

/* ============================================================
   PDF TEXT HELPER
============================================================ */

const safe = (value?: string) =>
  value && value.trim()
    ? value
    : "Not provided";

/* ============================================================
   COMPONENT
============================================================ */

export default function WelcomeKitPage() {
  const router = useRouter();

  const pdfRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] =
    useState<"overview" | "form">(
      "overview"
    );

  const [activeStep, setActiveStep] =
    useState(0);

  const [form, setForm] =
    useState<FormData>(initialForm);

  const [saved, setSaved] =
    useState(false);

  const [reviewMode, setReviewMode] =
    useState(false);

  const [generatingPdf, setGeneratingPdf] =
    useState(false);

  const [pdfReady, setPdfReady] =
    useState(false);

  /* ============================================================
     LOAD DRAFT
  ============================================================ */

  useEffect(() => {
    try {
      const savedData =
        localStorage.getItem(
          "interior-welcome-kit-draft"
        );

      if (savedData) {
        setForm(
          JSON.parse(savedData)
        );
      }
    } catch {
      // Ignore malformed drafts.
    }
  }, []);

  /* ============================================================
     UPDATE FIELD
  ============================================================ */

  const updateField = <
    K extends keyof FormData
  >(
    field: K,
    value: FormData[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
    setPdfReady(false);
  };

  /* ============================================================
     DESIGN STYLE TOGGLE
  ============================================================ */

  const toggleStyle = (
    style: string
  ) => {
    const exists =
      form.designStyles.includes(
        style
      );

    updateField(
      "designStyles",
      exists
        ? form.designStyles.filter(
            (item) =>
              item !== style
          )
        : [
            ...form.designStyles,
            style,
          ]
    );
  };

  /* ============================================================
     SAVE
  ============================================================ */

  const saveDraft = () => {
    localStorage.setItem(
      "interior-welcome-kit-draft",
      JSON.stringify(form)
    );

    setSaved(true);
  };

  /* ============================================================
     REQUIRED FIELDS
  ============================================================ */

  const requiredFields =
    useMemo(() => {
      if (activeStep === 0) {
        return [
          form.fullName,
          form.email,
          form.phone,
          form.city,
        ];
      }

      if (activeStep === 1) {
        return [
          form.propertyType,
          form.totalArea,
          form.configuration,
          form.propertyStatus,
        ];
      }

      return [];
    }, [
      activeStep,
      form,
    ]);

  const canContinue =
    activeStep > 1 ||
    requiredFields.every(
      (field) =>
        String(field).trim()
          .length > 0
    );

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const nextStep = () => {
    if (!canContinue)
      return;

    if (
      activeStep <
      steps.length - 1
    ) {
      setActiveStep(
        (current) =>
          current + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setReviewMode(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (reviewMode) {
      setReviewMode(false);
      return;
    }

    if (activeStep > 0) {
      setActiveStep(
        (current) =>
          current - 1
      );
    }
  };

  /* ============================================================
     NEW FORM
  ============================================================ */

  const startNewForm = () => {
    setForm(initialForm);
    setActiveStep(0);
    setReviewMode(false);
    setSaved(false);
    setPdfReady(false);

    localStorage.removeItem(
      "interior-welcome-kit-draft"
    );

    setActiveTab("form");
  };

  /* ============================================================
     GENERATE ACTUAL PDF
  ============================================================ */

  const generatePdf = async () => {
    if (!pdfRef.current)
      return;

    try {
      setGeneratingPdf(true);

      /*
       Save before creating PDF.
      */
      localStorage.setItem(
        "interior-welcome-kit-draft",
        JSON.stringify(form)
      );

      const pages =
        Array.from(
          pdfRef.current.querySelectorAll(
            ".pdf-page"
          )
        ) as HTMLElement[];

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      for (
        let index = 0;
        index < pages.length;
        index++
      ) {
        const page = pages[index];

        const canvas =
          await html2canvas(
            page,
            {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor:
                "#ffffff",
              logging: false,
              windowWidth: 794,
            }
          );

        const image =
          canvas.toDataURL(
            "image/jpeg",
            0.95
          );

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          image,
          "JPEG",
          0,
          0,
          210,
          297,
          undefined,
          "FAST"
        );
      }

      const clientName =
        form.fullName
          .trim()
          .replace(
            /[^a-zA-Z0-9]+/g,
            "-"
          ) ||
        "Client";

      pdf.save(
        `NetworkTen-Welcome-Kit-${clientName}.pdf`
      );

      setPdfReady(true);
    } catch (error) {
      console.error(
        "PDF generation failed:",
        error
      );

      alert(
        "Unable to generate the PDF. Please check the browser console."
      );
    } finally {
      setGeneratingPdf(false);
    }
  };

  const progress =
    reviewMode
      ? 100
      : ((activeStep + 1) /
          steps.length) *
        100;

  return (
    <Box className="welcome-page">

      {/* ========================================================
          TOP BAR
      ======================================================== */}

      <Box className="topbar">
        <Box className="topbar-inner">

          <Box className="brand-area">

            <IconButton
              onClick={() =>
                router.push(
                  "/interior-designer"
                )
              }
              className="back-button"
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            <Box>
              <Typography className="eyebrow">
                INTERIOR DESIGNER
              </Typography>

              <Typography className="page-title">
                Client Welcome Kit
              </Typography>
            </Box>

          </Box>

          <Box className="top-actions">

            {saved && (
              <Chip
                icon={
                  <CheckRoundedIcon />
                }
                label="Draft saved"
                className="saved-chip"
              />
            )}

            <Button
              startIcon={
                <SaveOutlinedIcon />
              }
              onClick={saveDraft}
              className="save-button"
            >
              Save Draft
            </Button>

          </Box>

        </Box>
      </Box>

      <Box className="page-container">

        {/* ======================================================
            HERO
        ====================================================== */}

        <Box className="hero">

          <Box className="hero-pattern" />

          <Box className="hero-content">

            <Box className="hero-badge">
              <AutoAwesomeRoundedIcon />
              <span>
                NETWORKTEN · CLIENT WELCOME KIT
              </span>
            </Box>

            <Box>
              <Typography className="hero-title">
                Welcome to your
                <br />
                <span>design journey.</span>
              </Typography>

              <Typography className="hero-description">
                A beautifully structured introduction
                to our design approach, services and
                your project's vision.
              </Typography>
            </Box>

            <Box className="hero-bottom">

              <Box>
                <Typography className="hero-small-label">
                  DOCUMENT
                </Typography>

                <Typography className="hero-small-text">
                  Welcome · Discover · Design · Deliver
                </Typography>
              </Box>

              <Box className="hero-number">
                <Typography>
                  01
                </Typography>

                <span>
                  WELCOME KIT
                </span>
              </Box>

            </Box>

          </Box>

        </Box>

        {/* ======================================================
            TABS
        ====================================================== */}

        <Box className="main-tabs">

          <Button
            className={
              activeTab ===
              "overview"
                ? "main-tab active"
                : "main-tab"
            }
            onClick={() =>
              setActiveTab(
                "overview"
              )
            }
          >
            Kit Overview
          </Button>

          <Button
            className={
              activeTab === "form"
                ? "main-tab active"
                : "main-tab"
            }
            onClick={() =>
              setActiveTab("form")
            }
          >
            Pre-Consultation
          </Button>

        </Box>

        {/* ======================================================
            OVERVIEW
        ====================================================== */}

        {activeTab ===
          "overview" && (
          <Box className="overview-content">

            {/* INTRO */}

            <Box className="intro-grid">

              <Box className="editorial-card">

                <Typography className="section-kicker">
                  THE PURPOSE
                </Typography>

                <Typography className="editorial-title">
                  Every great space begins
                  with understanding.
                </Typography>

                <Typography className="editorial-text">
                  This Welcome Kit introduces
                  NetworkTen's design approach,
                  service levels and the information
                  we need to understand your project,
                  preferences and lifestyle.
                </Typography>

                <Button
                  onClick={
                    startNewForm
                  }
                  endIcon={
                    <ArrowForwardRoundedIcon />
                  }
                  className="gold-button"
                >
                  Start Pre-Consultation
                </Button>

              </Box>

              <Box className="included-card">

                <Typography className="section-kicker">
                  INSIDE THIS KIT
                </Typography>

                {[
                  "Welcome & introduction",
                  "About NetworkTen",
                  "6-stage design process",
                  "Service packages",
                  "Pre-consultation form",
                  "Frequently asked questions",
                  "Contact & social media",
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <Box
                      className="included-item"
                      key={item}
                    >
                      <span>
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <Typography>
                        {item}
                      </Typography>

                      <CheckRoundedIcon />
                    </Box>
                  )
                )}

              </Box>

            </Box>

            {/* PROCESS */}

            <Box className="premium-section">

              <Box className="section-header">

                <Box>
                  <Typography className="section-kicker">
                    THE DESIGN JOURNEY
                  </Typography>

                  <Typography className="section-title">
                    Our 6-stage design process
                  </Typography>
                </Box>

                <Typography className="section-count">
                  06 STAGES
                </Typography>

              </Box>

              <Box className="process-grid">

                {[
                  [
                    "01",
                    "Discovery",
                    "Consultation, site analysis & project brief",
                  ],
                  [
                    "02",
                    "Concept Development",
                    "Mood boards & 3D concept",
                  ],
                  [
                    "03",
                    "Design Development",
                    "Technical drawings & documentation",
                  ],
                  [
                    "04",
                    "Pre-Execution Planning",
                    "Procurement & project scheduling",
                  ],
                  [
                    "05",
                    "Execution & Site Management",
                    "Construction supervision & quality control",
                  ],
                  [
                    "06",
                    "Completion & Handover",
                    "Styling, inspection & project delivery",
                  ],
                ].map(
                  ([
                    number,
                    title,
                    description,
                  ]) => (
                    <Box
                      className="process-card"
                      key={number}
                    >
                      <Typography className="process-number">
                        {number}
                      </Typography>

                      <Typography className="process-title">
                        {title}
                      </Typography>

                      <Typography className="process-description">
                        {description}
                      </Typography>

                      <Box className="process-line" />
                    </Box>
                  )
                )}

              </Box>

            </Box>

            {/* PACKAGES */}

            <Box className="premium-section">

              <Box className="section-header">

                <Box>
                  <Typography className="section-kicker">
                    LEVEL OF SERVICE
                  </Typography>

                  <Typography className="section-title">
                    Choose the right level of service
                  </Typography>
                </Box>

              </Box>

              <Box className="packages-grid">

                {[
                  [
                    "01",
                    "DESIGN",
                    "₹150 – ₹250 / sq ft",
                    "Concept design, mood boards, floor plan and space planning.",
                  ],
                  [
                    "02",
                    "DESIGN PLUS",
                    "₹300 – ₹400 / sq ft",
                    "Detailed working drawings, 3D visuals and vendor coordination.",
                  ],
                  [
                    "03",
                    "DESIGN & SUPERVISION",
                    "₹400 – ₹550 / sq ft",
                    "Complete design with site supervision, progress reporting and execution support.",
                  ],
                  [
                    "04",
                    "TURNKEY SOLUTION",
                    "₹600 – ₹1,200 / sq ft",
                    "Complete end-to-end design, procurement, execution and handover.",
                  ],
                ].map(
                  ([
                    number,
                    title,
                    price,
                    description,
                  ]) => (
                    <Box
                      className="package-card"
                      key={number}
                    >
                      <Typography className="package-number">
                        {number}
                      </Typography>

                      <Typography className="package-title">
                        {title}
                      </Typography>

                      <Typography className="package-price">
                        {price}
                      </Typography>

                      <Divider className="package-divider" />

                      <Typography className="package-description">
                        {description}
                      </Typography>
                    </Box>
                  )
                )}

              </Box>

            </Box>

            {/* FAQ */}

            <Box className="premium-section">

              <Box className="section-header">

                <Box>
                  <Typography className="section-kicker">
                    FAQ
                  </Typography>

                  <Typography className="section-title">
                    Frequently asked questions
                  </Typography>
                </Box>

              </Box>

              <Box className="faq-grid">

                {faqs.map(
                  (
                    faq,
                    index
                  ) => (
                    <Box
                      className="faq-card"
                      key={
                        faq.question
                      }
                    >
                      <Typography className="faq-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </Typography>

                      <Typography className="faq-question">
                        {faq.question}
                      </Typography>

                      <Typography className="faq-answer">
                        {faq.answer}
                      </Typography>
                    </Box>
                  )
                )}

              </Box>

            </Box>

            {/* CONTACT */}

            <Box className="contact-card">

              <Box>
                <Typography className="section-kicker">
                  STAY CONNECTED
                </Typography>

                <Typography className="contact-title">
                  Let's create something
                  beautiful together.
                </Typography>

                <Typography className="contact-description">
                  Your Welcome Kit is the first
                  step towards a thoughtful,
                  personalised design experience.
                </Typography>
              </Box>

              <Box className="contact-links">

                <Box className="contact-link">
                  <EmailOutlinedIcon />
                  <span>
                    {BRAND.email}
                  </span>
                </Box>

                <Box className="contact-link">
                  <WhatsAppIcon />
                  <span>
                    {BRAND.phone}
                  </span>
                </Box>

                <Box className="contact-link">
                  <LanguageRoundedIcon />
                  <span>
                    {BRAND.website}
                  </span>
                </Box>

                <Box className="contact-link">
                  <InstagramIcon />
                  <span>
                    Instagram
                  </span>
                </Box>

              </Box>

            </Box>

          </Box>
        )}

        {/* ======================================================
            FORM
        ====================================================== */}

        {activeTab ===
          "form" && (
          <Box className="form-layout">

            {/* SIDEBAR */}

            <Box className="form-sidebar">

              <Box className="sidebar-header">

                <Typography className="sidebar-kicker">
                  PRE-CONSULTATION
                </Typography>

                <Typography className="sidebar-title">
                  Project Brief
                </Typography>

                <Typography className="sidebar-description">
                  Tell us about your project.
                  Save your progress and
                  continue whenever you're ready.
                </Typography>

              </Box>

              <Box className="progress-container">

                <Box className="progress-track">

                  <Box
                    className="progress-value"
                    sx={{
                      width: `${progress}%`,
                    }}
                  />

                </Box>

                <Typography className="progress-text">
                  {Math.round(
                    progress
                  )}
                  % COMPLETE
                </Typography>

              </Box>

              <Box className="step-list">

                {steps.map(
                  (
                    step,
                    index
                  ) => {
                    const Icon =
                      step.icon;

                    const isActive =
                      index ===
                      activeStep;

                    const isComplete =
                      index <
                      activeStep;

                    return (
                      <Box
                        key={
                          step.number
                        }
                        className={
                          isActive
                            ? "sidebar-step active"
                            : isComplete
                            ? "sidebar-step complete"
                            : "sidebar-step"
                        }
                        onClick={() => {
                          if (
                            index <=
                            activeStep
                          ) {
                            setActiveStep(
                              index
                            );

                            setReviewMode(
                              false
                            );
                          }
                        }}
                      >

                        <Box className="step-icon">

                          {isComplete ? (
                            <CheckRoundedIcon />
                          ) : (
                            <Icon />
                          )}

                        </Box>

                        <Box className="step-copy">

                          <Typography className="step-number">
                            {
                              step.number
                            }
                          </Typography>

                          <Typography className="step-title">
                            {step.short}
                          </Typography>

                          <Typography className="step-description">
                            {
                              step.description
                            }
                          </Typography>

                        </Box>

                      </Box>
                    );
                  }
                )}

              </Box>

              <Box className="sidebar-note">
                <Typography>
                  Your information is used to
                  prepare your consultation and
                  final Welcome Kit document.
                </Typography>
              </Box>

            </Box>

            {/* FORM */}

            <Box className="form-main">

              {!reviewMode ? (
                <Box className="form-card">

                  <Box className="form-header">

                    <Box>

                      <Typography className="form-kicker">
                        SECTION{" "}
                        {
                          steps[
                            activeStep
                          ].number
                        }
                      </Typography>

                      <Typography className="form-title">
                        {
                          steps[
                            activeStep
                          ].title
                        }
                      </Typography>

                      <Typography className="form-subtitle">
                        {
                          steps[
                            activeStep
                          ].description
                        }
                      </Typography>

                    </Box>

                    <Typography className="form-step-number">
                      {
                        steps[
                          activeStep
                        ].number
                      }
                    </Typography>

                  </Box>

                  <Box className="form-body">

                    {/* STEP 1 */}

                    {activeStep ===
                      0 && (
                      <Box className="fields-grid">

                        <Field
                          label="Full Name *"
                          value={
                            form.fullName
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "fullName",
                              value
                            )
                          }
                          placeholder="Your full name"
                        />

                        <Field
                          label="Email Address *"
                          value={
                            form.email
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "email",
                              value
                            )
                          }
                          placeholder="you@example.com"
                          type="email"
                        />

                        <Field
                          label="Phone / WhatsApp *"
                          value={
                            form.phone
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "phone",
                              value
                            )
                          }
                          placeholder="+91 XXXXX XXXXX"
                        />

                        <Field
                          label="City / Location *"
                          value={
                            form.city
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "city",
                              value
                            )
                          }
                          placeholder="Where is your project located?"
                        />

                      </Box>
                    )}

                    {/* STEP 2 */}

                    {activeStep ===
                      1 && (
                      <Box className="fields-grid">

                        <SelectField
                          label="Property Type"
                          value={
                            form.propertyType
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "propertyType",
                              value
                            )
                          }
                          options={[
                            "Apartment",
                            "Villa",
                            "Bungalow",
                            "Independent House",
                            "Commercial",
                            "Office",
                            "Other",
                          ]}
                        />

                        <Field
                          label="Total Area (sq.ft.)"
                          value={
                            form.totalArea
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "totalArea",
                              value
                            )
                          }
                          placeholder="Approximate area"
                        />

                        <Field
                          label="Configuration"
                          value={
                            form.configuration
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "configuration",
                              value
                            )
                          }
                          placeholder="e.g. 3 BHK, 4 BHK"
                        />

                        <SelectField
                          label="Property Status"
                          value={
                            form.propertyStatus
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "propertyStatus",
                              value
                            )
                          }
                          options={[
                            "Under Construction",
                            "Ready to Move",
                            "Currently Occupied",
                            "Renovation",
                            "Other",
                          ]}
                        />

                        <Field
                          label="Possession / Start Date"
                          value={
                            form.possessionDate
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "possessionDate",
                              value
                            )
                          }
                          type="date"
                        />

                      </Box>
                    )}

                    {/* STEP 3 */}

                    {activeStep ===
                      2 && (
                      <Box>

                        <Typography className="form-question">
                          Which interior style
                          describes what you like?
                        </Typography>

                        <Typography className="form-help">
                          Select all styles that
                          match your preference.
                        </Typography>

                        <Box className="style-grid">

                          {designStyles.map(
                            (
                              style
                            ) => {
                              const selected =
                                form.designStyles.includes(
                                  style
                                );

                              return (
                                <Box
                                  key={
                                    style
                                  }
                                  className={
                                    selected
                                      ? "style-option selected"
                                      : "style-option"
                                  }
                                  onClick={() =>
                                    toggleStyle(
                                      style
                                    )
                                  }
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          selected
                                        }
                                        size="small"
                                        sx={{
                                          color:
                                            "#b5bbc4",
                                          "&.Mui-checked":
                                            {
                                              color:
                                                "#a27b36",
                                            },
                                        }}
                                      />
                                    }
                                    label={
                                      style
                                    }
                                  />
                                </Box>
                              );
                            }
                          )}

                        </Box>

                        <Divider
                          sx={{
                            my: 4,
                          }}
                        />

                        <Box className="fields-grid">

                          <Field
                            label="Tell us about your dream space"
                            value={
                              form.dreamSpace
                            }
                            onChange={(
                              value
                            ) =>
                              updateField(
                                "dreamSpace",
                                value
                              )
                            }
                            placeholder="What would make your home feel perfect?"
                            multiline
                          />

                          <Box className="nested-fields">

                            <Field
                              label="Colours you love"
                              value={
                                form.coloursLove
                              }
                              onChange={(
                                value
                              ) =>
                                updateField(
                                  "coloursLove",
                                  value
                                )
                              }
                              placeholder="Describe your preferred palette"
                            />

                            <Field
                              label="Colours to avoid"
                              value={
                                form.coloursAvoid
                              }
                              onChange={(
                                value
                              ) =>
                                updateField(
                                  "coloursAvoid",
                                  value
                                )
                              }
                              placeholder="Any colours you dislike?"
                            />

                          </Box>

                        </Box>

                      </Box>
                    )}

                    {/* STEP 4 */}

                    {activeStep ===
                      3 && (
                      <Box className="room-fields">

                        <Field
                          label="Living Room"
                          value={
                            form.livingRoom
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "livingRoom",
                              value
                            )
                          }
                          placeholder="Furniture, storage, TV unit, seating, special requirements..."
                          multiline
                        />

                        <Field
                          label="Master Bedroom"
                          value={
                            form.masterBedroom
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "masterBedroom",
                              value
                            )
                          }
                          placeholder="Bed, wardrobe, storage, dressing, lighting..."
                          multiline
                        />

                        <Field
                          label="Kitchen"
                          value={
                            form.kitchen
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "kitchen",
                              value
                            )
                          }
                          placeholder="Layout, storage, appliances, finishes..."
                          multiline
                        />

                        <Field
                          label="Dining Area"
                          value={
                            form.diningArea
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "diningArea",
                              value
                            )
                          }
                          placeholder="Dining requirements and special features..."
                          multiline
                        />

                        <Field
                          label="Other Rooms"
                          value={
                            form.otherRooms
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "otherRooms",
                              value
                            )
                          }
                          placeholder="Any other room or special requirement..."
                          multiline
                        />

                      </Box>
                    )}

                    {/* STEP 5 */}

                    {activeStep ===
                      4 && (
                      <Box className="fields-grid">

                        <Field
                          label="Total Budget (₹)"
                          value={
                            form.totalBudget
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "totalBudget",
                              value
                            )
                          }
                          placeholder="Approximate project budget"
                        />

                        <Field
                          label="Design Fee Budget"
                          value={
                            form.designFeeBudget
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "designFeeBudget",
                              value
                            )
                          }
                          placeholder="Approximate design fee budget"
                        />

                        <Field
                          label="Preferred Start Date"
                          value={
                            form.preferredStartDate
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "preferredStartDate",
                              value
                            )
                          }
                          type="date"
                        />

                        <Field
                          label="Target Completion Date"
                          value={
                            form.targetCompletionDate
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "targetCompletionDate",
                              value
                            )
                          }
                          type="date"
                        />

                      </Box>
                    )}

                    {/* STEP 6 */}

                    {activeStep ===
                      5 && (
                      <Box className="fields-grid">

                        <Field
                          label="Number of Family Members"
                          value={
                            form.familyMembers
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "familyMembers",
                              value
                            )
                          }
                          placeholder="Number of people"
                        />

                        <Field
                          label="Elderly Family Members"
                          value={
                            form.elderlyMembers
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "elderlyMembers",
                              value
                            )
                          }
                          placeholder="Any elderly members?"
                        />

                        <Field
                          label="Children / Ages"
                          value={
                            form.children
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "children",
                              value
                            )
                          }
                          placeholder="Children and ages"
                        />

                        <Field
                          label="Pets"
                          value={
                            form.pets
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "pets",
                              value
                            )
                          }
                          placeholder="Any pets?"
                        />

                        <Field
                          label="Work From Home Requirements"
                          value={
                            form.workFromHome
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "workFromHome",
                              value
                            )
                          }
                          placeholder="Describe workspace requirements"
                          multiline
                        />

                        <Field
                          label="Anything Else"
                          value={
                            form.anythingElse
                          }
                          onChange={(
                            value
                          ) =>
                            updateField(
                              "anythingElse",
                              value
                            )
                          }
                          placeholder="Anything else we should know?"
                          multiline
                        />

                      </Box>
                    )}

                  </Box>

                  <Box className="form-footer">

                    <Button
                      disabled={
                        activeStep === 0
                      }
                      startIcon={
                        <ArrowBackRoundedIcon />
                      }
                      onClick={
                        previousStep
                      }
                      className="previous-button"
                    >
                      Previous
                    </Button>

                    <Box className="footer-actions">

                      <Button
                        startIcon={
                          <SaveOutlinedIcon />
                        }
                        onClick={
                          saveDraft
                        }
                        className="secondary-action"
                      >
                        Save Draft
                      </Button>

                      <Button
                        variant="contained"
                        endIcon={
                          activeStep ===
                          steps.length -
                            1 ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <ArrowForwardRoundedIcon />
                          )
                        }
                        onClick={
                          nextStep
                        }
                        disabled={
                          !canContinue
                        }
                        className="primary-action"
                      >
                        {activeStep ===
                        steps.length -
                          1
                          ? "Review Form"
                          : "Continue"}
                      </Button>

                    </Box>

                  </Box>

                </Box>
              ) : (
                /* ==================================================
                   REVIEW
                ================================================== */

                <Box className="review-card">

                  <Box className="review-hero">

                    <Box>

                      <Typography className="review-kicker">
                        FINAL REVIEW
                      </Typography>

                      <Typography className="review-title">
                        {safe(
                          form.fullName
                        )}
                      </Typography>

                      <Typography className="review-description">
                        Your NetworkTen Welcome
                        Kit is ready to be generated.
                      </Typography>

                    </Box>

                    <Box className="review-check">
                      <CheckRoundedIcon />
                    </Box>

                  </Box>

                  <Box className="review-body">

                    {[
                      {
                        title:
                          "Personal Details",
                        fields: [
                          [
                            "Full Name",
                            form.fullName,
                          ],
                          [
                            "Email",
                            form.email,
                          ],
                          [
                            "Phone / WhatsApp",
                            form.phone,
                          ],
                          [
                            "City / Location",
                            form.city,
                          ],
                        ],
                      },
                      {
                        title:
                          "Your Property",
                        fields: [
                          [
                            "Property Type",
                            form.propertyType,
                          ],
                          [
                            "Total Area",
                            form.totalArea,
                          ],
                          [
                            "Configuration",
                            form.configuration,
                          ],
                          [
                            "Property Status",
                            form.propertyStatus,
                          ],
                          [
                            "Possession / Start Date",
                            form.possessionDate,
                          ],
                        ],
                      },
                      {
                        title:
                          "Design Style Preferences",
                        fields: [
                          [
                            "Selected Styles",
                            form.designStyles.join(
                              ", "
                            ),
                          ],
                          [
                            "Dream Space",
                            form.dreamSpace,
                          ],
                          [
                            "Colours You Love",
                            form.coloursLove,
                          ],
                          [
                            "Colours to Avoid",
                            form.coloursAvoid,
                          ],
                        ],
                      },
                      {
                        title:
                          "Room Requirements",
                        fields: [
                          [
                            "Living Room",
                            form.livingRoom,
                          ],
                          [
                            "Master Bedroom",
                            form.masterBedroom,
                          ],
                          [
                            "Kitchen",
                            form.kitchen,
                          ],
                          [
                            "Dining Area",
                            form.diningArea,
                          ],
                          [
                            "Other Rooms",
                            form.otherRooms,
                          ],
                        ],
                      },
                      {
                        title:
                          "Budget & Timeline",
                        fields: [
                          [
                            "Total Budget",
                            form.totalBudget,
                          ],
                          [
                            "Design Fee Budget",
                            form.designFeeBudget,
                          ],
                          [
                            "Preferred Start Date",
                            form.preferredStartDate,
                          ],
                          [
                            "Target Completion Date",
                            form.targetCompletionDate,
                          ],
                        ],
                      },
                      {
                        title:
                          "Lifestyle Information",
                        fields: [
                          [
                            "Family Members",
                            form.familyMembers,
                          ],
                          [
                            "Elderly Members",
                            form.elderlyMembers,
                          ],
                          [
                            "Children / Ages",
                            form.children,
                          ],
                          [
                            "Pets",
                            form.pets,
                          ],
                          [
                            "Work From Home",
                            form.workFromHome,
                          ],
                          [
                            "Anything Else",
                            form.anythingElse,
                          ],
                        ],
                      },
                    ].map(
                      (section) => (
                        <Box
                          className="review-section"
                          key={
                            section.title
                          }
                        >
                          <Typography className="review-section-title">
                            {
                              section.title
                            }
                          </Typography>

                          <Box className="review-grid">

                            {section.fields.map(
                              ([
                                label,
                                value,
                              ]) => (
                                <Box
                                  className="review-field"
                                  key={
                                    label
                                  }
                                >
                                  <Typography>
                                    {label}
                                  </Typography>

                                  <span>
                                    {safe(
                                      value
                                    )}
                                  </span>
                                </Box>
                              )
                            )}

                          </Box>

                        </Box>
                      )
                    )}

                    <Alert
                      severity="success"
                      className="review-alert"
                    >
                      All information will be
                      included inside the final
                      13-page NetworkTen Welcome
                      Kit PDF.
                    </Alert>

                    {pdfReady && (
                      <Alert
                        severity="success"
                        className="review-alert"
                      >
                        PDF generated successfully.
                        Your download should have
                        started automatically.
                      </Alert>
                    )}

                    <Box className="review-actions">

                      <Button
                        startIcon={
                          <ArrowBackRoundedIcon />
                        }
                        onClick={
                          previousStep
                        }
                        className="previous-button"
                      >
                        Edit Form
                      </Button>

                      <Box className="footer-actions">

                        <Button
                          startIcon={
                            <SaveOutlinedIcon />
                          }
                          onClick={
                            saveDraft
                          }
                          className="secondary-action"
                        >
                          Save Form
                        </Button>

                        <Button
                          variant="contained"
                          startIcon={
                            generatingPdf ? (
                              <AutoAwesomeRoundedIcon />
                            ) : (
                              <DownloadRoundedIcon />
                            )
                          }
                          onClick={
                            generatePdf
                          }
                          disabled={
                            generatingPdf
                          }
                          className="primary-action pdf-button"
                        >
                          {generatingPdf
                            ? "Creating PDF..."
                            : "Generate & Download PDF"}
                        </Button>

                      </Box>

                    </Box>

                  </Box>

                </Box>
              )}

            </Box>

          </Box>
        )}

      </Box>

      {/* ========================================================
          SCROLL TOP
      ======================================================== */}

      <IconButton
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="scroll-top"
      >
        <ArrowUpwardRoundedIcon />
      </IconButton>

      {/* ========================================================
          ACTUAL 13-PAGE PDF DOCUMENT
      ======================================================== */}

      <Box
        ref={pdfRef}
        className="pdf-render-container"
      >

        {/* PAGE 1 */}

        <PdfPage
          pageNumber="01"
          title="CLIENT WELCOME KIT"
          logo={BRAND.logo}
        >
          <Box className="pdf-cover">

            <Box className="pdf-cover-left">

              <img
                src={BRAND.logo}
                className="pdf-logo-large"
                crossOrigin="anonymous"
              />

              <Typography className="pdf-cover-brand">
                NETWORKTEN
              </Typography>

              <Typography className="pdf-cover-subtitle">
                INTERIOR DESIGN
                <br />
                PROJECT SOLUTIONS
              </Typography>

              <Box className="pdf-cover-line" />

              <Typography className="pdf-cover-tagline">
                DESIGNING SPACES.
                <br />
                CREATING EXPERIENCES.
              </Typography>

            </Box>

            <Box className="pdf-cover-divider" />

            <Box className="pdf-cover-right">

              <Typography className="pdf-cover-small">
                WELCOME TO
              </Typography>

              <Typography className="pdf-cover-heading">
                NetworkTen
              </Typography>

              <Typography className="pdf-cover-text">
                We create thoughtful spaces
                through creativity,
                precision and attention
                to every detail.
              </Typography>

              <Box className="pdf-client-box">

                <Typography>
                  PREPARED FOR
                </Typography>

                <strong>
                  {safe(form.fullName)}
                </strong>

                <span>
                  {safe(form.city)}
                </span>

              </Box>

            </Box>

          </Box>
        </PdfPage>

        {/* PAGE 2 */}

        <PdfPage
          pageNumber="02"
          title="WELCOME"
          logo={BRAND.logo}
        >
          <PdfHeading>
            Welcome
          </PdfHeading>

          <PdfText>
            Dear {safe(form.fullName)},
          </PdfText>

          <PdfText>
            Welcome to NetworkTen, and thank
            you for placing your trust in us.
          </PdfText>

          <PdfText>
            Every project begins with a
            conversation, a vision and a
            dream. Whether you're building a
            new home, renovating an existing
            space, or creating a commercial
            environment, we're here to be part
            of your journey.
          </PdfText>

          <PdfText>
            At NetworkTen, we believe
            exceptional design is about more
            than aesthetics. It is about
            creating spaces that reflect your
            personality, support your lifestyle
            and work beautifully every day.
          </PdfText>

          <PdfText>
            This Welcome Kit has been carefully
            prepared to give you a clear
            understanding of our process,
            services and the information we
            need before your consultation.
          </PdfText>

          <PdfQuote>
            "Every great space begins with a
            great conversation."
          </PdfQuote>
        </PdfPage>

        {/* PAGE 3 */}

        <PdfPage
          pageNumber="03"
          title="ABOUT NETWORKTEN"
          logo={BRAND.logo}
        >
          <PdfHeading>
            About NetworkTen
          </PdfHeading>

          <PdfText>
            NetworkTen is a design and project
            solutions company focused on
            creating functional, timeless and
            thoughtfully designed environments.
          </PdfText>

          <PdfHeadingSmall>
            Our Expertise
          </PdfHeadingSmall>

          <PdfList
            items={[
              "Residential Architecture & Interior Design",
              "Residential and Commercial Interiors",
              "Office, Retail Spaces & Hospitality Projects",
              "AI-Assisted 3D Visualisation & Photorealistic Rendering",
              "Working Drawings, Material Selection & Vendor Coordination",
              "BOQ Preparation, Material Selection & Vendor Coordination",
              "End-to-End Project Management & Site Supervision",
            ]}
          />

          <PdfHeadingSmall>
            Our Design Philosophy
          </PdfHeadingSmall>

          <PdfText>
            We believe every successful project
            begins with understanding people,
            not just spaces.
          </PdfText>

          <PdfText>
            Before we start designing, we take
            time to understand how you live,
            work and interact with your
            environment. We listen carefully to
            your goals, preferences, challenges,
            budget and future plans.
          </PdfText>

          <PdfText>
            We don't design simply to follow
            trends. We believe in creating
            spaces that deliver value, comfort
            and meaning for years to come.
          </PdfText>

          <PdfQuote>
            Design with purpose. Execute with
            precision. Deliver with excellence.
          </PdfQuote>
        </PdfPage>

        {/* PAGE 4 */}

        <PdfPage
          pageNumber="04"
          title="OUR 6-STAGE DESIGN PROCESS"
          logo={BRAND.logo}
        >
          <PdfHeading>
            Our 6-Stage Design Process
          </PdfHeading>

          <PdfText>
            Every successful project follows a
            clear roadmap. Our structured
            process ensures transparency,
            efficient communication and a
            seamless journey from the initial
            consultation to final handover.
          </PdfText>

          <PdfProcess
            number="1"
            title="DISCOVERY — Consultation, Site Analysis & Project Brief"
            items={[
              "Initial consultation to understand your lifestyle, needs and design preferences",
              "Site visit or virtual walkthrough",
              "Budget discussion and project timeline planning",
              "Defining the project scope and deliverables",
            ]}
          />

          <PdfProcess
            number="2"
            title="CONCEPT DEVELOPMENT — Mood Boards & 3D Concept"
            items={[
              "Presenting the design direction: style, palette and materials",
              "Mood boards and visual references for your approval",
              "Initial 3D renders to bring the concept to life",
              "One round of concept revision based on your feedback",
            ]}
          />

          <PdfProcess
            number="3"
            title="DESIGN DEVELOPMENT — Technical Drawings & Documentation"
            items={[
              "Working drawings, floor plans and elevation drawings",
              "BOQ with quantities and material specifications",
              "Electrical, lighting and ceiling layouts",
              "Detailed specifications for all finishes and fixtures",
            ]}
          />

          <PdfProcess
            number="4"
            title="PRE-EXECUTION PLANNING — Procurement & Project Scheduling"
            items={[
              "Vendor shortlist and quote comparisons",
              "Material selection and procurement support",
              "Creating a week-by-week execution timeline",
              "Construction kick-off planning",
            ]}
          />
        </PdfPage>

        {/* PAGE 5 */}

        <PdfPage
          pageNumber="05"
          title="OUR 6-STAGE DESIGN PROCESS"
          logo={BRAND.logo}
        >
          <PdfProcess
            number="5"
            title="EXECUTION & SITE MANAGEMENT — Construction Supervision & Quality Control"
            items={[
              "Regular site visits and progress checks",
              "Quality assurance and workmanship checks",
              "Design clarification and on-site problem solving",
              "Progress reports with photos and updates",
            ]}
          />

          <PdfProcess
            number="6"
            title="COMPLETION & HANDOVER — Styling, Inspection & Project Delivery"
            items={[
              "Accessorising and styling the completed space",
              "Final quality walkthrough with client",
              "Professional project photography",
              "Handover with all warranties and vendor contacts",
            ]}
          />

          <PdfQuote>
            A clear process creates clarity,
            confidence and better design
            outcomes.
          </PdfQuote>
        </PdfPage>

        {/* PAGE 6 */}

        <PdfPage
          pageNumber="06"
          title="LEVEL OF SERVICE"
          logo={BRAND.logo}
        >
          <PdfHeading>
            Service Packages
          </PdfHeading>

          <PdfText>
            At NetworkTen, every project is
            unique. Our pricing is transparent,
            flexible and based on the project
            scope, complexity and level of
            involvement required.
          </PdfText>

          <PdfPackage
            number="01"
            title="DESIGN"
            price="₹150 – ₹250 / sq ft"
            items={[
              "Design concept and mood boards",
              "2D floor plan and space planning",
              "Material and colour palette selection",
              "BOQ and vendor recommendations",
              "No site visits or execution management",
              "Ideal for clients who only require design documentation",
            ]}
          />

          <PdfPackage
            number="02"
            title="DESIGN PLUS"
            price="₹300 – ₹400 / sq ft"
            items={[
              "Includes everything in Package 01",
              "3D renders — 3–5 views per room",
              "Detailed working drawings",
              "1 revision round on 3D visuals",
              "Vendor coordination support",
              "Perfect for clients who want to visualise before execution",
            ]}
          />

          <PdfPackage
            number="03"
            title="DESIGN & SUPERVISION"
            price="₹400 – ₹550 / sq ft"
            items={[
              "Includes everything in Packages 01 & 02",
              "Unlimited 3D revisions until approval",
              "Up to 3 site visits during execution",
              "Progress reports and photo updates",
              "Quality check at key milestones",
              "Best suited for clients who require design guidance with professional site support",
            ]}
          />
        </PdfPage>

        {/* PAGE 7 */}

        <PdfPage
          pageNumber="07"
          title="LEVEL OF SERVICE"
          logo={BRAND.logo}
        >
          <PdfPackage
            number="04"
            title="TURNKEY SOLUTION"
            price="₹600 – ₹1,200 / sq ft"
            items={[
              "Full end-to-end design and execution management",
              "All drawings, 3D, BOQ and specifications included",
              "Procurement and vendor management",
              "Weekly site visits and quality control",
              "Styling, photography and final handover",
              "Post-completion support",
              "Complete end-to-end solution with minimal hassle",
            ]}
          />

          <Box className="pdf-client-summary">

            <Typography>
              PROJECT INFORMATION
            </Typography>

            <Box>
              <strong>
                {safe(form.fullName)}
              </strong>

              <span>
                {safe(
                  form.configuration
                )}{" "}
                ·{" "}
                {safe(
                  form.totalArea
                )}{" "}
                sq.ft.
              </span>

              <span>
                {safe(
                  form.propertyType
                )}{" "}
                ·{" "}
                {safe(form.city)}
              </span>
            </Box>

          </Box>

          <PdfQuote>
            Your project. Your lifestyle.
            Our expertise.
          </PdfQuote>
        </PdfPage>

        {/* PAGE 8 */}

        <PdfPage
          pageNumber="08"
          title="PRE-CONSULTATION FORM"
          logo={BRAND.logo}
        >
          <PdfFormTitle />

          <PdfFormSection
            title="SECTION 1 — Personal Details"
            fields={[
              [
                "Full Name",
                form.fullName,
              ],
              [
                "Email Address",
                form.email,
              ],
              [
                "Phone / WhatsApp",
                form.phone,
              ],
              [
                "City / Location",
                form.city,
              ],
            ]}
          />

          <PdfFormSection
            title="SECTION 2 — Your Property"
            fields={[
              [
                "Property Type",
                form.propertyType,
              ],
              [
                "Total Area (sq.ft.)",
                form.totalArea,
              ],
              [
                "Configuration",
                form.configuration,
              ],
              [
                "Property Status",
                form.propertyStatus,
              ],
              [
                "Possession / Start Date",
                form.possessionDate,
              ],
            ]}
          />
        </PdfPage>

        {/* PAGE 9 */}

        <PdfPage
          pageNumber="09"
          title="PRE-CONSULTATION FORM"
          logo={BRAND.logo}
        >
          <PdfFormSection
            title="SECTION 3 — Design Style Preferences"
            fields={[
              [
                "Selected Styles",
                form.designStyles.join(
                  ", "
                ),
              ],
              [
                "Dream Space",
                form.dreamSpace,
              ],
              [
                "Colours You Love",
                form.coloursLove,
              ],
              [
                "Colours to Avoid",
                form.coloursAvoid,
              ],
            ]}
          />

          <PdfStyleChecklist
            selected={
              form.designStyles
            }
          />
        </PdfPage>

        {/* PAGE 10 */}

        <PdfPage
          pageNumber="10"
          title="PRE-CONSULTATION FORM"
          logo={BRAND.logo}
        >
          <PdfFormSection
            title="SECTION 4 — Room-by-Room Requirements"
            fields={[
              [
                "Living Room",
                form.livingRoom,
              ],
              [
                "Master Bedroom",
                form.masterBedroom,
              ],
              [
                "Kitchen",
                form.kitchen,
              ],
              [
                "Dining Area",
                form.diningArea,
              ],
              [
                "Other Rooms",
                form.otherRooms,
              ],
            ]}
          />

          <PdfFormSection
            title="SECTION 5 — Budget & Timeline"
            fields={[
              [
                "Total Budget (₹)",
                form.totalBudget,
              ],
              [
                "Design Fee Budget",
                form.designFeeBudget,
              ],
              [
                "Preferred Start Date",
                form.preferredStartDate,
              ],
              [
                "Target Completion Date",
                form.targetCompletionDate,
              ],
            ]}
          />
        </PdfPage>

        {/* PAGE 11 */}

        <PdfPage
          pageNumber="11"
          title="PRE-CONSULTATION FORM"
          logo={BRAND.logo}
        >
          <PdfFormSection
            title="SECTION 6 — Lifestyle Information"
            fields={[
              [
                "Number of Family Members",
                form.familyMembers,
              ],
              [
                "Elderly Family Members",
                form.elderlyMembers,
              ],
              [
                "Children / Ages",
                form.children,
              ],
              [
                "Pets",
                form.pets,
              ],
              [
                "Work From Home Requirements",
                form.workFromHome,
              ],
              [
                "Anything Else",
                form.anythingElse,
              ],
            ]}
          />

          <Box className="pdf-thank-box">
            <Typography>
              THANK YOU
            </Typography>

            <span>
              Thank you for sharing your
              project with NetworkTen.
              These details will help us
              understand your requirements
              before the consultation.
            </span>
          </Box>
        </PdfPage>

        {/* PAGE 12 */}

        <PdfPage
          pageNumber="12"
          title="FREQUENTLY ASKED QUESTIONS"
          logo={BRAND.logo}
        >
          <PdfHeading>
            Frequently Asked Questions
          </PdfHeading>

          {faqs.map(
            (
              faq,
              index
            ) => (
              <Box
                className="pdf-faq"
                key={
                  faq.question
                }
              >
                <Typography>
                  {index + 1}.{" "}
                  {
                    faq.question
                  }
                </Typography>

                <span>
                  {
                    faq.answer
                  }
                </span>
              </Box>
            )
          )}
        </PdfPage>

        {/* PAGE 13 */}

        <PdfPage
          pageNumber="13"
          title="STAY IN TOUCH"
          logo={BRAND.logo}
        >
          <PdfHeading>
            Stay in Touch.
          </PdfHeading>

          <Box className="pdf-social-list">

            <PdfSocial
              icon={<InstagramIcon />}
              label="Instagram"
              value="@networkten"
            />

            <PdfSocial
              icon={<EmailOutlinedIcon />}
              label="Email"
              value={
                BRAND.email
              }
            />

            <PdfSocial
              icon={<WhatsAppIcon />}
              label="Phone / WhatsApp"
              value={
                BRAND.phone
              }
            />

            <PdfSocial
              icon={
                <LanguageRoundedIcon />
              }
              label="Website"
              value={
                BRAND.website
              }
            />

          </Box>

          <Box className="pdf-final-message">

            <Typography>
              Thank you for choosing NetworkTen.
            </Typography>

            <span>
              We can't wait to build something
              beautiful with you.
            </span>

          </Box>

          <Box className="pdf-final-brand">

            <img
              src={BRAND.logo}
              className="pdf-logo-small"
              crossOrigin="anonymous"
            />

            <Typography>
              NETWORKTEN
            </Typography>

            <span>
              Interior Design & Project Solutions
            </span>

          </Box>

        </PdfPage>

      </Box>

      {/* ========================================================
          SCROLL BUTTON
      ======================================================== */}

      <IconButton
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="scroll-top"
      >
        <ArrowUpwardRoundedIcon />
      </IconButton>

      {/* ========================================================
          PREMIUM UI CSS
      ======================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f6f5f2;
        }

        .welcome-page {
          min-height: 100vh;
          color: #172033;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(191, 157, 87, 0.08),
              transparent 25%
            ),
            linear-gradient(
              180deg,
              #f8f7f4 0%,
              #f5f5f2 50%,
              #ffffff 100%
            );
        }

        /* =====================================================
           TOPBAR
        ===================================================== */

        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(
            255,
            255,
            255,
            0.94
          );
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e7e4dd;
        }

        .topbar-inner {
          max-width: 1480px;
          height: 76px;
          margin: auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-area {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .back-button {
          width: 40px !important;
          height: 40px !important;
          border: 1px solid #e1ded7 !important;
          border-radius: 10px !important;
          color: #172033 !important;
        }

        .eyebrow {
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.8px !important;
          color: #a27b36 !important;
        }

        .page-title {
          margin-top: 2px !important;
          font-size: 17px !important;
          font-weight: 800 !important;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .saved-chip {
          background: #edf7ef !important;
          color: #2d7042 !important;
          font-weight: 700 !important;
          font-size: 11px !important;
        }

        .save-button {
          text-transform: none !important;
          color: #172033 !important;
          font-weight: 750 !important;
          border: 1px solid #dfdcd5 !important;
          border-radius: 9px !important;
          padding: 8px 15px !important;
        }

        /* =====================================================
           CONTAINER
        ===================================================== */

        .page-container {
          max-width: 1480px;
          margin: auto;
          padding: 34px 32px 80px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hero {
          position: relative;
          overflow: hidden;
          min-height: 390px;
          border-radius: 24px;
          background:
            linear-gradient(
              125deg,
              #111827 0%,
              #1a2538 52%,
              #2b3d5b 100%
            );
          box-shadow:
            0 30px 75px
              rgba(
                20,
                28,
                43,
                0.18
              );
        }

        .hero::after {
          content: "";
          position: absolute;
          width: 470px;
          height: 470px;
          right: -160px;
          top: -190px;
          border-radius: 50%;
          border: 1px solid
            rgba(
              216,
              189,
              121,
              0.18
            );
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.35;
          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          min-height: 390px;
          padding: 52px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d8bd79;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .hero-badge svg {
          font-size: 17px;
        }

        .hero-title {
          margin-top: 25px !important;
          font-family:
            Georgia,
            "Times New Roman",
            serif !important;
          font-size:
            clamp(
              45px,
              6vw,
              78px
            ) !important;
          line-height: 0.96 !important;
          letter-spacing: -2.5px !important;
          font-weight: 500 !important;
          color: #ffffff !important;
        }

        .hero-title span {
          color: #d8bd79;
          font-style: italic;
        }

        .hero-description {
          max-width: 620px;
          margin-top: 22px !important;
          color: rgba(
            255,
            255,
            255,
            0.63
          ) !important;
          font-size: 14px !important;
          line-height: 1.8 !important;
        }

        .hero-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .hero-small-label {
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.5px !important;
          color: #d8bd79 !important;
        }

        .hero-small-text {
          margin-top: 4px !important;
          font-size: 12px !important;
          color: rgba(
            255,
            255,
            255,
            0.5
          ) !important;
        }

        .hero-number {
          text-align: right;
        }

        .hero-number p {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 50px;
          line-height: 1;
          color: white;
        }

        .hero-number span {
          font-size: 9px;
          letter-spacing: 2px;
          color: #d8bd79;
        }

        /* =====================================================
           TABS
        ===================================================== */

        .main-tabs {
          margin: 26px 0;
          display: inline-flex;
          padding: 5px;
          border-radius: 12px;
          background: #ebe9e4;
          gap: 3px;
        }

        .main-tab {
          min-width: 150px !important;
          padding: 10px 20px !important;
          border-radius: 9px !important;
          text-transform: none !important;
          color: #7a8190 !important;
          font-size: 13px !important;
          font-weight: 750 !important;
        }

        .main-tab.active {
          color: #172033 !important;
          background: #ffffff !important;
          box-shadow:
            0 3px 12px
              rgba(
                23,
                32,
                51,
                0.08
              );
        }

        /* =====================================================
           OVERVIEW
        ===================================================== */

        .overview-content {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .intro-grid {
          display: grid;
          grid-template-columns:
            1.35fr
            0.65fr;
          gap: 20px;
        }

        .editorial-card,
        .included-card,
        .premium-section {
          border: 1px solid #e5e2dc;
          border-radius: 20px;
          background: rgba(
            255,
            255,
            255,
            0.88
          );
          box-shadow:
            0 10px 35px
              rgba(
                24,
                31,
                45,
                0.035
              );
        }

        .editorial-card {
          padding: 42px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #faf9f6
            );
        }

        .section-kicker {
          font-size: 10px !important;
          font-weight: 800 !important;
          letter-spacing: 1.9px !important;
          color: #a27b36 !important;
        }

        .editorial-title {
          max-width: 650px;
          margin-top: 13px !important;
          font-family:
            Georgia,
            "Times New Roman",
            serif !important;
          font-size: 34px !important;
          line-height: 1.15 !important;
          color: #172033 !important;
        }

        .editorial-text {
          max-width: 660px;
          margin-top: 18px !important;
          color: #707887 !important;
          font-size: 14px !important;
          line-height: 1.85 !important;
        }

        .gold-button {
          margin-top: 28px !important;
          padding: 12px 20px !important;
          border-radius: 10px !important;
          background: #172033 !important;
          color: #ffffff !important;
          text-transform: none !important;
          font-weight: 750 !important;
          box-shadow: none !important;
        }

        .included-card {
          padding: 34px;
          background: #f5f0e5;
          border-color: #e7dbc0;
        }

        .included-item {
          min-height: 47px;
          display: grid;
          grid-template-columns:
            30px
            1fr
            18px;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid
            rgba(
              151,
              117,
              51,
              0.14
            );
        }

        .included-item:last-child {
          border-bottom: 0;
        }

        .included-item > span {
          font-size: 10px;
          color: #aa843f;
          font-weight: 800;
        }

        .included-item p {
          font-size: 12.5px !important;
          color: #4d5664 !important;
        }

        .included-item svg {
          font-size: 15px;
          color: #a27b36;
        }

        .premium-section {
          padding: 38px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 24px;
        }

        .section-title {
          margin-top: 8px !important;
          font-family:
            Georgia,
            "Times New Roman",
            serif !important;
          font-size: 30px !important;
          font-weight: 500 !important;
          color: #172033 !important;
        }

        .section-count {
          font-size: 10px !important;
          font-weight: 800 !important;
          letter-spacing: 1.4px !important;
          color: #a27b36 !important;
        }

        .process-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 12px;
        }

        .process-card {
          position: relative;
          overflow: hidden;
          min-height: 175px;
          padding: 24px;
          border: 1px solid #ebe8e2;
          border-radius: 14px;
          background: #fafaf8;
          transition: 0.25s ease;
        }

        .process-card:hover {
          transform: translateY(-3px);
          background: #ffffff;
          border-color: #d8bd79;
          box-shadow:
            0 12px 30px
              rgba(
                28,
                35,
                50,
                0.06
              );
        }

        .process-number {
          font-family: Georgia, serif !important;
          font-size: 30px !important;
          color: #c5a866 !important;
        }

        .process-title {
          margin-top: 14px !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          color: #172033 !important;
        }

        .process-description {
          margin-top: 7px !important;
          font-size: 12px !important;
          line-height: 1.6 !important;
          color: #7a8391 !important;
        }

        .process-line {
          width: 35px;
          height: 2px;
          margin-top: 18px;
          background: #c5a866;
        }

        .packages-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 12px;
        }

        .package-card {
          min-height: 210px;
          padding: 26px;
          border-radius: 14px;
          border: 1px solid #e9e5dc;
          background: #fbfaf7;
          transition: 0.25s ease;
        }

        .package-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 15px 35px
              rgba(
                24,
                31,
                45,
                0.07
              );
        }

        .package-number {
          font-family: Georgia, serif !important;
          font-size: 36px !important;
          color: #c7a966 !important;
        }

        .package-title {
          margin-top: 14px !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          color: #172033 !important;
        }

        .package-price {
          margin-top: 7px !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          color: #a27b36 !important;
        }

        .package-divider {
          margin: 18px 0 !important;
          border-color: #e8e4db !important;
        }

        .package-description {
          font-size: 12px !important;
          line-height: 1.6 !important;
          color: #7a8391 !important;
        }

        .faq-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 10px;
        }

        .faq-card {
          padding: 25px;
          border: 1px solid #ebe8e2;
          border-radius: 13px;
          background: #fafaf8;
        }

        .faq-number {
          font-family: Georgia, serif !important;
          color: #c5a866 !important;
          font-size: 18px !important;
        }

        .faq-question {
          margin-top: 10px !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          color: #172033 !important;
        }

        .faq-answer {
          margin-top: 8px !important;
          font-size: 12px !important;
          line-height: 1.7 !important;
          color: #77808e !important;
        }

        /* =====================================================
           CONTACT CARD
        ===================================================== */

        .contact-card {
          display: grid;
          grid-template-columns:
            1.1fr
            0.9fr;
          gap: 30px;
          padding: 40px;
          border-radius: 20px;
          background: #172033;
          color: #ffffff;
        }

        .contact-title {
          max-width: 500px;
          margin-top: 12px !important;
          font-family: Georgia, serif !important;
          font-size: 32px !important;
          line-height: 1.15 !important;
          color: #ffffff !important;
        }

        .contact-description {
          max-width: 520px;
          margin-top: 12px !important;
          font-size: 13px !important;
          line-height: 1.7 !important;
          color: rgba(
            255,
            255,
            255,
            0.55
          ) !important;
        }

        .contact-links {
          display: grid;
          gap: 9px;
          align-content: center;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
          border-radius: 9px;
          background: rgba(
            255,
            255,
            255,
            0.035
          );
          color: rgba(
            255,
            255,
            255,
            0.68
          );
          font-size: 11px;
        }

        .contact-link svg {
          font-size: 18px;
          color: #d8bd79;
        }

        /* =====================================================
           FORM
        ===================================================== */

        .form-layout {
          display: grid;
          grid-template-columns:
            310px
            minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }

        .form-sidebar {
          position: sticky;
          top: 98px;
          overflow: hidden;
          border-radius: 20px;
          background: #172033;
          box-shadow:
            0 18px 45px
              rgba(
                23,
                32,
                51,
                0.12
              );
        }

        .sidebar-header {
          padding: 28px 25px 20px;
        }

        .sidebar-kicker {
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.6px !important;
          color: #d8bd79 !important;
        }

        .sidebar-title {
          margin-top: 8px !important;
          font-family: Georgia, serif !important;
          font-size: 28px !important;
          color: #ffffff !important;
        }

        .sidebar-description {
          margin-top: 9px !important;
          font-size: 12px !important;
          line-height: 1.65 !important;
          color: rgba(
            255,
            255,
            255,
            0.54
          ) !important;
        }

        .progress-container {
          padding: 0 25px 22px;
        }

        .progress-track {
          width: 100%;
          height: 5px;
          border-radius: 10px;
          background: rgba(
            255,
            255,
            255,
            0.09
          );
          overflow: hidden;
        }

        .progress-value {
          height: 100%;
          background: #d8bd79;
          border-radius: 10px;
          transition: width 0.35s ease;
        }

        .progress-text {
          margin-top: 9px !important;
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.2px !important;
          color: rgba(
            255,
            255,
            255,
            0.45
          ) !important;
        }

        .step-list {
          padding: 0 12px 15px;
        }

        .sidebar-step {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .sidebar-step:hover {
          background: rgba(
            255,
            255,
            255,
            0.045
          );
        }

        .sidebar-step.active {
          background: rgba(
            216,
            189,
            121,
            0.11
          );
        }

        .step-icon {
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.13
            );
          border-radius: 9px;
          color: rgba(
            255,
            255,
            255,
            0.42
          );
        }

        .step-icon svg {
          font-size: 17px;
        }

        .sidebar-step.active
          .step-icon,
        .sidebar-step.complete
          .step-icon {
          border-color: #d8bd79;
          background: #d8bd79;
          color: #172033;
        }

        .step-copy {
          min-width: 0;
        }

        .step-number {
          font-size: 8px !important;
          font-weight: 800 !important;
          letter-spacing: 1px !important;
          color: #d8bd79 !important;
        }

        .step-title {
          margin-top: 2px !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
        }

        .step-description {
          margin-top: 3px !important;
          font-size: 9.5px !important;
          color: rgba(
            255,
            255,
            255,
            0.42
          ) !important;
          line-height: 1.4 !important;
        }

        .sidebar-note {
          margin: 5px 12px 12px;
          padding: 15px;
          border-radius: 11px;
          background: rgba(
            255,
            255,
            255,
            0.045
          );
        }

        .sidebar-note p {
          font-size: 9.5px !important;
          line-height: 1.6 !important;
          color: rgba(
            255,
            255,
            255,
            0.4
          ) !important;
        }

        .form-card,
        .review-card {
          overflow: hidden;
          border: 1px solid #e3e0d9;
          border-radius: 20px;
          background: #ffffff;
          box-shadow:
            0 12px 40px
              rgba(
                24,
                31,
                45,
                0.055
              );
        }

        .form-header {
          position: relative;
          overflow: hidden;
          padding: 36px 40px;
          background:
            linear-gradient(
              135deg,
              #faf9f6,
              #f3f0e8
            );
          border-bottom: 1px solid #e9e5dc;
        }

        .form-kicker {
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.7px !important;
          color: #a27b36 !important;
        }

        .form-title {
          margin-top: 7px !important;
          font-family: Georgia, serif !important;
          font-size: 31px !important;
          font-weight: 500 !important;
        }

        .form-subtitle {
          margin-top: 6px !important;
          font-size: 12px !important;
          color: #818997 !important;
        }

        .form-step-number {
          position: absolute;
          right: 35px;
          bottom: 20px;
          font-family: Georgia, serif !important;
          font-size: 64px !important;
          color: rgba(
            162,
            123,
            54,
            0.13
          ) !important;
        }

        .form-body {
          padding: 38px 40px;
        }

        .fields-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 25px;
        }

        .field-label {
          margin-bottom: 8px !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          color: #394150 !important;
        }

        .premium-field
          .MuiOutlinedInput-root,
        .premium-select {
          border-radius: 10px !important;
          background: #fcfcfb !important;
          font-size: 13px !important;
        }

        .premium-field
          .MuiOutlinedInput-notchedOutline,
        .premium-select
          .MuiOutlinedInput-notchedOutline {
          border-color: #dedbd4 !important;
        }

        .premium-field
          .MuiOutlinedInput-root:hover
          .MuiOutlinedInput-notchedOutline,
        .premium-select:hover
          .MuiOutlinedInput-notchedOutline {
          border-color: #b7a77e !important;
        }

        .premium-field
          .Mui-focused
          .MuiOutlinedInput-notchedOutline {
          border-color: #a27b36 !important;
        }

        .premium-field input,
        .premium-field textarea {
          padding: 12px 13px !important;
        }

        .form-question {
          font-size: 14px !important;
          font-weight: 800 !important;
        }

        .form-help {
          margin-top: 5px !important;
          font-size: 11px !important;
          color: #9299a5 !important;
        }

        .style-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 8px;
          margin-top: 18px;
        }

        .style-option {
          border: 1px solid #e3e0da;
          border-radius: 10px;
          background: #ffffff;
          cursor: pointer;
        }

        .style-option.selected {
          border-color: #a27b36;
          background: #f7f2e7;
        }

        .style-option
          .MuiFormControlLabel-root {
          width: 100%;
          margin: 0 !important;
          padding-right: 7px;
        }

        .style-option
          .MuiFormControlLabel-label {
          font-size: 11.5px;
          color: #47505d;
        }

        .nested-fields,
        .room-fields {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-footer {
          min-height: 78px;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid #eeeae3;
          background: #fcfcfb;
        }

        .footer-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .previous-button,
        .secondary-action {
          text-transform: none !important;
          font-weight: 750 !important;
          color: #6e7683 !important;
        }

        .secondary-action {
          border: 1px solid #dedbd4 !important;
          border-radius: 9px !important;
          padding: 9px 14px !important;
        }

        .primary-action {
          border-radius: 9px !important;
          padding: 10px 20px !important;
          background: #172033 !important;
          color: #ffffff !important;
          text-transform: none !important;
          font-weight: 750 !important;
          box-shadow: none !important;
        }

        .primary-action:hover {
          background: #283650 !important;
        }

        /* =====================================================
           REVIEW
        ===================================================== */

        .review-hero {
          padding: 38px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #172033;
        }

        .review-kicker {
          font-size: 9px !important;
          font-weight: 800 !important;
          letter-spacing: 1.7px !important;
          color: #d8bd79 !important;
        }

        .review-title {
          margin-top: 7px !important;
          font-family: Georgia, serif !important;
          font-size: 32px !important;
          color: #ffffff !important;
        }

        .review-description {
          margin-top: 6px !important;
          font-size: 12px !important;
          color: rgba(
            255,
            255,
            255,
            0.5
          ) !important;
        }

        .review-check {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #d8bd79;
          color: #172033;
        }

        .review-body {
          padding: 40px;
        }

        .review-section {
          margin-bottom: 35px;
        }

        .review-section-title {
          margin-bottom: 14px !important;
          font-size: 15px !important;
          font-weight: 800 !important;
        }

        .review-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 8px;
        }

        .review-field {
          padding: 14px;
          border-radius: 9px;
          background: #f8f8f6;
        }

        .review-field p {
          font-size: 9px !important;
          font-weight: 800 !important;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #9aa1ab !important;
        }

        .review-field span {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          line-height: 1.6;
          color: #3e4652;
          white-space: pre-wrap;
        }

        .review-alert {
          border-radius: 10px !important;
          margin-bottom: 12px !important;
        }

        .review-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 25px;
        }

        /* =====================================================
           SCROLL
        ===================================================== */

        .scroll-top {
          position: fixed !important;
          right: 24px;
          bottom: 24px;
          width: 42px !important;
          height: 42px !important;
          background: #172033 !important;
          color: #ffffff !important;
          box-shadow:
            0 8px 25px
              rgba(
                23,
                32,
                51,
                0.18
              );
          z-index: 30;
        }

        /* =====================================================
           PDF RENDER CONTAINER
        ===================================================== */

        .pdf-render-container {
          position: fixed;
          left: -10000px;
          top: 0;
          width: 794px;
          z-index: -100;
        }

        .pdf-page {
          width: 794px;
          height: 1123px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          padding: 58px 62px 60px;
          background: #ffffff;
          color: #172033;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .pdf-page::before {
          content: "";
          position: absolute;
          top: 25px;
          left: 32px;
          right: 32px;
          height: 1px;
          background: #d8bd79;
        }

        .pdf-page::after {
          content: "";
          position: absolute;
          bottom: 25px;
          left: 32px;
          right: 32px;
          height: 1px;
          background: #e7e1d2;
        }

        .pdf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
          margin-bottom: 25px;
        }

        .pdf-header-brand {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .pdf-header-logo {
          width: 75px;
          max-height: 28px;
          object-fit: contain;
        }

        .pdf-header-title {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #a27b36;
        }

        .pdf-header-page {
          font-size: 8px;
          color: #9299a5;
          letter-spacing: 1px;
        }

        .pdf-content {
          position: relative;
          z-index: 2;
        }

        .pdf-cover {
          height: 100%;
          display: grid;
          grid-template-columns:
            1fr
            1px
            1fr;
          align-items: center;
          gap: 42px;
        }

        .pdf-cover-left {
          text-align: center;
        }

        .pdf-logo-large {
          width: 210px;
          max-height: 120px;
          object-fit: contain;
          margin-bottom: 20px;
        }

        .pdf-cover-brand {
          font-family: Georgia, serif;
          font-size: 28px !important;
          letter-spacing: 5px;
          font-weight: 700;
          color: #172033;
        }

        .pdf-cover-subtitle {
          margin-top: 8px !important;
          font-size: 8px !important;
          letter-spacing: 2.2px;
          color: #a27b36;
          line-height: 1.8;
        }

        .pdf-cover-line {
          width: 70px;
          height: 2px;
          margin: 24px auto;
          background: #d8bd79;
        }

        .pdf-cover-tagline {
          font-family: Georgia, serif;
          font-size: 11px !important;
          line-height: 1.7;
          letter-spacing: 1.2px;
          color: #606978;
        }

        .pdf-cover-divider {
          width: 1px;
          height: 330px;
          background: #d8bd79;
        }

        .pdf-cover-right {
          padding-left: 5px;
        }

        .pdf-cover-small {
          font-size: 8px !important;
          font-weight: 800;
          letter-spacing: 2px;
          color: #a27b36;
        }

        .pdf-cover-heading {
          margin-top: 10px !important;
          font-family: Georgia, serif;
          font-size: 34px !important;
          color: #172033;
        }

        .pdf-cover-text {
          margin-top: 18px !important;
          max-width: 270px;
          font-size: 11px !important;
          line-height: 1.8;
          color: #697180;
        }

        .pdf-client-box {
          margin-top: 38px;
          padding: 18px;
          border: 1px solid #e8e1d1;
          background: #faf7ef;
        }

        .pdf-client-box p {
          font-size: 8px !important;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #a27b36;
        }

        .pdf-client-box strong {
          display: block;
          margin-top: 7px;
          font-family: Georgia, serif;
          font-size: 18px;
          color: #172033;
        }

        .pdf-client-box span {
          display: block;
          margin-top: 5px;
          font-size: 10px;
          color: #7d8591;
        }

        .pdf-heading {
          margin: 8px 0 25px !important;
          font-family: Georgia, serif;
          font-size: 27px !important;
          font-weight: 600;
          color: #172033;
        }

        .pdf-heading-small {
          margin: 28px 0 10px !important;
          font-family: Georgia, serif;
          font-size: 14px !important;
          font-weight: 700;
          color: #172033;
          text-decoration: underline;
          text-decoration-color: #d8bd79;
          text-underline-offset: 4px;
        }

        .pdf-text {
          margin-bottom: 14px !important;
          font-size: 10.2px !important;
          line-height: 1.75 !important;
          color: #4e5765 !important;
        }

        .pdf-list {
          margin: 8px 0 22px;
          padding-left: 0;
        }

        .pdf-list-item {
          margin-bottom: 7px;
          font-size: 9.8px;
          color: #4e5765;
          line-height: 1.45;
        }

        .pdf-list-item::before {
          content: "→";
          margin-right: 8px;
          color: #a27b36;
          font-weight: 700;
        }

        .pdf-quote {
          position: absolute;
          left: 62px;
          right: 62px;
          bottom: 48px;
          text-align: center;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 10px;
          color: #777f8b;
        }

        .pdf-process {
          margin: 12px 0;
          display: grid;
          grid-template-columns: 54px 1fr;
          background: #fff7df;
          border: 1px solid #f0dfad;
        }

        .pdf-process-number {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
          font-size: 28px;
          color: #a27b36;
          background: #fdf1c9;
        }

        .pdf-process-content {
          padding: 12px 15px;
        }

        .pdf-process-title {
          font-family: Georgia, serif;
          font-size: 10.5px;
          font-weight: 700;
          color: #9b762e;
          line-height: 1.35;
        }

        .pdf-process-item {
          margin-top: 5px;
          font-size: 8.2px;
          color: #596271;
          line-height: 1.35;
        }

        .pdf-process-item::before {
          content: "→";
          margin-right: 6px;
          color: #b38b3b;
        }

        .pdf-package {
          margin: 14px 0;
          padding: 15px 17px;
          background: #fff6d9;
          border: 1px solid #f0dfad;
        }

        .pdf-package-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .pdf-package-number {
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #b28a37;
        }

        .pdf-package-title {
          font-family: Georgia, serif;
          font-size: 13px;
          font-weight: 700;
          color: #172033;
        }

        .pdf-package-price {
          margin-left: auto;
          font-size: 9px;
          font-weight: 800;
          color: #a27b36;
        }

        .pdf-package-item {
          margin-top: 6px;
          font-size: 8.5px;
          line-height: 1.4;
          color: #596271;
        }

        .pdf-package-item::before {
          content: "✓";
          margin-right: 7px;
          color: #a27b36;
          font-weight: 800;
        }

        .pdf-client-summary {
          margin-top: 45px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          gap: 30px;
          background: #faf7ef;
          border: 1px solid #eadfca;
        }

        .pdf-client-summary > p {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #a27b36;
        }

        .pdf-client-summary strong {
          display: block;
          font-family: Georgia, serif;
          font-size: 17px;
          color: #172033;
        }

        .pdf-client-summary span {
          display: block;
          margin-top: 4px;
          font-size: 8.5px;
          color: #727b89;
        }

        .pdf-form-title {
          padding: 20px;
          margin-bottom: 20px;
          background: #fff4d1;
          border-left: 5px solid #b28a37;
        }

        .pdf-form-title-main {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 700;
          color: #a61d18;
          letter-spacing: 1px;
        }

        .pdf-form-title-sub {
          margin-top: 2px;
          font-family: Georgia, serif;
          font-size: 19px;
          font-weight: 700;
          color: #172033;
          letter-spacing: 1px;
        }

        .pdf-form-title-caption {
          margin-top: 6px;
          font-size: 8px;
          color: #8b929d;
        }

        .pdf-form-section {
          margin-bottom: 22px;
        }

        .pdf-form-section-title {
          padding-bottom: 6px;
          margin-bottom: 9px;
          border-bottom: 1px solid #d8bd79;
          font-family: Georgia, serif;
          font-size: 12px;
          font-weight: 700;
          color: #172033;
        }

        .pdf-form-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          min-height: 28px;
          border-bottom: 1px solid #eeeeec;
        }

        .pdf-form-label {
          padding: 7px 9px;
          background: #f1f1ef;
          font-size: 8px;
          font-weight: 700;
          color: #4d5561;
        }

        .pdf-form-value {
          padding: 7px 10px;
          font-size: 8.5px;
          line-height: 1.5;
          color: #424b58;
          white-space: pre-wrap;
        }

        .pdf-style-list {
          margin: 15px 0 25px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
        }

        .pdf-style-item {
          font-size: 8.5px;
          color: #515a68;
        }

        .pdf-style-box {
          display: inline-flex;
          width: 10px;
          height: 10px;
          margin-right: 6px;
          border: 1px solid #aab0b8;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .pdf-style-item.selected
          .pdf-style-box {
          background: #172033;
          border-color: #172033;
        }

        .pdf-style-item.selected
          .pdf-style-box::after {
          content: "✓";
          color: #ffffff;
          font-size: 7px;
        }

        .pdf-thank-box {
          margin-top: 35px;
          padding: 20px;
          text-align: center;
          background: #faf7ef;
          border: 1px solid #eadfca;
        }

        .pdf-thank-box p {
          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #a27b36;
        }

        .pdf-thank-box span {
          display: block;
          margin-top: 7px;
          font-size: 9px;
          line-height: 1.6;
          color: #68717e;
        }

        .pdf-faq {
          margin: 0 0 20px;
        }

        .pdf-faq p {
          font-family: Georgia, serif;
          font-size: 11px;
          font-weight: 700;
          color: #a61d18;
        }

        .pdf-faq span {
          display: block;
          margin-top: 6px;
          font-size: 9px;
          line-height: 1.6;
          color: #555e6b;
        }

        .pdf-social-list {
          margin-top: 35px;
        }

        .pdf-social {
          display: grid;
          grid-template-columns:
            150px
            1fr;
          align-items: center;
          min-height: 42px;
          border-bottom: 1px solid #eeeeec;
        }

        .pdf-social-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: #f1f1ef;
          font-size: 9px;
          font-weight: 700;
          color: #4f5865;
        }

        .pdf-social-label svg {
          font-size: 15px;
          color: #a27b36;
        }

        .pdf-social-value {
          padding-left: 14px;
          font-size: 9px;
          color: #536071;
        }

        .pdf-final-message {
          margin-top: 60px;
          padding-top: 18px;
          border-top: 1px solid #d8bd79;
          text-align: center;
        }

        .pdf-final-message p {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 14px;
          color: #5d6673;
        }

        .pdf-final-message span {
          display: block;
          margin-top: 7px;
          font-size: 9px;
          color: #858c97;
        }

        .pdf-final-brand {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 75px;
          text-align: center;
        }

        .pdf-logo-small {
          width: 100px;
          max-height: 50px;
          object-fit: contain;
        }

        .pdf-final-brand p {
          margin-top: 6px;
          font-family: Georgia, serif;
          font-size: 17px;
          letter-spacing: 3px;
          color: #172033;
        }

        .pdf-final-brand span {
          display: block;
          margin-top: 4px;
          font-size: 7px;
          letter-spacing: 1.5px;
          color: #a27b36;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .form-layout {
            grid-template-columns:
              270px
              minmax(0, 1fr);
          }

          .process-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .packages-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .style-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

        @media (max-width: 850px) {

          .topbar-inner {
            padding: 0 20px;
          }

          .page-container {
            padding: 25px 20px 60px;
          }

          .intro-grid,
          .contact-card {
            grid-template-columns: 1fr;
          }

          .form-layout {
            grid-template-columns: 1fr;
          }

          .form-sidebar {
            position: relative;
            top: auto;
          }

          .step-list {
            display: grid;
            grid-template-columns:
              repeat(2, 1fr);
          }

          .sidebar-note {
            display: none;
          }

        }

        @media (max-width: 600px) {

          .topbar-inner {
            height: 68px;
            padding: 0 14px;
          }

          .page-title {
            font-size: 15px !important;
          }

          .top-actions
            .save-button {
            min-width: 40px;
            font-size: 0;
          }

          .page-container {
            padding: 18px 12px 45px;
          }

          .hero {
            border-radius: 17px;
          }

          .hero-content {
            min-height: 390px;
            padding: 30px 24px;
          }

          .hero-title {
            font-size: 48px !important;
          }

          .hero-number {
            display: none;
          }

          .main-tabs {
            width: 100%;
          }

          .main-tab {
            flex: 1;
            min-width: 0 !important;
            font-size: 11px !important;
          }

          .editorial-card,
          .included-card,
          .premium-section {
            padding: 25px;
            border-radius: 15px;
          }

          .editorial-title {
            font-size: 27px !important;
          }

          .section-title {
            font-size: 25px !important;
          }

          .process-grid,
          .packages-grid,
          .faq-grid,
          .fields-grid,
          .review-grid {
            grid-template-columns: 1fr;
          }

          .style-grid {
            grid-template-columns: 1fr;
          }

          .form-header,
          .form-body,
          .review-body {
            padding: 25px;
          }

          .form-step-number {
            display: none;
          }

          .form-footer {
            padding: 15px 20px;
          }

          .secondary-action {
            display: none !important;
          }

          .footer-actions {
            flex: 1;
          }

          .primary-action {
            flex: 1;
          }

          .review-hero {
            padding: 28px 25px;
          }

          .review-check {
            display: none;
          }

          .review-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .footer-actions {
            width: 100%;
          }

        }

        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

          body {
            background: white !important;
          }

          .topbar,
          .main-tabs,
          .form-sidebar,
          .scroll-top,
          .pdf-render-container,
          button {
            display: none !important;
          }

        }

      `}</style>

    </Box>
  );
}

/* ================================================================
   PDF PAGE COMPONENT
================================================================ */

function PdfPage({
  children,
  pageNumber,
  title,
  logo,
}: {
  children: React.ReactNode;
  pageNumber: string;
  title: string;
  logo: string;
}) {
  return (
    <Box className="pdf-page">

      <Box className="pdf-header">

        <Box className="pdf-header-brand">

          <img
            src={logo}
            className="pdf-header-logo"
            crossOrigin="anonymous"
          />

          <Typography className="pdf-header-title">
            {title}
          </Typography>

        </Box>

        <Typography className="pdf-header-page">
          NETWORKTEN · {pageNumber}
        </Typography>

      </Box>

      <Box className="pdf-content">
        {children}
      </Box>

      <Typography className="pdf-footer">
        NETWORKTEN · INTERIOR DESIGN & PROJECT SOLUTIONS
      </Typography>

    </Box>
  );
}

/* ================================================================
   PDF HEADING
================================================================ */

function PdfHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography className="pdf-heading">
      {children}
    </Typography>
  );
}

/* ================================================================
   PDF SMALL HEADING
================================================================ */

function PdfHeadingSmall({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography className="pdf-heading-small">
      {children}
    </Typography>
  );
}

/* ================================================================
   PDF TEXT
================================================================ */

function PdfText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography className="pdf-text">
      {children}
    </Typography>
  );
}

/* ================================================================
   PDF LIST
================================================================ */

function PdfList({
  items,
}: {
  items: string[];
}) {
  return (
    <Box className="pdf-list">
      {items.map((item) => (
        <Box
          className="pdf-list-item"
          key={item}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

/* ================================================================
   PDF QUOTE
================================================================ */

function PdfQuote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography className="pdf-quote">
      {children}
    </Typography>
  );
}

/* ================================================================
   PDF PROCESS
================================================================ */

function PdfProcess({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <Box className="pdf-process">

      <Box className="pdf-process-number">
        {number}
      </Box>

      <Box className="pdf-process-content">

        <Typography className="pdf-process-title">
          {title}
        </Typography>

        {items.map((item) => (
          <Box
            className="pdf-process-item"
            key={item}
          >
            {item}
          </Box>
        ))}

      </Box>

    </Box>
  );
}

/* ================================================================
   PDF PACKAGE
================================================================ */

function PdfPackage({
  number,
  title,
  price,
  items,
}: {
  number: string;
  title: string;
  price: string;
  items: string[];
}) {
  return (
    <Box className="pdf-package">

      <Box className="pdf-package-header">

        <span className="pdf-package-number">
          Package {number}
        </span>

        <span className="pdf-package-title">
          — {title}
        </span>

        <span className="pdf-package-price">
          {price}
        </span>

      </Box>

      {items.map((item) => (
        <Box
          className="pdf-package-item"
          key={item}
        >
          {item}
        </Box>
      ))}

    </Box>
  );
}

/* ================================================================
   PDF FORM TITLE
================================================================ */

function PdfFormTitle() {
  return (
    <Box className="pdf-form-title">

      <Typography className="pdf-form-title-main">
        FORM
      </Typography>

      <Typography className="pdf-form-title-sub">
        PRE-CONSULTATION
      </Typography>

      <Typography className="pdf-form-title-caption">
        Please complete this form before
        your first consultation.
      </Typography>

    </Box>
  );
}

/* ================================================================
   PDF FORM SECTION
================================================================ */

function PdfFormSection({
  title,
  fields,
}: {
  title: string;
  fields: [string, string][];
}) {
  return (
    <Box className="pdf-form-section">

      <Typography className="pdf-form-section-title">
        {title}
      </Typography>

      {fields.map(
        ([label, value]) => (
          <Box
            className="pdf-form-row"
            key={label}
          >
            <Box className="pdf-form-label">
              {label}
            </Box>

            <Box className="pdf-form-value">
              {safe(value)}
            </Box>
          </Box>
        )
      )}

    </Box>
  );
}

/* ================================================================
   PDF STYLE CHECKLIST
================================================================ */

function PdfStyleChecklist({
  selected,
}: {
  selected: string[];
}) {
  return (
    <Box className="pdf-style-list">

      {designStyles.map(
        (style) => {
          const isSelected =
            selected.includes(
              style
            );

          return (
            <Box
              key={style}
              className={
                isSelected
                  ? "pdf-style-item selected"
                  : "pdf-style-item"
              }
            >

              <span className="pdf-style-box" />

              {style}

            </Box>
          );
        }
      )}

    </Box>
  );
}

/* ================================================================
   PDF SOCIAL
================================================================ */

function PdfSocial({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box className="pdf-social">

      <Box className="pdf-social-label">
        {icon}
        {label}
      </Box>

      <Box className="pdf-social-value">
        {value}
      </Box>

    </Box>
  );
}