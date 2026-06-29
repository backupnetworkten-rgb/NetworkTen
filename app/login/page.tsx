"use client";

import React, { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import {
signupUser,
loginUser,
sendOTP,
verifyOTP
} from "@/services/authService";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";

import VisibilityOff from "@mui/icons-material/VisibilityOff";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";

import MailRoundedIcon from "@mui/icons-material/MailRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [isSignup, setIsSignup] =
    useState(false);

  const [loginMethod, setLoginMethod] =
    useState(0);

  const [showOtpField, setShowOtpField] =
    useState(false);

    const router = useRouter();

const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [phone,setPhone]=useState("");

const [otp,setOtp]=useState("");

const [loading,setLoading]=
useState(false);

const handleAuth = async () => {
  try {
    setLoading(true);

    if (isSignup) {

      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      await signupUser(
        name,
        email,
        password
      );

      alert(
        "Account created successfully"
      );

      setIsSignup(false);

      setName("");
      setEmail("");
      setPassword("");

    } else {

      // EMAIL LOGIN

      if(loginMethod===0){

const user=
await loginUser(
email,
password
);

localStorage.setItem(

"user",

JSON.stringify({

name:
user?.displayName
|| email
.split("@")[0],

email:
user?.email

})

);

alert(
"Login Successful ✅"
);

// STEP 4

const redirect=

localStorage.getItem(
"redirectAfterLogin"
);

if(redirect){

localStorage.removeItem(
"redirectAfterLogin"
);

router.push(
redirect
);

}else{

router.push(
"/"
);

}

}

      // PHONE LOGIN

      else {

        if (!showOtpField) {

          await sendOTP(
            phone
          );

          setShowOtpField(
            true
          );

          alert(
            "OTP Sent"
          );

        } else {

          await verifyOTP(
            otp
          );

          alert(
            "Login Successful"
          );

          window.location.href="/";

        }

      }

    }

  } catch (error:any) {

    console.log(error);

    alert(
      error.message
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",

          background:
            "linear-gradient(135deg,#08142e 0%,#102048 100%)",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          px: 1.5,

          py: 2.5,

          position: "relative",

          overflow: "hidden",
        }}
      >
        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",

            width: 240,

            height: 240,

            borderRadius: "50%",

            background:
              "rgba(139,197,63,0.10)",

            top: -80,

            right: -80,

            filter: "blur(110px)",
          }}
        />

        {/* MAIN CARD */}
        <Box
          sx={{
            width: "100%",

            maxWidth: "860px",

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "0.95fr 1fr",
            },

            borderRadius: "24px",

            overflow: "hidden",

            background:
              "rgba(255,255,255,0.06)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            backdropFilter:
              "blur(16px)",

            boxShadow:
              "0 22px 60px rgba(0,0,0,0.22)",
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            sx={{
              position: "relative",

              minHeight: {
                xs: "220px",
                md: "500px",
              },

              display: "flex",

              alignItems: "flex-end",

              p: {
                xs: 2.5,
                md: 3,
              },

              overflow: "hidden",
            }}
          >
            <Image
              src={
                isSignup
                  ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop"
              }
              alt="NetworkTen"
              fill
              priority
              style={{
                objectFit: "cover",
              }}
            />

            {/* OVERLAY */}
            <Box
              sx={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(to top, rgba(8,20,46,0.95), rgba(8,20,46,0.20))",
              }}
            />

            {/* CONTENT */}
            <Box
              sx={{
                position: "relative",

                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#8BC53F",

                  fontWeight: 700,

                  letterSpacing: "1.2px",

                  textTransform:
                    "uppercase",

                  fontSize: "9px",

                  mb: 0.8,
                }}
              >
                {isSignup
                  ? "Join NetworkTen"
                  : "Welcome To NetworkTen"}
              </Typography>

              <Typography
                sx={{
                  color: "#fff",

                  fontWeight: 900,

                  lineHeight: 1.05,

                  mb: 1.2,

                  fontSize: {
                    xs: "24px",
                    md: "36px",
                  },
                }}
              >
                {isSignup ? (
                  <>
                    Create Smart
                    <br />
                    Account
                  </>
                ) : (
                  <>
                    Smart Business
                    <br />
                    Login
                  </>
                )}
              </Typography>

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.72)",

                  lineHeight: 1.7,

                  maxWidth: "280px",

                  fontSize: "12px",
                }}
              >
                Premium networking,
                surveillance and automation
                solutions for modern
                businesses.
              </Typography>
            </Box>
          </Box>

          {/* RIGHT FORM */}
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              px: {
                xs: 2.5,
                md: 3,
              },

              py: {
                xs: 3,
                md: 3,
              },

              background:
                "rgba(255,255,255,0.98)",
            }}
          >
            <Box
              sx={{
                width: "100%",

                maxWidth: "310px",
              }}
            >
              {/* TOP */}
              <Typography
                sx={{
                  color: "#102048",

                  fontWeight: 900,

                  lineHeight: 1.05,

                  mb: 0.6,

                  fontSize: {
                    xs: "24px",
                    md: "32px",
                  },
                }}
              >
                {isSignup
                  ? "Create Account"
                  : "Welcome Back"}
              </Typography>

              <Typography
                sx={{
                  color: "#667085",

                  lineHeight: 1.6,

                  mb: 2,

                  fontSize: "12px",
                }}
              >
                {isSignup
                  ? "Create your premium account."
                  : "Login to continue your experience."}
              </Typography>

              {/* LOGIN METHOD */}
              {!isSignup && (
                <Tabs
                  value={loginMethod}
                  onChange={(_, val) =>
                    setLoginMethod(val)
                  }
                  variant="fullWidth"
                  sx={{
                    mb: 2,

                    background:
                      "#f5f7fb",

                    borderRadius: "12px",

                    minHeight: "42px",

                    p: 0.4,

                    "& .MuiTabs-indicator":
                      {
                        display: "none",
                      },

                    "& .MuiTab-root": {
                      minHeight:
                        "36px",

                      textTransform:
                        "none",

                      fontWeight: 700,

                      borderRadius:
                        "8px",

                      fontSize:
                        "11px",
                    },

                    "& .Mui-selected":
                      {
                        background:
                          "#102048",

                        color:
                          "#fff !important",
                      },
                  }}
                >
                  <Tab
                    icon={
                      <MailRoundedIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    }
                    iconPosition="start"
                    label="Email"
                  />

                  <Tab
                    icon={
                      <PhoneIphoneRoundedIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    }
                    iconPosition="start"
                    label="Phone"
                  />
                </Tabs>
              )}

              {/* FORM */}

