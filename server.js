const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai'); // Import OpenAI directly
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve the frontend

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Summarization API endpoint
app.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4" if you have access
            messages: [{ role: "user", content: `Summarize the following text:\n\n${text}` }],
            max_tokens: 100, // Limit output tokens to control summary length
        });

        const summary = response.choices[0].message.content.trim();
        res.json({ summary });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
