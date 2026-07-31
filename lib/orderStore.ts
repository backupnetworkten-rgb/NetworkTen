// lib/orderStore.ts
import { db, auth } from "@/lib/firebase";
import {
  collection, addDoc, getDocs, getDoc, query,
  orderBy, serverTimestamp, doc, setDoc,
} from "firebase/firestore";

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  salePrice: number;
  quantity: number;
}

export interface OrderBilling {
  isB2BInvoice: boolean;
  gstNumber: string;
  companyName: string;
  gstRate: number;
  taxableValue: number;
  gstAmount: number;
}

export type OrderStatus = "confirmed" | "cancelled";

export interface Order {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  codCharge?: number;
  grandTotal: number;
  totalQty: number;
  paymentMethod: string;
  paymentId?: string | null;
  billing?: OrderBilling;
  note?: string;
  status?: OrderStatus;
  cancelledAt?: string;
  address: {
    name: string;
    line1: string;
    line2?: string;
    phone: string;
    tag: string;
    city: string;
    state: string;
    pin: string;
    country?: string;
  };
  estimatedDeliveryStart: string;
  estimatedDeliveryEnd: string;
  shiprocket?: {
    orderId?: number;
    shipmentId?: number;
    status?: string;
  };
}

// ─── Cancellation window ────────────────────────────────────────────────────
export const CANCELLATION_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function canCancelOrder(order: Order): boolean {
  if (order.status === "cancelled") return false;
  const placedAt = new Date(order.placedAt).getTime();
  if (Number.isNaN(placedAt)) return false;
  return Date.now() - placedAt < CANCELLATION_WINDOW_MS;
}

export function cancelDeadline(order: Order): Date {
  return new Date(new Date(order.placedAt).getTime() + CANCELLATION_WINDOW_MS);
}

export function generateOrderId(): string {
  return "NT" + Date.now().toString(36).toUpperCase();
}

export async function saveLastOrder(order: Order): Promise<void> {
  const orderToSave: Order = { status: "confirmed", ...order };

  // Always save to localStorage as fallback
  const existing = getLocalOrders();
  const updated = [orderToSave, ...existing];
  localStorage.setItem("nt_orders", JSON.stringify(updated));

  // Save to Firestore if logged in
  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(
        doc(db, "users", user.uid, "orders", order.orderId),
        { ...orderToSave, createdAt: serverTimestamp() }
      );
    } catch (e) {
      console.error("Firestore order save failed:", e);
      throw e; // re-throw so finalizeOrder's try/catch can react to it
    }
  }
}

export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("nt_orders");
    if (!raw) {
      const old = localStorage.getItem("lastOrder");
      if (old) {
        const parsed = JSON.parse(old);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

export async function fetchUserOrders(): Promise<Order[]> {
  const user = auth.currentUser;
  if (!user) return getLocalOrders();
  try {
    const ref = collection(db, "users", user.uid, "orders");
    const snap = await getDocs(query(ref, orderBy("placedAt", "desc")));
    return snap.docs.map((d) => d.data() as Order);
  } catch {
    return getLocalOrders();
  }
}

// Fetch a single order by id for the current user (used by the
// email "Cancel Order" deep-link page, which lands on a specific order).
export async function fetchOrderById(orderId: string): Promise<Order | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    const snap = await getDoc(doc(db, "users", user.uid, "orders", orderId));
    return snap.exists() ? (snap.data() as Order) : null;
  } catch (e) {
    console.error("fetchOrderById failed:", e);
    return null;
  }
}

// Cancel an order. Updates Firestore + localStorage, then asks the
// server to send cancellation emails (must run server-side since EmailJS
// uses a private key there). Throws if outside the 24hr window.
export async function cancelOrder(order: Order): Promise<Order> {
  if (!canCancelOrder(order)) {
    throw new Error("This order can no longer be cancelled (24-hour window has passed).");
  }

  const cancelledAt = new Date().toISOString();
  const updatedOrder: Order = { ...order, status: "cancelled", cancelledAt };

  // Update localStorage
  try {
    const existing = getLocalOrders();
    const updatedLocal = existing.map((o) =>
      o.orderId === order.orderId ? updatedOrder : o
    );
    localStorage.setItem("nt_orders", JSON.stringify(updatedLocal));
  } catch (e) {
    console.error("Failed to update local order on cancel:", e);
  }

  // Update Firestore
  const user = auth.currentUser;
  if (user) {
    await setDoc(
      doc(db, "users", user.uid, "orders", order.orderId),
      { status: "cancelled", cancelledAt },
      { merge: true }
    );
  }

  // Notify server to send cancellation emails (best-effort — order is
  // already cancelled even if this fails, so don't block/throw on it)
  try {
    const res = await fetch("/api/cancel-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: updatedOrder,
        customerEmail: user?.email ?? null,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Cancellation email trigger failed:", data);
    }
  } catch (e) {
    console.error("Failed to reach /api/cancel-order:", e);
  }

  return updatedOrder;
}

// Updates Shiprocket info on both Firestore AND localStorage.
// Strips out any `undefined` values first, since Firestore's setDoc()
// throws if any field value is undefined (found in field ...).
export async function updateOrderShiprocketInfo(
  orderId: string,
  shiprocketData: { orderId?: number; shipmentId?: number; status?: string }
): Promise<void> {
  const cleanData: Record<string, any> = {};
  Object.entries(shiprocketData).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanData[key] = value;
    }
  });

  try {
    const existing = getLocalOrders();
    const updated = existing.map((o) =>
      o.orderId === orderId
        ? { ...o, shiprocket: { ...o.shiprocket, ...cleanData } }
        : o
    );
    localStorage.setItem("nt_orders", JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to update local order with Shiprocket info:", e);
  }

  const user = auth.currentUser;
  if (!user) return;
  try {
    await setDoc(
      doc(db, "users", user.uid, "orders", orderId),
      { shiprocket: cleanData },
      { merge: true }
    );
  } catch (e) {
    console.error("Failed to update order with Shiprocket info:", e);
  }
}