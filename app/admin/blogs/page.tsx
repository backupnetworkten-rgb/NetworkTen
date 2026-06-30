"use client";

import { useEffect, useRef, useState } from "react";
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
  Tooltip,
  Divider,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
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

/* ────────────────────────────────────────────────────────────
   RICH TEXT EDITOR
   Lightweight contentEditable editor with a formatting toolbar.
   Produces clean HTML (h1/h2/h3, strong, em, ul/ol/li, blockquote)
   that can be rendered directly on the blog detail page via
   dangerouslySetInnerHTML.
   ──────────────────────────────────────────────────────────── */
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Sync external value into the editor only on mount / when switching
  // between Add and Edit, so we don't fight the user's cursor while typing.
  useEffect(() => {
    if (editorRef.current && isFirstRender.current) {
      editorRef.current.innerHTML = value || "";
      isFirstRender.current = false;
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const applyBlock = (tag: string) => {
    exec("formatBlock", tag);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL");
    if (url) exec("createLink", url);
  };

  const toolbarBtn = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void
  ) => (
    <Tooltip title={label} key={label}>
      <IconButton
        size="small"
        onMouseDown={(e) => e.preventDefault()} // keep editor selection intact
        onClick={onClick}
        sx={{
          borderRadius: "8px",
          color: "#102048",
          "&:hover": { background: "#eef2fb" },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  return (
    <Box
      sx={{
        border: "1px solid #d8deea",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexWrap: "wrap",
          px: 1,
          py: 0.75,
          background: "#f5f7fb",
          borderBottom: "1px solid #d8deea",
        }}
      >
        <Tooltip title="Heading 1">
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyBlock("H1")}
            sx={{ minWidth: "36px", fontWeight: 800, fontSize: "13px", color: "#102048" }}
          >
            H1
          </Button>
        </Tooltip>
        <Tooltip title="Heading 2">
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyBlock("H2")}
            sx={{ minWidth: "36px", fontWeight: 800, fontSize: "12.5px", color: "#102048" }}
          >
            H2
          </Button>
        </Tooltip>
        <Tooltip title="Heading 3">
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyBlock("H3")}
            sx={{ minWidth: "36px", fontWeight: 800, fontSize: "12px", color: "#102048" }}
          >
            H3
          </Button>
        </Tooltip>
        <Tooltip title="Paragraph">
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyBlock("P")}
            sx={{ minWidth: "36px", fontWeight: 700, fontSize: "12px", color: "#667085" }}
          >
            P
          </Button>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {toolbarBtn(<FormatBoldRoundedIcon sx={{ fontSize: 18 }} />, "Bold", () => exec("bold"))}
        {toolbarBtn(<FormatItalicRoundedIcon sx={{ fontSize: 18 }} />, "Italic", () => exec("italic"))}
        {toolbarBtn(<FormatUnderlinedRoundedIcon sx={{ fontSize: 18 }} />, "Underline", () => exec("underline"))}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {toolbarBtn(<FormatListBulletedRoundedIcon sx={{ fontSize: 18 }} />, "Bullet List", () =>
          exec("insertUnorderedList")
        )}
        {toolbarBtn(<FormatListNumberedRoundedIcon sx={{ fontSize: 18 }} />, "Numbered List", () =>
          exec("insertOrderedList")
        )}
        {toolbarBtn(<FormatQuoteRoundedIcon sx={{ fontSize: 18 }} />, "Quote", () => applyBlock("BLOCKQUOTE"))}
        {toolbarBtn(<LinkRoundedIcon sx={{ fontSize: 18 }} />, "Insert Link", insertLink)}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {toolbarBtn(<UndoRoundedIcon sx={{ fontSize: 18 }} />, "Undo", () => exec("undo"))}
        {toolbarBtn(<RedoRoundedIcon sx={{ fontSize: 18 }} />, "Redo", () => exec("redo"))}
      </Box>

      {/* Editable area */}
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        sx={{
          minHeight: "260px",
          maxHeight: "480px",
          overflowY: "auto",
          p: 2.5,
          fontSize: "14px",
          lineHeight: 1.8,
          color: "#102048",
          outline: "none",
          "& h1": { fontSize: "26px", fontWeight: 900, color: "#102048", my: 1.5, lineHeight: 1.25 },
          "& h2": { fontSize: "20px", fontWeight: 800, color: "#102048", my: 1.25, lineHeight: 1.3 },
          "& h3": { fontSize: "16px", fontWeight: 800, color: "#102048", my: 1, lineHeight: 1.3 },
          "& p": { my: 1 },
          "& ul, & ol": { pl: 3, my: 1 },
          "& li": { mb: 0.5 },
          "& blockquote": {
            borderLeft: "3px solid #8BC53F",
            background: "#f5f7fb",
            m: "12px 0",
            p: "10px 16px",
            borderRadius: "8px",
            color: "#667085",
            fontStyle: "italic",
          },
          "& a": { color: "#8BC53F", fontWeight: 700, textDecoration: "underline" },
          "&:empty:before": {
            content: '"Write your blog content here…"',
            color: "#98A2B3",
          },
        }}
      />
    </Box>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editorKey, setEditorKey] = useState(0); // forces editor remount per dialog open
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
    setEditorKey((k) => k + 1);
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
    setEditorKey((k) => k + 1);
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

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
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

          {/* Rich content editor */}
          <Box>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#102048", mb: 1 }}>
              Full Content (shown on blog detail page)
            </Typography>
            <RichTextEditor
              key={editorKey}
              value={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            />
          </Box>

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