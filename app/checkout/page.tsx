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
import RemoveRoundedIcon             from "@mui/icons-material/RemoveRounded";
import HomeOutlinedIcon              from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon          from "@mui/icons-material/BusinessOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import SaveOutlinedIcon              from "@mui/icons-material/SaveOutlined";
import ArrowBackRoundedIcon          from "@mui/icons-material/ArrowBackRounded";
import ShoppingCartOutlinedIcon      from "@mui/icons-material/ShoppingCartOutlined";
import VerifiedUserOutlinedIcon      from "@mui/icons-material/VerifiedUserOutlined";
import WorkspacePremiumOutlinedIcon  from "@mui/icons-material/WorkspacePremiumOutlined";
import GpsFixedRoundedIcon           from "@mui/icons-material/GpsFixedRounded";
import Inventory2OutlinedIcon        from "@mui/icons-material/Inventory2Outlined";
import PublicRoundedIcon             from "@mui/icons-material/PublicRounded";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import {
  getCart, onCartChange, cartTotal, clearCart, updateQuantity, CartItem,
} from "@/lib/cartStore";
import { proxyImage } from "@/lib/proxyImage";
import { saveLastOrder, generateOrderId, updateOrderShiprocketInfo } from "@/lib/orderStore";
import { auth } from "@/lib/firebase";
import { Address } from "@/types/user";
import { subscribeToCurrentUser } from "@/services/userService";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const C = {
  pageBg:      "#f6f6f8",
  surface:     "#ffffff",
  surfaceWarm: "#fafafa",
  surfaceGray: "#f2f2f3",
  border:      "#e6e6e8",
  borderLight: "#eeeeef",
  heading:     "#0a0a0a",
  text:        "#1a1a1a",
  textSub:     "#5b5b5f",
  textMuted:   "#9a9a9e",
  red:         "#dc2626",
  redLight:    "#fef2f2",
  blue:        "#1a5fb4",
  blueLight:   "#eff6ff",
  blueBorder:  "#bfdbfe",
  green:       "#16a34a",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
  gold:        "#b8873f",
  goldLight:   "#faf5eb",
  goldBorder:  "#ecdcb8",
  goldDeep:    "#8a6323",
  goldSoft:    "#d9b876",
};

const GST_RATE = 0.18;
const COD_CHARGE = 149;

const sans = "'Inter', 'DM Sans', system-ui, sans-serif";

// Cap the overall page width so content doesn't stretch edge-to-edge
// on ultra-wide monitors, while still allowing the background to be full-bleed.
const PAGE_MAX_WIDTH = 1440;

