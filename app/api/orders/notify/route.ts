import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/sendOrderEmails";
import { sendOwnerWhatsApp, sendCustomerWhatsApp } from "@/lib/sendOwnerWhatsApp";
import type { Order } from "@/lib/orderStore";

export async function POST(req: Request) {
  console.log(">>> /api/orders/notify HIT");

  try {
    const body = await req.json();
    const order: Order = body.order;
    const customerEmail: string | null = body.customerEmail ?? null;

    if (!order?.orderId) {
      console.error(">>> Missing order data in request body");
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    const results = await Promise.allSettled([
      sendOrderEmails(order, customerEmail),
      sendOwnerWhatsApp(order),
      sendCustomerWhatsApp(order),
    ]);

    const labels = ["email", "owner whatsapp", "customer whatsapp"];
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`>>> notify: ${labels[i]} failed:`, r.reason);
      } else {
        console.log(`>>> notify: ${labels[i]} finished OK`);
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(">>> Order notify failed:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 200 });
  }
}