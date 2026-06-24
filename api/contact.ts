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
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: "Required parameters (name, email, message) are missing." });
      return;
    }

    const formSubmitUrl = "https://formsubmit.co/ajax/harishcinemas1977@gmail.com";
    const response = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": req.headers.referer || "https://harishcinemas.com"
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Message: message,
        _subject: `🎬 Harish Cinemas: New Contact Message from ${name}`,
        _honey: "", // Honeypot spam protector
      })
    });

    const responseData = await response.json();
    res.status(200).json(responseData);
  } catch (err: any) {
    console.error("[FORM ACTION EXCLUSION] Failed to dispatch through endpoint proxy:", err);
    res.status(500).json({ 
      success: false, 
      message: "The secure portal had an offline error. Contact can still be sent to harishcinemas1977@gmail.com directly." 
    });
  }
}
