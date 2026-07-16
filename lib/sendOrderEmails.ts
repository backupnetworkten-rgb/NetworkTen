import emailjs from "@emailjs/nodejs";
import type { Order } from "@/lib/orderStore";

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY!,
  privateKey: process.env.EMAILJS_PRIVATE_KEY!,
});

console.log(">>> EMAILJS CONFIG CHECK:", {
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateCustomer: process.env.EMAILJS_TEMPLATE_ID_CUSTOMER,
  templateOwner: process.env.EMAILJS_TEMPLATE_ID_OWNER,
  publicKeyExists: !!process.env.EMAILJS_PUBLIC_KEY,
  privateKeyExists: !!process.env.EMAILJS_PRIVATE_KEY,
  ownerEmail: process.env.OWNER_EMAIL,
});

const OWNER_EMAIL = process.env.OWNER_EMAIL!;

export async function sendOrderEmails(order: Order, customerEmail?: string | null) {
  const itemsSummary = order.items
    .map(
      (i) =>
        `${i.name} (${i.brand}) x${i.quantity} - ₹${(i.salePrice * i.quantity).toLocaleString("en-IN")}`
    )
    .join("\n");

  console.log(">>> Attempting to send emails | customerEmail:", customerEmail, "| owner:", OWNER_EMAIL);

  const results = await Promise.allSettled([
    customerEmail
      ? emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_TEMPLATE_ID_CUSTOMER!,
          {
            to_email: customerEmail,
            order_id: order.orderId,
            items_summary: itemsSummary,
            grand_total: order.grandTotal.toLocaleString("en-IN"),
            delivery_address: `${order.address.name}, ${order.address.line1}, ${order.address.city} - ${order.address.pin}`,
            delivery_start: new Date(order.estimatedDeliveryStart).toLocaleDateString("en-IN"),
            delivery_end: new Date(order.estimatedDeliveryEnd).toLocaleDateString("en-IN"),
          }
        )
      : Promise.resolve(null),

    emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID_OWNER!,
      {
        to_email: OWNER_EMAIL,
        order_id: order.orderId,
        customer_name: order.address.name,
        customer_phone: order.address.phone,
        payment_method: order.paymentMethod.toUpperCase(),
        payment_id: order.paymentId || "N/A",
        items_summary: itemsSummary,
        grand_total: order.grandTotal.toLocaleString("en-IN"),
        ship_to: `${order.address.line1}${order.address.line2 ? ", " + order.address.line2 : ""}, ${order.address.city}, ${order.address.state} - ${order.address.pin}`,
      }
    ),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`>>> sendOrderEmails: send #${i} FAILED:`, r.reason);
    } else {
      console.log(`>>> sendOrderEmails: send #${i} SUCCESS:`, r.value);
    }
  });
}