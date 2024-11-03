import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/gpt', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                model: 'gpt-3.5-turbo', 
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100, 
                
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error calling GPT API:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

export default router;