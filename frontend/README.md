# Akademia AI Marketing System

A two-sided platform: a public marketing site for four AI products, and an
authenticated admin dashboard for managing leads, campaigns, content,
automations, emails, and product data.

## Tech stack

| Layer     | Tech                                                |
|-----------|------------------------------------------------------|
| Frontend  | Next.js 15 (App Router) + TypeScript + Tailwind CSS  |
| Backend   | FastAPI (Python 3.12) + SQLAlchemy (async)            |
| Database  | PostgreSQL 16, run in Docker                         |
| Auth      | JWT (python-jose) + bcrypt (passlib)                 |
| Testing   | Backend: pytest + pytest-asyncio + httpx; Frontend: jest + testing-library |
| Infra     | Docker Compose                                        |

## Project structure

```
akademia-marketing-system/
├── .env                        # DB credentials for Compose
├── docker-compose.yml
├── .github/workflows/          # GitHub Actions (frontend build/deploy)
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── .env.example
│   ├── conftest.py
│   └── app/
│       ├── main.py             # FastAPI entrypoint, wires up routers
│       ├── core/
│       │   ├── config.py       # env-driven settings
│       │   ├── database.py     # async engine + session dependency
│       │   ├── auth.py         # JWT + password hashing utilities
│       │   └── seed.py         # seed data + initial admin user
│       ├── models/             # SQLAlchemy tables
│       │   ├── product.py
│       │   ├── lead.py
│       │   ├── campaign.py
│       │   ├── email.py
│       │   ├── automation.py
│       │   ├── content.py
│       │   └── user.py
│       ├── schemas/            # Pydantic request/response shapes
│       │   ├── product.py
│       │   ├── lead.py
│       │   ├── campaign.py
│       │   ├── email.py
│       │   ├── automation.py
│       │   ├── content.py
│       │   └── user.py
│       └── api/routers/        # one file per resource
│           ├── auth.py
│           ├── dashboard.py
│           ├── leads.py
│           ├── campaigns.py
│           ├── products.py
│           ├── emails.py
│           ├── automations.py
│           ├── content.py
│           └── contact.py
└── frontend/
    ├── package.json
    ├── README.md
    ├── .env.local
    └── src/
        ├── app/
        │   ├── layout.tsx              # root layout (html/body)
        │   ├── globals.css
        │   ├── (marketing)/            # public site — no URL prefix
        │   │   ├── layout.tsx
        │   │   ├── page.tsx            # /
        │   │   ├── products/
        │   │   ├── about/
        │   │   ├── contact/
        │   │   └── news/
        │   └── admin/                  # admin dashboard — /admin/*
        │       ├── layout.tsx
        │       ├── admin.css
        │       ├── login/
        │       ├── dashboard/
        │       ├── leads/
        │       ├── campaigns/
        │       ├── emails/
        │       ├── automation/
        │       ├── content/
        │       ├── products/
        │       ├── settings/
        │       └── _components/
        │           ├── Sidebar.tsx
        │           ├── auth-context.tsx   # AuthProvider + useAuth
        │           ├── RequireAuth.tsx    # role gate for /admin/*
        │           └── icons.ts
        ├── lib/
        │   └── api.ts                  # single fetch wrapper for the API
        ├── types/
        │   └── index.ts                # shared Product/Lead/Campaign/Email/Automation/Content types
        └── __tests__/                  # jest test suite
            ├── api.test.ts
            ├── homepage.test.tsx
            ├── contact.test.tsx
            ├── admin-login.test.tsx
            ├── admin-dashboard.test.tsx
            ├── admin-emails.test.tsx
            ├── admin-automation.test.tsx
            └── admin-content.test.tsx
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
  holding the public site: home, products, about, contact, news.
- `admin` — a real folder (no parentheses), so every page under it lives at
  `/admin/...`. This was deliberate: two route groups both containing a
  `products` page would collide on the same URL, so admin needed a real
  prefix.

```bash
cd frontend/src/app
mkdir -p "(marketing)/products/[slug]" "(marketing)/about" "(marketing)/contact" \
         "(marketing)/news" \
         admin/login admin/dashboard admin/leads/"[id]" admin/campaigns admin/emails \
         admin/automation admin/content admin/products admin/settings \
         admin/_components
