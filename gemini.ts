
import { GoogleGenAI, Type } from "@google/genai";
import { DesignConcept } from "../types";

export const generateDesignIdea = async (prompt: string): Promise<DesignConcept> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user wants a custom laser engraved item. Here is their request: "${prompt}". Suggest a creative engraving concept.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conceptName: { type: Type.STRING },
          engravingText: { type: Type.STRING },
          recommendedFont: { type: Type.STRING },
          materialSuggestion: { type: Type.STRING },
          styleDescription: { type: Type.STRING },
        },
        required: ["conceptName", "engravingText", "recommendedFont", "materialSuggestion", "styleDescription"],
      },
    },
  });

  return JSON.parse(response.text);
};
