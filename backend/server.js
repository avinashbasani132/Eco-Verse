// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const campaignFilePath = path.join(dataDir, 'campaign.json');
const levelsDir = path.join(dataDir, 'levels');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(levelsDir)) {
  fs.mkdirSync(levelsDir);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Endpoint 1: Static Campaign
app.get('/api/campaign', (req, res) => {
  try {
    if (!fs.existsSync(campaignFilePath)) {
      return res.status(404).json({ error: "Campaign file missing. Run generate_campaign.js first." });
    }
    const data = fs.readFileSync(campaignFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading campaign file:", error);
    res.status(500).json({ error: "Campaign data corruption detected" });
  }
});

// Endpoint 2: Dynamic Scanner Generation
app.post('/api/generate-dynamic', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `
        You are an expert programming tutor. 
        Create a comprehensive lesson for the topic: "${topic}". 
        
        Format your response strictly as a single JSON object matching this exact structure:
        {
            "id": "dynamic-scanner",
            "title": "Understanding ${topic}",
            "environmental_theme": "None",
            "programming_concept": "${topic}",
            "lesson_text": "A highly detailed, conversational, and easy-to-understand explanation teaching the user about the topic. Provide code examples using markdown code blocks (\`\`\`language\\ncode\\n\`\`\`). DO NOT include any story, eco-theme, or roleplay.",
            "quizzes": [
                {
                    "question": "Logic puzzle question 1",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct_index": 0
                }
            ]
        }
        
        CRITICAL INSTRUCTIONS:
        1. "lesson_text" must be a pure, high-quality educational explanation of the topic.
        2. "quizzes" MUST be an array containing EXACTLY 5 quiz objects that progressively get harder.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const textResponse = result.response.text();
    const parsedResponse = JSON.parse(textResponse);

    res.json(parsedResponse);
  } catch (error) {
    console.error("Dynamic generation failed with error:", error.message || error);
    res.status(500).json({ error: "Failed to calibrate AI scanner. Try again." });
  }
});

// NEW Endpoint 3: Roadmap Generator
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ error: "Role is required" });

    const prompt = `
        Create a professional technical roadmap for the role of "${role}". 
        Format strictly as a JSON object:
        {
            "role": "${role}",
            "description": "A short 2-sentence description of what this role does.",
            "phases": [
                {
                    "phase_name": "Phase 1: Basics",
                    "concepts": ["Concept 1 details", "Concept 2 details", "Concept 3 details"]
                }
            ]
        }
        Include exactly 4 to 5 phases, starting from beginner to advanced.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(result.response.text()));
  } catch (error) {
    console.error("Roadmap generation failed:", error.message || error);
    res.status(500).json({ error: "Failed to generate roadmap." });
  }
});

app.get('/api/levels/:id', (req, res) => {
  try {
    const { id } = req.params;
    const levelFilePath = path.join(levelsDir, `level${id}.json`);
    if (!fs.existsSync(levelFilePath)) {
      return res.status(404).json({ error: "Level file not found" });
    }
    const data = fs.readFileSync(levelFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(`Error reading level ${req.params.id}:`, error);
    res.status(500).json({ error: "Level data corruption detected" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Eco-Verse Server running on http://localhost:${PORT}`);
});