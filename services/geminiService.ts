import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateVectorImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    // Clean base64 string if it contains the header
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt + " Return ONLY the image.",
          },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated.");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    // If we only got text back (usually an error or refusal)
    const textPart = parts.find(p => p.text);
    if (textPart) {
      throw new Error(`Model returned text instead of image: ${textPart.text}`);
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
