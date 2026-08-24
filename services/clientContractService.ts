import jsPDF from "jspdf";

import {
  ClientContractFormData,
} from "@/types/interior-design";

/*
 * -------------------------------------------------------
 * SAVE
 * -------------------------------------------------------
 *
 * For now this function is intentionally kept as a
 * service boundary.
 *
 * Connect it to your existing Firebase client-record
 * structure once the final contract database schema
 * is approved.
 */

export async function saveClientContractSubmission(
  form: ClientContractFormData
) {
  /*
   * Basic validation.
   */

  if (!form.clientName.trim()) {
    throw new Error(
      "Client name is required."
    );
  }

  if (!form.clientEmail.trim()) {
    throw new Error(
      "Client email is required."
    );
  }

  if (!form.projectName.trim()) {
    throw new Error(
      "Project name is required."
    );
  }

  /*
   * The contract service is deliberately separated
   * from the UI so Firebase persistence can be
   * connected without changing the form.
   */

  return {
    saved: true,
    kit: "client-contract-kit",
    clientName:
      form.clientName,
    projectName:
      form.projectName,
  };
}

/*
 * -------------------------------------------------------
 * PDF HELPERS
 * -------------------------------------------------------
 */

function addWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight = 5
) {
  const safeText =
    text?.trim() || "Not specified";

  const lines =
    pdf.splitTextToSize(
      safeText,
      width
    );

  pdf.text(
    lines,
    x,
    y
  );

  return (
    y +
    lines.length *
      lineHeight
  );
}

