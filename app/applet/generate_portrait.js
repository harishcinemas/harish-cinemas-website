import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function run() {
  try {
    console.log("Starting image generation...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A highly elegant, cinematic, realistic corporate headshot of a 55-year-old South Indian businessman. He has thick, wavy, styled salt-and-pepper gray hair, and a distinct red tilak dot on his forehead. He is wearing a dark navy suit blazer and a crisp, clean white collared shirt with a green pen visible in his front pocket. He is seated at a premium dark wooden desk, with his hands neatly clasped on the table. Behind him is an executive office background with bookshelves and warm vertical glowing light strips. Photorealistic, 8k resolution, premium corporate presentation portrait.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("No response parts received from the model");
    }

    let foundImage = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync('public/alagu_pandian.png', buffer);
        console.log("Success! Image generated and saved as public/alagu_pandian.png");
        foundImage = true;
        break;
      }
    }

    if (!foundImage) {
      console.log("No image part found in the model response. Text response was:", response.text);
    }
  } catch (error) {
    console.error("Error during generation:", error);
  }
}

run();
