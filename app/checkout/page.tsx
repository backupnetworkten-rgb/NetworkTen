"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Container, Typography, Button, TextField,
  Divider, Radio, RadioGroup, FormControlLabel,
  Checkbox, FormControl, Select, MenuItem, InputLabel,
  Snackbar, Alert, Collapse, CircularProgress,
} from "@mui/material";
import LocalShippingOutlinedIcon     from "@mui/icons-material/LocalShippingOutlined";
import QrCode2OutlinedIcon           from "@mui/icons-material/QrCode2Outlined";
import CurrencyRupeeOutlinedIcon     from "@mui/icons-material/CurrencyRupeeOutlined";
import ReceiptLongOutlinedIcon       from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon              from "@mui/icons-material/LockOutlined";
import VerifiedOutlinedIcon          from "@mui/icons-material/VerifiedOutlined";
import CheckCircleRoundedIcon        from "@mui/icons-material/CheckCircleRounded";
import AddRoundedIcon                from "@mui/icons-material/AddRounded";
import HomeOutlinedIcon              from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon          from "@mui/icons-material/BusinessOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import SaveOutlinedIcon              from "@mui/icons-material/SaveOutlined";
import {
  getCart, onCartChange, cartTotal, clearCart, CartItem,
} from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";
import { saveLastOrder, generateOrderId } from "@/lib/orderStore";
import { auth } from "@/lib/firebase";
import { Address } from "@/types/user";
import { subscribeToCurrentUser } from "@/services/userService";

const C = {
  pageBg:      "#f5f5f7",
  surface:     "#ffffff",
  surfaceWarm: "#fafafa",
  surfaceGray: "#f2f2f2",
  border:      "#e8e8e8",
  borderLight: "#f0f0f0",
  heading:     "#0a0a0a",
  text:        "#1a1a1a",
  textSub:     "#555555",
  textMuted:   "#999999",
  red:         "#dc2626",
  redLight:    "#fef2f2",
  blue:        "#1a5fb4",
  blueLight:   "#eff6ff",
  blueBorder:  "#bfdbfe",
  green:       "#16a34a",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
};

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

