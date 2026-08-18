# 🌍 Eco-Verse: The Code Restoration Odyssey

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash_Lite-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> **A futuristic, gamified coding adventure combining computer science fundamentals with atmospheric world restoration, powered by Google Gemini AI.**

[🎮 Explore Campaign](#-campaign-acts--curriculum) • [🧠 AI Features](#-ai-neural-net-features) • [🚀 Quick Start](#-quick-start-guide) • [🌐 Deployment](#-deployment-guide) • [🔌 API Reference](#-api-endpoints)

</div>

---

## 🌟 About the Project

**Eco-Verse** is an interactive full-stack learning platform that transforms programming education into an immersive RPG adventure. As an Archive Runner navigating the shattered floating skylands of Asterveil, players resolve computational corruptions and logic puzzles to reactivate the ancient *Code Atlas*.

In addition to the structured 8-chapter story campaign, Eco-Verse features an **AI Dynamic Scanner** that synthesizes comprehensive lessons and interactive 5-stage logic quizzes on *any* programming concept on the fly, alongside an **AI Career Roadmap Architect** with exportable/printable learning pathways.

---

## ✨ Key Features

- **🎮 8-Act Interactive RPG Campaign**:
  - Narrative-driven chapters (Variables, Conditional Logic, Loops, Data Structures, Functions, Object-Oriented Classes, and Final Boss Integration).
  - Cinematic visual dialogues, character voices with **Web Speech API**, and dark ambient atmospheric music synthesized via the **Web Audio API**.
- **🔍 AI Dynamic Topic Scanner (`/api/generate-dynamic`)**:
  - Integrated with **Google Gemini 2.5 Flash Lite**.
  - Dynamically synthesizes educational explanations, code samples, and progressive 5-question logic challenges for any query (e.g., *Recursion*, *Binary Search*, *Graph Traversal*).
- **🧭 Career Roadmap Architect (`/api/generate-roadmap`)**:
  - Constructs 4-5 phase career pathways for any technical role (e.g., *Full Stack Developer*, *Machine Learning Engineer*, *Cloud Architect*).
  - Includes instant styled PDF print and download options.
- **💎 Cyber-Botanic Glassmorphism UI**:
  - Built with **React 19**, **Tailwind CSS v4**, and **Framer Motion**.
  - Interactive SVG map paths with real-time glowing node clearances and sound design.

---

## 🏗️ Architecture & Tech Stack

```text
Eco-Verse/
├── backend/       # Express.js REST API & Google Gemini AI integration
└── frontend/      # React 19, Vite, Tailwind CSS v4 SPA
```

### **Frontend**
| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component architecture and state lifecycle |
| **Vite 8** | High-performance bundling and Hot Module Replacement (HMR) |
| **Tailwind CSS v4** | Modern utility-first styling with custom glassmorphic tokens |
| **Framer Motion** | Physics-based spring animations, transitions, and typewriter effects |
| **React Router v7** | Single Page Application (SPA) client-side navigation |
| **Lucide React** | Cybernetic vector iconography |
| **Axios** | Backend REST API communication |
| **Web Audio API** | Procedural ambient synthesizer engine |
| **Web Speech API** | Character dialogue voice synthesis |

### **Backend**
| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express.js** | Backend runtime and REST API service |
| **@google/generative-ai** | Google Gemini AI integration for dynamic lesson & roadmap compilation |
| **Dotenv** | Secure environment configuration |
| **CORS** | Cross-Origin Resource Sharing handling |

---

## 🗺️ Campaign Acts & Curriculum

| Sector / Level | Title | Programming Concept | Narrative Theme |
| :---: | :--- | :--- | :--- |
| **Prologue** | The Fall of Asterveil | Introduction & Awakening | The Shattered Skylands |
| **Sector 01** | The Summoning of the Hero | Variables & Data Types | Essence Anchoring Protocol |
| **Sector 02** | The Trial of Weapons | Conditional Logic (`if/elif/else`) | Branching Destiny |
| **Sector 03** | The Endless Horde | Loops (`for` / `while` / `break`) | Iterative Combat Automation |
| **Sector 04** | The Vault of Relics | Lists, Tuples & Data Structures | Immutable Memory Vaults |
| **Sector 05** | The Spellcraft Library | Functions & Modularity (`def`) | Dynamic Spell Encapsulation |
| **Sector 06** | The Guild of Living Armor | Classes & Objects (OOP) | Blueprint Manifestation |
| **Sector 07** | Final Siege: Demon King | Full Concept Integration | World Source Restoration |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- [NPM](https://www.npmjs.com/) (v9.0.0 or later)
- A [Google Gemini API Key](https://ai.google.dev/) (Free tier available)

---

### 1. Clone the Repository
```bash
git clone https://github.com/avinashbasani132/Eco-Verse-.git
cd Eco-Verse-
```

---

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file in the `backend/` directory:
   ```bash
   cp .env.example .env
   ```

4. Add your configuration to `backend/.env`:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   > 🚀 Backend runs on **`http://localhost:5000`**

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment:
   ```bash
   cp .env.example .env
   ```
   *Default fallback is `http://localhost:5000`.*

4. Start the development server:
   ```bash
   npm run dev
   ```
   > 🌐 Frontend runs on **`http://localhost:5173`**

---

## 🌐 Deployment Guide

### **Frontend Deployment (Vercel / Netlify)**

The frontend includes configured `vercel.json` and `public/_redirects` for Single Page Application client-side routing.

1. **Deploy on Vercel**:
   - Set **Root Directory** to `frontend`.
   - Set **Build Command** to `npm run build`.
   - Set **Output Directory** to `dist`.
   - Add Environment Variable:
     - `VITE_API_BASE_URL`: URL of your deployed backend (e.g. `https://eco-verse-api.onrender.com`).

2. **Deploy on Netlify**:
   - Set **Base directory** to `frontend`.
   - Set **Build command** to `npm run build`.
   - Set **Publish directory** to `frontend/dist`.
   - Set `VITE_API_BASE_URL` in Netlify Site Settings > Environment Variables.

---

### **Backend Deployment (Render / Railway)**

1. **Deploy on Render**:
   - Create a new **Web Service**.
   - Set **Root Directory** to `backend`.
   - Set **Build Command** to `npm install`.
   - Set **Start Command** to `npm start`.
   - Add Environment Variables:
     - `GEMINI_API_KEY`: Your Google Gemini API Key.
     - `PORT`: `5000` (or leave default assigned by host).
   - The `/api/health` endpoint serves as the automatic health check probe.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and root endpoint catalog |
| `GET` | `/api/health` | Service health check probe |
| `GET` | `/api/campaign` | Returns the static campaign storyline data |
| `GET` | `/api/levels/:id` | Returns specific level scenes and challenge data |
| `POST` | `/api/generate-dynamic` | Compiles AI topic explanation & 5 progressive quizzes |
| `POST` | `/api/generate-roadmap` | Compiles AI career roadmap with 4-5 developmental phases |

---

## 📁 Project Directory Structure

```text
Eco-Verse/
├── backend/
│   ├── data/
│   │   ├── levels/              # JSON game data (intro, level1-7)
│   │   └── campaign.json        # Static campaign catalog
│   ├── .env.example             # Backend environment template
│   ├── .gitignore               # Ignored backend artifacts
│   ├── package.json             # Backend dependencies & start script
│   └── server.js                # Express API with Gemini AI services
├── frontend/
│   ├── public/                  # Public assets, icons & _redirects
│   ├── src/
│   │   ├── assets/              # Branding and visual elements
│   │   ├── components/          # Shared animated UI components
│   │   │   ├── AnimatedCard.jsx     # Spring physics glassmorphic card
│   │   │   ├── StoryDialogue.jsx    # Cinematic dialogue with speech synthesis
│   │   │   └── TypewriterText.jsx   # Terminal typewriter effect
│   │   ├── config/              # Centralized environment & API configuration
│   │   │   └── api.js
│   │   ├── pages/               # Main application route views
│   │   │   ├── levels/              # Dedicated level stages (Intro, Level 1-7)
│   │   │   ├── DynamicScanner.jsx   # AI Topic Scanner interface
│   │   │   ├── Home.jsx             # Hero landing deployment sequence
│   │   │   ├── LevelView.jsx        # Dynamic AI quiz runner
│   │   │   ├── Roadmap.jsx          # AI Career Pathway generator
│   │   │   └── StoryMap.jsx         # Interactive Kingdom campaign map
│   │   ├── utils/               # Procedural AudioEngine
│   │   ├── App.jsx              # Application router & layout
│   │   ├── index.css            # Tailwind design tokens & animations
│   │   └── main.jsx             # React DOM root entry point
│   ├── .env.example             # Frontend environment template
│   ├── package.json             # Frontend dependencies & scripts
│   ├── vercel.json              # Vercel SPA routing rewrite rules
│   └── vite.config.js           # Vite configuration
└── README.md                    # Project documentation
```

---

## 📜 Scripts Reference

### Backend (`/backend`)
- `npm start` - Starts the Express backend server (`node server.js`)
- `node generate_campaign.js` - Generates or regenerates campaign level JSON files

### Frontend (`/frontend`)
- `npm run dev` - Starts Vite dev server with Hot Module Replacement
- `npm run build` - Builds production bundle into `dist/`
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint code quality checks

---

## 📄 License & Credits

Developed with ❤️ for computer science learners by **Avinash Basani**.  
Powered by **React**, **Vite**, **Tailwind CSS**, and **Google Gemini AI**.
