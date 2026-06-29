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
import { db } from "./firebase"; // same firebase config you already use

export interface JobOpening {
  id?: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description?: string;
  createdAt?: Timestamp;
}

export interface JobApplication {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  status?: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt?: Timestamp;
}

const jobsRef = collection(db, "jobOpenings");
const applicationsRef = collection(db, "jobApplications");

// ---- Job Openings (admin manages these) ----

export async function getAllJobs(): Promise<JobOpening[]> {
  const q = query(jobsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<JobOpening, "id">) }));
}

export async function addJob(data: Omit<JobOpening, "id" | "createdAt">) {
  return addDoc(jobsRef, { ...data, createdAt: serverTimestamp() });
}

export async function updateJob(id: string, data: Partial<JobOpening>) {
  return updateDoc(doc(db, "jobOpenings", id), data);
}

export async function deleteJob(id: string) {
  return deleteDoc(doc(db, "jobOpenings", id));
}

// ---- Applications (public submits, admin reviews) ----

export async function getAllApplications(): Promise<JobApplication[]> {
  const q = query(applicationsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<JobApplication, "id">) }));
}

export async function submitApplication(
  data: Omit<JobApplication, "id" | "createdAt" | "status">
) {
  return addDoc(applicationsRef, { ...data, status: "New", createdAt: serverTimestamp() });
}

export async function updateApplicationStatus(id: string, status: JobApplication["status"]) {
  return updateDoc(doc(db, "jobApplications", id), { status });
}

export async function deleteApplication(id: string) {
  return deleteDoc(doc(db, "jobApplications", id));
}