// app/orders/cancel/[orderId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, Typography, Button, CircularProgress, Alert } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { auth } from "@/lib/firebase";
import {
  fetchOrderById, cancelOrder, canCancelOrder, cancelDeadline, Order,
} from "@/lib/orderStore";

const sans = "'Inter','DM Sans',system-ui,sans-serif";

export default function CancelOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [order, setOrder]       = useState<Order | null>(null);
  const [loading, setLoading]   = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      setCheckingAuth(false);
      if (!user) {
        localStorage.setItem("redirectAfterLogin", `/orders/cancel/${orderId}`);
        router.push("/login");
        return;
      }
      const found = await fetchOrderById(orderId as string);
      setOrder(found);
      setLoading(false);
    });
    return () => unsub();
  }, [orderId, router]);

  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    setError(null);
    try {
      await cancelOrder(order);
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const renderBody = () => {
    if (checkingAuth || loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#1a5fb4" }} />
        </Box>
      );
    }

    if (!order) {
      return (
        <Typography sx={{ textAlign: "center", py: 8, fontFamily: sans, color: "#999" }}>
          We couldn't find this order on your account.
        </Typography>
      );
    }

    if (done || order.status === "cancelled") {
      return (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CheckCircleOutlinedIcon sx={{ fontSize: 48, color: "#16a34a", mb: 2 }} />
          <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: "18px", mb: 1 }}>
            Order #{order.orderId} cancelled
          </Typography>
          <Typography sx={{ fontFamily: sans, color: "#666", fontSize: "13px", mb: 3 }}>
            You'll receive a confirmation email shortly.
          </Typography>
          <Button onClick={() => router.push("/account")} sx={{ textTransform: "none", fontFamily: sans, fontWeight: 700 }}>
            Go to My Orders
          </Button>
        </Box>
      );
    }

    if (!canCancelOrder(order)) {
      return (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: "18px", mb: 1 }}>
            Cancellation window has passed
          </Typography>
          <Typography sx={{ fontFamily: sans, color: "#666", fontSize: "13px", mb: 3 }}>
            Orders can only be cancelled within 24 hours of being placed.
            Please contact our support team for further help.
          </Typography>
          <Button onClick={() => router.push("/account")} sx={{ textTransform: "none", fontFamily: sans, fontWeight: 700 }}>
            Go to My Orders
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CancelOutlinedIcon sx={{ fontSize: 44, color: "#dc2626", mb: 2 }} />
        <Typography sx={{ fontFamily: sans, fontWeight: 800, fontSize: "18px", mb: 1 }}>
          Cancel order #{order.orderId}?
        </Typography>
        <Typography sx={{ fontFamily: sans, color: "#666", fontSize: "13px", mb: 1 }}>
          Total: ₹{order.grandTotal.toLocaleString("en-IN")} · {order.totalQty} item{order.totalQty !== 1 ? "s" : ""}
        </Typography>
        <Typography sx={{ fontFamily: sans, color: "#999", fontSize: "12px", mb: 3 }}>
          Cancellable until {cancelDeadline(order).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2, textAlign: "left" }}>{error}</Alert>}
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
          <Button
            onClick={() => router.push("/account")}
            disabled={cancelling}
            sx={{ textTransform: "none", fontFamily: sans, fontWeight: 600, color: "#666" }}
          >
            Keep Order
          </Button>
          <Button
            onClick={handleCancel}
            disabled={cancelling}
            variant="contained"
            sx={{ textTransform: "none", fontFamily: sans, fontWeight: 700, background: "#dc2626", borderRadius: "9px", px: 3, "&:hover": { background: "#b91c1c" } }}
          >
            {cancelling ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "Yes, Cancel Order"}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Navbar />
      <Box sx={{ background: "#f5f5f7", minHeight: "70vh", py: 6 }}>
        <Container maxWidth="sm">
          <Box sx={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "18px", p: { xs: 3, md: 4 } }}>
            {renderBody()}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}