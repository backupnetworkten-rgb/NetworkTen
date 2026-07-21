"use client";

export interface AppUser {
  username: string;
  password: string;
  displayName: string;
  securityQuestion: string;
  securityAnswer: string;
}

/* ------------------------------------------------------------------
   SET YOUR LOGIN CREDENTIALS HERE
   You can add as many users as you like. Each one needs:
   - username / password  → used to log in
   - displayName           → shown on the dashboard
   - securityQuestion/Answer → used for "Forgot password"
------------------------------------------------------------------ */
const DEFAULT_USERS: AppUser[] = [
  {
    username: "admin",
    password: "Admin@123",
    displayName: "Ravinder Gupta",
    securityQuestion: "What is your favorite color?",
    securityAnswer: "blue",
  },
  // Add more users like this if needed:
  {
    username: "engineer1",
    password: "Engg@123",
    displayName: "Kamal",
    securityQuestion: "What city were you born in?",
    securityAnswer: "delhi",
  },
];

const STORAGE_KEY = "service_report_users";
const SESSION_KEY = "service_report_session";

/* Loads users, always syncing with DEFAULT_USERS above:
   - New usernames in DEFAULT_USERS that aren't in storage get added.
   - For usernames that already exist in storage, displayName,
     securityQuestion and securityAnswer are refreshed from the code
     defaults every time (so editing the code always takes effect
     immediately), while the PASSWORD is kept from storage — this way
     a password reset done via "Forgot password" is never lost. */
function loadUsers(): AppUser[] {
  if (typeof window === "undefined") return DEFAULT_USERS;

  const raw = localStorage.getItem(STORAGE_KEY);
  let storedUsers: AppUser[] = [];

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as AppUser[];
      if (Array.isArray(parsed)) storedUsers = parsed;
    } catch {
      storedUsers = [];
    }
  }

  const storedByUsername = new Map(
    storedUsers.map((u) => [u.username.toLowerCase(), u])
  );

  // Build the merged list from DEFAULT_USERS as the source of truth
  // for everything except password, which comes from storage if present.
  const mergedFromDefaults: AppUser[] = DEFAULT_USERS.map((defaultUser) => {
    const existing = storedByUsername.get(defaultUser.username.toLowerCase());
    return {
      ...defaultUser,
      password: existing ? existing.password : defaultUser.password,
    };
  });

  // Keep any stored users that aren't in DEFAULT_USERS at all
  // (e.g. accounts you removed from code but don't want to lose).
  const defaultUsernames = new Set(
    DEFAULT_USERS.map((u) => u.username.toLowerCase())
  );
  const extraStoredUsers = storedUsers.filter(
    (u) => !defaultUsernames.has(u.username.toLowerCase())
  );

  const mergedUsers = [...mergedFromDefaults, ...extraStoredUsers];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedUsers));

  return mergedUsers;
}

function saveUsers(users: AppUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/** Checks username + password against the configured users. */
export function verifyLogin(username: string, password: string): AppUser | null {
  const users = loadUsers();
  const found = users.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );
  return found || null;
}

/** Returns the security question for a username, or null if not found. */
export function getSecurityQuestion(username: string): string | null {
  const users = loadUsers();
  const found = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );
  return found ? found.securityQuestion : null;
}

/** Verifies the security answer and, if correct, sets a new password. */
export function resetPassword(
  username: string,
  securityAnswer: string,
  newPassword: string
): boolean {
  const users = loadUsers();
  const idx = users.findIndex(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );
  if (idx === -1) return false;
  if (
    users[idx].securityAnswer.trim().toLowerCase() !==
    securityAnswer.trim().toLowerCase()
  ) {
    return false;
  }
  users[idx].password = newPassword;
  saveUsers(users);
  return true;
}

/* ---------------- Session helpers (kept for the current tab) ------- */

export function getSession(): AppUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export function setSession(user: AppUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}