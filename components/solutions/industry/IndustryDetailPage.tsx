"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, Typography, Button, Container, Collapse } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import CloudOffRoundedIcon from "@mui/icons-material/CloudOffRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { IndustryData } from "@/data/industries/banking-retail";

const NAVY = "#102048";
const NAVY_DEEP = "#08142e";
const GREEN = "#8BC53F";
const GREEN_DEEP = "#74ab35";
const GRAY = "#667085";

const productIconMap: Record<IndustryData["products"][number]["icon"], React.ReactNode> = {
  camera: <VideocamRoundedIcon />,
  wifi: <WifiRoundedIcon />,
  biometric: <FingerprintRoundedIcon />,
  fire: <LocalFireDepartmentRoundedIcon />,
  booster: <SignalCellularAltRoundedIcon />,
  gps: <GpsFixedRoundedIcon />,
  pos: <PointOfSaleRoundedIcon />,
  solar: <WbSunnyRoundedIcon />,
  lock: <LockRoundedIcon />,
  audio: <CampaignRoundedIcon />,
  epabx: <DialpadRoundedIcon />,
};

const challengeIconMap: Record<IndustryData["challenges"][number]["icon"], React.ReactNode> = {
  vault: <ShieldRoundedIcon />,
  people: <GroupsRoundedIcon />,
  compliance: <GavelRoundedIcon />,
  downtime: <CloudOffRoundedIcon />,
  visibility: <HubRoundedIcon />,
};

interface Props {
  data: IndustryData;
}

export default function IndustryDetailPage({ data }: Props) {
  return (
    <Box component="main">
      <Hero data={data} />
      <Products data={data} />
      <Stats data={data} />
      <Challenges data={data} />
      <Process data={data} />
      <Testimonial data={data} />
      <FAQ data={data} />
      <CTA data={data} />
    </Box>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */
function Hero({ data }: Props) {
  return (
    <Box sx={{ background: "linear-gradient(to bottom, #ffffff, #f6faff)", pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="xl">
        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.4, mb: { xs: 3, md: 4 } }}>
          {[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions" },
          ].map((c) => (
            <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <Link href={c.href} style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "12.5px", fontWeight: 600, color: "#9aa0af", "&:hover": { color: NAVY } }}>
                  {c.label}
                </Typography>
              </Link>
              <NavigateNextRoundedIcon sx={{ fontSize: 15, color: "#c2c7d1" }} />
            </Box>
          ))}
          <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: NAVY }}>{data.title}</Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Text */}
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1.8,
                py: 0.6,
                borderRadius: "40px",
                background: "rgba(139,197,63,0.10)",
                border: "1px solid rgba(139,197,63,0.18)",
                mb: 2,
              }}
            >
              <Typography sx={{ color: GREEN, fontWeight: 700, fontSize: "10px", letterSpacing: "1.3px", textTransform: "uppercase" }}>
                {data.eyebrow}
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#08142e",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.8px",
                fontSize: { xs: "30px", md: "44px" },
                mb: 1.6,
              }}
            >
              {data.title}
            </Typography>

            <Typography
              sx={{
                color: NAVY,
                fontWeight: 700,
                fontSize: { xs: "15px", md: "17px" },
                lineHeight: 1.5,
                mb: 1.6,
              }}
            >
              {data.tagline}
            </Typography>

            <Typography sx={{ color: GRAY, fontSize: "14px", lineHeight: 1.8, mb: 3.5, maxWidth: 520 }}>
              {data.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 17 }} />}
                  sx={{
                    background: GREEN,
                    borderRadius: "40px",
                    px: 3.2,
                    py: 1.3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "14px",
                    boxShadow: "0 10px 24px rgba(139,197,63,0.22)",
                    "&:hover": { background: GREEN_DEEP },
                  }}
                >
                  Request a Site Visit
                </Button>
              </Link>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "40px",
                    px: 3.2,
                    py: 1.3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "14px",
                    color: NAVY,
                    borderColor: "#dfe3ea",
                    "&:hover": { borderColor: NAVY, background: "#f4f8fd" },
                  }}
                >
                  Browse Products
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Image */}
          <Box
            sx={{
              borderRadius: "28px",
              overflow: "hidden",
              height: { xs: 260, md: 420 },
              boxShadow: "0 24px 60px rgba(16,32,72,0.14)",
            }}
          >
            <Box
              component="img"
              src={data.heroImage}
              alt={data.title}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ── STATS ────────────────────────────────────────────────────────────── */
function Stats({ data }: Props) {
  return (
    <Box sx={{ background: NAVY, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: `repeat(${data.stats.length}, 1fr)` },
            gap: { xs: 3, md: 2 },
          }}
        >
          {data.stats.map((s) => (
            <Box key={s.label} sx={{ textAlign: "center" }}>
              <Typography sx={{ color: GREEN, fontWeight: 900, fontSize: { xs: "22px", md: "30px" }, lineHeight: 1, mb: 0.6 }}>
                {s.value}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: { xs: "11px", md: "12.5px" }, fontWeight: 600 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ── CHALLENGES ───────────────────────────────────────────────────────── */
function Challenges({ data }: Props) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: "#fff" }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="The Problem"
          title="What we're actually solving for"
          description="Security and infrastructure gaps in banking and retail show up in specific places. Here's where we focus."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(5, 1fr)" },
            gap: 2,
          }}
        >
          {data.challenges.map((c) => (
            <Box
              key={c.title}
              sx={{
                p: 2.6,
                borderRadius: "20px",
                border: "1px solid #eef2f7",
                background: "#fafbfc",
                transition: "all 0.25s",
                "&:hover": { borderColor: "rgba(139,197,63,0.4)", background: "#fff", boxShadow: "0 14px 34px rgba(16,32,72,0.08)" },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  background: "rgba(16,32,72,0.06)",
                  color: NAVY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.6,
                  "& svg": { fontSize: 21 },
                }}
              >
                {challengeIconMap[c.icon]}
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: "13.5px", color: "#102048", mb: 0.8, lineHeight: 1.3 }}>
                {c.title}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: GRAY, lineHeight: 1.65 }}>{c.description}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ── PRODUCTS ─────────────────────────────────────────────────────────── */
