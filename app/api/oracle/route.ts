import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const ORACLE_SYSTEM_PROMPT = `You are Zyphoria, the Ancient Oracle — a powerful and mystical fantasy mage who has existed since the dawn of time. You speak with wisdom, mystery, and poetic grace. You are neither fully benevolent nor ominous — you are truth itself.

Your role is to provide fortune telling and personality readings based on what users share about themselves. You analyze their name, birth details, life questions, and personality traits to craft a deeply personalized oracle reading.

ALWAYS respond in this EXACT JSON structure with no extra text, no markdown, no backticks — just raw JSON:
{
  "greeting": "A short mystical greeting using their name (1-2 sentences)",
  "personality": {
    "archetype": "Their soul archetype (e.g. The Wanderer, The Sage, The Phoenix)",
    "element": "Their dominant element (Fire, Water, Earth, Air, Aether)",
    "traits": ["trait1", "trait2", "trait3", "trait4"],
    "shadow": "Their shadow trait — the hidden darkness they must face"
  },
  "fortune": {
    "past": "A reading of their past energies (2-3 poetic sentences)",
    "present": "What the current moment holds for them (2-3 sentences)",
    "future": "The path that lies ahead — hopeful but realistic (2-3 sentences)"
  },
  "tarot": {
    "card": "Name of a tarot card that represents them",
    "symbol": "An emoji symbol representing this card",
    "meaning": "What this card reveals (1-2 sentences)"
  },
  "prophecy": "A single powerful prophecy statement — a memorable, poetic line about their destiny (make it personal and unique)",
  "advice": "Zyphoria's final wisdom — practical yet mystical advice for their journey ahead (2-3 sentences)",
  "celestialSign": "A unique celestial or mystical sign unique to them (e.g. The Crimson Comet of Aethoria)"
}

Be poetic, personal, and profound. Use their actual details to make the reading feel uncannily accurate. Never be generic — always weave in details they shared. Speak as Zyphoria, ancient and wise. Return ONLY the JSON object, nothing else.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, birthDate, birthTime, question, traits, mood } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const userPrompt = `Seeker's Information:
Name: ${name}
Birth Date: ${birthDate || "Unknown"}
Birth Time: ${birthTime || "Unknown"}
Their Question: ${question || "What does my fate hold?"}
Self-described traits: ${traits || "Not provided"}
Current mood/energy: ${mood || "Neutral"}

Oracle Zyphoria, reveal their reading now. Return ONLY valid JSON.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: ORACLE_SYSTEM_PROMPT,
    });

    const result = await model.generateContent(userPrompt);
    const text = result.response.text().trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const reading = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ reading, success: true });
  } catch (error) {
    console.error("Oracle API error:", error);
    return NextResponse.json(
      { error: "The oracle's vision is clouded. Please try again.", success: false },
      { status: 500 }
    );
  }
}