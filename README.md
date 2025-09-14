# Voice AI Survey Tool

An self-hosted platform for creating and deploying conversational voice-based surveys powered by OpenAI's real-time models.

### Key Features

- **🎙️ Real-Time Voice Conversations**: Engage users with a natural, conversational AI agent for a more interactive survey experience.
- **⚙️ Configurable Survey**: Easily configure survey questions, AI persona, voice models, and welcome/ending messages.
- **🔒 Secure & Self-Hostable**: Full control over your data with secure admin authentication and the ability to host on your own infrastructure.
- **📊 Transcript Review**: Access and review full transcripts of all completed survey sessions to analyze user feedback.
- **🏗️ Modern Tech Stack**: Built with a fully type-safe, modern stack including React, Hono, tRPC, and Drizzle ORM.

### Demo

TODO: Add demo video & screenshots

## Table of Contents

- [Overview & Problem Statement](#overview--problem-statement)
  - [The Problem](#the-problem)
  - [The Solution](#the-solution)
- [Product Features](#product-features)
- [Business Use Cases](#business-use-cases)
- [Tech Stack & Architecture](#tech-stack--architecture)
  - [Core Technologies](#core-technologies)
  - [Architecture Diagram](#architecture-diagram)
  - [Folder Structure](#folder-structure)
- [Local Setup & Installation](#local-setup--installation)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Installation](#step-by-step-installation)
  - [Database Commands](#database-commands)

## Overview & Problem Statement

### The Problem

Traditional web forms and text-based surveys often suffer from low engagement and completion rates. They can feel impersonal and fail to capture the nuance and detail present in natural human conversation, leading to superficial feedback.

### The Solution

This **Voice AI Survey Tool** transforms the survey experience by replacing static forms with dynamic, voice-driven conversations. An AI agent, powered by OpenAI Realtime models, engages users in a natural dialogue, asking predefined questions and capturing their spoken responses in real-time. This approach makes feedback collection more engaging, accessible, and capable of gathering richer, more detailed insights.

## Product Features

- **Admin Dashboard**
  - Secure Google OAuth login configured to be accessed only within the organization.
  - Intuitive interface to configure the AI's persona, including event information, welcome/ending messages, and special instructions.
  - Dynamic form to add, remove, and edit survey questions.
  - Selection of different model voices and speech speed.
- **Conversational Survey Interface**
  - Simple "Start Survey" initiation.
  - Visual feedback for different states: `initializing`, `listening`, `paused`, `completed`.
  - Real-time, interactive conversation with the AI agent.
  - Ability to pause, resume, and end the survey at any time.
- **Transcript Management**
  - A dedicated "Results" page in the admin dashboard.
  - Chronological list of all survey sessions.
  - Detailed view of each conversation, showing both user and AI messages.

## Business Use Cases

- **Customer Feedback**: Automate post-support call surveys to gather detailed, qualitative feedback on customer satisfaction.
- **Market Research**: Conduct initial screening interviews or product concept testing with a consistent, unbiased AI interviewer.
- **Employee Engagement**: Create an anonymous voice channel for employees to provide candid feedback on workplace culture.
- **Healthcare**: Streamline patient intake by having an AI agent ask preliminary questions in a conversational manner.
- **Accessibility Testing**: Gather verbal feedback from users with disabilities on website or app usability.

## Tech Stack & Architecture

### Core Technologies

- **AI:**
  - [OpenAI API](https://platform.openai.com/)
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
- **Tooling:**
  - [Bun](https://bun.sh/)
  - [Turbo](https://turborepo.com/)
  - [Biome](https://biomejs.dev/)

### Architecture Diagram

TODO: Add architecture diagram

**Data Flow:**

1.  **Admin**: An admin logs in via Google OAuth, configures the survey settings (prompts, questions, voice) in the React dashboard, and saves them.
2.  **End-User**: A user visits the survey page, starts the session, and the frontend obtains a ephemeral key from the backend and establishes a real-time connection with the OpenAI API.
3.  **Conversation**: The AI agent powered by OpenAI's [GPT Realtime Model](https://platform.openai.com/docs/models/gpt-realtime) configured with the admin's settings, initiates a conversation.
4.  **Transcript Logging**: The entire conversation transcript is saved to the database for later review by the admin.

### Folder Structure

The project is a monorepo managed by Turborepo and Bun Workspaces.

```
├── apps
│   ├── api        # Hono backend with tRPC endpoints & Better Auth
│   └── web        # React frontend application (Vite & React Router)
├── packages
│   ├── shared     # Shared code (Zod schemas, constants) between backend and frontend
│   └── tsconfig   # Shared TypeScript configurations
└── scripts
    └── setup.ts   # Automated setup script
```

## Local Setup & Installation

### Prerequisites

- [**Git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [**Bun**](https://bun.sh/docs/installation): v1.2.20 or later.
- [**OpenAI API Key**](https://platform.openai.com/api-keys).
- [**Google OAuth Credentials**](https://console.cloud.google.com/apis/credentials).

### Step-by-Step Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/CW-Codewalnut/voice-ai-tool.git
    cd voice-ai-tool
    ```

2.  **Run the Setup Script**
    This command will install all dependencies, copy the example `.env` files, and run the initial database migration & seed the DB with a sample system settings.

    ```bash
    bun setup
    ```

3.  **Configure Environment Variables**
    The `bun setup` script creates `.env` files in `apps/api` and `apps/web`. You must fill them with your credentials.

    **Backend** ([`apps/api/.env`](apps/api/.env))
    | Variable | Description | Example |
    | ----------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
    | `APP_PORT` | Port for the backend server. | `5000` |
    | `APP_URL` | Full public URL of the backend. | `http://localhost:5000` |
    | `CORS_ORIGIN_1` | The URL of your frontend app to allow CORS. | `http://localhost:3000` |
    | `DATABASE_URL` | Turso DB URL or local file path. | `file:./.database/local.db` |
    | `DATABASE_AUTH_TOKEN` | Turso auth token (leave blank for local file DB). | `your-turso-token` |
    | `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID. | `your-google-client-id.apps.googleusercontent.com` |
    | `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret. | `your-google-client-secret` |
    | `AUTH_SECRET` | A long, random secret for signing auth tokens. Generate one with `openssl rand -hex 32`. | `a_very_long_and_random_secret_string` |
    | `OPENAI_API_KEY` | Your OpenAI API key. | `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx` |

    **Frontend** ([`apps/web/.env`](apps/web/.env))
    | Variable | Description | Example |
    | ----------------- | ------------------------------------------- | ----------------------- |
    | `VITE_APP_URL` | The full URL of your frontend application. | `http://localhost:3000` |
    | `VITE_API_URL` | The full URL of your backend API. | `http://localhost:5000` |

4.  **Start the Development Servers**
    This command uses Turborepo to start both the backend and frontend servers concurrently.

    ```bash
    bun dev
    ```

    - API will be running at `http://localhost:5000`
    - Web app will be running at `http://localhost:3000`

### Database Commands

This project uses Drizzle ORM. You can manage the database with these commands:

- **`bun db:studio`**: Opens the Drizzle Studio GUI to inspect your database.
- **`bun db:generate`**: Generates SQL migration files based on schema changes.
- **`bun db:migrate`**: Applies pending migrations to the database.
