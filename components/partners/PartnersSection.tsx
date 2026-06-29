"use client";

import React from "react";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

const partners = [
  {name:"Hikvision",logo:"/partners/hikvi.png"},
  {name:"Dell",logo:"/partners/dell.png"},
  {name:"Cisco",logo:"/partners/cisco.png"},
  {name:"D-Link",logo:"/partners/d-link.png"},
  {name:"AnexGate",logo:"/partners/anex.png"},
  {name:"Cyberoam",logo:"/partners/cyber.png"},
  {name:"Sonicwall",logo:"/partners/sonicwall.png"},
  {name:"Epson",logo:"/partners/epson.png"},
  {name:"Canon",logo:"/partners/canon.png"},
  {name:"Poly",logo:"/partners/poly.png"},
  {name:"CP Plus",logo:"/partners/cp.png"},
  {name:"Fortinet",logo:"/partners/fort.png"},
  {name:"Sophos",logo:"/partners/sophos.png"},
  {name:"Webex",logo:"/partners/webex.png"},
  {name:"Aruba",logo:"/partners/aruba.png"},
  {name:"Panasonic",logo:"/partners/panasonic.png"},
  {name:"Cambium",logo:"/partners/cambium.png"},
  {name:"Onap",logo:"/partners/onap.png"},
  {name:"Logitech",logo:"/partners/logitech.png"},
  {name:"Quantam",logo:"/partners/quantam.png"},
  {name:"Grandstream",logo:"/partners/grand.png"},
];

export default function PartnersSection() {
  return (
    <Box
      sx={{
        py:{xs:5,md:6},

        position:"relative",

        overflow:"hidden",

        background:
        "linear-gradient(180deg,#ffffff,#f7fbff)"
      }}
    >
      {/* Premium glow */}
      <Box
        sx={{
          position:"absolute",

          width:500,

          height:500,

          borderRadius:"50%",

          background:
          "rgba(139,197,63,.08)",

          filter:"blur(130px)",

          right:-250,

          top:-250
        }}
      />

      <Container maxWidth="xl">

        {/* Header */}

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

              borderRadius:"50px",

              background:
              "rgba(139,197,63,.10)",

              border:
              "1px solid rgba(139,197,63,.15)",

              mb:2
            }}
          >
            <HandshakeRoundedIcon
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
              Trusted Partners
            </Typography>

          </Box>

          <Typography
            sx={{
              fontWeight:900,

              color:"#08142e",

              lineHeight:1.05,

              mb:1,

              fontSize:{
                xs:"30px",
                md:"48px"
              }
            }}
          >
            Our
            <Box
              component="span"
              sx={{
                color:"#8BC53F",

                ml:1
              }}
            >
              Technology Partners
            </Box>
          </Typography>

          <Typography
            sx={{
              color:"#667085",

              maxWidth:"700px",

              mx:"auto",

              lineHeight:1.8,

              fontSize:{
                xs:"13px",
                md:"14px"
              }
            }}
          >
            Working with globally trusted
            technology brands to deliver
            enterprise networking,
            surveillance and smart business
            solutions.
          </Typography>

        </Box>

        {/* Logos */}

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay:0,
            disableOnInteraction:false
          }}
          speed={2500}
          loop={true}
          allowTouchMove={false}
          spaceBetween={20}
          breakpoints={{
            0:{
              slidesPerView:2
            },

            768:{
              slidesPerView:3
            },

            1024:{
              slidesPerView:4
            },

            1400:{
              slidesPerView:5
            }
          }}
        >

          {partners.map(
            (partner,index)=>(

              <SwiperSlide
                key={index}
              >

                <Box
                  sx={{
                    height:150,

                    display:"flex",

                    alignItems:"center",

                    justifyContent:"center",

                    transition:
                    ".4s",

                    "&:hover":{

                      transform:
                      "translateY(-8px)"
                    }
                  }}
                >

                  <Box
                    component="img"

                    src={partner.logo}

                    alt={partner.name}

                    sx={{
                      width:"100%",

                      maxWidth:{
                        xs:"180px",
                        md:"230px"
                      },

                      maxHeight:{
                        xs:"85px",
                        md:"120px"
                      },

                      objectFit:
                      "contain",

                      mixBlendMode:
                      "multiply",

                      transition:
                      ".4s",

                      opacity:.9,

                      "&:hover":{

                        opacity:1,

                        transform:
                        "scale(1.15)"
                      }
                    }}

                    onError={(e:any)=>{
                      e.currentTarget.src=
                      "/partners/default.png"
                    }}

                  />

                </Box>

              </SwiperSlide>

            )
          )}

        </Swiper>

      </Container>
    </Box>
  );
}