import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // adjust path if your firebase config lives elsewhere

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  image: string;
  desc: string;
  content: string;
  category: string;
  date: string;
  createdAt?: Timestamp;
}

const blogsRef = collection(db, "blogs");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const q = query(blogsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BlogPost, "id">) }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getAllBlogs();
  return all.find((b) => b.slug === slug) || null;
}

export async function addBlog(data: Omit<BlogPost, "id" | "createdAt">) {
  return addDoc(blogsRef, { ...data, createdAt: serverTimestamp() });
}

export async function updateBlog(id: string, data: Partial<BlogPost>) {
  return updateDoc(doc(db, "blogs", id), data);
}

export async function deleteBlog(id: string) {
  return deleteDoc(doc(db, "blogs", id));
}