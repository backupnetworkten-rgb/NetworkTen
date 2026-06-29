"use client";

import React, { useEffect, useMemo, useState } from "react";

import Head from "next/head";

import Link from "next/link";

import Image from "next/image";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import { BlogPost, getAllBlogs } from "@/lib/blogService";

function getReadingTime(content: string) {
  const words = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .catch((err) => console.error("Failed to load blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));
    return ["All", ...unique];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory = activeCategory === "All" || b.category === activeCategory;
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  const showFeatured =
    activeCategory === "All" && searchQuery.trim() === "" && filteredBlogs.length > 0;

  const featuredBlog = showFeatured ? filteredBlogs[0] : null;
  const restBlogs = showFeatured ? filteredBlogs.slice(1) : filteredBlogs;

  const handleShare = async (blog: BlogPost) => {
    const url = `${window.location.origin}/blog/${blog.slug}`;

    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: blog.title,
          text: blog.desc,
          url,
        });
      } catch (err) {
        // user closed the native share sheet — no error needed
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setSnack({ open: true, msg: "Link copied to clipboard!" });
    } catch (err) {
      setSnack({ open: true, msg: "Could not copy link" });
    }
  };

  return (
    <>
      {/* SEO */}
      <Head>
        <title>NetworkTen Blog | Smart Technology Solutions</title>

        <meta
          name="description"
          content="Explore NetworkTen blogs about CCTV systems, networking infrastructure, conference room solutions, access control systems and smart business technologies."
        />

        <meta
          name="keywords"
          content="CCTV solutions, smart networking, access control systems, conference room setup, security systems, business automation"
        />
      </Head>

      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "400px", md: "500px" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop"
          alt="Blog Banner"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(8,20,46,0.94), rgba(8,20,46,0.72))",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1220px",
            width: "100%",
            mx: "auto",
            px: 2,
          }}
        >
          <Chip
            icon={<AutoAwesomeRoundedIcon sx={{ color: "#8BC53F !important", fontSize: 16 }} />}
            label="NetworkTen Blog"
            sx={{
              background: "rgba(139,197,63,0.16)",
              color: "#8BC53F",
              fontWeight: 700,
              mb: 2,
              fontSize: "11px",
              height: "30px",
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              lineHeight: 1.02,
              mb: 2,
              maxWidth: "760px",
              letterSpacing: "-1px",
              fontSize: { xs: "34px", md: "60px" },
            }}
          >
            Smart Technology
            <br />
            Insights & Updates
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.74)",
              lineHeight: 1.9,
              maxWidth: "640px",
              fontSize: { xs: "14px", md: "16px" },
              mb: 4,
            }}
          >
            Explore premium insights about CCTV systems, networking
            infrastructure, conference room technologies and intelligent
            business solutions for modern enterprises.
          </Typography>

          {/* SEARCH */}
          <TextField
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#98A2B3" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: "420px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                background: "rgba(255,255,255,0.96)",
                height: "50px",
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </Box>

      {/* BLOG SECTION */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          px: 2,
          background: "#f7f9fc",
        }}
      >
        <Box sx={{ maxWidth: "1180px", mx: "auto" }}>
          {/* CATEGORY FILTERS */}
          {!loading && blogs.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "12.5px",
                    height: "36px",
                    px: 0.5,
                    cursor: "pointer",
                    background: activeCategory === cat ? "#102048" : "#fff",
                    color: activeCategory === cat ? "#fff" : "#475467",
                    border: "1px solid #edf1f7",
                    transition: "0.25s",
                    "&:hover": {
                      background: activeCategory === cat ? "#08142e" : "#eef1f6",
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {/* LOADING */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: "#8BC53F" }} />
            </Box>
          )}

          {/* EMPTY STATE */}
          {!loading && blogs.length === 0 && (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography sx={{ color: "#102048", fontWeight: 800, fontSize: "18px", mb: 1 }}>
                No blog posts yet
              </Typography>
              <Typography sx={{ color: "#667085", fontSize: "14px" }}>
                Check back soon for smart technology insights and updates.
              </Typography>
            </Box>
          )}

          {/* NO SEARCH RESULTS */}
          {!loading && blogs.length > 0 && filteredBlogs.length === 0 && (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography sx={{ color: "#102048", fontWeight: 800, fontSize: "18px", mb: 1 }}>
                No matching articles
              </Typography>
              <Typography sx={{ color: "#667085", fontSize: "14px" }}>
                Try a different search term or category.
              </Typography>
            </Box>
          )}

          {/* FEATURED POST */}
          {featuredBlog && (
            <Box
              sx={{
                background: "#fff",
                borderRadius: "26px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                border: "1px solid #edf1f7",
                boxShadow: "0 14px 40px rgba(16,32,72,0.07)",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  minHeight: { xs: "260px", md: "100%" },
                  overflow: "hidden",
                  "& img": { transition: "transform 0.7s ease" },
                  "&:hover img": { transform: "scale(1.06)" },
                }}
              >
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Chip
                  label="Latest"
                  sx={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    background: "#8BC53F",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "11px",
                  }}
                />
              </Box>

              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Chip
                  label={featuredBlog.category}
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    background: "rgba(139,197,63,0.14)",
                    color: "#6a9c2f",
                    fontWeight: 700,
                    fontSize: "11px",
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    color: "#102048",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    fontSize: { xs: "24px", md: "32px" },
                    mb: 1.5,
                  }}
                >
                  {featuredBlog.title}
                </Typography>

                <Typography
                  sx={{ color: "#667085", lineHeight: 1.85, fontSize: "14.5px", mb: 2.5 }}
                >
                  {featuredBlog.desc}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                    <AccessTimeRoundedIcon sx={{ fontSize: 15, color: "#8BC53F" }} />
                    <Typography sx={{ color: "#667085", fontSize: "12px", fontWeight: 600 }}>
                      {featuredBlog.date}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", background: "#d0d5dd" }} />
                  <Typography sx={{ color: "#667085", fontSize: "12px", fontWeight: 600 }}>
                    {getReadingTime(featuredBlog.content)} min read
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Link href={`/blog/${featuredBlog.slug}`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{
                        background: "#102048",
                        borderRadius: "50px",
                        px: 3,
                        py: 1.1,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "13px",
                        boxShadow: "0 10px 24px rgba(16,32,72,0.14)",
                        "&:hover": { background: "#08142e" },
                      }}
                    >
                      Read Full Article
                    </Button>
                  </Link>

                  <IconButton
                    onClick={() => handleShare(featuredBlog)}
                    sx={{
                      width: 42,
                      height: 42,
                      background: "#f5f7fb",
                      border: "1px solid #edf1f7",
                      "&:hover": { background: "#edf3fb" },
                    }}
                  >
                    <ShareRoundedIcon sx={{ fontSize: 17, color: "#102048" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}

          {/* GRID */}
          {restBlogs.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2.5,
              }}
            >
              {restBlogs.map((blog) => (
                <Box
                  key={blog.id}
                  sx={{
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid #edf1f7",
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.35s",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.09)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "200px",
                      overflow: "hidden",
                      "& img": { transition: "transform 0.6s ease" },
                      "&:hover img": { transform: "scale(1.08)" },
                    }}
                  >
                    <Image src={blog.image} alt={blog.title} fill style={{ objectFit: "cover" }} />
                    <Chip
                      label={blog.category}
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "#8BC53F",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "10px",
                        height: "26px",
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 2.6, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                        <AccessTimeRoundedIcon sx={{ fontSize: 14, color: "#8BC53F" }} />
                        <Typography sx={{ color: "#667085", fontSize: "11.5px", fontWeight: 600 }}>
                          {blog.date}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "3px", height: "3px", borderRadius: "50%", background: "#d0d5dd" }} />
                      <Typography sx={{ color: "#667085", fontSize: "11.5px", fontWeight: 600 }}>
                        {getReadingTime(blog.content)} min read
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#102048",
                        fontWeight: 800,
                        lineHeight: 1.3,
                        mb: 1.2,
                        fontSize: "17px",
                      }}
                    >
                      {blog.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#667085",
                        lineHeight: 1.7,
                        mb: 2,
                        fontSize: "13px",
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                      }}
                    >
                      {blog.desc}
                    </Typography>

                    <Divider sx={{ mb: 1.8 }} />

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.6,
                            color: "#102048",
                            fontWeight: 700,
                            fontSize: "13px",
                            cursor: "pointer",
                            "&:hover": { color: "#8BC53F" },
                          }}
                        >
                          Read More <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
                        </Box>
                      </Link>

                      <IconButton
                        onClick={() => handleShare(blog)}
                        sx={{
                          width: 34,
                          height: 34,
                          background: "#f5f7fb",
                          "&:hover": { background: "#edf3fb" },
                        }}
                      >
                        <ShareRoundedIcon sx={{ fontSize: 15, color: "#102048" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* CLOSING CTA */}
          {!loading && blogs.length > 0 && (
            <Box
              sx={{
                mt: 6,
                p: { xs: 4, md: 6 },
                borderRadius: "26px",
                background: "linear-gradient(135deg, #102048 0%, #08142e 100%)",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  background: "#8BC53F",
                  color: "#08142e",
                  fontWeight: 900,
                  mx: "auto",
                  mb: 2,
                }}
              >
                N
              </Avatar>
              <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "22px", md: "28px" }, mb: 1 }}>
                Need a tailored security or networking solution?
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", mb: 3, maxWidth: "520px", mx: "auto" }}>
                Talk to our team and we'll recommend a setup that actually fits your space and budget.
              </Typography>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    background: "#8BC53F",
                    borderRadius: "50px",
                    px: 4,
                    py: 1.3,
                    fontWeight: 800,
                    textTransform: "none",
                    fontSize: "14px",
                    "&:hover": { background: "#74ab35" },
                  }}
                >
                  Get In Touch
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ borderRadius: "10px" }}>
          {snack.msg}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}