import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceReport } from "@/types/serviceReport";

const COLLECTION = "serviceReports";

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

export async function createServiceReport(
  data: Omit<ServiceReport, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
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