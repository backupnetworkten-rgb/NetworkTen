"use client";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import {
  auth,
  db,
} from "@/lib/firebase/client";

import {
  WelcomeKitFormData,
} from "@/types/interior-design";

export async function saveWelcomeKitSubmission(
  formData: WelcomeKitFormData
) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Authentication is required."
    );
  }

  const submissionRef =
    await addDoc(
      collection(
        db,
        "welcomeKitSubmissions"
      ),
      {
        clientUid: user.uid,
        clientEmail:
          user.email ||
          formData.email,

        kitId: "welcome-kit",

        formData,

        pdfGenerated: true,

        createdAt:
          serverTimestamp(),
      }
    );

  return submissionRef.id;
}

function drawTitle(
  page: any,
  text: string,
  y: number,
  boldFont: any
) {
  page.drawText(text, {
    x: 45,
    y,
    size: 18,
    font: boldFont,
    color: rgb(
      0.063,
      0.125,
      0.282
    ),
  });

  page.drawLine({
    start: {
      x: 45,
      y: y - 8,
    },
    end: {
      x: 550,
      y: y - 8,
    },
    thickness: 1.5,
    color: rgb(
      0.545,
      0.773,
      0.247
    ),
  });
}

function drawField(
  page: any,
  label: string,
  value: string,
  x: number,
  y: number,
  font: any,
  boldFont: any
) {
  page.drawText(label, {
    x,
    y,
    size: 8,
    font: boldFont,
    color: rgb(
      0.35,
      0.39,
      0.45
    ),
  });

  page.drawText(
    value || "-",
    {
      x,
      y: y - 16,
      size: 10,
      font,
      color: rgb(
        0.08,
        0.1,
        0.14
      ),
      maxWidth: 235,
    }
  );
}