if (typeof document !== "undefined" && !document.getElementById("checkout-font")) {
  const s = document.createElement("style");
  s.id = "checkout-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    * { box-sizing: border-box; }
  `;
  document.head.appendChild(s);
}

const TRUST = [
  { label: "Free Delivery", sub: "Above ₹1000", bg: "#dbeafe",
    icon: (
      <svg width="22" height="16" viewBox="0 0 40 24" fill="none">
        <rect x="1" y="3" width="21" height="14" rx="2" fill="#2563eb"/>
        <path d="M22 7h6l4 7v4H22V7z" fill="#1d4ed8"/>
        <circle cx="7" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
        <circle cx="29" cy="20" r="3" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.5"/>
      </svg>
    )},
  { label: "2 Yr Warranty", sub: "Official", bg: "#eef3ff",
    icon: (
      <svg width="16" height="20" viewBox="0 0 26 30" fill="none">
        <path d="M13 1L1 6v9c0 6 4.5 11.5 12 13 7.5-1.5 12-7 12-13V6L13 1z" fill="#1a5fb4"/>
        <text x="13" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">2 YR</text>
      </svg>
    )},
  { label: "GST Invoice", sub: "Included", bg: "#f0fdf4",
    icon: (
      <svg width="15" height="18" viewBox="0 0 24 28" fill="none">
        <rect x="1" y="1" width="18" height="22" rx="2" fill="#16a34a"/>
        <rect x="4" y="4" width="11" height="2" rx="1" fill="#bbf7d0"/>
        <rect x="4" y="8" width="8" height="1.5" rx="1" fill="#bbf7d0"/>
        <circle cx="17" cy="22" r="6" fill="#15803d" stroke="#fff" strokeWidth="1.5"/>
        <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  { label: "7-Day Return", sub: "Easy & Free", bg: "#fff7ed",
    icon: (
      <svg width="20" height="17" viewBox="0 0 30 26" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" fill="#d97706"/>
        <path d="M7 11h10M7 15h7" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 2c3.5 2 5 5.5 5 8.5s-1.5 6.5-5 8.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M23 3l4-2.5-1.5 5.5z" fill="#f59e0b"/>
      </svg>
    )},
];

const sectionSx = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: "14px",
  overflow: "hidden",
  mb: 2,
  boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
};

const headerSx = {
  display: "flex", alignItems: "center", gap: 1.2,
  px: "22px", py: "16px",
  borderBottom: `1px solid ${C.borderLight}`,
  background: C.surfaceWarm,
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px", fontSize: "13px", fontFamily: sans,
    "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: C.heading },
    "&.Mui-focused fieldset": { borderColor: C.heading, boxShadow: "0 0 0 3px rgba(10,10,10,.06)" },
  },
  "& .MuiInputLabel-root": { fontSize: "13px", fontFamily: sans },
};

function genId() {
  return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items,          setItems]          = useState<CartItem[]>([]);
  const [mounted,        setMounted]        = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddr,   setSelectedAddr]   = useState("");
  const [showNewAddr,    setShowNewAddr]    = useState(false);
  const [savingAddr,     setSavingAddr]     = useState(false);
  const [payMethod,      setPayMethod]      = useState<"upi" | "cod">("upi");
  const [selectedUpi,    setSelectedUpi]    = useState("gpay");
  const [coupon,         setCoupon]         = useState("");
  const [applied,        setApplied]        = useState<string | null>(null);
  const [couponErr,      setCouponErr]      = useState("");
  const [snackbar,       setSnackbar]       = useState(false);
  const [snackbarMsg,    setSnackbarMsg]    = useState("Order placed successfully!");
  const [snackbarSev,    setSnackbarSev]    = useState<"success" | "error" | "info">("success");

  const [newAddr, setNewAddr] = useState({
    name: "", phone: "", line1: "", line2: "",
    city: "", pin: "", state: "", type: "Home",
  });

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
    const unsubCart = onCartChange(() => setItems(getCart()));

    let unsubUser: (() => void) | undefined;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        unsubUser = subscribeToCurrentUser((userData) => {
          const addresses = userData?.addresses ?? [];
          setSavedAddresses(addresses);
          if (addresses.length) {
            setSelectedAddr((prev) => prev || addresses[0].id);
          }
        });
      } else {
        setSavedAddresses([]);
        setSelectedAddr("");
      }
    });

    return () => {
      unsubCart();
      unsubUser?.();
      unsubAuth();
    };
  }, []);

  if (!mounted) return null;

  const subtotal   = cartTotal(items);
  const discount   = applied === "NETWORK10" ? Math.round(subtotal * 0.1) : 0;
  const shipping   = subtotal >= 1000 ? 0 : 99;
  const grandTotal = subtotal - discount + shipping;
  const totalQty   = items.reduce((s, i) => s + i.quantity, 0);

  const showSnack = (msg: string, sev: "success" | "error" | "info") => {
    setSnackbarMsg(msg);
    setSnackbarSev(sev);
    setSnackbar(true);
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NETWORK10") {
      setApplied("NETWORK10");
      setCouponErr("");
    } else {
      setCouponErr("Invalid coupon code.");
    }
  };

  const handleSaveAddress = async () => {
    const { name, phone, line1, city, pin, state } = newAddr;
    if (!name || !phone || !line1 || !city || !pin || !state) {
      showSnack("Please fill all required fields.", "error");
      return;
    }
    setSavingAddr(true);
    try {
      const newAddressEntry: Address = {
        id:    genId(),
        name:  newAddr.name,
        phone: newAddr.phone,
        line1: newAddr.line1,
        line2: newAddr.line2,
        city:  newAddr.city,
        pin:   newAddr.pin,
        state: newAddr.state,
        tag:   newAddr.type as "Home" | "Office" | "Other",
      };
      const { updateUserAddresses } = await import("@/services/userService");
      await updateUserAddresses([...savedAddresses, newAddressEntry]);
      setSelectedAddr(newAddressEntry.id);
      setShowNewAddr(false);
      setNewAddr({ name: "", phone: "", line1: "", line2: "", city: "", pin: "", state: "", type: "Home" });
      showSnack("Address saved successfully!", "success");
    } catch (err) {
      console.error("Failed to save address:", err);
      showSnack("Could not save address. Please try again.", "error");
    } finally {
      setSavingAddr(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!savedAddresses.length) {
      showSnack("Please add a delivery address first.", "error");
      return;
    }
    const addr = savedAddresses.find((a) => a.id === selectedAddr) || savedAddresses[0];
    const placedAt      = new Date();
    const deliveryStart = new Date(placedAt);
    deliveryStart.setDate(deliveryStart.getDate() + 3);
    const deliveryEnd   = new Date(placedAt);
    deliveryEnd.setDate(deliveryEnd.getDate() + 6);

    saveLastOrder({
      orderId: generateOrderId(),
      placedAt: placedAt.toISOString(),
      items: items.map((i) => ({
        id: i.id, name: i.name, brand: i.brand,
        image: i.image, salePrice: i.salePrice, quantity: i.quantity,
      })),
      subtotal, discount, shipping, grandTotal, totalQty,
      paymentMethod: payMethod,
      address: {
        name:  addr.name,
        line1: addr.line1,
        line2: addr.line2,
        phone: addr.phone,
        tag:   addr.tag,
      },
      estimatedDeliveryStart: deliveryStart.toISOString(),
      estimatedDeliveryEnd:   deliveryEnd.toISOString(),
    });

    clearCart();
    router.push("/order-success");
  };

  const PAY_METHODS = [
    { id: "upi", icon: <QrCode2OutlinedIcon sx={{ fontSize: 24 }} />,       label: "UPI",              sub: "GPay, PhonePe, Paytm & more" },
    { id: "cod", icon: <CurrencyRupeeOutlinedIcon sx={{ fontSize: 24 }} />, label: "Cash on Delivery", sub: "Pay when it arrives" },
  ] as const;

  return (
    <>
      {/* Top bar */}
      <Box sx={{
        background: C.heading, px: 4, py: 1.9,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Typography sx={{ fontFamily: sans, fontSize: "19px", color: "#fff", fontWeight: 800, letterSpacing: "-0.4px" }}>
          Network<span style={{ color: "#5b9bf0" }}>Ten</span>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <LockOutlinedIcon sx={{ fontSize: 13, color: "#5b9bf0" }} />
          <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,.6)", fontWeight: 500, fontFamily: sans }}>
            Secure Checkout
          </Typography>
        </Box>
      </Box>

      {/* Step bar */}
      <Box sx={{ background: C.surface, borderBottom: `1px solid ${C.border}`, px: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 960, mx: "auto", height: 54 }}>
          {[
            { label: "Cart",         done: true },
            { label: "Checkout",     active: true },
            { label: "Confirmation" },
          ].map((s, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: 3.5 }}>
              <Box sx={{
                width: 22, height: 22, borderRadius: "50%",
                border: "1.5px solid",
                borderColor: s.done ? C.green : s.active ? C.heading : C.border,
                background:  s.done ? C.green : s.active ? C.heading : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {s.done
                  ? <CheckCircleRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
                  : <Typography sx={{ fontSize: "10px", fontWeight: 700, color: s.active ? "#fff" : C.textMuted, fontFamily: sans }}>{i + 1}</Typography>
                }
              </Box>
              <Typography sx={{
                fontSize: "12px", fontWeight: 600, fontFamily: sans,
                color: s.done ? C.green : s.active ? C.heading : C.textMuted,
              }}>
                {s.label}
              </Typography>
              {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 1 }} />}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ background: C.pageBg, minHeight: "100vh", pb: 8, fontFamily: sans }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
            gap: 2.5, pt: 3,
          }}>

            {/* ── LEFT ── */}
            <Box>

              {/* Delivery Address */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: C.blue }} />
                  <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Delivery address
                  </Typography>
                </Box>
                <Box sx={{ p: "20px 22px" }}>

                  {savedAddresses.length > 0 ? (
                    <RadioGroup value={selectedAddr} onChange={(e) => setSelectedAddr(e.target.value)}>
                      {savedAddresses.map((addr) => (
                        <Box
                          key={addr.id}
                          onClick={() => setSelectedAddr(addr.id)}
                          sx={{
                            border: "1.5px solid",
                            borderColor: selectedAddr === addr.id ? C.heading : C.border,
                            borderRadius: "10px",
                            p: "14px 16px", mb: 1.2, cursor: "pointer",
                            background: selectedAddr === addr.id ? C.surfaceWarm : C.surface,
                            display: "flex", alignItems: "flex-start", gap: 1.5,
                            transition: "all .15s",
                            "&:hover": { borderColor: C.heading },
                          }}
                        >
                          <Radio
                            value={addr.id}
                            size="small"
                            sx={{ p: 0, mt: 0.2, color: C.border, "&.Mui-checked": { color: C.heading } }}
                          />
                          <Box>
                            <Box sx={{
                              display: "inline-flex", alignItems: "center", gap: 0.5,
                              background: C.surfaceGray, color: C.textSub,
                              fontSize: "9px", fontWeight: 700, px: 0.9, py: 0.3,
                              borderRadius: "4px", textTransform: "uppercase", letterSpacing: ".5px",
                              mb: 0.6, fontFamily: sans,
                            }}>
                              {addr.tag === "Home"
                                ? <HomeOutlinedIcon sx={{ fontSize: 10 }} />
                                : <BusinessOutlinedIcon sx={{ fontSize: 10 }} />
                              }
                              {addr.tag}
                            </Box>
                            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, mb: 0.3, fontFamily: sans }}>
                              {addr.name}
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.6, fontFamily: sans }}>
                              {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                              {addr.city}{addr.state ? `, ${addr.state}` : ""} – {addr.pin}<br />
                              {addr.phone}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Box sx={{
                      background: C.blueLight, border: `1px solid ${C.blueBorder}`,
                      borderRadius: "10px", p: "14px 16px", mb: 1.5,
                    }}>
                      <Typography sx={{ fontSize: "12px", color: C.blue, fontFamily: sans }}>
                        No saved addresses yet. Add one below.
                      </Typography>
                    </Box>
                  )}

                  {/* Add new address toggle */}
                  <Box
                    onClick={() => setShowNewAddr(!showNewAddr)}
                    sx={{
                      border: `1.5px dashed ${showNewAddr ? C.heading : C.border}`,
                      borderRadius: "10px", p: "13px 16px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 1,
                      color: showNewAddr ? C.heading : C.textSub,
                      fontSize: "13px", fontWeight: 600, fontFamily: sans,
                      transition: "all .15s",
                      "&:hover": { borderColor: C.heading, color: C.heading },
                    }}
                  >
                    <AddRoundedIcon sx={{ fontSize: 16 }} />
                    {showNewAddr ? "Cancel" : "Add new address"}
                  </Box>

                  {/* New address form */}
                  <Collapse in={showNewAddr}>
                    <Divider sx={{ borderColor: C.borderLight, my: 2 }} />
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                      {[
                        { label: "Full name *",               key: "name",  col: 1 },
                        { label: "Phone *",                   key: "phone", col: 1 },
                        { label: "Address line 1 *",          key: "line1", col: 2, placeholder: "House / flat / block no., street name" },
                        { label: "Address line 2 (optional)", key: "line2", col: 2, placeholder: "Landmark, locality" },
                        { label: "City *",                    key: "city",  col: 1 },
                        { label: "PIN code *",                key: "pin",   col: 1 },
                      ].map((f) => (
                        <TextField
                          key={f.key}
                          size="small"
                          label={f.label}
                          placeholder={f.placeholder}
                          value={newAddr[f.key as keyof typeof newAddr]}
                          onChange={(e) => setNewAddr({ ...newAddr, [f.key]: e.target.value })}
                          sx={{ ...inputSx, gridColumn: f.col === 2 ? "1 / -1" : undefined }}
                        />
                      ))}

                      <FormControl size="small" sx={inputSx}>
                        <InputLabel sx={{ fontSize: "13px" }}>State *</InputLabel>
                        <Select
                          label="State *"
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          sx={{ borderRadius: "8px", fontSize: "13px", fontFamily: sans }}
                        >
                          {["Delhi","Uttar Pradesh","Haryana","Maharashtra","Karnataka",
                            "Tamil Nadu","Gujarat","Rajasthan","West Bengal","Punjab",
                            "Telangana","Kerala","Andhra Pradesh","Madhya Pradesh","Bihar"]
                            .map((s) => (
                              <MenuItem key={s} value={s} sx={{ fontSize: "13px", fontFamily: sans }}>{s}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <FormControl size="small" sx={inputSx}>
                        <InputLabel sx={{ fontSize: "13px" }}>Type</InputLabel>
                        <Select
                          label="Type"
                          value={newAddr.type}
                          onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })}
                          sx={{ borderRadius: "8px", fontSize: "13px", fontFamily: sans }}
                        >
                          {["Home", "Office", "Other"].map((t) => (
                            <MenuItem key={t} value={t} sx={{ fontSize: "13px", fontFamily: sans }}>{t}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Save Address button */}
                    <Button
                      fullWidth
                      onClick={handleSaveAddress}
                      disabled={savingAddr}
                      startIcon={
                        savingAddr
                          ? <CircularProgress size={14} color="inherit" />
                          : <SaveOutlinedIcon sx={{ fontSize: 15 }} />
                      }
                      sx={{
                        mt: 2, height: 42, borderRadius: "9px",
                        background: C.heading, color: "#fff",
                        fontWeight: 700, fontSize: "13px", fontFamily: sans,
                        textTransform: "none",
                        "&:hover": { background: "#222" },
                        "&.Mui-disabled": { background: C.border, color: C.textMuted },
                        transition: "all .15s",
                      }}
                    >
                      {savingAddr ? "Saving…" : "Save address"}
                    </Button>
                  </Collapse>
                </Box>
              </Box>

              {/* Payment */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <CurrencyRupeeOutlinedIcon sx={{ fontSize: 18, color: C.blue }} />
                  <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Payment method
                  </Typography>
                </Box>
                <Box sx={{ p: "20px 22px" }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1.4, mb: 2.5 }}>
                    {PAY_METHODS.map((m) => (
                      <Box
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        sx={{
                          border: "1.5px solid",
                          borderColor: payMethod === m.id ? C.heading : C.border,
                          borderRadius: "12px", p: "16px 14px", cursor: "pointer",
                          background: payMethod === m.id ? C.surfaceWarm : C.surface,
                          display: "flex", alignItems: "center", gap: 1.4,
                          transition: "all .15s", position: "relative",
                          "&:hover": { borderColor: C.heading },
                        }}
                      >
                        <Box sx={{
                          width: 42, height: 42, borderRadius: "10px", flexShrink: 0,
                          background: payMethod === m.id ? C.heading : C.surfaceGray,
                          color: payMethod === m.id ? "#fff" : C.heading,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all .15s",
                        }}>
                          {m.icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans, lineHeight: 1.3 }}>
                            {m.label}
                          </Typography>
                          <Typography sx={{ fontSize: "11px", color: C.textSub, fontFamily: sans, lineHeight: 1.3 }}>
                            {m.sub}
                          </Typography>
                        </Box>
                        {payMethod === m.id && (
                          <Box sx={{
                            position: "absolute", top: 10, right: 10,
                            width: 16, height: 16, borderRadius: "50%",
                            background: C.green,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <CheckCircleRoundedIcon sx={{ fontSize: 12, color: "#fff" }} />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>

                  {payMethod === "upi" && (
                    <Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, mb: 2 }}>
                        {[
                          { id: "gpay",    label: "GPay"    },
                          { id: "phonepe", label: "PhonePe" },
                          { id: "paytm",   label: "Paytm"   },
                          { id: "other",   label: "Other"   },
                        ].map((u) => (
                          <Box
                            key={u.id}
                            onClick={() => setSelectedUpi(u.id)}
                            sx={{
                              border: "1.5px solid",
                              borderColor: selectedUpi === u.id ? C.heading : C.border,
                              borderRadius: "8px", p: "10px 8px",
                              textAlign: "center", cursor: "pointer",
                              background: selectedUpi === u.id ? C.surfaceWarm : C.surface,
                              fontSize: "11px", fontWeight: 700, fontFamily: sans,
                              color: selectedUpi === u.id ? C.heading : C.textSub,
                              transition: "all .15s",
                              "&:hover": { borderColor: C.heading, color: C.heading },
                            }}
                          >
                            {u.label}
                          </Box>
                        ))}
                      </Box>
                      <TextField fullWidth size="small" label="UPI ID" placeholder="yourname@upi" sx={inputSx} />
                    </Box>
                  )}

                  {payMethod === "cod" && (
                    <Box sx={{
                      background: C.blueLight, border: `1px solid ${C.blueBorder}`,
                      borderRadius: "10px", p: "16px 18px",
                      display: "flex", gap: 1.5, alignItems: "flex-start",
                    }}>
                      <CurrencyRupeeOutlinedIcon sx={{ fontSize: 18, color: C.blue, flexShrink: 0, mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, mb: 0.5, fontFamily: sans }}>
                          Cash on Delivery
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.65, fontFamily: sans }}>
                          Pay in cash when your order arrives. Available for orders between ₹1,000 – ₹9,999.
                          A convenience fee of ₹49 may apply.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* GST & Notes */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: C.blue }} />
                  <Typography sx={{ fontSize: "14px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    GST &amp; billing details (optional)
                  </Typography>
                </Box>
                <Box sx={{ p: "20px 22px" }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
                    <TextField size="small" label="GST number"   placeholder="22AAAAA0000A1Z5"   sx={inputSx} />
                    <TextField size="small" label="Company name" placeholder="Your company name" sx={inputSx} />
                  </Box>
                  <TextField
                    fullWidth multiline minRows={2}
                    size="small" label="Order note (optional)"
                    placeholder="Any special instructions for your order…"
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Box>

            {/* ── RIGHT: SUMMARY ── */}
            <Box sx={{ position: { md: "sticky" }, top: { md: 20 }, alignSelf: "flex-start" }}>
              <Box sx={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: "14px", overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}>
                <Box sx={{
                  background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)",
                  px: 2.5, py: 2, display: "flex", alignItems: "center", gap: 1.2,
                }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "9px",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 17, color: "#fff" }} />
                  </Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#fff", fontFamily: sans, letterSpacing: "-0.2px" }}>
                    Order summary
                  </Typography>
                </Box>

                {/* Items */}
                <Box sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid ${C.borderLight}` }}>
                  {items.map((item, idx) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex", alignItems: "center", gap: 1.5, py: 1.5,
                        borderBottom: idx < items.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      }}
                    >
                      <Box sx={{
                        width: 52, height: 52, borderRadius: "8px",
                        background: C.surfaceGray, border: `1px solid ${C.border}`,
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
                        <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "1px", mb: 0.3, fontFamily: sans }}>
                          {item.brand}
                        </Typography>
                        <Typography sx={{
                          fontSize: "12px", fontWeight: 600, color: C.heading,
                          lineHeight: 1.35, whiteSpace: "nowrap",
                          overflow: "hidden", textOverflow: "ellipsis", fontFamily: sans,
                        }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: C.textMuted, mt: 0.3, fontFamily: sans }}>
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, flexShrink: 0, fontFamily: sans }}>
                        ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Coupon */}
                <Box sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid ${C.borderLight}` }}>
                  <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: ".5px", mb: 1, fontFamily: sans }}>
                    Coupon
                  </Typography>
                  {applied ? (
                    <Box sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                      borderRadius: "8px", px: 1.5, py: 1,
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <CheckCircleRoundedIcon sx={{ color: C.green, fontSize: 14 }} />
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                          {applied} — 10% off!
                        </Typography>
                      </Box>
                      <Button size="small" onClick={() => { setApplied(null); setCoupon(""); }}
                        sx={{ color: C.red, fontWeight: 700, fontSize: "11px", textTransform: "none", minWidth: 0, p: 0, fontFamily: sans }}>
                        Remove
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                          size="small" placeholder="Enter coupon code"
                          value={coupon}
                          onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponErr(""); }}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px", fontSize: "12px", fontFamily: sans,
                              "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
                              "&.Mui-focused fieldset": { borderColor: C.heading },
                            },
                          }}
                        />
                        <Button
                          onClick={applyCoupon}
                          sx={{
                            background: C.surfaceGray, border: `1.5px solid ${C.border}`,
                            borderRadius: "8px", fontWeight: 700, fontSize: "12px",
                            textTransform: "none", color: C.heading, px: 1.5, flexShrink: 0, fontFamily: sans,
                            "&:hover": { background: C.heading, color: "#fff", borderColor: C.heading },
                          }}
                        >
                          Apply
                        </Button>
                      </Box>
                      {couponErr && (
                        <Typography sx={{ fontSize: "11px", color: C.red, mt: 0.8, fontFamily: sans }}>{couponErr}</Typography>
                      )}
                    </Box>
                  )}
                </Box>

                {/* Totals */}
                <Box sx={{ px: 2.5, py: 2 }}>
                  {[
                    { label: `Subtotal (${totalQty} item${totalQty !== 1 ? "s" : ""})`, value: `₹${subtotal.toLocaleString("en-IN")}`, color: C.heading },
                    ...(discount > 0 ? [{ label: "Coupon discount", value: `−₹${discount.toLocaleString("en-IN")}`, color: C.green }] : []),
                    { label: "Delivery", value: shipping === 0 ? "FREE" : `₹${shipping}`, color: shipping === 0 ? C.green : C.heading },
                    { label: "Tax",      value: "Included", color: C.heading },
                  ].map((row, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.1 }}>
                      <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans }}>{row.value}</Typography>
                    </Box>
                  ))}

                  <Divider sx={{ borderColor: C.borderLight, my: 1.5 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Total payable</Typography>
                    <Typography sx={{ fontSize: "22px", fontWeight: 800, color: C.heading, letterSpacing: "-.5px", fontFamily: sans }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "10px", color: C.textMuted, textAlign: "right", mb: 2, fontFamily: sans }}>
                    Inclusive of all taxes &amp; charges
                  </Typography>

                  <Button
                    fullWidth
                    onClick={handlePlaceOrder}
                    sx={{
                      height: 50, borderRadius: "11px",
                      background: C.heading, color: "#fff",
                      fontWeight: 700, fontSize: "15px", fontFamily: sans,
                      textTransform: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                      display: "flex", alignItems: "center", gap: 1,
                      "&:hover": { background: "#222", boxShadow: "0 6px 20px rgba(0,0,0,0.22)" },
                      transition: "all .15s",
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 15 }} />
                    Place order · ₹{grandTotal.toLocaleString("en-IN")}
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, mt: 1.5 }}>
                    <VerifiedOutlinedIcon sx={{ fontSize: 12, color: C.blue }} />
                    <Typography sx={{ fontSize: "10px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>
                      100% secure · SSL encrypted
                    </Typography>
                  </Box>
                </Box>

                {/* Trust strip */}
                <Box sx={{ display: "flex", borderTop: `1px solid ${C.borderLight}` }}>
                  {TRUST.map((t, i) => (
                    <Box key={i} sx={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 0.5, py: 1.4, px: 0.5,
                      borderRight: i < TRUST.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      textAlign: "center",
                    }}>
                      <Box sx={{
                        width: 30, height: 30, borderRadius: "50%", background: t.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
                      }}>
                        {t.icon}
                      </Box>
                      <Typography sx={{ fontSize: "9px", fontWeight: 700, color: C.heading, lineHeight: 1.2, fontFamily: sans }}>
                        {t.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSev}
          sx={{ borderRadius: "10px", fontWeight: 700, fontFamily: sans, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}