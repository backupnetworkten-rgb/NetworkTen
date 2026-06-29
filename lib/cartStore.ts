// src/lib/cartStore.ts
"use client";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  stock: number;
}

const CART_KEY   = "nt_cart";
const CART_EVENT = "nt_cart_updated";

// ── private helpers ───────────────────────────────────────────────────────────

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

// ── public API ────────────────────────────────────────────────────────────────

export function getCart(): CartItem[] {
  return read();
}

export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
  const items = read();
  const qty   = item.quantity ?? 1;
  const idx   = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx].quantity = Math.min(items[idx].stock, items[idx].quantity + qty);
  } else {
    items.push({ ...item, quantity: qty } as CartItem);
  }
  write(items);
}

export function updateQuantity(id: string, quantity: number) {
  const items = read();
  const idx   = items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    if (quantity <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].quantity = Math.min(items[idx].stock, quantity);
    }
    write(items);
  }
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

/** Subscribe to cart changes. Returns an unsubscribe function. */
export function onCartChange(cb: () => void): () => void {
  window.addEventListener(CART_EVENT, cb);
  return () => window.removeEventListener(CART_EVENT, cb);
}