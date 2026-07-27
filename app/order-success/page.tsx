"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Divider, Snackbar, Alert, CircularProgress } from "@mui/material";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon              from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon     from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleRoundedIcon        from "@mui/icons-material/CheckCircleRounded";
import ContentCopyRoundedIcon        from "@mui/icons-material/ContentCopyRounded";
import HomeOutlinedIcon              from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon          from "@mui/icons-material/BusinessOutlined";
import PrintOutlinedIcon             from "@mui/icons-material/PrintOutlined";
import ReceiptLongOutlinedIcon       from "@mui/icons-material/ReceiptLongOutlined";
import StorefrontOutlinedIcon        from "@mui/icons-material/StorefrontOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import PhoneOutlinedIcon             from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon             from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon          from "@mui/icons-material/LanguageOutlined";
import EditNoteRoundedIcon           from "@mui/icons-material/EditNoteRounded";
import { proxyImage } from "@/lib/proxyImage";
import { fetchUserOrders, getLocalOrders, type Order } from "@/lib/orderStore";
import { generateInvoice } from "@/lib/generateInvoice";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// Premium design tokens - matched to the redesigned checkout page
const C = {
  paper:       "#F8F5EF",
  surface:     "#FFFFFF",
  surfaceWarm: "#FBF9F4",
  surfaceSunk: "#F1ECE0",
  border:      "#E7E0D0",
  borderLight: "#F0EBDF",
  ink:         "#1C1A16",
  text:        "#2B2823",
  textSub:     "#726B5C",
  textMuted:   "#A79F8C",
  red:         "#AF3529",
  redLight:    "#FBEEEC",
  navy:        "#182644",
  navyLight:   "#EEF0F6",
  navyBorder:  "#D6DBE8",
  green:       "#1D7A46",
  greenLight:  "#EBF6EF",
  greenBorder: "#C7E6D2",
  brass:       "#9C7A34",
  brassDeep:   "#7C6027",
  brassLight:  "#F6EFDD",
  brassBorder: "#E8D9AF",
};

const sans  = "'Inter', system-ui, sans-serif";
const serif = "'Fraunces', 'Georgia', serif";

const COMPANY = {
  name:         "Network Ten",
  legalName:    "Network Ten",
  addressLine1: "Part 1, E3/37D Uttam Nagar",
  addressLine2: "Chanakya Place, New Delhi – 110059",
  addressLine3: "Delhi, India",
  gstin:        "07AAAAA0000A1Z5",
  phone:        "+91 8687878755",
  email:        "info@networkten.in",
  website:      "www.networkten.in",
};

