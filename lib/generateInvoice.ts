// lib/generateInvoice.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Order } from "@/lib/orderStore";

const NAVY  = "#182644";
const GOLD  = "#9C7A34";
const INK   = "#1C1A16";
const MUTED = "#726B5C";
const LINE  = "#E7E0D0";

// ─── Company / seller details for the invoice letterhead ───
// Keep this in sync with the COMPANY constant on the order-success page.
const COMPANY = {
  name:      "Network Ten",
  legalName: "Network Ten",
  addressLine1: "Part 1, E3/37D Uttam Nagar",
  addressLine2: "Chanakya Place, New Delhi – 110059",
  addressLine3: "Delhi, India",
  gstin:   "07AAAAA0000A1Z5",
  phone:   "+91 8687878755",
  email:   "info@networkten.in",
  website: "www.networkten.in",
};

// Path to the logo file inside /public — resolves to public/images/logo.png
const LOGO_PATH = "/images/logo.png";

const fmt = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

/**
 * Fetches an image (from /public or any same-origin URL) and converts it
 * to a base64 data URL so jsPDF's addImage() can embed it.
 * Returns null if the fetch/conversion fails, so the PDF can still be
 * generated (with a fallback) instead of crashing.
 */
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Failed to load logo for invoice:", err);
    return null;
  }
}

/** Detects the image format jsPDF needs from a data URL's MIME type. */
function getImageFormat(dataUrl: string): "PNG" | "JPEG" {
  return dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg")
    ? "JPEG"
    : "PNG";
}

