import emailjs from "@emailjs/nodejs";
import type { Order } from "@/lib/orderStore";

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY!,
  privateKey: process.env.EMAILJS_PRIVATE_KEY!,
});

const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

function buildItemsSummary(order: Order) {
  const itemsList = order.items
    .map(
      (i) =>
        `${i.name} (${i.brand}) x${i.quantity} - ₹${(i.salePrice * i.quantity).toLocaleString("en-IN")}`
    )
    .join("\n");
  const orderNote = order.note?.trim();
  return orderNote ? `${itemsList}\n\nOrder note: ${orderNote}` : itemsList;
}

type EmailType = "confirmed" | "cancelled";

// Shared across BOTH customer and owner templates now.
function buildCommonFields(order: Order, type: EmailType) {
  const isCancelled = type === "cancelled";
  return {
    status_label: isCancelled ? "Order Cancelled" : "Thank you for your order!",
    status_color: isCancelled ? "#dc2626" : "#0a0a0a",
    display_confirmed: isCancelled ? "none" : "block",
    display_cancelled: isCancelled ? "block" : "none",
    order_id: order.orderId,
    items_summary: buildItemsSummary(order),
    grand_total: order.grandTotal.toLocaleString("en-IN"),
    order_note: order.note?.trim() || "",
    cancelled_at: isCancelled
      ? new Date(order.cancelledAt || Date.now()).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "",
    // confirmed-only fields — always present, just empty on cancel
    delivery_address: !isCancelled
      ? `${order.address.name}, ${order.address.line1}, ${order.address.city} - ${order.address.pin}`
      : "",
    delivery_start: !isCancelled
      ? new Date(order.estimatedDeliveryStart).toLocaleDateString("en-IN")
      : "",
    delivery_end: !isCancelled
      ? new Date(order.estimatedDeliveryEnd).toLocaleDateString("en-IN")
      : "",
    cancel_url: !isCancelled ? `${SITE_URL}/orders/cancel/${order.orderId}` : "",
  };
}

export async function sendOrderEmails(order: Order, customerEmail?: string | null) {
  const common = buildCommonFields(order, "confirmed");

  const results = await Promise.allSettled([
    customerEmail
      ? emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_TEMPLATE_ID_CUSTOMER!, // shared for confirm + cancel now
          { to_email: customerEmail, ...common }
        )
      : Promise.resolve(null),

    emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID_OWNER!, // also shared, from the previous step
      {
        to_email: OWNER_EMAIL,
        customer_name: order.address.name,
        customer_phone: order.address.phone,
        payment_method: order.paymentMethod.toUpperCase(),
        payment_id: order.paymentId || "N/A",
        ship_to: `${order.address.line1}${order.address.line2 ? ", " + order.address.line2 : ""}, ${order.address.city}, ${order.address.state} - ${order.address.pin}`,
        ...common,
      }
    ),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`>>> sendOrderEmails: send #${i} FAILED:`, r.reason);
  });
}

export async function sendOrderCancellationEmails(order: Order, customerEmail?: string | null) {
  const common = buildCommonFields(order, "cancelled");

  const results = await Promise.allSettled([
    customerEmail
      ? emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_TEMPLATE_ID_CUSTOMER!, // same template as confirm
          { to_email: customerEmail, ...common }
        )
      : Promise.resolve(null),

    emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID_OWNER!,
      {
        to_email: OWNER_EMAIL,
        customer_name: order.address.name,
        customer_phone: order.address.phone,
        payment_method: order.paymentMethod.toUpperCase(),
        payment_id: order.paymentId || "N/A",
        ship_to: "",
        ...common,
      }
    ),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`>>> sendOrderCancellationEmails: send #${i} FAILED:`, r.reason);
  });
}