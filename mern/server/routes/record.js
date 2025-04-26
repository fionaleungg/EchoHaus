import express from "express";
import db from "../db/connection.js"
import {ObjectId} from "mongodb"

import dotenv from 'dotenv'
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config({ path: './config.env' });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const router = express.Router();

export default router;

router.post('/generate', async (req, res) => {
  const { prompt } = req.body; // Capture prompt from the request

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Or choose the appropriate model
    const result = await model.generateContent(prompt); // Generate content using Gemini
    const response = await result.response;

    const text = response.text();
    res.json({ response: text }); // Send the result to the frontend
    console.log('trying the model')
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});


router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})