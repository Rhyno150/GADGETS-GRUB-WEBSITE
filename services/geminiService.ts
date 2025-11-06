
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiDiagnosis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder check. The environment variable is assumed to be set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const diagnosisSchema = {
    type: Type.OBJECT,
    properties: {
        possibleIssue: {
            type: Type.STRING,
            description: "A short, user-friendly name for the most likely hardware or software issue (e.g., 'Cracked Screen Assembly', 'Faulty Charging Port')."
        },
        recommendedService: {
            type: Type.STRING,
            description: "The name of the repair service that would fix this issue (e.g., 'Screen Replacement', 'Charging Port Repair')."
        },
        explanation: {
            type: Type.STRING,
            description: "A brief, one or two-sentence explanation of why this is the likely issue based on the user's description."
        },
        disclaimer: {
            type: Type.STRING,
            description: "A standard disclaimer stating that this is an AI-generated suggestion and a physical inspection is required for a definitive diagnosis."
        }
    },
    required: ["possibleIssue", "recommendedService", "explanation", "disclaimer"]
};

export const diagnoseProblem = async (problemDescription: string): Promise<GeminiDiagnosis | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `A customer described their phone problem: "${problemDescription}". Analyze this and identify the most likely issue.`,
            config: {
                systemInstruction: "You are an expert mobile phone repair technician. A customer is describing their phone issue. Based on their description, identify the most likely problem, suggest a relevant repair service, and provide a friendly disclaimer that this is not a final diagnosis. Respond in JSON format.",
                responseMimeType: "application/json",
                responseSchema: diagnosisSchema,
            },
        });

        const jsonString = response.text.trim();
        const diagnosisResult: GeminiDiagnosis = JSON.parse(jsonString);
        return diagnosisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
};
