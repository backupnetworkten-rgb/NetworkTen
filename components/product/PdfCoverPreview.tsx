"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";

interface PdfCoverPreviewProps {
  url: string;
  maxWidth?: number;
}

const PDFJS_VERSION = "3.11.174";

export default function PdfCoverPreview({ url, maxWidth = 280 }: PdfCoverPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(false);

    const loadPdfJsScript = () =>
      new Promise<any>((resolve, reject) => {
        const w = window as any;
        if (w.pdfjsLib) {
          resolve(w.pdfjsLib);
          return;
        }
        const script = document.createElement("script");
        script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
        script.async = true;
        script.onload = () => resolve(w.pdfjsLib);
        script.onerror = () => reject(new Error("Failed to load pdf.js"));
        document.body.appendChild(script);
      });

    (async () => {
      try {
        const pdfjsLib = await loadPdfJsScript();
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setPageCount(pdf.numPages);

        const page = await pdf.getPage(1);
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = maxWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch (e) {
        console.error("PDF cover preview failed:", e);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, maxWidth]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "6px",
          overflow: "hidden",
          background: "#fff",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)",
          border: "1px solid #e5e5e5",
          minWidth: 180,
          minHeight: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && !error && (
          <Box
            sx={{
              width: maxWidth,
              height: maxWidth * 1.3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.2,
              background:
                "linear-gradient(90deg,#f5f5f5 25%,#ececec 50%,#f5f5f5 75%)",
              backgroundSize: "200% 100%",
              animation: "pdfShimmer 1.4s infinite",
              "@keyframes pdfShimmer": {
                "0%": { backgroundPosition: "200% 0" },
                "100%": { backgroundPosition: "-200% 0" },
              },
            }}
          >
            <CircularProgress size={22} sx={{ color: "#9a9a9a" }} />
            <Typography sx={{ fontSize: "11px", color: "#9a9a9a", fontWeight: 600 }}>
              Loading preview…
            </Typography>
          </Box>
        )}

        {error && (
          <Box
            sx={{
              width: maxWidth,
              height: maxWidth * 1.3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              background: "#fafafa",
              p: 2,
            }}
          >
            <BrokenImageRoundedIcon sx={{ fontSize: 34, color: "#c4c4c4" }} />
            <Typography sx={{ fontSize: "11.5px", color: "#999", fontWeight: 600, textAlign: "center" }}>
              Preview unavailable
            </Typography>
          </Box>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: loading || error ? "none" : "block",
            maxWidth: "100%",
          }}
        />

        {/* Corner PDF badge */}
        {!loading && !error && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              background: "rgba(220,38,38,0.95)",
              color: "#fff",
              px: 1,
              py: 0.35,
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            <PictureAsPdfRoundedIcon sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.3px" }}>
              PDF
            </Typography>
          </Box>
        )}
      </Box>

      {!loading && !error && pageCount > 0 && (
        <Typography sx={{ fontSize: "11px", color: "#999", fontWeight: 500, mt: 1.2 }}>
          Page 1 of {pageCount}
        </Typography>
      )}
    </Box>
  );
}