<Box
  sx={{
    display: "grid",
    gap: 1.3,
  }}
>
  {/* FULL NAME */}

  {isSignup && (
    <TextField
      fullWidth
      label="Full Name"
      variant="outlined"
      size="small"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />
  )}

  {/* LOGIN EMAIL */}

  {!isSignup &&
    loginMethod === 0 && (
      <>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />
      </>
    )}

  {/* PHONE LOGIN */}

  {!isSignup &&
    loginMethod === 1 && (
      <>
        <TextField
fullWidth
label="Phone Number"
variant="outlined"
size="small"
placeholder="9876543210"

value={phone}

onChange={(e)=>
setPhone(
e.target.value
)}
/>

        {showOtpField && (
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            size="small"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
          />
        )}

        {!showOtpField && (
          <Button
            variant="outlined"
            onClick={async () => {
              await sendOTP(phone);
              setShowOtpField(
                true
              );
            }}
            sx={{
              borderRadius:
                "50px",
              py: .9,
              textTransform:
                "none",
              fontWeight: 700,
              fontSize:
                "12px",
              borderColor:
                "#102048",
              color:
                "#102048",
            }}
          >
            Send OTP
          </Button>
        )}
      </>
    )}

  {/* SIGNUP */}

  {isSignup && (
    <>
      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        size="small"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        size="small"
        type={
          showPassword
            ? "text"
            : "password"
        }
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <TextField
        fullWidth
        label="Confirm Password"
        variant="outlined"
        size="small"
        type={
          showPassword
            ? "text"
            : "password"
        }
      />
    </>
  )}

  <Button
    variant="contained"
    onClick={handleAuth}
    endIcon={
      <ArrowForwardRoundedIcon />
    }
    sx={{
      mt: .3,
      background:
        "linear-gradient(135deg,#8BC53F,#74ab35)",
      borderRadius:
        "50px",
      py: 1.1,
      fontWeight: 800,
      textTransform:
        "none",
      fontSize: "13px",
    }}
  >
    {loading
      ? "Please Wait..."
      : isSignup
      ? "Create Account"
      : loginMethod === 1
      ? "Verify & Login"
      : "Login"}
  </Button>

  <div id="recaptcha-container" />
</Box>

              {/* SWITCH */}
              <Box
                sx={{
                  mt: 2,

                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#667085",

                    fontSize: "12px",
                  }}
                >
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}

                  <Box
                    component="span"
                    onClick={() =>
                      setIsSignup(!isSignup)
                    }
                    sx={{
                      color: "#8BC53F",

                      fontWeight: 700,

                      ml: 0.8,

                      cursor: "pointer",
                    }}
                  >
                    {isSignup
                      ? "Sign In"
                      : "Sign Up"}
                  </Box>
                </Typography>
              </Box>

              {/* NOTE */}
              <Typography
                sx={{
                  color: "#98A2B3",

                  fontSize: "10px",

                  textAlign: "center",

                  mt: 1.6,

                  lineHeight: 1.6,
                }}
              >
                Firebase Authentication is
                required for OTP verification.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}