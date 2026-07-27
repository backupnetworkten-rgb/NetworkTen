import type { Order } from "@/lib/orderStore";

const INSTANCE_ID = process.env.GREEN_API_INSTANCE_ID;
const API_TOKEN = process.env.GREEN_API_TOKEN;

// Normalizes a raw Indian phone number into Green API's chatId format.
function toChatId(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 10) return `91${digits}@c.us`;
  if (digits.length === 12 && digits.startsWith("91")) return `${digits}@c.us`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}@c.us`;

  return null;
}

async function sendWhatsAppMessage(chatId: string, message: string, label: string) {
  if (!INSTANCE_ID || !API_TOKEN) {
    console.error(`>>> WhatsApp (${label}) skipped: missing GREEN_API_INSTANCE_ID or GREEN_API_TOKEN`);
    return;
  }

  const url = `https://api.green-api.com/waInstance${INSTANCE_ID}/sendMessage/${API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message }),
    });

    const data = await res.json();
    console.log(`>>> WhatsApp (${label}) response:`, res.status, JSON.stringify(data));

    if (!res.ok) {
      console.error(`>>> WhatsApp (${label}) send failed:`, res.status, JSON.stringify(data));
    }
  } catch (err) {
    console.error(`>>> WhatsApp (${label}) request threw:`, err);
  }
}

export async function sendOwnerWhatsApp(order: Order) {
  const ownerNumberRaw = process.env.OWNER_WHATSAPP_NUMBER;
  if (!ownerNumberRaw) {
    console.error(">>> Owner WhatsApp skipped: missing OWNER_WHATSAPP_NUMBER");
    return;
  }

  const ownerChatId = toChatId(ownerNumberRaw);
  if (!ownerChatId) {
    console.error(">>> Owner WhatsApp skipped: could not normalize OWNER_WHATSAPP_NUMBER:", ownerNumberRaw);
    return;
  }

  const itemsSummary = order.items
    .map((i) => `- ${i.name} (${i.brand}) x${i.quantity}`)
    .join("\n");

  const orderNote = order.note?.trim(); // NEW

  const message =
    `🛒 *New Order Received*\n` +
    `Order ID: ${order.orderId}\n` +
    `Customer: ${order.address.name}\n` +
    `Phone: ${order.address.phone}\n\n` +
    `${itemsSummary}\n\n` +
    `Total: ₹${order.grandTotal.toLocaleString("en-IN")}\n` +
    `Payment: ${order.paymentMethod.toUpperCase()}${order.paymentId ? " (" + order.paymentId + ")" : ""}\n\n` +
    (orderNote ? `📝 *Note:* ${orderNote}\n\n` : "") + // NEW
    `Ship to:\n${order.address.line1}${order.address.line2 ? ", " + order.address.line2 : ""}\n` +
    `${order.address.city}, ${order.address.state} - ${order.address.pin}`;

  await sendWhatsAppMessage(ownerChatId, message, "owner");
}

export async function sendCustomerWhatsApp(order: Order) {
  const customerChatId = toChatId(order.address.phone);

  if (!customerChatId) {
    console.error(">>> Customer WhatsApp skipped: could not normalize phone:", order.address.phone);
    return;
  }

  const itemsSummary = order.items.map((i) => `- ${i.name} x${i.quantity}`).join("\n");

  const deliveryStart = new Date(order.estimatedDeliveryStart).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const deliveryEnd = new Date(order.estimatedDeliveryEnd).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const orderNote = order.note?.trim(); // NEW

  const message =
    `Hi ${order.address.name}, thanks for your order! 🎉\n\n` +
    `*Order ID:* ${order.orderId}\n` +
    `${itemsSummary}\n\n` +
    `*Total paid:* ₹${order.grandTotal.toLocaleString("en-IN")}\n` +
    `*Payment method:* ${order.paymentMethod.toUpperCase()}\n\n` +
    (orderNote ? `*Your note:* ${orderNote}\n\n` : "") + // NEW
    `Estimated delivery: ${deliveryStart} – ${deliveryEnd}\n\n` +
    `We'll notify you once it ships. Thank you for shopping with Network Ten!`;

  await sendWhatsAppMessage(customerChatId, message, "customer");
}