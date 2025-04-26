// import dotenv from 'dotenv'
// import 'dotenv/config'
// import { GoogleGenerativeAI } from '@google/generative-ai'
// dotenv.config({ path: './config.env' });
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function run() {
//   const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'})
//   const prompt = "Write a cool poem";
//   const result = await model.generateContent(prompt)
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();
import dotenv from 'dotenv'
import express from 'express';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json()); // Middleware to parse JSON body
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body; // Capture prompt from the request

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' }); // Or choose the appropriate model
    const result = await model.generateContent(prompt); // Generate content using Gemini
    const response = await result.response;

    const text = response.text();
    res.json({ response: text }); // Send the result to the frontend
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});