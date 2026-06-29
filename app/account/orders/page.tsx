// app/orders/page.tsx
"use client";

import { useState } from "react";
import Navbar  from "@/components/navbar/Navbar";
import Footer  from "@/components/footer/Footer";
import { Box, Container } from "@mui/material";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersList   from "@/components/orders/OrdersList";

export default function OrdersPage() {
  const [totalOrders, setTotalOrders] = useState(0);

  return (
    <>
      <Navbar />
      <Box sx={{ background: "#f5f5f7", minHeight: "100vh", py: 5 }}>
        <Container maxWidth="lg">
          <OrdersHeader totalOrders={totalOrders} />
          <OrdersList onCountReady={setTotalOrders} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}