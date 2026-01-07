
import { GoogleGenAI, Type } from "@google/genai";
import { BIO_SYSTEM_PROMPT, CHAT_SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateBio(keywords: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a portfolio bio based on these keywords: ${keywords}`,
        config: {
          systemInstruction: BIO_SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              bio: { type: Type.STRING }
            },
            required: ["headline", "bio"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Bio Generation Error:", error);
      return null;
    }
  }

  createChat() {
    return this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: CHAT_SYSTEM_PROMPT
      }
    });
  }
}

export const geminiService = new GeminiService();