if (typeof document !== "undefined" && !document.getElementById("order-success-font")) {
  const s = document.createElement("style");
  s.id = "order-success-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');
    * { box-sizing: border-box; }
    @keyframes ringPop {
      0%   { transform: scale(0.6); opacity: 0; }
      60%  { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes checkDraw {
      from { stroke-dashoffset: 36; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes ringEcho {
      0%   { transform: scale(1); opacity: 0.35; }
      100% { transform: scale(1.55); opacity: 0; }
    }
    .order-success-ring { animation: ringPop 0.55s cubic-bezier(.2,1.4,.4,1) both; }
    .order-success-check { animation: checkDraw 0.45s 0.35s ease forwards; stroke-dasharray: 36; stroke-dashoffset: 36; }
    .order-success-echo { animation: ringEcho 1.4s ease-out 0.1s 1; }

    @media print {
      .no-print { display: none !important; }

      html, body { background: #ffffff !important; margin: 0 !important; padding: 0 !important; }
      @page { size: A4; margin: 14mm; }

      body * { visibility: hidden; }
      .print-receipt, .print-receipt * { visibility: visible; }
      .print-receipt {
        position: absolute; top: 0; left: 0; width: 100%;
        margin: 0 !important; padding: 0 !important;
      }

      .print-receipt .print-card {
        box-shadow: none !important;
        border-radius: 0 !important;
        border: none !important;
        margin-bottom: 14pt !important;
      }
      .print-receipt .print-card + .print-card {
        border-top: 1px solid ${C.border} !important;
        padding-top: 14pt !important;
      }
      .print-receipt img { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .print-receipt * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  `;
  document.head.appendChild(s);
}

const sectionSx = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 1px 2px rgba(28,26,22,0.03), 0 8px 24px rgba(28,26,22,0.05)",
};

const headerSx = {
  display: "flex", alignItems: "center", gap: 1.3,
  px: "24px", py: "17px",
  borderBottom: `1px solid ${C.borderLight}`,
  background: C.surfaceWarm,
};

const headerIconWrapSx = {
  width: 30, height: 30, borderRadius: "9px",
  background: C.navyLight, display: "flex",
  alignItems: "center", justifyContent: "center",
  flexShrink: 0,
};

const TRUST = [
  { label: "Free Delivery", sub: "Above ₹1000",
    icon: (
      <svg width="20" height="14" viewBox="0 0 40 24" fill="none">
        <rect x="1" y="3" width="21" height="14" rx="2" fill={C.navy}/>
        <path d="M22 7h6l4 7v4H22V7z" fill={C.brass}/>
        <circle cx="7" cy="20" r="3" fill={C.ink} stroke={C.paper} strokeWidth="1.5"/>
        <circle cx="29" cy="20" r="3" fill={C.ink} stroke={C.paper} strokeWidth="1.5"/>
      </svg>
    ) },
  { label: "2 Yr Warranty", sub: "Official",
    icon: (
      <svg width="15" height="18" viewBox="0 0 26 30" fill="none">
        <path d="M13 1L1 6v9c0 6 4.5 11.5 12 13 7.5-1.5 12-7 12-13V6L13 1z" fill={C.navy}/>
        <text x="13" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">2 YR</text>
      </svg>
    ) },
  { label: "GST Invoice", sub: "Included",
    icon: (
      <svg width="14" height="17" viewBox="0 0 24 28" fill="none">
        <rect x="1" y="1" width="18" height="22" rx="2" fill={C.green}/>
        <rect x="4" y="4" width="11" height="2" rx="1" fill="#dcf3e4"/>
        <rect x="4" y="8" width="8" height="1.5" rx="1" fill="#dcf3e4"/>
        <circle cx="17" cy="22" r="6" fill="#15803d" stroke="#fff" strokeWidth="1.5"/>
        <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
  { label: "7-Day Return", sub: "Easy & Free",
    icon: (
      <svg width="19" height="16" viewBox="0 0 30 26" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" fill={C.brass}/>
        <path d="M7 11h10M7 15h7" stroke={C.brassLight} strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 2c3.5 2 5 5.5 5 8.5s-1.5 6.5-5 8.5" stroke={C.brassDeep} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M23 3l4-2.5-1.5 5.5z" fill={C.brassDeep}/>
      </svg>
    ) },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function CompanyLogoMark({ size = 42 }: { size?: number }) {
  return (
    <Box
      component="img"
      src="/images/logo.png"
      alt={COMPANY.name}
      sx={{
        width: size,
        height: size,
        borderRadius: "10px",
        objectFit: "contain",
        flexShrink: 0,
        background: C.surface,
        border: `1px solid ${C.border}`,
        p: 0.5,
      }}
    />
  );
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order,   setOrder]   = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("Order ID copied to clipboard!");

  useEffect(() => {
    setMounted(true);
    let active = true;

    (async () => {
      try {
        const orders = await fetchUserOrders();
        if (active) setOrder(orders[0] ?? null);
      } catch {
        if (active) setOrder(getLocalOrders()[0] ?? null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, []);

  if (!mounted) return null;

  const paymentId = order?.paymentId;
  const billing: any = (order as any)?.billing;
  const isB2BInvoice = !!billing?.isB2BInvoice;
  const orderNote = order?.note?.trim(); // NEW

  const copyToClipboard = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setSnackbarMsg(message);
      setSnackbar(true);
    } catch {
      /* clipboard unavailable - ignore silently */
    }
  };

  const handleDownloadInvoice = async () => {
    if (!order) return;
    try {
      await generateInvoice(order);
    } catch (err) {
      console.error("Invoice generation failed:", err);
      setSnackbarMsg("Could not generate invoice. Please try again.");
      setSnackbar(true);
    }
  };

  const StepBar = (
    <Box className="no-print" sx={{ background: C.surface, borderBottom: `1px solid ${C.border}`, px: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: 960, mx: "auto", height: 56 }}>
        {["Cart", "Checkout", "Confirmation"].map((label, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: 3.5 }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: "50%",
              border: `1.5px solid ${C.green}`, background: C.green,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
            </Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: sans, color: C.green }}>
              {label}
            </Typography>
            {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <>
        <Box className="no-print"><Navbar /></Box>
        {StepBar}
        <Box sx={{
          background: C.paper, minHeight: "78vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: sans,
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={32} sx={{ color: C.ink }} />
            <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>
              Loading your order…
            </Typography>
          </Box>
        </Box>
        <Box className="no-print"><Footer /></Box>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Box className="no-print"><Navbar /></Box>
        {StepBar}
        <Box sx={{ background: C.paper, minHeight: "78vh", display: "flex", alignItems: "center", py: { xs: 6, md: 10 }, fontFamily: sans }}>
          <Container maxWidth="sm">
            <Box sx={{ ...sectionSx, textAlign: "center", px: { xs: 4, md: 7 }, py: { xs: 6, md: 8 } }}>
              <Box sx={{
                width: 88, height: 88, borderRadius: "50%",
                background: C.surfaceSunk, border: `2px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 3,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 38, color: C.textMuted }} />
              </Box>
              <Typography sx={{ fontSize: "21px", fontWeight: 600, color: C.ink, mb: 1, fontFamily: serif }}>
                No recent order found
              </Typography>
              <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 4, lineHeight: 1.8, fontFamily: sans }}>
                We couldn't find an order to display. If you just placed one, try checking your email for confirmation.
              </Typography>
              <Button
                onClick={() => router.push("/products")}
                sx={{
                  background: C.ink, color: "#fff", borderRadius: "12px", px: 4.5, py: 1.5,
                  fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "14px",
                  boxShadow: "0 6px 18px rgba(28,26,22,0.2)",
                  "&:hover": { background: "#000" },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Container>
        </Box>
        <Box className="no-print"><Footer /></Box>
      </>
    );
  }

  // SUCCESS STATE
  return (
    <>
      <Box className="no-print"><Navbar /></Box>
      {StepBar}

      <Box sx={{ background: C.paper, minHeight: "100vh", pb: 8, fontFamily: sans }}>
        <Container maxWidth="lg">

          {/* Hero success card - screen only, not part of the printed receipt */}
          <Box className="no-print" sx={{ ...sectionSx, textAlign: "center", px: { xs: 3, md: 6 }, py: { xs: 5, md: 6 }, mt: 3.5, mb: 2.5 }}>

            <Box sx={{ position: "relative", width: 84, height: 84, mx: "auto", mb: 3 }}>
              <Box className="order-success-echo" sx={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: `2px solid ${C.green}`,
              }} />
              <Box className="order-success-ring" sx={{
                width: 84, height: 84, borderRadius: "50%",
                background: C.greenLight, border: `2px solid ${C.greenBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" fill={C.green} />
                  <path
                    className="order-success-check"
                    d="M12 20.5l5.5 5.5L29 14"
                    stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  />
                </svg>
              </Box>
            </Box>

            <Typography sx={{ fontSize: { xs: "23px", md: "29px" }, fontWeight: 600, color: C.ink, mb: 1, fontFamily: serif, letterSpacing: "-0.3px" }}>
              Order placed successfully
            </Typography>
            <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 3, fontFamily: sans }}>
              Thank you for shopping with us. A confirmation has been sent to your registered email.
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, justifyContent: "center" }}>
              <Box
                onClick={() => copyToClipboard(order.orderId, "Order ID copied to clipboard!")}
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  background: C.surfaceSunk, border: `1px solid ${C.border}`,
                  borderRadius: "10px", px: 1.8, py: 1, cursor: "pointer",
                  transition: "all .15s",
                  "&:hover": { borderColor: C.ink },
                }}
              >
                <Typography sx={{ fontSize: "11px", color: C.textMuted, fontWeight: 600, fontFamily: sans }}>
                  Order ID
                </Typography>
                <Typography sx={{ fontSize: "12.5px", color: C.ink, fontWeight: 800, fontFamily: sans, letterSpacing: "0.3px" }}>
                  {order.orderId}
                </Typography>
                <ContentCopyRoundedIcon sx={{ fontSize: 13, color: C.textMuted }} />
              </Box>

              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 1,
                background: C.navyLight, border: `1px solid ${C.navyBorder}`,
                borderRadius: "10px", px: 1.8, py: 1,
              }}>
                <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: C.navy }} />
                <Typography sx={{ fontSize: "12.5px", color: C.navy, fontWeight: 700, fontFamily: sans }}>
                  Arriving {formatDate(order.estimatedDeliveryStart)} – {formatDate(order.estimatedDeliveryEnd)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* PRINTABLE RECEIPT - only this block is shown when printing. */}
          <Box className="print-receipt">

            {/* Invoice letterhead card */}
            <Box className="print-card" sx={{ ...sectionSx, mb: 2.75 }}>
              <Box sx={{
                display: "flex", flexWrap: "wrap", justifyContent: "space-between",
                gap: 3, px: { xs: 3, md: 4.5 }, py: { xs: 3, md: 3.6 },
                background: `linear-gradient(180deg, ${C.surfaceWarm} 0%, ${C.surface} 100%)`,
                borderBottom: `1px solid ${C.borderLight}`,
              }}>
                <Box sx={{ display: "flex", gap: 1.8, minWidth: 260 }}>
                  <CompanyLogoMark />
                  <Box>
                    <Typography sx={{ fontSize: "16px", fontWeight: 700, color: C.ink, fontFamily: serif, letterSpacing: "-0.2px", lineHeight: 1.2 }}>
                      {COMPANY.name}
                    </Typography>
                    <Typography sx={{ fontSize: "11.5px", color: C.textSub, fontFamily: sans, mt: 0.4, lineHeight: 1.6 }}>
                      {COMPANY.legalName}<br />
                      {COMPANY.addressLine1}<br />
                      {COMPANY.addressLine2}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.6, mt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PhoneOutlinedIcon sx={{ fontSize: 12, color: C.textMuted }} />
                        <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>{COMPANY.phone}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <EmailOutlinedIcon sx={{ fontSize: 12, color: C.textMuted }} />
                        <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>{COMPANY.email}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LanguageOutlinedIcon sx={{ fontSize: 12, color: C.textMuted }} />
                        <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>{COMPANY.website}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ textAlign: { xs: "left", sm: "right" }, minWidth: 220 }}>
                  <Typography sx={{
                    fontSize: "20px", fontWeight: 800, color: C.ink, fontFamily: sans,
                    letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1,
                  }}>
                    Invoice
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans, mt: 0.8 }}>
                    Invoice No.
                  </Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans, mb: 0.8 }}>
                    {order.orderId}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>
                    Invoice Date
                  </Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>
                    {formatDate(order.placedAt)}
                  </Typography>
                  <Box className="no-print" sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.5, mt: 1.2,
                    background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                    borderRadius: "20px", px: 1.3, py: 0.45,
                  }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 12, color: C.green }} />
                    <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                      {order.paymentMethod === "upi" ? "Paid" : "Confirmed"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: isB2BInvoice ? "1fr 1fr" : "1fr" },
                gap: 2.5, px: { xs: 3, md: 4.5 }, py: { xs: 2.6, md: 2.8 },
              }}>
                <Box>
                  <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".6px", fontFamily: sans, mb: 0.8 }}>
                    Billed To
                  </Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans, mb: 0.3 }}>
                    {order.address.name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.7, fontFamily: sans }}>
                    {order.address.line1}
                    {order.address.line2 ? <>, {order.address.line2}</> : null}<br />
                    {order.address.city}{order.address.state ? `, ${order.address.state}` : ""} – {order.address.pin}<br />
                    {order.address.phone}
                  </Typography>
                </Box>

                {isB2BInvoice && (
                  <Box sx={{
                    borderLeft: { xs: "none", sm: `1px dashed ${C.border}` },
                    pl: { xs: 0, sm: 2.5 },
                  }}>
                    <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".6px", fontFamily: sans, mb: 0.8 }}>
                      GST Details
                    </Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans, mb: 0.3 }}>
                      {billing.companyName || "—"}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.7, fontFamily: sans }}>
                      GSTIN: {billing.gstNumber}<br />
                      Seller GSTIN: {COMPANY.gstin}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Items ordered */}
            <Box className="print-card" sx={sectionSx}>
              <Box sx={headerSx}>
                <Box sx={headerIconWrapSx}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 15, color: C.navy }} />
                </Box>
                <Typography sx={{ fontSize: "14.5px", fontWeight: 600, color: C.ink, fontFamily: serif }}>
                  Items ordered ({order.totalQty})
                </Typography>
              </Box>
              <Box sx={{ px: "24px" }}>
                {order.items.map((item, idx) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex", alignItems: "center", gap: 2,
                      py: 2.2,
                      borderBottom: idx < order.items.length - 1 ? `1px solid ${C.borderLight}` : "none",
                    }}
                  >
                    <Box className="no-print" sx={{
                      width: 66, height: 66, borderRadius: "11px",
                      background: C.surfaceSunk, border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, p: 1,
                    }}>
                      <img
                        src={proxyImage(item.image)}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.brassDeep, textTransform: "uppercase", letterSpacing: "1px", mb: 0.3, fontFamily: sans }}>
                        {item.brand}
                      </Typography>
                      <Typography sx={{
                        fontSize: "13px", fontWeight: 600, color: C.ink, lineHeight: 1.4,
                        fontFamily: sans,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: "11.5px", color: C.textMuted, mt: 0.4, fontFamily: sans }}>
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.ink, flexShrink: 0, fontFamily: sans }}>
                      ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ height: { xs: 8, md: 12 } }} />
            </Box>

            {/* Delivery + payment */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.2, mt: 2.75 }}>

              <Box className="print-card" sx={sectionSx}>
                <Box sx={headerSx}>
                  <Box sx={headerIconWrapSx}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 15, color: C.navy }} />
                  </Box>
                  <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: C.ink, fontFamily: serif }}>
                    Delivery address
                  </Typography>
                </Box>
                <Box sx={{ p: "19px 21px" }}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.5,
                    background: C.surfaceSunk, color: C.textSub,
                    fontSize: "9px", fontWeight: 700, px: 0.9, py: 0.3,
                    borderRadius: "4px", textTransform: "uppercase", letterSpacing: ".5px",
                    mb: 0.8, fontFamily: sans,
                  }}>
                    {order.address.tag === "Home"
                      ? <HomeOutlinedIcon sx={{ fontSize: 10 }} />
                      : <BusinessOutlinedIcon sx={{ fontSize: 10 }} />}
                    {order.address.tag || "Address"}
                  </Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, mb: 0.4, fontFamily: sans }}>
                    {order.address.name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.7, fontFamily: sans }}>
                    {order.address.line1}
                    {order.address.line2 ? <><br />{order.address.line2}</> : null}
                    <br />{order.address.phone}
                  </Typography>
                </Box>
              </Box>

              <Box className="print-card" sx={sectionSx}>
                <Box sx={headerSx}>
                  <Box sx={headerIconWrapSx}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="5" width="20" height="14" rx="2.5" stroke={C.navy} strokeWidth="1.8"/>
                      <rect x="2" y="9" width="20" height="2.6" fill={C.navy}/>
                    </svg>
                  </Box>
                  <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: C.ink, fontFamily: serif }}>
                    Payment method
                  </Typography>
                </Box>
                <Box sx={{ p: "19px 21px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: paymentId ? 1.6 : 0 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>
                      {order.paymentMethod === "upi" ? "UPI / Online payment" : "Cash on Delivery"}
                    </Typography>
                    <Box sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.5,
                      background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                      borderRadius: "20px", px: 1.3, py: 0.45,
                    }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 12, color: C.green }} />
                      <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                        {order.paymentMethod === "upi" ? "Paid" : "Confirmed"}
                      </Typography>
                    </Box>
                  </Box>

                  {paymentId && (
                    <Box
                      onClick={() => copyToClipboard(paymentId, "Transaction ID copied to clipboard!")}
                      sx={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: C.surfaceSunk, border: `1px solid ${C.border}`,
                        borderRadius: "10px", px: 1.6, py: 1.1, cursor: "pointer",
                        transition: "all .15s",
                        "&:hover": { borderColor: C.brassDeep },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: "9.5px", color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px", fontFamily: sans, mb: 0.3 }}>
                          Transaction ID
                        </Typography>
                        <Typography sx={{ fontSize: "12.5px", color: C.ink, fontWeight: 700, fontFamily: sans, letterSpacing: "0.2px", wordBreak: "break-all" }}>
                          {paymentId}
                        </Typography>
                      </Box>
                      <ContentCopyRoundedIcon className="no-print" sx={{ fontSize: 14, color: C.textMuted, flexShrink: 0, ml: 1 }} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* NEW: Order note — only shows when the customer actually left one */}
            {orderNote && (
              <Box className="print-card" sx={{ ...sectionSx, mt: 2.2 }}>
                <Box sx={headerSx}>
                  <Box sx={headerIconWrapSx}>
                    <EditNoteRoundedIcon sx={{ fontSize: 15, color: C.navy }} />
                  </Box>
                  <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: C.ink, fontFamily: serif }}>
                    Order note
                  </Typography>
                </Box>
                <Box sx={{ p: "19px 21px" }}>
                  <Typography sx={{ fontSize: "12.5px", color: C.textSub, lineHeight: 1.75, fontFamily: sans, whiteSpace: "pre-wrap" }}>
                    {orderNote}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Totals */}
            <Box className="print-card" sx={{ ...sectionSx, mt: 2.2 }}>
              <Box sx={headerSx}>
                <Box sx={headerIconWrapSx}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 15, color: C.navy }} />
                </Box>
                <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: C.ink, fontFamily: serif }}>
                  Order total
                </Typography>
              </Box>
              <Box sx={{ px: "21px", py: "19px" }}>
                {[
                  { label: `Subtotal (${order.totalQty} item${order.totalQty !== 1 ? "s" : ""})`, value: `₹${order.subtotal.toLocaleString("en-IN")}`, color: C.ink },
                  ...(order.discount > 0 ? [{ label: "Coupon discount", value: `−₹${order.discount.toLocaleString("en-IN")}`, color: C.green }] : []),
                  { label: "Delivery", value: order.shipping === 0 ? "FREE" : `₹${order.shipping}`, color: order.shipping === 0 ? C.green : C.ink },
                  {
                    label: "GST (18%)",
                    value: billing?.gstAmount != null ? `Included · ₹${billing.gstAmount.toLocaleString("en-IN")}` : "Included",
                    color: C.ink,
                  },
                ].map((row, i) => (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                    <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans }}>{row.value}</Typography>
                  </Box>
                ))}

                <Divider sx={{ borderColor: C.borderLight, my: 1.7 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>Total paid</Typography>
                  <Typography sx={{ fontSize: "22px", fontWeight: 600, color: C.ink, letterSpacing: "-.5px", fontFamily: serif }}>
                    ₹{order.grandTotal.toLocaleString("en-IN")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography sx={{
              display: "none",
              "@media print": { display: "block" },
              fontSize: "9.5px", color: C.textMuted, fontFamily: sans,
              textAlign: "center", mt: 3,
            }}>
              This is a system-generated receipt and does not require a signature. · {COMPANY.name} · {COMPANY.email}
            </Typography>
          </Box>
          {/* End printable receipt */}

          {/* Action buttons - screen only */}
          <Box className="no-print" sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, mt: 2.75 }}>
            <Button
              startIcon={<StorefrontOutlinedIcon sx={{ fontSize: 16 }} />}
              onClick={() => router.push("/products")}
              sx={{
                flex: { xs: "1 1 100%", sm: "0 1 auto" },
                height: 46, borderRadius: "11px", fontWeight: 700, fontSize: "13px",
                fontFamily: sans, textTransform: "none",
                background: C.ink, color: "#fff", px: 2.6,
                boxShadow: "0 6px 18px rgba(28,26,22,0.2)",
                "&:hover": { background: "#000" },
              }}
            >
              Continue Shopping
            </Button>
            <Button
              startIcon={<ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />}
              onClick={handleDownloadInvoice}
              sx={{
                flex: { xs: "1 1 100%", sm: "0 1 auto" },
                height: 46, borderRadius: "11px", fontWeight: 700, fontSize: "13px",
                fontFamily: sans, textTransform: "none",
                background: C.navy, color: "#fff", px: 2.6,
                boxShadow: "0 6px 18px rgba(24,38,68,0.25)",
                "&:hover": { background: "#101c34" },
              }}
            >
              Download Invoice
            </Button>
            <Button
              startIcon={<PrintOutlinedIcon sx={{ fontSize: 16 }} />}
              onClick={() => window.print()}
              sx={{
                flex: { xs: "1 1 100%", sm: "0 1 auto" },
                height: 46, borderRadius: "11px", fontWeight: 700, fontSize: "13px",
                fontFamily: sans, textTransform: "none",
                border: `1.5px solid ${C.border}`, color: C.ink, px: 2.6,
                "&:hover": { borderColor: C.ink, background: C.surfaceSunk },
              }}
            >
              Print Receipt
            </Button>
          </Box>

          {/* Trust strip - screen only */}
          <Box className="no-print" sx={{ ...sectionSx, display: "flex", mt: 2.75 }}>
            {TRUST.map((t, i) => (
              <Box key={i} sx={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: 0.6, py: 1.7, px: 0.5,
                borderRight: i < TRUST.length - 1 ? `1px solid ${C.borderLight}` : "none",
                textAlign: "center",
              }}>
                <Box sx={{
                  width: 30, height: 30, borderRadius: "50%", background: "#fff",
                  border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 5px rgba(28,26,22,0.06)",
                }}>
                  {t.icon}
                </Box>
                <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.ink, lineHeight: 1.2, fontFamily: sans }}>
                  {t.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box className="no-print"><Footer /></Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={2200}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        className="no-print"
      >
        <Alert severity="success" sx={{ borderRadius: "11px", fontWeight: 700, fontFamily: sans, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}