if (typeof document !== "undefined" && !document.getElementById("checkout-font")) {
  const s = document.createElement("style");
  s.id = "checkout-font";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    * { box-sizing: border-box; }
  `;
  document.head.appendChild(s);
}

const ORDER_NOTE_KEY = "nt_order_note";

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
  { label: "1 Yr Warranty", sub: "Official", bg: "#eef3ff",
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

const SHIPROCKET_POINTS = [
  { icon: <GpsFixedRoundedIcon sx={{ fontSize: 13 }} />,     label: "Real-time tracking" },
  { icon: <Inventory2OutlinedIcon sx={{ fontSize: 13 }} />,  label: "Secure packaging" },
  { icon: <PublicRoundedIcon sx={{ fontSize: 13 }} />,       label: "Pan-India network" },
];

const UPI_APPS = [
  { id: "gpay", label: "GPay", slug: "googlepay", tileBg: "#ffffff", tileBorder: "#e2e2e4", invert: false },
  { id: "phonepe", label: "PhonePe", slug: "phonepe", tileBg: "#5f259f", tileBorder: "#5f259f", invert: true },
  { id: "paytm", label: "Paytm", slug: "paytm", tileBg: "#00baf2", tileBorder: "#00baf2", invert: true },
  { id: "other", label: "Other UPI", slug: null, tileBg: "#1a1a1a", tileBorder: "#1a1a1a", invert: true },
] as const;

const sectionSx = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: "20px",
  overflow: "hidden",
  mb: 2.75,
  boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 14px 34px rgba(10,10,10,0.055)",
  transition: "box-shadow .2s ease",
};

const headerSx = {
  display: "flex", alignItems: "center", gap: 1.2,
  px: { xs: "18px", md: "26px" }, py: { xs: "16px", md: "19px" },
  borderBottom: `1px solid ${C.borderLight}`,
  background: C.surfaceWarm,
};

const bodySx = { p: { xs: "20px 18px", sm: "22px 20px", md: "24px 28px" } };

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px", fontSize: "13px", fontFamily: sans,
    "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: C.heading },
    "&.Mui-focused fieldset": { borderColor: C.heading, boxShadow: "0 0 0 3px rgba(10,10,10,.06)" },
  },
  "& .MuiInputLabel-root": { fontSize: "13px", fontFamily: sans },
};

function genId() {
  return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function isValidGstin(value: string) {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value.trim().toUpperCase());
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items,          setItems]          = useState<CartItem[]>([]);
  const [mounted,        setMounted]        = useState(false);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthed,       setIsAuthed]       = useState(false);

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
  const [placingOrder,   setPlacingOrder]   = useState(false);

  const [gstNumber,   setGstNumber]   = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstErr,       setGstErr]     = useState("");

  const [orderNote, setOrderNote] = useState("");

  const [newAddr, setNewAddr] = useState({
    name: "", phone: "", line1: "", line2: "",
    city: "", pin: "", state: "", type: "Home",
  });

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
    const unsubCart = onCartChange(() => setItems(getCart()));

    try {
      const savedNote = localStorage.getItem(ORDER_NOTE_KEY) || "";
      setOrderNote(savedNote);
    } catch {
      /* localStorage unavailable - ignore */
    }

    let unsubUser: (() => void) | undefined;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthed(true);
        setIsCheckingAuth(false);

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
        setIsAuthed(false);
        setIsCheckingAuth(false);

        localStorage.setItem("redirectAfterLogin", "/checkout");
        router.push("/login");
      }
    });

    return () => {
      unsubCart();
      unsubUser?.();
      unsubAuth();
    };
  }, [router]);

  useEffect(() => {
    if (document.getElementById("razorpay-checkout-js")) return;
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!mounted) return null;

  if (isCheckingAuth) {
    return (
      <>
        <Navbar />
        <Box sx={{
          minHeight: "60vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 2, background: C.pageBg,
        }}>
          <CircularProgress size={28} sx={{ color: C.heading }} />
          <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>
            Checking your session…
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  if (!isAuthed) return null;

  const gstinTrimmed = gstNumber.trim().toUpperCase();
  const isB2BInvoice = gstinTrimmed.length > 0 && isValidGstin(gstinTrimmed);

  const cartSubtotal = cartTotal(items);
  const discount      = applied === "NETWORK10" ? Math.round(cartSubtotal * 0.1) : 0;
  const shipping       = cartSubtotal >= 1000 ? 0 : 99;

  const codCharge = payMethod === "cod" ? COD_CHARGE : 0;

  const netGoodsValue = cartSubtotal - discount;

  const taxableValue = Math.round(netGoodsValue / (1 + GST_RATE));
  const gstAmount     = netGoodsValue - taxableValue;
  const grandTotal    = netGoodsValue + shipping + codCharge;

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

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

  const handleGstBlur = () => {
    if (gstNumber.trim().length === 0) {
      setGstErr("");
      return;
    }
    if (!isValidGstin(gstNumber.trim())) {
      setGstErr("Enter a valid 15-character GSTIN (e.g. 22AAAAA0000A1Z5).");
    } else {
      setGstErr("");
    }
  };

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOrderNote(value);
    try {
      localStorage.setItem(ORDER_NOTE_KEY, value);
    } catch {
      /* localStorage unavailable - ignore */
    }
  };

  const handleIncreaseQty = (item: CartItem) => {
    if (item.quantity >= item.stock) {
      showSnack("No more stock available for this item.", "info");
      return;
    }
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQty = (item: CartItem) => {
    if (item.quantity <= 1) return;
    updateQuantity(item.id, item.quantity - 1);
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
      const { saveAddress } = await import("@/services/userService");
      await saveAddress(newAddressEntry);
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

  const finalizeOrder = async (paymentId?: string) => {
    const addr = savedAddresses.find((a) => a.id === selectedAddr) || savedAddresses[0];

    if (!addr) {
      showSnack("No delivery address found. Please add one and try again.", "error");
      setPlacingOrder(false);
      return;
    }

    const placedAt      = new Date();
    const deliveryStart = new Date(placedAt);
    deliveryStart.setDate(deliveryStart.getDate() + 3);
    const deliveryEnd   = new Date(placedAt);
    deliveryEnd.setDate(deliveryEnd.getDate() + 6);

    const orderId = generateOrderId();

    const orderPayload = {
      orderId,
      placedAt: placedAt.toISOString(),
      items: items.map((i) => ({
        id: i.id, name: i.name, brand: i.brand,
        image: i.image, salePrice: i.salePrice, quantity: i.quantity,
      })),
      subtotal: cartSubtotal,
      discount,
      shipping,
      codCharge,
      grandTotal,
      totalQty,
      paymentMethod: payMethod,
      paymentId: paymentId || null,
      note: orderNote.trim(),
      address: {
        name:  addr.name,
        line1: addr.line1,
        line2: addr.line2,
        phone: addr.phone,
        tag:   addr.tag,
        city:  addr.city,
        state: addr.state,
        pin:   addr.pin,
      },
      estimatedDeliveryStart: deliveryStart.toISOString(),
      estimatedDeliveryEnd:   deliveryEnd.toISOString(),
      billing: {
        isB2BInvoice,
        gstNumber:    isB2BInvoice ? gstinTrimmed : "",
        companyName:  isB2BInvoice ? companyName.trim() : "",
        gstRate:      GST_RATE,
        taxableValue,
        gstAmount,
      },
    };

    try {
      await saveLastOrder(orderPayload);

      clearCart();
      try {
        localStorage.removeItem(ORDER_NOTE_KEY);
      } catch {
        /* ignore */
      }
      router.push("/order-success");

      const customerEmailToSend = auth.currentUser?.email ?? null;
      console.log(">>> Calling /api/orders/notify | customerEmail:", customerEmailToSend);

      fetch("/api/orders/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: orderPayload,
          customerEmail: customerEmailToSend,
        }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          console.log(">>> /api/orders/notify response:", res.status, data);
          if (!res.ok || data.success === false) {
            console.error(">>> Email notify did not succeed:", data);
          }
        })
        .catch((err) => {
          console.error(">>> Order notify request failed to even reach server:", err);
        });

      fetch("/api/shiprocket/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("Shiprocket FULL response:", JSON.stringify(data, null, 2));

          if (res.ok) {
            await updateOrderShiprocketInfo(orderId, {
              orderId: data.order_id,
              shipmentId: data.shipment_id,
              status: data.status,
            });
          } else {
            console.error("Shiprocket order creation failed:", data);
          }
        })
        .catch((err) => {
          console.error("Shiprocket push failed:", err);
        });
    } catch (err) {
      console.error("Order save failed:", err);
      showSnack(
        "Your payment succeeded, but we couldn't save the order. Please contact support with your payment ID.",
        "error"
      );
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!items.length) {
      showSnack("Your cart is empty.", "error");
      return;
    }
    if (!savedAddresses.length) {
      showSnack("Please add a delivery address first.", "error");
      return;
    }
    if (gstNumber.trim().length > 0 && !isValidGstin(gstNumber.trim())) {
      showSnack("Please enter a valid GSTIN or clear the field.", "error");
      return;
    }

    setPlacingOrder(true);

    if (payMethod === "cod") {
      await finalizeOrder();
      return;
    }

    try {
      if (!window.Razorpay) {
        showSnack("Payment gateway is still loading. Please try again in a second.", "error");
        setPlacingOrder(false);
        return;
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const order = await orderRes.json();

      if (!orderRes.ok || !order.id) {
        throw new Error(order.error || "Order creation failed");
      }

      const addr = savedAddresses.find((a) => a.id === selectedAddr) || savedAddresses[0];

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Network Ten",
        description: `Order for ${totalQty} item${totalQty !== 1 ? "s" : ""}`,
        image: "https://networkten.in/images/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await finalizeOrder(response.razorpay_payment_id);
            } else {
              showSnack("Payment verification failed. If money was deducted, it will be refunded automatically.", "error");
              setPlacingOrder(false);
            }
          } catch (err) {
            console.error("Verification request failed:", err);
            showSnack("Could not verify payment. Please contact support with your payment ID.", "error");
            setPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: () => setPlacingOrder(false),
        },
        prefill: {
          name: addr?.name || "",
        },
        notes: {
          address: addr ? `${addr.line1}, ${addr.city}` : "",
        },
        theme: { color: "#0a0a0a" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp: any) {
        console.error("Payment failed:", resp.error);
        showSnack(`Payment failed: ${resp.error?.description || "Please try again."}`, "error");
        setPlacingOrder(false);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      showSnack("Something went wrong while starting payment. Please try again.", "error");
      setPlacingOrder(false);
    }
  };

  const PAY_METHODS = [
    { id: "upi", icon: <QrCode2OutlinedIcon sx={{ fontSize: 24 }} />,       label: "UPI",              sub: "GPay, PhonePe, Paytm & more" },
    { id: "cod", icon: <CurrencyRupeeOutlinedIcon sx={{ fontSize: 24 }} />, label: "Cash on Delivery", sub: `Pay when it arrives · +₹${COD_CHARGE} fee` },
  ] as const;

  return (
    <>
      <Navbar />

      {/* HEADER BAR */}
      <Box sx={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft}, ${C.gold})`,
        },
      }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5, lg: 6 }, maxWidth: `${PAGE_MAX_WIDTH}px !important`, mx: "auto" }}>
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            py: { xs: 1.8, sm: 2.4 }, gap: 1.5, flexWrap: "wrap",
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.6, minWidth: 0 }}>
              <Box
                onClick={() => router.back()}
                role="button"
                aria-label="Go back"
                sx={{
                  width: 36, height: 36, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `1.5px solid ${C.border}`,
                  cursor: "pointer", flexShrink: 0,
                  transition: "all .15s",
                  "&:hover": { borderColor: C.heading, background: C.surfaceWarm },
                }}
              >
                <ArrowBackRoundedIcon sx={{ fontSize: 18, color: C.heading }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: { xs: "16px", sm: "19px" }, fontWeight: 800, color: C.heading, fontFamily: sans, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                  Checkout
                </Typography>
                <Typography sx={{ fontSize: "11.5px", color: C.textMuted, fontFamily: sans, mt: 0.1, whiteSpace: "nowrap" }}>
                  {totalQty} item{totalQty !== 1 ? "s" : ""} in your order
                </Typography>
              </Box>
            </Box>

            {/* Step trail — hidden on very small screens where it would crowd the header */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", order: { xs: 3, md: 2 }, flexBasis: { xs: "100%", md: "auto" }, justifyContent: { xs: "center", md: "flex-start" } }}>
              {[
                { label: "Cart",         done: true },
                { label: "Checkout",     active: true },
                { label: "Confirmation" },
              ].map((s, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: i < 2 ? { xs: 1.5, md: 3 } : 0 }}>
                  <Box sx={{
                    width: 21, height: 21, borderRadius: "50%",
                    border: "1.5px solid",
                    borderColor: s.done ? C.green : s.active ? C.heading : C.border,
                    background:  s.done ? C.green : s.active ? C.heading : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {s.done
                      ? <CheckCircleRoundedIcon sx={{ fontSize: 12, color: "#fff" }} />
                      : <Typography sx={{ fontSize: "9.5px", fontWeight: 700, color: s.active ? "#fff" : C.textMuted, fontFamily: sans }}>{i + 1}</Typography>
                    }
                  </Box>
                  <Typography sx={{
                    fontSize: "12px", fontWeight: 600, fontFamily: sans,
                    color: s.done ? C.green : s.active ? C.heading : C.textMuted,
                    display: { xs: "none", md: "block" },
                    whiteSpace: "nowrap",
                  }}>
                    {s.label}
                  </Typography>
                  {i < 2 && <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14, color: C.border, ml: 0.5, display: { xs: "none", md: "block" } }} />}
                </Box>
              ))}
            </Box>

            <Box sx={{
              display: "flex", alignItems: "center", gap: 0.7, flexShrink: 0, order: { xs: 2, md: 3 },
              background: `linear-gradient(135deg, ${C.goldLight} 0%, #fff 100%)`,
              border: `1px solid ${C.goldBorder}`,
              borderRadius: "20px", px: 1.7, py: 0.65,
              boxShadow: "0 2px 10px rgba(184,135,63,0.14)",
            }}>
              <LockOutlinedIcon sx={{ fontSize: 13, color: C.gold }} />
              <Typography sx={{ fontSize: "11.5px", color: C.gold, fontWeight: 700, fontFamily: sans, whiteSpace: "nowrap" }}>
                Secure Checkout
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* PAGE BODY */}
      <Box sx={{
        background: `linear-gradient(180deg, ${C.pageBg} 0%, #f0f0f3 100%)`,
        minHeight: "100vh", pb: 9, fontFamily: sans,
      }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5, lg: 6 }, maxWidth: `${PAGE_MAX_WIDTH}px !important`, mx: "auto" }}>

          {items.length === 0 ? (
            <Box sx={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", textAlign: "center",
              py: 10, gap: 2,
            }}>
              <Box sx={{
                width: 64, height: 64, borderRadius: "50%",
                background: C.surfaceGray, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: C.textMuted }} />
              </Box>
              <Typography sx={{ fontSize: "16px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                Your cart is empty
              </Typography>
              <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans, maxWidth: 320 }}>
                Add some items to your cart before proceeding to checkout.
              </Typography>
              <Button
                onClick={() => router.push("/")}
                sx={{
                  mt: 1, height: 42, px: 3, borderRadius: "9px",
                  background: C.heading, color: "#fff",
                  fontWeight: 700, fontSize: "13px", fontFamily: sans,
                  textTransform: "none",
                  "&:hover": { background: "#222" },
                }}
              >
                Continue shopping
              </Button>
            </Box>
          ) : (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr", lg: "1fr minmax(360px, 420px)" },
            alignItems: "start",
            gap: { xs: 3, md: 3.5, lg: 4 }, pt: { xs: 2.5, md: 4 },
          }}>

            <Box sx={{ minWidth: 0 }}>

              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "10px",
                    background: C.blueLight, display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 17, color: C.blue }} />
                  </Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Delivery address
                  </Typography>
                </Box>
                <Box sx={bodySx}>

                  {savedAddresses.length > 0 ? (
                    <RadioGroup value={selectedAddr} onChange={(e) => setSelectedAddr(e.target.value)}>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.2 }}>
                        {savedAddresses.map((addr) => (
                          <Box
                            key={addr.id}
                            onClick={() => setSelectedAddr(addr.id)}
                            sx={{
                              border: "1.5px solid",
                              borderColor: selectedAddr === addr.id ? C.gold : C.border,
                              borderRadius: "13px",
                              p: "16px 18px", cursor: "pointer",
                              background: selectedAddr === addr.id ? C.goldLight : C.surface,
                              display: "flex", alignItems: "flex-start", gap: 1.5,
                              transition: "all .15s",
                              boxShadow: selectedAddr === addr.id ? "0 4px 16px rgba(184,135,63,0.16)" : "none",
                              "&:hover": { borderColor: C.gold },
                              minWidth: 0,
                            }}
                          >
                            <Radio
                              value={addr.id}
                              size="small"
                              sx={{ p: 0, mt: 0.2, color: C.border, "&.Mui-checked": { color: C.gold } }}
                            />
                            <Box sx={{ minWidth: 0 }}>
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
                              <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.6, fontFamily: sans, wordBreak: "break-word" }}>
                                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                                {addr.city}{addr.state ? `, ${addr.state}` : ""} – {addr.pin}<br />
                                {addr.phone}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
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

                  <Box
                    onClick={() => setShowNewAddr(!showNewAddr)}
                    sx={{
                      border: `1.5px dashed ${showNewAddr ? C.heading : C.border}`,
                      borderRadius: "10px", p: "13px 16px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 1, mt: savedAddresses.length ? 1.4 : 0,
                      color: showNewAddr ? C.heading : C.textSub,
                      fontSize: "13px", fontWeight: 600, fontFamily: sans,
                      transition: "all .15s",
                      "&:hover": { borderColor: C.heading, color: C.heading },
                    }}
                  >
                    <AddRoundedIcon sx={{ fontSize: 16 }} />
                    {showNewAddr ? "Cancel" : "Add new address"}
                  </Box>

                  <Collapse in={showNewAddr}>
                    <Divider sx={{ borderColor: C.borderLight, my: 2 }} />
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
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
                          sx={{ ...inputSx, gridColumn: { xs: "1 / -1", sm: f.col === 2 ? "1 / -1" : undefined } }}
                        />
                      ))}

                      <FormControl size="small" sx={inputSx}>
                        <InputLabel sx={{ fontSize: "13px" }}>State *</InputLabel>
                        <Select
                          label="State *"
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          sx={{ borderRadius: "9px", fontSize: "13px", fontFamily: sans }}
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
                          sx={{ borderRadius: "9px", fontSize: "13px", fontFamily: sans }}
                        >
                          {["Home", "Office", "Other"].map((t) => (
                            <MenuItem key={t} value={t} sx={{ fontSize: "13px", fontFamily: sans }}>{t}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

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
                        mt: 2, height: 44, borderRadius: "10px",
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

              {/* GST & BILLING */}
              <Box sx={sectionSx}>
                <Box sx={headerSx}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "10px",
                    background: C.goldLight, display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <ReceiptLongOutlinedIcon sx={{ fontSize: 17, color: C.gold }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: "15px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                      GST &amp; billing details
                    </Typography>
                    <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans, mt: 0.1 }}>
                      Optional — for a company tax invoice
                    </Typography>
                  </Box>
                  {isB2BInvoice && (
                    <Box sx={{
                      display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0,
                      background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                      borderRadius: "20px", px: 1.2, py: 0.5,
                    }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 12, color: C.green }} />
                      <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: C.green, fontFamily: sans, whiteSpace: "nowrap" }}>
                        GSTIN verified
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={bodySx}>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 1.5 }}>
                    <TextField
                      size="small"
                      label="GST number"
                      placeholder="22AAAAA0000A1Z5"
                      value={gstNumber}
                      onChange={(e) => { setGstNumber(e.target.value.toUpperCase()); setGstErr(""); }}
                      onBlur={handleGstBlur}
                      error={!!gstErr}
                      helperText={gstErr || " "}
                      fullWidth
                      sx={inputSx}
                    />
                    <TextField
                      size="small"
                      label="Company name"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      fullWidth
                      sx={inputSx}
                    />
                  </Box>

                  <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans, mb: isB2BInvoice ? 1.5 : 0 }}>
                    Adding a GSTIN doesn't change your total — it only itemises GST on your invoice and records
                    it against your company.
                  </Typography>

                  {isB2BInvoice && (
                    <Box sx={{
                      background: `linear-gradient(135deg, ${C.goldLight} 0%, #fff 100%)`,
                      border: `1px solid ${C.goldBorder}`,
                      borderRadius: "11px", p: "14px 16px",
                      display: "flex", gap: 1.3, alignItems: "flex-start", mt: 1.5,
                    }}>
                      <Box sx={{
                        width: 30, height: 30, borderRadius: "8px", flexShrink: 0,
                        background: C.gold, display: "flex",
                        alignItems: "center", justifyContent: "center",
                      }}>
                        <VerifiedUserOutlinedIcon sx={{ fontSize: 15, color: "#fff" }} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: C.goldDeep, fontFamily: sans, mb: 0.3 }}>
                          Tax invoice will be issued to {companyName || "your company"}
                        </Typography>
                        <Typography sx={{ fontSize: "11.5px", color: C.textSub, fontFamily: sans, lineHeight: 1.6 }}>
                          GSTIN: <b>{gstinTrimmed}</b> · Taxable value ₹{taxableValue.toLocaleString("en-IN")} + GST ₹{gstAmount.toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <TextField
                    fullWidth multiline minRows={3}
                    size="small" label="Order note (optional)"
                    placeholder="Any special instructions for your order…"
                    value={orderNote}
                    onChange={handleOrderNoteChange}
                    sx={{ ...inputSx, mt: isB2BInvoice ? 2 : 1 }}
                  />
                </Box>
              </Box>

              {/* PAYMENT METHOD */}
              <Box sx={{ ...sectionSx, mb: 0 }}>
                <Box sx={headerSx}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: "10px",
                    background: C.blueLight, display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <CurrencyRupeeOutlinedIcon sx={{ fontSize: 17, color: C.blue }} />
                  </Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: 700, color: C.heading, fontFamily: sans }}>
                    Payment method
                  </Typography>
                </Box>
                <Box sx={bodySx}>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.4, mb: 2.5 }}>
                    {PAY_METHODS.map((m) => (
                      <Box
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        sx={{
                          border: "1.5px solid",
                          borderColor: payMethod === m.id ? C.gold : C.border,
                          borderRadius: "13px", p: "17px 15px", cursor: "pointer",
                          background: payMethod === m.id ? C.goldLight : C.surface,
                          display: "flex", alignItems: "center", gap: 1.4,
                          transition: "all .15s", position: "relative",
                          boxShadow: payMethod === m.id ? "0 4px 14px rgba(184,135,63,0.14)" : "none",
                          "&:hover": { borderColor: C.gold },
                          minWidth: 0,
                        }}
                      >
                        <Box sx={{
                          width: 42, height: 42, borderRadius: "10px", flexShrink: 0,
                          background: payMethod === m.id ? C.gold : C.surfaceGray,
                          color: payMethod === m.id ? "#fff" : C.heading,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all .15s",
                        }}>
                          {m.icon}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
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
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(4,1fr)", sm: "repeat(6,minmax(0,110px))" }, gap: { xs: 0.8, sm: 1.1 }, mb: 2 }}>
                        {UPI_APPS.map((u) => (
                          <Box
                            key={u.id}
                            onClick={() => setSelectedUpi(u.id)}
                            role="button"
                            aria-label={u.label}
                            sx={{
                              border: "1.5px solid",
                              borderColor: selectedUpi === u.id ? C.heading : C.border,
                              borderRadius: "12px",
                              p: { xs: "10px 4px 8px", sm: "12px 6px 10px" },
                              display: "flex", flexDirection: "column",
                              alignItems: "center", justifyContent: "center", gap: 0.8,
                              cursor: "pointer",
                              background: C.surface,
                              transition: "all .15s",
                              position: "relative",
                              boxShadow: selectedUpi === u.id
                                ? "0 4px 14px rgba(10,10,10,0.10)"
                                : "0 1px 2px rgba(0,0,0,0.02)",
                              "&:hover": { borderColor: C.heading, transform: "translateY(-1px)" },
                            }}
                          >
                            <Box sx={{
                              width: { xs: 32, sm: 38 }, height: { xs: 32, sm: 38 }, borderRadius: "10px",
                              background: u.tileBg,
                              border: `1px solid ${u.tileBorder}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              overflow: "hidden",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                            }}>
                              {u.slug ? (
                                <Box
                                  component="img"
                                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${u.slug}.svg`}
                                  alt={u.label}
                                  sx={{
                                    width: { xs: 16, sm: 19 }, height: { xs: 16, sm: 19 },
                                    filter: u.invert ? "invert(1)" : "none",
                                  }}
                                />
                              ) : (
                                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: { xs: 14, sm: 17 }, color: "#fff" }} />
                              )}
                            </Box>

                            <Typography sx={{
                              fontSize: { xs: "8.5px", sm: "9.5px" }, fontWeight: 700, fontFamily: sans,
                              color: selectedUpi === u.id ? C.heading : C.textSub,
                              letterSpacing: ".1px", textAlign: "center",
                            }}>
                              {u.label}
                            </Typography>

                            {selectedUpi === u.id && (
                              <Box sx={{
                                position: "absolute", top: -6, right: -6,
                                width: 16, height: 16, borderRadius: "50%",
                                background: C.green, display: "flex",
                                alignItems: "center", justifyContent: "center",
                                border: "2px solid #fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                              }}>
                                <CheckCircleRoundedIcon sx={{ fontSize: 9, color: "#fff" }} />
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                      <Typography sx={{ fontSize: "11px", color: C.textMuted, fontFamily: sans }}>
                        You'll choose your exact UPI app / enter your UPI ID inside the secure Razorpay payment window.
                      </Typography>
                    </Box>
                  )}

                  {payMethod === "cod" && (
                    <Box sx={{
                      background: `linear-gradient(135deg, ${C.goldLight} 0%, #fff 100%)`,
                      border: `1px solid ${C.goldBorder}`,
                      borderRadius: "11px", p: "17px 19px",
                      display: "flex", gap: 1.5, alignItems: "flex-start",
                    }}>
                      <CurrencyRupeeOutlinedIcon sx={{ fontSize: 18, color: C.gold, flexShrink: 0, mt: 0.2 }} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, mb: 0.5, fontFamily: sans }}>
                          Cash on Delivery
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: C.textSub, lineHeight: 1.65, fontFamily: sans }}>
                          Pay in cash when your order arrives. A COD handling fee of{" "}
                          <b style={{ color: C.goldDeep }}>₹{COD_CHARGE}</b> applies and is already added to your
                          total below.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ position: { lg: "sticky" }, top: { lg: 20 }, alignSelf: "start", minWidth: 0, width: "100%" }}>
              <Box sx={{
                position: "relative",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: "20px", overflow: "hidden",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 20px 48px rgba(10,10,10,0.12)",
              }}>
                <Box sx={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft}, ${C.gold})`,
                }} />

                <Box sx={{
                  background: "linear-gradient(135deg, #0f1f3d 0%, #1a3a6e 55%, #1d4ed8 100%)",
                  px: 2.8, py: 2.3, display: "flex", alignItems: "center", gap: 1.2,
                }}>
                  <Box sx={{
                    width: 34, height: 34, borderRadius: "10px", flexShrink: 0,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 17, color: "#fff" }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "#fff", fontFamily: sans, letterSpacing: "-0.2px" }}>
                      Order summary
                    </Typography>
                  </Box>
                  {isB2BInvoice && (
                    <Box sx={{
                      display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0,
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      borderRadius: "20px", px: 1.1, py: 0.4,
                    }}>
                      <ReceiptLongOutlinedIcon sx={{ fontSize: 11, color: "#fff" }} />
                      <Typography sx={{ fontSize: "9.5px", fontWeight: 700, color: "#fff", fontFamily: sans, letterSpacing: ".3px" }}>
                        TAX INVOICE
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ px: { xs: 2, sm: 2.8 }, py: 1.7, borderBottom: `1px solid ${C.borderLight}` }}>
                  {items.map((item, idx) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex", alignItems: "center", gap: 1.5, py: 1.5,
                        borderBottom: idx < items.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      }}
                    >
                      <Box sx={{
                        width: 56, height: 56, borderRadius: "10px",
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

                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 0.6 }}>
                          <Box
                            onClick={() => handleDecreaseQty(item)}
                            role="button"
                            aria-label="Decrease quantity"
                            sx={{
                              width: 22, height: 22, borderRadius: "6px",
                              border: `1.5px solid ${C.border}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                              opacity: item.quantity <= 1 ? 0.4 : 1,
                              transition: "all .15s",
                              "&:hover": item.quantity > 1 ? { borderColor: C.heading, background: C.surfaceWarm } : {},
                            }}
                          >
                            <RemoveRoundedIcon sx={{ fontSize: 13, color: C.heading }} />
                          </Box>

                          <Typography sx={{
                            fontSize: "12px", fontWeight: 700, color: C.heading,
                            fontFamily: sans, minWidth: 16, textAlign: "center",
                          }}>
                            {item.quantity}
                          </Typography>

                          <Box
                            onClick={() => handleIncreaseQty(item)}
                            role="button"
                            aria-label="Increase quantity"
                            sx={{
                              width: 22, height: 22, borderRadius: "6px",
                              border: `1.5px solid ${C.border}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
                              opacity: item.quantity >= item.stock ? 0.4 : 1,
                              transition: "all .15s",
                              "&:hover": item.quantity < item.stock ? { borderColor: C.heading, background: C.surfaceWarm } : {},
                            }}
                          >
                            <AddRoundedIcon sx={{ fontSize: 13, color: C.heading }} />
                          </Box>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, flexShrink: 0, fontFamily: sans }}>
                        ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ px: { xs: 2, sm: 2.8 }, py: 1.7, borderBottom: `1px solid ${C.borderLight}` }}>
                  <Typography sx={{ fontSize: "11px", fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: ".5px", mb: 1, fontFamily: sans }}>
                    Coupon
                  </Typography>
                  {applied ? (
                    <Box sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                      borderRadius: "9px", px: 1.5, py: 1, gap: 1,
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, minWidth: 0 }}>
                        <CheckCircleRoundedIcon sx={{ color: C.green, fontSize: 14, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: C.green, fontFamily: sans }}>
                          {applied} — 10% off!
                        </Typography>
                      </Box>
                      <Button size="small" onClick={() => { setApplied(null); setCoupon(""); }}
                        sx={{ color: C.red, fontWeight: 700, fontSize: "11px", textTransform: "none", minWidth: 0, p: 0, fontFamily: sans, flexShrink: 0 }}>
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
                            flex: 1, minWidth: 0,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "9px", fontSize: "12px", fontFamily: sans,
                              "& fieldset": { borderColor: C.border, borderWidth: "1.5px" },
                              "&.Mui-focused fieldset": { borderColor: C.heading },
                            },
                          }}
                        />
                        <Button
                          onClick={applyCoupon}
                          sx={{
                            background: C.surfaceGray, border: `1.5px solid ${C.border}`,
                            borderRadius: "9px", fontWeight: 700, fontSize: "12px",
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

                <Box sx={{ px: { xs: 2, sm: 2.8 }, py: 2.3 }}>
                  {[
                    { label: `Subtotal (${totalQty} item${totalQty !== 1 ? "s" : ""})`, value: `₹${cartSubtotal.toLocaleString("en-IN")}`, color: C.heading },
                    ...(discount > 0 ? [{ label: "Coupon discount", value: `−₹${discount.toLocaleString("en-IN")}`, color: C.green }] : []),
                    { label: "Delivery", value: shipping === 0 ? "FREE" : `₹${shipping}`, color: shipping === 0 ? C.green : C.heading },
                    ...(codCharge > 0 ? [{ label: "COD handling fee", value: `+₹${codCharge.toLocaleString("en-IN")}`, color: C.goldDeep }] : []),
                    { label: "GST (18%)", value: `Included · ₹${gstAmount.toLocaleString("en-IN")}`, color: C.heading },
                  ].map((row, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1.1, gap: 1 }}>
                      <Typography sx={{ fontSize: "12px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>{row.label}</Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: row.color, fontFamily: sans, whiteSpace: "nowrap" }}>{row.value}</Typography>
                    </Box>
                  ))}

                  {codCharge > 0 && (
                    <Box sx={{
                      background: `linear-gradient(135deg, ${C.goldLight} 0%, #fff 100%)`,
                      border: `1px solid ${C.goldBorder}`,
                      borderRadius: "9px", px: 1.4, py: 1, mt: 0.5, mb: 0.5,
                      display: "flex", gap: 0.9, alignItems: "center",
                    }}>
                      <CurrencyRupeeOutlinedIcon sx={{ fontSize: 13, color: C.gold, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: "10.5px", color: C.goldDeep, fontWeight: 600, fontFamily: sans, lineHeight: 1.5 }}>
                        A ₹{COD_CHARGE} Cash on Delivery fee has been added to your total.
                      </Typography>
                    </Box>
                  )}

                  {isB2BInvoice && (
                    <Box sx={{
                      background: `linear-gradient(135deg, ${C.goldLight} 0%, #fff 100%)`,
                      border: `1px solid ${C.goldBorder}`,
                      borderRadius: "9px", px: 1.4, py: 1, mt: 1, mb: 0.5,
                      display: "flex", gap: 0.9, alignItems: "flex-start",
                    }}>
                      <ReceiptLongOutlinedIcon sx={{ fontSize: 13, color: C.gold, mt: 0.2, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: "10.5px", color: C.goldDeep, fontWeight: 600, fontFamily: sans, lineHeight: 1.55 }}>
                        Tax invoice for <b>{companyName || "your company"}</b> · GSTIN {gstinTrimmed}. Taxable value ₹{taxableValue.toLocaleString("en-IN")} + GST ₹{gstAmount.toLocaleString("en-IN")}.
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ borderColor: C.borderLight, my: 1.6 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5, gap: 1 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.heading, fontFamily: sans }}>Total payable</Typography>
                    <Typography sx={{ fontSize: "24px", fontWeight: 800, color: C.heading, letterSpacing: "-.5px", fontFamily: sans, whiteSpace: "nowrap" }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "10px", color: C.textMuted, textAlign: "right", mb: 2.2, fontFamily: sans }}>
                    Inclusive of all taxes &amp; charges{isB2BInvoice ? " · tax invoice will be issued" : ""}{codCharge > 0 ? " · incl. COD fee" : ""}
                  </Typography>

                  <Button
                    fullWidth
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    sx={{
                      height: 52, borderRadius: "13px",
                      background: "linear-gradient(135deg, #0a0a0a 0%, #262626 100%)",
                      color: "#fff",
                      fontWeight: 700, fontSize: "15px", fontFamily: sans,
                      textTransform: "none",
                      boxShadow: "0 8px 22px rgba(0,0,0,0.24), 0 0 0 1px rgba(184,135,63,0.28)",
                      display: "flex", alignItems: "center", gap: 1,
                      "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.32), 0 0 0 1px rgba(184,135,63,0.48)" },
                      "&.Mui-disabled": { background: C.border, color: C.textMuted, boxShadow: "none" },
                      transition: "all .15s",
                    }}
                  >
                    {placingOrder
                      ? <CircularProgress size={16} color="inherit" />
                      : <LockOutlinedIcon sx={{ fontSize: 15 }} />
                    }
                    Place order · ₹{grandTotal.toLocaleString("en-IN")}
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.6, mt: 1.6 }}>
                    <VerifiedOutlinedIcon sx={{ fontSize: 12, color: C.blue }} />
                    <Typography sx={{ fontSize: "10px", color: C.textMuted, fontWeight: 500, fontFamily: sans }}>
                      100% secure · SSL encrypted
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", borderTop: `1px solid ${C.borderLight}` }}>
                  {TRUST.map((t, i) => (
                    <Box key={i} sx={{
                      flex: { xs: "1 1 50%", sm: 1 }, display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 0.5, py: 1.6, px: 0.5,
                      borderRight: {
                        xs: i % 2 === 0 ? `1px solid ${C.borderLight}` : "none",
                        sm: i < TRUST.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      },
                      borderBottom: { xs: i < 2 ? `1px solid ${C.borderLight}` : "none", sm: "none" },
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

              {/* SHIPROCKET TRUST CARD */}
              <Box sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "20px",
                mt: 2.75,
                background: "linear-gradient(135deg, #150a2e 0%, #1e1147 50%, #24135c 100%)",
                border: "1px solid rgba(139,197,63,0.18)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 20px 48px rgba(21,10,46,0.26)",
              }}>
                <Box sx={{
                  position: "absolute", inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 88% 6%, rgba(94,204,120,0.22) 0%, transparent 55%), radial-gradient(circle at 6% 100%, rgba(94,204,120,0.10) 0%, transparent 45%)",
                  pointerEvents: "none",
                }} />

                <Box sx={{ position: "relative", px: { xs: 2, sm: 2.8 }, py: 2.3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: 1.4 }}>
                    <Box sx={{
                      width: 34, height: 34, borderRadius: "10px", flexShrink: 0,
                      background: "rgba(94,204,120,0.16)",
                      border: "1px solid rgba(94,204,120,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 4l14 8-14 8V4z" fill="#5ecc78" />
                      </svg>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{
                        fontSize: "9px", fontWeight: 800, letterSpacing: "1.1px",
                        textTransform: "uppercase", color: "#5ecc78", fontFamily: sans, mb: 0.1,
                      }}>
                        Fulfilled &amp; Shipped Via
                      </Typography>
                      <Typography sx={{
                        fontSize: "15px", fontWeight: 800, color: "#fff",
                        fontFamily: sans, letterSpacing: "-0.2px", lineHeight: 1.25,
                      }}>
                        Shiprocket
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.4, flexShrink: 0,
                      background: "rgba(94,204,120,0.14)",
                      border: "1px solid rgba(94,204,120,0.35)",
                      borderRadius: "20px", px: 0.9, py: 0.25,
                    }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 10, color: "#5ecc78" }} />
                      <Typography sx={{ fontSize: "8.5px", fontWeight: 700, color: "#5ecc78", fontFamily: sans, letterSpacing: ".3px", whiteSpace: "nowrap" }}>
                        VERIFIED
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{
                    fontSize: "11.5px", color: "rgba(255,255,255,0.62)", fontFamily: sans,
                    lineHeight: 1.6, mb: 1.6,
                  }}>
                    Your order is packed, labelled and shipped through Shiprocket's pan-India
                    courier network — trusted for reliable, on-time, fully tracked delivery.
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.9, mb: 1.6 }}>
                    {SHIPROCKET_POINTS.map((p, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
                        <Box sx={{
                          width: 22, height: 22, borderRadius: "6px", flexShrink: 0,
                          background: "rgba(94,204,120,0.14)",
                          border: "1px solid rgba(94,204,120,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#5ecc78",
                        }}>
                          {p.icon}
                        </Box>
                        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: sans }}>
                          {p.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "11px", px: 1.6, py: 1.2,
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
                      <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: "#5ecc78" }} />
                      <Typography sx={{ fontSize: "10.5px", color: "rgba(255,255,255,0.55)", fontFamily: sans, fontWeight: 600, letterSpacing: ".2px" }}>
                        EST. DELIVERY
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "13px", color: "#fff", fontFamily: sans, fontWeight: 800 }}>
                      3–6 days
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

          </Box>
          )}
        </Container>
      </Box>

      <Footer />

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