function addSection(
  pdf: jsPDF,
  number: string,
  title: string,
  y: number
) {
  if (y > 260) {
    pdf.addPage();
    y = 20;
  }

  pdf.setFillColor(
    16,
    32,
    72
  );

  pdf.roundedRect(
    15,
    y - 5,
    12,
    10,
    2,
    2,
    "F"
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFontSize(8);

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.text(
    number,
    21,
    y + 1.5,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    16,
    32,
    72
  );

  pdf.setFontSize(13);

  pdf.text(
    title,
    32,
    y + 2
  );

  pdf.setDrawColor(
    139,
    197,
    63
  );

  pdf.setLineWidth(
    0.8
  );

  pdf.line(
    32,
    y + 5,
    48,
    y + 5
  );

  return y + 14;
}

function addLabelValue(
  pdf: jsPDF,
  label: string,
  value: string,
  y: number
) {
  if (y > 270) {
    pdf.addPage();
    y = 20;
  }

  pdf.setTextColor(
    100,
    116,
    139
  );

  pdf.setFontSize(8);

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.text(
    label,
    18,
    y
  );

  pdf.setTextColor(
    30,
    41,
    59
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(9);

  const lines =
    pdf.splitTextToSize(
      value?.trim() ||
        "Not specified",
      155
    );

  pdf.text(
    lines,
    18,
    y + 5
  );

  return (
    y +
    5 +
    lines.length *
      4.5 +
    5
  );
}

/*
 * -------------------------------------------------------
 * GENERATE PDF
 * -------------------------------------------------------
 */

export async function generateClientContractPdf(
  form: ClientContractFormData
): Promise<Blob> {
  const pdf =
    new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

  const pageWidth =
    pdf.internal.pageSize
      .getWidth();

  const pageHeight =
    pdf.internal.pageSize
      .getHeight();

  /*
   * -----------------------------------------------------
   * COVER
   * -----------------------------------------------------
   */

  pdf.setFillColor(
    8,
    17,
    31
  );

  pdf.rect(
    0,
    0,
    pageWidth,
    pageHeight,
    "F"
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(11);

  pdf.text(
    "NETWORK TEN",
    pageWidth / 2,
    55,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    255,
    255,
    255
  );

  pdf.setFontSize(27);

  pdf.text(
    "CLIENT CONTRACT",
    pageWidth / 2,
    78,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFontSize(18);

  pdf.text(
    "KIT",
    pageWidth / 2,
    89,
    {
      align: "center",
    }
  );

  pdf.setDrawColor(
    139,
    197,
    63
  );

  pdf.setLineWidth(
    0.6
  );

  pdf.line(
    70,
    98,
    140,
    98
  );

  pdf.setTextColor(
    203,
    213,
    225
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(10);

  pdf.text(
    "Interior Design Services Agreement",
    pageWidth / 2,
    116,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    255,
    255,
    255
  );

  pdf.setFontSize(12);

  pdf.text(
    form.projectName ||
      "Interior Design Project",
    pageWidth / 2,
    145,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFontSize(9);

  pdf.text(
    "Prepared for",
    pageWidth / 2,
    157,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    255,
    255,
    255
  );

  pdf.setFontSize(15);

  pdf.text(
    form.clientName,
    pageWidth / 2,
    167,
    {
      align: "center",
    }
  );

  pdf.setTextColor(
    148,
    163,
    184
  );

  pdf.setFontSize(8);

  pdf.text(
    "Network Ten · Interior Design",
    pageWidth / 2,
    265,
    {
      align: "center",
    }
  );

  pdf.text(
    "www.networkten.in",
    pageWidth / 2,
    271,
    {
      align: "center",
    }
  );

  /*
   * -----------------------------------------------------
   * MAIN DOCUMENT
   * -----------------------------------------------------
   */

  pdf.addPage();

  let y = 20;

  function header() {
    pdf.setFillColor(
      16,
      32,
      72
    );

    pdf.rect(
      0,
      0,
      pageWidth,
      14,
      "F"
    );

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(8);

    pdf.text(
      "NETWORK TEN",
      15,
      9
    );

    pdf.setTextColor(
      139,
      197,
      63
    );

    pdf.text(
      "CLIENT CONTRACT KIT",
      pageWidth - 15,
      9,
      {
        align: "right",
      }
    );

    pdf.setTextColor(
      100,
      116,
      139
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(7);

    pdf.text(
      "Confidential project document",
      pageWidth / 2,
      pageHeight - 8,
      {
        align: "center",
      }
    );
  }

  header();

  y = 25;

  /*
   * INTRODUCTION
   */

  pdf.setTextColor(
    16,
    32,
    72
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(18);

  pdf.text(
    "Client Contract",
    18,
    y
  );

  y += 9;

  pdf.setTextColor(
    100,
    116,
    139
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(9);

  y = addWrappedText(
    pdf,
    "This document records the project and commercial information entered for the Network Ten interior design engagement. The final contractual terms should be reviewed and approved by the authorized parties before execution.",
    18,
    y,
    174,
    4.5
  );

  y += 8;

  /*
   * 01 PARTIES
   */

  y = addSection(
    pdf,
    "01",
    "Parties & Project",
    y
  );

  y = addLabelValue(
    pdf,
    "Client",
    form.clientName,
    y
  );

  y = addLabelValue(
    pdf,
    "Client Email",
    form.clientEmail,
    y
  );

  y = addLabelValue(
    pdf,
    "Client Phone",
    form.clientPhone,
    y
  );

  y = addLabelValue(
    pdf,
    "Client Address",
    form.clientAddress,
    y
  );

  y = addLabelValue(
    pdf,
    "Project",
    form.projectName,
    y
  );

  y = addLabelValue(
    pdf,
    "Project Address",
    form.projectAddress,
    y
  );

  y = addLabelValue(
    pdf,
    "Property Type",
    form.propertyType,
    y
  );

  /*
   * 02 SCOPE
   */

  y += 4;

  y = addSection(
    pdf,
    "02",
    "Scope & Deliverables",
    y
  );

  y = addLabelValue(
    pdf,
    "Scope of Work",
    form.scopeOfWork,
    y
  );

  y = addLabelValue(
    pdf,
    "Included Spaces",
    form.includedSpaces,
    y
  );

  y = addLabelValue(
    pdf,
    "Deliverables",
    form.deliverables,
    y
  );

  y = addLabelValue(
    pdf,
    "Service Level",
    form.serviceLevel,
    y
  );

  /*
   * 03 COMMERCIAL
   */

  y += 4;

  y = addSection(
    pdf,
    "03",
    "Fees & Payment",
    y
  );

  y = addLabelValue(
    pdf,
    "Total Project Fee",
    form.totalProjectFee,
    y
  );

  y = addLabelValue(
    pdf,
    "Design Fee",
    form.designFee,
    y
  );

  y = addLabelValue(
    pdf,
    "Payment Schedule",
    form.paymentSchedule,
    y
  );

  /*
   * 04 TIMELINE
   */

  y += 4;

  y = addSection(
    pdf,
    "04",
    "Timeline & Revisions",
    y
  );

  y = addLabelValue(
    pdf,
    "Estimated Start",
    form.estimatedStartDate,
    y
  );

  y = addLabelValue(
    pdf,
    "Estimated Completion",
    form.estimatedCompletionDate,
    y
  );

  y = addLabelValue(
    pdf,
    "Included Revisions",
    form.includedRevisions,
    y
  );

  y = addLabelValue(
    pdf,
    "Additional Revision Fee",
    form.additionalRevisionFee,
    y
  );

  /*
   * 05 RESPONSIBILITIES
   */

  y += 4;

  y = addSection(
    pdf,
    "05",
    "Responsibilities",
    y
  );

  y = addLabelValue(
    pdf,
    "Client Responsibilities",
    form.clientResponsibilities,
    y
  );

  y = addLabelValue(
    pdf,
    "Network Ten Responsibilities",
    form.networkTenResponsibilities,
    y
  );

  y = addLabelValue(
    pdf,
    "Exclusions",
    form.exclusions,
    y
  );

  /*
   * 06 TERMS
   */

  y += 4;

  y = addSection(
    pdf,
    "06",
    "Project Terms",
    y
  );

  y = addLabelValue(
    pdf,
    "Cancellation / Termination",
    form.cancellationTerms,
    y
  );

  y = addLabelValue(
    pdf,
    "Intellectual Property",
    form.intellectualPropertyTerms,
    y
  );

  y = addLabelValue(
    pdf,
    "Confidentiality",
    form.confidentialityTerms,
    y
  );

  y = addLabelValue(
    pdf,
    "Dispute Resolution",
    form.disputeResolutionTerms,
    y
  );

  y = addLabelValue(
    pdf,
    "Additional Notes",
    form.additionalNotes,
    y
  );

  /*
   * 07 ACCEPTANCE
   */

  if (y > 235) {
    pdf.addPage();
    header();
    y = 25;
  }

  y += 4;

  y = addSection(
    pdf,
    "07",
    "Client Acceptance",
    y
  );

  y = addLabelValue(
    pdf,
    "Client Acceptance",
    form.clientAccepted
      ? "Accepted"
      : "Not Accepted",
    y
  );

  y = addLabelValue(
    pdf,
    "Client Signature / Name",
    form.clientSignature,
    y
  );

  y = addLabelValue(
    pdf,
    "Acceptance Date",
    form.acceptanceDate,
    y
  );

  /*
   * SIGNATURE BLOCK
   */

  if (y > 235) {
    pdf.addPage();
    header();
    y = 25;
  }

  y += 10;

  pdf.setDrawColor(
    203,
    213,
    225
  );

  pdf.line(
    18,
    y,
    90,
    y
  );

  pdf.line(
    120,
    y,
    192,
    y
  );

  pdf.setTextColor(
    71,
    85,
    105
  );

  pdf.setFontSize(8);

  pdf.text(
    "Client Signature",
    18,
    y + 5
  );

  pdf.text(
    "Network Ten Authorized Representative",
    120,
    y + 5
  );

  /*
   * FOOTER
   */

  const pages =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= pages;
    page++
  ) {
    pdf.setPage(page);

    pdf.setTextColor(
      100,
      116,
      139
    );

    pdf.setFontSize(7);

    pdf.text(
      "Network Ten · Interior Design",
      15,
      pageHeight - 8
    );

    pdf.text(
      `Page ${page} of ${pages}`,
      pageWidth - 15,
      pageHeight - 8,
      {
        align: "right",
      }
    );
  }

  return pdf.output(
    "blob"
  );
}