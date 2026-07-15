import { NextRequest, NextResponse } from "next/server";
import { getShiprocketToken } from "@/lib/shiprocket";

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    const token = await getShiprocketToken();

    const [firstName, ...rest] = (order.address.name || "Customer").trim().split(" ");
    const lastName = rest.join(" ") || ".";

    const payload = {
      order_id: order.orderId,
      order_date: new Date(order.placedAt).toISOString().slice(0, 16).replace("T", " "),
      pickup_location: "work", // ← FIXED: matches your actual pickup address nickname
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: order.address.line1,
      billing_address_2: order.address.line2 || "",
      billing_city: order.address.city,
      billing_pincode: order.address.pin,
      billing_state: order.address.state,
      billing_country: "India",
      billing_email: order.address.email || "customer@example.com",
      billing_phone: order.address.phone,
      shipping_is_billing: true,
      order_items: order.items.map((item: any) => ({
        name: item.name,
        sku: item.id,
        units: item.quantity,
        selling_price: item.salePrice,
      })),
      payment_method: order.paymentMethod === "cod" ? "COD" : "Prepaid",
      sub_total: order.grandTotal,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    };

    const res = await fetch(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Shiprocket order creation failed:", data);
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Shiprocket integration error:", err);
    return NextResponse.json({ error: err.message || "Shiprocket integration failed" }, { status: 500 });
  }
}