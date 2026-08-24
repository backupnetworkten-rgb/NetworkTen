import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

import { auth } from "@/lib/firebase/client";

import type {
  ClientDiscoveryFormData,
} from "@/types/interior-design";

function getDb() {
  return getFirestore(auth.app);
}

export async function saveClientDiscoverySubmission(
  form: ClientDiscoveryFormData
) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "You must be logged in to submit the Client Discovery Kit."
    );
  }

  const db = getDb();

  const submission = {
    ...form,

    userId: user.uid,

    clientEmail:
      user.email || form.email,

    kitNumber: "02",

    kitName: "Client Discovery Kit",

    status: "submitted",

    submittedAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(
      db,
      "clientDiscoveryKitSubmissions"
    ),
    submission
  );

  return docRef.id;
}

function cleanFileName(value: string) {
  return (
    value
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") ||
    "Client"
  );
}

function addSection(
  pdf: any,
  title: string
) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  if (
    pdf.lastAutoTable &&
    pdf.lastAutoTable.finalY
  ) {
    if (
      pdf.lastAutoTable.finalY >
      pageHeight - 60
    ) {
      pdf.addPage();
    }
  }

  const y =
    pdf.lastAutoTable?.finalY
      ? pdf.lastAutoTable.finalY + 18
      : 30;

  pdf.setFillColor(
    16,
    32,
    72
  );

  pdf.roundedRect(
    15,
    y - 8,
    pageWidth - 30,
    14,
    3,
    3,
    "F"
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");

  pdf.text(
    title,
    22,
    y + 1
  );

  pdf.setTextColor(
    40,
    40,
    40
  );

  return y + 12;
}

function addRows(
  pdf: any,
  rows: Array<[string, string]>,
  startY: number
) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  let y = startY;

  pdf.setFont(
    "helvetica",
    "normal"
  );

  for (const [label, value] of rows) {
    const safeValue =
      value?.trim() || "—";

    const valueLines =
      pdf.splitTextToSize(
        safeValue,
        pageWidth - 85
      );

    if (y > 270) {
      pdf.addPage();
      y = 25;
    }

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
      16,
      32,
      72
    );

    pdf.text(
      label,
      18,
      y
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setTextColor(
      70,
      70,
      70
    );

    pdf.text(
      valueLines,
      75,
      y
    );

    y +=
      Math.max(
        7,
        valueLines.length * 5
      ) + 3;
  }

  return y;
}

