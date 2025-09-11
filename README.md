# Voice Based Survey AI Tool

## Table of Contents

1.  [Tech Stack](#tech-stack)
2.  [Prerequisites](#prerequisites)
3.  [Getting Started](#getting-started)

## Tech Stack:

- **AI:**
  - [OpenAI](https://platform.openai.com/)
  - [GPT Realtime](https://platform.openai.com/docs/models/gpt-realtime)
  - [OpenAI Agents SDK](https://openai.github.io/openai-agents-js/)
- **Backend API:**
  - [Hono](https://hono.dev/)
  - [tRPC](https://trpc.io/)
  - [Drizzle ORM](https://orm.drizzle.team/) with [Turso](https://turso.tech/)
  - [Better Auth](https://better-auth.com/)
  - [T3 Env](https://env.t3.gg/)
- **Frontend Web App:**
  - [React](https://react.dev/)
  - [Vite](https://vite.dev/)
  - [React Router v7](https://reactrouter.com/)
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Shadcn-UI](https://ui.shadcn.com/)
  - [TanStack Query](https://tanstack.com/query/latest) with [tRPC](https://trpc.io/docs/client/tanstack-react-query)
- **Tooling & Shared Packages:**
  - [Bun](https://bun.sh/)
  - [Turbo](https://turborepo.com/)
  - [Biome](https://biomejs.dev/)

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/docs/installation) (v1.2.20 or later recommended)

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/CW-Codewalnut/voice-ai-tool
cd voice-ai-tool
```

### Setup

This project uses Bun as its package manager.

```bash
bun setup
```

This will install the dependencies for the project and setup the `.env` files and the local database for the project.

#### Environment Variables

Make sure to paste your keys (Google OAuth Client ID, Secret and OpenAI API Key) into your `.env` files.

**1. API (`apps/api/.env`)**

- `APP_PORT`: Port for the API server (default: `5000`).
- `APP_URL`: Full URL of the API server (e.g., `http://localhost:$APP_PORT`).
- `CORS_ORIGIN_1`: The origin URL for your web app (e.g., `http://localhost:3000`) to allow CORS.
- **Database (Turso):**
  - `DATABASE_URL`: Turso database URL (e.g., `file:.database/local.db` for a local DB).
  - `DATABASE_AUTH_TOKEN`: Turso database authentication token (a random string if using local DB).
- **Google OAuth:**
  - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
  - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
- **Better Auth:**
  - `AUTH_SECRET`: A long, random, secret string for signing authentication tokens (e.g., generate one with `openssl rand -hex 32`).
- **OpenAI:**
  - `OPENAI_API_KEY`: Your OpenAI API Key.

**2. Web (`apps/web/.env`)**

- `VITE_APP_URL`: The full URL where your web application will be accessible (e.g., `http://localhost:3000`).
- `VITE_API_URL`: The full URL of your API (e.g., `http://localhost:5000`).

**Running the Development Servers:**

To start both the API and Web development servers concurrently:

```bash
bun dev
```

This command uses Turbo to run the `dev` script in both `apps/api/package.json` and `apps/web/package.json`.

- API will be available at `http://localhost:5000` (or your `APP_PORT`).
- Web app will be available at `http://localhost:3000` (or your `VITE_APP_URL`).
