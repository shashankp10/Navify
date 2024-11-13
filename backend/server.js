import dotenv from 'dotenv';
import express from 'express';
import Groq from 'groq-sdk';
import { startCrawler } from './crawler.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
}
app.use(cors(corsOptions));

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
    console.error("API key is missing! Please set the GROQ_API_KEY in your .env file.");
    process.exit(1);
}

const groq = new Groq({
    apiKey: apiKey,
});

app.use(express.json());

export async function extractKeyword(prompt) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Extract the single most relevant keyword from the user’s prompt that best represents the main topic or subject. This keyword will be used for web crawling to gather related information.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192",
        });

        const keyword = response.choices[0]?.message?.content?.trim().match(/\*\*(.*?)\*\*/)?.[1] || response.choices[0]?.message?.content?.trim();
        if (!keyword) throw new Error("No keyword extracted.");

        console.log("Extracted Keyword:", keyword);
        return keyword;
    } catch (error) {
        console.error('Error extracting keyword:', error);
        throw error;
    }
}

app.post('/api/v1/navify', async (req, res) => {
    const prompt = req.body.prompt;
    const url = req.body.url;
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required in the request body" });
    }

    try {
        const keyword = await extractKeyword(prompt);
        // keyword = "lazy";
        const results = await startCrawler(keyword, prompt, url);
        console.log('API Results:', results);
        res.json({ keyword, results });
    } catch (error) {
        console.error("Error in extracting keyword:", error);
        res.status(500).json({ error: "An error occurred while extracting the keyword" });
    }
});
app.get("/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