export async function generateClientDiscoveryPdf(
  form: ClientDiscoveryFormData
): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error(
      "PDF generation must run in the browser."
    );
  }

  const { jsPDF } =
    await import("jspdf");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  // HEADER
  pdf.setFillColor(
    8,
    17,
    31
  );

  pdf.rect(
    0,
    0,
    pageWidth,
    55,
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

  pdf.setFontSize(10);

  pdf.text(
    "NETWORK TEN",
    18,
    17
  );

  pdf.setTextColor(
    255,
    255,
    255
  );

  pdf.setFontSize(22);

  pdf.text(
    "Client Discovery Kit",
    18,
    29
  );

  pdf.setFontSize(9);

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setTextColor(
    210,
    215,
    225
  );

  pdf.text(
    "Interior Design | Client Discovery & Project Brief",
    18,
    38
  );

  pdf.setTextColor(
    139,
    197,
    63
  );

  pdf.setFontSize(9);

  pdf.text(
    "KIT 02",
    pageWidth - 35,
    17
  );

  let y = 70;

  // 01
  y = addSection(
    pdf,
    "01  CLIENT & PROJECT DETAILS"
  );

  y = addRows(
    pdf,
    [
      ["Full Name", form.fullName],
      ["Email", form.email],
      ["Phone", form.phone],
      ["City", form.city],
      ["Project Name", form.projectName],
      ["Property Type", form.propertyType],
      ["Total Area", form.totalArea],
      ["Configuration", form.configuration],
      ["Property Status", form.propertyStatus],
      ["Possession Date", form.possessionDate],
    ],
    y
  );

  // 02
  y = addSection(
    pdf,
    "02  PROJECT VISION & GOALS"
  );

  y = addRows(
    pdf,
    [
      [
        "Project Vision",
        form.projectVision,
      ],
      [
        "Dream Space",
        form.dreamSpace,
      ],
      [
        "Problems to Solve",
        form.problemsToSolve,
      ],
      [
        "Must-Have Features",
        form.mustHaveFeatures,
      ],
      [
        "Inspiration References",
        form.inspirationReferences,
      ],
    ],
    y
  );

  // 03
  y = addSection(
    pdf,
    "03  LIFESTYLE & FUNCTIONAL REQUIREMENTS"
  );

  y = addRows(
    pdf,
    [
      [
        "Family Members",
        form.familyMembers,
      ],
      [
        "Elderly Members",
        form.elderlyMembers,
      ],
      [
        "Children",
        form.children,
      ],
      ["Pets", form.pets],
      [
        "Work From Home",
        form.workFromHome,
      ],
      [
        "Entertaining",
        form.entertaining,
      ],
      [
        "Lifestyle Description",
        form.lifestyleDescription,
      ],
    ],
    y
  );

  // 04
  y = addSection(
    pdf,
    "04  DESIGN PREFERENCES"
  );

  y = addRows(
    pdf,
    [
      [
        "Preferred Styles",
        form.designStyles.join(", "),
      ],
      [
        "Colours Loved",
        form.colorsLove,
      ],
      [
        "Colours to Avoid",
        form.colorsAvoid,
      ],
      [
        "Material Preferences",
        form.materialsPreference,
      ],
      [
        "Lighting Preference",
        form.lightingPreference,
      ],
      [
        "Overall Mood",
        form.overallMood,
      ],
    ],
    y
  );

  // 05
  y = addSection(
    pdf,
    "05  ROOM-BY-ROOM REQUIREMENTS"
  );

  y = addRows(
    pdf,
    [
      [
        "Living Room",
        form.livingRoom,
      ],
      [
        "Master Bedroom",
        form.masterBedroom,
      ],
      [
        "Bedroom 2",
        form.bedroom2,
      ],
      [
        "Bedroom 3",
        form.bedroom3,
      ],
      [
        "Kitchen",
        form.kitchen,
      ],
      [
        "Dining Area",
        form.diningArea,
      ],
      [
        "Bathroom",
        form.bathroom,
      ],
      [
        "Balcony",
        form.balcony,
      ],
      [
        "Study Room",
        form.studyRoom,
      ],
      [
        "Pooja Room",
        form.poojaRoom,
      ],
      [
        "Other Rooms",
        form.otherRooms,
      ],
    ],
    y
  );

  // 06
  y = addSection(
    pdf,
    "06  BUDGET, TIMELINE & EXPECTATIONS"
  );

  y = addRows(
    pdf,
    [
      [
        "Total Budget",
        form.totalBudget,
      ],
      [
        "Preferred Start Date",
        form.preferredStartDate,
      ],
      [
        "Target Completion",
        form.targetCompletionDate,
      ],
      [
        "Top Priorities",
        form.topPriorities.join(", "),
      ],
      [
        "Maintenance Preference",
        form.maintenancePreference,
      ],
      [
        "Decision Makers",
        form.decisionMakers,
      ],
      [
        "Additional Notes",
        form.additionalNotes,
      ],
    ],
    y
  );

  // FOOTER
  const totalPages =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    pdf.setPage(page);

    pdf.setDrawColor(
      225,
      230,
      235
    );

    pdf.line(
      15,
      pageHeight - 15,
      pageWidth - 15,
      pageHeight - 15
    );

    pdf.setFontSize(8);

    pdf.setTextColor(
      120,
      120,
      120
    );

    pdf.text(
      "Network Ten | Client Discovery Kit",
      15,
      pageHeight - 8
    );

    pdf.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - 38,
      pageHeight - 8
    );
  }

  const fileName =
    `Network-Ten-Client-Discovery-${cleanFileName(
      form.fullName
    )}.pdf`;

  // Keep filename available for the caller.
  // jsPDF returns Blob directly.
  void fileName;

  return pdf.output(
    "blob"
  );
}