"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
  Button,
  Avatar,
} from "@mui/material";

import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";

import StarRoundedIcon from "@mui/icons-material/StarRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import PartnersSection from "../../components/partners/PartnersSection";

import PillarsSection from "../../components/pillars/PillarsSection";

import InstallationSupportSection from "../../components/install/InstallationSupportSection";


import Image from "next/image";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Rahul Sharma",

    role: "Corporate Client",

    image:
      "https://randomuser.me/api/portraits/men/32.jpg",

    review:
      "NetworkTen transformed our office technology with seamless networking and surveillance solutions. Highly professional support and premium execution.",
  },

  {
    name: "Priya Mehta",

    role: "Hospitality Business",

    image:
      "https://randomuser.me/api/portraits/women/44.jpg",

    review:
      "Excellent automation and security setup. The installation process was smooth and the support experience was exceptional.",
  },

  {
    name: "Aman Verma",

    role: "Retail Owner",

    image:
      "https://randomuser.me/api/portraits/men/65.jpg",

    review:
      "Professional team and outstanding service quality. NetworkTen delivered exactly what our business required.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",

          overflow: "hidden",

          background:
            "linear-gradient(135deg,#08142e 0%,#102048 100%)",

          pt: {
            xs: 5,
            md: 6,
          },

          pb: {
            xs: 4,
            md: 5,
          },
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",

            width: 320,

            height: 320,

            borderRadius: "50%",

            background:
              "rgba(139,197,63,0.12)",

            top: -120,

            right: -120,

            filter: "blur(110px)",
          }}
        />

        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",

              zIndex: 2,

              textAlign: "center",
            }}
          >
            {/* TAG */}
            <Box
              sx={{
                display: "inline-flex",

                alignItems: "center",

                justifyContent:
                  "center",

                px: 2,

                py: 0.7,

                borderRadius: "40px",

                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                backdropFilter:
                  "blur(12px)",

                mb: 1.6,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",

                  fontWeight: 700,

                  letterSpacing: "1.5px",

                  textTransform:
                    "uppercase",

                  fontSize: "10px",
                }}
              >
                About NetworkTen
              </Typography>
            </Box>

            {/* HEADING */}
            <Typography
              sx={{
                color: "#fff",

                fontWeight: 900,

                lineHeight: 1,

                letterSpacing: "-1px",

                mb: 1.5,

                fontSize: {
                  xs: "30px",
                  md: "52px",
                },
              }}
            >
              Smart Business
              <Box
                component="span"
                sx={{
                  color: "#8BC53F",

                  ml: 1,
                }}
              >
                Solutions
              </Box>
            </Typography>

            {/* TEXT */}
            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.70)",

                maxWidth: "720px",

                mx: "auto",

                lineHeight: 1.8,

                fontSize: {
                  xs: "13px",
                  md: "14px",
                },

                mb: 2.5,
              }}
            >
              Premium networking,
              surveillance, automation and
              smart office solutions designed
              for modern businesses and
              commercial environments.
            </Typography>

            {/* BUTTONS */}
            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "center",

                gap: 1.2,

                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(135deg,#8BC53F,#74ab35)",

                    borderRadius: "50px",

                    px: 3.5,

                    py: 1.1,

                    fontWeight: 700,

                    textTransform:
                      "none",

                    fontSize: "13px",

                    boxShadow:
                      "0 12px 24px rgba(139,197,63,0.22)",

                    transition:
                      "0.3s",

                    "&:hover": {
                      background:
                        "#74ab35",

                      transform:
                        "translateY(-2px)",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Link>

              <Link
                href="/solutions"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",

                    px: 3.5,

                    py: 1.1,

                    fontWeight: 700,

                    textTransform:
                      "none",

                    fontSize: "13px",

                    color: "#fff",

                    borderColor:
                      "rgba(255,255,255,0.16)",

                    "&:hover": {
                      borderColor:
                        "#8BC53F",

                      background:
                        "rgba(139,197,63,0.06)",
                    },
                  }}
                >
                  Explore Solutions
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ABOUT SECTION */}
      <Box
        sx={{
          py: {
            xs: 5,
            md: 6,
          },

          background: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },

              gap: {
                xs: 4,
                md: 6,
              },

              alignItems: "center",
            }}
          >
            {/* IMAGE */}
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",

                  borderRadius: "30px",

                  overflow: "hidden",

                  minHeight: {
                    xs: 320,
                    md: 500,
                  },

                  boxShadow:
                    "0 22px 50px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1800&auto=format&fit=crop"
                  alt="NetworkTen"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* FLOAT CARD */}
              <Box
                sx={{
                  position: "absolute",

                  bottom: 24,

                  left: {
                    xs: 18,
                    md: -24,
                  },

                  borderRadius: "24px",

                  p: 2.2,

                  backdropFilter:
                    "blur(18px)",

                  background:
                    "rgba(255,255,255,0.92)",

                  border:
                    "1px solid rgba(255,255,255,0.45)",

                  boxShadow:
                    "0 18px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "#8BC53F",

                    fontWeight: 900,

                    lineHeight: 1,

                    fontSize: {
                      xs: "34px",
                      md: "42px",
                    },
                  }}
                >
                  10+
                </Typography>

                <Typography
                  sx={{
                    color: "#102048",

                    fontWeight: 700,

                    mt: 0.5,

                    fontSize: "14px",
                  }}
                >
                  Years Experience
                </Typography>
              </Box>
            </Box>

            {/* CONTENT */}
            <Box>
              <Typography
                sx={{
                  color: "#8BC53F",

                  fontWeight: 700,

                  letterSpacing: "1.5px",

                  textTransform:
                    "uppercase",

                  fontSize: "11px",

                  mb: 1.2,
                }}
              >
                Who We Are
              </Typography>

              <Typography
                sx={{
                  color: "#102048",

                  fontWeight: 900,

                  lineHeight: 1.08,

                  mb: 2,

                  fontSize: {
                    xs: "32px",
                    md: "48px",
                  },
                }}
              >
                Smart Technology
                <br />
                For Modern Businesses
              </Typography>

              <Typography
                sx={{
                  color: "#102048",

                  fontWeight: 700,

                  lineHeight: 1.9,

                  mb: 2,

                  fontSize: {
                    xs: "14px",
                    md: "15px",
                  },
                }}
              >
                NetworkTen delivers premium
                networking, conferencing,
                surveillance and automation
                solutions tailored for offices,
                hospitality and commercial
                spaces.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",

                  lineHeight: 1.95,

                  mb: 2,

                  fontSize: {
                    xs: "13px",
                    md: "14px",
                  },
                }}
              >
                We focus on building reliable,
                secure and future-ready
                technology environments with
                modern infrastructure,
                intelligent connectivity and
                professional execution.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",

                  lineHeight: 1.95,

                  mb: 2,

                  fontSize: {
                    xs: "13px",
                    md: "14px",
                  },
                }}
              >
                From smart surveillance and
                automation systems to
                enterprise-grade networking
                and conferencing, our team
                ensures every solution is
                designed with precision,
                performance and long-term
                reliability.
              </Typography>

              <Typography
                sx={{
                  color: "#667085",

                  lineHeight: 1.95,

                  fontSize: {
                    xs: "13px",
                    md: "14px",
                  },
                }}
              >
                Our commitment to quality,
                innovation and customer
                satisfaction helps businesses
                create smarter, safer and more
                connected workspaces.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* PILLARS */}

      <PillarsSection />

      {/* PARTNERS SECTION */}
      <PartnersSection />

      <InstallationSupportSection />

      {/* PROJECTS / YOUTUBE */}

