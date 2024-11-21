import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

export async function extractKeyword(prompt) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Extract the most relevant keyword or phrase from the user's prompt. Respond only with the keyword or phrase, and nothing else." },
        { role: "user", content: prompt },
      ],
      model: "llama3-8b-8192",
    });

    const keyword = response.choices[0]?.message?.content?.trim();
    if (!keyword) throw new Error("No keyword extracted from the response.");
    return keyword;
  } catch (error) {
    console.error(`Error extracting keyword for prompt: "${prompt}".`, error);
    throw error;
  }
}