function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
) {
  const words =
    (text || "-").split(
      /\s+/
    );

  const lines: string[] = [];

  let current = "";

  for (const word of words) {
    const test = current
      ? `${current} ${word}`
      : word;

    if (
      font.widthOfTextAtSize(
        test,
        fontSize
      ) > maxWidth &&
      current
    ) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawParagraph(
  page: any,
  text: string,
  x: number,
  y: number,
  width: number,
  font: any
) {
  const lines = wrapText(
    text,
    font,
    10,
    width
  );

  let currentY = y;

  for (const line of lines) {
    page.drawText(line, {
      x,
      y: currentY,
      size: 10,
      font,
      color: rgb(
        0.12,
        0.14,
        0.18
      ),
    });

    currentY -= 15;
  }

  return currentY;
}

export async function generateWelcomeKitPdf(
  data: WelcomeKitFormData
) {
  const pdf =
    await PDFDocument.create();

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  const boldFont =
    await pdf.embedFont(
      StandardFonts.HelveticaBold
    );

  /*
   * PAGE 1
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: 595,
      height: 842,
      color: rgb(
        0.063,
        0.125,
        0.282
      ),
    });

    page.drawText(
      "NETWORK TEN",
      {
        x: 55,
        y: 690,
        size: 35,
        font: boldFont,
        color: rgb(
          0.545,
          0.773,
          0.247
        ),
      }
    );

    page.drawText(
      "INTERIOR DESIGN",
      {
        x: 58,
        y: 650,
        size: 16,
        font: boldFont,
        color: rgb(
          1,
          1,
          1
        ),
      }
    );

    page.drawText(
      "CLIENT WELCOME KIT",
      {
        x: 58,
        y: 590,
        size: 29,
        font: boldFont,
        color: rgb(
          1,
          1,
          1
        ),
      }
    );

    page.drawLine({
      start: {
        x: 58,
        y: 565,
      },
      end: {
        x: 305,
        y: 565,
      },
      thickness: 3,
      color: rgb(
        0.545,
        0.773,
        0.247
      ),
    });

    page.drawText(
      "Personalized Client Submission",
      {
        x: 58,
        y: 530,
        size: 14,
        font,
        color: rgb(
          0.82,
          0.85,
          0.9
        ),
      }
    );

    page.drawText(
      `Prepared for: ${data.fullName}`,
      {
        x: 58,
        y: 460,
        size: 14,
        font: boldFont,
        color: rgb(
          1,
          1,
          1
        ),
      }
    );

    page.drawText(
      `Location: ${data.city}`,
      {
        x: 58,
        y: 432,
        size: 11,
        font,
        color: rgb(
          0.78,
          0.8,
          0.85
        ),
      }
    );

    page.drawText(
      "Network Ten Interior Design",
      {
        x: 58,
        y: 75,
        size: 10,
        font,
        color: rgb(
          0.65,
          0.68,
          0.73
        ),
      }
    );
  }

  /*
   * PAGE 2
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 795,
        size: 12,
        font: boldFont,
        color: rgb(
          0.35,
          0.55,
          0.15
        ),
      }
    );

    drawTitle(
      page,
      "01 — Personal Details",
      745,
      boldFont
    );

    drawField(
      page,
      "Full Name",
      data.fullName,
      45,
      700,
      font,
      boldFont
    );

    drawField(
      page,
      "Email Address",
      data.email,
      300,
      700,
      font,
      boldFont
    );

    drawField(
      page,
      "Phone / WhatsApp",
      data.phone,
      45,
      635,
      font,
      boldFont
    );

    drawField(
      page,
      "City / Location",
      data.city,
      300,
      635,
      font,
      boldFont
    );

    drawTitle(
      page,
      "02 — Your Property",
      555,
      boldFont
    );

    drawField(
      page,
      "Property Type",
      data.propertyType,
      45,
      510,
      font,
      boldFont
    );

    drawField(
      page,
      "Total Area",
      data.totalArea,
      300,
      510,
      font,
      boldFont
    );

    drawField(
      page,
      "Configuration",
      data.configuration,
      45,
      445,
      font,
      boldFont
    );

    drawField(
      page,
      "Property Status",
      data.propertyStatus,
      300,
      445,
      font,
      boldFont
    );

    drawField(
      page,
      "Possession / Start Date",
      data.possessionDate,
      45,
      380,
      font,
      boldFont
    );
  }

  /*
   * PAGE 3
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 795,
        size: 12,
        font: boldFont,
        color: rgb(
          0.35,
          0.55,
          0.15
        ),
      }
    );

    drawTitle(
      page,
      "03 — Design Style Preferences",
      745,
      boldFont
    );

    drawField(
      page,
      "Selected Styles",
      data.designStyles.join(
        ", "
      ),
      45,
      695,
      font,
      boldFont
    );

    page.drawText(
      "Dream Space",
      {
        x: 45,
        y: 605,
        size: 10,
        font: boldFont,
      }
    );

    drawParagraph(
      page,
      data.dreamSpace,
      45,
      580,
      500,
      font
    );

    page.drawText(
      "Colours You Love",
      {
        x: 45,
        y: 465,
        size: 10,
        font: boldFont,
      }
    );

    drawParagraph(
      page,
      data.colorsLove,
      45,
      440,
      500,
      font
    );

    page.drawText(
      "Colours to Avoid",
      {
        x: 45,
        y: 330,
        size: 10,
        font: boldFont,
      }
    );

    drawParagraph(
      page,
      data.colorsAvoid,
      45,
      305,
      500,
      font
    );
  }

  /*
   * PAGE 4
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 795,
        size: 12,
        font: boldFont,
        color: rgb(
          0.35,
          0.55,
          0.15
        ),
      }
    );

    drawTitle(
      page,
      "04 — Room Requirements",
      745,
      boldFont
    );

    const rooms = [
      [
        "Living Room",
        data.livingRoom,
      ],
      [
        "Master Bedroom",
        data.masterBedroom,
      ],
      [
        "Kitchen",
        data.kitchen,
      ],
      [
        "Dining Area",
        data.diningArea,
      ],
      [
        "Other Rooms",
        data.otherRooms,
      ],
    ];

    let y = 690;

    for (const [
      label,
      value,
    ] of rooms) {
      page.drawText(
        label,
        {
          x: 45,
          y,
          size: 10,
          font: boldFont,
        }
      );

      y -= 22;

      y = drawParagraph(
        page,
        value,
        45,
        y,
        500,
        font
      );

      y -= 22;
    }
  }

  /*
   * PAGE 5
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 795,
        size: 12,
        font: boldFont,
        color: rgb(
          0.35,
          0.55,
          0.15
        ),
      }
    );

    drawTitle(
      page,
      "05 — Budget & Timeline",
      745,
      boldFont
    );

    drawField(
      page,
      "Total Budget",
      data.totalBudget,
      45,
      700,
      font,
      boldFont
    );

    drawField(
      page,
      "Design Fee Budget",
      data.designFeeBudget,
      300,
      700,
      font,
      boldFont
    );

    drawField(
      page,
      "Preferred Start Date",
      data.preferredStartDate,
      45,
      635,
      font,
      boldFont
    );

    drawField(
      page,
      "Target Completion Date",
      data.targetCompletionDate,
      300,
      635,
      font,
      boldFont
    );

    drawTitle(
      page,
      "06 — Lifestyle Information",
      540,
      boldFont
    );

    drawField(
      page,
      "Family Members",
      data.familyMembers,
      45,
      495,
      font,
      boldFont
    );

    drawField(
      page,
      "Elderly Members",
      data.elderlyMembers,
      300,
      495,
      font,
      boldFont
    );

    drawField(
      page,
      "Children",
      data.children,
      45,
      430,
      font,
      boldFont
    );

    drawField(
      page,
      "Pets",
      data.pets,
      300,
      430,
      font,
      boldFont
    );

    drawField(
      page,
      "Work From Home",
      data.workFromHome,
      45,
      365,
      font,
      boldFont
    );

    page.drawText(
      "Additional Notes",
      {
        x: 45,
        y: 290,
        size: 10,
        font: boldFont,
      }
    );

    drawParagraph(
      page,
      data.additionalNotes,
      45,
      265,
      500,
      font
    );
  }

  /*
   * PAGE 6
   */

  {
    const page =
      pdf.addPage([
        595,
        842,
      ]);

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 795,
        size: 12,
        font: boldFont,
        color: rgb(
          0.35,
          0.55,
          0.15
        ),
      }
    );

    page.drawText(
      "Thank You",
      {
        x: 45,
        y: 700,
        size: 36,
        font: boldFont,
        color: rgb(
          0.063,
          0.125,
          0.282
        ),
      }
    );

    page.drawText(
      "Your Network Ten Welcome Kit has been successfully submitted.",
      {
        x: 45,
        y: 650,
        size: 13,
        font,
      }
    );

    page.drawText(
      "Our team can now review your requirements",
      {
        x: 45,
        y: 620,
        size: 13,
        font,
      }
    );

    page.drawText(
      "and prepare for the next stage of your project.",
      {
        x: 45,
        y: 597,
        size: 13,
        font,
      }
    );

    page.drawLine({
      start: {
        x: 45,
        y: 550,
      },
      end: {
        x: 550,
        y: 550,
      },
      thickness: 1.5,
      color: rgb(
        0.545,
        0.773,
        0.247
      ),
    });

    page.drawText(
      "NETWORK TEN",
      {
        x: 45,
        y: 500,
        size: 18,
        font: boldFont,
        color: rgb(
          0.063,
          0.125,
          0.282
        ),
      }
    );

    page.drawText(
      "Interior Design",
      {
        x: 45,
        y: 472,
        size: 13,
        font,
        color: rgb(
          0.35,
          0.39,
          0.45
        ),
      }
    );

    page.drawText(
      "Confidential Client Information",
      {
        x: 45,
        y: 75,
        size: 9,
        font,
        color: rgb(
          0.45,
          0.48,
          0.53
        ),
      }
    );
  }

  const bytes =
    await pdf.save();

  return new Blob(
    [bytes as BlobPart],
    {
      type: "application/pdf",
    }
  );
}