"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
Box,
Paper,
Typography,
TextField,
Button,
IconButton,
InputAdornment
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

import ArrowBackRoundedIcon
from "@mui/icons-material/ArrowBackRounded";

export default function AdminLoginPage() {

const router = useRouter();

const [adminId,setAdminId] =
useState("");

const [password,setPassword] =
useState("");

const [showPassword,setShowPassword] =
useState(false);

const handleLogin = ()=>{

if(
adminId === "admin" &&
password === "NetworkTen@2026"
){

localStorage.setItem(
"adminLoggedIn",
"true"
);

router.push(
"/admin/dashboard"
);

}else{

alert(
"Invalid Admin Credentials"
);

}

};

return (
  <Box

  sx={{

  minHeight:"100vh",

  display:"flex",

  alignItems:"center",

  justifyContent:"center",

  background:
  "linear-gradient(135deg,#08142e 0%,#102048 100%)",

  p:2,

  position:"relative",

  overflow:"hidden"

  }}
  >
    <Link

    href="/"

    style={{

    position:"absolute",

    top:"24px",

    left:"24px",

    textDecoration:"none",

    zIndex:999

    }}

    >

    <Button

    startIcon={
    <ArrowBackRoundedIcon />
    }

    sx={{

    height:"46px",

    px:2.5,

    borderRadius:"14px",

    background:
    "rgba(255,255,255,.08)",

    backdropFilter:
    "blur(14px)",

    border:
    "1px solid rgba(255,255,255,.10)",

    color:"#fff",

    fontWeight:800,

    textTransform:"none",

    "&:hover":{

    background:
    "rgba(139,197,63,.14)",

    transform:
    "translateY(-2px)"

    }

    }}

    >

    Back To Home

    </Button>

    </Link>
    <Box

    sx={{

    position:"absolute",

    width:"350px",

    height:"350px",

    borderRadius:"50%",

    background:
    "rgba(139,197,63,.08)",

    top:"-100px",

    right:"-100px",

    filter:"blur(100px)"

    }}

    />
    <Paper

    elevation={0}

    sx={{

    width:"100%",

    maxWidth:"850px",

    overflow:"hidden",

    borderRadius:"24px",

    display:"grid",

    gridTemplateColumns:{
    xs:"1fr",
    md:"1fr 1fr"
    },

    background:"#fff",

    boxShadow:
    "0 30px 80px rgba(0,0,0,.25)"

    }}

    >

    {/* LEFT SECTION */}

    <Box

    sx={{

    display:{
    xs:"none",
    md:"flex"
    },

    flexDirection:"column",

    justifyContent:"flex-end",

    position:"relative",

    minHeight:"520px",

    backgroundImage:
    "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop')",

    backgroundSize:"cover",

    backgroundPosition:"center",

    p:4

    }}

    >

    <Box

    sx={{

    position:"absolute",

    inset:0,

    background:
    "linear-gradient(to top,rgba(8,20,46,.95),rgba(8,20,46,.3))"

    }}

    />

    <Box
    sx={{
    position:"relative",
    zIndex:2
    }}

    >

    <Typography

    sx={{

    color:"#8BC53F",

    fontWeight:700,

    fontSize:"12px",

    letterSpacing:"2px",

    mb:1

    }}

    >

    NETWORKTEN

    </Typography>

    <Typography

    sx={{

    color:"#fff",

    fontSize:"34px",

    fontWeight:900,

    lineHeight:1.1,

    mb:2

    }}

    >

    Admin
    Control
    Panel

    </Typography>

    <Typography

    sx={{

    color:
    "rgba(255,255,255,.75)",

    fontSize:"14px",

    lineHeight:1.8

    }}

    >

    Manage products,
    customer enquiries,
    orders and business
    operations securely.

    </Typography>

    </Box>

    </Box>

    {/* RIGHT SECTION */}

    <Box

    sx={{

    display:"flex",

    alignItems:"center",

    justifyContent:"center",

    p:4

    }}

    >

    <Box
    sx={{
    width:"100%",
    maxWidth:"340px"
    }}

    >

    <Box
    sx={{
    textAlign:"center",
    mb:4
    }}

    >

    <Box

    sx={{

    width:"72px",

    height:"72px",

    borderRadius:"18px",

    background:
    "linear-gradient(135deg,#8BC53F,#74ab35)",

    display:"flex",

    alignItems:"center",

    justifyContent:"center",

    mx:"auto",

    mb:2

    }}

    >

    <AdminPanelSettingsRoundedIcon

    sx={{
    fontSize:"38px",
    color:"#fff"
    }}

    />

    </Box>

    <Typography

    sx={{

    fontSize:"28px",

    fontWeight:900,

    color:"#102048"

    }}

    >

    Admin Login

    </Typography>

    <Typography

    sx={{

    fontSize:"13px",

    color:"#667085",

    mt:1

    }}

    >

    Secure access to
    NetworkTen dashboard

    </Typography>

    </Box>

    <TextField

    fullWidth

    label="Admin ID"

    value={adminId}

    onChange={(e)=>
    setAdminId(
    e.target.value
    )
    }

    sx={{
    mb:2
    }}

    />

    <TextField

    fullWidth

    label="Password"

    type={
    showPassword
    ? "text"
    : "password"
    }

    value={password}

    onChange={(e)=>
    setPassword(
    e.target.value
    )
    }

    sx={{
    mb:3
    }}

    slotProps={{
      input: {

      endAdornment:(

      <InputAdornment
      position="end"

      >

      <IconButton

      onClick={()=>
      setShowPassword(
      !showPassword
      )
      }

      edge="end"

      >

      {showPassword
      ? <VisibilityOff />
      : <Visibility />
      }

      </IconButton>

      </InputAdornment>

      )

      }
    }}

    />

    <Button

    fullWidth

    variant="contained"

    onClick={handleLogin}

    sx={{

    height:"52px",

    borderRadius:"12px",

    background:
    "linear-gradient(135deg,#8BC53F,#74ab35)",

    fontWeight:800,

    fontSize:"14px",

    textTransform:"none",

    boxShadow:
    "0 10px 25px rgba(139,197,63,.25)",

    "&:hover":{

    background:
    "linear-gradient(135deg,#74ab35,#5f9129)"

    }

    }}

    >

    Login To Dashboard

    </Button>

    <Box

    sx={{

    display:"flex",

    alignItems:"center",

    justifyContent:"center",

    gap:1,

    mt:2

    }}

    >

    <SecurityRoundedIcon

    sx={{
    fontSize:"16px",
    color:"#8BC53F"
    }}

    />

    <Typography

    sx={{

    fontSize:"11px",

    color:"#98A2B3"

    }}

    >

    Authorized Access Only

    </Typography>

    </Box>

    </Box>

    </Box>

    </Paper>
  </Box>
);

}
