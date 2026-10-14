"use client";

import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isSessionValid } from "@/services/sessionManager";

/**
 * Tells a page whether the visitor is logged in.
 *  - checking:     true until Firebase reports its first auth state
 *                  (prevents the popup from flashing for logged-in users)
 *  - isLoggedIn:   true only if Firebase has a user AND your own session is valid
 *  - markLoggedIn: call after a successful login so the popup closes at once
 */
export function useRequireLogin() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user) && isSessionValid());
      setChecking(false);
    });
    return () => unsub();
  }, []);

  const markLoggedIn = useCallback(() => setIsLoggedIn(true), []);

  return { checking, isLoggedIn, markLoggedIn };
}