import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  type Unsubscribe
} from "firebase/firestore";

import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";

import { auth, db } from "@/lib/firebase";
import { UserData, Address } from "@/types/user";

/**
 * Live-subscribes to the logged-in user instead of reading
 * `auth.currentUser` once. Fixes the "missing login details" bug:
 * `auth.currentUser` is null for a moment while Firebase restores the
 * session on page load, so the old getCurrentUser() returned nothing.
 * This also falls back to the Auth user's email/phone/photo whenever
 * the Firestore doc itself doesn't have them saved, and pushes live
 * updates after every save (no more window.location.reload()).
 */
export function subscribeToCurrentUser(
  callback: (user: UserData | null) => void
) {
  let unsubDoc: Unsubscribe | null = null;

  const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
    if (unsubDoc) {
      unsubDoc();
      unsubDoc = null;
    }

    if (!firebaseUser) {
      callback(null);
      return;
    }

    unsubDoc = onSnapshot(doc(db, "users", firebaseUser.uid), (snap) => {
      const data = (snap.data() as UserData) || ({} as UserData);

      callback({
        ...data,
        uid: firebaseUser.uid,
        name: data.name || firebaseUser.displayName || "",
        email: firebaseUser.email || data.email || "",
        phone: data.phone || firebaseUser.phoneNumber || "",
        photoURL: data.photoURL || firebaseUser.photoURL || "",
        addresses: data.addresses || []
      });
    });
  });

  return () => {
    unsubAuth();
    if (unsubDoc) unsubDoc();
  };
}

export async function updateUserProfile(data: Partial<UserData>) {
  const user = auth.currentUser;
  if (!user) throw new Error("You're not signed in.");

  await updateDoc(doc(db, "users", user.uid), data);

  if (data.name && data.name !== user.displayName) {
    await updateProfile(user, { displayName: data.name });
  }
}

export async function saveAddress(address: Address) {
  const user = auth.currentUser;
  if (!user) throw new Error("You're not signed in.");

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const current = snap.data();

  await updateDoc(ref, {
    addresses: [...(current?.addresses || []), address]
  });
}

export async function updateAddress(id: string, data: Partial<Address>) {
  const user = auth.currentUser;
  if (!user) throw new Error("You're not signed in.");

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const addresses = snap.data()?.addresses || [];

  const updated = addresses.map((a: Address) =>
    a.id === id ? { ...a, ...data } : a
  );

  await updateDoc(ref, { addresses: updated });
}

export async function deleteAddress(id: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("You're not signed in.");

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const addresses = snap.data()?.addresses || [];

  await updateDoc(ref, {
    addresses: addresses.filter((a: Address) => a.id !== id)
  });
}

/**
 * Firebase requires a recent sign-in to change a password — without
 * it, updatePassword() throws `auth/requires-recent-login` and the
 * change silently fails. Re-authenticating with the current password
 * first avoids that for returning users.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("You're not signed in.");

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}