"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What industries do you provide solutions for?",
    answer:
      "We serve banking & retail, education, healthcare & pharma, hospitality, corporate offices, and residential clients including homes, villas and farmhouses — with solutions tailored to each sector's specific requirements.",
  },
  {
    question: "How long does a typical installation take?",
    answer:
      "Timelines depend on project scope. A single-office setup can be completed in a few days, while multi-branch or campus-wide deployments typically take 2–6 weeks. We provide a clear timeline after the initial site assessment.",
  },
  {
    question: "Do you offer post-installation support and maintenance?",
    answer:
      "Yes. Every project includes post-installation support, and we offer Annual Maintenance Contracts (AMC) with 24/7 technical support to keep your systems running reliably long-term.",
  },
  {
    question: "Can you work with our existing infrastructure?",
    answer:
      "In most cases, yes. Our engineers assess your current setup during the site survey and design solutions that integrate with existing cabling, networking or security systems wherever possible, minimizing unnecessary replacement costs.",
  },
  {
    question: "Do you provide free site assessments?",
    answer:
      "Yes, we offer a free, no-obligation site assessment to understand your requirements and provide an accurate solution plan and quote before any commitment.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently service enterprise, commercial and residential clients across the region. Reach out to our team with your location and requirements, and we'll confirm coverage and timelines.",
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        background: "#f6f8fb",
      }}
    >
      <Container maxWidth="md">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(139,197,63,.1)",
              border: "1px solid rgba(139,197,63,.28)",
              borderRadius: "16px",
              px: 1.3,
              py: "4px",
              mb: 1.8,
            }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: "#6fa52e",
              }}
            />
            <Typography
              sx={{
                color: "#5c9128",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#0c1a2e",
              fontWeight: 800,
              fontSize: { xs: 22, md: 30 },
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
              mb: 1,
            }}
          >
            Frequently Asked{" "}
            <Box component="span" sx={{ color: "#6fa52e" }}>
              Questions
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(12,26,46,.6)",
              fontSize: 13,
              maxWidth: 460,
              mx: "auto",
              lineHeight: 1.65,
            }}
          >
            Answers to common questions about our process, timelines and
            support.
          </Typography>
        </Box>

        {/* Accordion list */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
          {faqs.map((item, index) => {
            const panelId = `panel${index}`;
            const isExpanded = expanded === panelId;
            return (
              <Accordion
                key={panelId}
                expanded={isExpanded}
                onChange={handleChange(panelId)}
                disableGutters
                elevation={0}
                sx={{
                  background: "#fff",
                  border: isExpanded
                    ? "1.5px solid #6fa52e"
                    : "1.5px solid rgba(12,26,46,.08)",
                  borderRadius: "14px !important",
                  overflow: "hidden",
                  "&:before": { display: "none" },
                  transition: "border-color .2s",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded ? (
                      <RemoveRoundedIcon
                        sx={{ fontSize: 18, color: "#6fa52e" }}
                      />
                    ) : (
                      <AddRoundedIcon
                        sx={{ fontSize: 18, color: "rgba(12,26,46,.4)" }}
                      />
                    )
                  }
                  sx={{
                    px: 2.5,
                    py: 0.5,
                    minHeight: 56,
                    "& .MuiAccordionSummary-content": {
                      my: 1.2,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#0c1a2e",
                      fontWeight: 700,
                      fontSize: 13.5,
                      pr: 1,
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.2 }}>
                  <Typography
                    sx={{
                      color: "rgba(12,26,46,.6)",
                      fontSize: 12.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}