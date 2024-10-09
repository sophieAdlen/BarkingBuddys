const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai'); // Ändra importen
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/recommendations', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
        });
        res.json({ data: response.choices[0].message.content });
    } catch (error) {
        console.error('Error from OpenAI:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(5001, () => console.log('Server running on http://localhost:5000'));
