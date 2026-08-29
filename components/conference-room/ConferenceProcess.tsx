"use client";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "We understand your room size, team requirements, usage and collaboration needs.",
    icon: <SearchRoundedIcon fontSize="small" />,
  },
  {
    number: "02",
    title: "Design",
    text: "Our team creates the AV layout, display placement, audio design and connectivity plan.",
    icon: <DesignServicesRoundedIcon fontSize="small" />,
  },
  {
    number: "03",
    title: "Integrate",
    text: "Every component is installed and configured to work together seamlessly.",
    icon: <BuildCircleRoundedIcon fontSize="small" />,
  },
  {
    number: "04",
    title: "Deliver",
    text: "We test, train your team and provide continued support after installation.",
    icon: <RocketLaunchRoundedIcon fontSize="small" />,
  },
];

export default function ConferenceProcess() {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 9, md: 14 },
        background: "#f7f8fa",
        overflow: "hidden",
      }}
    >
      {/* decorative backdrop */}
      <Box
        sx={{
          position: "absolute",
          bottom: -180,
          right: -160,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(16,168,117,.06),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* LEFT — sticky intro */}
          <Box
            sx={{
              position: { xs: "static", md: "sticky" },
              top: 120,
              alignSelf: "start",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                color: "#10a875",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: ".16em",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10a875",
                }}
              />
              OUR PROCESS
            </Box>

            <Typography
              sx={{
                mt: 2,
                fontSize: { xs: 36, md: 55 },
                lineHeight: 1.03,
                fontWeight: 800,
                letterSpacing: "-.045em",
              }}
            >
              From empty room
              <br />
              to
              <Box component="span" sx={{ color: "#10a875" }}>
                {" "}
                smart room.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#6b7585",
                lineHeight: 1.8,
                maxWidth: 450,
                fontSize: 15.5,
              }}
            >
              A professional conference room isn't about buying
              equipment. It's about designing the right experience.
            </Typography>

            {/* mini credibility strip */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mt: 5,
                pt: 4,
                borderTop: "1px solid #dde2e8",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 22, fontWeight: 800, color: "#07152f" }}
                >
                  4 Steps
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: "#8a94a6", fontWeight: 600 }}
                >
                  Start to finish
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: 22, fontWeight: 800, color: "#07152f" }}
                >
                  2–4 Wks
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: "#8a94a6", fontWeight: 600 }}
                >
                  Typical timeline
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* RIGHT — steps with connecting line */}
          <Box sx={{ position: "relative" }}>
            {/* vertical connecting line */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: 21, md: 27 },
                top: 28,
                bottom: 28,
                width: "2px",
                background:
                  "linear-gradient(180deg,#10a875,#dde2e8 85%)",
                opacity: 0.35,
              }}
            />

            {steps.map((step, index) => (
              <Box
                key={step.number}
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: { xs: "44px 1fr", md: "56px 1fr" },
                  gap: { xs: 2.5, md: 3.5 },
                  py: { xs: 3, md: 3.5 },
                  px: { xs: 2, md: 3 },
                  ml: { xs: -2, md: -3 },
                  borderRadius: "18px",
                  transition: "background-color .3s ease",
                  "&:hover": {
                    backgroundColor: "#fff",
                    boxShadow: "0 20px 45px rgba(7,21,47,.08)",
                  },
                  "&:hover .step-circle": {
                    background: "linear-gradient(135deg,#10a875,#0dbb80)",
                    color: "#fff",
                    borderColor: "transparent",
                  },
                }}
              >
                {/* numbered circle w/ icon */}
                <Box
                  className="step-circle"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    width: { xs: 44, md: 56 },
                    height: { xs: 44, md: 56 },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    border: "2px solid #dde2e8",
                    color: "#10a875",
                    transition: "all .3s ease",
                  }}
                >
                  {step.icon}
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1.25,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#10a875",
                        letterSpacing: ".05em",
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 22, md: 26 },
                        fontWeight: 800,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      mt: 1,
                      maxWidth: 560,
                      color: "#727c8d",
                      lineHeight: 1.7,
                      fontSize: 14.5,
                    }}
                  >
                    {step.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}