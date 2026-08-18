# 🌱 Eco-Verse Frontend

> **An immersive, gamified educational platform combining programming mastery with environmental world restoration narratives.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 📖 Overview

The **Eco-Verse Frontend** delivers a cyber-botanical, glassmorphic user interface designed to turn coding education into an epic journey. Learners explore interactive story chapters, resolve environmental crises using code logic, generate custom AI lessons on demand, track personalized career roadmaps, and earn downloadable certificates.

---

## ✨ Key Features

- **🎮 Campaign Story Mode**: 7 narrative-driven chapters (Variables, Control Flow, Loops, Functions, Lists, Dictionaries, and File Handling) featuring typewriter dialogue, interactive choices, and logic puzzles.
- **⚡ AI Dynamic Topic Scanner**: Integrated with Google Gemini to generate custom interactive programming lessons and progressive quizzes on any user-specified topic.
- **🗺️ Interactive Career Roadmap Generator**: Generates customized multi-phase skill roadmaps tailored to specific tech roles (e.g., Full Stack Engineer, AI Engineer, DevOps).
- **📜 Dynamic Certificate Generation**: Generates and downloads official completion certificates in PDF format via `jsPDF`.
- **💎 Cyber-Eco Design System**: Custom glassmorphism, responsive animated cards, neon botanical accents, and smooth physics-based animations powered by Framer Motion.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern component-based UI architecture |
| **Vite 8** | Next-generation frontend build tooling and HMR |
| **Tailwind CSS v4** | Modern utility-first styling with custom glassmorphic themes |
| **Framer Motion** | Physics-based micro-interactions, page transitions, and typewriter effects |
| **React Router v7** | Single Page Application client-side navigation |
| **Lucide React** | Consistent, modern vector iconography |
| **Axios** | HTTP client for backend REST API communication |
| **jsPDF** | Client-side dynamic PDF certificate compilation and export |

---

## 📁 Project Structure

```text
frontend/
├── public/              # Static assets and icons
├── src/
│   ├── assets/          # Images, audio, and visual assets
│   ├── components/      # Reusable UI components
│   │   ├── AnimatedCard.jsx     # Spring-animated glassmorphic container
│   │   ├── MissionView.jsx      # Mission challenge & quiz runner
│   │   ├── StoryDialogue.jsx    # Visual story dialogues & choices
│   │   ├── TypewriterText.jsx   # Animated typewriter terminal text
│   │   └── WorldMap.jsx         # Interactive campaign world map
│   ├── pages/           # Application views & route containers
│   │   ├── levels/              # Dedicated level modules (Intro, Level 1-7)
│   │   ├── Dashboard.jsx        # Player command center
│   │   ├── DynamicScanner.jsx   # Gemini AI topic scanner & quiz generator
│   │   ├── Home.jsx             # Hero landing page
│   │   ├── LevelView.jsx        # Story level runner
│   │   ├── Roadmap.jsx          # AI technical career roadmap generator
│   │   ├── StoryLevel.jsx       # Interactive campaign level view
│   │   └── StoryMap.jsx         # Campaign navigation map
│   ├── utils/           # Helper functions & certificate export logic
│   ├── App.jsx          # Main application router and global state
│   ├── index.css        # Global design tokens, tailwind imports & glassmorphism
│   └── main.jsx         # React application entry point
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite configuration with React and Tailwind plugins
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode

Start the Vite development server:
```bash
npm run dev
```

The application will be accessible at:
👉 **`http://localhost:5173`**

*(Make sure the backend server is running simultaneously on `http://localhost:5000` for full API and AI functionality).*

### Building for Production

To create an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🔌 API Integration

The frontend communicates with the backend Express server on `http://localhost:5000`:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/campaign` | `GET` | Fetches campaign story data and level definitions |
| `/api/levels/:id` | `GET` | Fetches specific level content and quizzes |
| `/api/generate-dynamic` | `POST` | Generates on-the-fly AI lessons & quizzes for any topic |
| `/api/generate-roadmap` | `POST` | Generates a 4-5 phase career roadmap for a given role |

---

## 🎨 Theme & Styling

The interface is styled with custom Tailwind utilities including:
- **`glass-panel`**: Multi-layer frosted glass background with subtle border highlights.
- **`nature-accent` & `nature-leaf`**: Neon emerald, cyan, and amber eco-themed color palette.
- **Framer Motion spring physics**: Smooth entrance and hover interactions.
