# INTA — AI-Powered Interview Preparation Platform

Final year project (BE Software Engineering) by Ankita Gurung and Sabina Karki,
supervised by Er. Ranjan Adhikari, Gandaki College of Engineering and Science.

An AI-powered mock interview platform that evaluates user answers locally using
TF-IDF similarity, transformer-based semantic embeddings, grammar checking,
sentiment analysis, and keyword extraction — no paid external AI API required.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, bcryptjs
- **AI/NLP:** natural (TF-IDF), @xenova/transformers (semantic embeddings), sentiment, write-good

## Project Structure
```
INTA/
├── client/                  # React frontend
│   └── src/
│       ├── pages/            # Landing, Login, Signup, Session
│       ├── context/          # AuthContext
│       ├── services/         # Axios instance
│       └── routes/           # ProtectedRoute
├── server/                  # Node/Express backend
│   ├── config/db.js
│   ├── models/               # User, Question, InterviewSession, Response, EvaluationResult
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/ai/          # TF-IDF, semantic similarity, grammar, sentiment, keyword, engine
│   └── seed.js                # sample interview questions
└── README.md
```

## Setup Instructions

### 1. Prerequisites
- Node.js v18 or v20
- MongoDB (local install OR a free MongoDB Atlas cluster)
- Git

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env: set MONGO_URI and JWT_SECRET
```

Seed sample questions (do this once, so the interview flow has data to serve):
```bash
node seed.js
```

Test the AI evaluation engine standalone before running the full server
(this also triggers the first-time transformer model download):
```bash
npm run test:ai
```

Run the backend:
```bash
npm run dev
```
Server runs at `http://localhost:5000`. Confirm with `http://localhost:5000/api/health`.

### 3. Frontend Setup
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend.

### 4. Try the Full Flow
1. Open `http://localhost:5173`
2. Sign up for an account
3. Start an interview (pick a category)
4. Answer a question → see AI-generated score and feedback
5. Continue to next question (difficulty adapts based on your score)

## Notes for Development
- The AI engine (`server/services/ai/`) is intentionally decoupled from routes —
  test and tune it standalone via `npm run test:ai` before changing scoring weights.
- `@xenova/transformers` downloads its embedding model on first run and caches
  it locally; expect a delay the very first time you evaluate an answer.
- Composite score weights live in `server/services/ai/evaluationEngine.js` —
  tune `WEIGHTS` as you validate against real sample answers.
- Question bank is currently seeded manually via `seed.js`; an admin
  interface for adding/editing questions is a natural next feature.

## Team
- Ankita Gurung
- Sabina Karki

Supervisor: Er. Ranjan Adhikari
Project Coordinator: Er. Santosh Panth
