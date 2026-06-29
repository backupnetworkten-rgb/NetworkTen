import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("GET PRODUCTS ERROR", error);
    return [];
  }
};

// GET SINGLE PRODUCT BY ID
export const getProductById = async (id: string) => {
  try {
    const ref = doc(db, "products", id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return null;
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    return null;
  }
};

// ADD PRODUCT
export const addProduct = async (product: Product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });
    console.log("PRODUCT SAVED:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    throw error;
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, product);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    throw error;
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("DELETE ERROR:", error);
    throw error;
  }
};