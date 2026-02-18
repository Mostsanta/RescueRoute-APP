
import { GoogleGenAI, Type } from "@google/genai";
import { AppState, AidInstruction } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getFirstAidInstructions = async (state: AppState): Promise<AidInstruction> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    You are a professional First Aid instructor. 
    Provide clear, actionable instructions for the following emergency:
    Incident Type: ${state.scenario}
    Symptoms: ${state.symptoms.join(", ")}
    Victim: ${state.victimType === 'CHILD' ? 'Child' : 'Adult'}, Gender: ${state.gender === 'MALE' ? 'Male' : 'Female'}
    Location: State of ${state.stateName}, USA
    CONSTRAINTS: No medical professionals nearby, no cell service for a call, only a standard car first aid kit, water, and improvised materials (clothes, car mats, seatbelts).
    
    Provide the response in English. Return the answer strictly in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          do: { type: Type.ARRAY, items: { type: Type.STRING } },
          dont: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvisedTools: { type: Type.ARRAY, items: { type: Type.STRING } },
          legalNotes: { type: Type.STRING, description: "Mention specific Good Samaritan context for the selected state." },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["do", "dont", "improvisedTools", "legalNotes", "steps"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data as AidInstruction;
  } catch (e) {
    throw new Error("Failed to parse AI response");
  }
};
