import type { Order } from "@/lib/orderStore";

const WAPPFLY_TOKEN = process.env.WAPPFLY_API_TOKEN;

// Normalizes a raw Indian phone number into WhatsApp JID format.
function toWhatsAppJid(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 10) return `91${digits}@s.whatsapp.net`;
  if (digits.length === 12 && digits.startsWith("91")) return `${digits}@s.whatsapp.net`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}@s.whatsapp.net`;

  return null;
}

async function sendWhatsAppMessage(toJid: string, text: string, label: string) {
  if (!WAPPFLY_TOKEN) {
    console.error(`>>> WhatsApp (${label}) skipped: missing WAPPFLY_API_TOKEN`);
    return;
  }

  try {
    const res = await fetch("https://wappfly.com/api/messages/send", {
      method: "POST",
      headers: {
        "X-API-Token": WAPPFLY_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: toJid, text }),
    });

    const data = await res.json();
    console.log(`>>> Wappfly WhatsApp (${label}) response:`, res.status, data);

    if (!res.ok) {
      console.error(`>>> Wappfly WhatsApp (${label}) send failed:`, res.status, data);
    }
  } catch (err) {
    console.error(`>>> Wappfly WhatsApp (${label}) request threw:`, err);
  }
}

export async function sendOwnerWhatsApp(order: Order) {
  const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;
  if (!ownerNumber) {
    console.error(">>> Owner WhatsApp skipped: missing OWNER_WHATSAPP_NUMBER");
    return;
  }

  const ownerJid = `${ownerNumber}@s.whatsapp.net`;

  const itemsSummary = order.items
    .map((i) => `- ${i.name} (${i.brand}) x${i.quantity}`)
    .join("\n");

  const message =
    `🛒 *New Order Received*\n` +
    `Order ID: ${order.orderId}\n` +
    `Customer: ${order.address.name}\n` +
    `Phone: ${order.address.phone}\n\n` +
    `${itemsSummary}\n\n` +
    `Total: ₹${order.grandTotal.toLocaleString("en-IN")}\n` +
    `Payment: ${order.paymentMethod.toUpperCase()}${order.paymentId ? " (" + order.paymentId + ")" : ""}\n\n` +
    `Ship to:\n${order.address.line1}${order.address.line2 ? ", " + order.address.line2 : ""}\n` +
    `${order.address.city}, ${order.address.state} - ${order.address.pin}`;

  await sendWhatsAppMessage(ownerJid, message, "owner");
}

export async function sendCustomerWhatsApp(order: Order) {
  const customerJid = toWhatsAppJid(order.address.phone);

  if (!customerJid) {
    console.error(">>> Customer WhatsApp skipped: could not normalize phone:", order.address.phone);
    return;
  }

  const itemsSummary = order.items
    .map((i) => `- ${i.name} x${i.quantity}`)
    .join("\n");

  const deliveryStart = new Date(order.estimatedDeliveryStart).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const deliveryEnd = new Date(order.estimatedDeliveryEnd).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const message =
    `Hi ${order.address.name}, thanks for your order! 🎉\n\n` +
    `*Order ID:* ${order.orderId}\n` +
    `${itemsSummary}\n\n` +
    `*Total paid:* ₹${order.grandTotal.toLocaleString("en-IN")}\n` +
    `*Payment method:* ${order.paymentMethod.toUpperCase()}\n\n` +
    `Estimated delivery: ${deliveryStart} – ${deliveryEnd}\n\n` +
    `We'll notify you once it ships. Thank you for shopping with Network Ten!`;

  await sendWhatsAppMessage(customerJid, message, "customer");
}