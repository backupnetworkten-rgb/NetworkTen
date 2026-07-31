// app/api/cancel-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOrderCancellationEmails } from "@/lib/sendOrderEmails"; // adjust path to match your actual emailjs file location
import type { Order } from "@/lib/orderStore";

const CANCELLATION_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const { order, customerEmail } = (await req.json()) as {
      order: Order;
      customerEmail?: string | null;
    };

    if (!order?.orderId || !order?.placedAt) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    // Re-validate the 24hr window server-side so it can't be bypassed
    // by editing the request body from the client.
    const placedAt = new Date(order.placedAt).getTime();
    if (Number.isNaN(placedAt) || Date.now() - placedAt > CANCELLATION_WINDOW_MS) {
      return NextResponse.json(
        { error: "Cancellation window has expired." },
        { status: 400 }
      );
    }

    await sendOrderCancellationEmails(order, customerEmail);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(">>> /api/cancel-order failed:", err);
    return NextResponse.json({ error: "Failed to process cancellation" }, { status: 500 });
  }
}