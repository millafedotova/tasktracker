# Fullstack Development Assignments

A collection of progressive fullstack development assignments, building from vanilla JavaScript to a full-stack authenticated application with Docker.
The web application for managing your personal exercise library. Create an account to start building your own collection of exercises — add new ones with custom categories and track details like sets, reps, weight, or duration using flexible custom fields. Browse your exercise library, filter by category to quickly find what you need, and edit or delete entries as your routine evolves. All data is tied to your personal account, so your exercises stay private and accessible only to you.

### Assignment 1 — Task Tracker (Vanilla JS)

A client-side task management app built with plain HTML, CSS, and JavaScript. Supports creating, editing, deleting, and filtering tasks by status and priority. Data is persisted in `localStorage` with hash-based routing.

**Run:** Open `Assignment-1/task-tracker/index.html` in a browser.
<img width="2860" height="1500" alt="image" src="https://github.com/user-attachments/assets/78e3a886-d8af-40f3-945d-47057714836e" />


---

### Assignment 2 — Exercise Tracker (React Frontend)

A React + TypeScript single-page application for browsing exercises. Displays exercise cards, filters by category, and navigates between list and detail views. Uses mock data (no backend).

**Tech:** React 18, TypeScript, Vite, Tailwind CSS, DaisyUI, React Router

**Run:**

```bash
cd Assignment-2/frontend
npm install
npm run dev
```

---

### Assignment 3 — Exercise Tracker (Full-Stack)

Extends Assignment 2 with a FastAPI backend and PostgreSQL database. Full CRUD for exercises and categories, many-to-many relationships, and custom exercise fields.

**Tech:** React 18, TypeScript, Vite, Tailwind CSS | FastAPI, SQLAlchemy, PostgreSQL

<img width="2888" height="1102" alt="image" src="https://github.com/user-attachments/assets/1d7189b8-50ff-439d-b128-6d004df2b3e2" />


**Run the backend:**

```bash
cd Assignment-3/backend
pip install -r requirements.txt
# Configure .env with your PostgreSQL connection string
python seed.py        # seed the database
uvicorn main:app --reload
```

**Run the frontend:**

```bash
cd Assignment-3/frontend
npm install
npm run dev
```

---

### Assignment 4 — Exercise Tracker with Authentication & Docker

Builds on Assignment 3 by adding user authentication (JWT + bcrypt), per-user exercise ownership, protected routes, and Docker containerization.

<img width="1158" height="936" alt="image" src="https://github.com/user-attachments/assets/7e03d6a8-171e-4e92-832f-ba4bcdcbe4f6" />


**Tech:** React 18, TypeScript, AuthContext | FastAPI, JWT (python-jose), bcrypt, Docker, PostgreSQL

**Run with Docker:**

```bash
cd Assignment-4
docker compose up --build
```

**Or run manually** (same steps as Assignment 3, plus configure JWT secret in `.env`).

---

## Prerequisites

- **Node.js** (v18+) and **npm** — for frontend projects
- **Python** (3.9+) and **pip** — for backend projects
- **PostgreSQL** — for Assignments 3 and 4
- **Docker** and **Docker Compose** — for Assignment 4 (optional)