```

Each side got its own `layout.tsx` (nav+footer for marketing, sidebar+topbar
for admin), while the true root `layout.tsx` (the only place `<html>`/`<body>`
appear) stays at `src/app/layout.tsx`.

Shared code was added under `src/`:
- `types/index.ts` — `Product`, `Lead`, `Campaign`, `Email`, `Automation`,
  `Content` interfaces, matching the backend models exactly.
- `lib/api.ts` — a single `apiFetch()` wrapper used by every page to call
  the FastAPI backend, driven by `NEXT_PUBLIC_API_URL`.

The API URL is set in `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Verification:** `npx next build` produced a clean route table confirming
every page resolves to a distinct URL.

### 2. Backend — FastAPI

Folder structure created under `backend/`:

```bash
mkdir -p backend/app/core backend/app/models backend/app/schemas backend/app/api/routers
```

**Layering**, one concern per folder, one file per resource:

- `core/config.py` — a Pydantic `Settings` class reading DB credentials from
  environment variables, exposing a `database_url` property.
- `core/database.py` — the async SQLAlchemy engine, session factory, and a
  `get_db()` FastAPI dependency that every router uses.
- `core/auth.py` — JWT token creation/verification (`create_access_token`,
  `decode_token`) and password hashing (`hash_password`, `verify_password`)
  using `python-jose` and `passlib`.
- `models/` — one SQLAlchemy table class per file: `Product`, `Lead`,
  `Campaign`, `Email`, `Automation`, `Content`, `User`.
- `schemas/` — one Pydantic file per resource, each exporting a `*Base`,
  `*Create`, and `*Out` model. Kept separate from `models/` on purpose.
- `api/routers/` — one router per resource (`products.py`, `leads.py`,
  `campaigns.py`, `dashboard.py`, `emails.py`, `automations.py`,
  `content.py`, `contact.py`, `auth.py`), each with plain CRUD logic.
- `core/seed.py` — seed data (products, emails, automations, content) and an
  initial `admin@akademia.local` / `admin123` superuser.

All routers are registered in `app/main.py`, each under its `/api/...`
prefix, alongside a CORS middleware allowing the frontend origin and a
`/health` endpoint.

**Verification (before touching Docker):** the app was imported directly in
a local virtualenv to confirm every route registers without errors, and
`curl http://127.0.0.1:8000/health` returned `{"status":"ok"}`.

### 3. Authentication (JWT)

The admin dashboard is secured behind JWT authentication:

- `POST /api/auth/register` — create a new user.
- `POST /api/auth/login` — OAuth2 form login, returns `{"access_token": "...", "token_type": "bearer"}`.
- `GET /api/auth/me` — returns the current user (requires valid bearer token).

Admin routes are protected client-side:
- `AuthProvider` holds the token + user state in React context.
- `RequireAuth` wraps admin page content and redirects to `/admin/login`
  when no token is present.
- The sidebar shows the logged-in user's email and a Logout button.

Seed an admin user by running `seed.py` against the database, then log in
with `admin@akademia.local` / `admin123`.

### 4. Docker — database, backend, and frontend

`docker-compose.yml` at the project root defines services on a shared
bridge network, `akademia_net`:

- **`db`** (Postgres 16) — ports mapped as `5433:5432` on the host so it
  can also be reached locally (e.g. by psql or an IDE), and data persists
  in the `db_data` volume.
- **`frontend`** (built from `frontend/Dockerfile`) — exposes `3003:3003`
  to the host. Runs the Next.js production server.

```bash
# Build and start everything
docker compose up -d --build

# Run Alembic or seed data against the DB from a one-off backend container
docker run --rm --network akademia_net -e DB_USER=akademia -e DB_PASSWORD=changeme \
  -e DB_NAME=akademia_db python:3.12-slim pip install ...
```

> The backend API server itself runs outside Docker during local development
> (via `uvicorn`), connecting to Postgres in the `db` container over the
> Docker network or directly to `localhost:5433`.

**Verification:** `docker ps` shows `akademia_db` on `0.0.0.0:5433->5432/tcp`
and `akademia_frontend` on `0.0.0.0:3003->3003/tcp`.

---

## Running it

### Local development

```bash
# 1. Start the database
docker compose up -d db

# 2. Start the backend API (from backend/)
cd backend
uvicorn app.main:app --reload --port 8000
# Optionally seed initial data:
python -m app.core.seed  # requires DB env vars

# 3. Start the frontend (separate terminal)
cd frontend
npm install
npm run dev
```

| Service            | URL                                     |
|---------------------|------------------------------------------|
| Marketing site      | http://localhost:3000                    |
| Admin dashboard     | http://localhost:3000/admin/login       |
| API                 | http://localhost:8000                    |
| API docs (Swagger)  | http://localhost:8000/docs               |
| Health check        | http://localhost:8000/health             |

> The frontend dev server runs on port 3000 by default but the Docker
> container maps 3003. Both are correct for their respective environments.

### Running everything with Docker

```bash
docker compose up -d --build
```

To stop everything and remove containers (keeping the database volume):

```bash
docker compose down
```

---

## API endpoints

### Auth
| Method | Path              | Description                        |
|--------|-------------------|------------------------------------|
| POST   | `/api/auth/register` | Register a new user             |
| POST   | `/api/auth/login`    | OAuth2 login, returns JWT        |
| GET    | `/api/auth/me`       | Get current user (auth required) |

### Resources

| Resource       | Path              | Methods                          |
|----------------|-------------------|----------------------------------|
| Products       | `/api/products`   | GET, POST, GET /{slug}, PATCH /{slug} |
| Leads          | `/api/leads`      | GET, POST, GET /{id}, PATCH /{id}/status |
| Campaigns      | `/api/campaigns`  | GET, POST, GET /{id}             |
| Emails         | `/api/emails`     | GET, POST, GET /{id}             |
| Automations    | `/api/automations`| GET, POST, GET /{id}, PATCH /{id} |
| Content        | `/api/content`    | GET, POST, GET /{id}, PATCH /{id} |
| Dashboard      | `/api/dashboard`  | GET /summary                     |
| Contact        | `/api/contact`    | POST (creates a lead)            |

### Health
| Method | Path   | Description |
|--------|--------|-------------|
| GET    | `/health` | `{"status": "ok"}` |

---

## Testing

### Backend tests

Run from the `backend/` directory:

```bash
pytest                # run all tests
pytest -v             # verbose output
pytest tests/test_api.py::test_emails_crud   # single test
```

Tests use an in-memory SQLite database (via `conftest.py` fixtures) — no
Postgres required. The suite covers all resource CRUD endpoints plus auth
register/login/logout flows.

```
tests/
├── conftest.py        # fixtures: in-memory DB, test client
└── test_api.py        # endpoint tests
```

### Frontend tests

Run from the `frontend/` directory:

```bash
npm test              # run all tests
npm test -- --watch   # watch mode
```

Tests use `jest` + `@testing-library/react` + `next/jest`. API calls are
mocked. The suite covers the marketing pages, the login flow, and each
admin page (dashboard, emails, automations, content).

```
src/__tests__/
├── api.test.ts
├── homepage.test.tsx
├── contact.test.tsx
├── admin-login.test.tsx
├── admin-dashboard.test.tsx
├── admin-emails.test.tsx
├── admin-automation.test.tsx
└── admin-content.test.tsx
```

---

## Not done yet

- **Database migrations** — Alembic is listed in `requirements.txt` but
  not yet initialized, so tables must be created manually (run `seed.py`
  or use SQLAlchemy's `Base.metadata.create_all`).
- **Backend service not in Docker Compose** — the API server runs locally
  via `uvicorn`; a `backend` service could be added to `docker-compose.yml`
  for fully containerized development.
- **Email/Automation/Content admin CRUD** — the admin pages are read-only
  (list + detail). Create/edit forms and write operations on automations and
  content are on the API layer but not yet wired into the admin UI.
