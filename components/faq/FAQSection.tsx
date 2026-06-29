"use client";

import React from "react";

import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

const faqData = [
  {
    question:
      "What services does NetworkTen provide?",

    answer:
      "NetworkTen delivers enterprise networking infrastructure, CCTV surveillance systems, smart office technologies, video conferencing solutions, Wi-Fi deployment, IT infrastructure support and scalable technology services tailored for businesses and modern organizations.",
  },

  {
    question:
      "Do you provide installation and setup support?",

    answer:
      "Yes. Our technical team provides complete deployment, installation, system configuration and implementation assistance to ensure smooth integration and reliable performance.",
  },

  {
    question:
      "Is warranty support available?",

    answer:
      "Warranty support is available according to manufacturer terms and service policies. Support options vary depending on project requirements and product categories.",
  },

  {
    question:
      "Can I schedule a video consultation?",

    answer:
      "Yes. Customers can request a video consultation directly from our platform for project discussions and personalized guidance.",
  },

  {
    question:
      "How long does delivery take?",

    answer:
      "Delivery generally ranges between 3–7 business days depending on stock availability, project scope and location.",
  },

  {
    question:
      "Do you support enterprise projects?",

    answer:
      "Yes. We provide scalable solutions for organizations, offices, healthcare, educational institutions and commercial environments.",
  },
];

export default function FAQSection() {
  return (
    <Box
      sx={{
        py:{xs:7,md:9},

        position:"relative",

        overflow:"hidden",

        background:
        "linear-gradient(180deg,#ffffff 0%,#f5f9ff 100%)"
      }}
    >

      {/* Premium Glow */}
      <Box
        sx={{
          position:"absolute",
          width:450,
          height:450,
          borderRadius:"50%",
          background:
          "rgba(139,197,63,.08)",
          filter:"blur(120px)",
          top:-200,
          right:-180
        }}
      />

      <Container maxWidth="md">

        {/* HEADER */}

        <Box
          sx={{
            textAlign:"center",
            mb:5
          }}
        >

          <Box
            sx={{
              display:"inline-flex",
              alignItems:"center",
              gap:1,
              px:2,
              py:.8,
              borderRadius:"40px",
              background:
              "rgba(139,197,63,.10)",
              border:
              "1px solid rgba(139,197,63,.15)",
              mb:2
            }}
          >

            <HelpOutlineRoundedIcon
              sx={{
                color:"#8BC53F",
                fontSize:18
              }}
            />

            <Typography
              sx={{
                color:"#8BC53F",
                fontWeight:700,
                fontSize:"11px",
                letterSpacing:"1px",
                textTransform:
                "uppercase"
              }}
            >
              Support Center
            </Typography>

          </Box>

          <Typography
            sx={{
              color:"#08142e",
              fontWeight:900,
              lineHeight:1.05,
              mb:1,
              fontSize:{
                xs:"30px",
                md:"48px"
              }
            }}
          >
            Frequently Asked
            <Box
              component="span"
              sx={{
                color:"#8BC53F",
                ml:1
              }}
            >
              Questions
            </Box>
          </Typography>

          <Typography
            sx={{
              color:"#667085",
              lineHeight:1.9,
              maxWidth:"700px",
              mx:"auto",
              fontSize:{
                xs:"13px",
                md:"14px"
              }
            }}
          >
            Find quick answers regarding our networking,
            surveillance, enterprise solutions, deployment
            process and support services.
          </Typography>

        </Box>

        {/* FEATURED TOP CARD */}

        <Box
          sx={{
            mb:3,

            borderRadius:"28px",

            p:3,

            background:
            "linear-gradient(135deg,#08142e,#102048)",

            color:"#fff",

            boxShadow:
            "0 25px 60px rgba(16,32,72,.20)"
          }}
        >

          <Typography
            sx={{
              color:"#8BC53F",
              fontWeight:700,
              mb:1,
              fontSize:"11px",
              letterSpacing:"1px",
              textTransform:
              "uppercase"
            }}
          >
            Most Asked Question
          </Typography>

          <Typography
            sx={{
              fontWeight:800,
              mb:1,
              fontSize:{
                xs:"18px",
                md:"22px"
              }
            }}
          >
            {faqData[0].question}
          </Typography>

          <Typography
            sx={{
              color:
              "rgba(255,255,255,.75)",
              lineHeight:1.8,
              fontSize:"14px"
            }}
          >
            {faqData[0].answer}
          </Typography>

        </Box>

        {/* REMAINING FAQ */}

        {faqData.slice(1).map(
          (item,index)=>(
            <Accordion
              key={index}

              disableGutters

              elevation={0}

              sx={{

                mb:2,

                borderRadius:
                "20px !important",

                overflow:
                "hidden",

                border:
                "1px solid rgba(8,20,46,.06)",

                background:
                "rgba(255,255,255,.85)",

                backdropFilter:
                "blur(10px)",

                boxShadow:
                "0 15px 40px rgba(0,0,0,.04)",

                "&:before":{
                  display:"none"
                },

                transition:
                ".3s",

                "&:hover":{
                  transform:
                  "translateY(-3px)",

                  boxShadow:
                  "0 20px 50px rgba(0,0,0,.07)"
                }
              }}
            >

              <AccordionSummary
                expandIcon={
                  <ExpandMoreRoundedIcon
                    sx={{
                      color:"#8BC53F"
                    }}
                  />
                }

                sx={{
                  px:3,
                  minHeight:"70px"
                }}
              >

                <Typography
                  sx={{
                    fontWeight:700,
                    color:"#08142e",
                    fontSize:"15px"
                  }}
                >
                  {item.question}
                </Typography>

              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px:3,
                  pb:3,
                  pt:0
                }}
              >

                <Typography
                  sx={{
                    color:"#667085",
                    lineHeight:1.9,
                    fontSize:"14px"
                  }}
                >
                  {item.answer}
                </Typography>

              </AccordionDetails>

            </Accordion>
          )
        )}

      </Container>
    </Box>
  );
}