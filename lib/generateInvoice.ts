// lib/generateInvoice.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Order } from "@/lib/orderStore";

const NAVY  = "#182644";
const GOLD  = "#9C7A34";
const INK   = "#1C1A16";
const MUTED = "#726B5C";
const LINE  = "#E7E0D0";

const fmt = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export function generateInvoice(order: Order) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;

  // ── Header band ─────────────────────────────
  doc.setFillColor(NAVY);
  doc.rect(0, 0, pageW, 90, "F");

  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Network Ten", margin, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#D8DEEC");
  doc.text("TAX INVOICE", margin, 62);

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text(`Invoice #: ${order.orderId}`, pageW - margin, 40, { align: "right" });
  doc.text(`Date: ${fmtDate(order.placedAt)}`, pageW - margin, 56, { align: "right" });

  let y = 120;

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
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(MUTED);
  const addrLines = [
    order.address.name,
    order.address.line1 + (order.address.line2 ? `, ${order.address.line2}` : ""),
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
  const boxX = pageW - margin - 220;
  const rows: [string, string][] = [];

  if (order.billing?.isB2BInvoice) {
    rows.push(["Taxable Value", fmt(order.billing.taxableValue)]);
    if (order.discount > 0) rows.push(["Coupon Discount", `- ${fmt(order.discount)}`]);
    rows.push([`GST (${(order.billing.gstRate * 100).toFixed(0)}%)`, fmt(order.billing.gstAmount)]);
    rows.push(["Delivery", order.shipping === 0 ? "FREE" : fmt(order.shipping)]);
  } else {
    rows.push(["Subtotal", fmt(order.subtotal)]);
    if (order.discount > 0) rows.push(["Coupon Discount", `- ${fmt(order.discount)}`]);
    rows.push(["Delivery", order.shipping === 0 ? "FREE" : fmt(order.shipping)]);
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
  doc.text("Network Ten · support@networkten.com", pageW - margin, footerY, { align: "right" });

  doc.save(`Invoice_${order.orderId}.pdf`);
}