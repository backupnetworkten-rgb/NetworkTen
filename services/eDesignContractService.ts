import jsPDF from "jspdf";

import {
  EDesignContractFormData,
} from "@/types/interior-design";

/* =========================================================
   SAVE
========================================================= */

export async function saveEDesignContractSubmission(
  form: EDesignContractFormData
) {
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

  if (!form.serviceLevel.trim()) {
    throw new Error(
      "E-Design service level is required."
    );
  }

  return {
    saved: true,

    kit:
      "e-design-contract-kit",

    clientName:
      form.clientName,

    projectName:
      form.projectName,
  };
}

/* =========================================================
   TEXT HELPERS
========================================================= */

function addWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight = 4.5
) {
  const safeText =
    text?.trim() ||
    "Not specified";

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

    y = 22;
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

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(8);

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
  if (y > 268) {
    pdf.addPage();

    y = 22;
  }

  pdf.setTextColor(
    100,
    116,
    139
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(8);

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
      174
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

/* =========================================================
   HEADER
========================================================= */

function addHeader(
  pdf: jsPDF
) {
  const width =
    pdf.internal.pageSize.getWidth();

  const height =
    pdf.internal.pageSize.getHeight();

  pdf.setFillColor(
    16,
    32,
    72
  );

  pdf.rect(
    0,
    0,
    width,
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
    "E-DESIGN CONTRACT KIT",
    width - 15,
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
    "Network Ten · Interior Design",
    15,
    height - 8
  );
}

/* =========================================================
   PDF
========================================================= */

export async function generateEDesignContractPdf(
  form: EDesignContractFormData
): Promise<Blob> {
  const pdf =
    new jsPDF({
      orientation: "portrait",

      unit: "mm",

      format: "a4",
    });

  const width =
    pdf.internal.pageSize.getWidth();

  const height =
    pdf.internal.pageSize.getHeight();

  /* =======================================================
     COVER
  ======================================================= */

  pdf.setFillColor(
    8,
    17,
    31
  );

  pdf.rect(
    0,
    0,
    width,
    height,
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
    width / 2,
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

  pdf.setFontSize(25);

  pdf.text(
    "E-DESIGN CONTRACT",
    width / 2,
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

  pdf.setFontSize(17);

  pdf.text(
    "KIT",
    width / 2,
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
    "Digital Interior Design Services Agreement",
    width / 2,
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
      "E-Design Project",
    width / 2,
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
    width / 2,
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
    width / 2,
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
    width / 2,
    265,
    {
      align: "center",
    }
  );

  pdf.text(
    "www.networkten.in",
    width / 2,
    271,
    {
      align: "center",
    }
  );

  /* =======================================================
     DOCUMENT
  ======================================================= */

  pdf.addPage();

  addHeader(pdf);

  let y = 25;

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
    "E-Design Contract",
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
    "This document records the E-Design project information, digital deliverables, communication process, commercial terms, responsibilities and acceptance information entered for the Network Ten engagement. The final contractual terms should be reviewed and approved by the authorized parties before execution.",
    18,
    y,
    174
  );

  y += 8;

  /* =======================================================
     01
  ======================================================= */

  y = addSection(
    pdf,
    "01",
    "Client & Project",
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

  /* =======================================================
     02
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "02",
    "E-Design Scope",
    y
  );

  y = addLabelValue(
    pdf,
    "Project Description",
    form.projectDescription,
    y
  );

  y = addLabelValue(
    pdf,
    "Rooms / Areas",
    form.roomsIncluded,
    y
  );

  y = addLabelValue(
    pdf,
    "Service Level",
    form.serviceLevel,
    y
  );

  /* =======================================================
     03
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "03",
    "Digital Deliverables",
    y
  );

  y = addLabelValue(
    pdf,
    "Deliverables",
    form.deliverables,
    y
  );

  /* =======================================================
     04
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "04",
    "Design Process & Communication",
    y
  );

  y = addLabelValue(
    pdf,
    "Design Process",
    form.designProcess,
    y
  );

  y = addLabelValue(
    pdf,
    "Communication Method",
    form.communicationMethod,
    y
  );

  y = addLabelValue(
    pdf,
    "Client-Provided Information",
    form.clientProvidedMeasurements,
    y
  );

  /* =======================================================
     05
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "05",
    "Timeline & Revisions",
    y
  );

  y = addLabelValue(
    pdf,
    "Expected Start",
    form.expectedStartDate,
    y
  );

  y = addLabelValue(
    pdf,
    "Expected Completion",
    form.expectedCompletionDate,
    y
  );

  y = addLabelValue(
    pdf,
    "Revision Policy",
    form.revisionPolicy,
    y
  );

  /* =======================================================
     06
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "06",
    "Fees & Payment",
    y
  );

  y = addLabelValue(
    pdf,
    "Total E-Design Fee",
    form.totalFee,
    y
  );

  y = addLabelValue(
    pdf,
    "Payment Terms",
    form.paymentTerms,
    y
  );

  /* =======================================================
     07
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "07",
    "Responsibilities & Exclusions",
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

  /* =======================================================
     08
  ======================================================= */

  y += 4;

  y = addSection(
    pdf,
    "08",
    "E-Design Terms",
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
    "Cancellation / Termination",
    form.cancellationTerms,
    y
  );

  y = addLabelValue(
    pdf,
    "Additional Notes",
    form.additionalNotes,
    y
  );

  /* =======================================================
     09 ACCEPTANCE
  ======================================================= */

  if (y > 230) {
    pdf.addPage();

    addHeader(pdf);

    y = 25;
  }

  y += 5;

  y = addSection(
    pdf,
    "09",
    "Client Acceptance",
    y
  );

  y = addLabelValue(
    pdf,
    "Acceptance Status",
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

  /* =======================================================
     SIGNATURES
  ======================================================= */

  if (y > 235) {
    pdf.addPage();

    addHeader(pdf);

    y = 25;
  }

  y += 12;

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

  /* =======================================================
     PAGE NUMBERS
  ======================================================= */

  const totalPages =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
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
      `Page ${page} of ${totalPages}`,
      width - 15,
      height - 8,
      {
        align: "right",
      }
    );
  }

  return pdf.output(
    "blob"
  );
}