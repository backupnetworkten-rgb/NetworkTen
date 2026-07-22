import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Review = {
  id: string;
  name: string;
  rating: number;
  content: string;
  createdAt: any; // Firestore Timestamp
};

// Fetch all reviews for a product, newest first
export async function getReviews(productId: string): Promise<Review[]> {
  const ref = collection(db, "products", productId, "reviews");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Review[];
}

// Add a review AND atomically update the product's aggregate rating/reviewCount
export async function addReview(
  productId: string,
  { name, rating, content }: { name: string; rating: number; content: string }
) {
  const productRef = doc(db, "products", productId);
  const reviewsRef = collection(db, "products", productId, "reviews");
  const newReviewRef = doc(reviewsRef); // pre-generate ID

  await runTransaction(db, async (transaction) => {
    const productSnap = await transaction.get(productRef);
    if (!productSnap.exists()) throw new Error("Product not found");

    const data = productSnap.data();
    const currentCount = data.reviewCount || 0;
    const currentRating = data.rating || 0;

    const newCount = currentCount + 1;
    const newRating = (currentRating * currentCount + rating) / newCount;

    transaction.update(productRef, {
      rating: newRating,
      reviewCount: newCount,
    });

    transaction.set(newReviewRef, {
      name: name.trim() || "Anonymous",
      rating,
      content: content.trim(),
      createdAt: serverTimestamp(),
    });
  });
}