<Box
sx={{
py:{
xs:5,
md:6
},

background:
"linear-gradient(180deg,#ffffff,#f8fbff)"
}}
>

<Container maxWidth="lg">

<Box
sx={{
textAlign:"center",
mb:4
}}
>

<Typography
sx={{
color:"#8BC53F",

fontWeight:700,

letterSpacing:"1.5px",

textTransform:
"uppercase",

fontSize:"11px",

mb:1
}}
>
Our Projects
</Typography>

<Typography
sx={{
color:"#102048",

fontWeight:900,

lineHeight:1.05,

mb:1,

fontSize:{
xs:"28px",
md:"44px"
}
}}
>
Explore Our
<Box
component="span"
sx={{
color:"#8BC53F",
ml:1
}}
>
Project Showcase
</Box>
</Typography>

<Typography
sx={{
color:"#667085",

lineHeight:1.8,

fontSize:{
xs:"13px",
md:"14px"
},

maxWidth:"650px",

mx:"auto"
}}
>
Discover our networking,
surveillance and enterprise
technology implementations.
</Typography>

</Box>


<Box
sx={{
display:"grid",

gridTemplateColumns:{
xs:"1fr",
md:"repeat(3,1fr)"
},

gap:2.5
}}
>

{[
"GYZtK4wMw1U",
"8hSERUUCl3c",
"8c0WRZDnp4g"
].map(
(video,index)=>(

<Box
key={index}

sx={{
position:"relative",

overflow:"hidden",

borderRadius:"28px",

height:{
xs:230,
md:250
},

boxShadow:
"0 20px 45px rgba(0,0,0,.06)",

transition:
".4s",

"&:hover":{

transform:
"translateY(-6px)"
}
}}
>

<iframe
width="100%"
height="100%"
src={`https://www.youtube.com/embed/${video}`}
style={{
border:0
}}
allowFullScreen
/>

</Box>

)
)}

</Box>

<Box
sx={{
display:"flex",

justifyContent:"center",

mt:4
}}
>

<Button
component="a"

href="https://youtube.com/@networkten7284"

target="_blank"

startIcon={
<PlayCircleRoundedIcon/>
}

variant="contained"

sx={{
background:
"linear-gradient(135deg,#8BC53F,#74ab35)",

borderRadius:"50px",

px:4,

py:1.1,

fontWeight:700,

fontSize:"13px",

textTransform:"none",

boxShadow:
"0 12px 25px rgba(139,197,63,.20)",

"&:hover":{

background:"#74ab35"
}
}}
>
View More Projects
</Button>

</Box>

</Container>

</Box>

      <Footer />
    </>
  );
}