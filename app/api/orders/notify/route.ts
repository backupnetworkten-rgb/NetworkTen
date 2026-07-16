import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/sendOrderEmails";
import type { Order } from "@/lib/orderStore";

export async function POST(req: Request) {
  console.log(">>> /api/orders/notify HIT");

  try {
    const body = await req.json();
    const order: Order = body.order;
    const customerEmail: string | null = body.customerEmail ?? null;

    console.log(">>> customerEmail received:", customerEmail, "| orderId:", order?.orderId);

    if (!order?.orderId) {
      console.error(">>> Missing order data in request body");
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    await sendOrderEmails(order, customerEmail);
    console.log(">>> sendOrderEmails finished without throwing");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(">>> Order notify email failed:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 200 });
  }
}