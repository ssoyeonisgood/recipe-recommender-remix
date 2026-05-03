# Recipe Recommender (Remix)

An AI-powered recipe recommendation web application that generates meal ideas from uploaded ingredient photos.

Built using Remix, React, and TypeScript, with a strong focus on rapid iteration and AI-assisted development.

---

## Overview

This project was built to solve a simple real-world problem:
“What can I cook with the ingredients I already have?”

Users upload an image of ingredients, and the app uses AI to:

Extract ingredient data from the image
Generate relevant recipe suggestions
Display results instantly in a clean UI

---

## AI-Assisted Development

This project was built using a vibe coding workflow, leveraging AI tools to move faster and iterate efficiently.

I actively used ChatGPT to improve both development speed and code quality:

-  Accelerate UI development by quickly generating and refining component structures  
- Design and refine **structured prompts** to ensure consistent and reliable AI-generated outputs  
- Supported:
    Rapid prototyping,
    Code generation and refactoring,
    Debugging and optimization

The workflow focused on shipping features quickly, then iterating on UX, logic, and AI response quality through continuous refinement.

---

## Key Features

- Image-based ingredient recognition
- AI-generated recipe recommendations
- Fast server-side rendering with Remix
- Responsive and intuitive UI
- Streamlined input → result flow

---

## Tech Stack

- Remix  
- React  
- TypeScript  
- Tailwind CSS  
- Vercel’s AI SDK.
- Vercel (deployment)

---

## How It Works
1. User uploads an image of ingredients
2. Server processes the request via Remix
3. AI extracts ingredient information
4. AI generates recipe suggestions
5. Results are rendered dynamically in the UI

---

## Getting Started

```bash
git clone https://github.com/ssoyeonisgood/recipe-recommender-remix.git
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
