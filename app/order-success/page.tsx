"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Container, Typography, Button, Divider,
  Snackbar, Alert, CircularProgress,
} from "@mui/material";
import CheckCircleRoundedIcon      from "@mui/icons-material/CheckCircleRounded";
import ContentCopyRoundedIcon      from "@mui/icons-material/ContentCopyRounded";
import ShoppingBagOutlinedIcon     from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon     from "@mui/icons-material/ReceiptLongOutlined";
import PrintOutlinedIcon           from "@mui/icons-material/PrintOutlined";
import EditNoteRoundedIcon         from "@mui/icons-material/EditNoteRounded";
import { proxyImage } from "@/lib/proxyImage";
import { fetchUserOrders, getLocalOrders, type Order } from "@/lib/orderStore";
import { generateInvoice } from "@/lib/generateInvoice";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// ---- Design tokens ----
const C = {
  bg:        "#FFFFFF",
  page:      "#FAFAFA",
  border:    "#E5E7EB",
  borderSoft:"#EEF0F2",
  ink:       "#0A0A0A",
  text:      "#1F2328",
  textSub:   "#57606A",
  textMuted: "#8B93A1",
  blue:      "#0B1C3D",
  blueDark:  "#071429",
  blueLight: "#E7EBF2",
  green:     "#1A7F37",
  greenLight:"#E9F7EE",
};

const sans = "'Inter', system-ui, sans-serif";

const cardSx = {
  background: C.bg,
  border: `1px solid ${C.border}`,
  borderRadius: "12px",
  overflow: "hidden",
};

const labelSx = {
  fontSize: "11px",
  fontWeight: 700,
  color: C.textMuted,
  textTransform: "uppercase" as const,
  letterSpacing: "0.4px",
  fontFamily: sans,
  mb: 0.6,
};

