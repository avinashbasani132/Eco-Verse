# 🌿 Eco-Verse: Gamified AI-Powered Coding Platform

Eco-Verse is an immersive, gamified learning platform that combines interactive fantasy storytelling with generative AI to teach core programming concepts. Featuring a premium dark-mode glassmorphic interface, Eco-Verse guides users through a structured coding campaign and dynamically generates custom tutoring resources on-demand.

---

## 🚀 Key Features

### 1. ⚔️ Story Mode: Asterveil Kingdom
A 7-level gamified coding campaign set in the floating sky-islands of Asterveil. Players act as the *Archive Runner*, solving progressive Python challenges to restore corrupted ecosystem nodes.
*   **Level 1:** Variables & Data Types *(The Summoning of the Hero)*
*   **Level 2:** Conditional Statements (`if` / `elif` / `else`) *(The Trial of Weapons)*
*   **Level 3:** Loops (`for` / `while`) *(The Endless Horde)*
*   **Level 4:** Data Structures (Arrays, Lists, Tuples, Sets) *(The Vault of Relics)*
*   **Level 5:** Functions & Parameters *(The Spellcraft Library)*
*   **Level 6:** Classes & Objects *(The Guild of Living Armor)*
*   **Level 7:** Full Integration *(Final Boss: Demon King Vharzul)*

### 2. 🔍 Dynamic Scanner (AI-Powered Diagnostics)
Enter any programming concept (e.g., Recursion, Async operations, Pointer arithmetic). The platform utilizes the **Gemini 2.5 Flash Lite** model to instantly synthesize custom lessons and compile a progressive 5-question diagnostic assessment on the fly.

### 3. 🗺️ Roadmap Architect
Input any tech role (e.g., *Full Stack Developer*, *Data Scientist*, *DevOps Engineer*) to dynamically generate a comprehensive, 4-to-5 phase career path. The generated roadmaps can be exported directly as high-quality, print-formatted PDF study guides.

---

## 🛠️ Technology Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, Axios, Lucide React |
| **Backend** | Node.js, Express, Gemini API (`@google/generative-ai`), dotenv, CORS |
| **Database** | MongoDB / Mongoose (configured for storage scaling) |

---

## 📂 Project Structure

```
eco-verse/
├── backend/
│   ├── data/                 # Game campaign and level configurations
│   ├── server.js             # Express API server & Gemini AI integrations
│   ├── package.json          # Backend dependencies and run scripts
│   └── .env                  # Port, MongoDB, and Gemini API keys
└── frontend/
    ├── src/
    │   ├── components/       # Shared UI components
    │   ├── pages/            # View screens (Home, StoryMap, Scanner, etc.)
    │   ├── App.jsx           # Main routing & application state
    │   └── index.css         # Styling system configuration
    ├── package.json          # Frontend dependencies and Vite scripts
    └── vite.config.js        # Vite build configurations
```

---

## ⚙️ Quick Start Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   A Gemini API Key (get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables inside a `.env` file:
    ```env
    PORT=5000
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    The server will spin up at `http://localhost:5000`.

### 2. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:5173/`. Open this link in your browser to play!

---

## 🎨 Design Philosophy
Eco-Verse uses a **premium dark-mode design system**:
*   **Glassmorphism:** Frosted-glass components (`glass-panel`) over abstract gradients to give a sci-fi workspace feel.
*   **Micro-interactions:** Smooth animations on button hover, loading sequences, and card transitions powered by **Framer Motion**.
*   **Vibrant Color Coding:** Emerald accents for Story Mode, Cyan for the Scanner, and Purple for the Roadmap Architect.
