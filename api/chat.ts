
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured in Vercel."
    });
  }

  try {
    const { message, history } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please provide a message."
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...(Array.isArray(history) ? history : []),
        { role: "user", parts: [{ text: message.trim() }] }
      ]
    });

    return res.status(200).json({
      text: response.text ?? ""
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "The AI request failed. Check your Gemini API key and configuration."
    });
  }
}
