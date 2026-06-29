// components/orders/OrdersList.tsx
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import OrderCard from "./OrderCard";
import { fetchUserOrders, Order } from "@/lib/orderStore";
import { auth } from "@/lib/firebase";

const sans = "'Inter','DM Sans',system-ui,sans-serif";

export default function OrdersList({
  onCountReady,
}: {
  onCountReady?: (n: number) => void;
}) {
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      // wait for auth to resolve
      await new Promise<void>((res) => {
        const unsub = auth.onAuthStateChanged(() => { unsub(); res(); });
      });
      const data = await fetchUserOrders();
      setOrders(data);
      onCountReady?.(data.length);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#1a5fb4" }} />
      </Box>
    );
  }

  if (!orders.length) {
    return (
      <Box sx={{
        background: "#fff", border: "1px solid #e8e8e8",
        borderRadius: "18px", p: "64px 32px",
        textAlign: "center",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
      }}>
        <Box sx={{
          width: 72, height: 72, borderRadius: "20px",
          background: "#f2f2f2", mx: "auto", mb: 2.5,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ReceiptLongOutlinedIcon sx={{ fontSize: 32, color: "#999" }} />
        </Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 800, color: "#0a0a0a",
          fontFamily: sans, mb: 0.8 }}>
          No orders yet
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#999", fontFamily: sans }}>
          When you place an order it will appear here
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </>
  );
}