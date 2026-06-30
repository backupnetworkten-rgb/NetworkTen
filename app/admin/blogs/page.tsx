"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  BlogPost,
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  slugify,
} from "@/lib/blogService";

const emptyForm = {
  title: "",
  slug: "",
  image: "",
  desc: "",
  content: "",
  category: "",
  date: new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to load blogs", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEditDialog = (blog: BlogPost) => {
    setEditingId(blog.id!);
    setForm({
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      desc: blog.desc,
      content: blog.content || "",
      category: blog.category,
      date: blog.date,
    });
    setOpen(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingId ? prev.slug : slugify(value),
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.image || !form.desc || !form.category) {
      setSnack({ open: true, msg: "Please fill in all required fields", severity: "error" });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateBlog(editingId, form);
        setSnack({ open: true, msg: "Blog updated successfully", severity: "success" });
      } else {
        const duplicate = blogs.some((b) => b.slug === form.slug);
        const finalSlug = duplicate ? `${form.slug}-${Date.now()}` : form.slug;
        await addBlog({ ...form, slug: finalSlug });
        setSnack({ open: true, msg: "Blog published successfully", severity: "success" });
      }
      setOpen(false);
      loadBlogs();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Something went wrong", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      await deleteBlog(id);
      setSnack({ open: true, msg: "Blog deleted", severity: "success" });
      loadBlogs();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, msg: "Failed to delete blog", severity: "error" });
    }
  };

  return (
    <AdminLayout title="Blogs">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography sx={{ color: "#667085", fontSize: "14px" }}>
          {blogs.length} blog post{blogs.length !== 1 ? "s" : ""} published
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={openAddDialog}
          sx={{
            background: "#102048",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            "&:hover": { background: "#08142e" },
          }}
        >
          Add New Blog
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#8BC53F" }} />
        </Box>
      ) : blogs.length === 0 ? (
        <Paper
          elevation={0}
          sx={{ p: 5, textAlign: "center", borderRadius: "18px", border: "1px solid #edf1f7" }}
        >
          <Typography sx={{ fontWeight: 700, color: "#102048", mb: 1 }}>
            No blog posts yet
          </Typography>
          <Typography sx={{ color: "#667085", fontSize: "13px" }}>
            Click &quot;Add New Blog&quot; to publish your first post.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          {blogs.map((blog) => (
            <Paper
              key={blog.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "16px",
                border: "1px solid #edf1f7",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={blog.image}
                variant="rounded"
                sx={{ width: 64, height: 64, borderRadius: "12px" }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: "#102048", fontSize: "15px" }} noWrap>
                  {blog.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      background: "#8BC53F",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "10px",
                      height: "22px",
                    }}
                  />
                  <Typography sx={{ fontSize: "12px", color: "#667085" }}>{blog.date}</Typography>
                </Box>
              </Box>
              <IconButton onClick={() => openEditDialog(blog)} sx={{ background: "#f5f7fb" }}>
                <EditRoundedIcon sx={{ fontSize: 18, color: "#102048" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(blog.id!)} sx={{ background: "#fef2f2" }}>
                <DeleteRoundedIcon sx={{ fontSize: 18, color: "#ef4444" }} />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800, color: "#102048" }}>
          {editingId ? "Edit Blog Post" : "Add New Blog Post"}
        </DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            fullWidth
          />
          <TextField
            label="URL Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
            fullWidth
            helperText={`Will appear at /blog/${form.slug || "your-slug"}`}
          />
          <TextField
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            fullWidth
          />
          <TextField
            label="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            fullWidth
          />
          <TextField
            label="Short Description (shown on blog list card)"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            label="Full Content (shown on blog detail page)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            fullWidth
            multiline
            minRows={5}
          />
          <TextField
            label="Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: "none", fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
            sx={{
              background: "#8BC53F",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              "&:hover": { background: "#74ab35" },
            }}
          >
            {saving ? "Saving..." : editingId ? "Update" : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}