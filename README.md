# 🔮 Mystica Oracle

> *"The ancient vision awaits. Let Zyphoria read the thread of your fate."*

**Mystica Oracle** is an AI-powered fortune telling web application featuring **Zyphoria**, an ancient fantasy mage who delivers deeply personalized personality readings, tarot insights, and prophecies based on your personal details.

## ✨ Features

- **AI-Powered Readings** — Claude AI analyzes your name, birth date, question, and personality traits to generate a fully personalized oracle reading
- **Soul Archetype** — Discover your unique personality archetype and dominant element
- **Three-Timeline Fortune** — Past, Present, and Future readings
- **Tarot Card Assignment** — Your personal tarot card with meaning
- **Personal Prophecy** — A unique, poetic prophecy crafted just for you
- **Fantasy Mage Character** — Zyphoria, animated SVG character with aura effects
- **Mystical UI** — Starfield background, rune circles, shimmer effects, dark fantasy aesthetic

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI Model**: Claude (Anthropic API)
- **Styling**: Tailwind CSS + Custom CSS animations
- **Fonts**: Cinzel Decorative, Cinzel, Crimson Text
- **Deployment**: Vercel

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variable
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import repo to [vercel.com](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in Vercel Environment Variables
4. Deploy!

## 🎨 Design

- **Color Palette**: Deep indigo `#050208`, Gold `#c9a84c`, Mystic purple `#9b5de5`, Teal `#00b4d8`
- **Aesthetic**: Dark fantasy / arcane mysticism — starfields, rune circles, glowing orbs
- **Character**: Zyphoria — fully hand-crafted SVG fantasy mage with animated aura

---

Built for **WealthyPeople.id** Stage 2 Developer Recruitment Challenge
