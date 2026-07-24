import { NextRequest, NextResponse } from "next/server";

// Streams a remote datasheet file through our own origin so that:
// 1) it can be embedded in an <iframe> even if the source blocks framing
// 2) the "Download" button actually forces a download (cross-origin
//    <a download> is ignored by browsers, this fixes that)
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const mode = request.nextUrl.searchParams.get("mode") === "download" ? "attachment" : "inline";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const fileRes = await fetch(url);

    if (!fileRes.ok) {
      return NextResponse.json({ error: "Failed to fetch file" }, { status: fileRes.status });
    }

    const contentType = fileRes.headers.get("content-type") || "application/pdf";
    const arrayBuffer = await fileRes.arrayBuffer();

    let filename = "datasheet.pdf";
    try {
      const pathname = new URL(url).pathname;
      const last = pathname.split("/").pop();
      if (last) filename = decodeURIComponent(last);
    } catch {
      // keep default filename
    }

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${mode}; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("DATASHEET PROXY ERROR:", error);
    return NextResponse.json({ error: "Unable to load file" }, { status: 500 });
  }
}