const valueSx = {
  fontSize: "13.5px",
  color: C.text,
  lineHeight: 1.75,
  fontFamily: sans,
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// Default COD handling fee used only as a fallback for orders placed
// before `codCharge` was persisted on the Order object.
const DEFAULT_COD_CHARGE = 149;

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("Copied to clipboard!");

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
  const orderNote = order?.note?.trim();
  const firstName = order?.address?.name?.split(" ")[0] || "there";
  const isCOD = order?.paymentMethod === "cod";
  const codCharge = isCOD ? (order?.codCharge ?? DEFAULT_COD_CHARGE) : 0;

  // Build a real address query string for the map, e.g.
  // "E3 / 37D chanakya place part 1, uttam nagar, New delhi, DL, 110059, India"
  const mapQuery = order
    ? [
        order.address.line1,
        order.address.line2,
        order.address.city,
        order.address.state,
        order.address.pin,
        order.address.country || "India",
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const mapEmbedSrc = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    : "";

  const copyToClipboard = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setSnackbarMsg(message);
      setSnackbar(true);
    } catch {
      /* clipboard unavailable */
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

  if (loading) {
    return (
      <>
        <Box className="no-print"><Navbar /></Box>
        <Box sx={{
          background: C.page, minHeight: "78vh",
          display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans,
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={30} sx={{ color: C.blue }} />
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
        <Box sx={{ background: C.page, minHeight: "78vh", display: "flex", alignItems: "center", py: 10, fontFamily: sans }}>
          <Container maxWidth="sm">
            <Box sx={{ ...cardSx, textAlign: "center", px: { xs: 4, md: 7 }, py: { xs: 6, md: 8 } }}>
              <Box sx={{
                width: 84, height: 84, borderRadius: "50%",
                background: C.blueLight, display: "flex",
                alignItems: "center", justifyContent: "center", mx: "auto", mb: 3,
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 36, color: C.blue }} />
              </Box>
              <Typography sx={{ fontSize: "20px", fontWeight: 700, color: C.ink, mb: 1, fontFamily: sans }}>
                No recent order found
              </Typography>
              <Typography sx={{ fontSize: "13.5px", color: C.textSub, mb: 4, lineHeight: 1.8, fontFamily: sans }}>
                We couldn't find an order to display. If you just placed one, check your email for confirmation.
              </Typography>
              <Button
                onClick={() => router.push("/products")}
                sx={{
                  background: C.blue, color: "#fff", borderRadius: "8px", px: 4, py: 1.4,
                  fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "14px",
                  "&:hover": { background: C.blueDark },
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

  // ---- SUCCESS STATE ----
  return (
    <>
      <Box className="no-print"><Navbar /></Box>

      <Box sx={{ background: C.page, minHeight: "100vh", pb: 8, fontFamily: sans }}>
        <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 5 } }}>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 380px" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}>

            {/* ------------- LEFT COLUMN ------------- */}
            <Box>

              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6, mb: 3 }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `2px solid ${C.blue}`, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 22, color: C.blue }} />
                </Box>
                <Box>
                  <Typography
                    onClick={() => copyToClipboard(order.orderId, "Order ID copied to clipboard!")}
                    sx={{
                      fontSize: "12.5px", color: C.textMuted, fontFamily: sans,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5,
                      "&:hover": { color: C.text },
                    }}
                  >
                    Confirmation #{order.orderId}
                    <ContentCopyRoundedIcon sx={{ fontSize: 12 }} />
                  </Typography>
                  <Typography sx={{ fontSize: "22px", fontWeight: 700, color: C.ink, fontFamily: sans, mt: 0.2 }}>
                    Thank you, {firstName}!
                  </Typography>
                </Box>
              </Box>

              {/* Real map — genuine location via Google Maps embed */}
              <Box sx={{ ...cardSx, mb: 3, position: "relative" }}>
                <Box sx={{ height: 200, position: "relative", background: "#EDEFF1", overflow: "hidden" }}>
                  {mapEmbedSrc && (
                    <Box
                      component="iframe"
                      src={mapEmbedSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      sx={{
                        border: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                      title="Shipping location map"
                    />
                  )}
                  <Box sx={{
                    position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
                    background: "#fff", borderRadius: "10px", px: 1.8, py: 1,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)", textAlign: "center", minWidth: 160,
                    pointerEvents: "none",
                  }}>
                    <Typography sx={{ fontSize: "10.5px", color: C.textMuted, fontFamily: sans }}>
                      Shipping address
                    </Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, fontFamily: sans }}>
                      {order.address.city}{order.address.state ? `, ${order.address.state}` : ""}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, px: 2.4, py: 2 }}>
                  <Box sx={{
                    width: 34, height: 34, borderRadius: "50%", background: C.greenLight,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 18, color: C.green }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: C.ink, fontFamily: sans }}>
                      Your order is confirmed
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: C.textSub, fontFamily: sans }}>
                      You'll receive a confirmation email soon
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Order details */}
              <Box sx={cardSx}>
                <Box sx={{ px: { xs: 2.4, md: 3 }, py: 2.4 }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: 700, color: C.ink, fontFamily: sans, mb: 2.4 }}>
                    Order details
                  </Typography>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                    <Box>
                      <Typography sx={labelSx}>Contact information</Typography>
                      <Typography sx={valueSx}>{order.address.phone}</Typography>
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>Payment method</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{
                          width: 26, height: 18, borderRadius: "3px",
                          border: `1px solid ${C.border}`, background: "#F3F4F6",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <Box sx={{ width: 14, height: 2, background: C.textMuted, borderRadius: "1px" }} />
                        </Box>
                        <Typography sx={valueSx}>
                          {isCOD ? "Cash on Delivery" : "UPI / Online"} · ₹{order.grandTotal.toLocaleString("en-IN")} INR
                        </Typography>
                      </Box>
                      {paymentId && (
                        <Typography
                          onClick={() => copyToClipboard(paymentId, "Transaction ID copied to clipboard!")}
                          sx={{ fontSize: "11.5px", color: C.textMuted, mt: 0.6, cursor: "pointer", fontFamily: sans, "&:hover": { color: C.blue } }}
                        >
                          Txn ID: {paymentId}
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>Shipping address</Typography>
                      <Typography sx={valueSx}>
                        {order.address.name}<br />
                        {order.address.line1}
                        {order.address.line2 ? <>, {order.address.line2}</> : null}<br />
                        {order.address.city}{order.address.state ? `, ${order.address.state}` : ""} – {order.address.pin}<br />
                        {order.address.country || "India"}<br />
                        {order.address.phone}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>Billing address</Typography>
                      <Typography sx={valueSx}>
                        {order.address.name}<br />
                        {order.address.line1}
                        {order.address.line2 ? <>, {order.address.line2}</> : null}<br />
                        {order.address.city}{order.address.state ? `, ${order.address.state}` : ""} – {order.address.pin}<br />
                        {order.address.country || "India"}<br />
                        {order.address.phone}
                      </Typography>
                      {isB2BInvoice && (
                        <Typography sx={{ fontSize: "12px", color: C.textSub, mt: 1, fontFamily: sans }}>
                          {billing.companyName} · GSTIN: {billing.gstNumber}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
                      <Typography sx={labelSx}>Shipping method</Typography>
                      <Typography sx={valueSx}>
                        Standard ({order.shipping === 0 ? "Free" : `₹${order.shipping}`}) · Dispatch 1–2 days
                        {isCOD ? " (Non-COD dispatch may vary)" : ""} · Delivery {formatDate(order.estimatedDeliveryStart)} – {formatDate(order.estimatedDeliveryEnd)}
                      </Typography>
                    </Box>
                  </Box>

                  {orderNote && (
                    <>
                      <Divider sx={{ my: 2.4, borderColor: C.borderSoft }} />
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8 }}>
                          <EditNoteRoundedIcon sx={{ fontSize: 16, color: C.textMuted }} />
                          <Typography sx={labelSx}>Order note</Typography>
                        </Box>
                        <Typography sx={{ ...valueSx, whiteSpace: "pre-wrap" }}>{orderNote}</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>

              {/* Footer row */}
              <Box className="no-print" sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 1.6, mt: 3,
              }}>
                <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>
                  Need help?{" "}
                  <Box component="span"
                    sx={{ color: C.blue, cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
                    onClick={() => router.push("/contact")}
                  >
                    Contact us
                  </Box>
                </Typography>
                <Button
                  onClick={() => router.push("/products")}
                  sx={{
                    background: C.blue, color: "#fff", borderRadius: "8px", px: 3.4, py: 1.3,
                    fontWeight: 700, fontFamily: sans, textTransform: "none", fontSize: "13.5px",
                    "&:hover": { background: C.blueDark },
                  }}
                >
                  Continue shopping
                </Button>
              </Box>
            </Box>

            {/* ------------- RIGHT COLUMN (order summary) ------------- */}
            <Box sx={{ position: { md: "sticky" }, top: { md: 24 }, width: "100%" }}>
              <Box sx={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: "16px",
                overflow: "hidden",
                width: "100%",
                boxShadow: "0 1px 2px rgba(10,10,10,0.02), 0 12px 32px rgba(10,10,10,0.06)",
              }}>
                <Box sx={{ px: { xs: 2.4, md: 2.8 }, py: 2.4 }}>
                  {order.items.map((item, idx) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex", alignItems: "flex-start", gap: 1.7,
                        py: 1.9,
                        borderBottom: idx < order.items.length - 1 ? `1px solid ${C.borderSoft}` : "none",
                      }}
                    >
                      <Box sx={{ position: "relative", flexShrink: 0 }}>
                        <Box sx={{
                          width: 54, height: 54, borderRadius: "10px",
                          border: `1px solid ${C.border}`, background: "#F7F7F8",
                          display: "flex", alignItems: "center", justifyContent: "center", p: 0.9,
                        }}>
                          <img
                            src={proxyImage(item.image)}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </Box>
                        <Box sx={{
                          position: "absolute", top: -7, right: -7,
                          width: 19, height: 19, borderRadius: "50%",
                          background: C.ink, color: "#fff",
                          fontSize: "10px", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: sans, border: "2px solid #fff",
                        }}>
                          {item.quantity}
                        </Box>
                      </Box>
                      <Typography sx={{
                        flex: 1, fontSize: "13px", color: C.text, lineHeight: 1.55, fontFamily: sans,
                        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: "13.5px", fontWeight: 700, color: C.ink, fontFamily: sans, flexShrink: 0 }}>
                        ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ borderColor: C.borderSoft }} />

                <Box sx={{ px: { xs: 2.4, md: 2.8 }, py: 2.4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                    <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: "13px", color: C.text, fontFamily: sans, fontWeight: 600 }}>
                      ₹{order.subtotal.toLocaleString("en-IN")}
                    </Typography>
                  </Box>

                  {order.discount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                      <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>Coupon discount</Typography>
                      <Typography sx={{ fontSize: "13px", color: C.green, fontFamily: sans, fontWeight: 600 }}>
                        −₹{order.discount.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                    <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>Shipping</Typography>
                    <Typography sx={{ fontSize: "13px", color: order.shipping === 0 ? C.green : C.text, fontFamily: sans, fontWeight: 600 }}>
                      {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                    </Typography>
                  </Box>

                  {/* COD charge — mirrors checkout, only shown for Cash on Delivery orders */}
                  {isCOD && codCharge > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                      <Typography sx={{ fontSize: "13px", color: C.textSub, fontFamily: sans }}>COD charges</Typography>
                      <Typography sx={{ fontSize: "13px", color: C.text, fontFamily: sans, fontWeight: 600 }}>
                        ₹{codCharge.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ borderColor: C.borderSoft, my: 1.8 }} />

                  <Box sx={{
                    borderRadius: "12px",
                    background: "linear-gradient(180deg, #F7FAFF 0%, #FFFFFF 100%)",
                    border: `1px solid ${C.blueLight}`,
                    px: 2, py: 1.8,
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.6 }}>
                      <Typography sx={{ fontSize: "14.5px", fontWeight: 700, color: C.ink, fontFamily: sans }}>Total</Typography>
                      <Typography sx={{ fontSize: "13px", color: C.textMuted, fontFamily: sans, fontWeight: 600 }}>INR</Typography>
                    </Box>
                    <Typography sx={{ fontSize: "26px", fontWeight: 800, color: C.ink, fontFamily: sans, textAlign: "right", letterSpacing: "-0.5px" }}>
                      ₹{order.grandTotal.toLocaleString("en-IN")}
                    </Typography>
                    {billing?.gstAmount != null && (
                      <Typography sx={{ fontSize: "11.5px", color: C.textMuted, fontFamily: sans, textAlign: "right", mt: 0.5 }}>
                        Including ₹{billing.gstAmount.toLocaleString("en-IN")} in taxes
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ borderColor: C.borderSoft }} />

                {/* Action buttons */}
                <Box className="no-print" sx={{ px: { xs: 2.4, md: 2.8 }, py: 2.4, display: "flex", flexDirection: "column", gap: 1.1 }}>
                  <Button
                    startIcon={<ReceiptLongOutlinedIcon sx={{ fontSize: 17 }} />}
                    onClick={handleDownloadInvoice}
                    fullWidth
                    sx={{
                      height: 46, borderRadius: "10px", fontWeight: 700, fontSize: "13.5px",
                      fontFamily: sans, textTransform: "none",
                      background: C.blue, color: "#fff",
                      boxShadow: "0 6px 16px rgba(11,28,61,0.28)",
                      "&:hover": { background: C.blueDark, boxShadow: "0 8px 20px rgba(11,28,61,0.34)" },
                    }}
                  >
                    Download Invoice
                  </Button>
                  <Button
                    startIcon={<PrintOutlinedIcon sx={{ fontSize: 17 }} />}
                    onClick={() => window.print()}
                    fullWidth
                    sx={{
                      height: 46, borderRadius: "10px", fontWeight: 700, fontSize: "13.5px",
                      fontFamily: sans, textTransform: "none",
                      border: `1.5px solid ${C.border}`, color: C.ink,
                      "&:hover": { borderColor: C.ink, background: "#F7F7F8" },
                    }}
                  >
                    Print Receipt
                  </Button>
                </Box>
              </Box>
            </Box>

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
        <Alert severity="success" sx={{ borderRadius: "10px", fontWeight: 700, fontFamily: sans, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}