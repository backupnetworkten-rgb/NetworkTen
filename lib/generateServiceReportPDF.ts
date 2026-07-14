import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ServiceReport } from "@/types/serviceReport";
import { COMPANY_INFO } from "@/lib/companyInfo";

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Could not load logo for PDF:", err);
    return null;
  }
}

// Reads the natural width/height of a base64 image so we can scale it into
// the signature box without distorting it.
function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

const NAVY: [number, number, number] = [8, 20, 46];
const GREEN: [number, number, number] = [139, 197, 63];
const LIGHT_GREY: [number, number, number] = [242, 244, 247];

function row(label: string, value?: string) {
  return `${label}: ${value || "-"}`;
}

// A full-width bold section header row inside the table body.
function sectionHeader(title: string) {
  return [
    {
      content: title,
      colSpan: 2,
      styles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9.5,
        cellPadding: { top: 6, bottom: 6, left: 8, right: 8 },
      },
    },
  ];
}

export async function generateServiceReportPDF(report: ServiceReport) {
  const docPdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = docPdf.internal.pageSize.getWidth();
  const pageHeight = docPdf.internal.pageSize.getHeight();
  const margin = 40;

  // ── HEADER: logo + company details ─────────────────────────
  const logoDataUrl = await loadImageAsDataUrl(COMPANY_INFO.logoUrl);
  let cursorY = 40;

  if (logoDataUrl) {
    try {
      docPdf.addImage(logoDataUrl, "PNG", margin, cursorY - 10, 130, 42);
    } catch {
      // if the logo fails to embed, continue without it
    }
  }

  docPdf.setFont("helvetica", "bold");
  docPdf.setFontSize(10);
  docPdf.text(COMPANY_INFO.name, pageWidth - margin, cursorY, { align: "right" });

  docPdf.setFont("helvetica", "normal");
  docPdf.setFontSize(8.5);
  docPdf.text(COMPANY_INFO.addressLine1, pageWidth - margin, cursorY + 12, { align: "right" });
  docPdf.text(COMPANY_INFO.addressLine2, pageWidth - margin, cursorY + 24, { align: "right" });
  docPdf.text(`Phone: ${COMPANY_INFO.phone}`, pageWidth - margin, cursorY + 36, { align: "right" });
  docPdf.text(`Email: ${COMPANY_INFO.email}`, pageWidth - margin, cursorY + 48, { align: "right" });

  cursorY += 74;

  // ── TITLE (bold, more breathing room) ──────────────────────
  docPdf.setFillColor(...NAVY);
  docPdf.rect(margin, cursorY, pageWidth - margin * 2, 32, "F");
  docPdf.setTextColor(255, 255, 255);
  docPdf.setFont("helvetica", "bold");
  docPdf.setFontSize(15);
  docPdf.text("CUSTOMER SERVICE REPORT", pageWidth / 2, cursorY + 21, { align: "center" });
  docPdf.setTextColor(0, 0, 0);

  cursorY += 32 + 20;

  const body: any[] = [
    sectionHeader("Report Info"),
    [row("CSR No.", report.csrNo), row("Date", report.date)],

    sectionHeader("Customer Details"),
    [{ content: row("Customer Name", report.customerName), colSpan: 2 }],
    [{ content: row("Address", report.address), colSpan: 2 }],
    [row("City", report.city), `${row("State", report.state)}   ${row("Zip Code", report.zipCode)}`],

    sectionHeader("Call Details"),
    [row("Nature of Call", report.natureOfCall), row("Instruction From", report.instructionFrom)],
    [{ content: row("Nature of Problem", report.natureOfProblem), colSpan: 2 }],
    [{ content: row("Detail Problem Reported", report.detailProblemReported), colSpan: 2 }],

    sectionHeader("Equipment Details"),
    [row("Equipment Status", report.equipmentStatus), row("Equipment Type", report.equipmentType)],
    [row("Make", report.make), `${row("Model", report.model)}   ${row("Serial No.", report.serialNo)}`],

    sectionHeader("Engineer Details"),
    [
      row("Engineer Name(s)", report.engineerNames),
      `${row("Mobile", report.engineerMobile)}   ${row("Email", report.engineerEmail)}`,
    ],
    [{ content: row("Location of Installation", report.locationOfInstallation), colSpan: 2 }],
    [{ content: row("Equipment Details", report.equipmentsDetails), colSpan: 2 }],

    sectionHeader("Service Summary"),
    [row("Engineer's Remarks", report.engineerRemarks), row("Status after Service", report.statusAfterService)],
    [{ content: row("Defects Found on Inspection", report.defectsFoundOnInspection), colSpan: 2 }],
    [
      row("Event (Date & Time)", report.eventDateTime),
      `${row("Start of Service", report.startOfService)}   ${row("End of Service", report.endOfService)}`,
    ],

    sectionHeader("Customer Feedback"),
    [
      {
        content: row("Customer Rating", report.customerRating),
        colSpan: 2,
        styles: {
          fillColor: GREEN,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
      },
    ],
    [{ content: row("Customer Feedback Remarks", report.customerFeedbackRemarks), colSpan: 2 }],
    [row("Name", report.customerRepName), row("Designation", report.customerRepDesignation)],
    [row("Phone", report.customerRepPhone), row("Email", report.customerRepEmail)],
    [row("Signature Date", report.signatureDate), row("Place", report.signaturePlace)],
  ];

  autoTable(docPdf, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    theme: "grid",
    styles: {
      fontSize: 8.5,
      cellPadding: 6,
      textColor: [30, 30, 30],
      lineColor: [200, 200, 200],
      lineWidth: 0.5,
    },
    columnStyles: {
      0: { cellWidth: (pageWidth - margin * 2) / 2 },
      1: { cellWidth: (pageWidth - margin * 2) / 2 },
    },
    alternateRowStyles: { fillColor: LIGHT_GREY },
    body,
  });

  let finalY = (docPdf as any).lastAutoTable.finalY || cursorY;

  // ── CUSTOMER SIGNATURE ──────────────────────────────────────
  const sigBoxWidth = pageWidth - margin * 2;
  const sigBoxHeight = 110;
  let sigY = finalY + 24;

  // If the signature (plus footer) won't fit on this page, start a fresh page
  if (sigY + sigBoxHeight + 40 > pageHeight - margin) {
    docPdf.addPage();
    sigY = margin;
  }

  docPdf.setFont("helvetica", "bold");
  docPdf.setFontSize(10.5);
  docPdf.setTextColor(0, 0, 0);
  docPdf.text("Customer Signature", margin, sigY);

  const boxTop = sigY + 8;
  docPdf.setDrawColor(200, 200, 200);
  docPdf.setLineWidth(0.75);
  docPdf.rect(margin, boxTop, sigBoxWidth, sigBoxHeight);

  if (report.customerSignature) {
    try {
      const { width: natW, height: natH } = await getImageDimensions(
        report.customerSignature
      );
      // Fit signature inside the box with padding, preserving aspect ratio
      const padding = 12;
      const maxW = sigBoxWidth - padding * 2;
      const maxH = sigBoxHeight - padding * 2;
      const scale = Math.min(maxW / natW, maxH / natH);
      const drawW = natW * scale;
      const drawH = natH * scale;
      const drawX = margin + (sigBoxWidth - drawW) / 2;
      const drawY = boxTop + (sigBoxHeight - drawH) / 2;

      docPdf.addImage(
        report.customerSignature,
        "PNG",
        drawX,
        drawY,
        drawW,
        drawH
      );
    } catch (err) {
      console.error("Could not embed signature in PDF:", err);
    }
  } else {
    docPdf.setFont("helvetica", "italic");
    docPdf.setFontSize(9);
    docPdf.setTextColor(150, 150, 150);
    docPdf.text(
      "No signature captured",
      margin + sigBoxWidth / 2,
      boxTop + sigBoxHeight / 2,
      { align: "center" }
    );
    docPdf.setTextColor(0, 0, 0);
  }

  finalY = boxTop + sigBoxHeight;

  // ── FOOTER ──────────────────────────────────────────────────
  docPdf.setFont("helvetica", "normal");
  docPdf.setFontSize(8);
  docPdf.setTextColor(120, 120, 120);
  docPdf.text(
    `Generated by ${COMPANY_INFO.name} — ${COMPANY_INFO.tagline}`,
    pageWidth / 2,
    finalY + 24,
    { align: "center" }
  );

  const fileName = `Service_Report_${report.csrNo || report.id || "draft"}.pdf`;
  docPdf.save(fileName);
}