function Products({ data }: Props) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: "linear-gradient(to bottom, #f6faff, #ffffff)" }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="What's Included"
          title="Built from these systems"
          description="Every branch or store gets its own mix — this is the full toolkit we draw from."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {data.products.map((p) => (
            <Box
              key={p.title}
              sx={{
                p: 2.8,
                borderRadius: "20px",
                background: "#fff",
                border: "1px solid #eef2f7",
                boxShadow: "0 6px 20px rgba(16,32,72,0.05)",
                display: "flex",
                gap: 1.8,
                transition: "transform 0.25s, box-shadow 0.25s",
                "&:hover": { transform: "translateY(-3px)", boxShadow: "0 18px 40px rgba(16,32,72,0.10)" },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: "12px",
                  background: "rgba(139,197,63,0.12)",
                  color: GREEN_DEEP,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& svg": { fontSize: 22 },
                }}
              >
                {productIconMap[p.icon]}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "13.5px", color: "#102048", mb: 0.6 }}>{p.title}</Typography>
                <Typography sx={{ fontSize: "12px", color: GRAY, lineHeight: 1.65 }}>{p.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ── PROCESS ──────────────────────────────────────────────────────────── */
function Process({ data }: Props) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: "#fff" }}>
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow="How It Works"
          title="From site visit to support line"
          description="The same four steps whether it's a single branch or a nationwide rollout."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 2.5,
            position: "relative",
          }}
        >
          {data.process.map((p) => (
            <Box key={p.step} sx={{ position: "relative", pt: 1 }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "34px",
                  color: "rgba(16,32,72,0.08)",
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                {p.step}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "14.5px", color: "#102048", mb: 0.9 }}>{p.title}</Typography>
              <Typography sx={{ fontSize: "12.5px", color: GRAY, lineHeight: 1.7 }}>{p.description}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ── TESTIMONIAL ──────────────────────────────────────────────────────── */
function Testimonial({ data }: Props) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: "#08142e" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <FormatQuoteRoundedIcon sx={{ fontSize: 40, color: GREEN, opacity: 0.6, mb: 2 }} />
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "17px", md: "21px" },
              lineHeight: 1.55,
              mb: 3,
            }}
          >
            {data.testimonial.quote}
          </Typography>
          <Typography sx={{ color: GREEN, fontWeight: 800, fontSize: "13px" }}>{data.testimonial.name}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "12px" }}>{data.testimonial.role}</Typography>
        </Box>
      </Container>
    </Box>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */
function FAQ({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: "#fff" }}>
      <Container maxWidth="md">
        <SectionHeading eyebrow="Questions" title="Common questions" description="" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {data.faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <Box
                key={f.question}
                sx={{
                  border: "1px solid #eef2f7",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: isOpen ? "#fafbfc" : "#fff",
                }}
              >
                <Box
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    px: 2.6,
                    py: 2,
                    cursor: "pointer",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "13.5px", color: "#102048" }}>{f.question}</Typography>
                  <AddRoundedIcon
                    sx={{
                      fontSize: 20,
                      color: GREEN_DEEP,
                      flexShrink: 0,
                      transition: "transform 0.25s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                </Box>
                <Collapse in={isOpen}>
                  <Typography sx={{ px: 2.6, pb: 2.4, fontSize: "12.5px", color: GRAY, lineHeight: 1.75 }}>
                    {f.answer}
                  </Typography>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

/* ── CTA ──────────────────────────────────────────────────────────────── */
function CTA({ data }: Props) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: "linear-gradient(to bottom, #ffffff, #f6faff)" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            borderRadius: "28px",
            background: `linear-gradient(120deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
            px: { xs: 3, md: 7 },
            py: { xs: 5, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "20px", md: "26px" }, mb: 1, lineHeight: 1.25 }}>
              Ready to secure your {data.title.toLowerCase()} locations?
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.68)", fontSize: "13px", maxWidth: 480, lineHeight: 1.65 }}>
              Tell us how many branches or stores you're working with — we'll come back with a plan and a quote.
            </Typography>
          </Box>
          <Link href="/contact" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 17 }} />}
              sx={{
                background: GREEN,
                borderRadius: "40px",
                px: 3.4,
                py: 1.4,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "14px",
                whiteSpace: "nowrap",
                boxShadow: "0 10px 24px rgba(139,197,63,0.28)",
                "&:hover": { background: GREEN_DEEP },
              }}
            >
              Talk to an Expert
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

/* ── SHARED: SECTION HEADING ──────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5.5 } }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 1.8,
          py: 0.6,
          borderRadius: "40px",
          background: "rgba(139,197,63,0.10)",
          border: "1px solid rgba(139,197,63,0.18)",
          mb: 1.6,
        }}
      >
        <Typography sx={{ color: GREEN_DEEP, fontWeight: 700, fontSize: "10px", letterSpacing: "1.3px", textTransform: "uppercase" }}>
          {eyebrow}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "#08142e",
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: "-0.5px",
          fontSize: { xs: "22px", md: "30px" },
          mb: description ? 1.2 : 0,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography sx={{ color: GRAY, maxWidth: 560, mx: "auto", lineHeight: 1.7, fontSize: "13px" }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}