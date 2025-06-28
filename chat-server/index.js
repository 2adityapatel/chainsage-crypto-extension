const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Response length limits
const MAX_RESPONSE_TOKENS = 100; // Approximately 2-3 sentences
const MAX_RESPONSE_CHARS = 200; // Fallback character limit

app.post('/api/gemini-chat', async (req, res) => {
  const { prompt, systemInstruction } = req.body;
  try {
    console.log('[Gemini Backend] Incoming prompt:', prompt);
    console.log('[Gemini Backend] System instruction:', systemInstruction);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        ...(systemInstruction && { systemInstruction }),
        generationConfig: {
          maxOutputTokens: MAX_RESPONSE_TOKENS,
          temperature: 0.7, // Slightly creative but focused
        }
      },
    });
    console.log('[Gemini Backend] Raw Gemini SDK response:', response);
    
    let responseText = response.text || '';
    
    // Safety check: truncate if still too long
    if (responseText.length > MAX_RESPONSE_CHARS) {
      responseText = responseText.slice(0, MAX_RESPONSE_CHARS) + '...';
      console.log('[Gemini Backend] Response truncated to', MAX_RESPONSE_CHARS, 'characters');
    }
    
    if (!response.text) {
      console.warn("[Gemini Backend] No 'text' field in Gemini response:", response);
    }
    
    console.log('[Gemini Backend] Final response length:', responseText.length, 'characters');
    res.json({ text: responseText });
  } catch (error) {
    console.error('[Gemini Backend] Error:', error);
    res.status(500).json({ error: error.toString() });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`chat server running on port ${PORT}`));