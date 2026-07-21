import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceReport } from "@/types/serviceReport";

const COLLECTION = "serviceReports";

function generateShareToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(9)))
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 12);
}

export function subscribeServiceReports(
  callback: (reports: ServiceReport[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const reports: ServiceReport[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<ServiceReport, "id">),
      }));
      callback(reports);
    },
    (error) => {
      console.error("Error listening to service reports:", error);
      onError?.(error);
    }
  );
}

/**
 * Creates a report with status "pending" and a fresh share token.
 * Returns the shareToken (not the doc id) so the caller can build
 * the public fill-in link immediately: /service-report/fill/{token}
 */
export async function createServiceReport(
  data: Omit<ServiceReport, "id" | "createdAt" | "updatedAt" | "status" | "shareToken">
): Promise<string> {
  const shareToken = generateShareToken();
  await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "pending",
    shareToken,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return shareToken;
}

export async function updateServiceReport(
  id: string,
  data: Partial<ServiceReport>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteServiceReport(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}

/**
 * Public lookup — called from the unauthenticated
 * /service-report/fill/[token] page. No auth required, no login.
 */
export async function getReportByShareToken(
  token: string
): Promise<ServiceReport | null> {
  const q = query(collection(db, COLLECTION), where("shareToken", "==", token));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<ServiceReport, "id">) };
}

/**
 * Called from the public fill-in page when Part B is submitted.
 * Marks the report "completed" so the PDF becomes downloadable
 * to the logged-in user in the dashboard.
 */
export async function submitReportCompletion(
  id: string,
  partB: Partial<ServiceReport>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...partB,
    status: "completed",
    updatedAt: serverTimestamp(),
  });
}