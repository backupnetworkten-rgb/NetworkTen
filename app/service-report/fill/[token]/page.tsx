"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Container, Paper, Typography, CircularProgress } from "@mui/material";
import { ServiceReport } from "@/types/serviceReport";
import { getReportByShareToken, submitReportCompletion } from "@/services/serviceReportService";
import CompletionForm from "@/components/service-report/CompletionForm";

export default function FillReportPage() {
  const params = useParams();
  const token = params?.token as string;
  const [report, setReport] = useState<ServiceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await getReportByShareToken(token);
        if (!r) {
          setNotFound(true);
        } else {
          setReport(r);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <Box sx={{ minHeight: "100dvh", background: "#f6faff", py: { xs: 3, sm: 6 } }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: "18px", p: { xs: 2.5, sm: 4 }, border: "1px solid #eef0f4" }}>
          <Typography sx={{ fontWeight: 900, fontSize: "20px", color: "#08142e", mb: 0.5 }}>
            Service Report
          </Typography>
          {report && (
            <Typography sx={{ color: "#667085", fontSize: "13px", mb: 3 }}>
              CSR No. {report.csrNo} · {report.customerName}
            </Typography>
          )}

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress size={28} />
            </Box>
          )}

          {!loading && notFound && (
            <Typography sx={{ color: "#EF4444", fontWeight: 600, py: 4, textAlign: "center" }}>
              This link is invalid or has expired.
            </Typography>
          )}

          {!loading && report && report.status === "completed" && (
            <Typography sx={{ color: "#667085", py: 4, textAlign: "center" }}>
              This report has already been submitted. No further action is needed.
            </Typography>
          )}

          {!loading && report && report.status === "pending" && (
            <CompletionForm
              report={report}
              onSubmit={(partB) => submitReportCompletion(report.id!, partB)}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
}