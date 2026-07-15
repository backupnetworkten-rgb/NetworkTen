let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getShiprocketToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Shiprocket auth failed: " + errText);
  }

  const data = await res.json();
  cachedToken = data.token;
  tokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 9; // token valid ~10 days, refresh at 9
  return cachedToken!;
}