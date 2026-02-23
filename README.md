 # MERN-ThinkerTab

This repository is a small MERN-style note-taking app split into two folders:

- `backend/` — Express API with MongoDB (Mongoose) and Upstash-backed rate limiting
- `frontend/` — React + TypeScript UI built with Vite

This README briefly explains what each side does and why the key libraries are used.

## Backend — responsibility and structure

What it does:
- Serves a REST API for notes (CRUD).
- Persists notes in MongoDB using Mongoose models.
- Protects endpoints with rate limiting to avoid abuse.

Key files:
- `src/server.js` — app bootstrap, middleware, and route registration.
- `src/routes/notesRoutes.js` — API endpoint definitions (GET /notes, GET /notes/:id, POST, PUT, DELETE).
- `src/controllers/notesController.js` — request handling logic (validate input, call model, send responses).
- `src/models/Note.js` — Mongoose schema and model for a Note document.
- `src/middleware/rateLimiter.js` — protects high-impact endpoints using Upstash.

Main backend dependencies and why:
- `express` — minimal, battle-tested HTTP server and routing.
- `mongoose` — mapping between MongoDB documents and JS objects; provides validation and query helpers.
- `cors` — allows the frontend (served on a different origin during dev) to make API requests.
- `dotenv` — loads environment variables (database URL, Upstash credentials).
- `@upstash/redis` and `@upstash/ratelimit` — serverless-friendly Redis client and rate limiter for request throttling.
- `nodemon` (dev) — auto-restarts server during development.

Quick start (backend):
```bash
cd backend
# install dependencies
npm install
# run in dev (requires .env with DB and Upstash values)
npm run dev
```

## Frontend — responsibility and structure

What it does:
- Provides the UI for listing, creating, viewing, editing, and deleting notes.
- Calls backend API via `axios`.
- Uses TypeScript for safer code and shared `Note` types in `src/types.ts`.

Key files:
- `src/main.tsx` — app entry, router and context/providers.
- `src/pages/*` — `Home`, `CreateNote`, `NoteDetail` pages.
- `src/components/*` — `NoteCard`, `Navbar`, `RateLimitUi`, and small UI primitives.
- `src/lib/axios.ts` — preconfigured axios instance for API calls.
- `src/types.ts` — shared interfaces (e.g. `Note`).

Main frontend dependencies and why:
- `vite` — fast development server and build tool.
- `react` / `react-dom` — UI library.
- `typescript` — static types; helps prevent runtime bugs and documents interfaces.
- `axios` — promise-based HTTP client used by components and pages to call the backend.
- `react-hot-toast` — small, unobtrusive toast notifications for success/error messages.
- `lucide-react` — lightweight icon components.
- `tailwindcss` + `daisyui` — utility-first CSS and quick component styling.

Quick start (frontend):
```bash
cd frontend
npm install
npm run dev
```

Type checking:
```bash
cd frontend
npx tsc --noEmit
```

## Notes about TypeScript and runtime errors
- `catch (error)` is `unknown` by default in TypeScript; narrow it with `axios.isAxiosError(error)` before accessing `error.response`.
- When `verbatimModuleSyntax` is enabled in `tsconfig`, TypeScript can enforce `import type` for types; you can toggle that option in `frontend/tsconfig.app.json`.
- Shared interfaces live in `frontend/src/types.ts` to ensure components and pages have consistent types.

If you'd like, I can add a short `DEV_SETUP.md` with required `.env` keys and example values for running both backend and frontend locally.




Some Learning Stuff:


import express from 'express';  when using "type": "module" in package.json, we can use ES6 import syntax
 const express = require('express');  // if not using "type": "module", we would use CommonJS require syntax

 const app = express();
app.get("/api/notes",(req,res)=>{
    res.status(200).send("Hello from the backend!"); // 200 is the status code for OK
})
 app.post("/api/notes",(req,res)=>{
     res.status(201).send("created the thinkertab note!"); // 201 is the status code for Created successfully
 })

 400 is the status code for Bad Request, which indicates that the server cannot process the request due to client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 401 is the status code for Unauthorized, which indicates that the client must authenticate itself to get the requested response (e.g., the client has not provided valid authentication credentials).
402 is the status code for Payment Required, which is reserved for future use and is not commonly used in practice.
 403 is the status code for Forbidden, which indicates that the server understands the request but refuses to authorize it (e.g., the client does not have permission to access the requested resource).
 404 is the status code for Not Found, which indicates that the server cannot find the requested resource (e.g., the URL does not exist on the server).
 500 is the status code for Internal Server Error, which indicates that the server encountered an unexpected condition that prevented it from fulfilling the request (e.g., a bug in the server code or an issue with the server's resources).
 503 is the status code for Service Unavailable, which indicates that the server is currently unable to handle the request due to temporary overload or maintenance of the server (e.g., the server is down for maintenance or experiencing high traffic).

429 too many requests
what is the Endpoint?
An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource
