# Recipe Recommender (Remix)

An AI-powered recipe recommendation web app built with **Remix**, **React**, and **TypeScript**.  
Users can generate recipe ideas based on a photo of ingredients you uploaded.

---

## Features

- Ingredient-based recipe recommendations  
- AI-powered recipe generation  
- Fast server-side rendering with Remix  
- Responsive UI with React + TypeScript  
- Simple and intuitive input flow  

---

## Tech Stack

- Remix  
- React  
- TypeScript  
- Tailwind CSS  
- Vercel’s AI SDK.
- Vercel (deployment)

---

## Getting Started

```bash
git clone https://github.com/your-username/recipe-recommender-remix.git
cd recipe-recommender-remix
npm install
```
Create .env file:
```
OPENAI_API_KEY=your_api_key_here
```
Run development server:
```
npm run dev
```
App runs on:
```
http://localhost:3000
```

## How it works
User inputs an image of ingredients → Remix handles request →  AI extracts ingredients → AI generates recipes → results rendered in UI.
