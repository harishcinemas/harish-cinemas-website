import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      res.status(400).json({ success: false, message: "A valid email is required to unlock sneak-peeks." });
      return;
    }
    res.status(200).json({ 
      success: true, 
      message: `Welcome to the Inner Circle. ${email} is registered! Exclusive previews of upcoming film materials have been dispatched.` 
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server registry error. Please try again." });
  }
}
