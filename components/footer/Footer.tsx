"use client";

import React from "react";

import Link from "next/link";

import {
  Box,
  Typography,
  Container,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import InstagramIcon from "@mui/icons-material/Instagram";

import LinkedInIcon from "@mui/icons-material/LinkedIn";

import YouTubeIcon from "@mui/icons-material/YouTube";

import CallRoundedIcon from "@mui/icons-material/CallRounded";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";

import AdminPanelSettingsRoundedIcon
from "@mui/icons-material/AdminPanelSettingsRounded";

import Image from "next/image";

const quickLinks = [
  {
    label: "Home",
    path: "/",
  },

  {
    label: "About Us",
    path: "/about",
  },

  {
    label: "Solutions",
    path: "/solutions",
  },

  {
    label: "Products",
    path: "/products",
  },

  {
    label: "Blog",
    path: "/blog",
  },

  {
    label: "Careers",
    path: "/careers",
  },

  {
    label: "Contact",
    path: "/contact",
  },
];

const services = [
  "Networking",

  "CCTV Surveillance",

  "Automation",

  "Audio Visual",

  "Video Conferencing",
];

export default function Footer() {
  return (
    <Box
      sx={{
        position: "relative",

        background:
          "linear-gradient(135deg,#040b16 0%,#08142e 45%,#102048 100%)",

        color: "#fff",

        overflow: "hidden",

        pt: {
          xs: 5,
          md: 6,
        },

        mt: 5,
      }}
    >
      {/* PREMIUM GLOW */}
      <Box
        sx={{
          position: "absolute",

          width: 420,

          height: 420,

          borderRadius: "50%",

          background:
            "rgba(139,197,63,0.12)",

          top: -180,

          right: -120,

          filter: "blur(130px)",
        }}
      />

      {/* SECOND GLOW */}
      <Box
        sx={{
          position: "absolute",

          width: 300,

          height: 300,

          borderRadius: "50%",

          background:
            "rgba(255,255,255,0.05)",

          bottom: -120,

          left: -100,

          filter: "blur(100px)",
        }}
      />

      <Container maxWidth="xl">
        {/* MAIN FOOTER */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.2fr 0.8fr 0.8fr 1.2fr",
            },

            gap: {
              xs: 4,
              md: 3,
            },

            pb: 4,

            position: "relative",

            zIndex: 2,
          }}
        >
          {/* COMPANY */}
          <Box>
            {/* LOGO */}
            <Box
              sx={{
                mb: 2,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="NetworkTen"
                width={190}
                height={60}
                style={{
                  width: "auto",

                  height: "58px",

                  objectFit: "contain",
                }}
              />
            </Box>

            {/* TEXT */}
            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.72)",

                lineHeight: 1.9,

                fontSize: {
                  xs: "13px",
                  md: "14px",
                },

                maxWidth: "360px",

                mb: 2.5,
              }}
            >
              Smart networking,
              surveillance, automation
              and premium business
              infrastructure solutions
              designed for modern
              enterprises and commercial
              spaces.
            </Typography>

            {/* SOCIAL ICONS */}
            <Box
              sx={{
                display: "flex",

                gap: 1,
              }}
            >
              {[
                {
                  icon:
                    <FacebookRoundedIcon />,
                  link: "#",
                },

                {
                  icon:
                    <InstagramIcon />,
                  link:
                    "https://instagram.com/network.ten",
                },

                {
                  icon:
                    <LinkedInIcon />,
                  link: "#",
                },

                {
                  icon:
                    <YouTubeIcon />,
                  link:
                    "https://www.youtube.com/@networkten7284",
                },
              ].map((item, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={item.link}
                  target="_blank"
                  sx={{
                    width: 44,

                    height: 44,

                    background:
                      "rgba(255,255,255,0.06)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    backdropFilter:
                      "blur(14px)",

                    color: "#fff",

                    transition:
                      "0.35s",

                    "&:hover": {
                      background:
                        "#8BC53F",

                      transform:
                        "translateY(-4px)",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* QUICK LINKS */}
          <Box>
            <Typography
              sx={{
                fontWeight: 800,

                mb: 2.2,

                fontSize: "18px",
              }}
            >
              Quick Links
            </Typography>

            {quickLinks.map(
              (item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  style={{
                    textDecoration:
                      "none",
                  }}
                >
                  <Box
                    sx={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap: 0.5,

                      mb: 1.3,

                      color:
                        "rgba(255,255,255,0.70)",

                      transition:
                        "0.3s",

                      "&:hover": {
                        color:
                          "#8BC53F",

                        transform:
                          "translateX(4px)",
                      },
                    }}
                  >
                    <KeyboardArrowRightRoundedIcon
                      sx={{
                        fontSize:
                          17,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize:
                          "13px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Link>
              )
            )}
          </Box>

          {/* SERVICES */}
          <Box>
            <Typography
              sx={{
                fontWeight: 800,

                mb: 2.2,

                fontSize: "18px",
              }}
            >
              Services
            </Typography>

            {services.map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: 0.5,

                    mb: 1.3,

                    color:
                      "rgba(255,255,255,0.70)",

                    transition:
                      "0.3s",

                    cursor:
                      "pointer",

                    "&:hover": {
                      color:
                        "#8BC53F",

                      transform:
                        "translateX(4px)",
                    },
                  }}
                >
                  <KeyboardArrowRightRoundedIcon
                    sx={{
                      fontSize:
                        17,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize:
                        "13px",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              )
            )}
          </Box>

          {/* CONTACT */}

<Box>

<Typography
sx={{
fontWeight:800,
mb:2.2,
fontSize:"18px"
}}
>
Contact Info
</Typography>

{[
{
icon:
<CallRoundedIcon />,
text:
"+91 8687878755"
},

{
icon:
<EmailRoundedIcon />,
text:
"info@networkten.in"
},

{
icon:
<LocationOnRoundedIcon />,
text:
"Chanakya Place, Uttam Nagar, New Delhi"
}

].map((item,index)=>(

<Box
key={index}
sx={{
display:"flex",

gap:1,

alignItems:
"flex-start",

mb:1.6
}}
>

<Box
sx={{

width:38,

height:38,

borderRadius:
"12px",

background:
"rgba(139,197,63,.12)",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"#8BC53F"

}}
>

{item.icon}

</Box>

<Typography
sx={{
fontSize:"13px",

lineHeight:1.8,

color:
"rgba(255,255,255,.72)"
}}
>

{item.text}

</Typography>

</Box>

))}

{/* ACTION */}

<Box
sx={{

mt:2.2,

display:"flex",

gap:1,

width:"100%",

alignItems:"stretch",

overflow:"hidden"

}}

>

{/* ADMIN */}

<Link
href="/admin/login"
style={{
textDecoration:"none",
flex:1
}}
>

<Box
sx={{

height:"145px",

borderRadius:"18px",

background:
"linear-gradient(150deg,#08142e,#17386d)",

border:
"1px solid rgba(139,197,63,.18)",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

px:1.5,

transition:".35s",

"&:hover":{

transform:
"translateY(-4px)"

}

}}

>

<Box
sx={{

width:52,

height:52,

borderRadius:"16px",

background:
"linear-gradient(135deg,#8BC53F,#6EA531)",

display:"flex",

alignItems:"center",

justifyContent:"center",

mb:1

}}

>

<AdminPanelSettingsRoundedIcon
sx={{
fontSize:28,
color:"#fff"
}}
/>

</Box>

<Typography
sx={{
fontWeight:800,
fontSize:"13px",
color:"#fff"
}}

>

Admin </Typography>

<Typography
sx={{
fontSize:"10px",
color:
"rgba(255,255,255,.70)"
}}

>

Portal </Typography>

</Box>

</Link>

{/* REQUEST */}

<Link
href="/video-conference"
style={{
textDecoration:"none",
flex:1
}}
>

<Box
sx={{

height:"145px",

borderRadius:"18px",

background:
"linear-gradient(145deg,#8BC53F,#6EA531)",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

px:1.5,

transition:".35s",

"&:hover":{

transform:
"translateY(-4px)"

}

}}

>

<Box
sx={{

width:52,

height:52,

borderRadius:"16px",

background:
"rgba(255,255,255,.18)",

display:"flex",

alignItems:"center",

justifyContent:"center",

mb:1

}}

>

<VideoCallRoundedIcon
sx={{
fontSize:28,
color:"#fff"
}}
/>

</Box>

<Typography
sx={{
fontWeight:800,
fontSize:"13px",
color:"#fff"
}}

>

Request </Typography>

<Typography
sx={{
fontSize:"10px",
color:
"rgba(255,255,255,.88)"
}}

>

Demo </Typography>

</Box>

</Link>

{/* QR */}

<Box
sx={{

flex:1,

height:"145px",

borderRadius:"18px",

background:
"linear-gradient(145deg,#ffffff,#eef3ff)",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

px:1.5,

transition:".35s",

"&:hover":{

transform:
"translateY(-4px)"

}

}}

>

<Image
src="/images/All platforms.png"
alt="QR"
width={58}
height={58}
style={{
borderRadius:"12px"
}}
/>

<Typography
sx={{
mt:1,
fontWeight:800,
fontSize:"13px",
color:"#102048"
}}

>

Scan QR </Typography>

<Typography
sx={{
fontSize:"10px",
color:"#667085"
}}

>

Connect </Typography>

</Box>

</Box>


</Box>

</Box>

<Divider
sx={{
borderColor:
"rgba(255,255,255,.08)"
}}
/>

<Box
sx={{

py:2.2,

display:"flex",

justifyContent:
"space-between",

alignItems:"center",

flexDirection:{
xs:"column",
md:"row"
}

}}
>

<Typography
sx={{
fontSize:"12px",

color:
"rgba(255,255,255,.58)"
}}
>

© 2026 NetworkTen. All Rights Reserved.

</Typography>

<Box
sx={{

display:"flex",

gap:2,

flexWrap:"wrap",

justifyContent:"center",

alignItems:"center"

}}

>

{[

{
label:"Privacy Policy",
path:"/privacy-policy"
},

{
label:"Terms & Conditions",
path:"/terms-and-conditions"
},

{
label:"Shipping Policy",
path:"/shipping-policy"
},

{
label:"Refund Policy",
path:"/refund-policy"
}

].map((item,index)=>(

<Link
key={index}
href={item.path}
style={{
textDecoration:"none"
}}
>

<Typography
sx={{

fontSize:"12px",

color:
"rgba(255,255,255,.60)",

cursor:"pointer",

transition:".35s",

"&:hover":{

color:"#8BC53F",

transform:
"translateY(-2px)"

}

}}

>

{item.label}

</Typography>

</Link>

))}

</Box>

</Box>

</Container>

</Box>

);

}