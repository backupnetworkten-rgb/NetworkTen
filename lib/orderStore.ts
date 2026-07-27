// lib/orderStore.ts
import { db, auth } from "@/lib/firebase";
import {
  collection, addDoc, getDocs, query,
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

export interface Order {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;
  totalQty: number;
  paymentMethod: string;
  paymentId?: string | null;
  billing?: OrderBilling;
  note?: string; // NEW: optional customer order note
  address: {
    name: string;
    line1: string;
    line2?: string;
    phone: string;
    tag: string;
    city: string;
    state: string;
    pin: string;
  };
  estimatedDeliveryStart: string;
  estimatedDeliveryEnd: string;
  shiprocket?: {
    orderId?: number;
    shipmentId?: number;
    status?: string;
  };
}

export function generateOrderId(): string {
  return "NT" + Date.now().toString(36).toUpperCase();
}

export async function saveLastOrder(order: Order): Promise<void> {
  // Always save to localStorage as fallback
  const existing = getLocalOrders();
  const updated = [order, ...existing];
  localStorage.setItem("nt_orders", JSON.stringify(updated));

  // Save to Firestore if logged in
  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(
        doc(db, "users", user.uid, "orders", order.orderId),
        { ...order, createdAt: serverTimestamp() }
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