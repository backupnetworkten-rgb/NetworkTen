"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Chip, CircularProgress, Button } from "@mui/material";
import Image from "next/image";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { BlogPost, getBlogBySlug } from "@/lib/blogService";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogBySlug(slug).then((data) => {
      setBlog(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#8BC53F" }} />
        </Box>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "22px", mb: 1 }}>
            Blog post not found
          </Typography>
          <Button onClick={() => router.push("/blog")} sx={{ color: "#8BC53F", fontWeight: 700 }}>
            Back to Blog
          </Button>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          position: "relative",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <Image src={blog.image} alt={blog.title} fill priority style={{ objectFit: "cover" }} />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(8,20,46,0.95), rgba(8,20,46,0.4))",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: "900px", width: "100%", mx: "auto", px: 2, pb: 5 }}>
          <Chip label={blog.category} sx={{ background: "#8BC53F", color: "#fff", fontWeight: 700, mb: 2 }} />
          <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "28px", md: "42px" }, lineHeight: 1.15, mb: 1.5 }}>
            {blog.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
            <AccessTimeRoundedIcon sx={{ fontSize: 16, color: "#8BC53F" }} />
            <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600 }}>
              {blog.date}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "800px", mx: "auto", px: 2, py: { xs: 5, md: 7 } }}>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => router.push("/blog")}
          sx={{ color: "#667085", fontWeight: 700, textTransform: "none", mb: 4 }}
        >
          Back to all blogs
        </Button>

        {/* RICH CONTENT — rendered from HTML produced by the admin editor.
            Matches h1/h2/h3, bold, lists, quotes, and links to the
            site's brand styling so published posts look premium. */}
        <Box
          dangerouslySetInnerHTML={{ __html: blog.content }}
          sx={{
            color: "#475467",
            fontSize: "15.5px",
            lineHeight: 1.9,

            "& h1": {
              color: "#102048",
              fontWeight: 900,
              fontSize: { xs: "26px", md: "32px" },
              lineHeight: 1.25,
              letterSpacing: "-0.5px",
              mt: 4,
              mb: 2,
            },
            "& h2": {
              color: "#102048",
              fontWeight: 800,
              fontSize: { xs: "21px", md: "24px" },
              lineHeight: 1.3,
              mt: 4,
              mb: 1.75,
              pb: 1,
              borderBottom: "2px solid #edf1f7",
            },
            "& h3": {
              color: "#102048",
              fontWeight: 800,
              fontSize: { xs: "17px", md: "19px" },
              lineHeight: 1.35,
              mt: 3,
              mb: 1.25,
            },
            "& p": {
              mb: 2.25,
            },
            "& strong, & b": {
              color: "#102048",
              fontWeight: 800,
            },
            "& em, & i": {
              fontStyle: "italic",
            },
            "& ul, & ol": {
              pl: 3,
              mb: 2.5,
              display: "grid",
              gap: "8px",
            },
            "& li": {
              pl: 0.5,
            },
            "& li::marker": {
              color: "#8BC53F",
              fontWeight: 800,
            },
            "& blockquote": {
              borderLeft: "4px solid #8BC53F",
              background: "#f5f7fb",
              m: "24px 0",
              p: { xs: "16px 18px", md: "18px 24px" },
              borderRadius: "12px",
              color: "#102048",
              fontStyle: "italic",
              fontSize: "15px",
              lineHeight: 1.8,
            },
            "& a": {
              color: "#8BC53F",
              fontWeight: 700,
              textDecoration: "underline",
              textDecorationColor: "rgba(139,197,63,0.4)",
            },
            "& img": {
              width: "100%",
              borderRadius: "16px",
              my: 3,
            },
            "& hr": {
              border: "none",
              borderTop: "1px solid #edf1f7",
              my: 4,
            },

            // First element shouldn't have extra top margin under the back button
            "& > :first-of-type": {
              mt: 0,
            },
          }}
        />
      </Box>
      <Footer />
    </>
  );
}