export async function generateInvoice(order: Order) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;

  // Load the logo before drawing anything so it's ready in time for the header
  const logoData = await loadImageAsBase64(LOGO_PATH);

  // ══════════════════════════════════════════════════════════
  // HEADER BAND — logo + company letterhead ←→ INVOICE + meta
  // ══════════════════════════════════════════════════════════
  const headerH = 132;
  doc.setFillColor(NAVY);
  doc.rect(0, 0, pageW, headerH, "F");

  // Logo — real image if it loaded, otherwise a clean fallback monogram
  const logoX = margin, logoY = 26, logoSize = 40;
  if (logoData) {
    // White rounded backing so logos with transparency stay legible on navy
    doc.setFillColor("#FFFFFF");
    doc.roundedRect(logoX, logoY, logoSize, logoSize, 8, 8, "F");
    doc.addImage(
      logoData,
      getImageFormat(logoData),
      logoX + 3, logoY + 3, logoSize - 6, logoSize - 6
    );
  } else {
    // Fallback: initials monogram if the logo couldn't be loaded
    doc.setFillColor("#101c34");
    doc.roundedRect(logoX, logoY, logoSize, logoSize, 8, 8, "F");
    doc.setDrawColor("#FFFFFF");
    doc.setLineWidth(0.6);
    doc.roundedRect(logoX, logoY, logoSize, logoSize, 8, 8, "S");
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const initials = COMPANY.legalName.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
    doc.text(initials, logoX + logoSize / 2, logoY + logoSize / 2 + 5, { align: "center" });
  }

  // Company name + address block, next to logo
  const textX = logoX + logoSize + 14;
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text(COMPANY.name, textX, logoY + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor("#C7CEE0");
  doc.text(COMPANY.legalName, textX, logoY + 30);
  doc.text(`${COMPANY.addressLine1}, ${COMPANY.addressLine2}`, textX, logoY + 42);
  doc.text(`${COMPANY.phone}  ·  ${COMPANY.email}  ·  ${COMPANY.website}`, textX, logoY + 54);

  // INVOICE label + meta, right-aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#FFFFFF");
  doc.text("INVOICE", pageW - margin, 44, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor("#D8DEEC");
  doc.text(`Invoice No.: ${order.orderId}`, pageW - margin, 62, { align: "right" });
  doc.text(`Invoice Date: ${fmtDate(order.placedAt)}`, pageW - margin, 76, { align: "right" });
  if (order.billing?.isB2BInvoice) {
    doc.text(`Seller GSTIN: ${COMPANY.gstin}`, pageW - margin, 90, { align: "right" });
  }

  // Thin gold accent line under header
  doc.setFillColor(GOLD);
  doc.rect(0, headerH, pageW, 3, "F");

  let y = headerH + 34;

  // ── Paid stamp + transaction id ─────────────
  doc.setFillColor("#EBF6EF");
  doc.setDrawColor("#C7E6D2");
  doc.roundedRect(margin, y, pageW - margin * 2, 46, 6, 6, "FD");

  doc.setTextColor("#1D7A46");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(
    order.paymentMethod === "upi" ? "PAYMENT RECEIVED" : "PAYMENT CONFIRMED (COD)",
    margin + 14,
    y + 20
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(MUTED);
  if (order.paymentId) {
    doc.text(`Transaction ID: ${order.paymentId}`, margin + 14, y + 36);
  } else {
    doc.text(`Payment Method: Cash on Delivery`, margin + 14, y + 36);
  }
  y += 70;

  // ── Billing / shipping address ──────────────
  doc.setTextColor(INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Billed / Shipped To", margin, y);

  if (order.billing?.isB2BInvoice) {
    doc.text("GST Details", pageW - margin, y, { align: "right" });
  }
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(MUTED);
  const addrLines = [
    order.address.name,
    order.address.line1 + (order.address.line2 ? `, ${order.address.line2}` : ""),
    `${order.address.city}${order.address.state ? `, ${order.address.state}` : ""} - ${order.address.pin}`,
    order.address.phone,
  ];
  addrLines.forEach((line, i) => doc.text(line, margin, y + i * 14));

  if (order.billing?.isB2BInvoice) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(INK);
    doc.text(order.billing.companyName || "—", pageW - margin, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED);
    doc.text(`GSTIN: ${order.billing.gstNumber}`, pageW - margin, y + 14, { align: "right" });
  }

  y += addrLines.length * 14 + 24;

  // ── Items table ──────────────────────────────
  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Item", "Qty", "Price", "Amount"]],
    body: order.items.map((it) => [
      `${it.brand}\n${it.name}`,
      String(it.quantity),
      fmt(it.salePrice),
      fmt(it.salePrice * it.quantity),
    ]),
    styles: { font: "helvetica", fontSize: 9, cellPadding: 8, textColor: INK, lineColor: LINE },
    headStyles: { fillColor: NAVY, textColor: "#FFFFFF", fontStyle: "bold" },
    alternateRowStyles: { fillColor: "#FBF9F4" },
    columnStyles: {
      1: { halign: "center", cellWidth: 50 },
      2: { halign: "right", cellWidth: 80 },
      3: { halign: "right", cellWidth: 80 },
    },
  });

  // @ts-ignore - lastAutoTable is added by the plugin at runtime
  y = doc.lastAutoTable.finalY + 24;

  // ── Totals box ───────────────────────────────
  // GST is always included in the item prices — it is never added on top.
  // When a GSTIN was provided at checkout, the GST portion is itemised below
  // purely for the invoice paper trail; it does not change the total.
  const boxX = pageW - margin - 220;
  const rows: [string, string][] = [];

  rows.push(["Subtotal", fmt(order.subtotal)]);
  if (order.discount > 0) rows.push(["Coupon Discount", `- ${fmt(order.discount)}`]);
  rows.push(["Delivery", order.shipping === 0 ? "FREE" : fmt(order.shipping)]);

  if (order.billing?.taxableValue != null && order.billing?.gstAmount != null) {
    rows.push(["Taxable Value", fmt(order.billing.taxableValue)]);
    rows.push([`GST (${((order.billing.gstRate ?? 0.18) * 100).toFixed(0)}%)`, `Included · ${fmt(order.billing.gstAmount)}`]);
  } else {
    rows.push(["Tax", "Included"]);
  }

  doc.setFontSize(9.5);
  rows.forEach(([label, value], i) => {
    doc.setTextColor(MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(label, boxX, y + i * 16);
    doc.setTextColor(INK);
    doc.setFont("helvetica", "bold");
    doc.text(value, pageW - margin, y + i * 16, { align: "right" });
  });

  y += rows.length * 16 + 8;
  doc.setDrawColor(LINE);
  doc.line(boxX, y, pageW - margin, y);
  y += 20;

  doc.setFontSize(12);
  doc.setTextColor(INK);
  doc.setFont("helvetica", "bold");
  doc.text("Total Paid", boxX, y);
  doc.setTextColor(GOLD);
  doc.text(fmt(order.grandTotal), pageW - margin, y, { align: "right" });

  // ── Footer ───────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setDrawColor(LINE);
  doc.line(margin, footerY - 14, pageW - margin, footerY - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(MUTED);
  doc.text("This is a system-generated invoice and does not require a signature.", margin, footerY);
  doc.text(`${COMPANY.name} · ${COMPANY.email}`, pageW - margin, footerY, { align: "right" });

  doc.save(`Invoice_${order.orderId}.pdf`);
}