# Akademia AI Marketing System

A two-sided platform: a public marketing site for four AI products, and an
admin dashboard for managing leads, campaigns, and content.

## Tech stack

| Layer     | Tech                                                |
|-----------|------------------------------------------------------|
| Frontend  | Next.js 15 (App Router) + TypeScript + Tailwind CSS   |
| Backend   | FastAPI (Python 3.12) + SQLAlchemy (async)            |
| Database  | PostgreSQL 16, run in Docker, not exposed to the host |
| Infra     | Docker Compose                                        |

## Project structure

```
akademia-marketing-system/
├── docker-compose.yml
├── .env                        # DB credentials for Compose
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py             # FastAPI entrypoint, wires up routers
│       ├── core/
│       │   ├── config.py       # env-driven settings
│       │   └── database.py     # async engine + session dependency
│       ├── models/             # SQLAlchemy tables
│       │   ├── product.py
│       │   ├── lead.py
│       │   └── campaign.py
│       ├── schemas/            # Pydantic request/response shapes
│       │   ├── product.py
│       │   ├── lead.py
│       │   └── campaign.py
│       └── api/routers/        # one file per resource
│           ├── dashboard.py
│           ├── leads.py
│           ├── campaigns.py
│           └── products.py
└── frontend/
    └── src/
        ├── app/
        │   ├── layout.tsx              # root layout (html/body)
        │   ├── (marketing)/            # public site — no URL prefix
        │   │   ├── layout.tsx
        │   │   ├── page.tsx            # /
        │   │   ├── products/
        │   │   ├── about/
        │   │   └── contact/
        │   └── admin/                  # admin dashboard — /admin/*
        │       ├── layout.tsx
        │       ├── dashboard/
        │       ├── leads/
        │       ├── campaigns/
        │       └── products/
        ├── lib/api.ts                  # single fetch wrapper for the API
        └── types/index.ts              # shared Product/Lead/Campaign types
```

---

## How this project was built

This section documents the setup process step by step, for both sides, so
the same process can be repeated or extended.

### 1. Frontend — Next.js + TypeScript

From the project root:

```bash
npx create-next-app@latest frontend --typescript --app --eslint --tailwind \
  --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

This scaffolds `frontend/` with TypeScript, Tailwind, ESLint, and the `src/`
layout already configured.

**Route groups** were introduced to separate the two sides of the product
without running two separate Next.js apps:

- `(marketing)` — a route *group* (parentheses mean it adds no URL segment),
  holding the public site: home, products, about, contact.
- `admin` — a real folder (no parentheses), so every page under it lives at
  `/admin/...`. This was deliberate: two route groups both containing a
  `products` page would collide on the same URL, so admin needed a real
  prefix.

```bash
cd frontend/src/app
mkdir -p "(marketing)/products/[slug]" "(marketing)/about" "(marketing)/contact" \
         admin/dashboard admin/leads/"[id]" admin/campaigns admin/products
```

Each side got its own `layout.tsx` (nav+footer for marketing, sidebar for
admin), while the true root `layout.tsx` (the only place `<html>`/`<body>`
appear) stays at `src/app/layout.tsx`.

Shared code was added under `src/`:
- `types/index.ts` — `Product`, `Lead`, `Campaign` interfaces, matching the
  backend models exactly.
- `lib/api.ts` — a single `apiFetch()` wrapper used by every page to call
  the FastAPI backend, driven by `NEXT_PUBLIC_API_URL`.

The API URL was set in `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Verification:** `npx next build` was run and produced a clean route table
confirming every page resolves to a distinct URL:
```
├ ○ /
├ ○ /about
├ ○ /admin/campaigns
├ ○ /admin/dashboard
├ ○ /admin/leads
├ ƒ /admin/leads/[id]
├ ○ /admin/products
├ ○ /contact
├ ○ /products
└ ƒ /products/[slug]
```

### 2. Backend — FastAPI

Folder structure created under `backend/`:

```bash
mkdir -p backend/app/core backend/app/models backend/app/schemas backend/app/api/routers
```

**Layering**, one concern per folder, one file per resource — kept
deliberately flat so the file count stays manageable as the project grows:

- `core/config.py` — a Pydantic `Settings` class reading DB credentials from
  environment variables, exposing a `database_url` property.
- `core/database.py` — the async SQLAlchemy engine, session factory, and a
  `get_db()` FastAPI dependency that every router uses.
- `models/` — one SQLAlchemy table class per file: `Product`, `Lead`,
  `Campaign`.
- `schemas/` — one Pydantic file per resource, each exporting a `*Base`,
  `*Create`, and `*Out` model. Kept separate from `models/` on purpose —
  the one layering split worth keeping from day one.
- `api/routers/` — one router per resource (`products.py`, `leads.py`,
  `campaigns.py`, `dashboard.py`), each with plain CRUD logic straight in
  the route function. No separate service layer yet — that gets added only
  if/when a router grows past ~150 lines.

All routers are registered in `app/main.py`, each under its own `/api/...`
prefix, alongside a CORS middleware allowing the frontend origin and a
`/health` endpoint.

**Verification (before touching Docker):** the app was imported directly in
a local virtualenv to confirm every route registers without errors:
```bash
python -m venv /tmp/venv
/tmp/venv/bin/pip install -r requirements.txt
/tmp/venv/bin/python -c "from app.main import app; ..."
```
This printed all 13 registered routes correctly. Then `uvicorn` was run
directly (outside Docker) and `curl http://127.0.0.1:8000/health` returned
`{"status":"ok"}`, confirming the app serves correctly before wrapping it
in a container.

### 3. Docker — database and backend, DB port not exposed

`docker-compose.yml` at the project root defines two services on a shared
bridge network, `akademia_net`:

- **`db`** (Postgres 16) — has **no `ports:` mapping**, so it is reachable
  only from other containers on `akademia_net` (i.e. from `backend`), never
  from the host machine directly.
- **`backend`** (built from `backend/Dockerfile`) — exposes `8000:8000` to
  the host, since the API is the intended entry point.

```bash
docker compose up -d --build
```

**Verification:** confirmed with `docker ps` that `akademia_db` shows no
`PORTS` column while `akademia_backend` shows `0.0.0.0:8000->8000/tcp`, and
that `curl http://localhost:8000/health` responds correctly through the
container.

---

## Running it

```bash
# Backend + database
docker compose up -d --build

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

| Service            | URL                                     |
|---------------------|------------------------------------------|
| Marketing site      | http://localhost:3000                    |
| Admin dashboard     | http://localhost:3000/admin/dashboard    |
| API                 | http://localhost:8000                    |
| API docs (Swagger)  | http://localhost:8000/docs               |
| Health check        | http://localhost:8000/health             |

To stop everything and remove containers (keeping the database volume):
```bash
docker compose down
```

## Not done yet

- No database migrations have been run — Alembic is listed in
  `requirements.txt` but not yet initialized, so tables don't exist in
  Postgres yet.
- `/admin/*` routes have no authentication.
- Frontend pages are structural placeholders — the actual UI still needs to
  be ported over from the two HTML mockups (`AI_end_user_side.html` and
  `AI_Marker_Admin_side.html`).
