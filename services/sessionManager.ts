// services/sessionManager.ts
const SESSION_KEY = "user";
const EXPIRY_KEY = "sessionExpiresAt";
const SESSION_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Save the logged-in user's data and arm a fresh 5-minute expiry window.
 */
export function saveSession(userData: Record<string, any>) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  localStorage.setItem(EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
}

/**
 * Push the expiry forward from "right now" — called when the tab is
 * hidden/closed, so the 5-minute countdown starts from the moment
 * the user leaves, not from when they originally logged in.
 */
function armExpiryFromNow() {
  if (localStorage.getItem(SESSION_KEY)) {
    localStorage.setItem(EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
  }
}

/**
 * Wipe the session completely.
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

/**
 * Returns true if a valid, non-expired session exists.
 * If an expired session is found, it is cleared as a side effect.
 */
export function isSessionValid(): boolean {
  if (typeof window === "undefined") return false;

  const user = localStorage.getItem(SESSION_KEY);
  const expiresAt = localStorage.getItem(EXPIRY_KEY);

  if (!user || !expiresAt) return false;

  if (Date.now() > Number(expiresAt)) {
    clearSession();
    return false;
  }

  return true;
}

/**
 * Get the current session's user data, or null if expired/missing.
 */
export function getSession(): Record<string, any> | null {
  if (!isSessionValid()) return null;
  const user = localStorage.getItem(SESSION_KEY);
  return user ? JSON.parse(user) : null;
}

/**
 * Wire up listeners so the 5-minute expiry clock starts the moment
 * the tab is hidden (switched away / minimized) or the browser/tab
 * is closed. Call this ONCE at the root of the app (e.g. in a
 * top-level layout/provider component).
 */
export function initSessionWatcher() {
  if (typeof window === "undefined") return;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      armExpiryFromNow();
    }
  });

  window.addEventListener("beforeunload", armExpiryFromNow);
}